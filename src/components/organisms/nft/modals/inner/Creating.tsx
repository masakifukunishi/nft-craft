import { FaCheck } from "react-icons/fa";

import Spinner from "@/components/atoms/Spinner";

type Props = {
  closeModal: () => void;
  uploadingStatus: "idle" | "uploadingToIPFS" | "minting";
};

const Creating = ({ closeModal, uploadingStatus }: Props) => {
  const LoadingIcon = <Spinner size={30} borderWidth={3} />;
  const NotExecutedIcon = <FaCheck size={30} />;
  const ExecutedIcon = <FaCheck size={30} className="text-blue-500" />;

  return (
    <div>
      <div className="text-xl font-bold">Follow steps</div>
      <div className="flex items-center mt-6">
        <div className="w-10">
          {uploadingStatus === "idle" && NotExecutedIcon}
          {uploadingStatus === "uploadingToIPFS" && LoadingIcon}
          {uploadingStatus === "minting" && ExecutedIcon}
        </div>
        <div className="w-64 ml-2">
          <div className="text-xl font-bold">Upload</div>
          <div className="text-sm">Uploading of all media assets and metadata to IPFS</div>
        </div>
      </div>
      <div className="flex items-center mt-6">
        <div className="w-10">
          {(uploadingStatus === "idle" || uploadingStatus === "uploadingToIPFS") && NotExecutedIcon}
          {uploadingStatus === "minting" && LoadingIcon}
        </div>
        <div className="w-64 ml-2">
          <div className="text-xl font-bold">Mint</div>
          <div className="text-sm">Send transaction to create your NFT</div>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <button className="border border-0.5 rounded w-32 py-2 mt-4" onClick={closeModal} disabled>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Creating;
