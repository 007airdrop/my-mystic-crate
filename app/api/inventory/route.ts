import { NextRequest, NextResponse } from 'next/server';
import { decodeEventLog, parseAbiItem, isAddress } from 'viem';
import { NFT_CONTRACT_ADDRESS } from '@/lib/contracts';
import { getVariantById } from '@/lib/nft-variants';
import { publicClient, getLogsChunked, NFT_DEPLOY_BLOCK } from '@/lib/chain-client';

const ZERO = '0x0000000000000000000000000000000000000000' as const;

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

export async function GET(req: NextRequest) {
  const address = req.nextUrl.searchParams.get('address');
  if (!address || !isAddress(address)) {
    return NextResponse.json({ ok: false, error: 'Invalid address' }, { status: 400 });
  }

  if (!NFT_CONTRACT_ADDRESS.startsWith('0x')) {
    return NextResponse.json({ ok: false, error: 'Contract not configured' }, { status: 500 });
  }

  try {
    const contract = NFT_CONTRACT_ADDRESS as `0x${string}`;
    const user = address as `0x${string}`;

    const transferLogs = await getLogsChunked({
      address: contract,
      event: transferEvent,
      args: { to: user, from: ZERO },
      fromBlock: NFT_DEPLOY_BLOCK,
      toBlock: 'latest',
    });

    const items: {
      tokenId: string;
      variantId: number;
      imagePath: string;
      rarity: string;
      name: string;
    }[] = [];

    for (const log of transferLogs) {
      try {
        const d = decodeEventLog({ abi: [transferEvent], data: log.data, topics: log.topics });
        if (d.eventName !== 'Transfer') continue;
        const tokenId = d.args.tokenId?.toString() ?? '';
        if (!tokenId) continue;

        let variantId = 0;
        const uri = await publicClient.readContract({
          address: contract,
          abi: tokenUriAbi,
          functionName: 'tokenURI',
          args: [BigInt(tokenId)],
        });
        const res = await fetch(uri as string, { cache: 'no-store' });
        if (res.ok) {
          const meta = (await res.json()) as {
            attributes?: { trait_type: string; value: string }[];
          };
          variantId = Number(
            meta.attributes?.find((a) => a.trait_type === 'Variant')?.value ?? 0,
          );
        }

        const variant = getVariantById(variantId);
        items.push({
          tokenId,
          variantId: variantId ?? 0,
          imagePath: variant?.imagePath ?? '/nfts/common/s1.png',
          rarity: variant?.rarity ?? 'Common',
          name: variant?.name ?? `Mystic #${tokenId}`,
        });
      } catch {
        continue;
      }
    }

    items.sort((a, b) => Number(b.tokenId) - Number(a.tokenId));

    return NextResponse.json({ ok: true, items });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error';
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
