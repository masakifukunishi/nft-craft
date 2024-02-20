import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { type BaseError, useWriteContract, useAccount } from "wagmi";
import { switchChain } from "@wagmi/core";

import { loadContractData, loadChainList } from "@/lib/load";
import Layout from "@/components/organisms/layout";
import BlockchainCardList from "@/components/organisms/form/card-lists/Blockchain";
import Input from "@/components/molecules/form/Input";
import Textarea from "@/components/molecules/form/Textarea";
import ERC721Factory from "../../../../hardhat/artifacts/contracts/ERC721Factory.sol/ERC721Factory.json";
import { config } from "../../../../config";

type FormInput = {
  name: string;
  symbol: string;
  description: string;
  blockchainId: number;
};

const CreateCollection = () => {
  const chainList = loadChainList();
  const { chainId } = useAccount();
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const [selectedChainId, setSelectedChainId] = useState(0);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormInput>();

  useEffect(() => {
    register("blockchainId", { required: "Blockchain is required" });
  }, [register]);

  const handleBlockchainChange = (id: number) => {
    setSelectedChainId(id);
    setValue("blockchainId", id, { shouldValidate: true });
  };

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    if (!chainId) {
      return;
    }
    // await switchChain(config, { chainId: selectedChainId });
    writeContract({
      address: loadContractData(chainId)?.factory!,
      abi: ERC721Factory.abi,
      functionName: "createERC721Collection",
      args: [data.name, data.symbol],
    });
  };

  return (
    <Layout title="Create collection">
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
              <BlockchainCardList
                blockchains={chainList}
                selectedChainId={selectedChainId}
                handleBlockchainChange={handleBlockchainChange}
                errorMessage={errors.blockchainId?.message}
              />
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
      </div>
    </Layout>
  );
};

export default CreateCollection;
