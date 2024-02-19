import Image from "next/image";
import Modal from "react-modal";
import { IoMdClose } from "react-icons/io";
import { Connector, useConnect } from "wagmi";

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
  return (
    <div>
      <Modal isOpen={isModalOpen} onRequestClose={closeModal} style={customStyles}>
        <div>
          <div className="flex justify-between items-center">
            <div className="text-lg font-bold">Connect Wallet</div>
            <div className="bg-gray-700 p-1 rounded-2xl cursor-pointer">
              <IoMdClose size={20} className="cursor-pointer" onClick={closeModal} />
            </div>
          </div>
          <div className="mt-2">
            <div className="bg-gray-700 p-1 rounded-md flex cursor-pointer items-center">
              <Image src="/icons/wallets/metamask.png" width={32} height={32} alt="Metamask icon" />
              <div className="ml-2">MetaMask</div>
            </div>
          </div>
          <div className="mt-2">Only MetaMask now, more later!</div>
        </div>
        {connectors.map((connector) => (
          <button key={connector.uid} onClick={() => connectWallet(connector)}>
            {connector.name}
          </button>
        ))}
      </Modal>
    </div>
  );
};

export default WalletModal;
