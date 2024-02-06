import type { NextApiRequest, NextApiResponse } from "next";
import { NFTStorage, File } from "nft.storage";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(process.env.NFT_STORAGE_API_KEY);
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const apiKey = process.env.NFT_STORAGE_API_KEY ?? "";
    const client = new NFTStorage({ token: apiKey });

    const data = await req.body;
    const imageFile = new File([data], "nft.png", { type: "image/png" });

    const metadata = await client.store({
      name: "My sweet NFT",
      description: "Just try to funge it. You can't do it.",
      image: imageFile,
    });

    res.status(200).json({ metadata });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
