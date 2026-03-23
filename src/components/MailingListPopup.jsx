import { useState, useEffect } from 'react'

const WORKER = 'https://dh-email-worker.aged-silence-66a7.workers.dev'
const SUPABASE_URL = 'https://xtunnfdwltfesscmpove.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0dW5uZmR3bHRmZXNzY21wb3ZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1MDkyNzAsImV4cCI6MjA4OTA4NTI3MH0.MaNZGpdSrn5kSTmf3kR87WCK_ga5Meze0ZvlZDkIjfM'

export default function MailingListPopup({ settings }) {
  const [visible, setVisible] = useState(false)
  const [email, setEmail]     = useState('')
  const [name, setName]       = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone]       = useState(false)
  const [error, setError]     = useState('')

  const s = settings || {}
  const headline    = s.headline    || 'Get a discount on your first project'
  const subtext     = s.subtext     || 'Join our mailing list and a client services advisor will reach out with your exclusive discount code.'
  const buttonText  = s.button_text || 'Claim my discount'
  const delay       = (s.delay_seconds ?? 5) * 1000
  const enabled     = s.enabled !== false

  useEffect(() => {
    if (!enabled) return
    // Don't show if already dismissed this session
    if (sessionStorage.getItem('ml_dismissed')) return
    const t = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(t)
  }, [enabled, delay])

  const dismiss = () => {
    setVisible(false)
    sessionStorage.setItem('ml_dismissed', '1')
  }

  const submit = async (e) => {
    e.preventDefault()
    if (!email) return
    setSubmitting(true); setError('')
    try {
      // Insert into mailing_list
      const res = await fetch(SUPABASE_URL + '/rest/v1/mailing_list', {
        method: 'POST',
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: 'Bearer ' + SUPABASE_KEY,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({ email, name: name || null, source: 'website_popup', subscribed_at: new Date().toISOString() })
      })

      if (res.status === 409) {
        // Already subscribed
        setDone(true)
        sessionStorage.setItem('ml_dismissed', '1')
        setSubmitting(false)
        return
      }
      if (!res.ok) throw new Error('Failed to subscribe')

      // Email to subscriber
      await fetch(WORKER, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'send_email', data: {
          to: email,
          subject: "You're on the list! Your discount is on its way 🎉",
          from_name: 'DH Website Services',
          from_email: 'clients@dhwebsiteservices.co.uk',
          html: buildSubscriberEmail(name || email.split('@')[0]),
        }})
      })

      // Notify clients@
      await fetch(WORKER, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'send_email', data: {
          to: 'clients@dhwebsiteservices.co.uk',
          subject: '📬 New mailing list signup — ' + email,
          from_name: 'DH Website Services',
          from_email: 'clients@dhwebsiteservices.co.uk',
          html: `<div style="font-family:Arial,sans-serif;padding:32px;max-width:500px"><h2 style="color:#1A1612">New Mailing List Signup</h2><table style="width:100%;border-collapse:collapse;margin:16px 0"><tr><td style="padding:9px 14px;background:#F9FAFB;border:1px solid #E5E7EB;font-weight:600;font-size:13px;width:100px">Email</td><td style="padding:9px 14px;border:1px solid #E5E7EB;font-size:13px">${email}</td></tr>${name ? `<tr><td style="padding:9px 14px;background:#F9FAFB;border:1px solid #E5E7EB;font-weight:600;font-size:13px">Name</td><td style="padding:9px 14px;border:1px solid #E5E7EB;font-size:13px">${name}</td></tr>` : ''}<tr><td style="padding:9px 14px;background:#F9FAFB;border:1px solid #E5E7EB;font-weight:600;font-size:13px">Source</td><td style="padding:9px 14px;border:1px solid #E5E7EB;font-size:13px">Website popup</td></tr><tr><td style="padding:9px 14px;background:#F9FAFB;border:1px solid #E5E7EB;font-weight:600;font-size:13px">Time</td><td style="padding:9px 14px;border:1px solid #E5E7EB;font-size:13px">${new Date().toLocaleString('en-GB')}</td></tr></table><p style="font-size:13px;color:#6b7280">Remember to reach out with their discount code!</p></div>`
        }})
      })

      setDone(true)
      sessionStorage.setItem('ml_dismissed', '1')
    } catch(e) {
      setError('Something went wrong. Please try again.')
    }
    setSubmitting(false)
  }

  if (!visible) return null

  return (
    <div style={{ position:'fixed', inset:0, zIndex:9999, display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}>
      {/* Backdrop */}
      <div onClick={dismiss} style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.45)', backdropFilter:'blur(6px)', WebkitBackdropFilter:'blur(6px)' }}/>

      {/* Modal */}
      <div style={{ position:'relative', background:'#ffffff', borderRadius:24, maxWidth:480, width:'100%', overflow:'hidden', boxShadow:'0 32px 80px rgba(0,0,0,0.25)', animation:'ml-pop 0.35s cubic-bezier(0.16,1,0.3,1)' }}>
        <style>{`@keyframes ml-pop { from { opacity:0; transform:scale(0.93) translateY(12px) } to { opacity:1; transform:scale(1) translateY(0) } }`}</style>

        {/* Close */}
        <button onClick={dismiss} style={{ position:'absolute', top:16, right:16, width:32, height:32, borderRadius:'50%', background:'rgba(0,0,0,0.06)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16, color:'#6E6E73', zIndex:1 }}>×</button>

        {/* Top gradient band */}
        <div style={{ height:6, background:'linear-gradient(90deg, #0071E3 0%, #30A46C 50%, #8E4EC6 100%)' }}/>

        {done ? (
          <div style={{ padding:'48px 40px', textAlign:'center' }}>
            <div style={{ width:64, height:64, borderRadius:'50%', background:'#F0FDF4', border:'2px solid #BBF7D0', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px', fontSize:28 }}>🎉</div>
            <h2 style={{ fontFamily:'-apple-system, BlinkMacSystemFont, sans-serif', fontSize:24, fontWeight:700, color:'#1A1612', letterSpacing:'-0.02em', marginBottom:10 }}>You're on the list!</h2>
            <p style={{ fontSize:15, color:'#6E6E73', lineHeight:1.6, marginBottom:24 }}>
              Check your inbox — we've sent you a confirmation. A client services advisor will be in touch with your exclusive discount code.
            </p>
            <button onClick={dismiss} style={{ padding:'12px 28px', borderRadius:100, background:'#1A1612', color:'#fff', border:'none', cursor:'pointer', fontSize:14, fontWeight:600 }}>
              Continue browsing
            </button>
          </div>
        ) : (
          <div style={{ padding:'40px 40px 44px' }}>
            <div style={{ marginBottom:24 }}>
              <div style={{ fontSize:13, fontWeight:600, letterSpacing:'0.06em', textTransform:'uppercase', color:'#0071E3', marginBottom:10 }}>Exclusive offer</div>
              <h2 style={{ fontFamily:'-apple-system, BlinkMacSystemFont, sans-serif', fontSize:'clamp(22px,4vw,28px)', fontWeight:700, color:'#1A1612', letterSpacing:'-0.02em', lineHeight:1.2, marginBottom:12 }}>{headline}</h2>
              <p style={{ fontSize:15, color:'#6E6E73', lineHeight:1.65 }}>{subtext}</p>
            </div>

            <form onSubmit={submit} style={{ display:'flex', flexDirection:'column', gap:12 }}>
              <input
                type="text"
                placeholder="Your first name (optional)"
                value={name}
                onChange={e => setName(e.target.value)}
                style={{ padding:'13px 16px', borderRadius:10, border:'1px solid #D2D2D7', fontSize:14, outline:'none', fontFamily:'inherit', color:'#1A1612', transition:'border-color 0.15s' }}
                onFocus={e => e.target.style.borderColor = '#0071E3'}
                onBlur={e => e.target.style.borderColor = '#D2D2D7'}
              />
              <input
                type="email"
                required
                placeholder="Your email address *"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ padding:'13px 16px', borderRadius:10, border:'1px solid #D2D2D7', fontSize:14, outline:'none', fontFamily:'inherit', color:'#1A1612', transition:'border-color 0.15s' }}
                onFocus={e => e.target.style.borderColor = '#0071E3'}
                onBlur={e => e.target.style.borderColor = '#D2D2D7'}
              />
              {error && <p style={{ fontSize:13, color:'#E54D2E', margin:0 }}>{error}</p>}
              <button type="submit" disabled={submitting || !email} style={{ padding:'14px', borderRadius:100, background: submitting ? '#A1A1A6' : '#1A1612', color:'#fff', border:'none', cursor: submitting ? 'not-allowed' : 'pointer', fontSize:14, fontWeight:700, letterSpacing:'0.01em', transition:'all 0.15s', marginTop:4 }}>
                {submitting ? 'Subscribing...' : buttonText}
              </button>
            </form>

            <p style={{ fontSize:11, color:'#A1A1A6', textAlign:'center', marginTop:14, lineHeight:1.5 }}>
              No spam, ever. Unsubscribe anytime. By subscribing you agree to our <a href="/privacy" style={{ color:'#0071E3', textDecoration:'none' }}>privacy policy</a>.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

function buildSubscriberEmail(firstName) {
  return `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Welcome to DH Website Services</title></head>
<body style="margin:0;padding:0;background:#F5F5F7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif">
<div style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08)">

  <!-- Header gradient -->
  <div style="height:5px;background:linear-gradient(90deg,#0071E3 0%,#30A46C 50%,#8E4EC6 100%)"></div>

  <!-- Hero -->
  <div style="padding:48px 48px 32px;text-align:center">
    <div style="width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,#0071E3,#30A46C);display:flex;align-items:center;justify-content:center;margin:0 auto 24px;font-size:32px;line-height:72px">🎉</div>
    <h1 style="font-size:28px;font-weight:700;color:#1A1612;letter-spacing:-0.02em;margin:0 0 12px">You're on the list, ${firstName}!</h1>
    <p style="font-size:16px;color:#6E6E73;line-height:1.65;margin:0">Thanks for joining the DH Website Services community. Your exclusive discount is just around the corner.</p>
  </div>

  <!-- Divider -->
  <div style="height:1px;background:#F0F0F2;margin:0 48px"></div>

  <!-- What happens next -->
  <div style="padding:32px 48px">
    <h2 style="font-size:18px;font-weight:700;color:#1A1612;margin:0 0 20px">What happens next?</h2>
    <div style="display:flex;flex-direction:column;gap:16px">
      ${['📞 A client services advisor will reach out to you personally with your exclusive discount code.','💰 Use your code on any of our build packages — Starter, Growth, Pro, or Enterprise.','🚀 Once you\'re ready, we\'ll get your project started within days.'].map((step, i) => `
      <div style="display:flex;align-items:flex-start;gap:16px;padding:16px 20px;background:#F9FAFB;border-radius:12px;border:1px solid #E5E7EB">
        <div style="width:32px;height:32px;border-radius:50%;background:#1A1612;color:#fff;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;flex-shrink:0;line-height:32px;text-align:center">${i+1}</div>
        <p style="font-size:14px;color:#3D3D3F;line-height:1.6;margin:0;padding-top:4px">${step}</p>
      </div>`).join('')}
    </div>
  </div>

  <!-- Divider -->
  <div style="height:1px;background:#F0F0F2;margin:0 48px"></div>

  <!-- Packages preview -->
  <div style="padding:32px 48px">
    <h2 style="font-size:18px;font-weight:700;color:#1A1612;margin:0 0 8px">Our packages</h2>
    <p style="font-size:14px;color:#6E6E73;margin:0 0 20px">Professional websites built for growth. From concept to deployment.</p>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      ${[['Starter','From £449','5-page professional website'],['Growth','From £999','10-page + blog + full SEO'],['Pro','From £1,499','15 pages + e-commerce ready'],['Enterprise','From £2,499','Full enterprise + HR system']].map(([name,price,desc]) => `
      <div style="padding:16px;background:#F9FAFB;border-radius:12px;border:1px solid #E5E7EB">
        <div style="font-size:13px;font-weight:700;color:#1A1612;margin-bottom:4px">${name}</div>
        <div style="font-size:16px;font-weight:700;color:#0071E3;margin-bottom:6px">${price}</div>
        <div style="font-size:12px;color:#6E6E73">${desc}</div>
      </div>`).join('')}
    </div>
  </div>

  <!-- CTA -->
  <div style="padding:24px 48px 48px;text-align:center">
    <a href="https://dhwebsiteservices.co.uk/contact" style="display:inline-block;padding:14px 36px;background:#1A1612;color:#ffffff;text-decoration:none;border-radius:100px;font-size:14px;font-weight:700;letter-spacing:0.01em">Book a free call →</a>
    <p style="font-size:13px;color:#A1A1A6;margin:20px 0 0">Questions? Call us on <a href="tel:02920024218" style="color:#0071E3;text-decoration:none">029 2002 4218</a> or email <a href="mailto:clients@dhwebsiteservices.co.uk" style="color:#0071E3;text-decoration:none">clients@dhwebsiteservices.co.uk</a></p>
  </div>

  <!-- Footer -->
  <div style="background:#F5F5F7;padding:24px 48px;text-align:center;border-top:1px solid #E5E7EB">
    <p style="font-size:12px;color:#A1A1A6;margin:0;line-height:1.6">
      © ${new Date().getFullYear()} DH Website Services · David Hooper Home Limited · Co. No. 17018784<br>
      Cardiff, Wales · <a href="https://dhwebsiteservices.co.uk/privacy" style="color:#A1A1A6">Privacy Policy</a> · <a href="https://dhwebsiteservices.co.uk" style="color:#A1A1A6">Unsubscribe</a>
    </p>
  </div>

</div>
</body></html>`
}
