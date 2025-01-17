const { HardhatUserConfig } = require("hardhat/config");
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
const config = {
  solidity: "0.8.28",
  paths: {
    sources: "./src/contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};

module.exports = config;
