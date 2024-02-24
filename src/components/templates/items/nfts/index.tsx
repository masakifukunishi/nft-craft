import { useState, useEffect } from "react";
import { useAccount } from "wagmi";

import Tab from "@/components/organisms/items/tab";
import { getWalletNFTs } from "@/utills/moralis";

const itemsNFTs = () => {
  const { chainId, address } = useAccount();
  const [nfts, setNfts] = useState(null);

  useEffect(() => {
    if (!address || !chainId) return;
    const fetchNFTs = async () => {
      const data = await getWalletNFTs(address, chainId);
      setNfts(data);
    };
    fetchNFTs();
  }, [address, chainId]);

  return (
    <>
      <div className="bg-green-300 w-10 h-10 rounded-full" />
      <div className="text-lg">Address: {address}</div>
      <Tab />
      <div className="text-lg">NFTs</div>
    </>
  );
};

export default itemsNFTs;
