// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.6;

interface ISubmitterPayoutInformation {
    function submitter(uint256 tokenId) external view returns (address);
}