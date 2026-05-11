import { useMemo } from 'react'
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

  const visibleBars = useMemo(() => {
    if (!settings || settings.enabled === false) return []
    const pageKey = resolvePageKey(pathname)
    return (settings.bars || []).filter((bar) => {
      const pages = Array.isArray(bar.pages) ? bar.pages : []
      return pages.length === 0 || pages.includes(pageKey)
    })
  }, [pathname, settings])

  if (visibleBars.length === 0) return null

  return (
    <div className="site-banner">
      <div className="site-banner__inner">
      {visibleBars.map((bar, index) => {
        const style = bannerItemStyle(bar.size)
        const content = (
          <>
            <span className="site-banner__text">{bar.text}</span>
            {bar.link && bar.link_text && (
              <span className="site-banner__pill" style={{ fontSize: Math.max(style.fontSize - 1, 11) }}>
                {bar.link_text} →
              </span>
            )}
          </>
        )

        return (
          <div
            key={bar.id || `${bar.text}-${index}`}
            className={`site-banner__item site-banner__item--${bar.size || 'normal'}`}
            style={{
              background: bar.bg_color || '#1a1a2e',
              color: bar.text_color || '#ffffff',
              fontSize: style.fontSize,
              minHeight: style.minHeight,
            }}
          >
            {bar.link ? (
              bar.link.startsWith('http') ? (
                <a
                  href={bar.link}
                  target="_blank"
                  rel="noreferrer"
                  className="site-banner__link"
                >
                  {content}
                </a>
              ) : (
                <Link
                  to={bar.link}
                  className="site-banner__link"
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
    </div>
  )
}
