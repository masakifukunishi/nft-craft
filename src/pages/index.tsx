import { NextPage } from "next";

import Layout from "@/components/templates/Layout";

const Home: NextPage = () => {
  return (
    <Layout title="NFT MINTING, Mint & Display NFTs" isUseDefaultTitle={false}>
      <div className="min-h-screen">Create your own NFT</div>
    </Layout>
  );
};

export default Home;
