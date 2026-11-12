/**
 * One-offer landing page used by /holiday-lets and /takeaways (Nov 2026).
 *
 * These pages sell a saving (platform commission), not "a website", because
 * cold website pitches don't land (see the growth plan). The price and the
 * deposit come from lib/plans.js, so Black Friday pricing switches off on its
 * own and the page can never show a price the checkout won't charge.
 */

import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import { depositPlan, pounds } from '../lib/plans'

const card = { padding: 'clamp(22px,3vw,30px)', border: '1px solid var(--border-light)', borderRadius: 18, background: 'var(--white, #fff)' }
const h2 = { fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,4vw,44px)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 20 }

export default function OfferPage({ eyebrow, title, intro, planId, planLabel, included, sums, faqs }) {
  useReveal()
  const plan = depositPlan(planId)
  return (
    <main>
      <section className="section page-hero">
        <div className="container" style={{ maxWidth: 860 }}>
          <div className="reveal">
            <p className="eyebrow" style={{ marginBottom: 16 }}>{eyebrow}</p>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px,6vw,72px)', fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.02, marginBottom: 20 }}>
              {title}
            </h1>
            <p className="body-lg" style={{ maxWidth: 640, marginBottom: 28 }}>{intro}</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {plan && <Link to={`/order?plan=${planId}`} className="btn-primary">Pay the deposit and start</Link>}
              <a href="https://staff.dhwebsiteservices.co.uk/book/david-hooper" className="btn-secondary">Book a free 15-minute call</a>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="container bf-grid" style={{ maxWidth: 1040 }}>
          <div className="reveal" style={card}>
            <p className="eyebrow" style={{ marginBottom: 14 }}>What you get</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 12 }}>
              {included.map((item) => (
                <li key={item} className="body-md" style={{ display: 'flex', gap: 12, alignItems: 'baseline' }}>
                  <span aria-hidden="true" style={{ color: 'var(--accent)', fontWeight: 700 }}>✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          {plan && (
            <div className="reveal" style={card}>
              <p className="eyebrow" style={{ marginBottom: 14 }}>{planLabel}</p>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px,5vw,56px)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--dark)', lineHeight: 1 }}>
                £{plan.price.toLocaleString('en-GB')} <span style={{ fontSize: 18, fontWeight: 500 }}>+ VAT</span>
              </div>
              {plan.was && <p className="body-sm" style={{ margin: '8px 0 0' }}>Normally £{plan.was.toLocaleString('en-GB')}. Black Friday price ends 30 November.</p>}
              <p className="body-md" style={{ margin: '18px 0 6px' }}>Pay half to start ({pounds(plan.totalPence)} today including VAT) and the rest when you're happy and it goes live.</p>
              <p className="body-sm" style={{ margin: '0 0 20px' }}>{plan.care}</p>
              <Link to={`/order?plan=${planId}`} className="btn-primary">Pay {pounds(plan.totalPence)} deposit</Link>
            </div>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container reveal" style={{ maxWidth: 820 }}>
          <h2 style={h2}>{sums.title}</h2>
          <p className="body-md" style={{ maxWidth: 680 }}>{sums.body}</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <h2 className="reveal" style={h2}>Questions</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            {faqs.map(([q, a]) => (
              <div key={q} className="reveal" style={card}>
                <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 8px', color: 'var(--dark)' }}>{q}</h3>
                <p className="body-md" style={{ margin: 0 }}>{a}</p>
              </div>
            ))}
          </div>
          <div className="reveal" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 28 }}>
            {plan && <Link to={`/order?plan=${planId}`} className="btn-primary">Pay the deposit and start</Link>}
            <a href="tel:+441443805303" className="btn-secondary">Call 01443 805303</a>
          </div>
        </div>
      </section>
    </main>
  )
}
