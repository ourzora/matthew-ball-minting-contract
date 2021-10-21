module.exports = async ({ getNamedAccounts, deployments }: any) => {
  const { deploy } = deployments;
  const { deployer, sharedMetadataContract } = await getNamedAccounts();

  let sharedContractDeployment = (await deployments.get("TestSharedContract")).address;
  if (!sharedContractDeployment) {
    sharedContractDeployment = sharedMetadataContract;
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
module.exports.dependencies = ["TestSharedContract"];
