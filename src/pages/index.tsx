import { NextPage } from "next";

import Layout from "@/components/templates/Layout";

const Home: NextPage = () => {
  return (
    <Layout title="NFT MINTING, Mint & Display NFTs" isUseDefaultTitle={false}>
      <div className="min-h-[calc(100vh-4.5rem)] ">
        <div className="min-h-[calc(100vh-9.5rem)] bg-yellow-300 rounded-xl flex justify-center items-center">
          <div className="flex justify-center items-center gap-12">
            <div className="flex justify-center items-center bg-base-black text-base-black w-118 h-118 rounded-lg">
              <div className="text-4xl text-yellow-300 font-bold text-center">
                <h3 className="mb-3">WEB3</h3>
                <h3 className="mb-3">NFT</h3>
                <h3 className="mb-3">MINT</h3>
              </div>
            </div>
            <div className="w-118">
              <div className="text-3xl text-base-black font-semibold mb-2">NFT Minting</div>
              <p className="text-gray-800">
                Discover the future of digital art ownership with our platform. Mint your own unique NFTs effortlessly and become part of an
                ever-expanding universe of creativity. Dive into a seamless experience where innovation meets digital asset security.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
