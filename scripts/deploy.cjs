const { ethers } = require("hardhat");

async function main () {
  console.log("Getting contract factory...");
  const TimestampStorage = await ethers.getContractFactory("TimestampStorage");

  console.log("Deploying contract...");
  const timestampStorage = await TimestampStorage.deploy(); // Deploy the contract

  // Use the 'target' property for the contract address
  console.log("Contract deployment result:", timestampStorage);
  console.log("TimestampStorage deployed to:", timestampStorage.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
