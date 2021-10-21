// SPDX-License-Identifier: GPL-v3
pragma solidity 0.8.6;


interface ITokenContent {
    /// @param tokenId token id to retrieve content for
    function contentURI(uint256 tokenId) external returns (string memory);

    /// @param tokenId token id to retrieve hash for
    function contentHash(uint256 tokenId) external returns (bytes32);
}