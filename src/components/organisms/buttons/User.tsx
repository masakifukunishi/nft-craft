import { useState } from "react";
import { useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";

import WalletModal from "@/components/organisms/modals/Wallet";
import { selectWallet } from "@/store/slicers/wallet";

const User = () => {
  const wallet = useSelector(selectWallet);

  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const closeWalletModal = () => {
    setIsWalletModalOpen(false);
  };

  return (
    <>
      <div className="bg-gray-700 p-2 rounded-md cursor-pointer">
        {wallet.accountAddress ? (
          <div className="bg-green-300 w-7 h-7 rounded-full"></div>
        ) : (
          <FaRegUserCircle size={30} onClick={() => setIsWalletModalOpen(true)} />
        )}
      </div>
      <WalletModal isModalOpen={isWalletModalOpen} closeModal={closeWalletModal} />
    </>
  );
};

export default User;
