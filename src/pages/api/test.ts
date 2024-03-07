import { NextApiRequest, NextApiResponse } from "next";
import { withSession } from "@/pages/api/middleware/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // GETリクエストのみを許可
  if (req.method === "GET") {
    await withSession(req, res, async () => {
      // 認証されたユーザーの場合は、必要な処理を行う
      // ここにビジネスロジックを記述
      res.status(200).json({ message: "This is a protected test route" });
    });
  } else {
    // GETリクエスト以外は許可しない
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
