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
        source: '/nfts/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
        ],
      },
      {
        source: '/metadata/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=3600' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
        ],
      },
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
