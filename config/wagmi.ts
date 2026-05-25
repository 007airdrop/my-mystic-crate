import { http, createConfig, createStorage, cookieStorage } from 'wagmi'
import { base } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'
import { farcasterMiniApp } from '@farcaster/miniapp-wagmi-connector'

export const farcasterConnector = farcasterMiniApp()
export const injectedConnector = injected()

export const config = createConfig({
  chains: [base],
  connectors: [farcasterConnector, injectedConnector],
  storage: createStorage({ storage: cookieStorage }),
  ssr: true,
  transports: {
    [base.id]: http('https://mainnet.base.org'),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
