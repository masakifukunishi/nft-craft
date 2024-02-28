import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { useEvmWalletNFTCollections } from "@moralisweb3/next";
import { type EvmAddressInput, type EvmNftCollection } from "@moralisweb3/common-evm-utils";

import ItemsTab from "@/components/organisms/items/common/items-tab";
import BlockchainsTab from "@/components/organisms/items/common/blockchains-tab";
import Profile from "@/components/organisms/items/common/profile";
import CardList from "@/components/organisms/items/collections/CardList";

const itemsCollections = () => {
  const { chainId, address } = useAccount();
  const { fetch: fetchCollections } = useEvmWalletNFTCollections();
  const [collections, setCollections] = useState<EvmNftCollection[]>([]);
  const [selectedChainId, setSelectedChainId] = useState(chainId);

  const handleChainChange = (chainId: number) => {
    setSelectedChainId(chainId);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchCollections({
        address: address as EvmAddressInput,
        chain: selectedChainId,
        excludeSpam: true,
      });
      console.log("res", res?.data);
      if (res) setCollections(res.data);
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
        <CardList collections={collections} />
      </div>
    </>
  );
};

export default itemsCollections;
