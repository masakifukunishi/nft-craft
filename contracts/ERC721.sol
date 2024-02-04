// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MyFirstToken is ERC721, ERC721URIStorage {
    uint256 private _tokenIdCounter;

    uint256 MAX_SUPPLY = 100;

    constructor() ERC721("MyFirstToken", "MFT") {}

    function safeMint(address to, string memory uri) public {
        uint256 tokenId = _tokenIdCounter;
        require(tokenId < MAX_SUPPLY, "Max supply reached");
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        _tokenIdCounter += 1;
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