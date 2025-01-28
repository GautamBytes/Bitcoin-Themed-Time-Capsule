// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TimeCapsule {
    struct Capsule {
        string message;
        uint256 unlockTime;
        bool retrieved;
    }

    mapping(address => Capsule) public capsules;

    event CapsuleCreated(address indexed sender, uint256 unlockTime);
    event CapsuleRetrieved(address indexed sender, string message);

    // Store a message with a time lock
    function createCapsule(string calldata _message, uint256 _lockTime) external {
        require(capsules[msg.sender].unlockTime == 0, "Capsule already exists");
        require(_lockTime > 0, "Lock time must be greater than 0");

        uint256 unlockTime = block.timestamp + _lockTime;
        capsules[msg.sender] = Capsule(_message, unlockTime, false);

        emit CapsuleCreated(msg.sender, unlockTime);
    }

    // Retrieve the stored message after the unlock time
    function retrieveCapsule() external {
        Capsule storage capsule = capsules[msg.sender];
        require(capsule.unlockTime > 0, "No capsule found");
        require(block.timestamp >= capsule.unlockTime, "Capsule is still locked");
        require(!capsule.retrieved, "Capsule already retrieved");

        capsule.retrieved = true;
        emit CapsuleRetrieved(msg.sender, capsule.message);
    }

    // View your capsule details
    function viewCapsule() external view returns (string memory, uint256, bool) {
        Capsule memory capsule = capsules[msg.sender];
        require(capsule.unlockTime > 0, "No capsule found");
        return (capsule.message, capsule.unlockTime, capsule.retrieved);
    }
}
