import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'
import { APP_URL, ASSETS } from '@/lib/constants'
import { miniAppEmbed } from '@/lib/miniapp-embed'

const description = 'Pay 0.000001 ETH on Base and open a mystery crate!'

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: 'Mystic Crate',
  description,
  openGraph: {
    title: 'Mystic Crate',
    description,
    url: APP_URL,
    siteName: 'Mystic Crate',
    images: [{ url: ASSETS.opengraph, width: 1200, height: 630, alt: 'Mystic Crate' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mystic Crate',
    description,
    images: [ASSETS.opengraph],
  },
  other: {
    'fc:miniapp': JSON.stringify(miniAppEmbed),
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
