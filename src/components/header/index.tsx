import { ethers, providers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";
import { useDispatch } from "react-redux";

import { setWallet } from "../../store/slicers/wallet";

const Header = () => {
  const dispatch = useDispatch();
  const connectWallet = async () => {
    console.log("connectWallet");
    dispatch(
      setWallet({
        chainId: "chainId",
        accountAddress: "accountAddres",
        signer: "signer",
        contractAddress: "contractAddress",
      })
    );
    // const provider = await detectEthereumProvider({ silent: true });
    // if (provider) {
    //   const ethersProvider = new providers.Web3Provider(provider);
    //   // account
    //   const accountList: string[] = await ethersProvider.listAccounts();
    //   if (accountList.length === 0) {
    //     alert("Please unlock Metamask Wallet and/or connect to an account.");
    //     return;
    //   }
    //   setAccountAddress(ethers.utils.getAddress(accountList[0]));
    //   // chainId
    //   const network = await ethersProvider.getNetwork();
    //   const chainId = network.chainId;
    //   setChainId(chainId);
    //   // signer
    //   const signer = ethersProvider.getSigner();
    //   setSigner(signer);

    //   // contract address
    //   setFactoryAddress(loadContractData(chainId)?.factory);

    //   provider.on("chainChanged", () => {
    //     window.location.reload();
    //   });
    //   provider.on("accountsChanged", () => {
    //     window.location.reload();
    //   });
    // } else {
    //   alert("Please install Metamask Wallet.");
    // }
  };
  return (
    <header>
      <div onClick={() => connectWallet()}>Connect Wallet</div>
    </header>
  );
};

export default Header;
