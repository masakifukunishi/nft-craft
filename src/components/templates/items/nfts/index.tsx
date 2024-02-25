import { useState, useEffect } from "react";
import { useAccount } from "wagmi";

import Tab from "@/components/organisms/items/tab";
import { useEvmWalletNFTs } from "@moralisweb3/next";
import { type EvmAddressInput, type EvmNft } from "@moralisweb3/common-evm-utils";

const itemsNFTs = () => {
  const [nfts, setNfts] = useState<EvmNft[]>([]);
  const { chainId, address } = useAccount();
  const { fetch: fetchNFT } = useEvmWalletNFTs();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchNFT({
        address: address as EvmAddressInput,
        chain: chainId,
      });
      console.log("res", res?.data);
      if (res) setNfts(res.data);
    };
    fetchData();
  }, [address, chainId]);

  return (
    <>
      <div className="bg-green-300 w-10 h-10 rounded-full" />
      <div className="text-lg">Address: {address}</div>
      <Tab />
      <div className="text-lg">NFTs</div>
      <div>
        {nfts.map((nft: EvmNft) => (
          <div key={nft.tokenHash} className="flex items-center">
            <div className="bg-green-300 w-10 h-10 rounded-full" />
            <div className="text-lg">{nft.name}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default itemsNFTs;
