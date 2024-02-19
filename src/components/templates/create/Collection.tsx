import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSelector } from "react-redux";
import type { Contract } from "ethers";
import { ethers } from "ethers";
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";

import { selectWallet } from "@/store/slicers/wallet";
import Layout from "@/components/organisms/layout";
import BlockchainCardList from "@/components/organisms/form/card-lists/Blockchain";
import Input from "@/components/molecules/form/Input";
import Textarea from "@/components/molecules/form/Textarea";
import { loadContractData } from "@/lib/load";
import ERC721Factory from "../../../../hardhat/artifacts/contracts/ERC721Factory.sol/ERC721Factory.json";

const blockchains = [
  { id: 1, imagePath: "/icons/blockchains/ethereum.png", name: "Ethereum" },
  { id: 137, imagePath: "/icons/blockchains/polygon.png", name: "Polygon" },
  { id: 11155111, imagePath: "/icons/blockchains/polygon.png", name: "Sepolia" },
];
type FormInput = {
  name: string;
  symbol: string;
  description: string;
  blockchainId: number;
};

const CreateCollection = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  console.log("ensName", ensName);
  console.log("ensAvatar", ensAvatar);
  console.log("address", address);
  console.log("disconnect", disconnect);
  const wallet = useSelector(selectWallet);
  const [selectedBlockhainId, setSelectedBlockhainId] = useState(0);
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

  useEffect(() => {
    register("blockchainId", { required: "Blockchain is required" });
  }, [register]);

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const factoryAddress = loadContractData(wallet?.chainId)?.factory;
    const factoryContract: Contract = new ethers.Contract(factoryAddress!, ERC721Factory.abi, wallet.signer!.provider);
    const tx = await factoryContract.connect(wallet.signer!).createERC721Collection(data.name, data.symbol);
    console.log("tx", tx);
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
                blockchains={blockchains}
                selectedBlockhainId={selectedBlockhainId}
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
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateCollection;
