import { useState } from "react";

import { MdOutlineWallet } from "react-icons/md";
import WalletModal from "@/components/organisms/wallet/Modal";

const ConnectWallet = () => {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

  const closeWalletModal = () => {
    setIsWalletModalOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsWalletModalOpen(true)} className="md:hidden font-bold bg-gray-700 rounded-md cursor-pointer p-2">
        <MdOutlineWallet size={23} />
      </button>
      <button
        onClick={() => setIsWalletModalOpen(true)}
        className="hidden md:flex bg-base-white text-base-black font-semibold text-sm py-2 px-3 rounded-md cursor-pointer"
      >
        Connect Wallet
      </button>
      <WalletModal isModalOpen={isWalletModalOpen} closeModal={closeWalletModal} />
    </>
  );
};

export default ConnectWallet;
