// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyToken is ERC721, ERC721URIStorage {
    constructor (string memory name, string memory symbol) {
        ERC721(name, symbol);
    }
}