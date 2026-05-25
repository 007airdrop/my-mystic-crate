import { ImageResponse } from 'next/og'
import { BrandImage } from '@/lib/brand-image'

export const runtime = 'edge'

export async function GET() {
  return new ImageResponse(<BrandImage label="S" />, {
    width: 200,
    height: 200,
  })
}
