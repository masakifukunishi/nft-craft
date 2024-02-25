import { useState, useEffect } from "react";
import Image from "next/image";
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
        {nfts.map((nft: EvmNft) => {
          const metadata = typeof nft.metadata === "string" ? JSON.parse(nft.metadata) : nft.metadata;
          const image = metadata?.image ? metadata.image.replace("ipfs://", "https://ipfs.io/ipfs/") : "";
          console.log("image", image);

          return (
            <div key={nft.tokenHash} className="">
              <div className="bg-green-300 w-10 h-10 rounded-full" />

              <div className="text-lg">{metadata.name}</div>
              <div className="text-lg">{metadata.description}</div>
              {image && <Image src={image} alt="NFT Image" width={200} height={200} />}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default itemsNFTs;
