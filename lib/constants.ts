/** Canonical production URL — must match accountAssociation domain in farcaster.json */
export const APP_URL = 'https://my-mystic-crate.vercel.app'

export const ASSETS = {
  icon: `${APP_URL}/icon`,
  opengraph: `${APP_URL}/opengraph-image`,
  splash: `${APP_URL}/splash-icon`,
  /** Legacy path kept for older links */
  ogImage: `${APP_URL}/og-image.png`,
} as const
