const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TimeCapsule Contract", function () {
    let TimeCapsule, timeCapsule, owner, addr1;

    beforeEach(async function () {
        // Deploy the contract
        TimeCapsule = await ethers.getContractFactory("TimeCapsule");
        timeCapsule = await TimeCapsule.deploy();
        await timeCapsule.deployed();

        [owner, addr1] = await ethers.getSigners();
    });

    it("Should allow users to create a capsule", async function () {
        const lockTime = 60; // Lock time of 60 seconds
        const message = "Hello from the past!";

        await timeCapsule.connect(addr1).createCapsule(message, lockTime);

        const capsule = await timeCapsule.capsules(addr1.address);

        expect(capsule.message).to.equal(message);
        expect(capsule.unlockTime).to.be.greaterThan(0);
        expect(capsule.retrieved).to.equal(false);
    });

    it("Should not allow retrieval before unlock time", async function () {
        const lockTime = 60; // Lock time of 60 seconds
        const message = "This is locked!";

        await timeCapsule.connect(addr1).createCapsule(message, lockTime);

        await expect(
            timeCapsule.connect(addr1).retrieveCapsule()
        ).to.be.revertedWith("Capsule is still locked");
    });

    it("Should allow retrieval after unlock time", async function () {
        const lockTime = 1; // Lock time of 1 second
        const message = "Time to retrieve!";

        await timeCapsule.connect(addr1).createCapsule(message, lockTime);

        // Wait for 2 seconds to ensure the lock time has passed
        await ethers.provider.send("evm_increaseTime", [2]);
        await ethers.provider.send("evm_mine");

        await timeCapsule.connect(addr1).retrieveCapsule();

        const capsule = await timeCapsule.capsules(addr1.address);
        expect(capsule.retrieved).to.equal(true);
    });
});
