import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import Layout from "@/components/organisms/layout";
import BlockchainCardList from "@/components/organisms/card-lists/Blockchain";
import Input from "@/components/molecules/form/Input";
import Textarea from "@/components/molecules/form/Textarea";

const blockchains = [
  { id: 1, imagePath: "/icons/blockchains/ethereum.png", name: "Ethereum" },
  { id: 137, imagePath: "/icons/blockchains/polygon.png", name: "Polygon" },
];
type FormInput = {
  name: string;
};

const CreateCollection = () => {
  const [selectedBlockhain, setSelectedBlockhain] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    console.log(data);
  };

  return (
    <Layout title="Create collection">
      <div className="flex flex-col items-center mt-2">
        <form className="w-1/3" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-xl font-semibold">Create new collection</h2>
          <div className="mt-4">
            <div className="text-lg font-semibold">Standard</div>
            <div className="text-lg">ERC-721</div>
          </div>
          <div className="mt-4">
            <div className="text-lg font-semibold">Choose blockchain</div>
            <div className="mt-4">
              <BlockchainCardList
                blockchains={blockchains}
                selectedBlockhain={selectedBlockhain}
                setSelectedBlockhain={setSelectedBlockhain}
              />
            </div>
            <div className="mt-4">
              <Input label="Name" id="name" register={register} required="Username is required" errors={errors} />
            </div>
            <div className="mt-4">
              <Input label="Symbol" id="symbol" register={register} required="Symbol is required" errors={errors} />
            </div>
            <div className="mt-4">
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
