/** True when the app is opened inside the Base App in-app browser / webview. */
export function isInBaseApp(): boolean {
  if (typeof window === 'undefined') return false

  try {
    const ref = document.referrer
    if (ref.includes('base.app') || ref.includes('wallet.coinbase.com')) return true
  } catch {
    // ignore
  }

  try {
    if (window.self !== window.top) {
      const ua = navigator.userAgent
      if (/CoinbaseWallet|BaseApp|Base\/\d/i.test(ua)) return true
    }
  } catch {
    // cross-origin embed — common in Base App
    return true
  }

  return false
}
