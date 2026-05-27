'use client'

import { useEffect } from 'react'
import { isInBaseApp } from '@/lib/is-base-app'

/** Tightens phone layout when opened inside Base App / in-app browser. */
export function EmbeddedAppShell() {
  useEffect(() => {
    const root = document.documentElement
    const embedded = isInBaseApp() || window.self !== window.top

    if (embedded) {
      root.dataset.embeddedApp = 'true'
    } else {
      delete root.dataset.embeddedApp
    }

    return () => {
      delete root.dataset.embeddedApp
    }
  }, [])

  return null
}
