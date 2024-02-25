import { useState } from "react";

import WalletModal from "@/components/organisms/wallet/Modal";

const ConnectWallet = () => {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

  const closeWalletModal = () => {
    setIsWalletModalOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsWalletModalOpen(true)}
        className="bg-base-white text-base-black font-semibold text-sm py-2 px-3 rounded-md cursor-pointer"
      >
        Connect Wallet
      </button>
      <WalletModal isModalOpen={isWalletModalOpen} closeModal={closeWalletModal} />
    </>
  );
};

export default ConnectWallet;
