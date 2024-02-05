import { useState } from "react";
import { NextPage } from "next";
import type { Signer, Contract } from "ethers";
import { ethers, providers, BigNumber } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";

import { loadContractData } from "../lib/load";
import ERC721Factory from "../../hardhat/artifacts/contracts/ERC721Factory.sol/ERC721Factory.json";

const Home: NextPage = () => {
  const [chainId, setChainId] = useState<number>();
  const [currentAccount, setCurrentAccount] = useState<string>();
  const [signer, setSigner] = useState<Signer>();
  const [factoryAddress, setFactoryAddress] = useState<string>();
  const [routerAddress, setRouterAddress] = useState<string>();
  const connectWallet = async () => {
    const provider = await detectEthereumProvider({ silent: true });
    if (provider) {
      const ethersProvider = new providers.Web3Provider(provider);
      console.log("ethersProvider", ethersProvider);
      // account
      const accountList: string[] = await ethersProvider.listAccounts();
      if (accountList.length === 0) {
        alert("Please unlock Metamask Wallet and/or connect to an account.");
        return;
      }
      console.log("accountList", accountList);
      setCurrentAccount(ethers.utils.getAddress(accountList[0]));
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

  const [collectionName, setCollectionName] = useState<string>();
  const [collectionSymbol, setCollectionSymbol] = useState<string>();
  const createCollection = async () => {
    const factoryContract: Contract = new ethers.Contract(factoryAddress!, ERC721Factory.abi, signer!.provider);
    const tx = await factoryContract.connect(signer!).createERC721Collection(collectionName, collectionSymbol);
    console.log("tx", tx);
  };

  return (
    <div className="bg-gray-900 text-gray-50 min-h-screen px-4">
      <div onClick={() => connectWallet()}>
        <div className="text-gray-50 cursor-pointer">Connect Wallet</div>
        <div className="text-gray-50">ChainId: {chainId}</div>
        <div className="text-gray-50">Account: {currentAccount}</div>
        <div className="text-gray-50">Factory: {factoryAddress}</div>
        <div>
          <div>new collection</div>
          <div>name</div>
          <input type="text" className="text-black" onChange={(e) => setCollectionName(e.target.value)} value={collectionName} />
          <div>symbol</div>
          <input type="text" className="text-black" onChange={(e) => setCollectionSymbol(e.target.value)} value={collectionSymbol} />
          <div>
            <button onClick={() => createCollection()}>Create</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
