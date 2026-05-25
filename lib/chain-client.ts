import { createPublicClient, http } from 'viem';
import { base } from 'viem/chains';

export const publicClient = createPublicClient({
  chain: base,
  transport: http('https://mainnet.base.org'),
});

/** Base public RPC only allows small log ranges (~10k blocks). */
export async function getRecentFromBlock(): Promise<bigint> {
  const latest = await publicClient.getBlockNumber();
  const window = BigInt(12_000);
  return latest > window ? latest - window : BigInt(0);
}
