import Modal from "react-modal";

import Miting from "@/components/organisms/collection/modals/inner/Minting";
import Error from "@/components/organisms/collection/modals/inner/Error";
import Completed from "@/components/organisms/collection/modals/inner/Completed";

import customModalStyles from "@/styles/modal";

type Props = {
  isModalOpen: boolean;
  closeModal: () => void;
  uploadingStatus: "idle" | "minting" | "error" | "done";
  hash: `0x${string}` | undefined;
  retry: () => void;
};

const CreatingModal = ({ isModalOpen, closeModal, uploadingStatus, hash, retry }: Props) => {
  return (
    <Modal isOpen={isModalOpen} onRequestClose={closeModal} style={customModalStyles}>
      {uploadingStatus === "idle" || uploadingStatus === "minting" ? (
        <Miting closeModal={closeModal} />
      ) : uploadingStatus === "error" ? (
        <Error closeModal={closeModal} retry={retry} />
      ) : (
        <Completed closeModal={closeModal} hash={hash} />
      )}
    </Modal>
  );
};

export default CreatingModal;
