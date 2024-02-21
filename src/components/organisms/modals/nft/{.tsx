import Modal from "react-modal";
import { type WriteContractErrorType } from "@wagmi/core";
import { FaCheck } from "react-icons/fa";

import Spinner from "@/components/atoms/Spinner";
import customModalStyles from "@/styles/modal";

type Props = {
  isModalOpen: boolean;
  closeModal: () => void;
  uploadingStatus: "idle" | "uploadingToIPFS" | "minting" | "done";
  error: WriteContractErrorType | null;
  hash: `0x${string}` | undefined;
};

const CreatingModal = ({ isModalOpen, closeModal, uploadingStatus, error, hash }: Props) => {
  return (
    <Modal isOpen={isModalOpen} onRequestClose={closeModal} style={customModalStyles}>
      <div>
        <div className="text-xl font-bold">Follow steps</div>
        <div className="flex items-center mt-6">
          <div className="w-10">
            {uploadingStatus === "idle" && <FaCheck size={30} />}
            {uploadingStatus === "uploadingToIPFS" && <Spinner size={30} borderWidth={3} />}
            {uploadingStatus === "minting" && <FaCheck size={30} className="text-blue-500" />}
            {uploadingStatus === "done" && <FaCheck size={30} className="text-blue-500" />}
          </div>
          <div className="w-64 ml-2">
            <div className="text-xl font-bold">Upload</div>
            <div className="text-sm">Uploading of all media assets and metadata to IPFS</div>
          </div>
        </div>
        <div className="flex items-center mt-6">
          <div className="w-10">
            {uploadingStatus === "idle" && <FaCheck size={30} />}
            {uploadingStatus === "uploadingToIPFS" && <FaCheck size={30} />}
            {uploadingStatus === "minting" && <Spinner size={30} borderWidth={3} />}
            {uploadingStatus === "done" && <FaCheck size={30} className="text-blue-500" />}
          </div>
          <div className="w-64 ml-2">
            <div className="text-xl font-bold">Mint</div>
            <div className="text-sm">Send transaction to create your NFT</div>
          </div>
        </div>
        {/* {uploadingStatus === "done" && <div className="text-xl font-bold mt-4">NFT created</div>}
        {hash && (
          <div className="mt-4">
            <div className="text-xl font-bold">Transaction Hash</div>
            <div className="text-sm">{hash}</div>
          </div>
        )} */}
        <div className="flex justify-center mt-4">
          <button className="border border-0.5 rounded w-32 py-2 mt-4" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CreatingModal;
