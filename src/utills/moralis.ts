import APIUtils from "@/utills/apiUtils";

export const getWalletNFTs = async (address: `0x${string}`) => {
  try {
    const data = await APIUtils.get(`/api/nfts?address=${address}`);
    console.log("data", data.res);
    return data.res;
  } catch (error) {
    console.error("Error getting wallet NFTs", error);
    throw error;
  }
};
