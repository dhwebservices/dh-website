import { useEffect } from 'react'

const SELECTORS = '.reveal, .reveal-scale'

/**
 * Scroll reveal.
 *
 * Elements are visible until this hook arms them, so anything it never reaches
 * stays readable. The previous version hid .reveal from the stylesheet and ran
 * a single pass on mount, which left blocks that mounted later -- lazy routes,
 * CMS content arriving after its fetch -- stuck at opacity 0 forever.
 */
export function useReveal() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.matchMedia('(max-width: 768px), (hover: none)').matches

    // Nothing to animate: leave every element in its default visible state.
    if (reduced || isMobile) return undefined

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

      const viewportH = window.innerHeight || document.documentElement.clientHeight
      const rect = el.getBoundingClientRect()

      // Already on screen: show it without arming, so it never flashes out.
      if (rect.top < viewportH - 40 && rect.bottom > 0) {
        el.classList.add('visible')
        return
      }

      el.classList.add('is-armed')
      obs.observe(el)
    }

    const observeAll = (root) => {
      if (!(root instanceof Element)) return
      if (root.matches?.(SELECTORS)) observeEl(root)
      root.querySelectorAll?.(SELECTORS).forEach(observeEl)
    }

    observeAll(document.body)

    // Pick up blocks that mount after this first pass.
    const mo = new MutationObserver((records) => {
      records.forEach((r) => r.addedNodes.forEach(observeAll))
    })
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      mo.disconnect()
      obs.disconnect()
    }
  }, [])
}
