import Modal from "react-modal";
import { IoMdClose } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { Connector, useConnect, useAccount, useSignMessage } from "wagmi";
import { SiweMessage } from "siwe";
import { getCsrfToken, signIn } from "next-auth/react";

import Item from "@/components/organisms/wallet/Item";
import { setModalState, selectModalState } from "@/store/slicers/authModal";
import customModalStyles from "@/styles/modal";

const WalletModal = () => {
  const { connectors, connect } = useConnect();
  const { isConnected, address, chainId } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { isOpen: isModalOpen } = useSelector(selectModalState);
  const dispatch = useDispatch();
  const closeModal = () => dispatch(setModalState({ isOpen: false }));

  const login = async (address: `0x${string}`, chainId: number) => {
    try {
      const queryParams = new URLSearchParams(window.location.search);
      const callbackUrl = queryParams.get("callbackUrl") || undefined;

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
        redirect: !!callbackUrl,
        signature,
        callbackUrl,
      });
      if (response?.error) {
        console.log("Error occured:", response.error);
      }
      closeModal();
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
    <Modal isOpen={isModalOpen} onRequestClose={closeModal} style={customModalStyles} shouldCloseOnOverlayClick={true} ariaHideApp={false}>
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
