import { NextPage } from "next";

import Layout from "@/components/templates/Layout";
import CreateNFTTemplate from "@/components/templates/create/nft";

const CreateNFT: NextPage = () => {
  return (
    <Layout title="Create NFT">
      <CreateNFTTemplate />
    </Layout>
  );
};

export default CreateNFT;
