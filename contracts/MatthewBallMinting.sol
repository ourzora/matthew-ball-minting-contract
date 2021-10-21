// SPDX-License-Identifier: GPL-v3
pragma solidity 0.8.6;

/**
ⓜⓐⓣⓣⓗⓔⓦ
  ⓑⓐⓛⓛ
*/

import {IPublicSharedMetadata} from "@zoralabs/nft-editions-contracts/contracts/IPublicSharedMetadata.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Counters} from "@openzeppelin/contracts/utils/Counters.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {RoyaltyConfig} from "./royalties/RoyaltyConfig.sol";
import {ITokenContent} from "./ITokenContent.sol";

/**
 * org: zoralabs
 *
 * project: on-chain metadata essay contract
 * author: matthew ball
 */
contract MatthewBallMinting is Ownable, ERC721, RoyaltyConfig, ITokenContent {
    struct TokenInfo {
        string metadataContent;
        string contentUri;
        bytes32 contentHash;
    }
    IPublicSharedMetadata private immutable sharedMetadata;
    mapping(uint256 => TokenInfo) private tokenInfo;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdTracker;

    /// @dev Sets up ERC721 Token
    constructor(
        string memory name,
        string memory symbol,
        IPublicSharedMetadata _sharedMetadata
    ) ERC721(name, symbol) {
        sharedMetadata = _sharedMetadata;
    }

    /// Only owner of token can burn.
    /// @param tokenId Token ID to burn
    function burn(uint256 tokenId) public onlyOwner {
        require(_exists(tokenId));
        require(ERC721.ownerOf(tokenId) == _msgSender(), "Not Owner");
        _burn(tokenId);
    }

    /**
     * @dev Creates a new token for `to`. Its token ID will be automatically
     * assigned (and available on the emitted {IERC721-Transfer} event), and the token
     * URI autogenerated based on the base URI passed at construction.
     *
     * See {ERC721-_mint}.
     *
     * Requirements:
     *
     * - the caller must have the `MINTER_ROLE`.
     */
    function mint(
        address to,
        string memory contentUri,
        bytes32 _contentHash,
        string memory metadataContent,
        address royaltyPayoutAddress,
        uint256 royaltyBPS
    ) public onlyOwner {
        require(
            royaltyBPS < 10000,
            "Royalty needs to be less than 10000 bps (100%)"
        );
        uint256 tokenId = _tokenIdTracker.current();
        _mint(to, tokenId);
        tokenInfo[tokenId] = TokenInfo({
            contentUri: contentUri,
            contentHash: _contentHash,
            metadataContent: metadataContent
        });
        _setRoyaltyForToken(royaltyPayoutAddress, royaltyBPS, tokenId);
        _tokenIdTracker.increment();
    }

    /// @param tokenId token id to set royalty payout for
    /// @param newAddress new address to recieve royalty payout on-chain
    function setRoyaltyPayoutAddressForToken(
        uint256 tokenId,
        address newAddress
    ) external onlyOwner {
        _setRoyaltyPayoutAddressForToken(newAddress, tokenId);
    }

    /// @param tokenId token id to get uri for
    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        return
            string(
                sharedMetadata.encodeMetadataJSON(
                    bytes(tokenInfo[tokenId].metadataContent)
                )
            );
    }

    /// @param tokenId token id to retrieve content for
    function contentURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        return tokenInfo[tokenId].contentUri;
    }

    /// @param tokenId token id to retrieve hash for
    function contentHash(uint256 tokenId)
        public
        view
        override
        returns (bytes32)
    {
        return tokenInfo[tokenId].contentHash;
    }

    // Needed to call multiple supers.
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721, RoyaltyConfig)
        returns (bool)
    {
        return
            super.supportsInterface(interfaceId) ||
            interfaceId == type(ITokenContent).interfaceId;
    }
}
