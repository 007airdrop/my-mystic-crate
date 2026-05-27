import { APP_URL, ASSETS } from './constants'

/** fc:frame embed for Base App / Farcaster share previews */
export const baseFrameEmbed = {
  version: 'next' as const,
  imageUrl: ASSETS.miniappCard,
  button: {
    title: 'Open Mystic Crate',
    action: {
      type: 'launch_frame' as const,
      name: 'Mystic Crate',
      url: APP_URL,
      splashImageUrl: ASSETS.splash,
      splashBackgroundColor: '#0a0014',
    },
  },
}
