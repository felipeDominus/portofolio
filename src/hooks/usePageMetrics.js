import { useEffect } from 'react'

export function usePageMetrics() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const hasRun = window.__PORTFOLIO_METRICS_INITIALISED
    if (hasRun) return
    window.__PORTFOLIO_METRICS_INITIALISED = true

    const start = performance.now()

    function handleBeforeUnload() {
      // In a real deployment this is where we would send
      // Math.round(performance.now() - start), location.pathname, and simple events to
      // a privacy-friendly analytics backend.
      // Intentionally no console.log to keep the UI clean.
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])
}

