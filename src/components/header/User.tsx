import { useState } from "react";
import { ethers, providers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";
import { useDispatch } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";

import { setWallet } from "../../store/slicers/wallet";
import { loadContractData } from "../../lib/load";
import WalletModal from "../modals/Wallet";

const User = () => {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const closeWalletModal = () => {
    setIsWalletModalOpen(false);
  };

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
      console.log(signer);

      dispatch(
        setWallet({
          chainId: chainId,
          accountAddress: ethers.utils.getAddress(accountList[0]),
          signer: signer,
          contractAddress: loadContractData(chainId)?.factory,
        })
      );
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
    <>
      <div className="bg-gray-700 p-2 rounded-md cursor-pointer">
        <FaRegUserCircle size={30} onClick={() => setIsWalletModalOpen(true)} />
      </div>
      <WalletModal isModalOpen={isWalletModalOpen} closeModal={closeWalletModal} />
    </>
  );
};

export default User;
