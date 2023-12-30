const { expect } = require("chai");
const { ethers } = require('hardhat')

describe("DecentralizedIdentity", function () {
  let DecentralizedIdentity;
  let decentralizedIdentity;
  let owner;
  let user;

  beforeEach(async function () {
    // Deploy the contract and get the contract instance and owner/user addresses
    DecentralizedIdentity = await ethers.getContractFactory("DecentralizedIdentity");
    [owner, user] = await ethers.getSigners();
    decentralizedIdentity = await DecentralizedIdentity.deploy();
    await decentralizedIdentity.deployed();
  });

  it("Should create a new identity", async function () {
    const newName = "Alice";
    const newAge = 25;

    await decentralizedIdentity.connect(user).createIdentity(newName, newAge);

    const identity = await decentralizedIdentity.getIdentity(user.address);
    expect(identity[0]).to.equal(newName);
    expect(identity[1]).to.equal(newAge);
  });

  it("Should update identity information", async function () {
    const newName = "Alice";
    const newAge = 25;
    const updatedName = "Alice Updated";
    const updatedAge = 26;

    await decentralizedIdentity.connect(user).createIdentity(newName, newAge);
    await decentralizedIdentity.connect(user).updateIdentity(updatedName, updatedAge);

    const identity = await decentralizedIdentity.getIdentity(user.address);
    expect(identity[0]).to.equal(updatedName);
    expect(identity[1]).to.equal(updatedAge);
  });

  it("Should revoke access and delete identity", async function () {
    const newName = "Alice";
    const newAge = 25;

    await decentralizedIdentity.connect(user).createIdentity(newName, newAge);
    await decentralizedIdentity.connect(user).revokeAccess();

    // Attempt to get identity should revert
    await expect(decentralizedIdentity.getIdentity(user.address)).to.be.reverted;
  });

  it("Should check if an address has a valid identity", async function () {
    const newName = "Alice";
    const newAge = 25;

    await decentralizedIdentity.connect(user).createIdentity(newName, newAge);

    const hasValidIdentity = await decentralizedIdentity.hasValidIdentity(user.address);
    expect(hasValidIdentity).to.be.true;

    // Revoke access and check again
    await decentralizedIdentity.connect(user).revokeAccess();
    const hasValidIdentityAfterRevocation = await decentralizedIdentity.hasValidIdentity(user.address);
    expect(hasValidIdentityAfterRevocation).to.be.false;
  });

  it("Should get a list of all identities", async function () {
    const newName1 = "Alice";
    const newAge1 = 25;
    const newName2 = "Bob";
    const newAge2 = 30;

    await decentralizedIdentity.connect(user).createIdentity(newName1, newAge1);
    await decentralizedIdentity.connect(owner).createIdentity(newName2, newAge2);

    const allIdentities = await decentralizedIdentity.getAllIdentities();
    expect(allIdentities).to.have.lengthOf(2);
    expect(allIdentities).to.include(user.address);
    expect(allIdentities).to.include(owner.address);
  });
});
