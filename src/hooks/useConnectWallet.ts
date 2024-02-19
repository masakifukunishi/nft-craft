import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { ethers, providers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";
import { setWallet, setChainId } from "@/store/slicers/wallet";
import { loadContractData } from "@/lib/load";

export const useConnectWallet = (closeModal: () => void) => {
  const dispatch = useDispatch();

  const connectWallet = useCallback(async () => {
    const provider = await detectEthereumProvider({ silent: true });
    if (provider) {
      const ethersProvider = new providers.Web3Provider(provider);
      const accountList = await ethersProvider.listAccounts();
      if (accountList.length === 0) {
        alert("Please unlock Metamask Wallet and/or connect to an account.");
        return;
      }
      const network = await ethersProvider.getNetwork();
      const chainId = network.chainId;
      const signer = ethersProvider.getSigner();

      const message = "Please sign this message to confirm your identity.";
      try {
        const signature = await signer.signMessage(message);
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
      provider.on("chainChanged", async () => {
        const provider = await detectEthereumProvider({ silent: true });
        if (provider) {
          const ethersProvider = new providers.Web3Provider(provider);
          const accountList = await ethersProvider.listAccounts();
          if (accountList.length === 0) {
            alert("Please unlock Metamask Wallet and/or connect to an account.");
            return;
          }
          const network = await ethersProvider.getNetwork();
          const chainId = network.chainId;
          setChainId(chainId);
          console.log("chainChanged", chainId);
        }
      });
      provider.on("accountsChanged", () => {
        // window.location.reload();
      });
    } else {
      alert("Please install Metamask Wallet.");
    }
  }, [dispatch, closeModal]);

  return connectWallet;
};
