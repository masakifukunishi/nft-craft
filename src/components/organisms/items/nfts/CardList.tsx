import { type EvmNft } from "@moralisweb3/common-evm-utils";

import Card from "@/components/organisms/items/nfts/Card";
import { normalizeImageUrl } from "@/utills/nftStorage";

type Props = {
  nfts: EvmNft[];
};

const CardList = ({ nfts }: Props) => {
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-3">
        {nfts.map((nft: EvmNft) => {
          const metadata = typeof nft.metadata === "string" ? JSON.parse(nft.metadata) : nft.metadata;
          const image = normalizeImageUrl(metadata?.image);
          return <Card key={nft.tokenHash} collectionName={nft?.name} name={metadata?.name} image={image} />;
        })}
      </div>
    </>
  );
};

export default CardList;
