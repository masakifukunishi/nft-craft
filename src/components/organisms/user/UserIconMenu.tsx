import { useState, useEffect } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { FaRegUserCircle } from "react-icons/fa";

import WalletModal from "@/components/organisms/wallet/Modal";
import UserMenu from "@/components/organisms/drop-down-menu/UserMenu";

const User = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { isConnected } = useAccount();
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const { disconnect } = useDisconnect();

  const closeWalletModal = () => {
    setIsWalletModalOpen(false);
  };

  useEffect(() => {
    isConnected && closeWalletModal();
  }, [isConnected]);

  return (
    <>
      <div className="bg-gray-700 p-2 rounded-md cursor-pointer">
        {isConnected ? (
          <div className="relative">
            <div onMouseEnter={() => setIsUserMenuOpen(true)} onMouseLeave={() => setIsUserMenuOpen(false)}>
              <div className="bg-green-300 w-7 h-7 rounded-full" onClick={() => disconnect()} />
            </div>
            {isUserMenuOpen && <UserMenu setIsOpen={setIsUserMenuOpen} />}
          </div>
        ) : (
          <FaRegUserCircle size={30} onClick={() => setIsWalletModalOpen(true)} />
        )}
      </div>
      <WalletModal isModalOpen={isWalletModalOpen} closeModal={closeWalletModal} />
    </>
  );
};

export default User;
