import { ethers } from "ethers";
import ERC721Collection from "../artifacts/contracts/ERC721Collection.sol/ERC721Collection.json";
import { program, Option } from "commander";
import * as dotenv from "dotenv";
dotenv.config();

function getRpcUrl(network: string): string {
  if (network == "mumbai") {
    return process.env.MUMBAI_URL ?? "";
  } else if (network == "sepolia") {
    return process.env.SEPOLIA_URL ?? "";
  } else {
    return "";
  }
}

function transactionExplorerUrl(network: string, txHash: string): string {
  if (network == "mumbai") {
    return `https://mumbai.polygonscan.com//tx/${txHash}`;
  } else if (network == "sepolia") {
    return `https://sepolia.etherscan.io/tx/${txHash}`;
  } else {
    return "";
  }
}

async function main(network: string, collectionAddress: string, accountAddress: string, uri: string) {
  const privateKey: string = process.env.PRIVATE_KEY ?? "";
  if (privateKey === "") {
    throw new Error("No value set for environement variable PRIVATE_KEY");
  }
  const rpcUrl: string = getRpcUrl(network);
  if (rpcUrl === "") {
    throw new Error("No value set for environement variable URL");
  }

  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  const signer = new ethers.Wallet(privateKey, provider);

  const contract = new ethers.Contract(collectionAddress, ERC721Collection.abi, signer);
  const tx = await contract.safeMint(accountAddress, uri);
  console.log(`Transaction URL: ${transactionExplorerUrl(network, tx.hash)}`);

  const receipt = await tx.wait();
  console.log("completed");
  for (let log of receipt.logs) {
    try {
      const event = contract.interface.parseLog(log);
      console.log(`Event Name: ${event["name"]}`);
      console.log(`      Args: ${event["args"]}`);
    } catch (e) {}
  }
}

program
  .addOption(
    new Option("--network <string>", "name of blockchain network(e.g. mumbai, sepolia)")
      .choices(["mumbai", "sepolia"])
      .makeOptionMandatory()
  )
  .addOption(new Option("--collectionAddress <address>", "address of token contract").makeOptionMandatory())
  .addOption(new Option("--accountAddress <address>", "mint token to this account address").makeOptionMandatory())
  .addOption(new Option("--uri <string>", "URI of the token").makeOptionMandatory())
  .parse();
const options = program.opts();

main(options.network, options.collectionAddress, options.accountAddress, options.uri).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
