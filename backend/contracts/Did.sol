// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DecentralizedIdentity {
    // Struct to represent an identity
    struct Identity {
        string name;
        uint age;
        bool exists;
        bool verified;
        bool revoked;
        address owner;
    }

    // Mapping to store identity details by address
    mapping(address => Identity) public identities;

    // Mapping to store addresses of identities by index
    mapping(uint => address) public identitiesByIndex;

    // Counter to keep track of the number of identities
    uint public identityCount;

    // Events to log identity-related actions
    event IdentityCreated(address indexed owner, string name, uint age);
    event IdentityUpdated(address indexed owner, string newName, uint newAge);
    event IdentityVerified(address indexed owner);
    event IdentityRevoked(address indexed owner);
    event IdentityDeleted(address indexed owner);

    /**
     * @dev Modifier to ensure that the caller is the owner of the identity
     */
    modifier onlyIdentityOwner() {
        require(identities[msg.sender].exists, "Identity does not exist");
        _;
    }

    /**
     * @dev Modifier to ensure that the caller is a verified identity
     */
    modifier onlyVerifier() {
        require(identities[msg.sender].exists && identities[msg.sender].verified, "Not a verified identity");
        _;
    }

    /**
     * @dev Modifier to ensure that the caller is a verified identity eligible to revoke another identity
     * @param identityOwner The address of the identity to be revoked
     */
    modifier onlyRevoker(address identityOwner) {
        require(identities[msg.sender].exists && identities[msg.sender].verified, "Not a verified identity");
        require(identities[identityOwner].exists && !identities[identityOwner].revoked, "Identity not valid for revocation");
        _;
    }

    /**
     * @dev Modifier to ensure that the caller is a verified identity eligible to delete another identity
     * @param identityOwner The address of the identity to be deleted
     */
    modifier onlyDeleter(address identityOwner) {
        require(identities[msg.sender].exists && identities[msg.sender].verified, "Not a verified identity");
        require(identities[identityOwner].exists, "Identity not valid for deletion");
        _;
    }

    /**
     * @dev Function to create a new identity
     * @param name The name of the identity
     * @param age The age of the identity
     */
    function createIdentity(string memory name, uint age) external {
        require(!identities[msg.sender].exists, "Identity already exists");
        require(bytes(name).length > 0, "Name cannot be empty");

        identities[msg.sender] = Identity(name, age, true, false, false,msg.sender);
        identitiesByIndex[identityCount + 1] = msg.sender;
        identityCount++;

        emit IdentityCreated(msg.sender, name, age);
    }

    /**
     * @dev Function to update an identity
     * @param newName The new name of the identity
     * @param newAge The new age of the identity
     */
    function updateIdentity(string memory newName, uint newAge) external onlyIdentityOwner {
        require(bytes(newName).length > 0, "Name cannot be empty");

        identities[msg.sender].name = newName;
        identities[msg.sender].age = newAge;

        emit IdentityUpdated(msg.sender, newName, newAge);
    }

    /**
     * @dev Function to verify an identity
     */
    function verifyIdentity() external {
        require(!identities[msg.sender].verified, "Identity already verified");

        identities[msg.sender].verified = true;

        emit IdentityVerified(msg.sender);
    }

    /**
     * @dev Function to revoke an identity
     */
    function revokeIdentity(address identityOwner) external onlyRevoker(identityOwner) {
        identities[identityOwner].revoked = true;

        emit IdentityRevoked(identityOwner);
    }

    /**
 * @dev Function to delete an identity
 */
function deleteIdentity() external onlyDeleter(msg.sender) {
    // Save the index of the identity to be deleted
    uint indexToDelete = 0;
    for (uint i = 1; i <= identityCount; i++) {
        if (identitiesByIndex[i] == msg.sender) {
            indexToDelete = i;
            break;
        }
    }

    // Ensure the identity is found in the mapping
    require(indexToDelete != 0, "Identity not found");

    // Move the last element to the position of the element to be deleted
    address lastIdentity = identitiesByIndex[identityCount];
    identitiesByIndex[indexToDelete] = lastIdentity;

    // Update the index of the moved identity
    identitiesByIndex[identityCount] = address(0);

    // Delete the identity
    delete identities[msg.sender];

    // Decrement the identityCount
    identityCount--;

    emit IdentityDeleted(msg.sender);
}


    /**
     * @dev Function to get details of all identities
     * @return An array of Identity structs representing all identities
     */
    function getAllIdentities() external view returns (Identity[] memory) {
        Identity[] memory allIdentities = new Identity[](identityCount);

        for (uint i = 1; i <= identityCount; i++) {
            address identityOwner = identitiesByIndex[i];
            allIdentities[i - 1] = identities[identityOwner];
        }

        return allIdentities;
    }
}
