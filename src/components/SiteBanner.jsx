import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const PAGE_KEY_BY_PATH = {
  '/': 'home',
  '/services': 'services',
  '/pricing': 'pricing',
  '/contact': 'contact',
  '/careers': 'careers',
}

function resolvePageKey(pathname) {
  if (pathname.startsWith('/careers')) return 'careers'
  return PAGE_KEY_BY_PATH[pathname] || null
}

function bannerItemStyle(size) {
  if (size === 'small') return { minHeight: 32, fontSize: 12 }
  if (size === 'large') return { minHeight: 56, fontSize: 16 }
  return { minHeight: 44, fontSize: 14 }
}

export default function SiteBanner({ settings }) {
  const { pathname } = useLocation()
  const ref = useRef(null)
  const [height, setHeight] = useState(0)

  const visibleBars = useMemo(() => {
    if (!settings || settings.enabled === false) return []
    const pageKey = resolvePageKey(pathname)
    return (settings.bars || []).filter((bar) => {
      const pages = Array.isArray(bar.pages) ? bar.pages : []
      return pages.length === 0 || pages.includes(pageKey)
    })
  }, [pathname, settings])

  useEffect(() => {
    const node = ref.current
    const nextHeight = visibleBars.length > 0 && node ? node.offsetHeight : 0
    setHeight(nextHeight)
    document.body.style.paddingTop = nextHeight > 0 ? `${nextHeight}px` : ''
    return () => {
      document.body.style.paddingTop = ''
    }
  }, [visibleBars])

  useEffect(() => {
    document.documentElement.style.setProperty('--site-banner-h', `${height}px`)
    return () => document.documentElement.style.setProperty('--site-banner-h', '0px')
  }, [height])

  if (visibleBars.length === 0) return null

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        top: 'var(--nav-h)',
        left: 0,
        right: 0,
        zIndex: 450,
        boxShadow: '0 10px 24px rgba(0,0,0,0.06)',
      }}
    >
      {visibleBars.map((bar, index) => {
        const style = bannerItemStyle(bar.size)
        const content = (
          <>
            <span style={{ lineHeight: 1.4 }}>{bar.text}</span>
            {bar.link && bar.link_text && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '5px 12px',
                  borderRadius: 999,
                  background: 'rgba(255,255,255,0.18)',
                  border: '1px solid rgba(255,255,255,0.22)',
                  fontSize: Math.max(style.fontSize - 1, 11),
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                }}
              >
                {bar.link_text} →
              </span>
            )}
          </>
        )

        return (
          <div
            key={bar.id || `${bar.text}-${index}`}
            style={{
              minHeight: style.minHeight,
              background: bar.bg_color || '#1a1a2e',
              color: bar.text_color || '#ffffff',
              borderBottom: index < visibleBars.length - 1 ? '1px solid rgba(255,255,255,0.12)' : 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '8px 18px',
              textAlign: 'center',
              fontSize: style.fontSize,
              fontWeight: 500,
              gap: 10,
              flexWrap: 'wrap',
            }}
          >
            {bar.link ? (
              bar.link.startsWith('http') ? (
                <a
                  href={bar.link}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: 'inherit', textDecoration: 'none', display: 'inline-flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}
                >
                  {content}
                </a>
              ) : (
                <Link
                  to={bar.link}
                  style={{ color: 'inherit', textDecoration: 'none', display: 'inline-flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}
                >
                  {content}
                </Link>
              )
            ) : (
              content
            )}
          </div>
        )
      })}
    </div>
  )
}
