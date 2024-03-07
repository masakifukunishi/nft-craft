import { NextApiRequest, NextApiResponse } from "next";
import { NFTStorage, File } from "nft.storage";

import { withSession } from "@/pages/api/middleware/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await withSession(req, res, async () => {
    if (req.method !== "GET") {
      return res.status(405).json({ error: "Method not allowed" });
    }
    try {
      // const apiKey = process.env.NFT_STORAGE_API_KEY ?? "";
      // const client = new NFTStorage({ token: apiKey });
      // const { name, description, imageBase64, mimeType } = req.body;
      // const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif", "image/svg+xml"];
      // if (!allowedMimeTypes.includes(mimeType)) {
      //   return res.status(400).json({ error: "Invalid MIME type" });
      // }
      // const extention = mimeType.split("/")[1];
      // const imageBuffer = Buffer.from(imageBase64, "base64");
      // const imageFile = new File([imageBuffer], `nft-image.${extention}`, { type: mimeType });
      // const maxImageSize = 1024 * 1024 * 10; // 10MB
      // if (imageBuffer.byteLength > maxImageSize) {
      //   return res.status(400).json({ error: "Image size is too large" });
      // }
      // const storedMetadata = await client.store({
      //   name,
      //   description,
      //   image: imageFile,
      // });
      // res.status(200).json({ data: storedMetadata.url });
      res.status(200).json({ data: "aaa" });
    } catch (error) {
      res.status(500).json({ error: "An error occurred while processing the request" });
    }
  });
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};
