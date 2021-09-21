import "@nomiclabs/hardhat-waffle";
import "hardhat-gas-reporter";
import "hardhat-deploy";
import '@typechain/hardhat'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-waffle'
import "@nomiclabs/hardhat-etherscan";
import { HardhatUserConfig } from "hardhat/config";

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  gasReporter: {
    currency: "USD",
    gasPrice: 40,
  },
  namedAccounts: {
    deployer: 0,
  },
  solidity: {
    compilers: [
      {
        version: "0.8.6",
        settings: {
          optimizer: {
            enabled: false,
            runs: 200,
          },
        },
      },
    ],
  },
};

export default config;
