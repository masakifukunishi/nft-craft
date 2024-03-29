import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
dotenv.config();

const privateKey0: string = process.env.PRIVATE_KEY ?? "";
const sepoliaUrl: string = process.env.SEPOLIA_URL ?? "";
const etherscanApiKey: string = process.env.ETHERSCAN_API_KEY ?? "";
const polygonscanApiKey: string = process.env.POLYGONSCAN_API_KEY ?? "";

const networks: any = {};
const etherscan: any = {};

if (privateKey0 && sepoliaUrl) {
  networks.sepolia = {
    url: sepoliaUrl,
    accounts: [privateKey0],
    chainId: 11155111,
  };
}

if (etherscanApiKey) {
  etherscan.apiKey = etherscanApiKey;
}

if (polygonscanApiKey) {
  etherscan.apiKey = polygonscanApiKey;
}

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks,
  etherscan,
};

export default config;
