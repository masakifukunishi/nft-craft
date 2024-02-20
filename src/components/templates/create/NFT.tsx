import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { loadContractData, loadChainList } from "@/lib/load";
import Layout from "@/components/organisms/layout";
import BlockchainCardList from "@/components/organisms/form/card-lists/Blockchain";
import CollectionCardList from "@/components/organisms/form/card-lists/Collection";
import Input from "@/components/molecules/form/Input";
import Textarea from "@/components/molecules/form/Textarea";
import UploadImageFile from "@/components/molecules/form/UploadImageFile";

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
  nftImage: File | null;
};

const CreateNFT = () => {
  const chainList = loadChainList();
  const [selectedChainId, setSelectedChainId] = useState(0);
  const [selectedCollectionAddress, setSelectedCollectionAddress] = useState("");
  const [nftImagePreview, setNftImagePreview] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormInput>();

  useEffect(() => {
    register("blockchainId", { required: "Blockchain is required" });
    register("collectionAddress", { required: "Collection is required" });
    register("nftImage", { required: "NFT image is required" });
  }, [register]);

  const handleBlockchainChange = (id: number) => {
    setSelectedChainId(id);
    setValue("blockchainId", id, { shouldValidate: true });
  };

  const handleCollectionChange = (address: string) => {
    setSelectedCollectionAddress(address);
    setValue("collectionAddress", address, { shouldValidate: true });
  };

  const handleNftImageChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setNftImagePreview(URL.createObjectURL(file));
      setValue("nftImage", file, { shouldValidate: true });
    }
  };

  const handleNftImageRemove = () => {
    setNftImagePreview("");
    setValue("nftImage", null, { shouldValidate: true });
  };

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    console.log(data);
  };
  return (
    <Layout title="Create NFT">
      <div className="flex flex-col items-center mt-2">
        <form className="w-1/3" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-2xl font-semibold">Create new NFT</h2>
          <div className="mt-3">
            <div className="text-lg font-semibold">Standard</div>
            <div className="text-lg">ERC-721</div>
          </div>
          <div className="mt-8">
            <div className="text-lg font-semibold">Choose blockchain</div>
            <div className="mt-4">
              <BlockchainCardList
                blockchains={chainList}
                selectedChainId={selectedChainId}
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
              <UploadImageFile
                imagePreview={nftImagePreview}
                handleImageChange={handleNftImageChange}
                handleImageRemove={handleNftImageRemove}
                errorMessage={errors.nftImage?.message}
              />
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
