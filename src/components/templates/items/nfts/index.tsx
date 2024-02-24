import { useAccount, useReadContract } from "wagmi";

import Tab from "@/components/organisms/items/tab";
import { loadContractData, loadChainList } from "@/lib/load";

import ERC721Factory from "../../../../../hardhat/artifacts/contracts/ERC721Factory.sol/ERC721Factory.json";
import ERC721Collection from "../../../../../hardhat/artifacts/contracts/ERC721Collection.sol/ERC721Collection.json";

const itemsNFTs = () => {
  const { chainId, address } = useAccount();

  // const { data: nfts } = useReadContract({
  //   address: "0x730C057eD47E2dBdb17AAe2e3E861B519084E7C6",
  //   // address: loadContractData(chainId!)?.factory!,
  //   abi: ERC721Collection.abi,
  //   functionName: "balanceOf",
  //   args: [address],
  // });
  // console.log(nfts);

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
