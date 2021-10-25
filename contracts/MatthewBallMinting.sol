// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.6;

/*                                                                                


                     /@@@@@@@@@@@@@@@@@@@@@@@@@@@@   @@@@@@
                     /@  @@%  @@@@@@@@@@@@@@@@@@@@@@@@@@  @
                         @                             @  @
                     /@  @  @@@@@@@@@@@@@@@@@@@@@@@@@  @  @
                     /@  @  @@@@@@@@@@@@@@@@@@@@@@@@@     @
                     /@  @  @@@@@@@@@@@@@@@@@@@@@@@@@  @  @
                     /@  @  @@@@@@@@@@@@@@@@@@@@@@@@@  @  @
                     /@  @  @@@@@@@@@@@@@@@@@@@@@@@@@  @  @
                     /@  @  @@@@@@@@@@@@@@@@@@@@@@@@@  @  @
                     /@  @  @@@@@@@@@@@@@@@@@@@@@@@@@  @  @
                     /@     @@@@@@@@@@@@@@@@@@@@@@@@@  @  @
                     /@  @  @@@@@@@@@@@@@@@@@@@@@@@@@  @  @
                     /@  @                             @   
                     /@  @@@@@@@@@@@@@@@@@@@@@@   @@@@@@  @
                     /@(((.  (((((((((((((((((((((((((((((@



                                 matthew ball                                                      


*/
import {IPublicSharedMetadata} from "@zoralabs/nft-editions-contracts/contracts/IPublicSharedMetadata.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Counters} from "@openzeppelin/contracts/utils/Counters.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {RoyaltyConfig} from "./royalties/RoyaltyConfig.sol";
import {ITokenContent} from "./ITokenContent.sol";

/*
 * org: @ourzora
 *
 * project: on-chain metadata metaverse minting contract for matthew ball
 * author: matthew ball
 * contract: @isiain
 */
contract MatthewBallMinting is Ownable, ERC721, RoyaltyConfig, ITokenContent {
    /// Struct to store token info for each token id in contract
    struct TokenInfo {
        string metadataContent;
        string contentUri;
        bytes32 contentHash;
    }
    /// Shared metadata rendering contract
    IPublicSharedMetadata private immutable sharedMetadata;
    /// Token info struct for rendering out each token in contact
    mapping(uint256 => TokenInfo) private tokenInfo;
    using Counters for Counters.Counter;
    /// Counter to keep track of the currently minted token
    Counters.Counter private _tokenIdTracker;

    /// Modifier to check if the token exists
    modifier tokenExists(uint256 tokenId) {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );
        _;
    }

    /// @dev Sets up ERC721 Token
    /// @param name name of token
    /// @param symbol symbol of token
    /// @param symbol _sharedMetadata address of metadata interface
    constructor(
        string memory name,
        string memory symbol,
        IPublicSharedMetadata _sharedMetadata
    ) ERC721(name, symbol) {
        sharedMetadata = _sharedMetadata;
    }

    /// Only owner of token can burn.
    /// @param tokenId Token ID to burn
    function burn(uint256 tokenId) public tokenExists(tokenId) onlyOwner {
        require(ERC721.ownerOf(tokenId) == _msgSender(), "Only owner");
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

    /// Updates the metadata content to a new string for new schemas / adding licenses and metadata uri updates
    /// Only callable by the contract owner.
    /// @param tokenId token id to update the metadata for
    /// @param newMetadataContent new metadata content json string to update
    function updateMetadataContent(
        uint256 tokenId,
        string memory newMetadataContent
    ) external tokenExists(tokenId) onlyOwner {
        tokenInfo[tokenId].metadataContent = newMetadataContent;
    }

    /// @param tokenId token id to set royalty payout for
    /// @param newAddress new address to recieve royalty payout on-chain
    function setRoyaltyPayoutAddressForToken(
        uint256 tokenId,
        address newAddress
    ) external tokenExists(tokenId) onlyOwner {
        _setRoyaltyPayoutAddressForToken(newAddress, tokenId);
    }

    /// @param tokenId token id to get uri for
    function tokenURI(uint256 tokenId)
        public
        view
        override
        tokenExists(tokenId)
        returns (string memory)
    {
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
        tokenExists(tokenId)
        returns (string memory)
    {
        return tokenInfo[tokenId].contentUri;
    }

    /// @param tokenId token id to retrieve hash for
    function contentHash(uint256 tokenId)
        public
        view
        override
        tokenExists(tokenId)
        returns (bytes32)
    {
        return tokenInfo[tokenId].contentHash;
    }

    /// Interface ERC165 spec calls
    /// @param interfaceId interface id to see what is supported
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721, RoyaltyConfig)
        returns (bool)
    {
        return
            ERC721.supportsInterface(interfaceId) ||
            RoyaltyConfig.supportsInterface(interfaceId) ||
            interfaceId == type(ITokenContent).interfaceId;
    }
}
