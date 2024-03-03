import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useWriteContract, useAccount, useSwitchChain } from "wagmi";

import BlockchainCardList from "@/components/molecules/form/card-lists/Blockchain";
import Input from "@/components/molecules/form/Input";
import CreateModal from "@/components/organisms/create/collection/modals";
import { loadContractData, loadChainList } from "@/utills/load";
import ERC721CollectionFactory from "../../../../../hardhat/artifacts/contracts/ERC721CollectionFactory.sol/ERC721CollectionFactory.json";

type FormInput = {
  name: string;
  symbol: string;
  chainId: number | undefined;
};

const CreateCollection = () => {
  const [uploadingStatus, setUploadingStatus] = useState<"idle" | "minting" | "error" | "done">("idle");
  const [isOpenCreatingModal, setIsOpenCreatingModal] = useState(false);
  const chainList = loadChainList();
  const { chainId } = useAccount();
  const { switchChain } = useSwitchChain();
  const { data: hash, error, isPending, isSuccess, writeContract } = useWriteContract();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormInput>();

  useEffect(() => {
    register("chainId", { required: "Blockchain is required" });
  }, [register]);

  useEffect(() => {
    if (isPending) {
      setUploadingStatus("minting");
    } else if (error) {
      setUploadingStatus("error");
    } else if (isSuccess) {
      setUploadingStatus("done");
      reset();
    } else {
      setUploadingStatus("idle");
    }
  }, [isPending, error, isSuccess, reset]);

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

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    if (!chainId) return;
    setIsOpenCreatingModal(true);
    writeContract({
      address: loadContractData(chainId)?.factory!,
      abi: ERC721CollectionFactory.abi,
      functionName: "createCollection",
      args: [data.name, data.symbol],
    });
  };

  return (
    <div className="flex flex-col items-center mt-2 mb-8">
      <form className="w-full sm:w-140" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-2xl md:text-3xl font-bold">Create New Collection</h2>
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
            <Input label="Name" id="name" register={register} required="Username is required" errors={errors} />
          </div>
          <div className="mt-8">
            <Input label="Symbol" id="symbol" register={register} required="Symbol is required" errors={errors} />
          </div>
        </div>
        <div className="mt-8 flex justify-end">
          <button type="submit" className="bg-blue-600 rounded p-2">
            Create collection
          </button>
        </div>
      </form>
      <CreateModal
        isModalOpen={isOpenCreatingModal}
        closeModal={() => setIsOpenCreatingModal(false)}
        uploadingStatus={uploadingStatus}
        hash={hash}
        retry={handleSubmit(onSubmit)}
      />
    </div>
  );
};

export default CreateCollection;
