import { NextPage } from "next";

import Layout from "@/components/templates/Layout";

const Home: NextPage = () => {
  return (
    <Layout title="NFT MINTING, Mint & Display NFTs" isUseDefaultTitle={false}>
      <div className="min-h-[calc(100vh-4.5rem)] bg-indigo-500 rounded-xl">
        <div className="flex justify-center items-center pt-8">
          <div className="flex justify-center items-center bg-base-black w-96 h-96 rounded-lg text-4xl">Web3</div>
          <div className="text-2xl font-semibold">NFT MINTING</div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
