import { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";

import WalletModal from "../modals/Wallet";

const User = () => {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const closeWalletModal = () => {
    setIsWalletModalOpen(false);
  };

  return (
    <>
      <div className="bg-gray-700 p-2 rounded-md cursor-pointer">
        <FaRegUserCircle size={30} onClick={() => setIsWalletModalOpen(true)} />
      </div>
      <WalletModal isModalOpen={isWalletModalOpen} closeModal={closeWalletModal} />
    </>
  );
};

export default User;
