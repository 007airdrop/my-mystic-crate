import { createPublicClient, http, type AbiEvent, type Log } from 'viem';
import { base } from 'viem/chains';

const rpcUrl = process.env.BASE_RPC_URL || 'https://mainnet.base.org';

export const publicClient = createPublicClient({
  chain: base,
  transport: http(rpcUrl),
});

/** Base public RPC rejects eth_getLogs ranges over 10,000 blocks. */
export const LOG_BLOCK_CHUNK = BigInt(9999);

/** Mystic Crate deploy block on Base mainnet (chunked log scans start here). */
export const NFT_DEPLOY_BLOCK = BigInt(46441200);

export async function getRecentFromBlock(): Promise<bigint> {
  const latest = await publicClient.getBlockNumber();
  return latest > LOG_BLOCK_CHUNK ? latest - LOG_BLOCK_CHUNK : BigInt(0);
}

type GetLogsParams = {
  address: `0x${string}`;
  event: AbiEvent;
  args?: Record<string, unknown>;
  fromBlock?: bigint;
  toBlock?: bigint | 'latest';
};

/** Fetch logs in ≤9,999-block chunks (required by Base public RPC). */
export async function getLogsChunked(params: GetLogsParams): Promise<Log[]> {
  const latest =
    params.toBlock === 'latest' || params.toBlock == null
      ? await publicClient.getBlockNumber()
      : params.toBlock;

  let cursor = params.fromBlock ?? NFT_DEPLOY_BLOCK;
  const all: Log[] = [];

  while (cursor <= latest) {
    const chunkEnd = cursor + LOG_BLOCK_CHUNK > latest ? latest : cursor + LOG_BLOCK_CHUNK;
    const chunk = await publicClient.getLogs({
      address: params.address,
      event: params.event,
      args: params.args as never,
      fromBlock: cursor,
      toBlock: chunkEnd,
    });
    all.push(...chunk);
    if (chunkEnd >= latest) break;
    cursor = chunkEnd + BigInt(1);
  }

  return all;
}
