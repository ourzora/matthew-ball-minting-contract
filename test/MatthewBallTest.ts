import { expect } from "chai";
import "@nomiclabs/hardhat-ethers";
import { deployments, ethers } from "hardhat";

import type { MatthewBallMinting } from "../typechain";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("MatthewBallTest", () => {
  let mintableArtistInstance: MatthewBallMinting;
  let signer: SignerWithAddress;
  let signerAddress: string;
  let signer1: SignerWithAddress;
  let signer1Address: string;

  beforeEach(async () => {
    await deployments.fixture(["SharedContract", "MatthewBallMinting"]);
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
        "0xad7b46a6f80cb9eda8e269e8ee2041b1b54ded627694010c1f35860b1c46f92a",
        '{"name": "test", "description": "Testing", "image": "https://ipfs.io/ipfs/AABA"}',
        signerAddress,
        10
      );

      const content = await mintableArtistInstance.contentURI(0);
      const metadata = await mintableArtistInstance.tokenURI(0);
      expect(content).to.be.equal("https://ipfs.io/ipfs/ASDF");
      expect(metadata).to.be.equal(
        "data:application/json;base64,eyJuYW1lIjogInRlc3QiLCAiZGVzY3JpcHRpb24iOiAiVGVzdGluZyIsICJpbWFnZSI6ICJodHRwczovL2lwZnMuaW8vaXBmcy9BQUJBIn0="
      );
    });
  });
  describe("royalties", () => {

  })
  describe("burning", () => {

  })
});
