import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export const withSession = async (req: NextApiRequest, res: NextApiResponse, next: () => Promise<void>) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: "You must be signed in to view this page." });
  }
  await next();
};
