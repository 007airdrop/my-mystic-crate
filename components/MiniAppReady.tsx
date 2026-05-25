'use client'

import { useEffect } from 'react'
import { sdk } from '@farcaster/miniapp-sdk'

export function MiniAppReady() {
  useEffect(() => {
    let cancelled = false

    void (async () => {
      try {
        const inMiniApp = await sdk.isInMiniApp()
        if (cancelled || !inMiniApp) return
        await sdk.actions.ready()
      } catch {
        // Outside Farcaster / Base App — ignore
      }
    })()

    return () => {
      cancelled = true
    }
  }, [])

  return null
}
