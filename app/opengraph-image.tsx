import { ImageResponse } from 'next/og'
import { BrandImage } from '@/lib/brand-image'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Mystic Crate — open mystery crates on Base'

export default function OpenGraphImage() {
  return new ImageResponse(<BrandImage label="MYSTIC CRATE" />, { ...size })
}
