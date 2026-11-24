/**
 * Website security check sign-up (/security-check), Nov 2026.
 *
 * Free quick test, £30 full test if something turns up, most fixes £90.
 * We only ever test a site the person owns or is authorised for, so the form
 * collects that permission explicitly; the request is saved and emailed by
 * functions/api/security-check.js. Don't name Anthropic or Claude here.
 */

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'

const STEPS = [
  ['Free quick test', 'Free', 'We check your website from the outside for the obvious weak spots: out of date software, missing protections, pages or files that are open when they shouldn\'t be.'],
  ['Full test', '£30', 'Only if the quick test finds something. We test properly, the way someone trying to break in would, and send you a plain-English write-up of everything we found and how serious it is.'],
  ['We fix it', 'Most fixes £90', 'You approve the price first. We fix it, test it again and confirm it\'s sorted.'],
]

const FAQ = [
  ['Will testing break my website?', 'No. We don\'t do anything that could take your site down, slow it or change your data. If a test would need to change something, we ask you first.'],
  ['Do you need my passwords?', 'No. The quick test and the full test are done from the outside, the same as anyone on the internet would see it. If you want us to fix something, we\'ll ask you to give us access properly, never to send a password.'],
  ['What does "verified" mean?', 'The tools we use for this kind of testing aren\'t something you can just sign up for. A company has to apply, prove who they are and what they do, and be checked and approved first. We have been.'],
  ['Can I test a website that isn\'t mine?', 'No. We only test websites and systems you own or are authorised to manage, and only with your permission in writing. That\'s what the tick box below is for.'],
  ['Is VAT included?', 'Prices are plus VAT.'],
]

const card = { padding: 'clamp(24px,3vw,32px)', border: '1px solid var(--border-light)', borderRadius: 18, background: 'var(--white, #fff)' }
const h2 = { fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,4vw,44px)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 20 }
const label = { display: 'block', fontSize: 14, fontWeight: 600, color: 'var(--dark)', marginBottom: 6 }
const input = { width: '100%', boxSizing: 'border-box', padding: '12px 14px', fontSize: 16, borderRadius: 10, border: '1px solid var(--border-light)', background: 'var(--white, #fff)', color: 'var(--dark)', fontFamily: 'inherit' }

export default function SecurityCheck() {
  useReveal()
  const [form, setForm] = useState({ name: '', business: '', email: '', phone: '', site: '', consent: false, website: '' })
  const [state, setState] = useState({ sending: false, done: false, error: '' })
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

  async function submit(e) {
    e.preventDefault()
    if (!form.consent) { setState({ sending: false, done: false, error: 'Please tick the box to confirm the website is yours and we have your permission.' }); return }
    setState({ sending: true, done: false, error: '' })
    try {
      const res = await fetch('/api/security-check', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || data.error) throw new Error(data.error || 'Something went wrong.')
      setState({ sending: false, done: true, error: '' })
    } catch (err) {
      setState({ sending: false, done: false, error: err.message || 'We could not send that just now. Please call 01443 805303.' })
    }
  }

  return (
    <main>
      <section className="section page-hero">
        <div className="container" style={{ maxWidth: 860 }}>
          <div className="reveal">
            <p className="eyebrow" style={{ marginBottom: 16 }}>Website security check</p>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px,6vw,72px)', fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.02, marginBottom: 20 }}>
              How safe is your website, really?
            </h1>
            <p className="body-lg" style={{ maxWidth: 640, marginBottom: 28 }}>
              We've been verified to carry out cyber security testing. We test business websites for weak spots the way a hacker would, and show you exactly what we find. The quick test is free.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="#book" className="btn-primary">Book a free quick test</a>
              <a href="tel:+441443805303" className="btn-secondary">Call 01443 805303</a>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="container" style={{ maxWidth: 1040 }}>
          <h2 className="reveal" style={h2}>How it works</h2>
          <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
            {STEPS.map(([title, price, body], i) => (
              <div key={title} className="reveal" style={card}>
                <p className="eyebrow" style={{ marginBottom: 10 }}>Step {i + 1}</p>
                <h3 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 4px', color: 'var(--dark)' }}>{title}</h3>
                <p style={{ fontSize: 20, fontWeight: 700, color: 'var(--accent)', margin: '0 0 12px' }}>{price}</p>
                <p className="body-md" style={{ margin: 0 }}>{body}</p>
              </div>
            ))}
          </div>
          <p className="body-sm reveal" style={{ marginTop: 16, color: 'var(--mid)' }}>Prices + VAT. Bigger jobs are quoted before we start.</p>
        </div>
      </section>

      <section className="section" id="book">
        <div className="container" style={{ maxWidth: 680 }}>
          <h2 className="reveal" style={h2}>Book your free quick test</h2>
          {state.done ? (
            <div className="reveal" style={card}>
              <h3 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 8px', color: 'var(--dark)' }}>Thanks, we've got it.</h3>
              <p className="body-md" style={{ margin: 0 }}>We'll run the quick test and get back to you within two working days. Check your inbox for a confirmation email.</p>
            </div>
          ) : (
            <form className="reveal" style={{ ...card, display: 'grid', gap: 16 }} onSubmit={submit} noValidate>
              <div><label style={label} htmlFor="sc-name">Your name</label><input id="sc-name" style={input} value={form.name} onChange={set('name')} autoComplete="name" required /></div>
              <div><label style={label} htmlFor="sc-business">Business name</label><input id="sc-business" style={input} value={form.business} onChange={set('business')} autoComplete="organization" required /></div>
              <div><label style={label} htmlFor="sc-email">Email</label><input id="sc-email" type="email" style={input} value={form.email} onChange={set('email')} autoComplete="email" required /></div>
              <div><label style={label} htmlFor="sc-phone">Phone (optional)</label><input id="sc-phone" type="tel" style={input} value={form.phone} onChange={set('phone')} autoComplete="tel" /></div>
              <div><label style={label} htmlFor="sc-site">Website address</label><input id="sc-site" style={input} value={form.site} onChange={set('site')} placeholder="yourbusiness.co.uk" inputMode="url" required /></div>
              {/* Honeypot: hidden from people, filled in by bots. */}
              <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px' }}><input tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} /></div>
              <label style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 15, lineHeight: 1.5, color: 'var(--dark)' }}>
                <input type="checkbox" checked={form.consent} onChange={set('consent')} style={{ marginTop: 4, width: 18, height: 18, flexShrink: 0 }} />
                <span>I own this website, or I'm authorised to make decisions about it, and I give DH Website Services permission to run a non-intrusive security check on it.</span>
              </label>
              {state.error ? <p role="alert" style={{ margin: 0, color: '#B42318', fontSize: 15 }}>{state.error}</p> : null}
              <button type="submit" className="btn-primary" disabled={state.sending} style={{ justifyContent: 'center' }}>{state.sending ? 'Sending…' : 'Book my free quick test'}</button>
              <p className="body-sm" style={{ margin: 0, color: 'var(--mid)' }}>We use these details to run the test and contact you about it. See our <Link to="/privacy">privacy notice</Link>.</p>
            </form>
          )}
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
        </div>
      </section>
    </main>
  )
}
