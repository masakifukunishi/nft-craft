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
import ERC721Factory from "../../../../hardhat/artifacts/contracts/ERC721Factory.sol/ERC721Factory.json";
import { config } from "../../../../config";

type FormInput = {
  name: string;
  symbol: string;
  description: string;
};

const CreateCollection = () => {
  const [isCreatingModalOpen, setIsCreatingModalOpen] = useState(false);
  const [isCreatingErrorModalOpen, setIsCreatingErrorModalOpen] = useState(false);
  const chainList = loadChainList();
  const { chainId } = useAccount();
  const { data: hash, error, isPending, writeContract } = useWriteContract();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  useEffect(() => {
    if (isPending && !error) {
      setIsCreatingModalOpen(true);
    } else {
      setIsCreatingModalOpen(false);
    }
  }, [isPending, error]);

  useEffect(() => {
    if (error) {
      setIsCreatingErrorModalOpen(true);
    } else {
      setIsCreatingErrorModalOpen(false);
    }
  }, [error]);

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
            {hash && <div>Transaction Hash: {hash}</div>}
            {isPending ? "Confirming..." : "Mint"}
          </button>
          {error && <div>Error: {(error as BaseError).shortMessage || error.message}</div>}
        </div>
      </form>
      {/* <CreatingCollectionModal isModalOpen={isCreatingModalOpen || isPending} closeModal={() => setIsCreatingModalOpen(false)} /> */}
      <CreatingModal isModalOpen={isCreatingModalOpen} closeModal={() => setIsCreatingModalOpen(false)} />
      <CreatingErrorModal isModalOpen={isCreatingErrorModalOpen} closeModal={() => setIsCreatingErrorModalOpen(false)} retry={() => {}} />
    </div>
  );
};

export default CreateCollection;
