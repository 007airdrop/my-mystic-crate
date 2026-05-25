'use client';

import { useSwitchChain, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { base } from 'wagmi/chains';
import { parseEther } from 'viem';
import { useState, useEffect } from 'react';
import {
  mysticCrateAbi,
  NFT_CONTRACT_ADDRESS,
  DAILY_ACTION_PRICE,
} from '@/lib/contracts';
import { usePlayerStats } from '@/hooks/usePlayerStats';

type DailyPanelProps = {
  onXpToast: (msg: string) => void;
};

export function DailyPanel({ onXpToast }: DailyPanelProps) {
  const { switchChain } = useSwitchChain();
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: confirming, isSuccess } = useWaitForTransactionReceipt({ hash });
  const { totalXp, streak, canCheckIn, canSpin, refetch } = usePlayerStats();
  const [pendingAction, setPendingAction] = useState<'checkin' | 'spin' | null>(null);

  useEffect(() => {
    if (!isSuccess || !hash || !pendingAction) return;

    const run = async () => {
      // refetch stats after tx
      await refetch();
      setPendingAction(null);
      onXpToast(pendingAction === 'checkin' ? 'Check-in complete! +XP' : 'Spin complete! +XP');
    };
    void run();
  }, [isSuccess, hash, pendingAction, refetch, onXpToast]);

  useEffect(() => {
    if (error) setPendingAction(null);
  }, [error]);

  const runAction = async (action: 'checkin' | 'spin') => {
    if (!NFT_CONTRACT_ADDRESS.startsWith('0x')) return;
    try {
      await switchChain({ chainId: base.id });
    } catch {
      alert('Switch to Base network.');
      return;
    }
    setPendingAction(action);
    if (action === 'checkin') {
      writeContract({
        address: NFT_CONTRACT_ADDRESS as `0x${string}`,
        abi: mysticCrateAbi,
        functionName: 'dailyCheckIn',
        value: parseEther(DAILY_ACTION_PRICE),
        chainId: base.id,
      });
    } else {
      writeContract({
        address: NFT_CONTRACT_ADDRESS as `0x${string}`,
        abi: mysticCrateAbi,
        functionName: 'dailySpin',
        chainId: base.id,
      });
    }
  };

  const busy = isPending || confirming;

  return (
    <div className="space-y-4 text-white text-sm">
      <p className="text-zinc-400 text-center">
        Your XP: <span className="text-purple-400 font-bold">{totalXp}</span>
        {streak > 0 && (
          <span className="block mt-1">Check-in streak: Day {streak}/7</span>
        )}
      </p>

      <div className="rounded-2xl border border-zinc-700 bg-zinc-900/80 p-4 space-y-2">
        <p className="font-semibold text-purple-300">Daily Check-in</p>
        <p className="text-xs text-zinc-400">
          Once per day · {DAILY_ACTION_PRICE} ETH on Base · +10–30 XP (streak days 1–7)
        </p>
        <button
          type="button"
          disabled={!canCheckIn || busy}
          onClick={() => runAction('checkin')}
          className="w-full py-3 rounded-full bg-purple-600 font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-purple-500 transition"
        >
          {busy && pendingAction === 'checkin' ? 'Confirming...' : canCheckIn ? 'Check in' : 'Done today'}
        </button>
      </div>

      <div className="rounded-2xl border border-zinc-700 bg-zinc-900/80 p-4 space-y-2">
        <p className="font-semibold text-pink-300">Daily Spin</p>
        <p className="text-xs text-zinc-400">Once per day · Free · +15–30 XP</p>
        <button
          type="button"
          disabled={!canSpin || busy}
          onClick={() => runAction('spin')}
          className="w-full py-3 rounded-full bg-pink-600 font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-pink-500 transition"
        >
          {busy && pendingAction === 'spin' ? 'Spinning...' : canSpin ? 'Spin' : 'Done today'}
        </button>
      </div>
    </div>
  );
}
