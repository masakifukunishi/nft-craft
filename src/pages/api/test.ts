import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("Hello world");
  return res.status(200).json({ test: "Hello world" });
}
