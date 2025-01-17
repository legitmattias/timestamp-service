const { ethers } = require('hardhat')

async function main() {
  // Replace with your deployed contract address
  const contractAddress = '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707'

  // Attach to the deployed contract
  const timestampStorage = await ethers.getContractAt(
    'TimestampStorage',
    contractAddress
  )

  console.log('Interacting with TimestampStorage at:', contractAddress)

  // Example: Store a hash
  const noteHash = ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes('example note')
  )
  console.log('Storing hash:', noteHash)

  const storeTx = await timestampStorage.storeHash(noteHash)
  await storeTx.wait() // Wait for the transaction to be mined

  console.log('Hash stored successfully!')

  // Example: Retrieve the timestamp
  const timestamp = await timestampStorage.getTimestamp(noteHash)
  console.log('Timestamp for hash:', noteHash, 'is', timestamp.toString())
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
