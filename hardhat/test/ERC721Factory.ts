import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

describe("ERC721CollectionFactory", function () {
  async function deployContractFixture() {
    const ERC721CollectionFactory = await ethers.getContractFactory("ERC721CollectionFactory");
    const eRC721CollectionFactory = await ERC721CollectionFactory.deploy();
    await eRC721CollectionFactory.deployed();
    return { eRC721CollectionFactory };
  }

  it("should emit an ERC721CollectionCreated event upon collection creation", async function () {
    const [account0] = await ethers.getSigners();
    const { eRC721CollectionFactory } = await loadFixture(deployContractFixture);
    const name = "TestCollection";
    const symbol = "TST";

    const tx = await eRC721CollectionFactory.createERC721Collection(name, symbol);
    const receipt = await tx.wait();

    const event = receipt.events?.find((e) => e.event === "ERC721CollectionCreated");
    expect(event).to.not.be.undefined;
    expect(event?.args?.creator).to.equal(account0.address);
    expect(event?.args?.name).to.equal(name);
    expect(event?.args?.symbol).to.equal(symbol);
  });

  it("should correctly record collection information upon creation", async function () {
    const [account0] = await ethers.getSigners();
    const { eRC721CollectionFactory } = await loadFixture(deployContractFixture);
    const name = "TestCollection";
    const symbol = "TST";

    await eRC721CollectionFactory.createERC721Collection(name, symbol);

    const collections = await eRC721CollectionFactory.getCreatorCollections(account0.address);
    expect(collections.length).to.equal(1);

    const collectionInfo = collections[0];
    expect(collectionInfo.name).to.equal(name);
    expect(collectionInfo.symbol).to.equal(symbol);
  });
});
