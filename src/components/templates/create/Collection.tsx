import React from "react";

import Layout from "@/components/organisms/layout";
import BlockchainCardList from "@/components/organisms/card-lists/Blockchain";

const blockchains = [
  { id: 1, imagePath: "/icons/blockchains/ethereum.png", name: "Ethereum" },
  { id: 137, imagePath: "/icons/blockchains/polygon.png", name: "Polygon" },
];
const CreateCollection = () => {
  return (
    <Layout title="Create collection">
      <div className="flex flex-col items-center mt-2">
        <form className="w-1/3">
          <h2 className="text-xl font-semibold">Create new collection</h2>
          <div className="mt-4">
            <div className="text-lg font-semibold">Standard</div>
            <div className="text-lg">ERC-721</div>
          </div>
          <div className="mt-4">
            <div className="text-lg font-semibold">Choose blockchain</div>
            <div className="mt-4">
              <BlockchainCardList blockchains={blockchains} />
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateCollection;
