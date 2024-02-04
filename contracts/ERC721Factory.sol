// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import './ERC721Token.sol';

contract ERC721Factory {
    event ERC721Created(address indexed to, address erc721);

    function createERC721(address to, string memory name, string memory symbol) external returns (address erc721) {
        require(to != address(0), 'ERC721Factory: ZERO_ADDRESS');        
        // bytes32 salt = keccak256(abi.encodePacked(token0, token1));
        ERC721Token erc721Contract = new ERC721Token(name, symbol);
        erc721 = address(erc721Contract);
        // emit ERC721Created(to, erc721);
    }
}