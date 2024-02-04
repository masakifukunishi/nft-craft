// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import './ERC721Collection.sol';

contract ERC721Factory {
    event ERC721Created(address erc721);

    function createERC721(string memory name, string memory symbol) external returns (address erc721) {  
        ERC721Collection erc721Contract = new ERC721Collection(name, symbol);
        erc721 = address(erc721Contract);
        emit ERC721Created(erc721);
    }
}