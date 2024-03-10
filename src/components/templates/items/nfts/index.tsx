import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import Spinner from "@/components/atoms/Spinner";

import BlockchainsTab from "@/components/organisms/items/common/blockchains-tab";
import Profile from "@/components/organisms/items/common/profile";
import CardList from "@/components/organisms/items/nfts/CardList";
import LoadMore from "@/components/molecules/LoadMore";
import useFetchNFTs from "@/hooks/useFetchNFTs";
import { loadChainList } from "@/utills/load";

const ItemsNFTs = () => {
  const { chainId, address } = useAccount();
  const chainList = loadChainList();
  const initialChainId = chainList[0].id;
  const [selectedChainId, setSelectedChainId] = useState(initialChainId);

  const { nfts, isLoading, hasMore, fetchMore, isFetchingMore } = useFetchNFTs(address, selectedChainId, 32);

  const handleChainChange = (chainId: number) => {
    setSelectedChainId(chainId);
  };

  useEffect(() => {
    if (chainList.some((chain) => chain.id === chainId)) {
      setSelectedChainId(chainId!);
    }
  }, [chainId]);

  return (
    <div className="mt-2 mb-16">
      <div>
        <Profile address={address} />
      </div>
      <div className="mt-1">
        <BlockchainsTab handleChainChange={handleChainChange} selectedChainId={selectedChainId!} />
      </div>
      {isLoading ? (
        <div className="flex justify-center mt-20">
          <Spinner size={50} borderWidth={4} />
        </div>
      ) : nfts.length === 0 ? (
        <div className="p-3 mt-2">
          <p className="text-xl">Nothing found</p>
          <p className="text-gray-400">{"We couldn't find anything"}</p>
        </div>
      ) : (
        <>
          <div className="mt-8">
            <CardList nfts={nfts} />
          </div>
          <LoadMore hasMore={hasMore} fetchMore={fetchMore} isFetchingMore={isFetchingMore} />
        </>
      )}
    </div>
  );
};

export default ItemsNFTs;
