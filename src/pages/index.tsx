import { NextPage } from "next";

import Layout from "@/components/templates/Layout";

const Home: NextPage = () => {
  return (
    <Layout title="NFT MINTING, Mint & Display NFTs" isUseDefaultTitle={false}>
      <div className="min-h-[calc(100vh-4.5rem)] rounded-xl">
        <div className="flex justify-center items-center bg-yellow-300 text-base-black w-96 h-96 rounded-lg">
          <div className="text-4xl font-bold">WEB3</div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
