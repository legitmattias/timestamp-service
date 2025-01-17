import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'

const config: HardhatUserConfig = {
  solidity: '0.8.28',
  paths: {
    sources: './src/contracts',
    tests: './test', // Optional: Keep the tests folder if needed
    cache: './cache',
    artifacts: './artifacts',
  },
}

export default config