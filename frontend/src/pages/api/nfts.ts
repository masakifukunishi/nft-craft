import { NextApiRequest, NextApiResponse } from "next";
import Moralis from "moralis";
import { EvmChain, type EvmAddressInput, type EvmChainish } from "@moralisweb3/common-evm-utils";

Moralis.start({
  apiKey: process.env.MORALIS_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { address, chainName } = req.query as { address: EvmAddressInput; chainName: keyof typeof EvmChain };

  const chain = EvmChain[chainName];

  const response = await Moralis.EvmApi.nft.getWalletNFTs({
    address,
    chain: chain as EvmChainish,
  });
  res.status(200).json({ res: response.result });
}
