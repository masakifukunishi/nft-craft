import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import Layout from "@/components/organisms/layout";
import BlockchainCardList from "@/components/organisms/card-lists/Blockchain";
import CollectionCardList from "@/components/organisms/card-lists/Collection";
import Input from "@/components/molecules/form/Input";
import Textarea from "@/components/molecules/form/Textarea";

const blockchains = [
  { id: 1, imagePath: "/icons/blockchains/ethereum.png", name: "Ethereum" },
  { id: 137, imagePath: "/icons/blockchains/polygon.png", name: "Polygon" },
];

const collections = [
  { address: "0x1", name: "Collection 1", symbol: "C1" },
  { address: "0x2", name: "Collection 2", symbol: "C2" },
  { address: "0x3", name: "Collection 3", symbol: "C3" },
  { address: "0x4", name: "Collection 4", symbol: "C4" },
  { address: "0x5", name: "Collection 5", symbol: "C5" },
  { address: "0x6", name: "Collection 5", symbol: "C6" },
];
type FormInput = {
  name: string;
};

const CreateNFT = () => {
  const [selectedBlockhainId, setSelectedBlockhainId] = useState(0);
  const [selectedCollectionAddress, setSelectedCollectionAddress] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    console.log(data);
  };

  return (
    <Layout title="Create NFT">
      <div className="flex flex-col items-center mt-2">
        <form className="w-1/3" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-xl font-semibold">Create new NFT</h2>
          <div className="mt-4">
            <div className="text-lg font-semibold">Standard</div>
            <div className="text-lg">ERC-721</div>
          </div>
          <div className="mt-4">
            <div className="text-lg font-semibold">Choose blockchain</div>
            <div className="mt-2">
              <BlockchainCardList
                blockchains={blockchains}
                selectedBlockhainId={selectedBlockhainId}
                setSelectedBlockhainId={setSelectedBlockhainId}
              />
            </div>
            <div className="mt-4">
              <div className="text-lg font-semibold">Choose collection</div>
              <div className="mt-2">
                <CollectionCardList
                  collections={collections}
                  selectedCollectionAddress={selectedCollectionAddress}
                  setSelectedCollectionAddress={setSelectedCollectionAddress}
                />
              </div>
            </div>
            <div className="mt-4">
              <Input label="Name" id="name" register={register} required="Username is required" errors={errors} />
            </div>
            <div className="mt-4">
              <Textarea label="Description" id="description" register={register} required="Description is required" errors={errors} />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button type="submit" className="bg-blue-600 rounded p-2">
              Create NFT
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateNFT;
