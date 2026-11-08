/**
 * DH Local: the monthly done-for-you plan for local businesses (/local).
 *
 * The lead offer in the 2026-27 growth plan: no build fee, £79 a month + VAT,
 * 12-month minimum. Signing up goes to /order?plan=dh-local, which starts a
 * Stripe subscription (functions/api/deposit.js). Terms: /services-terms
 * section 9.
 *
 * Only list what we can deliver today. The client phone line and review
 * texts are in the plan but not built for clients yet, so they are not here.
 */

import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import { XmasPageHero } from '../components/Christmas'
import { depositPlan, pounds } from '../lib/plans'

const SIGN_UP = '/order?plan=dh-local'

const INCLUDED = [
  'A website of up to 5 pages, designed for your business and built for phones first',
  'Your own domain, hosting, SSL, backups and security updates',
  'Small text and photo changes whenever you need them: menus, prices, opening hours',
  'Your Google Business Profile kept up to date: hours, photos, services and posts',
  'A QR code and link that take customers straight to leaving you a Google review',
  'A short monthly report: visits to your site and the enquiries it brought in',
  'Real people in Pontypridd you can ring: 01443 805303',
]

const WHO = ['Pubs and bars', 'Cafés and restaurants', 'Takeaways', 'Salons and barbers', 'Trades', 'Shops and studios']

const FAQ = [
  ['Why is there no build fee?', 'Because we look after the site every month, we spread the cost of building it across the plan. You get a proper website without finding hundreds of pounds upfront.'],
  ['What happens after 12 months?', 'The plan carries on month to month and you can stop with 30 days\' notice. Your domain, words, logo and photos are always yours.'],
  ['How quickly will my site be live?', 'We aim to have it live within 14 days of getting your words and photos. We tell you exactly what we need on the first call.'],
  ['Can it be in Welsh and English?', 'Yes. A fully bilingual site is a one-off £150 + VAT on top.'],
  ['I need bookings or online ordering.', 'Ask about DH Local Plus, from £149 a month + VAT, which adds table bookings or online ordering and two social posts a week.'],
]

const card = { padding: 'clamp(24px,3vw,32px)', border: '1px solid var(--border-light)', borderRadius: 18, background: 'var(--white, #fff)' }
const h2 = { fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,4vw,44px)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 20 }

export default function Local() {
  useReveal()
  const plan = depositPlan('dh-local')

  return (
    <main>
      <section className="section page-hero">
        <XmasPageHero />
        <div className="container" style={{ maxWidth: 860 }}>
          <div className="reveal">
            <p className="eyebrow" style={{ marginBottom: 16 }}>DH Local · for local businesses</p>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px,6vw,76px)', fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.0, marginBottom: 20 }}>
              Your website and Google listing, looked after for £{plan.monthly} a month.
            </h1>
            <p className="body-lg" style={{ maxWidth: 620, marginBottom: 28 }}>
              No build fee. We build your site, keep it up to date and look after your Google listing and reviews, so you can get on with running the business. £{plan.monthly} a month + VAT, 12-month minimum.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to={SIGN_UP} className="btn-primary">Start for £0 upfront</Link>
              <a href="tel:+441443805303" className="btn-secondary">Call 01443 805303</a>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="container bf-grid" style={{ maxWidth: 1040 }}>
          <div className="reveal" style={card}>
            <p className="eyebrow" style={{ marginBottom: 14 }}>What you get</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 12 }}>
              {INCLUDED.map((item) => (
                <li key={item} className="body-md" style={{ display: 'flex', gap: 12, alignItems: 'baseline' }}>
                  <span aria-hidden="true" style={{ color: 'var(--accent)', fontWeight: 700 }}>✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal" style={card}>
            <p className="eyebrow" style={{ marginBottom: 14 }}>What it costs</p>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 16 }}>
              <tbody>
                {[
                  ['Upfront', '£0', 'No build fee'],
                  ['Every month', `£${plan.monthly} + VAT`, `${pounds(plan.totalPence)} including VAT`],
                  ['Minimum term', '12 months', 'Then month to month, 30 days\' notice'],
                  ['Welsh and English', '+£150 + VAT', 'One-off, optional'],
                ].map(([label, price, note], i) => (
                  <tr key={label} style={{ borderTop: i ? '1px solid var(--border-light)' : 'none' }}>
                    <td style={{ padding: '14px 0', color: 'var(--mid)' }}>{label}<div style={{ fontSize: 13, color: 'var(--light)' }}>{note}</div></td>
                    <td style={{ padding: '14px 0', textAlign: 'right', fontWeight: 700, color: 'var(--dark)', whiteSpace: 'nowrap' }}>{price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Link to={SIGN_UP} className="btn-primary" style={{ marginTop: 20, width: '100%', justifyContent: 'center' }}>Start for £0 upfront</Link>
            <p className="body-sm" style={{ marginTop: 12, textAlign: 'center' }}>For businesses. <Link to="/services-terms" style={{ color: 'var(--accent)' }}>Terms</Link> section 9.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container reveal" style={{ maxWidth: 1040 }}>
          <h2 style={h2}>Made for businesses like yours</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 28 }}>
            {WHO.map((w) => <span key={w} style={{ padding: '8px 16px', borderRadius: 100, border: '1px solid var(--border-light)', fontSize: 15 }}>{w}</span>)}
          </div>
          <p className="body-md" style={{ maxWidth: 680 }}>
            Based in Pontypridd, working with businesses across the valleys and Cardiff. Paying once for a website usually means £449 or more upfront, then hosting on top, then nobody to update it. DH Local is one monthly price that covers the lot.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <h2 className="reveal" style={h2}>Questions</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {FAQ.map(([q, a]) => (
              <div key={q} className="reveal" style={card}>
                <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 6px', color: 'var(--dark)' }}>{q}</h3>
                <p className="body-md" style={{ margin: 0 }}>{a}</p>
              </div>
            ))}
          </div>
          <div className="reveal" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 28 }}>
            <Link to={SIGN_UP} className="btn-primary">Start for £0 upfront</Link>
            <Link to="/contact" className="btn-secondary">Book a free call first</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
