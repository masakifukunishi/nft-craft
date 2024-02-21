import Modal from "react-modal";

import customModalStyles from "@/styles/modal";
import shortenString from "@/lib/shortenString";

type Props = {
  isModalOpen: boolean;
  closeModal: () => void;
  hash: `0x${string}` | undefined;
};

const CreationCompleteModal = ({ isModalOpen, closeModal, hash }: Props) => {
  const hashShortened = hash ? shortenString(hash, 10) : "";
  return (
    <Modal isOpen={isModalOpen} onRequestClose={closeModal} style={customModalStyles}>
      <div className="flex flex-col items-center">
        <div className="text-xl font-bold mt-4">Transaction sent</div>
        <div className="text-center mt-4">Your collection is deployed! You can check the transaction</div>
        {hash && <div className="mt-4">Transaction Hash: {shortenString(hashShortened, 10)}</div>}
        <button className="border border-0.5 rounded w-48 py-2 mt-4" onClick={closeModal}>
          Continue
        </button>
      </div>
    </Modal>
  );
};

export default CreationCompleteModal;
