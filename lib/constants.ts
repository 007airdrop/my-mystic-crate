/** Canonical production URL — must match accountAssociation domain in farcaster.json */
export const APP_URL = 'https://my-mystic-crate.vercel.app'

export const ASSETS = {
  icon: `${APP_URL}/icon.png`,
  opengraph: `${APP_URL}/opengraph-image.png`,
  /** Farcaster / Warpcast cover and hero art */
  ogCover: `${APP_URL}/og-cover.png`,
  miniappCard: `${APP_URL}/miniapp-card.png`,
  splash: `${APP_URL}/icon.png`,
  /** Legacy path kept for older links */
  ogImage: `${APP_URL}/og-cover.png`,
} as const
