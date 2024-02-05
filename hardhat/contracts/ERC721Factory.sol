// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./ERC721Collection.sol";

contract ERC721Factory {
    event ERC721Created(address indexed creator, address erc721);

    mapping(address => address[]) private creatorCollections;

    function createERC721Collection(string memory name, string memory symbol) external returns (address erc721) {
        ERC721Collection erc721Contract = new ERC721Collection(name, symbol);
        erc721 = address(erc721Contract);

        creatorCollections[msg.sender].push(erc721);

        emit ERC721Created(msg.sender, erc721);

        return erc721;
    }

    function getCreatorCollections(address creator) external view returns (address[] memory) {
        return creatorCollections[creator];
    }
}
