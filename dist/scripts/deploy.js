'use strict'
async function main() {
  const TimestampStorage = await ethers.getContractFactory('TimestampStorage')
  const timestampStorage = await TimestampStorage.deploy()
  await timestampStorage.deployed()
  console.log('TimestampStorage deployed to:', timestampStorage.address)
}
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
