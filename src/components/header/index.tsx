import { ethers, providers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";
import { useDispatch } from "react-redux";

import { setWallet } from "../../store/slicers/wallet";
import { loadContractData } from "../../lib/load";

const Header = () => {
  const dispatch = useDispatch();
  const connectWallet = async () => {
    console.log("connectWallet");
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
    <header>
      <div onClick={() => connectWallet()}>Connect Wallet</div>
    </header>
  );
};

export default Header;
