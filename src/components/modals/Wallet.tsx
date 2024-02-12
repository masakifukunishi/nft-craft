import React from "react";
import Modal from "react-modal";

type Props = {
  isModalOpen: boolean;
  closeModal: () => void;
};
const WalletModal = ({ isModalOpen, closeModal }: Props) => {
  return (
    <div>
      <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
        <button onClick={closeModal}>Close Modal</button>
      </Modal>
    </div>
  );
};

export default WalletModal;
