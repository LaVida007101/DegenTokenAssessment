import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { ethers } = require("hardhat");
import { expect } from "chai";

describe("DegenToken", function () {
    let DegenToken, degenToken, owner, addr1, addr2;

    beforeEach(async () => {
        DegenToken = await ethers.getContractFactory("DegenToken");
        [owner, addr1, addr2] = await ethers.getSigners();
        degenToken = await DegenToken.deploy();
        await degenToken.deployed();
    });

    it("Should have the correct name and symbol", async () => {
        expect(await degenToken.name()).to.equal("Degen");
        expect(await degenToken.symbol()).to.equal("DGN");
    });

    it("Should allow only the owner to mint tokens", async () => {
        let reverted = false;
        try {
            await degenToken.connect(addr1).mint(addr1.address, 1000);
        } catch (error) {
            reverted = true;
        }
        expect(reverted).to.be.true;

        await degenToken.mint(addr1.address, 1000);
        expect((await degenToken.balanceOf(addr1.address)).toNumber()).to.equal(1000);
    });

    it("Should allow users to transfer tokens", async () => {
        await degenToken.mint(owner.address, 1000);
        await degenToken.connect(owner).transfer(addr1.address, 500);
        expect((await degenToken.balanceOf(addr1.address)).toNumber()).to.equal(500);
    });

    it("Should allow users to redeem tokens", async () => {
        await degenToken.mint(owner.address, 1000);
        await degenToken.connect(owner).redeemTokens(500);
        expect((await degenToken.balanceOf(owner.address)).toNumber()).to.equal(500);
    });

    it("Should allow users to burn tokens", async () => {
        await degenToken.mint(owner.address, 1000);
        await degenToken.connect(owner).burn(500);
        expect((await degenToken.balanceOf(owner.address)).toNumber()).to.equal(500);
    });

    it("Should allow checking balances", async () => {
        await degenToken.mint(addr1.address, 1000);
        expect((await degenToken.checkBalance(addr1.address)).toNumber()).to.equal(1000);
    });

    it("Should not allow burning more tokens than the balance", async () => {
        let reverted = false;
        try {
            await degenToken.connect(addr1).burn(1500);
        } catch (error) {
            reverted = true;
        }
        expect(reverted).to.be.true;
    });
});
