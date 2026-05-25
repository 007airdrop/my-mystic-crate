import { writeFileSync } from 'fs';
import { join } from 'path';
import hre from 'hardhat';
import { variantMetadataUri } from '../lib/nft-variants';
import { APP_URL } from '../lib/constants';
import { TREASURY_ADDRESS } from '../lib/contracts';

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  if (!deployer) {
    throw new Error('Set DEPLOYER_PRIVATE_KEY in .env.local (wallet needs Base ETH for gas).');
  }

  console.log('Deploying with:', deployer.address);
  console.log('Treasury:', TREASURY_ADDRESS);

  const collectionUri = `${APP_URL}/metadata/collection.json`;
  const MysticCrateNFT = await hre.ethers.getContractFactory('MysticCrateNFT');
  const contract = await MysticCrateNFT.deploy(TREASURY_ADDRESS, collectionUri);
  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log('MysticCrateNFT deployed to:', address);

  const uris = Array.from({ length: 20 }, (_, i) => variantMetadataUri(i));
  const tx = await contract.setVariantURIs(uris as [string, ...string[]]);
  await tx.wait();
  console.log('Variant URIs configured (20 variants)');

  const envLine = `NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=${address}\n`;
  const envPath = join(process.cwd(), '.env.local');
  try {
    writeFileSync(envPath, envLine, { flag: 'a' });
    console.log('Appended contract address to .env.local');
  } catch {
    console.log('Add to Vercel env vars:\n', envLine.trim());
  }

  console.log('\nOpenSea collection (after indexer sync):');
  console.log(`https://opensea.io/assets/base/${address}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
