// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title Decentralized Identity Smart Contract
 * @dev Implements a decentralized identity system on the CELO blockchain.
 */
contract DecentralizedIdentity {
    /**
     * @dev Struct to represent identity information.
     */
    struct Identity {
        string name;
        uint age;
        bool exists;
        address owner;
    }

    // Mapping to store identities with their corresponding  addresses
    mapping(address => Identity) public identities;
    // Mapping to store the order in which identities were created
    mapping(uint => address) public identitiesByIndex;
    // Mapping to track whether an address has a valid identity
    mapping(address => bool) public hasIdentity;

    // Event emitted when a new identity is created
    event IdentityCreated(address indexed owner, string name, uint age);
    // Event emitted when identity information is updated
    event IdentityUpdated(address indexed owner, string newName, uint newAge);
    // Event emitted when access is revoked
    event AccessRevoked(address indexed owner);

    /**
     * @dev Modifier to restrict access to the owner only.
     */
    modifier onlyOwner {
        require(identities[msg.sender].exists, "Identity does not exist");
        require(identities[msg.sender].owner == msg.sender, "Not the owner");
        _;
    }

    /**
     * @dev Modifier to check if the caller has a valid identity.
     */
    modifier onlyValidIdentity {
        require(hasIdentity[msg.sender], "Identity does not exist");
        _;
    }

    /**
     * @dev Function to create a new identity.
     * @param _name The name of the identity owner.
     * @param _age The age of the identity owner.
     */
    function createIdentity(string memory _name, uint _age) external {
        require(!identities[msg.sender].exists, "Identity already exists");

        Identity storage newIdentity = identities[msg.sender];
        newIdentity.name = _name;
        newIdentity.age = _age;
        newIdentity.exists = true;
        newIdentity.owner = msg.sender;

        hasIdentity[msg.sender] = true;
        identitiesByIndex[block.number - 1] = msg.sender; // Store the index for getAllIdentities

        emit IdentityCreated(msg.sender, _name, _age);
    }

    /**
     * @dev Function to update identity information.
     * @param _newName The new name of the identity owner.
     * @param _newAge The new age of the identity owner.
     */
    function updateIdentity(string memory _newName, uint _newAge) external onlyOwner {
        Identity storage existingIdentity = identities[msg.sender];
        existingIdentity.name = _newName;
        existingIdentity.age = _newAge;

        emit IdentityUpdated(msg.sender, _newName, _newAge);
    }

    /**
     * @dev Function to revoke access and delete identity.
     */
    function revokeAccess() external onlyValidIdentity {
        delete identities[msg.sender];
        hasIdentity[msg.sender] = false;

        emit AccessRevoked(msg.sender);
    }

    /**
     * @dev Function to check if an address has a valid identity.
     * @param _owner The address to check.
     * @return true if the address has a valid identity, false otherwise.
     */
    function hasValidIdentity(address _owner) external view returns (bool) {
        return hasIdentity[_owner];
    }

    /**
     * @dev Function to get identity information for a given address.
     * @param _owner The address of the identity owner.
     * @return name The name of the identity owner.
     * @return age The age of the identity owner.
     */
    function getIdentity(address _owner) external view returns (string memory, uint) {
        Identity storage requestedIdentity = identities[_owner];
        require(requestedIdentity.exists, "Identity does not exist");

        return (requestedIdentity.name, requestedIdentity.age);
    }

    /**
     * @dev Function to get a list of all identities.
     * @return allIdentities An array containing all valid identity addresses.
     */
    function getAllIdentities() external view returns (address[] memory) {
        address[] memory allIdentities = new address[](block.number - 1);
        uint index = 0;

        for (uint i = 1; i < block.number; i++) {
            address identityOwner = identitiesByIndex[i];
            if (identities[identityOwner].exists) {
                allIdentities[index] = identityOwner;
                index++;
            }
        }

        return allIdentities;
    }
}
