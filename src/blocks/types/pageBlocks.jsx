/**
 * Blocks shared across the inner pages.
 *
 * Same rule as the homepage blocks: markup and inline styles copied verbatim
 * from the page they came from, with only the words turned into props.
 */

import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { GEO_CITY_LINKS } from '../../lib/seoContent'
import MicrosoftPartnerBadge from '../../components/MicrosoftPartnerBadge'
import appleAuthorisedSellerBadge from '../../assets/apple-authorised-seller.svg'
import CareerJobCard from '../../components/CareerJobCard'
import { getPublishedJobs } from '../../lib/careers'

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

export function PageHeroBlock({ eyebrow, heading, body, maxWidth, bodyMaxWidth, paddingBottom }) {
  return (
    // Pricing trims its hero's bottom padding so the tab bar sits closer;
    // Services does not. Without this the two heroes differ by 76px.
    <section className="section" style={paddingBottom ? { paddingBottom } : undefined}>
      <div className="container" style={{ maxWidth: maxWidth || 720 }}>
        <div className="reveal">
          {eyebrow ? <p className="eyebrow" style={{ marginBottom: 16 }}>{eyebrow}</p> : null}
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px,6vw,80px)', fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.0, marginBottom: 20 }}>
            <Lines text={heading} />
          </h1>
          {/* No width set means unconstrained: Services caps its intro at 480px,
              Pricing deliberately does not, and forcing a default made the
              Pricing hero 76px taller than the live page. */}
          {body ? <p className="body-lg" style={bodyMaxWidth ? { maxWidth: bodyMaxWidth } : undefined}>{body}</p> : null}
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

/* ── Pricing tabs ───────────────────────────────────────────────────────── */

function PricingCta({ dark, to, external, children }) {
  const style = { display: 'block', textAlign: 'center', padding: '12px', borderRadius: 100, fontSize: 14, fontWeight: 500, background: dark ? 'white' : 'var(--accent)', color: dark ? 'var(--dark)' : 'white', transition: 'opacity 0.15s' }
  if (external) return <a href={to} target="_blank" rel="noreferrer" className="card-cta" style={style}>{children}</a>
  return <Link to={to} className="card-cta" style={style}>{children}</Link>
}

/**
 * The three pricing tabs. Tab state lives inside the block - it is behaviour,
 * not content, so there is nothing for an editor to set.
 */
export function PricingTabsBlock({ tabs, builds, hosting, hrIntro, hrPlans, appIntro, appPlans, appPrimaryLabel, appPrimaryHref, hostingIntro, hrPrimaryLabel, hrPrimaryHref, hrSecondaryLabel, hrSecondaryHref, ctaLabel }) {
  const [tab, setTab] = useState('build')
  const labels = tabs || [
    { key: 'build', label: 'Website Builds' },
    { key: 'apps', label: 'Apps & Games' },
    { key: 'hosting', label: 'Hosting' },
    { key: 'hr', label: 'HR System' },
  ]

  return (
    <>
      <div style={{ borderBottom: '1px solid var(--border-light)', position: 'sticky', top: 'var(--nav-h)', background: 'rgba(255,255,255,0.92)', backdropFilter: 'saturate(1.8) blur(20px)', zIndex: 50 }}>
        <div className="container" style={{ display: 'flex', gap: 0 }}>
          {labels.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              style={{ padding: '14px 20px', background: 'none', border: 'none', fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: tab === t.key ? 'var(--dark)' : 'var(--light)', cursor: 'pointer', borderBottom: `2px solid ${tab === t.key ? 'var(--dark)' : 'transparent'}`, marginBottom: -1, transition: 'color 0.15s' }}
            >{t.label}</button>
          ))}
        </div>
      </div>

      {tab === 'build' && (
        <section className="section">
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 16 }}>
              {(builds || []).map((p, i) => {
                const dark = p.badge === 'Most Popular'
                return (
                  <div key={p.name} className={`reveal pricing-card ${dark ? 'glass-card-dark' : 'glass-card'}`} style={{ padding: '28px 24px', borderRadius: 20, position: 'relative', transitionDelay: `${i * 0.07}s`, display: 'flex', flexDirection: 'column' }}>
                    {p.badge && <div style={{ position: 'absolute', top: 16, right: 16, padding: '3px 10px', borderRadius: 100, background: dark ? 'var(--accent)' : 'var(--accent-soft)', fontSize: 11, fontWeight: 600, color: dark ? 'white' : 'var(--accent)', letterSpacing: '0.04em' }}>{p.badge}</div>}
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: dark ? 'rgba(255,255,255,0.4)' : 'var(--light)', marginBottom: 12 }}>{p.name}</p>
                    <div style={{ fontSize: 40, fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1, color: dark ? 'white' : 'var(--dark)', marginBottom: 6 }}>£{Number(p.price || 0).toLocaleString()}</div>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: dark ? 'rgba(255,255,255,0.4)' : 'var(--light)', marginBottom: 16, letterSpacing: '0.04em' }}>ONE-OFF</p>
                    <div style={{ display: 'flex', gap: 16, marginBottom: 20, paddingBottom: 20, borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.1)' : 'var(--border-light)'}` }}>
                      <div style={{ fontSize: 12, color: dark ? 'rgba(255,255,255,0.5)' : 'var(--mid)' }}>Delivery: <strong style={{ color: dark ? 'white' : 'var(--dark)' }}>{p.delivery}</strong></div>
                    </div>
                    {/* flex:1 so the CTA sits on a common baseline across the row.
                        The tiers carry 6 or 7 features, which previously pushed
                        the buttons 25px out of line with each other. */}
                    <div style={{ flex: 1 }}>
                      {(p.features || []).map((f) => (
                        <div key={f} style={{ display: 'flex', gap: 8, marginBottom: 8, fontSize: 13.5, color: dark ? 'rgba(255,255,255,0.65)' : 'var(--dark2)', alignItems: 'baseline' }}>
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0, marginTop: 2 }}><path d="M1.5 6.5L4 9L10.5 2.5" stroke={dark ? 'rgba(255,255,255,0.5)' : 'var(--accent)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          {f}
                        </div>
                      ))}
                    </div>
                    <div style={{ marginTop: 20 }}><PricingCta dark={dark} to="/contact">{ctaLabel || 'Get started'}</PricingCta></div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {tab === 'hosting' && (
        <section className="section">
          <div className="container" style={{ maxWidth: 860 }}>
            <div className="reveal" style={{ marginBottom: 40 }}><p className="body-md">{hostingIntro}</p></div>
            <div className="pricing-grid-three" style={{ gap: 16 }}>
              {(hosting || []).map((p, i) => (
                <div key={p.name} className={`reveal pricing-card ${p.badge ? 'glass-card-dark' : 'glass-card'}`} style={{ padding: '28px 24px', borderRadius: 20, position: 'relative', transitionDelay: `${i * 0.07}s`, display: 'flex', flexDirection: 'column' }}>
                  {p.badge && <div style={{ position: 'absolute', top: 16, right: 16, padding: '3px 10px', borderRadius: 100, background: 'var(--accent)', fontSize: 11, fontWeight: 600, color: 'white', letterSpacing: '0.04em' }}>{p.badge}</div>}
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: p.badge ? 'rgba(255,255,255,0.4)' : 'var(--light)', marginBottom: 12 }}>{p.name}</p>
                  <div style={{ fontSize: 40, fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1, color: p.badge ? 'white' : 'var(--dark)', marginBottom: 4 }}>£{p.price}</div>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: p.badge ? 'rgba(255,255,255,0.4)' : 'var(--light)', marginBottom: 20, letterSpacing: '0.04em' }}>PER MONTH</p>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: p.badge ? 'rgba(255,255,255,0.6)' : 'var(--mid)', marginBottom: 24, flex: 1 }}>{p.desc}</p>
                  <PricingCta dark={!!p.badge} to="/contact">{ctaLabel || 'Get started'}</PricingCta>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {tab === 'apps' && (
        <section className="section">
          <div className="container" style={{ maxWidth: 860 }}>
            <div className="reveal" style={{ marginBottom: 40 }}><p className="body-md" style={{ maxWidth: 520 }}>{appIntro}</p></div>
            <div className="pricing-grid-two" style={{ gap: 16 }}>
              {(appPlans || []).map((p, i) => (
                <div key={p.name} className={`reveal pricing-card ${p.badge ? 'glass-card-dark' : 'glass-card'}`} style={{ padding: '28px 24px', borderRadius: 20, position: 'relative', transitionDelay: `${i * 0.07}s` }}>
                  {p.badge && <div style={{ position: 'absolute', top: 16, right: 16, padding: '3px 10px', borderRadius: 100, background: p.badge === 'Best Value' ? 'white' : 'var(--accent-soft)', fontSize: 11, fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.04em' }}>{p.badge}</div>}
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: p.badge ? 'rgba(255,255,255,0.4)' : 'var(--light)', marginBottom: 12 }}>{p.name}</p>
                  <div style={{ fontSize: 40, fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1, color: p.badge ? 'white' : 'var(--dark)', marginBottom: 4 }}>{p.price}</div>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: p.badge ? 'rgba(255,255,255,0.4)' : 'var(--light)', marginBottom: 20, letterSpacing: '0.04em' }}>{p.type}</p>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: p.badge ? 'rgba(255,255,255,0.68)' : 'var(--mid)', marginBottom: 24 }}>{p.desc}</p>
                  <PricingCta dark={!!p.badge} to="/contact">{ctaLabel || 'Get started'}</PricingCta>
                </div>
              ))}
            </div>
            <div className="reveal" style={{ display: 'flex', justifyContent: 'center', marginTop: 32 }}>
              <Link to={appPrimaryHref || '/contact'} className="btn-primary">{appPrimaryLabel || 'Talk about an app'}</Link>
            </div>
          </div>
        </section>
      )}

      {tab === 'hr' && (
        <section className="section">
          <div className="container" style={{ maxWidth: 860 }}>
            <div className="reveal" style={{ marginBottom: 40 }}><p className="body-md" style={{ maxWidth: 520 }}>{hrIntro}</p></div>
            <div className="pricing-grid-two" style={{ gap: 16 }}>
              {(hrPlans || []).map((p, i) => (
                <div key={p.name} className={`reveal pricing-card ${p.badge ? 'glass-card-dark' : 'glass-card'}`} style={{ padding: '28px 24px', borderRadius: 20, position: 'relative', transitionDelay: `${i * 0.07}s` }}>
                  {p.badge && <div style={{ position: 'absolute', top: 16, right: 16, padding: '3px 10px', borderRadius: 100, background: p.badge === 'Best Value' ? 'white' : 'var(--accent-soft)', fontSize: 11, fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.04em' }}>{p.badge}</div>}
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: p.badge ? 'rgba(255,255,255,0.4)' : 'var(--light)', marginBottom: 12 }}>{p.name}</p>
                  <div style={{ fontSize: 40, fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1, color: p.badge ? 'white' : 'var(--dark)', marginBottom: 4 }}>{p.price}</div>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: p.badge ? 'rgba(255,255,255,0.4)' : 'var(--light)', marginBottom: 20, letterSpacing: '0.04em' }}>{p.type}</p>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: p.badge ? 'rgba(255,255,255,0.68)' : 'var(--mid)', marginBottom: 24 }}>{p.desc}</p>
                  <PricingCta dark={!!p.badge} to="/contact">{ctaLabel || 'Get started'}</PricingCta>
                </div>
              ))}
            </div>
            <div className="reveal" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginTop: 32 }}>
              <Link to={hrPrimaryHref} className="btn-primary">{hrPrimaryLabel}</Link>
              <a href={hrSecondaryHref} target="_blank" rel="noreferrer" className="btn-secondary">{hrSecondaryLabel}</a>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

/* ── FAQ accordion ──────────────────────────────────────────────────────── */

export function FaqAccordionBlock({ eyebrow, heading, items, footerNote, ctaLabel, ctaHref }) {
  const [open, setOpen] = useState(null)
  return (
    <section className="section" style={{ background: 'var(--cream)', borderTop: '1px solid var(--border-light)' }}>
      <div className="container section-narrow">
        <div className="reveal" style={{ marginBottom: 48 }}>
          <p className="eyebrow" style={{ marginBottom: 14 }}>{eyebrow}</p>
          <h2 className="headline-md">{heading}</h2>
        </div>
        {(items || []).map((f, i) => (
          <div key={i} className="reveal" style={{ borderTop: '1px solid var(--border-light)' }}>
            <button onClick={() => setOpen(open === i ? null : i)} style={{ width: '100%', padding: '20px 0', background: 'none', border: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, cursor: 'pointer', textAlign: 'left' }}>
              <span style={{ fontSize: 16, fontWeight: 500, letterSpacing: '-0.01em', color: 'var(--dark)' }}>{f.q}</span>
              <span style={{ fontSize: 20, color: 'var(--mid)', transition: 'transform 0.2s', display: 'block', flexShrink: 0, transform: open === i ? 'rotate(45deg)' : 'none' }}>+</span>
            </button>
            {open === i && <p className="body-sm" style={{ paddingBottom: 20, animation: 'slideUp 0.25s ease both', maxWidth: 560 }}>{f.a}</p>}
          </div>
        ))}
        <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: 40, marginTop: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <p className="body-sm">{footerNote}</p>
          <Link to={ctaHref} className="btn-primary">{ctaLabel}</Link>
        </div>
      </div>
    </section>
  )
}

/* ── About ──────────────────────────────────────────────────────────────── */

const CONTACT_ICONS = {
  email: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="2" y="4" width="20" height="16" rx="2" /><polyline points="2,4 12,13 22,4" /></svg>,
  phone: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.61 19.79 19.79 0 01.01 1A2 2 0 012 .18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z" /></svg>,
}

function ContactLink({ kind, href, label }) {
  return (
    <a
      href={href}
      style={{ fontSize: 13, color: 'var(--mid)', display: 'flex', alignItems: 'center', gap: 8, transition: 'color 0.15s' }}
      onMouseOver={(e) => { e.currentTarget.style.color = 'var(--dark)' }}
      onMouseOut={(e) => { e.currentTarget.style.color = 'var(--mid)' }}
    >
      {CONTACT_ICONS[kind] || CONTACT_ICONS.phone}
      {label}
    </a>
  )
}

export function AboutHeroBlock({ eyebrow, heading, lead, body, primaryLabel, primaryHref, secondaryLabel, secondaryHref, initials, name, role, cardParagraphs, contacts }) {
  return (
    <section className="section" style={{ paddingBottom: 0 }}>
      <div className="container">
        <div className="about-hero-grid" style={{ gap: 'clamp(48px,7vw,100px)', alignItems: 'center' }}>
          <div className="reveal">
            <p className="eyebrow" style={{ marginBottom: 16 }}>{eyebrow}</p>
            <h1 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(36px,5vw,60px)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.0, marginBottom: 24 }}>
              <Lines text={heading} />
            </h1>
            <p className="body-lg" style={{ marginBottom: 20 }}>{lead}</p>
            <p className="body-md" style={{ color: 'var(--mid)', marginBottom: 32 }}>{body}</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to={primaryHref} className="btn-primary">{primaryLabel}</Link>
              <Link to={secondaryHref} className="btn-secondary">{secondaryLabel}</Link>
            </div>
          </div>

          <div className="reveal" style={{ transitionDelay: '0.1s' }}>
            <div className="glass-card" style={{ padding: 'clamp(28px,4vw,40px)' }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent) 0%, #30A46C 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 20, letterSpacing: '-0.02em' }}>
                {initials}
              </div>
              <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.01em', marginBottom: 4 }}>{name}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--light)', marginBottom: 20 }}>{role}</div>
              {(cardParagraphs || []).map((text, i) => (
                <p key={i} style={{ fontSize: 14, lineHeight: 1.75, color: 'var(--mid)', marginBottom: i === (cardParagraphs.length - 1) ? 24 : 20 }}>{text}</p>
              ))}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 20, borderTop: '1px solid var(--border-light)' }}>
                {(contacts || []).map((c) => (
                  <ContactLink key={c.href} kind={c.kind} href={c.href} label={c.label} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function ValuesGridBlock({ eyebrow, heading, items }) {
  return (
    <section className="section" style={{ background: 'var(--cream)', borderTop: '1px solid var(--border-light)' }}>
      <div className="container">
        <div className="reveal section-narrow" style={{ textAlign: 'center', marginBottom: 'clamp(40px,5vw,56px)' }}>
          <p className="eyebrow" style={{ marginBottom: 14 }}>{eyebrow}</p>
          <h2 className="headline-lg"><Lines text={heading} /></h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {(items || []).map((item, i) => (
            <div key={item.title} className="reveal glass-card" style={{ padding: '28px 24px', transitionDelay: `${i * 0.06}s` }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--accent-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7L5.5 10.5L12 3" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 8, letterSpacing: '-0.01em' }}>{item.title}</div>
              <p className="body-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Partners ───────────────────────────────────────────────────────────── */

export function PartnerHeroBlock({ eyebrow, heading, body, primaryLabel, primaryHref, secondaryLabel, secondaryHref, points }) {
  return (
    <section
      style={{
        padding: 'calc(var(--nav-h) + clamp(44px,7vw,92px)) clamp(20px,5vw,60px) clamp(60px,8vw,90px)',
        background: 'linear-gradient(180deg, rgba(244,245,243,0.8) 0%, rgba(255,255,255,1) 42%, rgba(255,255,255,1) 100%)',
        borderBottom: '1px solid var(--border-light)',
      }}
    >
      <div className="reveal partners-hero-grid" style={{ maxWidth: 'var(--max-w)', margin: '0 auto', gap: 'clamp(28px,4vw,56px)', alignItems: 'center' }}>
        <div>
          <p className="eyebrow" style={{ marginBottom: 18 }}>{eyebrow}</p>
          <h1 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(38px,6vw,74px)', fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 0.98, marginBottom: 22, maxWidth: 700 }}>
            {heading}
          </h1>
          <p style={{ fontSize: 'clamp(16px,1.5vw,19px)', lineHeight: 1.7, color: 'var(--dark2)', maxWidth: 620, marginBottom: 34 }}>{body}</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link to={primaryHref} className="btn-primary">{primaryLabel}</Link>
            <Link to={secondaryHref} className="btn-secondary">{secondaryLabel}</Link>
          </div>
        </div>

        <div className="reveal" style={{ padding: 'clamp(24px,3vw,34px)', borderRadius: 28, border: '1px solid var(--border-light)', background: 'linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(244,245,243,0.95) 100%)', boxShadow: '0 18px 40px rgba(29,29,31,0.06)' }}>
          <MicrosoftPartnerBadge width={320} />
          <div style={{ marginTop: 24, display: 'grid', gap: 14, paddingTop: 22, borderTop: '1px solid var(--border-light)' }}>
            {(points || []).map((item) => (
              <div key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span aria-hidden style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--accent)', marginTop: 7, flexShrink: 0 }} />
                <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--dark2)' }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function PartnerBenefitsBlock({ eyebrow, heading, body, cardEyebrow, cards, appleEyebrow, appleHeading, appleBody }) {
  return (
    <section className="section">
      <div className="container">
        <div className="reveal" style={{ maxWidth: 820, marginBottom: 42 }}>
          <p className="eyebrow" style={{ marginBottom: 12 }}>{eyebrow}</p>
          <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(30px,4vw,52px)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.08, marginBottom: 16 }}>{heading}</h2>
          <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--mid)', maxWidth: 720 }}>{body}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 18 }}>
          {(cards || []).map((card) => (
            <div key={card.title} className="reveal glass-card" style={{ padding: '26px 24px', minHeight: 220, display: 'flex', flexDirection: 'column' }}>
              <p style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--light)', marginBottom: 14 }}>{cardEyebrow}</p>
              <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.12, marginBottom: 12 }}>{card.title}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--dark2)' }}>{card.body}</p>
            </div>
          ))}
        </div>

        <div className="reveal" style={{ marginTop: 28, borderRadius: 28, border: '1px solid var(--border-light)', background: 'linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(244,245,243,0.96) 100%)', boxShadow: '0 18px 40px rgba(29,29,31,0.05)', padding: 'clamp(22px,3vw,30px)', display: 'grid', gridTemplateColumns: 'minmax(0, 280px) minmax(0, 1fr)', gap: 24, alignItems: 'center' }}>
          <img src={appleAuthorisedSellerBadge} alt="Apple Authorised Seller" style={{ width: '100%', maxWidth: 320, display: 'block' }} />
          <div>
            <p className="eyebrow" style={{ marginBottom: 10 }}>{appleEyebrow}</p>
            <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(24px,3.1vw,36px)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.08, marginBottom: 12 }}>{appleHeading}</h3>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--mid)', maxWidth: 680 }}>{appleBody}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export function TypicalFitBlock({ eyebrow, heading, body, areas }) {
  return (
    <section className="section" style={{ background: 'var(--cream)', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}>
      <div className="container partners-fit-grid" style={{ gap: 32, alignItems: 'start' }}>
        <div className="reveal">
          <p className="eyebrow" style={{ marginBottom: 12 }}>{eyebrow}</p>
          <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(30px,4vw,48px)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 16 }}>{heading}</h2>
          <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--mid)', maxWidth: 560 }}>{body}</p>
        </div>
        <div className="reveal" style={{ borderRadius: 26, padding: '28px clamp(22px,3vw,30px)', background: 'white', border: '1px solid var(--border-light)' }}>
          <div style={{ display: 'grid', gap: 14 }}>
            {(areas || []).map((item) => (
              <div key={item} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span
                  aria-hidden
                  style={{ width: 18, height: 18, borderRadius: 999, background: 'var(--accent-soft)', border: '1px solid rgba(200,16,46,0.14)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 2 }}
                >
                  +
                </span>
                <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--dark2)' }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Careers (app block) ────────────────────────────────────────────────── */

/**
 * The careers page. An app block rather than a content one: the right-hand
 * column loads live vacancies from the database and filters them, which is
 * behaviour. Everything on the left is editable copy.
 *
 * It is one block because it is one CSS grid - splitting the copy and the
 * listing into separate blocks would break the two-column layout.
 */
export function CareersBlock({ eyebrow, heading, body, infoRows, essentialsLabel, essentials, listingHeading, allLabel, loadingLabel, emptyHeading, emptyBody }) {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    getPublishedJobs().then(setJobs).finally(() => setLoading(false))
  }, [])

  const departments = useMemo(
    () => ['all', ...new Set(jobs.map((job) => job.department).filter(Boolean))],
    [jobs],
  )
  const filteredJobs = useMemo(
    () => jobs.filter((job) => (filter === 'all' ? true : job.department === filter)),
    [jobs, filter],
  )

  return (
    <section className="section">
      <div className="container">
        <div className="careers-hero-grid">
          <div>
            <div className="reveal">
              <p className="eyebrow" style={{ marginBottom: 16 }}>{eyebrow}</p>
              <h1 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(36px,5vw,60px)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.0, marginBottom: 24 }}>
                <Lines text={heading} />
              </h1>
              <p className="body-lg" style={{ marginBottom: 40 }}>{body}</p>
            </div>

            <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 0, border: '1px solid var(--border-light)', borderRadius: 16, overflow: 'hidden', marginBottom: 24 }}>
              {(infoRows || []).map((row, i, arr) => (
                <div key={row.title} style={{ padding: '18px 20px', borderBottom: i < arr.length - 1 ? '1px solid var(--border-light)' : 'none' }}>
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, letterSpacing: '-0.01em' }}>{row.title}</div>
                  <div className="body-sm" style={{ fontSize: 13 }}>{row.desc}</div>
                </div>
              ))}
            </div>

            <div className="reveal" style={{ padding: '18px 20px', background: 'var(--cream)', borderRadius: 12, border: '1px solid var(--border-light)' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--light)', marginBottom: 12 }}>{essentialsLabel}</p>
              {(essentials || []).map((r) => (
                <div key={r} style={{ display: 'flex', gap: 8, marginBottom: 8, fontSize: 14, color: 'var(--dark2)', alignItems: 'baseline' }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0, marginTop: 2 }}><path d="M1.5 6.5L4 9L10.5 2.5" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  {r}
                </div>
              ))}
            </div>
          </div>

          <div className="reveal">
            <div style={{ display: 'grid', gap: 16 }}>
              <div className="career-jobs-head">
                <h2 style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.02em' }}>{listingHeading}</h2>
                <div className="career-filter-row">
                  {departments.map((department) => (
                    <button
                      key={department}
                      onClick={() => setFilter(department)}
                      style={{ padding: '9px 14px', borderRadius: 999, border: '1px solid var(--border-light)', background: filter === department ? 'var(--accent)' : 'var(--white)', color: filter === department ? '#fff' : 'var(--dark2)', fontSize: 13 }}
                    >
                      {department === 'all' ? allLabel : department}
                    </button>
                  ))}
                </div>
              </div>
              {loading ? <div className="glass-card" style={{ padding: 26 }}>{loadingLabel}</div> : null}
              {!loading && filteredJobs.length === 0 ? (
                <div className="glass-card" style={{ padding: 26 }}>
                  <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{emptyHeading}</div>
                  <div className="body-sm">{emptyBody}</div>
                </div>
              ) : null}
              {filteredJobs.map((job) => <CareerJobCard key={job.id} job={job} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
