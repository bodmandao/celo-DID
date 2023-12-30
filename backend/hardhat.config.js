require('@nomicfoundation/hardhat-toolbox')
require('@nomicfoundation/hardhat-chai-matchers')
require("hardhat-gas-reporter")
require('hardhat-deploy')
require('dotenv').config()

const PRIVATE_KEY = process.env.PRIVATE_KEY || "000"

module.exports = {
  solidity: "0.8.19",
  networks: {
    hardhat: {
        chainId: 31337,
    },
    alfajores: {
      url: "https://alfajores-forno.celo-testnet.org",
      accounts: [PRIVATE_KEY],
      chainId: 44787
    },
    celo: {
      url:  "https://forno.celo.org",
      accounts: [PRIVATE_KEY],
      chainId: 42220
    }
  },

  gasReporter: {
      enabled: true,
      currency: "USD",
      outputFile: "gas-report.txt",
      noColors: true,
  },
 
  namedAccounts: {
      deployer: {
          default: 0,
          1: 0,
      },
  },
  solidity: {
      compilers: [
          {
              version: "0.8.19",
              version : "0.8.20"
          },
      ],
      settings : {
          optimizer : {
              enabled : true,
              runs : 200,
              details : {
                  yul : true
              }
          },
          viaIR : true
      }
  },
  mocha: {
      timeout: 200000, // 200 seconds max for running tests
  }
}