import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(process.cwd()),
  },
  async redirects() {
    return [
      {
        source: '/og-image.png',
        destination: '/opengraph-image',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value:
              "frame-ancestors 'self' https://warpcast.com https://*.warpcast.com https://farcaster.xyz https://*.farcaster.xyz https://base.org https://*.base.org https://base.app https://*.base.app https://vercel.app https://*.vercel.app",
          },
        ],
      },
    ]
  },
}

export default nextConfig
