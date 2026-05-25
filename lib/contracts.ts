/** Treasury wallet — receives crate open fees on Base. */
export const TREASURY_ADDRESS = '0x1630C69E6dDA942AAE2E9182A69eF4dEC6ce0A9D' as const;

/** Set after deploying MysticCrateNFT to Base (see scripts/deploy.ts). */
export const NFT_CONTRACT_ADDRESS = (process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS ?? '') as
  | `0x${string}`
  | '';

export const OPEN_CRATE_PRICE = '0.000001' as const;

export const mysticCrateAbi = [
  {
    type: 'event',
    name: 'CrateOpened',
    inputs: [
      { name: 'player', type: 'address', indexed: true },
      { name: 'tokenId', type: 'uint256', indexed: true },
      { name: 'variantId', type: 'uint256', indexed: false },
    ],
  },
  {
    type: 'function',
    name: 'openCrate',
    inputs: [],
    outputs: [{ name: 'tokenId', type: 'uint256' }],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'OPEN_PRICE',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
] as const;
