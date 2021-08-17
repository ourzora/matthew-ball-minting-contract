/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { RoyaltyConfig, RoyaltyConfigInterface } from "../RoyaltyConfig";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "bps",
        type: "uint256",
      },
    ],
    name: "UpdatedRoyalty",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "royalities",
    outputs: [
      {
        internalType: "uint256",
        name: "bps",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "salePrice",
        type: "uint256",
      },
    ],
    name: "royaltyInfo",
    outputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "royaltyAmount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5061026d806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c806301ffc9a7146100465780632a55205a1461006e578063b5004f01146100a0575b600080fd5b61005961005436600461017c565b6100ed565b60405190151581526020015b60405180910390f35b61008161007c3660046101c6565b610124565b604080516001600160a01b039093168352602083019190915201610065565b6100d06100ae3660046101ad565b600060208190529081526040902080546001909101546001600160a01b031682565b604080519283526001600160a01b03909116602083015201610065565b60006001600160e01b0319821663152a902d60e11b148061011e57506301ffc9a760e01b6001600160e01b03198316145b92915050565b600082815260208181526040808320815180830190925280548083526001909101546001600160a01b031692820183905283929061271090610166908761020a565b61017091906101e8565b92509250509250929050565b60006020828403121561018e57600080fd5b81356001600160e01b0319811681146101a657600080fd5b9392505050565b6000602082840312156101bf57600080fd5b5035919050565b600080604083850312156101d957600080fd5b50508035926020909101359150565b60008261020557634e487b7160e01b600052601260045260246000fd5b500490565b600081600019048311821515161561023257634e487b7160e01b600052601160045260246000fd5b50029056fea2646970667358221220be3a010460ccb655f62e1fbe88567dce91881f7ef4cd8c5eded9e0776808f8bb64736f6c63430008050033";

export class RoyaltyConfig__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<RoyaltyConfig> {
    return super.deploy(overrides || {}) as Promise<RoyaltyConfig>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): RoyaltyConfig {
    return super.attach(address) as RoyaltyConfig;
  }
  connect(signer: Signer): RoyaltyConfig__factory {
    return super.connect(signer) as RoyaltyConfig__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): RoyaltyConfigInterface {
    return new utils.Interface(_abi) as RoyaltyConfigInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): RoyaltyConfig {
    return new Contract(address, _abi, signerOrProvider) as RoyaltyConfig;
  }
}