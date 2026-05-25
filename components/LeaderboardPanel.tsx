'use client';

import { useAccount } from 'wagmi';
import { useLeaderboard } from '@/hooks/useLeaderboard';
import { usePlayerStats } from '@/hooks/usePlayerStats';

function shortAddr(addr: string) {
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

export function LeaderboardPanel() {
  const { address } = useAccount();
  const { rows, isLoading } = useLeaderboard();
  const { totalXp } = usePlayerStats();

  return (
    <div className="space-y-3 text-white text-sm">
      <p className="text-zinc-400 text-center text-xs">
        Top 10 players by XP — rewards for ranks 1–10 coming soon
      </p>
      {address && (
        <p className="text-center text-purple-300 font-medium">
          You: {totalXp} XP
        </p>
      )}
      {isLoading && <p className="text-center text-zinc-500">Loading...</p>}
      {!isLoading && rows.length === 0 && (
        <p className="text-center text-zinc-500">No players yet. Be the first!</p>
      )}
      <ul className="space-y-2">
        {rows.map((row) => {
          const isYou = address?.toLowerCase() === row.address.toLowerCase();
          return (
            <li
              key={row.address}
              className={`flex items-center justify-between rounded-xl px-3 py-2 border ${
                isYou ? 'border-purple-500 bg-purple-950/40' : 'border-zinc-700 bg-zinc-900/60'
              }`}
            >
              <span className="font-bold text-yellow-400 w-6">#{row.rank}</span>
              <span className="flex-1 text-center font-mono text-xs">
                {isYou ? 'You' : shortAddr(row.address)}
              </span>
              <span className="text-purple-300 font-semibold">{row.xp} XP</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
