import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'

function DomainIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 12H21" stroke="var(--dark)" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M12 3C9.5 5.4 8 8.58 8 12C8 15.42 9.5 18.6 12 21" stroke="var(--dark)" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M12 3C14.5 5.4 16 8.58 16 12C16 15.42 14.5 18.6 12 21" stroke="var(--dark)" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="12" r="9" stroke="var(--dark)" strokeWidth="1.6" />
    </svg>
  )
}

function DeviceIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="5" width="16" height="12" rx="2.5" stroke="var(--dark)" strokeWidth="1.6" />
      <path d="M9 20H15" stroke="var(--dark)" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M12 17V20" stroke="var(--dark)" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function SparkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3L13.8 8.2L19 10L13.8 11.8L12 17L10.2 11.8L5 10L10.2 8.2L12 3Z" stroke="var(--dark)" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  )
}

const SNAPSHOT = [
  ['Client', 'Glow With Lucy'],
  ['Sector', 'Candle business / lifestyle retail'],
  ['Domain', 'GlowWithLucy.co.uk'],
  ['Scope', 'Brand-led marketing website and product showcase'],
]

const DELIVERABLES = [
  {
    icon: <SparkIcon />,
    title: 'Softer premium presentation',
    description: 'The layout leans into calm spacing, warm neutrals, and a more considered brand feel so the site reads as polished rather than homemade in the wrong way.',
  },
  {
    icon: <DeviceIcon />,
    title: 'Clean mobile browsing',
    description: 'The experience is designed to stay tidy and readable on smaller screens, where social traffic and gift-led browsing often start.',
  },
  {
    icon: <DomainIcon />,
    title: 'Direct-brand credibility',
    description: 'A branded `.co.uk` site gives the business a stronger home for direct traffic than relying only on marketplaces or social platforms.',
  },
]

const IMPACT = [
  'Sharper positioning for a handmade candle brand',
  'A proper web presence for Instagram traffic, referrals, and direct enquiries',
  'A stronger base for later catalogue, gifting, and e-commerce growth',
]

export default function Portfolio() {
  useReveal()

  return (
    <main style={{ paddingTop: 'var(--nav-h)' }}>
      <section className="section" style={{ paddingBottom: 'clamp(40px,6vw,72px)' }}>
        <div className="container portfolio-hero-grid" style={{ alignItems: 'center', gap: 'clamp(28px,5vw,64px)' }}>
          <div className="reveal">
            <p className="eyebrow" style={{ marginBottom: 18 }}>Featured project</p>
            <h1 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(40px,6vw,74px)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.02, marginBottom: 18 }}>
              Glow With Lucy
            </h1>
            <p className="body-lg" style={{ maxWidth: 560, marginBottom: 28 }}>
              A cleaner, softer web presence for a candle business that needed to feel more polished, giftable, and commercially credible.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 22 }}>
              <a href="https://glowwithlucy.co.uk" target="_blank" rel="noreferrer" className="btn-primary">
                Visit site
              </a>
              <Link to="/contact" className="btn-secondary">Book a project call</Link>
            </div>
            <p style={{ fontSize: 14, color: 'var(--mid)', lineHeight: 1.65, maxWidth: 520 }}>
              The goal was to give the brand a better-quality home online without overcomplicating it, so the business feels more established from the first click.
            </p>
          </div>

          <div className="reveal-scale">
            <div style={{
              borderRadius: 20,
              border: '1px solid rgba(0,0,0,0.08)',
              background: 'linear-gradient(180deg, #d6ccbd 0%, #c7bcad 100%)',
              padding: 'clamp(24px,4vw,42px)',
              boxShadow: '0 10px 40px rgba(29,29,31,0.08)',
            }}>
              <div style={{
                borderRadius: 16,
                background: 'rgba(255,255,255,0.2)',
                border: '1px solid rgba(255,255,255,0.28)',
                minHeight: 520,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 22,
              }}>
                <img
                  src="/glow-with-lucy-logo.png"
                  alt="Glow With Lucy logo"
                  style={{ width: '100%', maxWidth: 420, objectFit: 'contain' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--cream)', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container">
          <div className="reveal" style={{ maxWidth: 720, marginBottom: 34 }}>
            <h2 className="headline-md" style={{ marginBottom: 12 }}>Project snapshot</h2>
            <p className="body-md">
              Glow With Lucy needed a site that felt more like a considered brand than a starter storefront. The aim was to support trust, gifting appeal, and future growth without losing the softness of the product.
            </p>
          </div>

          <div className="portfolio-detail-grid" style={{ gap: 16 }}>
            <div className="reveal glass-card" style={{ padding: '28px 24px' }}>
              <div style={{ display: 'grid', gap: 14 }}>
                {SNAPSHOT.map(([label, value]) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, paddingBottom: 14, borderBottom: '1px solid var(--border-light)' }}>
                    <span style={{ fontSize: 12, color: 'var(--light)', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{label}</span>
                    <span style={{ fontSize: 14, color: 'var(--dark)', fontWeight: 500, textAlign: 'right' }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal" style={{ padding: '10px 0' }}>
              <p className="eyebrow" style={{ marginBottom: 14 }}>Why it works</p>
              <div style={{ display: 'grid', gap: 12 }}>
                {IMPACT.map((item) => (
                  <div key={item} className="check-row" style={{ padding: 0 }}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="reveal" style={{ maxWidth: 680, marginBottom: 34 }}>
            <p className="eyebrow" style={{ marginBottom: 14 }}>What changed</p>
            <h2 className="headline-md" style={{ marginBottom: 12 }}>A neater brand experience with room to grow.</h2>
            <p className="body-md">
              The build direction focuses on visual calm, product credibility, and a structure that can later expand into richer catalogue and campaign work without having to start over.
            </p>
          </div>

          <div className="feature-grid-two" style={{ gap: 16 }}>
            {DELIVERABLES.map((item, index) => (
              <div key={item.title} className="reveal glass-card" style={{ padding: '28px 24px', transitionDelay: `${index * 0.06}s` }}>
                <div style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  background: '#f1eadf',
                  border: '1px solid rgba(29,29,31,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 18,
                }}>
                  {item.icon}
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 10 }}>{item.title}</h3>
                <p className="body-sm" style={{ fontSize: 14 }}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: '#ece4d8' }}>
        <div className="container portfolio-detail-grid" style={{ gap: 'clamp(28px,5vw,64px)', alignItems: 'center' }}>
          <div className="reveal">
            <p className="eyebrow" style={{ color: 'rgba(29,29,31,0.72)', marginBottom: 14 }}>Featured domain</p>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(34px,4.8vw,52px)', fontWeight: 400, lineHeight: 1.06, letterSpacing: '-0.02em', marginBottom: 14 }}>
              GlowWithLucy.co.uk
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(29,29,31,0.74)', lineHeight: 1.7, maxWidth: 520 }}>
              The live site gives the business a cleaner home for its brand story and product direction, with a stronger base for direct traffic than relying on social alone.
            </p>
          </div>

          <div className="reveal">
            <div style={{
              background: 'rgba(255,255,255,0.62)',
              border: '1px solid rgba(29,29,31,0.08)',
              borderRadius: 18,
              padding: '28px 24px',
            }}>
              <div style={{ display: 'grid', gap: 12 }}>
                <a
                  href="https://glowwithlucy.co.uk"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 12,
                    padding: '14px 16px',
                    background: 'rgba(255,255,255,0.7)',
                    border: '1px solid rgba(29,29,31,0.08)',
                    borderRadius: 12,
                    fontSize: 15,
                    fontWeight: 500,
                  }}
                >
                  <span>Open live website</span>
                  <span style={{ color: 'var(--mid)' }}>glowwithlucy.co.uk</span>
                </a>
                <Link to="/contact" className="btn-primary" style={{ justifyContent: 'center' }}>
                  Want something like this?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
