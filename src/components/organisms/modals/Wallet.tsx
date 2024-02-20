import { useEffect } from "react";
import Image from "next/image";
import Modal from "react-modal";
import { IoMdClose } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { Connector, useConnect, useAccount } from "wagmi";

type Props = {
  isModalOpen: boolean;
  closeModal: () => void;
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    border: "none",
    backgroundColor: "#1F2937",
    color: "#F9FAFB",
    width: "330px",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
};

const WalletModal = ({ isModalOpen, closeModal }: Props) => {
  const { connectors, connect } = useConnect();

  const connectWallet = (connector: Connector) => {
    connect({ connector });
  };

  const { isConnected } = useAccount();
  useEffect(() => {
    isConnected && closeModal();
  }, [isConnected]);

  return (
    <Modal isOpen={isModalOpen} onRequestClose={closeModal} style={customStyles}>
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
