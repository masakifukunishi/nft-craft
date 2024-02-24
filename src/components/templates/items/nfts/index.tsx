import { useAccount } from "wagmi";

import Tab from "@/components/organisms/items/tab";
import { getWalletNFTs } from "@/lib/moralis";

const itemsNFTs = () => {
  const { address } = useAccount();

  const fetchNFTs = async () => {
    if (!address) return;
    const data = await getWalletNFTs(address);
  };

  fetchNFTs();

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
