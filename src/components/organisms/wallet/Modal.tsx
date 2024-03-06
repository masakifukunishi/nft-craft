import Modal from "react-modal";
import { IoMdClose } from "react-icons/io";
import { Connector, useConnect, useAccount, useSignMessage } from "wagmi";
import { SiweMessage } from "siwe";
import { getCsrfToken, signIn } from "next-auth/react";

import Item from "@/components/organisms/wallet/Item";
import customModalStyles from "@/styles/modal";

type Props = {
  isModalOpen: boolean;
  closeModal: () => void;
  isShouldCloseOnOverlayClick?: boolean;
};

const WalletModal = ({ isModalOpen, closeModal, isShouldCloseOnOverlayClick = true }: Props) => {
  const { connectors, connect } = useConnect();
  const { isConnected, address, chainId } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const login = async (address: `0x${string}`, chainId: number) => {
    try {
      const callbackUrl = "/protected";
      const message = new SiweMessage({
        domain: window.location.host,
        address: address,
        statement: process.env.NEXT_PUBLIC_SIGNIN_MESSAGE,
        uri: window.location.origin,
        version: "1",
        chainId: chainId,
        nonce: await getCsrfToken(),
      });

      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      });

      const response = await signIn("siwe", {
        message: JSON.stringify(message),
        redirect: true,
        signature,
        callbackUrl,
      });
      if (response?.error) {
        console.log("Error occured:", response.error);
      }
    } catch (error) {
      console.log("Error Occured", error);
    }
  };

  const connectWalletAndLogin = (connector: Connector) => {
    connect({ connector: connector }, { onSuccess: (data) => login(data.accounts[0], data.chainId) });
  };

  const handleConnect = (connector: Connector) => {
    if (isConnected) {
      login(address!, chainId!);
    } else {
      connectWalletAndLogin(connector);
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={customModalStyles}
      shouldCloseOnOverlayClick={isShouldCloseOnOverlayClick}
      ariaHideApp={false}
    >
      <div className="my-2 p-1">
        <div className="flex justify-between items-center">
          <div className="text-xl font-semibold ">Connect Wallet</div>
          <div className="bg-base-black-light p-2 rounded-full cursor-pointer">
            <IoMdClose size={20} className="cursor-pointer" onClick={closeModal} />
          </div>
        </div>
        <div className="text-sm text-gray-400 mt-3">Connect with one of our available wallet providers or create a new one.</div>

        <div className="mt-5">
          {connectors.map((connector) => (
            <Item key={connector.uid} connector={connector} connectWallet={handleConnect} />
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default WalletModal;
