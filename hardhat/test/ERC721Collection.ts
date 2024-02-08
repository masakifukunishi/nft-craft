import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

describe("ERC721Collection", function () {
  async function deployContractFixture() {
    const [account0, account1] = await ethers.getSigners();
    const ERC721Collection = await ethers.getContractFactory("ERC721Collection");
    const erc721Collection = await ERC721Collection.deploy("TestCollection", "TST", account0.address);
    await erc721Collection.deployed();
    return { erc721Collection, account0, account1 };
  }

  it("should mint tokens correctly", async function () {
    const { erc721Collection, account0 } = await loadFixture(deployContractFixture);

    await erc721Collection.safeMint(account0.address, "tokenURI1");
    await erc721Collection.safeMint(account0.address, "tokenURI2");

    const tokenURI1 = await erc721Collection.tokenURI(0);
    expect(tokenURI1).to.equal("tokenURI1");

    const tokenURI2 = await erc721Collection.tokenURI(1);
    expect(tokenURI2).to.equal("tokenURI2");
  });

  it("should not mint more than the maximum supply", async function () {
    const { erc721Collection, account0 } = await loadFixture(deployContractFixture);
    const MAX_SUPPLY = 100;

    for (let i = 0; i < MAX_SUPPLY; i++) {
      await erc721Collection.safeMint(account0.address, `tokenURI${i}`);
    }

    await expect(erc721Collection.safeMint(account0.address, "tokenURITooMany")).to.be.revertedWith(
      "Max supply reached. Cannot mint more."
    );
  });

  it("Only the owner can mint tokens", async function () {
    const { erc721Collection, account0, account1 } = await loadFixture(deployContractFixture);
    await expect(erc721Collection.connect(account1).safeMint(account0.address, "tokenURI")).to.be.revertedWith(
      "Ownable: caller is not the owner"
    );
  });
});
