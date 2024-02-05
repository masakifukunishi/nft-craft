// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import './ERC721Collection.sol';

contract ERC721Factory {
    // mapping(address => address) public collectionCreators;

    event ERC721Created(address indexed creator, address erc721);

    function createERC721Collection(string memory name, string memory symbol) external returns (address erc721) {  
        ERC721Collection erc721Contract = new ERC721Collection(name, symbol);
        erc721 = address(erc721Contract);
        // collectionCreators[erc721] = msg.sender;
        emit ERC721Created(msg.sender, erc721);
    }
}