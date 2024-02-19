import { NextApiRequest, NextApiResponse } from "next";
import { ethers, providers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  try {
    switch (method) {
      case "POST":
        await handlePOST(req, res);
        break;
      default:
        res.status(405).json({
          error: {
            message: "Method not allowed",
          },
        });
        break;
    }
  } catch (error: any) {
    res.status(400).json({
      error: {
        message: error.message,
      },
    });
  }
}

const handlePOST = async (req: NextApiRequest, res: NextApiResponse) => {};
