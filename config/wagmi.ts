import { http, createConfig, createStorage, cookieStorage } from 'wagmi'
import { base } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'
import { farcasterMiniApp } from '@farcaster/miniapp-wagmi-connector'
import { Attribution } from 'ox/erc8021'

export const farcasterConnector = farcasterMiniApp()
export const injectedConnector = injected()

// Replace PLACEHOLDER_BUILDER_CODE with your encoded Builder Code from base.dev → Settings → Builder Codes.
export const builderDataSuffix = Attribution.toDataSuffix({
  codes: ['bc_74e5v3q'],
})

export const config = createConfig({
  chains: [base],
  connectors: [farcasterConnector, injectedConnector],
  storage: createStorage({ storage: cookieStorage }),
  ssr: true,
  transports: {
    [base.id]: http('https://mainnet.base.org'),
  },
  dataSuffix: builderDataSuffix,
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
