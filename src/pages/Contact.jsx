import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import { useCMS } from '../hooks/useCMS'
import { BookingWidget } from '../components/BookingWidget'
import { postWorker } from '../lib/booking'
import { trackEvent } from '../lib/analytics'

export default function Contact() {
  useReveal()
  const { data: cms } = useCMS('contact')
  const { search } = useLocation()
  const [form, setForm] = useState({ name: '', email: '', business: '', budget: '', timeline: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const params = new URLSearchParams(search)
  const quoteSummary = params.get('source') !== 'calculator' ? null : {
    total: params.get('total'),
    monthly: params.get('monthly'),
    packageName: params.get('package'),
    features: params.get('features'),
  }

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }))

  const submitEnquiry = async (event) => {
    event.preventDefault()
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in your name, email, and project brief.')
      return
    }

    setSending(true)
    setError('')

    const summaryHtml = quoteSummary
      ? `<tr><td style="padding:9px 14px;background:#F9FAFB;border:1px solid #E5E7EB;font-weight:600;font-size:13px">Estimate</td><td style="padding:9px 14px;border:1px solid #E5E7EB;font-size:13px">${quoteSummary.packageName || 'Custom'} · £${quoteSummary.total || '0'}${quoteSummary.monthly && quoteSummary.monthly !== '0' ? ` + £${quoteSummary.monthly}/mo` : ''}</td></tr>${quoteSummary.features ? `<tr><td style="padding:9px 14px;background:#F9FAFB;border:1px solid #E5E7EB;font-weight:600;font-size:13px">Features</td><td style="padding:9px 14px;border:1px solid #E5E7EB;font-size:13px">${quoteSummary.features}</td></tr>` : ''}`
      : ''

    try {
      await postWorker('send_email', {
        to: 'clients@dhwebsiteservices.co.uk',
        subject: `New website enquiry - ${form.name}`,
        from_name: 'DH Website Services',
        from_email: 'clients@dhwebsiteservices.co.uk',
        html: `<div style="font-family:Arial,sans-serif;padding:32px;max-width:560px"><h2 style="color:#1A1612;margin-bottom:4px">New Website Enquiry</h2><p style="color:#6E6E73;margin-bottom:20px;font-size:14px">Submitted via dhwebsiteservices.co.uk/contact</p><table style="width:100%;border-collapse:collapse;margin-bottom:20px"><tr><td style="padding:9px 14px;background:#F9FAFB;border:1px solid #E5E7EB;font-weight:600;font-size:13px;width:140px">Name</td><td style="padding:9px 14px;border:1px solid #E5E7EB;font-size:13px">${form.name}</td></tr><tr><td style="padding:9px 14px;background:#F9FAFB;border:1px solid #E5E7EB;font-weight:600;font-size:13px">Email</td><td style="padding:9px 14px;border:1px solid #E5E7EB;font-size:13px">${form.email}</td></tr>${form.business ? `<tr><td style="padding:9px 14px;background:#F9FAFB;border:1px solid #E5E7EB;font-weight:600;font-size:13px">Business</td><td style="padding:9px 14px;border:1px solid #E5E7EB;font-size:13px">${form.business}</td></tr>` : ''}${form.budget ? `<tr><td style="padding:9px 14px;background:#F9FAFB;border:1px solid #E5E7EB;font-weight:600;font-size:13px">Budget</td><td style="padding:9px 14px;border:1px solid #E5E7EB;font-size:13px">${form.budget}</td></tr>` : ''}${form.timeline ? `<tr><td style="padding:9px 14px;background:#F9FAFB;border:1px solid #E5E7EB;font-weight:600;font-size:13px">Timeline</td><td style="padding:9px 14px;border:1px solid #E5E7EB;font-size:13px">${form.timeline}</td></tr>` : ''}${summaryHtml}</table><div style="padding:16px 18px;background:#F9FAFB;border:1px solid #E5E7EB;border-radius:12px"><div style="font-size:12px;font-weight:700;color:#6E6E73;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:10px">Project brief</div><p style="font-size:14px;line-height:1.7;color:#1A1612;white-space:pre-wrap;margin:0">${form.message}</p></div></div>`,
      })

      await postWorker('send_email', {
        to: form.email,
        subject: 'We received your enquiry - DH Website Services',
        from_name: 'DH Website Services',
        from_email: 'clients@dhwebsiteservices.co.uk',
        html: `<div style="font-family:Arial,sans-serif;padding:32px;max-width:560px"><h2 style="color:#1A1612;margin-bottom:10px">Thanks, ${form.name.split(' ')[0]}</h2><p style="font-size:14px;line-height:1.7;color:#3D3D3F">We have your enquiry and will reply within 24 hours with a clear next step. If your brief needs a call, we will say so. If it can be priced directly, we will do that too.</p><p style="font-size:14px;line-height:1.7;color:#3D3D3F;margin-top:16px">If you need anything in the meantime, reply to this email or call 029 2002 4218.</p></div>`,
      })

      trackEvent('contact_enquiry_submitted', {
        source: quoteSummary ? 'calculator_handoff' : 'contact_form',
      })
      setSent(true)
    } catch {
      setError('Something went wrong. Please email clients@dhwebsiteservices.co.uk directly.')
    }

    setSending(false)
  }

  return (
    <main style={{ paddingTop:'var(--nav-h)' }}>
      <section className="section">
        <div className="container">

          {/* Header */}
          <div className="reveal" style={{ textAlign:'center', maxWidth:640, margin:'0 auto 64px' }}>
            <p className="eyebrow" style={{ marginBottom:16 }}>Contact</p>
            <h1 style={{ fontFamily:'var(--font-sans)', fontSize:'clamp(40px,6vw,72px)', fontWeight:600, letterSpacing:'-0.03em', lineHeight:1.0, marginBottom:20 }}>
              Start with a call<br />or a brief.
            </h1>
            <p className="body-md" style={{ marginBottom:0 }}>
              Book a free consultation, or send your project brief if you would rather skip the call first. Either way, you get a direct response and a clear next step.
            </p>
          </div>

          {quoteSummary && (
            <div className="reveal section-narrow" style={{ marginBottom:48 }}>
              <div style={{ padding:'18px 20px', border:'1px solid var(--border-light)', borderRadius:16, background:'var(--cream)' }}>
                <div style={{ fontSize:12, fontWeight:600, letterSpacing:'0.06em', textTransform:'uppercase', color:'var(--accent)', marginBottom:8 }}>Calculator summary</div>
                <div style={{ fontSize:18, fontWeight:600, color:'var(--dark)', marginBottom:6 }}>
                  {quoteSummary.packageName || 'Custom package'} · £{Number(quoteSummary.total || 0).toLocaleString()}
                  {quoteSummary.monthly && quoteSummary.monthly !== '0' ? ` + £${quoteSummary.monthly}/mo` : ''}
                </div>
                {quoteSummary.features && <p className="body-sm">{quoteSummary.features}</p>}
              </div>
            </div>
          )}

          {/* Two column — contact info + booking widget */}
          <div className="contact-layout" style={{ gap:'clamp(40px,6vw,96px)', alignItems:'start', maxWidth:960, margin:'0 auto' }}>

            {/* Left — contact details */}
            <div className="reveal">
              {/* Contact info card */}
              <div className="glass-card" style={{ borderRadius:16, overflow:'hidden', marginBottom:24 }}>
                {[
                  { label:'Email',    val: cms?.email    || 'clients@dhwebsiteservices.co.uk', href:'mailto:clients@dhwebsiteservices.co.uk' },
                  { label:'Phone',    val: cms?.phone    || '029 2002 4218', href:'tel:02920024218' },
                  { label:'Location', val: cms?.location || 'Cardiff, United Kingdom' },
                  { label:'Response', val: cms?.response_time || 'Within 24 hours' },
                ].map((c,i,arr) => (
                  <div key={c.label} style={{ padding:'16px 20px', borderBottom:i<arr.length-1?'1px solid var(--border-light)':'none', display:'flex', justifyContent:'space-between', alignItems:'center', gap:16 }}>
                    <span style={{ fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--light)' }}>{c.label}</span>
                    {c.href
                      ? <a href={c.href} style={{ fontSize:14, color:'var(--dark)', transition:'color 0.15s' }} onMouseOver={e=>e.currentTarget.style.color='var(--accent)'} onMouseOut={e=>e.currentTarget.style.color='var(--dark)'}>{c.val}</a>
                      : <span style={{ fontSize:14, color:'var(--dark2)' }}>{c.val}</span>
                    }
                  </div>
                ))}
              </div>

              {/* Business hours */}
              <div style={{ padding:'16px 20px', background:'var(--cream)', borderRadius:12, border:'1px solid var(--border-light)' }}>
                <p style={{ fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--light)', marginBottom:10 }}>Business hours</p>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6, fontSize:14 }}>
                  <span style={{ color:'var(--mid)' }}>Monday – Friday</span>
                  <span style={{ fontWeight:500, color:'var(--dark)' }}>{cms?.hours_weekday || '9am – 5pm GMT'}</span>
                </div>
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:14 }}>
                  <span style={{ color:'var(--mid)' }}>Weekends</span>
                  <span style={{ fontWeight:500, color:'var(--dark)' }}>{cms?.hours_weekend || 'Next business day'}</span>
                </div>
              </div>

              {/* What to expect */}
              <div style={{ marginTop:24 }}>
                <p style={{ fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--light)', marginBottom:14 }}>What to expect</p>
                {[
                  ['📞', 'We call you', 'From 029 2002 4218 at your chosen time'],
                  ['💬', 'Discuss your project', 'Tell us what you need, we listen'],
                  ['📋', 'Clear plan & price', 'Fixed quote, no surprises'],
                ].map(([icon, title, desc]) => (
                  <div key={title} style={{ display:'flex', gap:12, marginBottom:14, alignItems:'flex-start' }}>
                    <div style={{ width:32, height:32, borderRadius:8, background:'var(--cream)', border:'1px solid var(--border-light)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, flexShrink:0 }}>{icon}</div>
                    <div>
                      <div style={{ fontSize:13, fontWeight:600, color:'var(--dark)', marginBottom:2 }}>{title}</div>
                      <div style={{ fontSize:12, color:'var(--mid)' }}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — booking widget */}
            <div className="reveal">
              <div className="glass-card" style={{ borderRadius:20, padding:'32px' }}>
                <BookingWidget />
              </div>
            </div>
          </div>

          <div className="reveal section-narrow" style={{ marginTop:72 }}>
            <div className="glass-card" style={{ borderRadius:20, padding:'clamp(28px,4vw,40px)' }}>
              <div style={{ marginBottom:24 }}>
                <p className="eyebrow" style={{ marginBottom:12 }}>Prefer email?</p>
                <h2 className="headline-md" style={{ marginBottom:12 }}>Send your brief.</h2>
                <p className="body-sm">Useful if you already know what you need and want a written reply first.</p>
              </div>

              {sent ? (
                <div style={{ padding:'12px 0' }}>
                  <h3 style={{ fontSize:18, fontWeight:600, marginBottom:8 }}>Brief received</h3>
                  <p className="body-sm">We have your enquiry and will reply within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={submitEnquiry} style={{ display:'grid', gap:14 }}>
                  <div className="pricing-grid-two" style={{ gap:12 }}>
                    <div>
                      <label className="field-label">Name *</label>
                      <input className="field-inp" value={form.name} onChange={(e) => update('name', e.target.value)} />
                    </div>
                    <div>
                      <label className="field-label">Email *</label>
                      <input className="field-inp" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} />
                    </div>
                  </div>
                  <div className="pricing-grid-two" style={{ gap:12 }}>
                    <div>
                      <label className="field-label">Business</label>
                      <input className="field-inp" value={form.business} onChange={(e) => update('business', e.target.value)} />
                    </div>
                    <div>
                      <label className="field-label">Rough budget</label>
                      <select className="field-inp" value={form.budget} onChange={(e) => update('budget', e.target.value)}>
                        <option value="">Select budget</option>
                        <option>Under £1,000</option>
                        <option>£1,000 - £2,500</option>
                        <option>£2,500 - £5,000</option>
                        <option>£5,000+</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="field-label">Timeline</label>
                    <input className="field-inp" value={form.timeline} onChange={(e) => update('timeline', e.target.value)} placeholder="e.g. Within 4 weeks" />
                  </div>
                  <div>
                    <label className="field-label">Project brief *</label>
                    <textarea className="field-inp" rows={6} value={form.message} onChange={(e) => update('message', e.target.value)} placeholder="What do you need, what matters most, and what should this website help your business do?" style={{ resize:'vertical', lineHeight:1.7 }} />
                  </div>
                  {error && <p style={{ fontSize:13, color:'#FF3B30' }}>{error}</p>}
                  <button className="btn-primary" type="submit" disabled={sending} style={{ justifyContent:'center' }}>
                    {sending ? 'Sending...' : 'Send project brief'}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>
    </main>
  )
}
