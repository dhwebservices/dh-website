/**
 * /visitor-levy-calculator: a free Wales visitor levy calculator (Nov 2026).
 *
 * Rates and rules from gov.wales technical guidance: higher rate £1.30, lower
 * rate 75p, per person per night; under-18s are disregarded only where the
 * lower rate applies; returns are yearly if the year's levy is £1,000 or less,
 * quarterly above that. Everyone registers with the WRA by 31 March 2027.
 * If the rates change, change RATES and the copy together.
 */
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'

const RATES = { higher: 1.3, lower: 0.75 }
const gbp = (n) => n.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' })

const card = { padding: 'clamp(24px,3vw,32px)', border: '1px solid var(--border-light)', borderRadius: 18, background: 'var(--white, #fff)' }
const h2 = { fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,3.6vw,38px)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 16 }
const label = { display: 'grid', gap: 6, fontSize: 14, fontWeight: 600 }
const input = { padding: '12px 14px', borderRadius: 10, border: '1px solid var(--border-light)', fontSize: 16, fontFamily: 'inherit', background: 'var(--white, #fff)', color: 'inherit' }

function NumberField({ name, value, onChange, min = 0, max = 999, help }) {
  return (
    <label style={label}>
      {name}
      <input type="number" inputMode="numeric" min={min} max={max} value={value} style={input}
        onChange={(e) => onChange(Math.max(min, Math.min(max, Number(e.target.value) || 0)))} />
      {help && <span style={{ fontWeight: 400, fontSize: 13, color: 'var(--mid)' }}>{help}</span>}
    </label>
  )
}

export default function LevyCalculator() {
  useReveal()
  const [rate, setRate] = useState('higher')
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(2)
  const [nights, setNights] = useState(7)
  const [stays, setStays] = useState(30)

  const r = useMemo(() => {
    // Under-18s only drop out of the count at the lower rate.
    const people = rate === 'lower' ? adults : adults + children
    const stayNights = people * nights
    const perStay = stayNights * RATES[rate]
    const year = perStay * stays
    return { people, stayNights, perStay, year, quarterly: year > 1000 }
  }, [rate, adults, children, nights, stays])

  return (
    <main>
      <section className="section page-hero">
        <div className="container" style={{ maxWidth: 860 }}>
          <p className="eyebrow" style={{ marginBottom: 16 }}>Free tool for holiday lets in Wales</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(38px,6vw,68px)', fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.02, marginBottom: 20 }}>
            Wales visitor levy calculator
          </h1>
          <p className="body-lg" style={{ maxWidth: 680 }}>
            Work out the levy on a booking and roughly what you will owe in a year, using the Welsh Government's rates. Nothing you enter leaves this page.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container pricing-grid-two" style={{ maxWidth: 1040, gap: 20, alignItems: 'start' }}>
          <form style={{ ...card, display: 'grid', gap: 18 }} onSubmit={(e) => e.preventDefault()} aria-label="Levy calculator">
            <fieldset style={{ border: 0, padding: 0, margin: 0, display: 'grid', gap: 10 }}>
              <legend style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Type of accommodation</legend>
              {[
                ['higher', 'Higher rate, £1.30', 'Cottages, holiday lets, lodges, B&Bs, hotels, glamping, caravan and motorhome pitches'],
                ['lower', 'Lower rate, 75p', 'Tent pitches, hostel dorms, bunkhouses and other shared rooms'],
              ].map(([id, name, help]) => (
                <label key={id} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: 14, borderRadius: 12, border: `1.5px solid ${rate === id ? 'var(--accent)' : 'var(--border-light)'}`, cursor: 'pointer' }}>
                  <input type="radio" name="rate" checked={rate === id} onChange={() => setRate(id)} style={{ marginTop: 4 }} />
                  <span><b style={{ display: 'block' }}>{name}</b><span style={{ fontSize: 13, color: 'var(--mid)' }}>{help}</span></span>
                </label>
              ))}
            </fieldset>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 14 }}>
              <NumberField name="Adults" value={adults} onChange={setAdults} max={60} />
              <NumberField name="Under 18s" value={children} onChange={setChildren} max={60} help={rate === 'lower' ? 'Not counted at the lower rate' : 'Counted at the higher rate'} />
              <NumberField name="Nights" value={nights} onChange={setNights} min={1} max={365} />
              <NumberField name="Similar stays a year" value={stays} onChange={setStays} max={365} help="For the yearly estimate" />
            </div>
          </form>

          <div style={{ ...card, background: 'var(--dark, #14181A)', color: '#fff', borderColor: 'transparent' }} aria-live="polite">
            <p className="eyebrow" style={{ color: '#ff8a9b', marginBottom: 14 }}>This booking</p>
            <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 15, display: 'grid', gap: 8, marginBottom: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>People counted</span><b>{r.people}</b></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>× nights</span><b>{nights}</b></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Overnight stays</span><b>{r.stayNights}</b></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>× rate</span><b>{gbp(RATES[rate])}</b></div>
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px,6vw,56px)', fontWeight: 800, letterSpacing: '-0.03em' }}>{gbp(r.perStay)}</div>
            <p style={{ color: '#b9c0c2', margin: '4px 0 22px' }}>levy on this booking</p>
            <div style={{ borderTop: '1px solid #2c3436', paddingTop: 18 }}>
              <p style={{ margin: 0, color: '#b9c0c2' }}>Over {stays} similar stays a year</p>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 800 }}>{gbp(r.year)}</div>
              <p style={{ margin: '10px 0 0', color: '#fff' }}>
                {r.quarterly ? 'Over £1,000 a year, so you would file quarterly returns.' : '£1,000 or less a year, so you would file one return a year.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <h2 style={h2}>Before you rely on the number</h2>
          <ul className="body-md" style={{ display: 'grid', gap: 10, paddingLeft: 20 }}>
            <li><b>Your council has to be charging it.</b> The levy only applies where the council has introduced it. Cardiff starts on 1 April 2027. Check your area on the <a href="https://www.gov.wales/check-if-local-council-charges-visitor-levy-wales" target="_blank" rel="noopener noreferrer">Welsh Government's council list</a>.</li>
            <li><b>Everyone registers anyway.</b> Every visitor accommodation provider in Wales has to register with the Welsh Revenue Authority by 31 March 2027, even where the council never charges the levy.</li>
            <li><b>Bookings made now can count.</b> Where a council has announced the levy, it applies to bookings taken in advance for stays after the start date.</li>
            <li><b>Keep the records.</b> For every stay: the dates, the number of visitors and the number of nights.</li>
            <li><b>This is an estimate, not tax advice.</b> It follows the published rates. Your own situation, such as exemptions or mixed accommodation, may differ. The <a href="https://www.gov.wales/visitor-levy-wales" target="_blank" rel="noopener noreferrer">Welsh Government's guidance</a> is the source to check.</li>
          </ul>
          <p className="body-md" style={{ marginTop: 18 }}>More detail is in our <Link to="/guides/wales-visitor-levy-holiday-lets/">plain-English guide to the visitor levy</Link>.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <div style={{ ...card, display: 'grid', gap: 14 }}>
            <h2 style={{ ...h2, marginBottom: 0 }}>Taking bookings direct?</h2>
            <p className="body-md" style={{ margin: 0 }}>
              If guests book with you rather than through Airbnb or Booking.com, your own booking system has to show the levy, charge it and keep the records. We build direct booking websites for holiday lets, caravan parks and lodges in Wales, with calendar sync to the big platforms, and the levy built in from the start.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/holiday-lets" className="btn-primary">Direct booking websites</Link>
              <a href="tel:+441443805303" className="btn-secondary">Call 01443 805303</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
