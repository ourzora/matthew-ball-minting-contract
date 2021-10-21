module.exports = async ({ getNamedAccounts, deployments, network }: any) => {
  const { deploy } = deployments;
  const { deployer, sharedMetadataContract } = await getNamedAccounts();

  let sharedContractDeployment = sharedMetadataContract;
  if (!sharedContractDeployment) {
    if (network.name === "hardhat") {
      const deployment = await deploy("TestSharedContract", {
        from: deployer,
        log: true,
      });
      sharedContractDeployment = deployment.address;
    }
  }

  await deploy("MatthewBallMinting", {
    from: deployer,
    args: [
      "Matthew Ball Metaverse Essays",
      "METAESSAY",
      sharedContractDeployment,
    ],
    log: true,
  });
};
module.exports.tags = ["MatthewBallMinting"];
