import Modal from "react-modal";
import { IoMdClose } from "react-icons/io";
import { Connector, useConnect } from "wagmi";

import Item from "@/components/organisms/wallet/Item";
import customModalStyles from "@/styles/modal";

type Props = {
  isModalOpen: boolean;
  closeModal: () => void;
  isShouldCloseOnOverlayClick?: boolean;
};

const WalletModal = ({ isModalOpen, closeModal, isShouldCloseOnOverlayClick = true }: Props) => {
  const { connectors, connect } = useConnect();

  const connectWallet = (connector: Connector) => {
    connect({ connector });
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={customModalStyles}
      shouldCloseOnOverlayClick={isShouldCloseOnOverlayClick}
      ariaHideApp={false}
    >
      <div className="my-3 p-1">
        <div className="flex justify-between items-center">
          <div className="text-xl font-semibold ">Connect Wallet</div>
          <div className="bg-base-black p-2 rounded-full cursor-pointer">
            <IoMdClose size={20} className="cursor-pointer" onClick={closeModal} />
          </div>
        </div>
        <div className="text-sm text-gray-400 mt-3">Connect with one of our available wallet providers or create a new one.</div>

        <div className="mt-5">
          {connectors.map((connector) => (
            <Item key={connector.uid} connector={connector} connectWallet={connectWallet} />
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default WalletModal;
