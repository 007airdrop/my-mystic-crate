import type { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config();

const deployerKey = process.env.DEPLOYER_PRIVATE_KEY;

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.26',
    settings: {
      evmVersion: 'cancun',
      optimizer: { enabled: true, runs: 200 },
    },
  },
  networks: {
    base: {
      url: process.env.BASE_RPC_URL ?? 'https://mainnet.base.org',
      chainId: 8453,
      accounts: deployerKey ? [deployerKey] : [],
    },
  },
};

export default config;
