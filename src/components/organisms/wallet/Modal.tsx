import Image from "next/image";
import Modal from "react-modal";
import { IoMdClose } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { Connector, useConnect } from "wagmi";

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
      <div className="flex justify-between items-center">
        <div className="text-lg font-bold">Connect Wallet</div>
        <div className="bg-gray-700 p-1 rounded-2xl cursor-pointer">
          <IoMdClose size={20} className="cursor-pointer" onClick={closeModal} />
        </div>
      </div>
      <div className="mt-2">
        {connectors.map((connector) => (
          <div className="my-3" key={connector.uid}>
            <div className="bg-gray-700 p-2 rounded-md flex cursor-pointer items-center" onClick={() => connectWallet(connector)}>
              {connector.icon ? <Image src={connector.icon} width={32} height={32} alt="Metamask icon" /> : <FaRegUserCircle size={32} />}
              <div className="ml-2"> {connector.name}</div>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default WalletModal;
