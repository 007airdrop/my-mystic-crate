'use client';

import { useAccount } from 'wagmi';
import { useQuery } from '@tanstack/react-query';
import { NFT_CONTRACT_ADDRESS } from '@/lib/contracts';

export type InventoryItem = {
  tokenId: string;
  variantId: number;
  imagePath: string;
  rarity: string;
  name: string;
};

export function useInventory() {
  const { address } = useAccount();

  return useQuery({
    queryKey: ['inventory', address, NFT_CONTRACT_ADDRESS],
    enabled: !!address && NFT_CONTRACT_ADDRESS.startsWith('0x'),
    queryFn: async (): Promise<InventoryItem[]> => {
      if (!address) return [];

      const res = await fetch(
        `/api/inventory?address=${encodeURIComponent(address)}`,
        { cache: 'no-store' },
      );
      const data = (await res.json()) as {
        ok: boolean;
        items?: InventoryItem[];
        error?: string;
      };
      if (!data.ok || !data.items) {
        console.warn('Inventory API:', data.error);
        return [];
      }
      return data.items;
    },
    staleTime: 10_000,
    refetchInterval: 20_000,
  });
}
