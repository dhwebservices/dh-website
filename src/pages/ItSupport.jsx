/**
 * Managed IT for small offices (/it-support).
 *
 * Bet 2 of the Nov 2026 revenue plan: one monthly price per person for
 * Microsoft 365, devices and a helpdesk, for offices of 5 to 25 staff. We run
 * the same set-up for ourselves (Entra, Intune, our own Apple device
 * management). Phone lines are NOT offered here yet: selling them to small
 * businesses brings Ofcom duties we haven't set up.
 */

import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'

const INCLUDED = [
  'A helpdesk you can phone or email, Monday to Friday, 9am to 5pm',
  'Microsoft 365 looked after: email, Teams, OneDrive, licences, new starters and leavers',
  'Every laptop, iPhone and iPad managed and kept up to date, Windows and Apple',
  'Security set up properly: two-step sign-in, encryption, lost devices locked and wiped',
  'Remote fixes, and a visit when something needs hands on, across the valleys and Cardiff',
  'A short report every quarter: what we fixed, what needs replacing, what it will cost',
]

const WHO = ['Accountants', 'Solicitors', 'Estate and letting agents', 'Dental and vet practices', 'Care agencies', 'Small offices of 5 to 25']

const FAQ = [
  ['What does it cost?', '£45 per person a month + VAT, plus a one-off £250 + VAT to take over and tidy up your set-up. Microsoft licences are billed at cost or through us, whichever works out cheaper for you.'],
  ['Is there a contract?', 'Three months to start, so we can get your set-up right, then month to month with 30 days\' notice.'],
  ['We already have someone.', 'Fine. We can take over from them, or just handle Microsoft 365 and devices while they keep the rest. We will tell you honestly on the first call if switching isn\'t worth it.'],
  ['Do you do Apple as well as Windows?', 'Yes. We manage Macs, iPhones and iPads with the same care as Windows laptops. We run our own Apple device management.'],
]

const card = { padding: 'clamp(24px,3vw,32px)', border: '1px solid var(--border-light)', borderRadius: 18, background: 'var(--white, #fff)' }
const h2 = { fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,4vw,44px)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 20 }

export default function ItSupport() {
  useReveal()
  return (
    <main>
      <section className="section page-hero">
        <div className="container" style={{ maxWidth: 860 }}>
          <div className="reveal">
            <p className="eyebrow" style={{ marginBottom: 16 }}>IT support for small offices</p>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px,6vw,72px)', fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.02, marginBottom: 20 }}>
              Your IT department, for £45 a person.
            </h1>
            <p className="body-lg" style={{ maxWidth: 640, marginBottom: 28 }}>
              Microsoft 365, laptops, phones and a helpdesk that picks up, looked after by a local team in Pontypridd. One monthly price per person, no surprise invoices.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn-primary">Book a free call</Link>
              <a href="tel:+441443805303" className="btn-secondary">Call 01443 805303</a>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="container bf-grid" style={{ maxWidth: 1040 }}>
          <div className="reveal" style={card}>
            <p className="eyebrow" style={{ marginBottom: 14 }}>What's included</p>
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
                  ['Per person', '£45 + VAT', 'Every month, everything above'],
                  ['Setting up', '£250 + VAT', 'One-off, per office'],
                  ['Minimum term', '3 months', 'Then 30 days\' notice'],
                  ['Example: 10 staff', '£450 + VAT', 'A month'],
                ].map(([label, price, note], i) => (
                  <tr key={label} style={{ borderTop: i ? '1px solid var(--border-light)' : 'none' }}>
                    <td style={{ padding: '14px 0', color: 'var(--mid)' }}>{label}<div style={{ fontSize: 13, color: 'var(--light)' }}>{note}</div></td>
                    <td style={{ padding: '14px 0', textAlign: 'right', fontWeight: 700, color: 'var(--dark)', whiteSpace: 'nowrap' }}>{price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Link to="/contact" className="btn-primary" style={{ marginTop: 20, width: '100%', justifyContent: 'center' }}>Book a free call</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container reveal" style={{ maxWidth: 1040 }}>
          <h2 style={h2}>Who it's for</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 28 }}>
            {WHO.map((w) => <span key={w} style={{ padding: '8px 16px', borderRadius: 100, border: '1px solid var(--border-light)', fontSize: 15 }}>{w}</span>)}
          </div>
          <p className="body-md" style={{ maxWidth: 680 }}>
            Offices big enough that IT problems cost real time, too small for their own IT person. If someone in the office has become "the one who fixes the computers", that is us.
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
            <Link to="/contact" className="btn-primary">Book a free call</Link>
            <a href="tel:+441443805303" className="btn-secondary">Call 01443 805303</a>
          </div>
        </div>
      </section>
    </main>
  )
}
