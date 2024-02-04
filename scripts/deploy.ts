import { ethers } from "hardhat";

async function main() {
  const [account0] = await ethers.getSigners();
  if (account0.provider === undefined) {
    throw new Error("No provider available");
  }

  const chainId = (await account0.provider.getNetwork()).chainId;

  const Factory = await ethers.getContractFactory("ERC721Factory");
  const factory = await Factory.deploy();
  await factory.deployed();
  console.log(JSON.stringify({ chainId, factory: factory.address }));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
