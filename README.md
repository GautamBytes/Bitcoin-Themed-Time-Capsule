# TimeCapsule Smart Contract 🕰️

A Solidity smart contract that enables users to create time-locked messages on the Ethereum blockchain. Perfect for storing messages that can only be retrieved after a specified time period has elapsed.

## Features

- Create time-locked messages (capsules)
- Retrieve messages only after the lock period expires
- View capsule details including lock time and retrieval status
- Gas-efficient implementation
- Comprehensive test coverage

## Technical Stack

- Solidity ^0.8.0
- Hardhat Development Environment
- Ethers.js
- Chai for testing

## Contract Architecture

The contract implements a simple but effective time-locking mechanism using the following structure:

```solidity
struct Capsule {
    string message;
    uint256 unlockTime;
    bool retrieved;
}
```

### Key Functions

1. `createCapsule(string calldata _message, uint256 _lockTime)`
   - Creates a new time-locked capsule
   - Validates that user doesn't have an existing capsule
   - Sets unlock time based on current block timestamp

2. `retrieveCapsule()`
   - Retrieves the message after the lock period
   - Implements multiple security checks
   - Marks capsule as retrieved to prevent multiple retrievals

3. `viewCapsule()`
   - Returns capsule details without modifying state
   - Useful for checking lock status and message availability

## Security Considerations

- Implements checks-effects-interactions pattern
- Uses require statements for input validation
- Time-based operations account for block.timestamp
- Single capsule per address to prevent spam
- Retrieved status tracking to prevent multiple retrievals

## Testing

The contract includes a comprehensive test suite written in JavaScript using the Hardhat testing framework. To run the tests:

```bash
npm install
npx hardhat test
```

Tests cover:
- Capsule creation
- Time-lock enforcement
- Retrieval mechanics
- Edge cases and error conditions

## Example Usage

```javascript
// Deploy contract
const TimeCapsule = await ethers.getContractFactory("TimeCapsule");
const timeCapsule = await TimeCapsule.deploy();
await timeCapsule.deployed();

// Create a capsule
const lockTime = 3600; // 1 hour in seconds
const message = "Message from 2025!";
await timeCapsule.createCapsule(message, lockTime);

// Retrieve after lock period
await timeCapsule.retrieveCapsule();
```

## Events

The contract emits events for important actions:
- `CapsuleCreated(address indexed sender, uint256 unlockTime)`
- `CapsuleRetrieved(address indexed sender, string message)`

## Gas Optimization

The contract is optimized for gas efficiency:
- Uses mapping for O(1) access
- Implements struct packing
- Minimizes storage operations
- Uses calldata for string inputs

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Created with 💙 by Gautam Manchandani(me🙋‍♂️)

Feel free to connect with me on [GitHub](https://github.com/yourusername)
