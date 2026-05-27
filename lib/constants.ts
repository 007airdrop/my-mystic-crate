/** Canonical production URL — must match Base.dev primary URL */
export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? 'https://mystic-crate1.vercel.app'

/** Base.dev project app id (meta base:app_id) */
export const BASE_APP_ID =
  process.env.NEXT_PUBLIC_BASE_APP_ID ?? '6a11a15eeb640b005facbf51'

export const ASSETS = {
  icon: `${APP_URL}/icon.png`,
  opengraph: `${APP_URL}/opengraph-image.png`,
  ogCover: `${APP_URL}/og-cover.png`,
  miniappCard: `${APP_URL}/miniapp-card.png`,
  splash: `${APP_URL}/icon.png`,
  screenshot: `${APP_URL}/screenshots/app-screenshot.png`,
  ogImage: `${APP_URL}/og-cover.png`,
} as const
