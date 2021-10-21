import { expect } from "chai";
import fs from 'fs';
import path from 'path';
import "@nomiclabs/hardhat-ethers";
import { deployments, ethers } from "hardhat";

import type { MatthewBallMinting } from "../typechain";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("MatthewBallTest", () => {
  let mintableArtistInstance: OnChainEssay;
  let signer: SignerWithAddress;
  let signerAddress: string;
  let signer1: SignerWithAddress;
  let signer1Address: string;

  beforeEach(async () => {
    await deployments.fixture(["MatthewBallMinting"]);
    const deployment = await deployments.get("MatthewBallMinting");
    mintableArtistInstance = (await ethers.getContractAt(
      "MatthewBallMinting",
      deployment.address,
      signer
    )) as MatthewBallMinting;
    const signers = await ethers.getSigners();
    signer = signers[0];
    signerAddress = await signer.getAddress();
    signer1 = signers[1];
    signer1Address = await signer1.getAddress();
  });

  describe("minting", () => {
    it("creates a NFT", async () => {
      await mintableArtistInstance.mint(
        signerAddress,
        "https://ipfs.io/ipfs/ASDF",
        "0x0",
        "{\"name\": \"test\", \"description\": \"Testing\", \"image\": \"https://ipfs.io/ipfs/AABA\"}",
        0,
        signerAddress
      );

      const content = await mintableArtistInstance.content(0);
      console.log({content});
    });
  });
});
