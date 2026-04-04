export function trackEvent(name, props = {}) {
  if (typeof window === 'undefined') return

  if (window.plausible) {
    window.plausible(name, { props })
  }

  if (window.gtag) {
    window.gtag('event', name, props)
  }
}
