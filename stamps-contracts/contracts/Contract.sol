// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";

contract Stamps is
    ERC721,
    ERC721Enumerable,
    ERC721Pausable,
    Ownable,
    ERC721Burnable
{
    uint256 private _nextTokenId;

    struct Geotag {
        int256 latitude;
        int256 longitude;
    }

    mapping(uint256 => Geotag) private _tokenGeotags;

    constructor() ERC721("Stamps", "STAMP") {
        transferOwnership(msg.sender); // Set the owner to the deployer or specific address if needed
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function safeMint(
        address to,
        int256 latitude,
        int256 longitude
    ) public onlyOwner {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);

        _tokenGeotags[tokenId] = Geotag(latitude, longitude);
    }

    function getGeotag(uint256 tokenId) public view returns (int256, int256) {
        require(
            _exists(tokenId),
            "ERC721Metadata: Query for nonexistent token"
        );
        return (
            _tokenGeotags[tokenId].latitude,
            _tokenGeotags[tokenId].longitude
        );
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    // Corrected override for _beforeTokenTransfer
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 amount
    ) internal override(ERC721, ERC721Enumerable, ERC721Pausable) {
        super._beforeTokenTransfer(from, to, tokenId, amount);
    }
}
