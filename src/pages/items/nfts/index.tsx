import { NextPage } from "next";

import Layout from "@/components/templates/Layout";
import ItemsNFTsTemplate from "@/components/templates/items/nfts";

const ItemsNFTs: NextPage = () => {
  return (
    <Layout title="Items NFTs" requireWalletConnection={true}>
      <ItemsNFTsTemplate />
    </Layout>
  );
};

export default ItemsNFTs;
