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

/* ── Case study blocks (Portfolio) ──────────────────────────────────────── */

/**
 * Icons are chosen by name rather than passed in. A block document is JSON, so
 * it cannot carry a React element the way the page's DELIVERABLES array did.
 */
const CASE_ICONS = {
  domain: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 12H21" stroke="var(--dark)" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M12 3C9.5 5.4 8 8.58 8 12C8 15.42 9.5 18.6 12 21" stroke="var(--dark)" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M12 3C14.5 5.4 16 8.58 16 12C16 15.42 14.5 18.6 12 21" stroke="var(--dark)" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="12" r="9" stroke="var(--dark)" strokeWidth="1.6" />
    </svg>
  ),
  device: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="5" width="16" height="12" rx="2.5" stroke="var(--dark)" strokeWidth="1.6" />
      <path d="M9 20H15" stroke="var(--dark)" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M12 17V20" stroke="var(--dark)" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  spark: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3L13.8 8.2L19 10L13.8 11.8L12 17L10.2 11.8L5 10L10.2 8.2L12 3Z" stroke="var(--dark)" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  ),
}

export function CaseStudyHeroBlock({ eyebrow, heading, body, primaryLabel, primaryHref, secondaryLabel, secondaryHref, note, image, imageAlt }) {
  return (
    <section className="section" style={{ paddingBottom: 'clamp(40px,6vw,72px)' }}>
      <div className="container portfolio-hero-grid" style={{ alignItems: 'center', gap: 'clamp(28px,5vw,64px)' }}>
        <div className="reveal">
          <p className="eyebrow" style={{ marginBottom: 18 }}>{eyebrow}</p>
          <h1 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(40px,6vw,74px)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.02, marginBottom: 18 }}>
            {heading}
          </h1>
          <p className="body-lg" style={{ maxWidth: 560, marginBottom: 28 }}>{body}</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 22 }}>
            {primaryLabel ? (
              <a href={primaryHref} target="_blank" rel="noreferrer" className="btn-primary">{primaryLabel}</a>
            ) : null}
            {secondaryLabel ? <Link to={secondaryHref} className="btn-secondary">{secondaryLabel}</Link> : null}
          </div>
          {note ? (
            <p style={{ fontSize: 14, color: 'var(--mid)', lineHeight: 1.65, maxWidth: 520 }}>{note}</p>
          ) : null}
        </div>

        <div className="reveal-scale">
          <div style={{ borderRadius: 20, border: '1px solid rgba(0,0,0,0.08)', background: 'linear-gradient(180deg, #d6ccbd 0%, #c7bcad 100%)', padding: 'clamp(24px,4vw,42px)', boxShadow: '0 10px 40px rgba(29,29,31,0.08)' }}>
            <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.28)', minHeight: 520, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 22 }}>
              <img src={image} alt={imageAlt || ''} style={{ width: '100%', maxWidth: 420, objectFit: 'contain' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function ProjectSnapshotBlock({ heading, body, rows, impactEyebrow, impact }) {
  return (
    <section className="section" style={{ background: 'var(--cream)', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}>
      <div className="container">
        <div className="reveal" style={{ maxWidth: 720, marginBottom: 34 }}>
          <h2 className="headline-md" style={{ marginBottom: 12 }}>{heading}</h2>
          <p className="body-md">{body}</p>
        </div>

        <div className="portfolio-detail-grid" style={{ gap: 16 }}>
          <div className="reveal glass-card" style={{ padding: '28px 24px' }}>
            <div style={{ display: 'grid', gap: 14 }}>
              {(rows || []).map((row) => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, paddingBottom: 14, borderBottom: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: 12, color: 'var(--light)', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{row.label}</span>
                  <span style={{ fontSize: 14, color: 'var(--dark)', fontWeight: 500, textAlign: 'right' }}>{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal" style={{ padding: '10px 0' }}>
            <p className="eyebrow" style={{ marginBottom: 14 }}>{impactEyebrow}</p>
            <div style={{ display: 'grid', gap: 12 }}>
              {(impact || []).map((item) => (
                <div key={item} className="check-row" style={{ padding: 0 }}>{item}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function DeliverablesBlock({ eyebrow, heading, body, items }) {
  return (
    <section className="section">
      <div className="container">
        <div className="reveal" style={{ maxWidth: 680, marginBottom: 34 }}>
          <p className="eyebrow" style={{ marginBottom: 14 }}>{eyebrow}</p>
          <h2 className="headline-md" style={{ marginBottom: 12 }}>{heading}</h2>
          <p className="body-md">{body}</p>
        </div>

        <div className="feature-grid-two" style={{ gap: 16 }}>
          {(items || []).map((item, index) => (
            <div key={item.title} className="reveal glass-card" style={{ padding: '28px 24px', transitionDelay: `${index * 0.06}s` }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: '#f1eadf', border: '1px solid rgba(29,29,31,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                {CASE_ICONS[item.icon] || CASE_ICONS.spark}
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 10 }}>{item.title}</h3>
              <p className="body-sm" style={{ fontSize: 14 }}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function DomainFeatureBlock({ eyebrow, heading, body, linkLabel, linkHref, linkCaption, ctaLabel, ctaHref }) {
  return (
    <section className="section" style={{ background: '#ece4d8' }}>
      <div className="container portfolio-detail-grid" style={{ gap: 'clamp(28px,5vw,64px)', alignItems: 'center' }}>
        <div className="reveal">
          <p className="eyebrow" style={{ color: 'rgba(29,29,31,0.72)', marginBottom: 14 }}>{eyebrow}</p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(34px,4.8vw,52px)', fontWeight: 400, lineHeight: 1.06, letterSpacing: '-0.02em', marginBottom: 14 }}>
            {heading}
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(29,29,31,0.74)', lineHeight: 1.7, maxWidth: 520 }}>{body}</p>
        </div>

        <div className="reveal">
          <div style={{ background: 'rgba(255,255,255,0.62)', border: '1px solid rgba(29,29,31,0.08)', borderRadius: 18, padding: '28px 24px' }}>
            <div style={{ display: 'grid', gap: 12 }}>
              <a
                href={linkHref} target="_blank" rel="noreferrer"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '14px 16px', background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(29,29,31,0.08)', borderRadius: 12, fontSize: 15, fontWeight: 500 }}
              >
                <span>{linkLabel}</span>
                <span style={{ color: 'var(--mid)' }}>{linkCaption}</span>
              </a>
              <Link to={ctaHref} className="btn-primary" style={{ justifyContent: 'center' }}>{ctaLabel}</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
