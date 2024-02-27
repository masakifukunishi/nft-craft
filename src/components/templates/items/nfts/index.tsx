import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { useEvmWalletNFTs } from "@moralisweb3/next";
import { type EvmAddressInput, type EvmNft } from "@moralisweb3/common-evm-utils";

import ItemsTab from "@/components/organisms/items/common/items-tab";
import BlockchainsTab from "@/components/organisms/items/common/blockchains-tab";
import Profile from "@/components/organisms/items/common/profile";
import CardList from "@/components/organisms/items/nfts/CardList";

const itemsNFTs = () => {
  const { chainId, address } = useAccount();
  const { fetch: fetchNFTs } = useEvmWalletNFTs();
  const [nfts, setNfts] = useState<EvmNft[]>([]);
  const [selectedChainId, setSelectedChainId] = useState(chainId);

  const handleChainChange = (chainId: number) => {
    setSelectedChainId(chainId);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchNFTs({
        address: address as EvmAddressInput,
        chain: selectedChainId,
      });
      if (res) {
        const filteredNfts = res.data.filter((nft: EvmNft) => !nft.possibleSpam);
        console.log("filteredNfts", filteredNfts);
        setNfts(filteredNfts);
      }
    };
    fetchData();
  }, [address, selectedChainId]);

  return (
    <>
      <div>
        <Profile address={address} />
      </div>
      <div className="mt-1">
        <ItemsTab />
      </div>
      <div className="mt-5">
        <BlockchainsTab handleChainChange={handleChainChange} selectedChainId={selectedChainId!} />
      </div>
      <div className="mt-5">
        <CardList nfts={nfts} />
      </div>
    </>
  );
};

export default itemsNFTs;
