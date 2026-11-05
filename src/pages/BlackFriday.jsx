/**
 * Early Black Friday offer, 5 to 30 November 2026.
 *
 * A temporary page: it is not in the sitemap, and after OFFER_ENDS it says the
 * offer has ended instead of taking bookings. The "Book a place" button opens
 * the normal contact form with ?source=black-friday, which marks the enquiry
 * as a booking in the email David gets.
 *
 * Every claim here must stay true (UK pricing rules): £449 is the real normal
 * price, and the 10 places are counted by Jack in the bookings log.
 */

import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import { XmasPageHero } from '../components/Christmas'
import { blackFridayOn } from '../lib/offers'

const BOOK_HREF = '/contact?source=black-friday#brief'

const INCLUDED = [
  'Up to 3 pages, for example Home, Services and Contact',
  'Designed in your colours and logo, built to work on phones first',
  'Contact form, Google Maps and a link to your Google reviews',
  'Set up on your own domain, with basic SEO so Google can find you',
  'One round of changes before it goes live',
]

const STEPS = [
  ['Book a place', 'Send the form. We reply within a day with a link for the 50% deposit (£124.50 + VAT).'],
  ['Send your content', 'Your text, logo and photos within 14 days. We tell you exactly what we need.'],
  ['We build it', 'We start as soon as your content is in. You see it before it goes live and get one round of changes.'],
  ['It goes live', 'The rest of the build price is due on launch, then the care plan starts.'],
]

const TERMS = [
  'Offer open from 5 November until 23:59 on Monday 30 November 2026, or until the 10 places are booked.',
  'Covers up to 3 pages from our own design system. Online shops, bookings, logins and extra pages are quoted at our normal rates.',
  'Comes with our care plan at £15 a month + VAT for a minimum of 12 months: hosting, security updates and small text and photo changes.',
  'A 50% deposit books a place. It is refunded in full if you cancel before we start your build.',
  'Your content is due within 14 days of booking. Places without content move to the back of the queue.',
  'Other plans: Black Friday prices apply to projects booked with a deposit by Monday 30 November 2026. The care plan requirement applies to the £249 website only.',
  'One per business. Cannot be combined with the £20 voucher or any other offer.',
  'All prices exclude VAT at 20%.',
]

// Must match PLAN_PRICES in src/lib/offers.js.
const OTHER_PLANS = [
  ['Growth website, 10 pages and a blog', '£749', '£999'],
  ['Pro website, 15 pages, e-commerce ready', '£1,099', '£1,499'],
  ['Enterprise website + HR system', '£1,899', '£2,499'],
  ['Simple app on the App Store and Google Play', '£249', '£349'],
  ['Booking or ordering app', '£499', '£699'],
  ['Business app or game', 'from £1,099', 'from £1,499'],
]

const card = { padding: 'clamp(24px,3vw,32px)', border: '1px solid var(--border-light)', borderRadius: 18, background: 'var(--white, #fff)' }

export default function BlackFriday() {
  useReveal()
  const ended = !blackFridayOn()

  return (
    <main>
      <section className="section page-hero">
        <XmasPageHero />
        <div className="container" style={{ maxWidth: 820 }}>
          <div className="reveal">
            <p className="eyebrow" style={{ marginBottom: 16 }}>{ended ? 'Black Friday 2026' : 'Early Black Friday · until Monday 30 November'}</p>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px,6vw,80px)', fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.0, marginBottom: 20 }}>
              A 3-page website<br />for £249 + VAT.
            </h1>
            {ended ? (
              <>
                <p className="body-lg" style={{ marginBottom: 28 }}>This offer has ended. Thanks to everyone who booked a place.</p>
                <Link to="/pricing" className="btn-primary">See our prices</Link>
              </>
            ) : (
              <>
                <p className="body-lg" style={{ maxWidth: 600, marginBottom: 28 }}>
                  Normally from £449 + VAT. Built by our team in Pontypridd as soon as you book, with hosting and updates at £15 a month. Only 10 places.
                </p>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <Link to={BOOK_HREF} className="btn-primary">Book a place</Link>
                  <a href="tel:+441443805303" className="btn-secondary">Call 01443 805303</a>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {!ended && (
        <>
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
                      ['Website build', '£249 + VAT', 'Normally from £449'],
                      ['Care plan', '£15 a month + VAT', '12 months minimum'],
                      ['First year in total', '£429 + VAT', null],
                    ].map(([label, price, note], i) => (
                      <tr key={label} style={{ borderTop: i ? '1px solid var(--border-light)' : 'none' }}>
                        <td style={{ padding: '14px 0', color: 'var(--mid)' }}>{label}{note ? <div style={{ fontSize: 13, color: 'var(--light)' }}>{note}</div> : null}</td>
                        <td style={{ padding: '14px 0', textAlign: 'right', fontWeight: 700, color: 'var(--dark)', whiteSpace: 'nowrap' }}>{price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Link to={BOOK_HREF} className="btn-primary" style={{ marginTop: 20, width: '100%', justifyContent: 'center' }}>Book a place</Link>
              </div>
            </div>
          </section>

          <section className="section" style={{ paddingBottom: 0 }}>
            <div className="container reveal" style={{ maxWidth: 1040 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,4vw,44px)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 8 }}>Every plan is cheaper too</h2>
              <p className="body-md" style={{ marginBottom: 24 }}>About 25% off our other websites and apps, booked by Monday 30 November. All prices + VAT.</p>
              <div style={{ ...card, padding: '8px clamp(16px,3vw,28px)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 16 }}>
                  <tbody>
                    {OTHER_PLANS.map(([plan, now, was], i) => (
                      <tr key={plan} style={{ borderTop: i ? '1px solid var(--border-light)' : 'none' }}>
                        <td style={{ padding: '14px 0', color: 'var(--dark)' }}>{plan}</td>
                        <td style={{ padding: '14px 12px', textAlign: 'right', color: 'var(--light)', whiteSpace: 'nowrap', fontSize: 14 }}>was {was}</td>
                        <td style={{ padding: '14px 0', textAlign: 'right', fontWeight: 700, color: 'var(--dark)', whiteSpace: 'nowrap' }}>{now}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 20 }}>
                <Link to="/contact" className="btn-primary">Get started</Link>
                <Link to="/pricing" className="btn-secondary">See what each plan includes</Link>
              </div>
            </div>
          </section>

          <section className="section">
            <div className="container" style={{ maxWidth: 1040 }}>
              <h2 className="reveal" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,4vw,44px)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 32 }}>How it works</h2>
              <ol className="bf-steps" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {STEPS.map(([title, body], i) => (
                  <li key={title} className="reveal">
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--accent)' }}>0{i + 1}</span>
                    <h3 style={{ fontSize: 19, fontWeight: 700, margin: '8px 0 6px', color: 'var(--dark)' }}>{title}</h3>
                    <p className="body-sm" style={{ margin: 0 }}>{body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section className="section" style={{ paddingTop: 0 }}>
            <div className="container reveal" style={{ maxWidth: 820 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 14, color: 'var(--dark)' }}>The small print</h2>
              <ul className="body-sm" style={{ paddingLeft: 20, margin: 0, display: 'grid', gap: 8 }}>
                {TERMS.map((t) => <li key={t}>{t}</li>)}
              </ul>
              <p className="body-sm" style={{ marginTop: 20 }}>
                Questions first? Call <a href="tel:+441443805303" style={{ color: 'var(--accent)' }}>01443 805303</a> or <Link to="/contact" style={{ color: 'var(--accent)' }}>book a free call</Link>.
              </p>
            </div>
          </section>
        </>
      )}
    </main>
  )
}
