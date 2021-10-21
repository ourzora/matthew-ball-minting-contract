module.exports = async ({ getNamedAccounts, deployments, network }: any) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  if (network.id !== 1 || network.id !== 4) {
    await deploy("TestSharedContract", {
      from: deployer,
      log: true,
    });
  }
};
module.exports.tags = ["TestSharedContract"];
