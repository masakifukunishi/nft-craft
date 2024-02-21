import Modal from "react-modal";

import customModalStyles from "@/styles/modal";

type Props = {
  isModalOpen: boolean;
  closeModal: () => void;
  retry: () => void;
};

const CreatingErrorModal = ({ isModalOpen, closeModal, retry }: Props) => {
  return (
    <Modal isOpen={isModalOpen} onRequestClose={closeModal} style={customModalStyles}>
      <div className="flex flex-col items-center">
        <div className="text-xl font-bold mt-4">Error report</div>
        <button className="border border-0.5 rounded w-48 py-2 mt-4" onClick={retry}>
          Try again
        </button>
        <button className="border border-0.5 rounded w-48 py-2 mt-4" onClick={closeModal}>
          Close and continue
        </button>
      </div>
    </Modal>
  );
};

export default CreatingErrorModal;
