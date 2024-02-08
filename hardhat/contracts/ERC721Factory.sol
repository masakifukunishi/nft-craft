// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./ERC721Collection.sol";

contract ERC721Factory {
    event ERC721CollectionCreated(
        address indexed creator,
        address collectionAddress,
        string name,
        string symbol
    );

    struct CollectionInfo {
        address collectionAddress;
        string name;
        string symbol;
    }

    mapping(address => CollectionInfo[]) public creatorCollections;

    function createERC721Collection(string memory name, string memory symbol) external returns (address collectionAddress) {
        ERC721Collection erc721Contract = new ERC721Collection(name, symbol, msg.sender);
        collectionAddress = address(erc721Contract);

        CollectionInfo memory newCollectionInfo = CollectionInfo({
            collectionAddress: collectionAddress,
            name: name,
            symbol: symbol
        });

        creatorCollections[msg.sender].push(newCollectionInfo);

        emit ERC721CollectionCreated(msg.sender, collectionAddress, name, symbol);

        return collectionAddress;
    }

    function getCreatorCollections(address creator) external view returns (CollectionInfo[] memory) {
        return creatorCollections[creator];
    }
}