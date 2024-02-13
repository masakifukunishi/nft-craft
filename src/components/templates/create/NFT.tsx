import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import Layout from "@/components/organisms/layout";
import BlockchainCardList from "@/components/organisms/form/card-lists/Blockchain";
import CollectionCardList from "@/components/organisms/form/card-lists/Collection";
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
  description: string;
  blockchainId: number;
  collectionAddress: string;
};

const CreateNFT = () => {
  const [selectedBlockhainId, setSelectedBlockhainId] = useState(0);
  const [selectedCollectionAddress, setSelectedCollectionAddress] = useState("");
  const [filePreview, setFilePreview] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormInput>();

  const handleBlockchainChange = (id: number) => {
    setSelectedBlockhainId(id);
    setValue("blockchainId", id, { shouldValidate: true });
  };

  const handleCollectionChange = (address: string) => {
    setSelectedCollectionAddress(address);
    setValue("collectionAddress", address, { shouldValidate: true });
  };

  useEffect(() => {
    register("blockchainId", { required: "Blockchain is required" });
    register("collectionAddress", { required: "Collection is required" });
  }, [register]);

  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setFilePreview(URL.createObjectURL(file));
    }
  };

  const removeFilePreview = () => {
    setFilePreview("");
  };

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
          <div className="mt-8">
            <div className="text-lg font-semibold">Choose blockchain</div>
            <div className="mt-4">
              <BlockchainCardList
                blockchains={blockchains}
                selectedBlockhainId={selectedBlockhainId}
                handleBlockchainChange={handleBlockchainChange}
                errorMessage={errors.blockchainId?.message}
              />
            </div>
            <div className="mt-8">
              <div className="text-lg font-semibold">Choose collection</div>
              <div className="mt-4">
                <CollectionCardList
                  collections={collections}
                  selectedCollectionAddress={selectedCollectionAddress}
                  handleCollectionChange={handleCollectionChange}
                  errorMessage={errors.collectionAddress?.message}
                />
              </div>
            </div>
            <div className="mt-8">
              <div className="text-lg font-semibold">Upload file</div>
              <div className="mt-2">
                <div
                  className={`border border-dashed flex flex-col justify-center items-center rounded relative ${
                    filePreview ? "h-80" : "h-48"
                  }`}
                >
                  {filePreview && (
                    <>
                      <img src={filePreview} alt="Preview" className="max-h-64" />
                      <button
                        type="button"
                        className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded"
                        onClick={removeFilePreview}
                      >
                        削除
                      </button>
                    </>
                  )}
                  {!filePreview && (
                    <label htmlFor="file-upload" className="bg-gray-700 text-white rounded p-2 cursor-pointer">
                      Choose file
                    </label>
                  )}
                  <input id="file-upload" type="file" className="hidden" onChange={onFileChange} />
                </div>
              </div>
            </div>
            <div className="mt-8">
              <Input label="Name" id="name" register={register} required="Username is required" errors={errors} />
            </div>
            <div className="mt-8">
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
