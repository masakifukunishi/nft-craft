// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract ERC721Collection is ERC721, ERC721URIStorage {
    address immutable public factory;
    uint256 private tokenIdCounter;

    uint256 constant MAX_SUPPLY = 1000;

    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {
        factory = msg.sender;
    }

    function safeMint(address to, string memory uri) public {
        uint256 tokenId = tokenIdCounter;
        require(tokenId < MAX_SUPPLY, "Max supply reached");
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        tokenIdCounter += 1;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}