import { useAccount } from "wagmi";
import { useEvmNativeBalance } from "@moralisweb3/next";

import Tab from "@/components/organisms/items/tab";

const itemsNFTs = () => {
  const { address } = useAccount();
  const { data: nativeBalance } = useEvmNativeBalance({ address });
  console.log(nativeBalance);

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
