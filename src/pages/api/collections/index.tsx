import { NextApiRequest, NextApiResponse } from "next";
import type { Signer, Contract } from "ethers";
import { ethers } from "ethers";
import ERC721Factory from "../../../../hardhat/artifacts/contracts/ERC721Factory.sol/ERC721Factory.json";

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

const handlePOST = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("11111");
  return res.status(200).json({ message: "success" });
};
