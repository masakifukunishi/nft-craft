import Image from "next/image";
import Modal from "react-modal";
import { ethers, providers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";
import { useDispatch } from "react-redux";
import { IoMdClose } from "react-icons/io";

import { setWallet } from "@/store/slicers/wallet";
import { loadContractData } from "@/lib/load";

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
  const dispatch = useDispatch();
  const connectWallet = async () => {
    const provider = await detectEthereumProvider({ silent: true });
    if (provider) {
      const ethersProvider = new providers.Web3Provider(provider);
      // account
      const accountList: string[] = await ethersProvider.listAccounts();
      if (accountList.length === 0) {
        alert("Please unlock Metamask Wallet and/or connect to an account.");
        return;
      }
      // chainId
      const network = await ethersProvider.getNetwork();
      const chainId = network.chainId;
      // signer
      const signer = ethersProvider.getSigner();

      const message = "Please sign this message to confirm your identity.";
      try {
        const signature = await signer.signMessage(message);
        console.log("chainId", chainId);
        console.log("accountList", accountList);
        console.log("signer", signer);
        console.log("signature", signature);
        dispatch(
          setWallet({
            chainId: chainId,
            accountAddress: ethers.utils.getAddress(accountList[0]),
            signer: signer,
            contractAddress: loadContractData(chainId)?.factory,
          })
        );
        closeModal();
      } catch (error) {
        console.error("Error signing message: ", error);
        alert("Failed to sign the message.");
      }
      provider.on("chainChanged", () => {
        window.location.reload();
      });
      provider.on("accountsChanged", () => {
        window.location.reload();
      });
    } else {
      alert("Please install Metamask Wallet.");
    }
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
            <div className="bg-gray-700 p-1 rounded-md flex cursor-pointer items-center" onClick={connectWallet}>
              <Image src="/icons/wallets/metamask.png" width={32} height={32} alt="Metamask icon" />
              <div className="ml-2">MetaMask</div>
            </div>
          </div>
          <div className="mt-2">Only MetaMask now, more later!</div>
        </div>
      </Modal>
    </div>
  );
};

export default WalletModal;
