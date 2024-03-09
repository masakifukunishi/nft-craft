import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
dotenv.config();

const privateKey0: string = process.env.PRIVATE_KEY ?? "";
const sepoliaUrl: string = process.env.SEPOLIA_URL ?? "";
const mumbaiUrl: string = process.env.MUMBAI_URL ?? "";
const etherscanApiKey: string = process.env.ETHERSCAN_API_KEY ?? "";

const networks: any = {};
const etherscan: any = {};

if (privateKey0 && sepoliaUrl) {
  networks.sepolia = {
    url: sepoliaUrl,
    accounts: [privateKey0],
    chainId: 11155111,
  };
  networks.mumbai = {
    url: mumbaiUrl,
    accounts: [privateKey0],
    chainId: 80001,
  };
}

if (etherscanApiKey) {
  etherscan.apiKey = etherscanApiKey;
}

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks,
  etherscan,
};

export default config;
