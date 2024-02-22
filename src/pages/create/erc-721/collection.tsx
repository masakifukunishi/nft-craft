import { NextPage } from "next";

import Layout from "@/components/templates/Layout";
import CreateCollectionTemplate from "@/components/templates/create/Collection";

const createCollection: NextPage = () => {
  return (
    <Layout title="Create collection" requireWalletConnection={true}>
      <CreateCollectionTemplate />
    </Layout>
  );
};

export default createCollection;
