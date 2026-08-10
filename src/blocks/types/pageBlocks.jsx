/**
 * Blocks shared across the inner pages.
 *
 * Same rule as the homepage blocks: markup and inline styles copied verbatim
 * from the page they came from, with only the words turned into props.
 */

import { Link } from 'react-router-dom'
import { GEO_CITY_LINKS } from '../../lib/seoContent'

/** Headings on these pages used <br />; editors type a newline instead. */
function Lines({ text }) {
  const parts = String(text ?? '').split('\n')
  return parts.map((part, i) => (
    <span key={i}>
      {part}
      {i < parts.length - 1 ? <br /> : null}
    </span>
  ))
}

/* ── Page hero ──────────────────────────────────────────────────────────── */

export function PageHeroBlock({ eyebrow, heading, body, maxWidth, bodyMaxWidth }) {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: maxWidth || 720 }}>
        <div className="reveal">
          {eyebrow ? <p className="eyebrow" style={{ marginBottom: 16 }}>{eyebrow}</p> : null}
          <h1 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(40px,6vw,80px)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.0, marginBottom: 20 }}>
            <Lines text={heading} />
          </h1>
          {body ? <p className="body-lg" style={{ maxWidth: bodyMaxWidth || 480 }}>{body}</p> : null}
        </div>
      </div>
    </section>
  )
}

/* ── Numbered service rows ──────────────────────────────────────────────── */

export function ServiceRowsBlock({ items }) {
  return (
    <>
      {(items || []).map((s) => (
        <div key={s.num || s.title} className="reveal" style={{ borderTop: '1px solid var(--border-light)' }}>
          <div className="container service-row" style={{ padding: 'clamp(36px,4vw,52px) clamp(20px,5vw,60px)', gap: 'clamp(24px,4vw,48px)', alignItems: 'start' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--light)', letterSpacing: '0.04em', paddingTop: 4 }}>{s.num}</span>
            <div>
              <h2 style={{ fontSize: 'clamp(20px,2.4vw,28px)', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 12 }}>{s.title}</h2>
              <p className="body-sm">{s.desc}</p>
            </div>
            <div>
              {(s.points || []).map((p) => (
                <div key={p} style={{ display: 'flex', gap: 10, marginBottom: 10, fontSize: 14, color: 'var(--dark2)', alignItems: 'baseline' }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
                    <path d="M1.5 6.5L4 9L10.5 2.5" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {p}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
      <div style={{ borderTop: '1px solid var(--border-light)' }} />
    </>
  )
}

/* ── Process steps ──────────────────────────────────────────────────────── */

export function ProcessStepsBlock({ eyebrow, heading, steps, primaryLabel, primaryHref, secondaryLabel, secondaryHref }) {
  return (
    <section className="section" style={{ background: 'var(--cream)', borderTop: '1px solid var(--border-light)' }}>
      <div className="container">
        <div className="reveal" style={{ marginBottom: 'clamp(40px,5vw,64px)' }}>
          {eyebrow ? <p className="eyebrow" style={{ marginBottom: 14 }}>{eyebrow}</p> : null}
          <h2 className="headline-lg"><Lines text={heading} /></h2>
        </div>
        <div className="process-grid" style={{ gap: 24, position: 'relative' }}>
          <div style={{ position: 'absolute', top: 20, left: '10%', right: '10%', height: 1, background: 'var(--border-light)' }} />
          {(steps || []).map((p, i) => (
            <div key={p.n || p.title} className="reveal" style={{ transitionDelay: `${i * 0.07}s` }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--white)', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--dark)', marginBottom: 20, position: 'relative', zIndex: 1 }}>{p.n}</div>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 8, letterSpacing: '-0.01em' }}>{p.title}</div>
              <p className="body-sm" style={{ fontSize: 13 }}>{p.desc}</p>
            </div>
          ))}
        </div>
        {primaryLabel ? (
          <div className="reveal" style={{ marginTop: 64, display: 'flex', gap: 12, alignItems: 'center' }}>
            <Link to={primaryHref} className="btn-primary">{primaryLabel}</Link>
            {secondaryLabel ? (
              <Link to={secondaryHref} className="btn-ghost">{secondaryLabel} <span className="arrow">→</span></Link>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  )
}

/* ── Location links ─────────────────────────────────────────────────────── */

/**
 * The city list comes from lib/seoContent, not from content: those pages have
 * to exist as routes for the links to work, so editing the list here would
 * only produce broken links. Wording around it stays editable.
 */
export function GeoLinksBlock({ eyebrow, heading, body }) {
  return (
    <section className="section" style={{ borderTop: '1px solid var(--border-light)' }}>
      <div className="container" style={{ maxWidth: 960 }}>
        <div className="reveal" style={{ marginBottom: 24 }}>
          {eyebrow ? <p className="eyebrow" style={{ marginBottom: 12 }}>{eyebrow}</p> : null}
          <h2 className="headline-md" style={{ marginBottom: 12 }}><Lines text={heading} /></h2>
          {body ? <p className="body-sm" style={{ maxWidth: 720 }}>{body}</p> : null}
        </div>
        <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          {GEO_CITY_LINKS.map((page) => (
            <Link key={page.to} to={page.to} className="btn-secondary" style={{ minWidth: 0 }}>
              {page.city}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
