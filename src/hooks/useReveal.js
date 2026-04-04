import { useEffect } from 'react'

export function useReveal() {
  useEffect(() => {
    const selectors = '.reveal, .reveal-scale'
    const seen = new WeakSet()
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          obs.unobserve(e.target)
        }
      }),
      { threshold: 0.06, rootMargin: '0px 0px -40px 0px' }
    )

    const observeEl = (el) => {
      if (seen.has(el) || el.classList.contains('visible')) return
      seen.add(el)

      const rect = el.getBoundingClientRect()
      const viewportH = window.innerHeight || document.documentElement.clientHeight
      const alreadyVisible = rect.top < viewportH - 40 && rect.bottom > 0

      if (alreadyVisible) {
        el.classList.add('visible')
        return
      }

      obs.observe(el)
    }

    const observeAll = () => {
      document.querySelectorAll(selectors).forEach(observeEl)
    }

    observeAll()

    const mo = new MutationObserver(() => observeAll())
    mo.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] })

    return () => {
      mo.disconnect()
      obs.disconnect()
    }
  }, [])
}
