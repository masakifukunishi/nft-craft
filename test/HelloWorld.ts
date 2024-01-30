import { expect } from "chai";
import { ethers } from "hardhat";

describe("HelloWorld contract", function () {
  it("getMessage returns HelloWorld", async function () {
    const HelloWorld = await ethers.deployContract("HelloWorld");
    await HelloWorld.waitForDeployment();

    console.log("HelloWorld deployed to:", await HelloWorld.getAddress());

    expect(await HelloWorld.getMessage()).to.equal("Hello World");
  });
});
