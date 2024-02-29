import { NextApiRequest, NextApiResponse } from "next";
import { NFTStorage, File } from "nft.storage";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const apiKey = process.env.NFT_STORAGE_API_KEY ?? "";
    const client = new NFTStorage({ token: apiKey });

    const { name, description, imageBase64, mimeType } = req.body;
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif", "image/svg+xml"];
    if (!allowedMimeTypes.includes(mimeType)) {
      return res.status(400).json({ error: "Invalid MIME type" });
    }
    const extention = mimeType.split("/")[1];

    const imageBuffer = Buffer.from(imageBase64, "base64");
    const imageFile = new File([imageBuffer], `nft-image.${extention}`, { type: mimeType });

    const maxImageSize = 1024 * 1024 * 10; // 10MB
    if (imageBuffer.byteLength > maxImageSize) {
      return res.status(400).json({ error: "Image size is too large" });
    }
    console.log("starting to store");
    const storedMetadata = await client.store({
      name,
      description,
      image: imageFile,
    });

    console.log("Stored Metadata:", storedMetadata);
    res.status(200).json({ data: storedMetadata.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};
