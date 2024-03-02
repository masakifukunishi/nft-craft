// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./ERC721Collection.sol";

contract ERC721CollectionFactory {
    event CollectionCreated(
        address indexed creator,
        address indexed collectionAddress,
        string name,
        string symbol
    );

    struct CollectionInfo {
        address collectionAddress;
        string name;
        string symbol;
    }

    mapping(address => CollectionInfo[]) private collectionsByCreator;

    function createCollection(string memory name, string memory symbol) external returns (address) {
        ERC721Collection newCollection = new ERC721Collection(name, symbol, msg.sender);
        address collectionAddress = address(newCollection);

        CollectionInfo memory newCollectionInfo = CollectionInfo({
            collectionAddress: collectionAddress,
            name: name,
            symbol: symbol
        });

        collectionsByCreator[msg.sender].push(newCollectionInfo);

        emit CollectionCreated(msg.sender, collectionAddress, name, symbol);

        return collectionAddress;
    }

    function getCollectionsByCreator(address creator) external view returns (CollectionInfo[] memory) {
        return collectionsByCreator[creator];
    }
}
