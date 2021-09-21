// SPDX-License-Identifier: GPL-v3

/**
 */

pragma solidity 0.8.6;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./royalties/RoyaltyConfig.sol";
import "./utils/ISubmitterPayoutInformation.sol";
import "./InflateLib.sol";

/**
 * author: iain
 * org: zora
 * project: on-chain essay contracts
 *
 *
 * ERC721 token contract, including:
 *
 *  - ability for holders to burn (destroy) their tokens
 *  - a minter role that allows for token minting (creation)
 *  - integration into royalty standards
 *
 * This contract uses {AccessControl} to lock permissioned functions using the
 * different roles - head to its documentation for details.
 *
 * The account that deploys the contract will be granted the minter and admin
 * roles, as well as the default admin role.
 */
contract OnChainEssay is Context, Ownable, ERC721, IERC2981, RoyaltyConfig {
    struct TokenInfo {
        bytes contentDeflated;
        string contentType;
        string name;
        string description;
        uint256 contentSize;
    }
    mapping(uint256 => TokenInfo) private tokenInfo;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdTracker;

    /**
     * @dev Sets up ERC721 Token
     */
    constructor(string memory name, string memory symbol) ERC721(name, symbol) {
        //
    }

    function content(uint256 tokenId) public view returns (string memory) {
        (InflateLib.ErrorCode code, bytes memory data) = InflateLib.puff(
            tokenInfo[tokenId].contentDeflated,
            tokenInfo[tokenId].contentSize
        );
        if (code != InflateLib.ErrorCode.ERR_NONE) {
            return "fail";
        }
        return string(data);
    }

    function getTokenInfo(uint256 tokenId)
        public
        view
        returns (
            string memory,
            string memory,
            string memory
        )
    {
        TokenInfo memory info = tokenInfo[tokenId];
        return (info.name, info.description, "");
    }

    /**
      Only owner can burn.
    */
    function burn(uint256 tokenId) public onlyOwner {
        require(_exists(tokenId));
        require(ERC721.ownerOf(tokenId) == _msgSender(), "Not Contract Owner");
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
        string memory name,
        string memory description,
        string memory contentType,
        address royaltyPayoutAddress,
        bytes memory contentDeflated,
        uint256 contentSize,
        uint256 royaltyBPS
    ) public onlyOwner {
        require(royaltyBPS < 10000, "Royalty needs to be less than 10000 bps");
        uint256 tokenId = _tokenIdTracker.current();
        _mint(to, tokenId);
        tokenInfo[tokenId] = TokenInfo({
            name: name,
            contentType: contentType,
            description: description,
            contentDeflated: contentDeflated,
            contentSize: contentSize
        });
        _setRoyaltyForToken(royaltyPayoutAddress, royaltyBPS, tokenId);
        _tokenIdTracker.increment();
    }

    function updateRoyaltyInfo(uint256 tokenId, address royaltyPayoutAddress)
        public
        onlyOwner
    {
        _setRoyaltyPayoutAddressForToken(royaltyPayoutAddress, tokenId);
    }

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

        return "";
    }

    // Needed to call multiple supers.
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(IERC165, ERC721, RoyaltyConfig)
        returns (bool)
    {
        return
            super.supportsInterface(interfaceId) ||
            interfaceId == type(ISubmitterPayoutInformation).interfaceId;
    }
}
