import { APP_URL } from './constants';

export type RarityName = 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary';

export type NftVariant = {
  id: number;
  name: string;
  rarity: RarityName;
  imagePath: string;
  skin: string;
};

/** Maps contract variant index (0–19) to artwork and rarity. */
export const NFT_VARIANTS: readonly NftVariant[] = [
  { id: 0, name: 'Mystic Shard', rarity: 'Common', imagePath: '/nfts/common/s1.png', skin: 's1' },
  { id: 1, name: 'Mystic Ember', rarity: 'Common', imagePath: '/nfts/common/s2.png', skin: 's2' },
  { id: 2, name: 'Mystic Dust', rarity: 'Common', imagePath: '/nfts/common/s3.png', skin: 's3' },
  { id: 3, name: 'Mystic Pebble', rarity: 'Common', imagePath: '/nfts/common/s4.png', skin: 's4' },
  { id: 4, name: 'Mystic Spark', rarity: 'Common', imagePath: '/nfts/common/s5.png', skin: 's5' },
  { id: 5, name: 'Mystic Gleam', rarity: 'Common', imagePath: '/nfts/common/s6.png', skin: 's6' },
  { id: 6, name: 'Mystic Pulse', rarity: 'Uncommon', imagePath: '/nfts/uncommon/s7.png', skin: 's7' },
  { id: 7, name: 'Mystic Wave', rarity: 'Uncommon', imagePath: '/nfts/uncommon/s8.png', skin: 's8' },
  { id: 8, name: 'Mystic Bloom', rarity: 'Uncommon', imagePath: '/nfts/uncommon/s9.png', skin: 's9' },
  { id: 9, name: 'Mystic Crest', rarity: 'Uncommon', imagePath: '/nfts/uncommon/s10.png', skin: 's10' },
  { id: 10, name: 'Mystic Arc', rarity: 'Uncommon', imagePath: '/nfts/uncommon/s11.png', skin: 's11' },
  { id: 11, name: 'Mystic Prism', rarity: 'Rare', imagePath: '/nfts/rare/s12.png', skin: 's12' },
  { id: 12, name: 'Mystic Nova', rarity: 'Rare', imagePath: '/nfts/rare/s13.png', skin: 's13' },
  { id: 13, name: 'Mystic Eclipse', rarity: 'Rare', imagePath: '/nfts/rare/s14.png', skin: 's14' },
  { id: 14, name: 'Mystic Aurora', rarity: 'Rare', imagePath: '/nfts/rare/s15.png', skin: 's15' },
  { id: 15, name: 'Mystic Crown', rarity: 'Epic', imagePath: '/nfts/epic/s16.png', skin: 's16' },
  { id: 16, name: 'Mystic Sovereign', rarity: 'Epic', imagePath: '/nfts/epic/s17.png', skin: 's17' },
  { id: 17, name: 'Mystic Dominion', rarity: 'Epic', imagePath: '/nfts/epic/s18.png', skin: 's18' },
  { id: 18, name: 'Mystic Oracle', rarity: 'Legendary', imagePath: '/nfts/legendary/s19.png', skin: 's19' },
  { id: 19, name: 'Mystic Genesis', rarity: 'Legendary', imagePath: '/nfts/legendary/s20.png', skin: 's20' },
] as const;

export function variantMetadataUri(variantId: number): string {
  return `${APP_URL}/metadata/variants/${variantId}.json`;
}

export function getVariantById(id: number): NftVariant | undefined {
  return NFT_VARIANTS.find((v) => v.id === id);
}

export function openSeaAssetUrl(contract: string, tokenId: bigint | number | string): string {
  return `https://opensea.io/assets/base/${contract}/${tokenId}`;
}
