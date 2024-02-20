import { NextPage } from "next";

import Layout from "@/components/templates/Layout";

const Home: NextPage = () => {
  return (
    <Layout title="NFT MINTING">
      <div className="min-h-screen">Create your own NFT</div>
    </Layout>
  );
};

export default Home;
