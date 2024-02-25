import { type EvmNft } from "@moralisweb3/common-evm-utils";

import Card from "@/components/organisms/items/nfts/Card";

type Props = {
  nfts: EvmNft[];
};

const CardList = ({ nfts }: Props) => {
  return (
    <div>
      {nfts.map((nft: EvmNft) => {
        const metadata = typeof nft.metadata === "string" ? JSON.parse(nft.metadata) : nft.metadata;
        const image =
          metadata?.image && metadata.image.startsWith("ipfs://") ? metadata.image.replace("ipfs://", "https://ipfs.io/ipfs/") : "";
        return <Card key={nft.tokenHash} collectionName={nft?.name} name={metadata?.name} image={image} />;
      })}
    </div>
  );
};

export default CardList;
