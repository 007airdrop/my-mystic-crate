'use client'

import { useEffect } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { sdk } from '@farcaster/miniapp-sdk'
import { farcasterConnector, injectedConnector } from '@/config/wagmi'

export function ConnectWallet() {
  const { address, isConnected, isConnecting, isReconnecting } = useAccount()
  const { connect, isPending } = useConnect()
  const { disconnect } = useDisconnect()

  useEffect(() => {
    let cancelled = false

    void (async () => {
      try {
        if (cancelled || isConnected || isConnecting || isPending || isReconnecting) return
        if (!(await sdk.isInMiniApp())) return
        connect({ connector: farcasterConnector })
      } catch {
        // Not in mini app host
      }
    })()

    return () => {
      cancelled = true
    }
  }, [connect, isConnected, isConnecting, isPending, isReconnecting])

  if (isReconnecting) return <div>Reconnecting...</div>
  if (isConnecting || isPending) return <div>Connecting...</div>

  if (!isConnected) {
    return (
      <button
        onClick={() => connect({ connector: injectedConnector })}
        className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
      >
        Connect Wallet
      </button>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs">
        {address?.slice(0, 6)}...{address?.slice(-4)}
      </span>
      <button
        onClick={() => disconnect()}
        className="bg-red-500 text-white px-2 py-1 rounded text-xs"
      >
        Disconnect
      </button>
    </div>
  )
}
