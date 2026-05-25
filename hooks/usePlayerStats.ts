'use client';

import { useAccount, useReadContract } from 'wagmi';
import { mysticCrateAbi, NFT_CONTRACT_ADDRESS } from '@/lib/contracts';

export function usePlayerStats() {
  const { address } = useAccount();
  const enabled =
    !!address &&
    NFT_CONTRACT_ADDRESS.length > 0 &&
    NFT_CONTRACT_ADDRESS.startsWith('0x');

  const { data, refetch, isLoading } = useReadContract({
    address: enabled ? (NFT_CONTRACT_ADDRESS as `0x${string}`) : undefined,
    abi: mysticCrateAbi,
    functionName: 'getPlayerStats',
    args: enabled ? [address] : undefined,
    chainId: 8453,
    query: { enabled, refetchInterval: 12_000 },
  });

  if (!data) {
    return {
      totalXp: 0,
      mintsRemaining: 2,
      streak: 0,
      canCheckIn: true,
      canSpin: true,
      isLoading,
      refetch,
    };
  }

  const [totalXp, mintsRemaining, streak, canCheckIn, canSpin] = data;

  return {
    totalXp: Number(totalXp),
    mintsRemaining: Number(mintsRemaining),
    streak: Number(streak),
    canCheckIn,
    canSpin,
    isLoading,
    refetch,
  };
}
