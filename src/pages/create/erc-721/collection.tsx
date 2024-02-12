import { NextPage } from "next";
import Header from "../../../components/header";

const createCollection: NextPage = () => {
  return (
    <div>
      <Header />
      <div className="flex flex-col items-center mt-2">
        <form className="w-1/3">
          <h2 className="text-xl font-semibold">Create new collection</h2>
          <div className="mt-4">
            <div className="text-lg font-semibold">Standard</div>
            <div className="text-lg">ERC-721</div>
          </div>
          <div className="mt-4">
            <div className="text-lg font-semibold">Choose blockchain</div>
            <div className="text-lg">ERC-721</div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default createCollection;
