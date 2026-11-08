/**
 * Book a fixed-price package by paying the 50% deposit online: /order?plan=<id>.
 *
 * The amount shown here comes from src/lib/plans.js, the same list the server
 * charges from, so the page and Stripe always agree. After paying, Stripe
 * sends the customer back to /order?session_id=..., and the page asks
 * /api/deposit-confirm whether it really was paid.
 *
 * Query string only (no /order/<id>), so no Pages Function is needed for
 * direct visits. Hidden from search in robots.txt.
 */

import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { depositPlan, pounds } from '../lib/plans'

const card = { padding: 'clamp(22px,3vw,32px)', border: '1px solid var(--border-light)', borderRadius: 18, background: 'var(--white, #fff)' }
const h1 = { fontFamily: 'var(--font-display)', fontSize: 'clamp(34px,5vw,60px)', fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.02, marginBottom: 16 }

function Paid({ sessionId }) {
  const [state, setState] = useState({ loading: true })
  useEffect(() => {
    let live = true
    fetch(`/api/deposit-confirm?session_id=${encodeURIComponent(sessionId)}`)
      .then((r) => r.json().catch(() => ({})))
      .then((d) => live && setState({ loading: false, ...d }))
      .catch(() => live && setState({ loading: false, paid: false }))
    return () => { live = false }
  }, [sessionId])

  if (state.loading) return <p className="body-lg">Checking your payment…</p>
  if (!state.paid) {
    return (
      <>
        <h1 style={h1}>We couldn't confirm that payment.</h1>
        <p className="body-lg" style={{ marginBottom: 24 }}>If money has left your account, don't worry: call us on <a href="tel:+441443805303" style={{ color: 'var(--accent)' }}>01443 805303</a> and we'll check it with you straight away.</p>
        <Link to="/pricing" className="btn-secondary">Back to prices</Link>
      </>
    )
  }
  return (
    <>
      <p className="eyebrow" style={{ marginBottom: 16 }}>Deposit paid</p>
      <h1 style={h1}>Thank you. You're booked in.</h1>
      <p className="body-lg" style={{ marginBottom: 24 }}>We've received {state.total} for the {state.plan}. A confirmation is on its way to {state.email}.</p>
      <div style={{ ...card, color: 'var(--dark)' }}>
        <p className="eyebrow" style={{ marginBottom: 12 }}>What happens next</p>
        <ol className="body-md" style={{ paddingLeft: 20, margin: 0, display: 'grid', gap: 8 }}>
          <li>We'll be in touch within one working day to plan your build.</li>
          <li>The other 50% of the build price is due before it goes live.</li>
          <li>{state.care}</li>
        </ol>
      </div>
    </>
  )
}

export default function Order() {
  const [params] = useSearchParams()
  const sessionId = params.get('session_id')
  const plan = depositPlan(params.get('plan'))
  const [form, setForm] = useState({ name: '', business: '', email: '', phone: '', notes: '', buyerType: 'business', acceptTerms: false, startNow: false })
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(params.get('cancelled') ? 'Payment cancelled. Nothing was charged. You can try again below.' : '')
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

  async function submit(e) {
    e.preventDefault()
    setSending(true); setError('')
    try {
      const res = await fetch('/api/deposit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, plan: plan.id }) })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.url) throw new Error(data.error || 'We couldn\'t start the payment. Please try again.')
      window.location.assign(data.url)
    } catch (err) {
      setError(err.message); setSending(false)
    }
  }

  return (
    <main>
      <section className="section page-hero">
        <div className="container" style={{ maxWidth: 860 }}>
          {sessionId ? <Paid sessionId={sessionId} /> : !plan ? (
            <>
              <h1 style={h1}>That package can't be booked online.</h1>
              <p className="body-lg" style={{ marginBottom: 24 }}>Pick a package on our prices page, or call 01443 805303 for a quote.</p>
              <Link to="/pricing" className="btn-primary">See our prices</Link>
            </>
          ) : (
            <>
              <p className="eyebrow" style={{ marginBottom: 16 }}>Book online</p>
              <h1 style={h1}>{plan.name}</h1>
              <p className="body-lg" style={{ marginBottom: 0 }}>{plan.summary} Pay the 50% deposit now and we'll start planning your build within one working day.</p>
            </>
          )}
        </div>
      </section>

      {!sessionId && plan && (
        <section className="section" style={{ background: 'var(--cream)' }}>
          <div className="container" style={{ maxWidth: 960 }}>
              <div className="order-grid">
                <div style={card}>
                  <p className="eyebrow" style={{ marginBottom: 14 }}>What it costs</p>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 15 }}>
                    <tbody>
                      {[
                        ['Build price', `£${plan.price.toLocaleString('en-GB')} + VAT`, plan.was ? `Normally £${plan.was.toLocaleString('en-GB')} · ends 30 Nov` : null],
                        ['Deposit today (50%)', `${pounds(plan.depositPence)} + VAT`, `${pounds(plan.totalPence)} including VAT`],
                        ['Before it goes live', `${pounds(plan.price * 100 - plan.depositPence)} + VAT`, 'The other 50%'],
                      ].map(([label, price, note], i) => (
                        <tr key={label} style={{ borderTop: i ? '1px solid var(--border-light)' : 'none' }}>
                          <td style={{ padding: '12px 0', color: 'var(--mid)' }}>{label}{note ? <div style={{ fontSize: 13, color: 'var(--light)' }}>{note}</div> : null}</td>
                          <td style={{ padding: '12px 0', textAlign: 'right', fontWeight: 700, color: 'var(--dark)', whiteSpace: 'nowrap' }}>{price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="body-sm" style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border-light)' }}><b>Included:</b> {plan.care}</p>
                </div>

                <form onSubmit={submit} style={{ ...card, display: 'grid', gap: 14 }}>
                  <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }} role="radiogroup" aria-label="Who is buying">
                    {[['business', 'For my business'], ['consumer', 'As an individual']].map(([v, l]) => (
                      <label key={v} style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 15 }}>
                        <input type="radio" name="buyerType" value={v} checked={form.buyerType === v} onChange={set('buyerType')} /> {l}
                      </label>
                    ))}
                  </div>
                  <div><label className="field-label" htmlFor="o-name">Your name</label><input id="o-name" className="field-inp" autoComplete="name" required value={form.name} onChange={set('name')} /></div>
                  {form.buyerType === 'business' && (
                    <div><label className="field-label" htmlFor="o-business">Business name</label><input id="o-business" className="field-inp" autoComplete="organization" required value={form.business} onChange={set('business')} /></div>
                  )}
                  <div><label className="field-label" htmlFor="o-email">Email</label><input id="o-email" type="email" className="field-inp" autoComplete="email" required value={form.email} onChange={set('email')} /></div>
                  <div><label className="field-label" htmlFor="o-phone">Phone</label><input id="o-phone" type="tel" className="field-inp" autoComplete="tel" required value={form.phone} onChange={set('phone')} /></div>
                  <div><label className="field-label" htmlFor="o-notes">What do you need? (optional)</label><textarea id="o-notes" className="field-inp" rows={3} maxLength={450} value={form.notes} onChange={set('notes')} placeholder="For example, a site for my café with our menu and opening hours" /></div>
                  {form.buyerType === 'consumer' && (
                    <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14, color: 'var(--dark2)' }}>
                      <input type="checkbox" required checked={form.startNow} onChange={set('startNow')} style={{ marginTop: 3 }} />
                      <span>Please start within the 14-day cancellation period. I understand I can still cancel within 14 days, but I'll pay for any work already done.</span>
                    </label>
                  )}
                  <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14, color: 'var(--dark2)' }}>
                    <input type="checkbox" required checked={form.acceptTerms} onChange={set('acceptTerms')} style={{ marginTop: 3 }} />
                    <span>I accept the <Link to="/services-terms" style={{ color: 'var(--accent)' }}>services terms</Link> and the <Link to="/refunds" style={{ color: 'var(--accent)' }}>refunds and cancellation policy</Link>.</span>
                  </label>
                  {error && <p role="alert" style={{ margin: 0, padding: '10px 14px', borderRadius: 10, background: 'var(--accent-soft)', color: 'var(--accent)', fontSize: 14 }}>{error}</p>}
                  <button type="submit" className="btn-primary" disabled={sending} style={{ justifyContent: 'center', width: '100%' }}>
                    {sending ? 'Opening secure payment…' : `Pay ${pounds(plan.totalPence)} deposit`}
                  </button>
                  <p className="body-sm" style={{ margin: 0, textAlign: 'center' }}>Secure card payment by Stripe. Questions first? Call <a href="tel:+441443805303" style={{ color: 'var(--accent)' }}>01443 805303</a>.</p>
                </form>
              </div>
          </div>
        </section>
      )}
    </main>
  )
}
