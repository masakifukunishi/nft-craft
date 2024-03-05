// pages/api/test.ts
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // GETリクエストのみを許可
  if (req.method === "GET") {
    // ユーザーのセッションを取得
    const session = await getSession({ req });

    // セッションがない場合、エラーを返す
    if (!session) {
      return res.status(401).json({ error: "You must be signed in to view this page." });
    }

    // 認証されたユーザーの場合は、必要な処理を行う
    // ここにビジネスロジックを記述
    res.status(200).json({ message: "This is a protected test route" });
  } else {
    // GETリクエスト以外は許可しない
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
