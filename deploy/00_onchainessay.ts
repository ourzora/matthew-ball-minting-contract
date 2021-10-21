module.exports = async ({ getNamedAccounts, deployments, ethers }: any) => {
  const { deploy } = deployments;
  const { deployer, auctionHouse } = await getNamedAccounts();

  await deploy("MatthewBallMinting", {
    from: deployer,
    args: ["Matthew Ball Metaverse Essays", "METAESSAY"],
    log: true,
  });

  const mintableCollection = ethers.getContractAt(
    "MatthewBallMinting",
    (await deployments.get("MatthewBallMinting")).address
  );

  if (auctionHouse) {
    // Set auction house approval
    await mintableCollection.setApprovalForAll(auctionHouse);
  }
};
module.exports.tags = ["MatthewBallMinting"];
