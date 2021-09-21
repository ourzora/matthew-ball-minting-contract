module.exports = async ({ getNamedAccounts, deployments, ethers }: any) => {
  const { deploy } = deployments;
  const { deployer, auctionHouse } = await getNamedAccounts();

  await deploy("OnChainEssay", {
    from: deployer,
    args: ["on chain essay", "CHAINESSAY"],
    log: true,
  });

  const mintableCollection = ethers.getContractAt(
    "OnChainEssay",
    (await deployments.get("OnChainEssay")).address
  );

  if (auctionHouse) {
    console.log(auctionHouse);
    // Set auction house approval
    // await mintableCollection.setApprovalForAll(auctionHouse);
  }
};
module.exports.tags = ["OnChainEssay"];
