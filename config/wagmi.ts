import { http, createConfig, createStorage, cookieStorage } from 'wagmi'
import { base } from 'wagmi/chains'
import { baseAccount, injected } from 'wagmi/connectors'
import { ASSETS } from '@/lib/constants'

export const baseAccountConnector = baseAccount({
  appName: 'Mystic Crate',
  appLogoUrl: ASSETS.icon,
})

export const injectedConnector = injected()

export const config = createConfig({
  chains: [base],
  connectors: [baseAccountConnector, injectedConnector],
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
