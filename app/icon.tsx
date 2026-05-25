import { ImageResponse } from 'next/og'
import { BrandImage } from '@/lib/brand-image'

export const size = { width: 1024, height: 1024 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(<BrandImage label="MC" />, { ...size })
}
