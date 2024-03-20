# NFT Craft

![Screenshot](https://github.com/masakifukunishi/nft-craft/assets/42294938/5d344009-b6f8-4486-bad4-e35ef5ec2425)

## Summary 🔥
This site allows users to mint NFTs (ERC-721 tokens) and view them. Currently, it supports the Testnet Sepolia.

## Tech Stack 🔗
### Contract
- Hardhat
- Solidity
- OpenZeppelin

### Node Provider
- Infura

### IPFS
- NFT.Storage

### Frontend / Backend
- TypeScript
- Next.js
- Tailwind CSS
- Redux
- Wagmi
- Moralis
- Auth.js
- siwe (Sign in with Ethereum)

### Supported Chains
#### Testnets
- Sepolia

## How to Use
### Test
```
npm hardhat test
```

### Deploy
```
npx hardhat run --network sepolia scripts/deploy.ts
```

### Verify
```
npx hardhat verify --network sepolia DEPLOYED_CONTRACT_ADDRESS
```