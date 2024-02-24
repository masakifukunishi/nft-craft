import APIUtils from "@/lib/apiUtils";

const getWalletNFTs = async (address: string): Promise<any> => {
  console.log("address", address);
  try {
    const data = await APIUtils.get(`/api/moralis/moralis-nfts/${address}`);
    console.log("data", data);
    return data;
  } catch (error) {
    console.error("Error getting wallet NFTs", error);
    throw error;
  }
};

export default getWalletNFTs;
