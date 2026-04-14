import { useEffect, useState } from 'react'

const STORAGE_KEY = 'dh-site-loader-seen'

export default function InitialLoader() {
  const [visible, setVisible] = useState(false)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return undefined
    if (window.sessionStorage.getItem(STORAGE_KEY) === '1') return undefined

    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    const minVisible = reducedMotion ? 320 : 900
    const exitDuration = reducedMotion ? 180 : 420

    setVisible(true)
    window.sessionStorage.setItem(STORAGE_KEY, '1')

    const exitTimer = window.setTimeout(() => setExiting(true), minVisible)
    const hideTimer = window.setTimeout(() => setVisible(false), minVisible + exitDuration)

    return () => {
      window.clearTimeout(exitTimer)
      window.clearTimeout(hideTimer)
    }
  }, [])

  if (!visible) return null

  return (
    <div className={`initial-loader${exiting ? ' is-exiting' : ''}`} aria-hidden="true">
      <div className="initial-loader__halo" />
      <div className="initial-loader__core">
        <div className="initial-loader__mark-wrap">
          <img src="/dh-logo-icon.png" alt="" className="initial-loader__mark" />
        </div>
        <div className="initial-loader__text">
          <div className="initial-loader__eyebrow">Loading</div>
          <div className="initial-loader__title">DH Website Services</div>
        </div>
        <div className="initial-loader__track">
          <span className="initial-loader__bar" />
        </div>
      </div>
    </div>
  )
}
