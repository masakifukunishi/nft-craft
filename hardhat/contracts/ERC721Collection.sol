// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ERC721Collection is ERC721, ERC721URIStorage, Ownable {
    uint256 private tokenIdCounter = 0;
    uint256 constant MAX_SUPPLY = 100;

    constructor(string memory _name, string memory _symbol, address creator) 
        ERC721(_name, _symbol) 
    {
        transferOwnership(creator);
    }

    function safeMint(address to, string memory uri) public onlyOwner {
        require(tokenIdCounter < MAX_SUPPLY, "Max supply reached. Cannot mint more.");
        uint256 tokenId = tokenIdCounter++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
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