/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
} from "ethers";
import {
  Contract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface HollyPlusCuratorCreatorInterface extends ethers.utils.Interface {
  functions: {
    "cancelAuction(uint256)": FunctionFragment;
    "curatorByAuctionId(uint256)": FunctionFragment;
    "finalizeAuction(uint256)": FunctionFragment;
    "logic()": FunctionFragment;
    "startAuction(uint256,uint256,uint256)": FunctionFragment;
    "startAuctionFull(uint256,uint256,uint256,uint8,uint8)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "cancelAuction",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "curatorByAuctionId",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "finalizeAuction",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "logic", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "startAuction",
    values: [BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "startAuctionFull",
    values: [
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "cancelAuction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "curatorByAuctionId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "finalizeAuction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "logic", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "startAuction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "startAuctionFull",
    data: BytesLike
  ): Result;

  events: {
    "HollyPlusCuratedAuction(address,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "HollyPlusCuratedAuction"): EventFragment;
}

export class HollyPlusCuratorCreator extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: HollyPlusCuratorCreatorInterface;

  functions: {
    cancelAuction(
      _auctionId: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "cancelAuction(uint256)"(
      _auctionId: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    curatorByAuctionId(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "curatorByAuctionId(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    finalizeAuction(
      _auctionId: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "finalizeAuction(uint256)"(
      _auctionId: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    logic(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    "logic()"(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    startAuction(
      _tokenId: BigNumberish,
      numberOfDays: BigNumberish,
      reservePrice: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "startAuction(uint256,uint256,uint256)"(
      _tokenId: BigNumberish,
      numberOfDays: BigNumberish,
      reservePrice: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    startAuctionFull(
      _tokenId: BigNumberish,
      auctionDuration: BigNumberish,
      reservePrice: BigNumberish,
      artistSplitOfCuratorPercentage: BigNumberish,
      curatorFeePercentage: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "startAuctionFull(uint256,uint256,uint256,uint8,uint8)"(
      _tokenId: BigNumberish,
      auctionDuration: BigNumberish,
      reservePrice: BigNumberish,
      artistSplitOfCuratorPercentage: BigNumberish,
      curatorFeePercentage: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;
  };

  cancelAuction(
    _auctionId: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "cancelAuction(uint256)"(
    _auctionId: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  curatorByAuctionId(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  "curatorByAuctionId(uint256)"(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  finalizeAuction(
    _auctionId: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "finalizeAuction(uint256)"(
    _auctionId: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  logic(overrides?: CallOverrides): Promise<string>;

  "logic()"(overrides?: CallOverrides): Promise<string>;

  startAuction(
    _tokenId: BigNumberish,
    numberOfDays: BigNumberish,
    reservePrice: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "startAuction(uint256,uint256,uint256)"(
    _tokenId: BigNumberish,
    numberOfDays: BigNumberish,
    reservePrice: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  startAuctionFull(
    _tokenId: BigNumberish,
    auctionDuration: BigNumberish,
    reservePrice: BigNumberish,
    artistSplitOfCuratorPercentage: BigNumberish,
    curatorFeePercentage: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "startAuctionFull(uint256,uint256,uint256,uint8,uint8)"(
    _tokenId: BigNumberish,
    auctionDuration: BigNumberish,
    reservePrice: BigNumberish,
    artistSplitOfCuratorPercentage: BigNumberish,
    curatorFeePercentage: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  callStatic: {
    cancelAuction(
      _auctionId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "cancelAuction(uint256)"(
      _auctionId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    curatorByAuctionId(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    "curatorByAuctionId(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    finalizeAuction(
      _auctionId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "finalizeAuction(uint256)"(
      _auctionId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    logic(overrides?: CallOverrides): Promise<string>;

    "logic()"(overrides?: CallOverrides): Promise<string>;

    startAuction(
      _tokenId: BigNumberish,
      numberOfDays: BigNumberish,
      reservePrice: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "startAuction(uint256,uint256,uint256)"(
      _tokenId: BigNumberish,
      numberOfDays: BigNumberish,
      reservePrice: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    startAuctionFull(
      _tokenId: BigNumberish,
      auctionDuration: BigNumberish,
      reservePrice: BigNumberish,
      artistSplitOfCuratorPercentage: BigNumberish,
      curatorFeePercentage: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "startAuctionFull(uint256,uint256,uint256,uint8,uint8)"(
      _tokenId: BigNumberish,
      auctionDuration: BigNumberish,
      reservePrice: BigNumberish,
      artistSplitOfCuratorPercentage: BigNumberish,
      curatorFeePercentage: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    HollyPlusCuratedAuction(
      newCuratorAddress: null,
      creator: null,
      tokenId: null
    ): EventFilter;
  };

  estimateGas: {
    cancelAuction(
      _auctionId: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "cancelAuction(uint256)"(
      _auctionId: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    curatorByAuctionId(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "curatorByAuctionId(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    finalizeAuction(
      _auctionId: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "finalizeAuction(uint256)"(
      _auctionId: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    logic(overrides?: CallOverrides): Promise<BigNumber>;

    "logic()"(overrides?: CallOverrides): Promise<BigNumber>;

    startAuction(
      _tokenId: BigNumberish,
      numberOfDays: BigNumberish,
      reservePrice: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "startAuction(uint256,uint256,uint256)"(
      _tokenId: BigNumberish,
      numberOfDays: BigNumberish,
      reservePrice: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    startAuctionFull(
      _tokenId: BigNumberish,
      auctionDuration: BigNumberish,
      reservePrice: BigNumberish,
      artistSplitOfCuratorPercentage: BigNumberish,
      curatorFeePercentage: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "startAuctionFull(uint256,uint256,uint256,uint8,uint8)"(
      _tokenId: BigNumberish,
      auctionDuration: BigNumberish,
      reservePrice: BigNumberish,
      artistSplitOfCuratorPercentage: BigNumberish,
      curatorFeePercentage: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    cancelAuction(
      _auctionId: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "cancelAuction(uint256)"(
      _auctionId: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    curatorByAuctionId(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "curatorByAuctionId(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    finalizeAuction(
      _auctionId: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "finalizeAuction(uint256)"(
      _auctionId: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    logic(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "logic()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    startAuction(
      _tokenId: BigNumberish,
      numberOfDays: BigNumberish,
      reservePrice: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "startAuction(uint256,uint256,uint256)"(
      _tokenId: BigNumberish,
      numberOfDays: BigNumberish,
      reservePrice: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    startAuctionFull(
      _tokenId: BigNumberish,
      auctionDuration: BigNumberish,
      reservePrice: BigNumberish,
      artistSplitOfCuratorPercentage: BigNumberish,
      curatorFeePercentage: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "startAuctionFull(uint256,uint256,uint256,uint8,uint8)"(
      _tokenId: BigNumberish,
      auctionDuration: BigNumberish,
      reservePrice: BigNumberish,
      artistSplitOfCuratorPercentage: BigNumberish,
      curatorFeePercentage: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;
  };
}
