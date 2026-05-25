'use client';

import { useReadContract } from 'wagmi';
import { mysticCrateAbi, NFT_CONTRACT_ADDRESS } from '@/lib/contracts';

export type LeaderboardRow = {
  rank: number;
  address: string;
  xp: number;
};

export function useLeaderboard() {
  const enabled =
    NFT_CONTRACT_ADDRESS.length > 0 && NFT_CONTRACT_ADDRESS.startsWith('0x');

  const { data, refetch, isLoading } = useReadContract({
    address: enabled ? (NFT_CONTRACT_ADDRESS as `0x${string}`) : undefined,
    abi: mysticCrateAbi,
    functionName: 'getLeaderboard',
    chainId: 8453,
    query: { enabled, refetchInterval: 15_000 },
  });

  if (!data) {
    return { rows: [] as LeaderboardRow[], isLoading, refetch };
  }

  const [users, scores] = data;
  const rows: LeaderboardRow[] = [];

  for (let i = 0; i < 10; i++) {
    const addr = users[i];
    const score = scores[i];
    if (!addr || addr === '0x0000000000000000000000000000000000000000' || Number(score) === 0) {
      continue;
    }
    rows.push({
      rank: rows.length + 1,
      address: addr,
      xp: Number(score),
    });
  }

  return { rows, isLoading, refetch };
}
