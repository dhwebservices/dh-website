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
import { HeroBg, Typewriter, PricingCard } from '../shared/HomeParts'
import { Icon } from '../shared/Icon'

/**
 * Several of these headings used a literal <br /> in the original markup.
 * Editors type a newline instead, so render newlines as line breaks - without
 * this the two-line headings collapse onto one and the sections get shorter.
 */
function Lines({ text }) {
  const parts = String(text ?? '').split('\n')
  return parts.map((part, i) => (
    <span key={i}>
      {part}
      {i < parts.length - 1 ? <br /> : null}
    </span>
  ))
}

/* ── Hero ───────────────────────────────────────────────────────────────── */

export function HeroBlock({ headlineLead, typewriterLines, body, primaryLabel, primaryHref, secondaryLabel, secondaryHref, stats, showScrollHint }) {
  return (
    <section
      className="home-hero"
      style={{ minHeight: '100svh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', position: 'relative', overflow: 'hidden', padding: 'calc(var(--nav-h) + clamp(10px,2vw,18px)) clamp(20px,5vw,60px) clamp(60px,8vw,100px)' }}
    >
      <HeroBg />
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 880, margin: '0 auto', width: '100%' }}>
        <h1 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(44px,7vw,88px)', fontWeight: 600, letterSpacing: '-0.035em', lineHeight: 1.0, marginBottom: 24, animation: 'fadeUp 0.7s ease 0.05s both' }}>
          {headlineLead}<br />
          <Typewriter lines={typewriterLines} />
        </h1>

        <p className="body-lg" style={{ maxWidth: 520, marginBottom: 40, animation: 'fadeUp 0.7s ease 0.1s both' }}>{body}</p>

        <div className="home-hero__actions" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', animation: 'fadeUp 0.7s ease 0.15s both' }}>
          <Link to={primaryHref} className="btn-primary">
            {primaryLabel}<span style={{ marginLeft: 2, opacity: 0.7 }}>→</span>
          </Link>
          <Link to={secondaryHref} className="btn-ghost">{secondaryLabel}</Link>
        </div>

        <div className="home-hero__stats" style={{ display: 'flex', alignItems: 'center', gap: 24, marginTop: 56, flexWrap: 'wrap', animation: 'fadeUp 0.7s ease 0.2s both' }}>
          {(stats || []).map((stat) => (
            <div key={stat.label}>
              <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1 }}>{stat.value}</div>
              <div style={{ fontSize: 12, color: 'var(--light)', marginTop: 3 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {showScrollHint && (
        <div className="home-hero__scroll-hint" style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, animation: 'fadeIn 1s ease 1.5s both', opacity: 0, animationFillMode: 'forwards' }}>
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
              <Icon name={item.icon} size={22} />
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
          <div className="services-intro-sticky">
            <div className="reveal">
              <p className="eyebrow" style={{ marginBottom: 16 }}>{eyebrow}</p>
              <h2 className="headline-lg" style={{ marginBottom: 20 }}><Lines text={heading} /></h2>
              <p className="body-md" style={{ marginBottom: 32 }}>{body}</p>
              <Link to={linkHref} className="btn-ghost" style={{ paddingLeft: 0 }}>
                {linkLabel} <span className="arrow">→</span>
              </Link>
            </div>
          </div>
          <div className="feature-grid-two" style={{ gap: 1, background: 'var(--border-light)', border: '1px solid var(--border-light)', borderRadius: 20, overflow: 'hidden' }}>
            {(services || []).map((s, i) => (
              <div key={s.title} className="reveal glass-card" style={{ borderRadius: 0, border: 'none', padding: '28px 24px', transitionDelay: `${i * 0.04}s` }}>
                <div style={{ marginBottom: 14 }}><Icon name={s.icon} size={22} /></div>
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
          <h2 className="headline-lg"><Lines text={heading} /></h2>
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

/* ── Card row (the "Judge the process" credibility strip) ───────────────── */

export function CardRowBlock({ eyebrow, heading, body, cards, background }) {
  return (
    <section className="section" style={{ background: background || 'var(--cream)', borderTop: '1px solid var(--border-light)' }}>
      <div className="container">
        <div className="reveal section-narrow" style={{ textAlign: 'center', marginBottom: 'clamp(40px,5vw,56px)' }}>
          {eyebrow ? <p className="eyebrow" style={{ marginBottom: 16 }}>{eyebrow}</p> : null}
          <h2 className="headline-lg"><Lines text={heading} /></h2>
          {body ? <p className="body-md" style={{ marginTop: 16 }}>{body}</p> : null}
        </div>
        <div className="pricing-grid-three" style={{ gap: 16 }}>
          {(cards || []).map((card, index) => (
            <div key={card.title} className="reveal glass-card" style={{ padding: '28px 24px', transitionDelay: `${index * 0.06}s` }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>{card.title}</h3>
              <p className="body-sm">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Pricing preview ────────────────────────────────────────────────────── */

export function PricingPreviewBlock({ eyebrow, heading, note, packages, linkLabel, linkHref }) {
  return (
    <section className="section" style={{ background: 'var(--cream)', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'clamp(32px,4vw,48px)', flexWrap: 'wrap', gap: 16 }}>
          <div className="reveal">
            <p className="eyebrow" style={{ marginBottom: 12 }}>{eyebrow}</p>
            <h2 className="headline-lg"><Lines text={heading} /></h2>
          </div>
          <div className="reveal">
            <p className="body-sm" style={{ maxWidth: 280, textAlign: 'right' }}>{note}</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 16 }}>
          {(packages || []).map((p, i) => (
            <PricingCard key={p.name || i} {...p} delay={i * 0.07} />
          ))}
        </div>

        <div className="reveal" style={{ textAlign: 'center', marginTop: 24 }}>
          <Link to={linkHref} className="btn-ghost">{linkLabel} <span className="arrow">→</span></Link>
        </div>
      </div>
    </section>
  )
}

/* ── Testimonials + stats ───────────────────────────────────────────────── */

export function TestimonialsBlock({ eyebrow, heading, testimonials, stats }) {
  return (
    <section className="section" style={{ background: 'var(--white)', borderTop: '1px solid var(--border-light)' }}>
      <div className="container">
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 'clamp(40px,5vw,56px)' }}>
          <p className="eyebrow" style={{ marginBottom: 14 }}>{eyebrow}</p>
          <h2 className="headline-lg"><Lines text={heading} /></h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 16, marginBottom: 48 }}>
          {(testimonials || []).map((t, i) => (
            <div key={i} className="reveal glass-card" style={{ padding: '28px 24px', transitionDelay: `${i * 0.08}s` }}>
              <div style={{ display: 'flex', gap: 3, marginBottom: 16 }}>
                {[...Array(5)].map((_, s) => (
                  <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill="var(--accent)" stroke="none">
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                  </svg>
                ))}
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--dark2)', marginBottom: 20, fontStyle: 'italic' }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--accent-soft)', border: '1px solid rgba(200,16,46,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: 'var(--accent)', flexShrink: 0 }}>
                  {String(t.name || '').split(' ').map((w) => w[0]).join('')}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--dark)' }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--light)', fontFamily: 'var(--font-mono)' }}>{t.business}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {(stats || []).length > 0 && (
          <div className="reveal glass-card" style={{ padding: '28px 32px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 24, textAlign: 'center' }}>
            {stats.map((stat) => (
              <div key={stat.label}>
                <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--dark)', marginBottom: 4 }}>{stat.value}</div>
                <div style={{ fontSize: 12, color: 'var(--light)', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

/* ── FAQ ────────────────────────────────────────────────────────────────── */

export function FaqBlock({ eyebrow, heading, body, items, footerNote, linkLabel, linkHref }) {
  return (
    <section className="section" style={{ background: 'var(--white)', borderTop: '1px solid var(--border-light)' }}>
      <div className="container section-narrow">
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 'clamp(40px,5vw,56px)' }}>
          <p className="eyebrow" style={{ marginBottom: 14 }}>{eyebrow}</p>
          <h2 className="headline-lg"><Lines text={heading} /></h2>
          {body ? <p className="body-md" style={{ marginTop: 16 }}>{body}</p> : null}
        </div>

        <div style={{ display: 'grid', gap: 20 }}>
          {(items || []).map((faq, i) => (
            <div key={i} className="reveal glass-card" style={{ padding: '28px 24px', transitionDelay: `${i * 0.05}s` }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, lineHeight: 1.3 }}>{faq.q}</h3>
              <p className="body-sm" style={{ lineHeight: 1.7 }}>{faq.a}</p>
            </div>
          ))}
        </div>

        {linkLabel ? (
          <div className="reveal" style={{ textAlign: 'center', marginTop: 32 }}>
            {footerNote ? <p className="body-sm" style={{ marginBottom: 16 }}>{footerNote}</p> : null}
            <Link to={linkHref} className="btn-ghost">{linkLabel} <span className="arrow">→</span></Link>
          </div>
        ) : null}
      </div>
    </section>
  )
}

/* ── Closing CTA (dark) ─────────────────────────────────────────────────── */

export function ClosingCtaBlock({ eyebrow, heading, body, primaryLabel, primaryHref, secondaryLabel, secondaryHref, assurances, maxWidth, headingSize, bodySize, bodyGap }) {
  return (
    <section className="section" style={{ background: 'var(--dark)' }}>
      {/* About reuses this with a smaller scale, so the sizes are props with
          the homepage's own values as the defaults. */}
      <div className="container" style={{ textAlign: 'center', maxWidth: maxWidth || 680 }}>
        <div className="reveal">
          <p className="eyebrow" style={{ color: 'rgba(255,255,255,0.35)', marginBottom: 20 }}>{eyebrow}</p>
          <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: headingSize || 'clamp(36px,5vw,64px)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.05, color: 'white', marginBottom: 20 }}>
            {heading}
          </h2>
          <p style={{ fontSize: bodySize || 17, color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, marginBottom: bodyGap || 40 }}>{body}</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              to={primaryHref} className="btn-primary" style={{ background: 'white', color: 'var(--dark)' }}
              onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.88)' }}
              onMouseOut={(e) => { e.currentTarget.style.background = 'white' }}
            >{primaryLabel}</Link>
            <Link
              to={secondaryHref} className="btn-secondary" style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)' }}
              onMouseOver={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; e.currentTarget.style.color = 'white' }}
              onMouseOut={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}
            >{secondaryLabel}</Link>
          </div>
          {/* Only rendered when there is something in it. The empty wrapper
              still carried its 20px top margin, which showed up as About's
              CTA being 19px taller than the live page. */}
          {(assurances || []).length > 0 && (
          <div style={{ display: 'flex', gap: 20, justifyContent: 'center', marginTop: 20, flexWrap: 'wrap' }}>
            {(assurances || []).map((t) => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1.5 5L3.5 7L8.5 2" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                {t}
              </div>
            ))}
          </div>
          )}
        </div>
      </div>
    </section>
  )
}
