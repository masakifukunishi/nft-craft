import { NextApiRequest, NextApiResponse } from "next";
import { NFTStorage, File } from "nft.storage";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("Request Body");
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const apiKey = process.env.NFT_STORAGE_API_KEY ?? "";
    const client = new NFTStorage({ token: apiKey });

    const { imageBase64, ...metadata } = req.body;

    const imageBuffer = Buffer.from(imageBase64, "base64");

    const imageFile = new File([imageBuffer], "nft.png", { type: "image/png" });

    console.log("starting to store");
    const storedMetadata = await client.store({
      ...metadata,
      image: imageFile,
    });

    console.log("Stored Metadata:", storedMetadata);
    res.status(200).json({ ipfsMetadataUrl: storedMetadata.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
