import { NextPage } from "next";

import Layout from "@/components/templates/Layout";

const Home: NextPage = () => {
  return (
    <Layout title="NFT MINTING, Mint & Display NFTs" isUseDefaultTitle={false}>
      <div className="min-h-[calc(100vh-4.5rem)]">Create your own NFT</div>
    </Layout>
  );
};

export default Home;
