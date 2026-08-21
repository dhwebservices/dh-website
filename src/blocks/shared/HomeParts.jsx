/**
 * Pieces lifted out of Home.jsx so blocks can reuse them unchanged.
 *
 * These were local components inside the page. Copied here byte-for-byte
 * rather than reimplemented - the typewriter timings, the orb animations and
 * the pricing card's hover behaviour are all part of how the homepage looks,
 * and "close enough" versions of them would be visible.
 */

import { Link } from 'react-router-dom'

export const DEFAULT_TYPEWRITER_LINES = [
  'ready before your next meeting.',
  'faster than any template.',
  'built to rank on Google.',
  'designed to win customers.',
  'yours. Not a rental.',
]

/**
 * The second half of the homepage H1.
 *
 * This used to type and delete `lines` on an infinite loop, so the headline
 * was never complete: it began empty on every load (a screenshot at 390px
 * caught it reading "Your website, rea|"), it kept moving while people tried
 * to read it, and the H1 in the initial markup carried only its first half.
 *
 * It now renders the first line as static text, present and complete in the
 * first paint. The remaining lines stay in the CMS and in the block schema,
 * unused here, so nothing is lost if they are wanted elsewhere.
 */
export function Typewriter({ lines }) {
  const list = Array.isArray(lines) && lines.length ? lines : DEFAULT_TYPEWRITER_LINES

  return <span style={{ color: 'var(--accent)' }}>{list[0]}</span>
}

export function HeroBg() {
  return (
    <div aria-hidden style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0, pointerEvents: 'none' }}>
      <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '60%', height: '70%', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(0,113,227,0.05) 0%, transparent 70%)', animation: 'float 18s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: '50%', height: '50%', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(0,113,227,0.03) 0%, transparent 70%)', animation: 'float 24s ease-in-out infinite reverse' }} />
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.08) 1px, transparent 1px)', backgroundSize: '32px 32px', opacity: 0.5 }} />
    </div>
  )
}

export function PricingCard({ name, price, tagline, who, features, popular, delay }) {
  return (
    <div
      className={`reveal pricing-card ${popular ? 'glass-card-dark' : 'glass-card'}`}
      style={{ padding: '28px 24px', borderRadius: 20, position: 'relative', transitionDelay: `${delay}s`, display: 'flex', flexDirection: 'column' }}
    >
      {popular && (
        <div style={{ position: 'absolute', top: 16, right: 16, padding: '3px 10px', borderRadius: 100, background: 'var(--accent)', fontSize: 11, fontWeight: 600, color: 'white', letterSpacing: '0.04em' }}>
          Popular
        </div>
      )}

      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: popular ? 'rgba(255,255,255,0.45)' : 'var(--light)', marginBottom: 8 }}>
        {name}
      </p>

      <div style={{ fontSize: 44, fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1, color: popular ? 'white' : 'var(--dark)', marginBottom: 6 }}>
        {price}
      </div>
      <p style={{ fontSize: 12, color: popular ? 'rgba(255,255,255,0.4)' : 'var(--light)', marginBottom: 16, fontFamily: 'var(--font-mono)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
        One-off · Fixed price
      </p>

      <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.3, color: popular ? 'white' : 'var(--dark)', marginBottom: 8 }}>
        {tagline}
      </div>

      <p style={{ fontSize: 13, color: popular ? 'rgba(255,255,255,0.5)' : 'var(--mid)', lineHeight: 1.6, marginBottom: 16, flex: 1 }}>
        {who}
      </p>

      <div style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: popular ? 'rgba(255,255,255,0.3)' : 'var(--light)', lineHeight: 1.8, marginBottom: 20 }}>
        {String(features || '').split(' · ').filter(Boolean).map((f) => (
          <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: popular ? 'rgba(255,255,255,0.3)' : 'var(--accent)', flexShrink: 0, display: 'inline-block' }} />
            {f}
          </div>
        ))}
      </div>

      <Link
        to="/pricing"
        style={{ display: 'block', textAlign: 'center', padding: '11px 20px', borderRadius: 100, fontSize: 13.5, fontWeight: 600, background: popular ? 'white' : 'var(--accent)', color: popular ? 'var(--dark)' : 'white', transition: 'opacity 0.15s', textDecoration: 'none' }}
        onMouseOver={(e) => { e.currentTarget.style.opacity = '0.85' }}
        onMouseOut={(e) => { e.currentTarget.style.opacity = '1' }}
      >
        See what&apos;s included →
      </Link>
    </div>
  )
}
