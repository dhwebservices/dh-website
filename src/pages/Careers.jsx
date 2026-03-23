import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'

const WORKER = 'https://dh-email-worker.aged-silence-66a7.workers.dev'

function buildInternalEmail(name, email, role, message) {
  const rows = [['Name', name], ['Email', email], ['Role', role || 'General'], ['Applied', new Date().toLocaleString('en-GB')]]
  return '<div style="font-family:Arial,sans-serif;max-width:600px;padding:32px">'
    + '<h2 style="color:#1A1612;margin-bottom:4px">New Job Application</h2>'
    + '<p style="color:#6E6E73;margin-bottom:24px;font-size:14px">Submitted via dhwebsiteservices.co.uk/careers</p>'
    + '<table style="width:100%;border-collapse:collapse;margin-bottom:24px">'
    + rows.map(([l, v]) => '<tr><td style="padding:9px 14px;background:#F9FAFB;border:1px solid #E5E7EB;font-weight:600;font-size:13px;width:100px">' + l + '</td><td style="padding:9px 14px;border:1px solid #E5E7EB;font-size:13px">' + v + '</td></tr>').join('')
    + '</table>'
    + '<div style="padding:16px 20px;background:#F9FAFB;border-radius:10px;border:1px solid #E5E7EB">'
    + '<p style="font-family:monospace;font-size:13px;color:#1A1612;white-space:pre-wrap;margin:0;line-height:1.7">' + message + '</p>'
    + '</div>'
    + '<p style="margin-top:20px;font-size:13px;color:#6E6E73">Reply directly to <a href="mailto:' + email + '" style="color:#0071E3">' + email + '</a> to get in touch.</p>'
    + '</div>'
}

function buildConfirmationEmail(firstName, name, email, role) {
  const summaryRows = [['Name', name], ['Email', email], ['Role interest', role || 'General application']]
  const steps = [
    ['We review your application', 'Our team reviews every application personally. No automated rejections.'],
    ['We will reach out', 'If there is a good fit, a team member will contact you directly within a few days.'],
    ['Move fast', 'We keep the process short — no lengthy interview cycles.'],
  ]
  return '<!DOCTYPE html><html><head><meta charset="UTF-8"></head>'
    + '<body style="margin:0;padding:0;background:#F5F5F7;font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Arial,sans-serif">'
    + '<div style="max-width:580px;margin:40px auto;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08)">'
    + '<div style="height:5px;background:linear-gradient(90deg,#0071E3 0%,#30A46C 50%,#8E4EC6 100%)"></div>'
    + '<div style="padding:48px 48px 32px;text-align:center">'
    + '<div style="width:64px;height:64px;border-radius:50%;background:#EEF6FF;border:2px solid #BFDBFE;display:inline-flex;align-items:center;justify-content:center;margin-bottom:20px;font-size:28px">&#10003;</div>'
    + '<h1 style="font-size:26px;font-weight:700;color:#1A1612;letter-spacing:-0.02em;margin:0 0 10px">Application received, ' + firstName + '!</h1>'
    + '<p style="font-size:15px;color:#6E6E73;line-height:1.65;margin:0">Thanks for your interest in joining DH Website Services. We have received your application and will be in touch if there is a good fit.</p>'
    + '</div>'
    + '<div style="height:1px;background:#F0F0F2;margin:0 48px"></div>'
    + '<div style="padding:32px 48px">'
    + '<h2 style="font-size:16px;font-weight:700;color:#1A1612;margin:0 0 16px">Your application summary</h2>'
    + '<table style="width:100%;border-collapse:collapse">'
    + summaryRows.map(([l, v]) => '<tr><td style="padding:9px 14px;background:#F9FAFB;border:1px solid #E5E7EB;font-weight:600;font-size:13px;width:120px">' + l + '</td><td style="padding:9px 14px;border:1px solid #E5E7EB;font-size:13px">' + v + '</td></tr>').join('')
    + '</table>'
    + '</div>'
    + '<div style="height:1px;background:#F0F0F2;margin:0 48px"></div>'
    + '<div style="padding:32px 48px">'
    + '<h2 style="font-size:16px;font-weight:700;color:#1A1612;margin:0 0 12px">What happens next?</h2>'
    + steps.map(([title, desc], i) =>
        '<div style="display:flex;gap:14px;margin-bottom:16px;align-items:flex-start">'
        + '<div style="width:28px;height:28px;border-radius:50%;background:#1A1612;color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0;line-height:28px;text-align:center">' + (i + 1) + '</div>'
        + '<div><div style="font-size:14px;font-weight:600;color:#1A1612;margin-bottom:3px">' + title + '</div>'
        + '<div style="font-size:13px;color:#6E6E73;line-height:1.6">' + desc + '</div></div>'
        + '</div>'
      ).join('')
    + '</div>'
    + '<div style="padding:24px 48px 44px;text-align:center">'
    + '<a href="https://dhwebsiteservices.co.uk" style="display:inline-block;padding:13px 32px;background:#1A1612;color:#fff;text-decoration:none;border-radius:100px;font-size:14px;font-weight:600">Visit our website</a>'
    + '<p style="font-size:13px;color:#A1A1A6;margin:16px 0 0">Questions? Email us at <a href="mailto:clients@dhwebsiteservices.co.uk" style="color:#0071E3;text-decoration:none">clients@dhwebsiteservices.co.uk</a></p>'
    + '</div>'
    + '<div style="background:#F5F5F7;padding:20px 48px;text-align:center;border-top:1px solid #E5E7EB">'
    + '<p style="font-size:12px;color:#A1A1A6;margin:0">&#169; ' + new Date().getFullYear() + ' DH Website Services &middot; David Hooper Home Limited &middot; Co. No. 17018784</p>'
    + '</div>'
    + '</div></body></html>'
}

export default function Careers() {
  useReveal()
  const [form, setForm] = useState({ name:'', email:'', role:'', message:'' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const u = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const submit = async e => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) { setError('Please fill in all required fields.'); return }
    setSending(true); setError('')
    try {
      const firstName = form.name.split(' ')[0]

      // 1. Notify clients@ of new application
      const r1 = await fetch(WORKER, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'send_email', data: {
          to: 'clients@dhwebsiteservices.co.uk',
          subject: 'New Job Application - ' + form.name + (form.role ? ' (' + form.role + ')' : ''),
          html: buildInternalEmail(form.name, form.email, form.role, form.message),
        }})
      })
      if (!r1.ok) console.error('Internal email failed:', await r1.json())

      // 2. Confirmation email to applicant
      const r2 = await fetch(WORKER, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'send_email', data: {
          to: form.email,
          subject: 'Application received - DH Website Services',
          html: buildConfirmationEmail(firstName, form.name, form.email, form.role),
        }})
      })
      if (!r2.ok) console.error('Confirmation email failed:', await r2.json())

      setSent(true)
    } catch (err) {
      console.error('Careers submit error:', err)
      setError('Something went wrong. Please email clients@dhwebsiteservices.co.uk directly.')
    }
    setSending(false)
  }

  return (
    <main style={{ paddingTop:'var(--nav-h)' }}>
      <section className="section">
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1.2fr', gap:'clamp(48px,7vw,100px)', alignItems:'start' }}>
            <div>
              <div className="reveal">
                <p className="eyebrow" style={{ marginBottom:16 }}>Careers</p>
                <h1 style={{ fontFamily:'var(--font-sans)', fontSize:'clamp(36px,5vw,60px)', fontWeight:600, letterSpacing:'-0.03em', lineHeight:1.0, marginBottom:24 }}>
                  Build the web<br />with us.
                </h1>
                <p className="body-lg" style={{ marginBottom:40 }}>Small team, real work, genuine craft. If you are good at what you do and want to do more of it, we want to hear from you.</p>
              </div>
              <div className="reveal" style={{ display:'flex', flexDirection:'column', gap:0, border:'1px solid var(--border-light)', borderRadius:16, overflow:'hidden', marginBottom:24 }}>
                {[
                  ['Ship real work', 'No endless meetings. We build things that launch.'],
                  ['Quality first', 'We would rather do fewer things brilliantly than many things poorly.'],
                  ['Flat structure', 'Direct communication. Your work matters and you will see the impact.'],
                  ['Real growth', 'Small and fast-moving means genuine opportunity.'],
                ].map(([t, d], i, arr) => (
                  <div key={t} style={{ padding:'18px 20px', borderBottom:i<arr.length-1?'1px solid var(--border-light)':'none' }}>
                    <div style={{ fontSize:14, fontWeight:600, marginBottom:4, letterSpacing:'-0.01em' }}>{t}</div>
                    <div className="body-sm" style={{ fontSize:13 }}>{d}</div>
                  </div>
                ))}
              </div>
              <div className="reveal" style={{ padding:'18px 20px', background:'var(--cream)', borderRadius:12, border:'1px solid var(--border-light)' }}>
                <p style={{ fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--light)', marginBottom:12 }}>Roles we are interested in</p>
                {['Frontend developers (React)', 'Full-stack developers', 'UI/UX designers', 'Client outreach specialists', 'Account managers'].map(r => (
                  <div key={r} style={{ display:'flex', gap:8, marginBottom:8, fontSize:14, color:'var(--dark2)', alignItems:'baseline' }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink:0, marginTop:2 }}><path d="M1.5 6.5L4 9L10.5 2.5" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    {r}
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal">
              <div style={{ background:'var(--cream)', borderRadius:20, padding:'clamp(28px,4vw,40px)', border:'1px solid var(--border-light)' }}>
                <h2 style={{ fontSize:20, fontWeight:600, letterSpacing:'-0.02em', marginBottom:24 }}>Expression of interest</h2>
                {sent ? (
                  <div style={{ textAlign:'center', padding:'40px 20px' }}>
                    <div style={{ width:48, height:48, borderRadius:'50%', background:'var(--accent-soft)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px' }}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 10L8 15L17 5" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <h3 style={{ fontSize:18, fontWeight:600, marginBottom:8 }}>Application received</h3>
                    <p className="body-sm">Check your inbox for a confirmation. We will be in touch if there is a good fit.</p>
                  </div>
                ) : (
                  <form onSubmit={submit} style={{ display:'flex', flexDirection:'column', gap:12 }}>
                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                      <div><label className="field-label">Name *</label><input className="field-inp" value={form.name} onChange={e=>u('name',e.target.value)} /></div>
                      <div><label className="field-label">Email *</label><input className="field-inp" type="email" value={form.email} onChange={e=>u('email',e.target.value)} /></div>
                    </div>
                    <div>
                      <label className="field-label">Role interest</label>
                      <select className="field-inp" value={form.role} onChange={e=>u('role',e.target.value)} style={{ color:form.role?'var(--dark)':'var(--light)' }}>
                        <option value="">Select...</option>
                        {['Frontend Developer','Full-stack Developer','UI/UX Designer','Client Outreach','Account Manager','Other'].map(o=><option key={o}>{o}</option>)}
                      </select>
                    </div>
                    <div><label className="field-label">About you *</label><textarea className="field-inp" rows={5} value={form.message} onChange={e=>u('message',e.target.value)} placeholder="Experience, what you are looking for, links to your work..." style={{ resize:'vertical', lineHeight:1.6 }} /></div>
                    {error && <p style={{ fontSize:13, color:'#FF3B30' }}>{error}</p>}
                    <button type="submit" disabled={sending} className="btn-primary" style={{ justifyContent:'center', opacity:sending?0.7:1 }}>
                      {sending ? 'Sending...' : 'Submit application →'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
