import { useAccount } from "wagmi";
import Tab from "@/components/organisms/items/tab";

const itemsNFTs = () => {
  const { address } = useAccount();
  return (
    <>
      <div className="bg-green-300 w-10 h-10 rounded-full" />
      <div className="text-lg">Address: {address}</div>
      <Tab />
    </>
  );
};

export default itemsNFTs;
