/**
 * Blocks lifted from the existing hardcoded pages.
 *
 * The markup and inline styles are copied verbatim from the pages they came
 * from. Only the words and lists are turned into props. That is deliberate:
 * rewriting the markup "more cleanly" while converting is how a migration ends
 * up looking subtly wrong on the live site, and there is no way to spot a 4px
 * drift across ten pages by eye.
 */

import { Link } from 'react-router-dom'
import MicrosoftPartnerBadge from '../../components/MicrosoftPartnerBadge'

/* ── Hero ───────────────────────────────────────────────────────────────── */

export function HeroBlock({ headlineLead, headlineRotating, body, primaryLabel, primaryHref, secondaryLabel, secondaryHref, stats, showScrollHint }) {
  return (
    <section
      className="home-hero"
      style={{ minHeight: '100svh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', position: 'relative', overflow: 'hidden', padding: 'calc(var(--nav-h) + clamp(10px,2vw,18px)) clamp(20px,5vw,60px) clamp(60px,8vw,100px)' }}
    >
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 880, margin: '0 auto', width: '100%' }}>
        <h1 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(44px,7vw,88px)', fontWeight: 600, letterSpacing: '-0.035em', lineHeight: 1.0, marginBottom: 24 }}>
          {headlineLead}<br />
          <span style={{ color: 'var(--accent)' }}>{headlineRotating}</span>
        </h1>

        <p className="body-lg" style={{ maxWidth: 520, marginBottom: 40 }}>{body}</p>

        <div className="home-hero__actions" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link to={primaryHref} className="btn-primary">
            {primaryLabel}<span style={{ marginLeft: 2, opacity: 0.7 }}>→</span>
          </Link>
          <Link to={secondaryHref} className="btn-ghost">{secondaryLabel}</Link>
        </div>

        <div className="home-hero__stats" style={{ display: 'flex', alignItems: 'center', gap: 24, marginTop: 56, flexWrap: 'wrap' }}>
          {(stats || []).map((stat) => (
            <div key={stat.label}>
              <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1 }}>{stat.value}</div>
              <div style={{ fontSize: 12, color: 'var(--light)', marginTop: 3 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {showScrollHint && (
        <div className="home-hero__scroll-hint" style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 1, height: 32, background: 'linear-gradient(to bottom, transparent, var(--border))' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--light)' }}>Scroll</span>
        </div>
      )}
    </section>
  )
}

/* ── Trust bar ──────────────────────────────────────────────────────────── */

export function TrustBarBlock({ items }) {
  return (
    <section style={{ background: 'var(--white)', borderBottom: '1px solid var(--border-light)', padding: 'clamp(20px,3vw,28px) 0' }}>
      <div className="container">
        <div className="reveal" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 'clamp(24px,5vw,48px)', flexWrap: 'wrap' }}>
          {(items || []).map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ fontSize: 24, filter: 'grayscale(0.3)', opacity: 0.7 }}>{item.icon}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--dark)', lineHeight: 1.3 }}>{item.label}</div>
                <div style={{ fontSize: 11, color: 'var(--light)', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}>{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Partner highlight ──────────────────────────────────────────────────── */

export function PartnerHighlightBlock({ eyebrow, heading, body, primaryLabel, primaryHref, secondaryLabel, secondaryHref, points }) {
  return (
    <section className="section" style={{ background: 'var(--cream)', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}>
      <div className="container partner-highlight-grid" style={{ gap: 32, alignItems: 'center' }}>
        <div className="reveal">
          <p className="eyebrow" style={{ marginBottom: 12 }}>{eyebrow}</p>
          <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(30px,4vw,50px)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.08, marginBottom: 14, maxWidth: 680 }}>
            {heading}
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--mid)', maxWidth: 650, marginBottom: 24 }}>{body}</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link to={primaryHref} className="btn-primary">{primaryLabel}</Link>
            <Link to={secondaryHref} className="btn-secondary">{secondaryLabel}</Link>
          </div>
        </div>

        <div className="reveal">
          <div className="glass-card" style={{ padding: '28px clamp(22px,3vw,32px)' }}>
            <MicrosoftPartnerBadge width={280} />
            <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid var(--border-light)', display: 'grid', gap: 10 }}>
              {(points || []).map((item) => (
                <div key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span aria-hidden style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', marginTop: 7, flexShrink: 0 }} />
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--dark2)' }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Services grid ──────────────────────────────────────────────────────── */

export function ServicesGridBlock({ eyebrow, heading, body, linkLabel, linkHref, services }) {
  return (
    <section className="section" style={{ background: 'var(--cream)', borderTop: '1px solid var(--border-light)' }}>
      <div className="container">
        <div className="services-intro-grid" style={{ gap: 'clamp(40px,6vw,80px)', alignItems: 'start' }}>
          <div style={{ position: 'sticky', top: 80 }}>
            <div className="reveal">
              <p className="eyebrow" style={{ marginBottom: 16 }}>{eyebrow}</p>
              <h2 className="headline-lg" style={{ marginBottom: 20 }}>{heading}</h2>
              <p className="body-md" style={{ marginBottom: 32 }}>{body}</p>
              <Link to={linkHref} className="btn-ghost" style={{ paddingLeft: 0 }}>
                {linkLabel} <span className="arrow">→</span>
              </Link>
            </div>
          </div>
          <div className="feature-grid-two" style={{ gap: 1, background: 'var(--border-light)', border: '1px solid var(--border-light)', borderRadius: 20, overflow: 'hidden' }}>
            {(services || []).map((s, i) => (
              <div key={s.title} className="reveal glass-card" style={{ borderRadius: 0, border: 'none', padding: '28px 24px', transitionDelay: `${i * 0.04}s` }}>
                <div style={{ fontSize: 22, marginBottom: 12, filter: 'grayscale(1) opacity(0.4)' }}>{s.icon}</div>
                <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 8, letterSpacing: '-0.01em' }}>{s.title}</h3>
                <p className="body-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Why / feature grid ─────────────────────────────────────────────────── */

export function WhyGridBlock({ eyebrow, heading, items }) {
  return (
    <section className="section">
      <div className="container">
        <div className="reveal section-narrow" style={{ textAlign: 'center', marginBottom: 'clamp(48px,6vw,72px)' }}>
          <p className="eyebrow" style={{ marginBottom: 16 }}>{eyebrow}</p>
          <h2 className="headline-lg">{heading}</h2>
        </div>
        <div className="why-grid" style={{ gap: 1, background: 'var(--border-light)', border: '1px solid var(--border-light)', borderRadius: 20, overflow: 'hidden' }}>
          {(items || []).map((item, i) => (
            <div key={item.title} className="reveal" style={{ padding: '32px 28px', background: 'var(--white)', transitionDelay: `${i * 0.05}s` }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--accent-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7L5.5 10.5L12 3" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 6, letterSpacing: '-0.01em' }}>{item.title}</h3>
              <p className="body-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
