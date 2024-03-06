import { use, useEffect } from "react";
import Modal from "react-modal";
import { IoMdClose } from "react-icons/io";
import { Connector, useConnect, useAccount, useSignMessage } from "wagmi";
import { SiweMessage } from "siwe";
import { getCsrfToken, signIn, useSession } from "next-auth/react";

import Item from "@/components/organisms/wallet/Item";
import customModalStyles from "@/styles/modal";
import { log } from "console";

type Props = {
  isModalOpen: boolean;
  closeModal: () => void;
  isShouldCloseOnOverlayClick?: boolean;
};

const WalletModal = ({ isModalOpen, closeModal, isShouldCloseOnOverlayClick = true }: Props) => {
  const { connectors, connect } = useConnect();
  const { address, chainId } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { data: session } = useSession();

  const login = async () => {
    try {
      const callbackUrl = "/protected";
      const message = new SiweMessage({
        domain: window.location.host,
        address: address as `0x${string}`,
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
  // use onSuccess in connect
  const connectWallet = (connector: Connector) => {
    connect(
      {
        connector: connector,
      },
      {
        onSuccess: (data, variables, context) => {
          // 接続成功時に行いたい処理をここに記述
          login();
        },
        onError: (error, variables, context) => {
          // エラー発生時の処理をここに記述
          console.error("接続エラー", error);
        },
        onSettled: (data, error, variables, context) => {
          // 接続が成功したかエラーが発生した後の処理をここに記述
          if (error) {
            console.log("接続後のエラー処理", error);
          } else {
            console.log("接続が確立された後の処理", data);
          }
        },
      }
    );
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
            <Item key={connector.uid} connector={connector} connectWallet={connectWallet} />
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default WalletModal;
