const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyNFT", function () {
  it("Should return the new greeting once it's changed", async function () {
    const SocialNFT = await ethers.getContractFactory("SocialNFT");
    const social = await SocialNFT.deploy();
    await social.deployed();

    const recipient = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266';
    const metadataURI = 'https://88zypgg1anc1.usemoralis.com:2053/server/files/uoHAU07gdCDSacUuM4B3wq0v4fz93JSWF76WGct9/QmVRLq4goCvufcinAbin8oceMK7LBPTSMwAxii2KKpkGhp.txt';

    let balance = await social.balanceOf(recipient);
    expect(balance).to.equal(0)

    const newlyMintedToken = await social.payToMint(recipient, metadataURI, { value: ethers.utils.parseEther('0.01')})

    await newlyMintedToken.wait();

    balance = await social.balanceOf(recipient)
    expect(balance).to.equal(1);

    expect(await social.isContentOwned(metadataURI)).to.equal(true);
  });
});
