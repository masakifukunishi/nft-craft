import { useState, useEffect } from "react";
import { NextPage } from "next";
import type { Signer, Contract } from "ethers";
import { ethers, providers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";
import { NFTStorage, File } from "nft.storage";

import { loadContractData } from "../lib/load";
import ERC721Factory from "../../hardhat/artifacts/contracts/ERC721Factory.sol/ERC721Factory.json";
import ERC721Collection from "../../hardhat/artifacts/contracts/ERC721Collection.sol/ERC721Collection.json";
import Header from "../components/header";

type Collection = {
  collectionAddress: string;
  name: string;
  symbol: string;
};

const Home: NextPage = () => {
  // wallet
  const [chainId, setChainId] = useState<number>();
  const [accountAddress, setAccountAddress] = useState<string>();
  const [signer, setSigner] = useState<Signer>();
  const [factoryAddress, setFactoryAddress] = useState<string>();
  // create collection
  const [collectionName, setCollectionName] = useState<string>();
  const [collectionSymbol, setCollectionSymbol] = useState<string>();
  const createCollection = async () => {
    const factoryContract: Contract = new ethers.Contract(factoryAddress!, ERC721Factory.abi, signer!.provider);
    const tx = await factoryContract.connect(signer!).createERC721Collection(collectionName, collectionSymbol);
    console.log("tx", tx);
  };

  // select collection
  const [collections, setCollections] = useState<Collection[]>([]);
  const [selectedCollectionAddress, setSelectedCollectionAddress] = useState("");
  const handleCollectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCollectionAddress(event.target.value);
  };
  useEffect(() => {
    const fetchCollections = async () => {
      if (!accountAddress || !factoryAddress || !signer) return;

      const factoryContract = new ethers.Contract(factoryAddress, ERC721Factory.abi, signer);
      try {
        const collections = await factoryContract.getCreatorCollections(accountAddress);
        setCollections(collections);
      } catch (error) {
        console.error("Failed to fetch collections", error);
      }
    };

    fetchCollections();
  }, [accountAddress, factoryAddress, signer]);

  // mint
  const [nftName, setNftName] = useState("");
  const [nftDescription, setNftDescription] = useState("");
  const [nftImage, setNftImage] = useState<File | null>(null);
  const [ipfsMetadataUrl, setIpfsMetadataUrl] = useState("");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setNftImage(event.target.files[0]);
    }
  };

  const uploadToNFTStorage = async () => {
    if (!nftImage) {
      alert("Image is required");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(nftImage);
    reader.onloadend = async () => {
      const base64Data = reader.result;
      const base64Content = base64Data?.toString().split(";base64,")[1];
      if (base64Content) {
        try {
          const response = await fetch("/api/upload", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: nftName,
              description: nftDescription,
              imageBase64: base64Content,
            }),
          });
          const data = await response.json();
          setIpfsMetadataUrl(data.ipfsMetadataUrl);
          if (response.ok) {
            console.log("Upload successful", data);
          } else {
            console.error("Upload failed", data.error);
          }
        } catch (error) {
          console.error("Error uploading the image", error);
        }
      }
    };
  };
  const mintNFt = async () => {
    if (!selectedCollectionAddress) {
      alert("Please select a collection");
      return;
    }
    if (!nftImage) {
      alert("Image is required");
      return;
    }
    if (!ipfsMetadataUrl) {
      alert("Please upload the image to NFT.Storage");
      return;
    }
    const collectionContract = new ethers.Contract(selectedCollectionAddress, ERC721Collection.abi, signer);
    const tx = await collectionContract.safeMint(accountAddress, ipfsMetadataUrl);
    console.log("tx", tx);
  };
  return (
    <div className="min-h-screen">
      <Header />
      <div>
        <div className="text-gray-50">ChainId: {chainId}</div>
        <div className="text-gray-50">Account: {accountAddress}</div>
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
        <div>
          <div>Your Collections</div>
          <select className="text-black" onChange={handleCollectionChange} value={selectedCollectionAddress}>
            {collections.map((collection, index) => (
              <option key={index} value={collection.collectionAddress}>
                {collection.name} ({collection.symbol}) - {collection.collectionAddress}
              </option>
            ))}
          </select>
        </div>
        <div>
          <div>
            <div>NFT Name</div>
            <input type="text" onChange={(e) => setNftName(e.target.value)} value={nftName} className="text-black" />
            <div>Description</div>
            <textarea onChange={(e) => setNftDescription(e.target.value)} value={nftDescription} className="text-black" />
            <div>Image</div>
            <input type="file" onChange={handleImageChange} className="text-black" />
          </div>
          <div>
            <button onClick={uploadToNFTStorage}>Upload to NFT.Storage</button>
          </div>
          <div>
            <button onClick={mintNFt}>Mint NFT</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
