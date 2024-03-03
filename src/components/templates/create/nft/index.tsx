import Link from "next/link";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAccount, useReadContract, useWriteContract, useSwitchChain } from "wagmi";

import BlockchainCardList from "@/components/molecules/form/card-lists/Blockchain";
import CollectionCardList from "@/components/molecules/form/card-lists/Collection";
import Input from "@/components/molecules/form/Input";
import Textarea from "@/components/molecules/form/Textarea";
import CreateModal from "@/components/organisms/create/nft/modals";
import UploadImageFile from "@/components/molecules/form/UploadImageFile";
import { uploadNFT } from "@/utills/nftStorage";
import { loadContractData, loadChainList } from "@/utills/load";
import ERC721CollectionFactory from "../../../../../hardhat/artifacts/contracts/ERC721CollectionFactory.sol/ERC721CollectionFactory.json";
import ERC721Collection from "../../../../../hardhat/artifacts/contracts/ERC721Collection.sol/ERC721Collection.json";

type FormInput = {
  name: string;
  description: string;
  collectionAddress: `0x${string}` | null;
  chainId: number | undefined;
  nftImage: File | null;
};

type Collection = {
  collectionAddress: `0x${string}` | null;
  symbol: string;
  name: string;
};

const CreateNFT = () => {
  const [isOpenCreatingModal, setIsOpenCreatingModal] = useState(false);
  const [uploadingStatus, setUploadingStatus] = useState<"idle" | "uploadingToIPFS" | "minting" | "error" | "done">("idle");
  const chainList = loadChainList();
  const { chainId, address } = useAccount();
  const { switchChain } = useSwitchChain();
  const { data: hash, error, isPending, isSuccess, writeContract } = useWriteContract();
  const [selectedCollectionAddress, setSelectedCollectionAddress] = useState<`0x${string}` | null>(null);
  const [nftImage, setNftImage] = useState<File | null>(null);
  const [nftImagePreview, setNftImagePreview] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormInput>();

  const collectionsData = useReadContract({
    address: loadContractData(chainId!)?.factory!,
    abi: ERC721CollectionFactory.abi,
    functionName: "getCollectionsByCreator",
    args: [address],
  });
  const collections = collectionsData.data as Collection[] | undefined;

  useEffect(() => {
    register("chainId", { required: "Blockchain is required" });
    register("collectionAddress", { required: "Collection is required" });
    register("nftImage", { required: "NFT image is required" });
  }, [register]);

  const handleBlockchainChange = async (id: number) => {
    if (chainId === id) return;
    try {
      switchChain({ chainId: id });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (chainList.some((chain) => chain.id === chainId)) {
      setValue("chainId", chainId, { shouldValidate: true });
    }
  }, [chainId, chainList, setValue]);

  const handleCollectionChange = (address: `0x${string}` | null) => {
    if (selectedCollectionAddress === address) return;
    setSelectedCollectionAddress(address);
    setValue("collectionAddress", address, { shouldValidate: true });
  };

  const handleNftImageChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setNftImage(file);
      setNftImagePreview(URL.createObjectURL(file));
      setValue("nftImage", file, { shouldValidate: true });
    }
  };

  const handleNftImageRemove = () => {
    setNftImagePreview("");
    setValue("nftImage", null, { shouldValidate: true });
  };

  useEffect(() => {
    if (isPending) {
      setUploadingStatus("minting");
    } else if (error) {
      setUploadingStatus("error");
    } else if (isSuccess) {
      setUploadingStatus("done");
      setNftImage(null);
      setNftImagePreview("");
      reset();
    } else {
      setUploadingStatus("idle");
    }
  }, [isPending, isSuccess, error, reset]);

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    setIsOpenCreatingModal(true);
    setUploadingStatus("uploadingToIPFS");
    let ipfsMetadataUrl = "";
    try {
      ipfsMetadataUrl = await uploadNFT(data.name, data.description, nftImage!);
    } catch (error) {
      setUploadingStatus("error");
      return;
    }
    writeContract({
      address: data.collectionAddress!,
      abi: ERC721Collection.abi,
      functionName: "safeMint",
      args: [address, ipfsMetadataUrl],
    });
  };

  return (
    <div className="flex flex-col items-center mt-2 mb-8">
      <form className="w-full sm:w-140" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-2xl md:text-3xl font-bold">Create New NFT</h2>
        <div className="mt-3">
          <div className="text-lg font-semibold">Standard</div>
          <div className="text-lg">ERC-721</div>
        </div>
        <div className="mt-8">
          <div className="text-lg font-semibold">Choose blockchain</div>
          <div className="mt-4">
            <BlockchainCardList
              blockchains={chainList}
              selectedChainId={chainId}
              handleBlockchainChange={handleBlockchainChange}
              errorMessage={errors.chainId?.message}
            />
          </div>
          <div className="mt-8">
            <div className="text-lg font-semibold">Choose collection</div>
            <div className="mt-4">
              {(collections === undefined || collections.length === 0) && (
                <div className="my-4">
                  You don't have any collections yet.
                  <Link href="/create/collection" className="text-blue-500 hover:underline mx-2">
                    Create a collection
                  </Link>
                  to get started.
                </div>
              )}
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
            <Textarea label="Description" id="description" register={register} errors={errors} />
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button type="submit" className="bg-blue-600 rounded p-2">
            Create NFT
          </button>
        </div>
      </form>
      <CreateModal
        isModalOpen={isOpenCreatingModal}
        closeModal={() => setIsOpenCreatingModal(false)}
        uploadingStatus={uploadingStatus}
        hash={hash}
      />
    </div>
  );
};

export default CreateNFT;
