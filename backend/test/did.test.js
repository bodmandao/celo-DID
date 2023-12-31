const { ethers } = require('hardhat')
const { expect } = require('chai');

describe('DecentralizedIdentity Contract', function () {
  let DecentralizedIdentity;
  let decentralizedIdentity;
  let owner, verifier, revoker, deleter;

  beforeEach(async function () {
    // Deploy the contract and get signers
    [owner, verifier, revoker, deleter] = await ethers.getSigners();
    DecentralizedIdentity = await ethers.getContractFactory('DecentralizedIdentity');
    decentralizedIdentity = await DecentralizedIdentity.deploy();
    await decentralizedIdentity.deployed();
  });

  describe('createIdentity', function () {
    it('should create a new identity', async function () {
      await decentralizedIdentity.connect(owner).createIdentity('Alice', 25);
      const identity = await decentralizedIdentity.identities(owner.address);
      expect(identity.name).to.equal('Alice');
      expect(identity.age).to.equal(25);
    });

    it('should not allow creating identity with an existing address', async function () {
      await decentralizedIdentity.connect(owner).createIdentity('Alice', 25);

      await expect(decentralizedIdentity.connect(owner).createIdentity('Bob', 30)).to.be.revertedWith(
        'Identity already exists'
      );
    });

    it('should not allow creating identity with an empty name', async function () {
      await expect(decentralizedIdentity.connect(owner).createIdentity('', 25)).to.be.revertedWith('Name cannot be empty');
    });
  });

  describe('updateIdentity', function () {
    it('should update the identity', async function () {
      await decentralizedIdentity.connect(owner).createIdentity('Alice', 25);
      await decentralizedIdentity.connect(owner).updateIdentity('NewName', 30);
      const identity = await decentralizedIdentity.identities(owner.address);
      expect(identity.name).to.equal('NewName');
      expect(identity.age).to.equal(30);
    });

    it('should not allow updating non-existing identity', async function () {
      await expect(decentralizedIdentity.connect(owner).updateIdentity('NewName', 30)).to.be.revertedWith(
        'Identity does not exist'
      );
    });

    it('should not allow updating identity with an empty name', async function () {
      await decentralizedIdentity.connect(owner).createIdentity('Alice', 25);
      await expect(decentralizedIdentity.connect(owner).updateIdentity('', 30)).to.be.revertedWith('Name cannot be empty');
    });
  });

  describe('verifyIdentity', function () {
    it('should verify the identity', async function () {
      await decentralizedIdentity.connect(owner).createIdentity('Alice', 25);
      await decentralizedIdentity.connect(verifier).verifyIdentity(owner.address);
      const identity = await decentralizedIdentity.identities(owner.address);
      expect(identity.verified).to.be.true;
    });

    it('should not allow verifying already verified identity', async function () {
      await decentralizedIdentity.connect(owner).createIdentity('Alice', 25);
      await decentralizedIdentity.connect(verifier).verifyIdentity(owner.address);

      // Attempt to verify again
      await expect(decentralizedIdentity.connect(verifier).verifyIdentity(owner.address)).to.be.revertedWith(
        'Identity already verified'
      );
    });
  });

  describe('revokeIdentity', function () {
    it('should revoke the identity', async function () {
      await decentralizedIdentity.connect(owner).createIdentity('Alice', 25);
      await decentralizedIdentity.connect(owner).verifyIdentity(owner.address);
      await decentralizedIdentity.connect(owner).revokeIdentity(owner.address);
      const identity = await decentralizedIdentity.identities(owner.address);
      expect(identity.revoked).to.be.true;
    });

    it('should not allow revoking non-verified identity', async function () {
      await decentralizedIdentity.connect(owner).createIdentity('Alice', 25);

      // Attempt to revoke without verification
      await expect(decentralizedIdentity.connect(owner).revokeIdentity(owner.address)).to.be.revertedWith(
        'Not a verified identity'
      );
    });

    it('should not allow revoking already revoked identity', async function () {
      await decentralizedIdentity.connect(owner).createIdentity('Alice', 25);
      await decentralizedIdentity.connect(owner).verifyIdentity(owner.address);
      await decentralizedIdentity.connect(owner).revokeIdentity(owner.address);

      // Attempt to revoke again
      await expect(decentralizedIdentity.connect(owner).revokeIdentity(owner.address)).to.be.revertedWith(
        "Identity not valid for revocation"
      );
    });
  });

  describe('deleteIdentity', function () {
    it('should delete the identity', async function () {
      await decentralizedIdentity.connect(owner).createIdentity('Alice', 25);
      await decentralizedIdentity.connect(owner).verifyIdentity(owner.address);
      await decentralizedIdentity.connect(owner).deleteIdentity(owner.address);
      const identity = await decentralizedIdentity.identities(owner.address);
      expect(identity.exists).to.be.false;
    });

    it('should not allow deleting non-existing identity', async function () {
      // Attempt to delete non-existing identity
      await expect(decentralizedIdentity.connect(owner).deleteIdentity(owner.address)).to.be.revertedWith(
        'Not a verified identity'
      );
    });
  });

  describe('getAllIdentities', function () {
    it('should return all identities', async function () {
      await decentralizedIdentity.connect(owner).createIdentity('Alice', 25);
      await decentralizedIdentity.connect(owner).verifyIdentity(owner.address);

      const allIdentities = await decentralizedIdentity.getAllIdentities();

      expect(allIdentities.length).to.equal(1);
      expect(allIdentities[0].name).to.equal('Alice');
      expect(allIdentities[0].verified).to.be.true;
    });
  });
});
