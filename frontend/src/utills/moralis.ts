import APIUtils from "@/utills/apiUtils";
import { loadChainList } from "@/utills/load";

export const getWalletNFTs = async (address: `0x${string}`, chainId: number) => {
  const chainList = loadChainList();
  const chainName = chainList.filter((chain) => chain.id === chainId)[0].name.toUpperCase();
  try {
    const data = await APIUtils.get(`/api/nfts?address=${address}&chainName=${chainName}`);
    console.log("data", data.res);
    return data.res;
  } catch (error) {
    console.error("Error getting wallet NFTs", error);
    throw error;
  }
};
