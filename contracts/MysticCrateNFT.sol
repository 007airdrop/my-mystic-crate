// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title Mystic Crate — ERC-721 on Base; each openCrate() mints a tradeable NFT.
contract MysticCrateNFT is ERC721URIStorage, Ownable {
    uint256 public constant OPEN_PRICE = 0.000001 ether;

    address public immutable treasury;
    string private _contractURI;

    uint256 private _nextTokenId;
    string[20] private _variantURIs;

    event CrateOpened(address indexed player, uint256 indexed tokenId, uint256 variantId);

    constructor(address treasury_, string memory contractURI_) ERC721("Mystic Crate", "MYSTIC") Ownable(msg.sender) {
        require(treasury_ != address(0), "Invalid treasury");
        treasury = treasury_;
        _contractURI = contractURI_;
    }

    function setVariantURIs(string[20] calldata uris) external onlyOwner {
        for (uint256 i = 0; i < 20; i++) {
            _variantURIs[i] = uris[i];
        }
    }

    function setContractURI(string calldata uri) external onlyOwner {
        _contractURI = uri;
    }

    function contractURI() external view returns (string memory) {
        return _contractURI;
    }

    function openCrate() external payable returns (uint256 tokenId) {
        require(msg.value >= OPEN_PRICE, "Min payment: 0.000001 ETH");

        uint256 variantId = _rollVariant(
            uint256(keccak256(abi.encodePacked(block.prevrandao, block.timestamp, msg.sender, _nextTokenId)))
        );
        require(bytes(_variantURIs[variantId]).length > 0, "Variant URI not set");

        tokenId = _nextTokenId++;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, _variantURIs[variantId]);

        emit CrateOpened(msg.sender, tokenId, variantId);

        (bool sent,) = treasury.call{value: msg.value}("");
        require(sent, "Treasury transfer failed");
    }

    function _rollVariant(uint256 seed) private pure returns (uint256) {
        uint256 r = seed % 100;
        uint256 sub = seed >> 8;

        if (r < 50) return sub % 6;
        if (r < 80) return 6 + (sub % 5);
        if (r < 95) return 11 + (sub % 4);
        if (r < 98) return 15 + (sub % 3);
        return 18 + (sub % 2);
    }
}
