import { decodeEventLog, parseAbiItem } from 'viem';
import { mysticCrateAbi, NFT_CONTRACT_ADDRESS } from '@/lib/contracts';
import { getVariantById } from '@/lib/nft-variants';
import { publicClient } from '@/lib/chain-client';
import type { MintResult } from '@/lib/parse-mint';

const transferEvent = parseAbiItem(
  'event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)',
);

const tokenUriAbi = [
  {
    type: 'function',
    name: 'tokenURI',
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    outputs: [{ name: '', type: 'string' }],
    stateMutability: 'view',
  },
] as const;

async function mintFromTokenUri(tokenId: string): Promise<MintResult | null> {
  try {
    const uri = await publicClient.readContract({
      address: NFT_CONTRACT_ADDRESS as `0x${string}`,
      abi: tokenUriAbi,
      functionName: 'tokenURI',
      args: [BigInt(tokenId)],
    });
    const res = await fetch(uri as string, { cache: 'no-store' });
    if (!res.ok) return null;
    const meta = (await res.json()) as {
      name?: string;
      attributes?: { trait_type: string; value: string }[];
    };
    const variantId = Number(
      meta.attributes?.find((a) => a.trait_type === 'Variant')?.value ?? 0,
    );
    const variant = getVariantById(variantId);
    if (!variant) return null;
    return {
      tokenId,
      variantId,
      xpAwarded: 0,
      imagePath: variant.imagePath,
      rarity: variant.rarity.toUpperCase(),
      name: variant.name,
    };
  } catch {
    return null;
  }
}

/** Reliable mint parse — fetches full receipt from RPC (works in Farcaster). */
export async function fetchMintFromTxHash(txHash: string): Promise<MintResult | null> {
  if (!NFT_CONTRACT_ADDRESS.startsWith('0x')) return null;

  const receipt = await publicClient.getTransactionReceipt({
    hash: txHash as `0x${string}`,
  });

  const contract = NFT_CONTRACT_ADDRESS.toLowerCase();
  let tokenId: string | null = null;
  let variantId: number | null = null;
  let xpAwarded = 0;

  for (const log of receipt.logs) {
    if (log.address?.toLowerCase() !== contract) continue;
    try {
      const decoded = decodeEventLog({
        abi: mysticCrateAbi,
        data: log.data,
        topics: log.topics,
      });
      if (decoded.eventName === 'CrateOpened') {
        tokenId = decoded.args.tokenId?.toString() ?? null;
        variantId = Number(decoded.args.variantId);
        xpAwarded = Number(decoded.args.xpAwarded ?? 0);
      }
    } catch {
      /* next */
    }
  }

  if (!tokenId) {
    for (const log of receipt.logs) {
      if (log.address?.toLowerCase() !== contract) continue;
      try {
        const decoded = decodeEventLog({
          abi: [transferEvent],
          data: log.data,
          topics: log.topics,
        });
        if (
          decoded.eventName === 'Transfer' &&
          decoded.args.from?.toLowerCase() ===
            '0x0000000000000000000000000000000000000000'
        ) {
          tokenId = decoded.args.tokenId?.toString() ?? null;
        }
      } catch {
        continue;
      }
    }
  }

  if (!tokenId) return null;

  if (variantId != null && !Number.isNaN(variantId)) {
    const variant = getVariantById(variantId);
    if (variant) {
      return {
        tokenId,
        variantId,
        xpAwarded,
        imagePath: variant.imagePath,
        rarity: variant.rarity.toUpperCase(),
        name: variant.name,
      };
    }
  }

  return mintFromTokenUri(tokenId);
}
