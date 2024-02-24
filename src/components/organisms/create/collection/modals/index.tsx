import Modal from "react-modal";

import Creating from "@/components/organisms/create/collection/modals/inner/Creating";
import Error from "@/components/organisms/create/collection/modals/inner/Error";
import Completed from "@/components/organisms/create/collection/modals/inner/Completed";

import customModalStyles from "@/styles/modal";

type Props = {
  isModalOpen: boolean;
  closeModal: () => void;
  uploadingStatus: "idle" | "minting" | "error" | "done";
  hash: `0x${string}` | undefined;
  retry: () => void;
};

const Create = ({ isModalOpen, closeModal, uploadingStatus, hash, retry }: Props) => {
  return (
    <Modal isOpen={isModalOpen} onRequestClose={closeModal} style={customModalStyles} shouldCloseOnOverlayClick={false} ariaHideApp={false}>
      {uploadingStatus === "idle" || uploadingStatus === "minting" ? (
        <Creating closeModal={closeModal} />
      ) : uploadingStatus === "error" ? (
        <Error closeModal={closeModal} retry={retry} />
      ) : uploadingStatus === "done" ? (
        <Completed closeModal={closeModal} hash={hash} />
      ) : null}
    </Modal>
  );
};

export default Create;
