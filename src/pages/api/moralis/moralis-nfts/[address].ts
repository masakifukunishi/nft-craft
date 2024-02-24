import { NextApiRequest, NextApiResponse } from "next";
import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";

Moralis.start({
  apiKey: process.env.MORALIS_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { address } = req.query;

  const chain = EvmChain.SEPOLIA;

  const response = await Moralis.EvmApi.nft.getWalletNFTs({
    address,
    chain,
  });

  console.log("response", response.result);
  res.status(200).json({ response: response.result });
}
