// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DecentralizedIdentity {
    struct Identity {
        string name;
        uint256 age;
        bool exists;
        bool verified;
        bool revoked;
        address owner;
    }

    mapping(address => Identity) public identities;
    mapping(uint256 => address) public identitiesByIndex;
    uint256 public identityCount;

    event IdentityCreated(address indexed owner, string name, uint256 age);
    event IdentityUpdated(address indexed owner, string newName, uint256 newAge);
    event IdentityVerified(address indexed owner);
    event IdentityRevoked(address indexed owner);
    event IdentityDeleted(address indexed owner);

    modifier onlyIdentityOwner(address identityOwner) {
        require(identities[identityOwner].exists, "Identity does not exist");
        require(msg.sender == identityOwner, "Not the owner of the identity");
        _;
    }

    modifier onlyVerifier(address identityOwner) {
        require(identities[identityOwner].exists && identities[identityOwner].verified, "Not a verified identity");
        require(msg.sender == identityOwner, "Not the owner of the identity");
        _;
    }

    modifier onlyRevoker(address identityOwner) {
        require(identities[msg.sender].exists && identities[msg.sender].verified, "Not a verified identity");
        require(identities[identityOwner].exists && !identities[identityOwner].revoked, "Identity not valid for revocation");
        _;
    }

    modifier onlyDeleter(address identityOwner) {
        require(identities[msg.sender].exists && identities[msg.sender].verified, "Not a verified identity");
        require(identities[identityOwner].exists, "Identity not valid for deletion");
        _;
    }

    function createIdentity(string memory name, uint256 age) external {
        require(!identities[msg.sender].exists, "Identity already exists");
        require(bytes(name).length > 0, "Name cannot be empty");
        require(age > 0, "Age must be greater than zero");

        identities[msg.sender] = Identity(name, age, true, false, false, msg.sender);
        identitiesByIndex[identityCount] = msg.sender;
        identityCount++;

        emit IdentityCreated(msg.sender, name, age);
    }

    function updateIdentity(string memory newName, uint256 newAge) external onlyIdentityOwner(msg.sender) {
        require(bytes(newName).length > 0, "Name cannot be empty");
        require(newAge > 0, "Age must be greater than zero");

        identities[msg.sender].name = newName;
        identities[msg.sender].age = newAge;

        emit IdentityUpdated(msg.sender, newName, newAge);
    }

    function verifyIdentity() external {
        require(!identities[msg.sender].verified, "Identity already verified");

        identities[msg.sender].verified = true;

        emit IdentityVerified(msg.sender);
    }

    function revokeIdentity(address identityOwner) external onlyRevoker(identityOwner) {
        identities[identityOwner].revoked = true;

        emit IdentityRevoked(identityOwner);
    }

    function deleteIdentity() external onlyDeleter(msg.sender) {
        delete identities[msg.sender];
        emit IdentityDeleted(msg.sender);
    }

    function getAllIdentities() external view returns (Identity[] memory) {
        Identity[] memory allIdentities = new Identity[](identityCount);

        for (uint256 i = 0; i < identityCount; i++) {
            address identityOwner = identitiesByIndex[i];
            allIdentities[i] = identities[identityOwner];
        }

        return allIdentities;
    }
}
