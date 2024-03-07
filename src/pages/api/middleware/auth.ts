import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

export const withSession = async (req: NextApiRequest, res: NextApiResponse, next: () => Promise<void>) => {
  const token = await getToken({ req });
  if (!token) {
    return res.status(401).json({ error: "You must be signed in to view this page." });
  }
  await next();
};
