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
      const contentHash = await mintableArtistInstance.contentHash(0);
      const metadata = await mintableArtistInstance.tokenURI(0);
      expect(content).to.be.equal("https://ipfs.io/ipfs/ASDF");
      expect(contentHash).to.be.equal(
        "0xad7b46a6f80cb9eda8e269e8ee2041b1b54ded627694010c1f35860b1c46f92a"
      );
      expect(metadata).to.be.equal(
        "data:application/json;base64,eyJuYW1lIjogInRlc3QiLCAiZGVzY3JpcHRpb24iOiAiVGVzdGluZyIsICJpbWFnZSI6ICJodHRwczovL2lwZnMuaW8vaXBmcy9BQUJBIn0="
      );
    });
    it("allows minting only from owner", async () => {
      await expect(
        mintableArtistInstance
          .connect(signer1)
          .mint(
            signerAddress,
            "https://ipfs.io/ipfs/ASDF",
            "0xad7b46a6f80cb9eda8e269e8ee2041b1b54ded627694010c1f35860b1c46f92a",
            '{"name": "test", "description": "Testing", "image": "https://ipfs.io/ipfs/AABA"}',
            signerAddress,
            10
          )
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });
  it("describes functionalities with erc165 correctly", async () => {
    // ERC2891 interface
    expect(await mintableArtistInstance.supportsInterface("0x2a55205a")).to.be
      .true;
    // ERC165 interface
    expect(await mintableArtistInstance.supportsInterface("0x01ffc9a7")).to.be
      .true;
    // ERC721 interface
    expect(await mintableArtistInstance.supportsInterface("0x80ac58cd")).to.be
      .true;
  });
  describe("with a minted token", () => {
    beforeEach(async () => {
      await mintableArtistInstance.mint(
        signerAddress,
        "https://ipfs.io/ipfs/ASDF",
        "0xad7b46a6f80cb9eda8e269e8ee2041b1b54ded627694010c1f35860b1c46f92a",
        '{"name": "test", "description": "Testing", "image": "https://ipfs.io/ipfs/AABA"}',
        signerAddress,
        100
      );
    });
    it("returns correct royalties", async () => {
      const royaltyInfo = await mintableArtistInstance.royaltyInfo(
        0,
        ethers.utils.parseEther("1")
      );
      expect(royaltyInfo[0]).to.be.equal(signerAddress);
      expect(royaltyInfo[1]).to.be.equal(ethers.utils.parseEther("0.01"));
    });
    it("updates token royalty payout address", async () => {
      const royaltyInfo = await mintableArtistInstance.royaltyInfo(
        0,
        ethers.utils.parseEther("1")
      );
      expect(royaltyInfo[0]).to.be.equal(signerAddress);
      await mintableArtistInstance.setRoyaltyPayoutAddressForToken(
        "0",
        signer1Address
      );
      const royaltyInfoUpdated = await mintableArtistInstance.royaltyInfo(
        0,
        ethers.utils.parseEther("1")
      );
      expect(royaltyInfoUpdated[0]).to.be.equal(signer1Address);
    });
    it("burns only from owner", async () => {
      await expect(
        mintableArtistInstance.connect(signer1).burn(0)
      ).to.be.revertedWith("Ownable: caller is not the owner");
      await mintableArtistInstance.connect(signer).burn(0);
      await expect(mintableArtistInstance.ownerOf(0)).to.be.revertedWith(
        "ERC721: owner query for nonexistent token"
      );
    });
  });
});
