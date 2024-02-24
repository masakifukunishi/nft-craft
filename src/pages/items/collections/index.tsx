import { NextPage } from "next";

import Layout from "@/components/templates/Layout";
import ItemsCollectionsTemplate from "@/components/templates/items/collections";

const ItemsCollections: NextPage = () => {
  return (
    <Layout title="Items collection" requireWalletConnection={true}>
      <ItemsCollectionsTemplate />
    </Layout>
  );
};

export default ItemsCollections;
