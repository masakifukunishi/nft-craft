import { useState, useEffect, use } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { type BaseError, useWriteContract, useAccount } from "wagmi";
import { switchChain } from "@wagmi/core";

import { loadContractData, loadChainList } from "@/lib/load";
import BlockchainCardList from "@/components/organisms/form/card-lists/Blockchain";
import Input from "@/components/molecules/form/Input";
import Textarea from "@/components/molecules/form/Textarea";
import CreatingModal from "@/components/organisms/modals/collection/Creating";
import CreatingErrorModal from "@/components/organisms/modals/collection/CreatingError";
import CreationCompleteModal from "@/components/organisms/modals/collection/CreationComplete";
import ERC721Factory from "../../../../hardhat/artifacts/contracts/ERC721Factory.sol/ERC721Factory.json";
import { config } from "../../../../config";

type FormInput = {
  name: string;
  symbol: string;
  description: string;
};

const CreateCollection = () => {
  const [isOpenCreatingModal, setIsOpenCreatingModal] = useState(false);
  const [isOpenCreatingErrorModal, setIsOpenCreatingErrorModal] = useState(false);
  const [isOpenCreationCompleteModal, setIsOpenCreationCompleteModal] = useState(false);
  const chainList = loadChainList();
  const { chainId } = useAccount();
  const { data: hash, error, isPending, isSuccess, writeContract } = useWriteContract();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  useEffect(() => {
    setIsOpenCreatingModal(isPending && !error);
    setIsOpenCreatingErrorModal(!!error);
    setIsOpenCreationCompleteModal(isSuccess);
  }, [isPending, error, isSuccess]);

  const handleBlockchainChange = async (id: number) => {
    if (chainId === id) return;
    try {
      await switchChain(config, { chainId: id });
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    writeContract({
      address: loadContractData(chainId)?.factory!,
      abi: ERC721Factory.abi,
      functionName: "createERC721Collection",
      args: [data.name, data.symbol],
    });
  };

  return (
    <div className="flex flex-col items-center mt-2">
      <form className="w-1/3" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-2xl font-semibold">Create new collection</h2>
        <div className="mt-3">
          <div className="text-lg font-semibold">Standard</div>
          <div className="text-lg">ERC-721</div>
        </div>
        <div className="mt-8">
          <div className="text-lg font-semibold">Choose blockchain</div>
          <div className="mt-4">
            <BlockchainCardList blockchains={chainList} selectedChainId={chainId} handleBlockchainChange={handleBlockchainChange} />
          </div>
          <div className="mt-8">
            <Input label="Name" id="name" register={register} required="Username is required" errors={errors} />
          </div>
          <div className="mt-8">
            <Input label="Symbol" id="symbol" register={register} required="Symbol is required" errors={errors} />
          </div>
          <div className="mt-8">
            <Textarea label="Description" id="description" register={register} required="Description is required" errors={errors} />
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button type="submit" className="bg-blue-600 rounded p-2">
            Create collection
          </button>
        </div>
      </form>
      <CreatingModal isModalOpen={isOpenCreatingModal} closeModal={() => setIsOpenCreatingModal(false)} />
      <CreatingErrorModal
        isModalOpen={isOpenCreatingErrorModal}
        closeModal={() => setIsOpenCreatingErrorModal(false)}
        retry={handleSubmit(onSubmit)}
      />
      <CreationCompleteModal
        isModalOpen={isOpenCreationCompleteModal}
        closeModal={() => setIsOpenCreationCompleteModal(false)}
        hash={hash}
      />
    </div>
  );
};

export default CreateCollection;
