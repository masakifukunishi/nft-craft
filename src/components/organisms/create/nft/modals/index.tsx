import Modal from "react-modal";

import Creating from "@/components/organisms/create/nft/modals/inner/Creating";
import Error from "@/components/organisms/create/nft/modals/inner/Error";
import Completed from "@/components/organisms/create/nft/modals/inner/Completed";
import customModalStyles from "@/styles/modal";

type Props = {
  isModalOpen: boolean;
  closeModal: () => void;
  uploadingStatus: "idle" | "uploadingToIPFS" | "error" | "minting" | "done";
  hash: `0x${string}` | undefined;
};

const Create = ({ isModalOpen, closeModal, uploadingStatus, hash }: Props) => {
  return (
    <Modal isOpen={isModalOpen} onRequestClose={closeModal} style={customModalStyles} shouldCloseOnOverlayClick={false} ariaHideApp={false}>
      {uploadingStatus === "idle" || uploadingStatus === "uploadingToIPFS" || uploadingStatus === "minting" ? (
        <Creating closeModal={closeModal} uploadingStatus={uploadingStatus} />
      ) : uploadingStatus === "error" ? (
        <Error closeModal={closeModal} />
      ) : uploadingStatus === "done" ? (
        <Completed closeModal={closeModal} hash={hash} />
      ) : null}
    </Modal>
  );
};

export default Create;
