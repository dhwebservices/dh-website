import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { GA_MEASUREMENT_ID, PLAUSIBLE_DOMAIN } from '../lib/siteConfig'

function injectScript(id, src, dataDomain) {
  if (document.getElementById(id)) return

  const script = document.createElement('script')
  script.id = id
  script.async = true
  script.src = src
  if (dataDomain) script.setAttribute('data-domain', dataDomain)
  document.head.appendChild(script)
}

export default function Analytics() {
  const location = useLocation()

  useEffect(() => {
    if (PLAUSIBLE_DOMAIN) {
      injectScript('plausible-script', 'https://plausible.io/js/script.js', PLAUSIBLE_DOMAIN)
    }

    if (GA_MEASUREMENT_ID) {
      injectScript('ga-script', `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`)

      if (!window.dataLayer) window.dataLayer = []
      window.gtag = window.gtag || function gtag() {
        window.dataLayer.push(arguments)
      }

      window.gtag('js', new Date())
      window.gtag('config', GA_MEASUREMENT_ID, { send_page_view: false })
    }
  }, [])

  useEffect(() => {
    const path = location.pathname + location.search

    // First-party counter for the staff app (functions/api/hit.js). Live
    // domain only; no cookies, nothing per person. A "visit" is a landing
    // from outside the site, so in-site navigation only adds a view.
    if (window.location.hostname === 'www.dhwebsiteservices.co.uk' && !navigator.webdriver) {
      const first = !window.__dhCounted
      window.__dhCounted = true
      let external = true
      try { external = !document.referrer || new URL(document.referrer).hostname !== window.location.hostname } catch { /* keep true */ }
      const body = JSON.stringify({ visit: first && external })
      try {
        if (!navigator.sendBeacon?.('/api/hit', new Blob([body], { type: 'application/json' }))) {
          fetch('/api/hit', { method: 'POST', body, headers: { 'Content-Type': 'application/json' }, keepalive: true }).catch(() => {})
        }
      } catch { /* never break the page for a counter */ }
    }

    if (window.plausible && PLAUSIBLE_DOMAIN) {
      window.plausible('pageview', { u: window.location.href })
    }

    if (window.gtag && GA_MEASUREMENT_ID) {
      window.gtag('config', GA_MEASUREMENT_ID, { page_path: path })
    }
  }, [location])

  useEffect(() => {
    window.trackDhEvent = (name, props = {}) => {
      if (window.plausible) window.plausible(name, { props })
      if (window.gtag) window.gtag('event', name, props)
    }

    return () => {
      delete window.trackDhEvent
    }
  }, [])

  return null
}
