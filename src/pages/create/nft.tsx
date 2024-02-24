import { NextPage } from "next";

import Layout from "@/components/templates/Layout";
import CreateNFTTemplate from "@/components/templates/create/NFT";

const createNFT: NextPage = () => {
  return (
    <Layout title="Create collection" requireWalletConnection={true}>
      <CreateNFTTemplate />
    </Layout>
  );
};

export default createNFT;
