import { ethers, providers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";

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
    setAccountAddress(ethers.utils.getAddress(accountList[0]));
    // chainId
    const network = await ethersProvider.getNetwork();
    const chainId = network.chainId;
    setChainId(chainId);
    // signer
    const signer = ethersProvider.getSigner();
    setSigner(signer);

    // contract address
    setFactoryAddress(loadContractData(chainId)?.factory);

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

const Header = () => {
  return (
    <div>
      {" "}
      <div className="text-gray-50 cursor-pointer" onClick={() => connectWallet()}>
        Connect Wallet
      </div>
    </div>
  );
};

export default Header;
