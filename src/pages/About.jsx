import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'

const VALUES = [
  ['Fixed price', 'I quote before starting. That is what you pay. No extras.'],
  ['Just me', 'You email me. I reply. No team to go through.'],
  ['You own it', 'When it is done, you get all the files. Host it anywhere.'],
  ['Built to work', 'Not trying to win design awards. Built to get you customers.'],
  ['Quick replies', 'Usually same day. If it will take longer, I will tell you.'],
  ['Cardiff-based', 'Working from Wales. Happy to work with clients anywhere in UK.'],
]

export default function About() {
  useReveal()

  return (
    <main style={{ paddingTop: 'var(--nav-h)' }}>

      {/* Hero */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container">
          <div className="about-hero-grid" style={{ gap: 'clamp(48px,7vw,100px)', alignItems: 'center' }}>
            <div className="reveal">
              <p className="eyebrow" style={{ marginBottom: 16 }}>About us</p>
              <h1 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(36px,5vw,60px)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.0, marginBottom: 24 }}>
                Small team.<br />Serious work.
              </h1>
              <p className="body-lg" style={{ marginBottom: 20 }}>
                DH Website Services is a Cardiff-based web agency built around one principle — your website should work as hard as you do.
              </p>
              <p className="body-md" style={{ color: 'var(--mid)', marginBottom: 32 }}>
                We build production-ready websites, booking systems, and lead-generation experiences for SMEs across Wales and the UK. Fixed prices, direct communication, and no disappearing acts after launch.
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
                  When you work with us, you work with me. I scope the project, I build it, and I support it after launch. No layers, no surprises, and no blurred line between sales and delivery.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 20, borderTop: '1px solid var(--border-light)' }}>
                  <a href="mailto:clients@dhwebsiteservices.co.uk" style={{ fontSize: 13, color: 'var(--mid)', display: 'flex', alignItems: 'center', gap: 8, transition: 'color 0.15s' }}
                    onMouseOver={e => e.currentTarget.style.color = 'var(--dark)'}
                    onMouseOut={e => e.currentTarget.style.color = 'var(--mid)'}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/></svg>
                    clients@dhwebsiteservices.co.uk
                  </a>
                  <a href="tel:07364166285" style={{ fontSize: 13, color: 'var(--mid)', display: 'flex', alignItems: 'center', gap: 8, transition: 'color 0.15s' }}
                    onMouseOver={e => e.currentTarget.style.color = 'var(--dark)'}
                    onMouseOut={e => e.currentTarget.style.color = 'var(--mid)'}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.61 19.79 19.79 0 01.01 1A2 2 0 012 .18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/></svg>
                    07364 166285
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
