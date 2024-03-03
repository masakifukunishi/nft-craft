import { useState } from "react";
import { useAccount } from "wagmi";
import Spinner from "@/components/atoms/Spinner";

import BlockchainsTab from "@/components/organisms/items/common/blockchains-tab";
import Profile from "@/components/organisms/items/common/profile";
import CardList from "@/components/organisms/items/nfts/CardList";
import useFetchNFTs from "@/hooks/useFetchNFTs";

const itemsNFTs = () => {
  const { chainId, address } = useAccount();
  const [selectedChainId, setSelectedChainId] = useState(chainId);

  const { nfts, isLoading, hasMore, fetchMore } = useFetchNFTs(address, selectedChainId, 2);

  const handleChainChange = (chainId: number) => {
    setSelectedChainId(chainId);
  };

  return (
    <div className="mt-2 mb-8">
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
          <p className="text-gray-400">We couldn't find anything</p>
        </div>
      ) : (
        <>
          <div className="mt-8">
            <CardList nfts={nfts} />
          </div>
          <div className="flex justify-center mt-8">{hasMore && <button onClick={fetchMore}>Load More</button>}</div>
        </>
      )}
    </div>
  );
};

export default itemsNFTs;
