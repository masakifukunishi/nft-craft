import Modal from "react-modal";

import Spinner from "@/components/atoms/Spinner";
import customModalStyles from "@/styles/modal";

type Props = {
  isModalOpen: boolean;
  closeModal: () => void;
};

const CreatingCollectionModal = ({ isModalOpen, closeModal }: Props) => {
  return (
    <Modal isOpen={isModalOpen} onRequestClose={closeModal} style={customModalStyles}>
      <div className="flex flex-col items-center">
        <div className="mt-3">
          <Spinner />
        </div>
        <div className="text-xl font-bold mt-8">Loading...</div>
        <div className="text-center mt-4">To continue send transaction with your wallet</div>
        <button className="border border-0.5 rounded w-32 py-2 mt-4" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default CreatingCollectionModal;
