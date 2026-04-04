import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'

const VALUES = [
  ['Fixed price, always', 'We quote before we start and we honour it. No scope creep invoices, no hourly billing surprises.'],
  ['Founder-led', 'You speak directly to the person doing the work. No account managers, no handoffs, no telephone game.'],
  ['Built for ownership', 'When we hand over your site, it is yours. You control it, you own it, no vendor lock-in.'],
  ['Commercial focus', 'A website is not art. It is a business tool. Every decision we make is about helping you win more work.'],
  ['Fast and honest', 'We reply within 24 hours. If something is wrong, we say so. If something will take longer, we tell you first.'],
  ['Built in Wales', 'We are a Cardiff business serving Cardiff businesses — and clients across the UK who want that same directness.'],
]

const TIMELINE = [
  ['Feb 2026', 'Founded', 'DH Website Services launched in Cardiff with a simple idea — production-quality websites at honest prices.'],
  ['Mar 2026', 'Portal launch', 'Built and launched an internal HR and operations platform for our own team — staff scheduling, leave management, client outreach and more.'],
  ['Mar 2026', 'UK-wide', 'Expanded to serve clients across the UK while keeping our Cardiff roots and founder-led approach.'],
  ['Apr 2026', 'DH Workplace', 'Launched DH Workplace — a SaaS HR and CRM platform for UK small businesses, built from our own internal tooling.'],
]

export default function About() {
  useReveal()

  return (
    <main style={{ paddingTop: 'var(--nav-h)' }}>

      {/* Hero */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(48px,7vw,100px)', alignItems: 'center' }}>
            <div className="reveal">
              <p className="eyebrow" style={{ marginBottom: 16 }}>About us</p>
              <h1 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(36px,5vw,60px)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.0, marginBottom: 24 }}>
                Small team.<br />Serious work.
              </h1>
              <p className="body-lg" style={{ marginBottom: 20 }}>
                DH Website Services is a Cardiff-based web agency built around one principle — your website should work as hard as you do.
              </p>
              <p className="body-md" style={{ color: 'var(--mid)', marginBottom: 32 }}>
                We build production-ready websites, booking systems, and business platforms for SMEs across Wales and the UK. Fixed prices, direct communication, and no disappearing acts after launch.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link to="/contact" className="btn-primary">Start a project →</Link>
                <Link to="/portfolio" className="btn-secondary">See our work</Link>
              </div>
            </div>

            {/* Founder card */}
            <div className="reveal" style={{ transitionDelay: '0.1s' }}>
              <div className="glass-card" style={{ padding: 'clamp(28px,4vw,40px)' }}>
                {/* Avatar */}
                <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent) 0%, #30A46C 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 20, letterSpacing: '-0.02em' }}>
                  DH
                </div>
                <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.01em', marginBottom: 4 }}>David Hooper</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--light)', marginBottom: 20 }}>
                  Founder & Director — Cardiff, Wales
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: 'var(--mid)', marginBottom: 20 }}>
                  I started DH Website Services because I kept seeing small businesses in Wales paying agency prices for template work, then getting handed off to junior staff who did not understand their business.
                </p>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: 'var(--mid)', marginBottom: 24 }}>
                  When you work with us, you work with me. I scope the project, I build it, and I support it after launch. No layers, no surprises.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 20, borderTop: '1px solid var(--border-light)' }}>
                  <a href="mailto:clients@dhwebsiteservices.co.uk" style={{ fontSize: 13, color: 'var(--mid)', display: 'flex', alignItems: 'center', gap: 8, transition: 'color 0.15s' }}
                    onMouseOver={e => e.currentTarget.style.color = 'var(--dark)'}
                    onMouseOut={e => e.currentTarget.style.color = 'var(--mid)'}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/></svg>
                    clients@dhwebsiteservices.co.uk
                  </a>
                  <a href="tel:02920024218" style={{ fontSize: 13, color: 'var(--mid)', display: 'flex', alignItems: 'center', gap: 8, transition: 'color 0.15s' }}
                    onMouseOver={e => e.currentTarget.style.color = 'var(--dark)'}
                    onMouseOut={e => e.currentTarget.style.color = 'var(--mid)'}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.61 19.79 19.79 0 01.01 1A2 2 0 012 .18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/></svg>
                    029 2002 4218
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section" style={{ background: 'var(--cream)', borderTop: '1px solid var(--border-light)' }}>
        <div className="container">
          <div className="reveal section-narrow" style={{ textAlign: 'center', marginBottom: 'clamp(40px,5vw,56px)' }}>
            <p className="eyebrow" style={{ marginBottom: 14 }}>How we work</p>
            <h2 className="headline-lg">What you can expect.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {VALUES.map(([title, desc], i) => (
              <div key={title} className="reveal glass-card" style={{ padding: '28px 24px', transitionDelay: `${i * 0.06}s` }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--accent-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7L5.5 10.5L12 3" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 8, letterSpacing: '-0.01em' }}>{title}</div>
                <p className="body-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section">
        <div className="container" style={{ maxWidth: 760 }}>
          <div className="reveal" style={{ marginBottom: 'clamp(40px,5vw,56px)' }}>
            <p className="eyebrow" style={{ marginBottom: 14 }}>Our story</p>
            <h2 className="headline-lg">How we got here.</h2>
          </div>
          <div style={{ position: 'relative' }}>
            {/* Vertical line */}
            <div style={{ position: 'absolute', left: 15, top: 8, bottom: 8, width: 1, background: 'var(--border-light)' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {TIMELINE.map(([year, title, desc], i) => (
                <div key={i} className="reveal" style={{ display: 'flex', gap: 32, paddingBottom: 36, transitionDelay: `${i * 0.08}s` }}>
                  {/* Dot */}
                  <div style={{ flexShrink: 0, width: 30, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 4 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--accent)', border: '2px solid var(--white)', boxShadow: '0 0 0 3px var(--accent-soft)', flexShrink: 0 }} />
                  </div>
                  {/* Content */}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 4 }}>{year}</div>
                    <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: '-0.01em', marginBottom: 8 }}>{title}</div>
                    <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--mid)' }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ background: 'var(--dark)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: 600 }}>
          <div className="reveal">
            <p className="eyebrow" style={{ color: 'rgba(255,255,255,0.35)', marginBottom: 20 }}>Ready to work together?</p>
            <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(32px,4vw,52px)', fontWeight: 600, letterSpacing: '-0.03em', color: 'white', marginBottom: 16, lineHeight: 1.1 }}>
              Let us build something that works.
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', marginBottom: 36, lineHeight: 1.65 }}>
              Free 15 minute call. Clear plan. Fixed price. No obligation.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn-primary" style={{ background: 'white', color: 'var(--dark)' }}>Book a free call →</Link>
              <Link to="/pricing" className="btn-secondary" style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)' }}>See pricing</Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
