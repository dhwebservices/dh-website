/**
 * Build partner for agencies and IT firms (/agencies).
 *
 * Bet 1 of the Nov 2026 revenue plan: sell build time to firms that already
 * sell apps and systems but don't have the developers. White label, their
 * brand, never their clients. Only list work that is live and checkable.
 */

import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'

const BUILD = [
  ['iPhone and Android apps', 'Native apps shipped to the App Store and Google Play, with sign-in, push notifications, payments and the backend behind them. We handle both store submissions.'],
  ['Web apps and portals', 'Client portals, booking systems, staff tools and admin areas, built on Cloudflare and Supabase so they are fast and cheap to run.'],
  ['Integrations', 'Stripe, Microsoft 365, calendars and iCal sync, Twilio phone and SMS, email, webhooks, and the glue between your client\'s systems.'],
  ['Websites your team designed', 'Hand us the Figma or the brief and we build it, fast, accessible and ready to hand back to your team.'],
]

const TERMS = [
  'Your brand on everything. We never contact or pitch to your client.',
  'NDA signed before you share anything.',
  'Fixed price per project, or £400 a day + VAT for ongoing work.',
  'You get the code, the accounts and a handover note. Nothing locked to us.',
  'UK based, in Pontypridd. Same working hours and time zone as you.',
  'A named developer you can message directly, not a ticket queue.',
]

const PROOF = [
  ['Fam & a Half', 'Family location app with a Watch app and live chat, on the App Store.', 'https://apps.apple.com/gb/app/id6819339433'],
  ['The Fish Tank', 'Real-time multiplayer game on iPhone and Android, with its own game server.', 'https://apps.apple.com/gb/app/id6801622379'],
  ['Bill Pal', 'Bill-splitting app with Sign in with Apple and subscriptions, on the App Store.', 'https://apps.apple.com/gb/app/id6826888786'],
  ['Our own systems', 'We run on our own phone system, staff portal and Apple device management, all built in-house.', null],
]

const card = { padding: 'clamp(22px,3vw,30px)', border: '1px solid var(--border-light)', borderRadius: 18, background: 'var(--white, #fff)' }
const h2 = { fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,4vw,44px)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 20 }

export default function Agencies() {
  useReveal()
  return (
    <main>
      <section className="section page-hero">
        <div className="container" style={{ maxWidth: 860 }}>
          <div className="reveal">
            <p className="eyebrow" style={{ marginBottom: 16 }}>For agencies and IT firms</p>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px,6vw,72px)', fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.02, marginBottom: 20 }}>
              Your build team, under your name.
            </h1>
            <p className="body-lg" style={{ maxWidth: 640, marginBottom: 28 }}>
              You win the app, the portal or the integration. We build it, quietly, to your brief and your deadline. UK based, white label, fixed price or £400 a day + VAT.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn-primary">Talk about a project</Link>
              <a href="tel:+441443805303" className="btn-secondary">Call 01443 805303</a>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="container" style={{ maxWidth: 1040 }}>
          <h2 className="reveal" style={h2}>What we build for you</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 16 }}>
            {BUILD.map(([t, b]) => (
              <div key={t} className="reveal" style={card}>
                <h3 style={{ fontSize: 19, fontWeight: 700, margin: '0 0 8px', color: 'var(--dark)' }}>{t}</h3>
                <p className="body-md" style={{ margin: 0 }}>{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container bf-grid" style={{ maxWidth: 1040 }}>
          <div className="reveal" style={card}>
            <p className="eyebrow" style={{ marginBottom: 14 }}>How it works</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 12 }}>
              {TERMS.map((item) => (
                <li key={item} className="body-md" style={{ display: 'flex', gap: 12, alignItems: 'baseline' }}>
                  <span aria-hidden="true" style={{ color: 'var(--accent)', fontWeight: 700 }}>✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal" style={card}>
            <p className="eyebrow" style={{ marginBottom: 14 }}>Work you can check today</p>
            <div style={{ display: 'grid', gap: 16 }}>
              {PROOF.map(([t, b, href]) => (
                <div key={t}>
                  <div style={{ fontWeight: 700, color: 'var(--dark)' }}>
                    {href ? <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>{t}</a> : t}
                  </div>
                  <p className="body-sm" style={{ margin: '2px 0 0' }}>{b}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container reveal" style={{ maxWidth: 820 }}>
          <h2 style={h2}>Got more work than developers?</h2>
          <p className="body-md" style={{ maxWidth: 640, marginBottom: 24 }}>
            Send us the brief, even a rough one. We reply within one working day with a fixed price or a day estimate, and we sign your NDA first if you need it.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn-primary">Send a brief</Link>
            <a href="mailto:david@dhwebsiteservices.co.uk" className="btn-secondary">david@dhwebsiteservices.co.uk</a>
          </div>
        </div>
      </section>
    </main>
  )
}
