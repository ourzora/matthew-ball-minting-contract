import { expect } from "chai";
// @ts-ignore
import pako from 'pako';
import fs from 'fs';
import path from 'path';
import "@nomiclabs/hardhat-ethers";
import { deployments, ethers } from "hardhat";

import type { OnChainEssay } from "../typechain";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("MatthewBallTest", () => {
  let mintableArtistInstance: OnChainEssay;
  let signer: SignerWithAddress;
  let signerAddress: string;
  let signer1: SignerWithAddress;
  let signer1Address: string;

  beforeEach(async () => {
    await deployments.fixture(["OnChainEssay"]);
    const deployment = await deployments.get("OnChainEssay");
    mintableArtistInstance = (await ethers.getContractAt(
      "OnChainEssay",
      deployment.address,
      signer
    )) as OnChainEssay;
    const signers = await ethers.getSigners();
    signer = signers[0];
    signerAddress = await signer.getAddress();
    signer1 = signers[1];
    signer1Address = await signer1.getAddress();
  });

  describe("minting", () => {
    it("creates a NFT", async () => {
      const text = fs.readFileSync(path.join(__dirname, '../assets/ball-intro.txt')).toString();
      const textLen = text.length;
      console.log({textLen});
      console.log(text);
      const data = new TextEncoder().encode(text);
      const compressed = pako.deflateRaw(data, { level: 9 });
      await mintableArtistInstance.mint(
        signerAddress,
        "name",
        "description",
        "application/markdown",
        signerAddress,
        compressed,
        textLen,
        12,
      );
      const content = await mintableArtistInstance.content(0);
      console.log({content});
    });
  });
});
