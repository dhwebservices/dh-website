import { useState, useEffect } from 'react'
import { trackEvent } from '../lib/analytics'
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../lib/siteConfig'

export default function MailingListPopup({ settings }) {
  const [visible, setVisible] = useState(false)
  const [email, setEmail]     = useState('')
  const [name, setName]       = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone]       = useState(false)
  const [error, setError]     = useState('')

  const s = settings || {}
  const headline    = s.headline    || 'Get a discount on your first project'
  const subtext     = s.subtext     || 'Leave your email and we will send you a discount code for your first project.'
  const buttonText  = s.button_text || 'Claim my discount'
  const delay       = (s.delay_seconds ?? 45) * 1000
  const enabled     = s.enabled !== false

  useEffect(() => {
    if (!enabled) return
    if (sessionStorage.getItem('ml_dismissed')) return
    if (window.matchMedia('(max-width: 768px), (hover: none) and (pointer: coarse)').matches) return
    const t = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(t)
  }, [enabled, delay])

  useEffect(() => {
    if (!visible) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') dismiss()
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [visible])

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
          apikey: SUPABASE_ANON_KEY,
          Authorization: 'Bearer ' + SUPABASE_ANON_KEY,
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

      // Welcome + internal notice are built server-side from the saved signup.
      await fetch('/api/form-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kind: 'mailing_signup', email }),
      }).catch(() => null)

      trackEvent('mailing_list_signup', { source: 'website_popup' })
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

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="mailing-list-heading"
        style={{ position:'relative', background:'#ffffff', borderRadius:24, maxWidth:480, width:'100%', overflow:'hidden', boxShadow:'0 32px 80px rgba(0,0,0,0.25)', animation:'ml-pop 0.35s cubic-bezier(0.16,1,0.3,1)' }}
      >
        <style>{`@keyframes ml-pop { from { opacity:0; transform:scale(0.93) translateY(12px) } to { opacity:1; transform:scale(1) translateY(0) } }`}</style>

        {/* Close */}
        <button onClick={dismiss} style={{ position:'absolute', top:16, right:16, width:32, height:32, borderRadius:'50%', background:'rgba(0,0,0,0.06)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16, color:'#6E6E73', zIndex:1 }}>×</button>

        {/* A single flat rule in the brand red. The three-colour gradient
            this replaces was the most generated-looking thing on the site. */}
        <div style={{ height:4, background:'var(--accent)' }}/>

        {done ? (
          <div style={{ padding:'48px 40px', textAlign:'center' }}>
            <div style={{ width:64, height:64, borderRadius:'50%', background:'#F0FDF4', border:'2px solid #BBF7D0', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px', fontSize:28 }}>🎉</div>
            <h2 style={{ fontFamily:'-apple-system, BlinkMacSystemFont, sans-serif', fontSize:24, fontWeight:700, color:'#1A1612', letterSpacing:'-0.02em', marginBottom:10 }}>You're on the list!</h2>
            <p style={{ fontSize:15, color:'#6E6E73', lineHeight:1.6, marginBottom:24 }}>
              Check your inbox for the confirmation. We will follow up with your discount code.
            </p>
            <button onClick={dismiss} style={{ padding:'12px 28px', borderRadius:100, background:'#1A1612', color:'#fff', border:'none', cursor:'pointer', fontSize:14, fontWeight:600 }}>
              Continue browsing
            </button>
          </div>
        ) : (
          <div style={{ padding:'40px 40px 44px' }}>
            <div style={{ marginBottom:24 }}>
              <div style={{ fontSize:13, fontWeight:600, letterSpacing:'0.06em', textTransform:'uppercase', color:'var(--accent)', marginBottom:10 }}>Exclusive offer</div>
              <h2 id="mailing-list-heading" style={{ fontFamily:'-apple-system, BlinkMacSystemFont, sans-serif', fontSize:'clamp(22px,4vw,28px)', fontWeight:700, color:'#1A1612', letterSpacing:'-0.02em', lineHeight:1.2, marginBottom:12 }}>{headline}</h2>
              <p style={{ fontSize:15, color:'#6E6E73', lineHeight:1.65 }}>{subtext}</p>
            </div>

            <form onSubmit={submit} style={{ display:'flex', flexDirection:'column', gap:12 }}>
              <input
                type="text"
                placeholder="Your first name (optional)"
                value={name}
                onChange={e => setName(e.target.value)}
                style={{ padding:'13px 16px', borderRadius:10, border:'1px solid #D2D2D7', fontSize:14, outline:'none', fontFamily:'inherit', color:'#1A1612', transition:'border-color 0.15s' }}
                onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                onBlur={e => e.target.style.borderColor = '#D2D2D7'}
              />
              <input
                type="email"
                required
                placeholder="Your email address *"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ padding:'13px 16px', borderRadius:10, border:'1px solid #D2D2D7', fontSize:14, outline:'none', fontFamily:'inherit', color:'#1A1612', transition:'border-color 0.15s' }}
                onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                onBlur={e => e.target.style.borderColor = '#D2D2D7'}
              />
              {error && <p style={{ fontSize:13, color:'#E54D2E', margin:0 }}>{error}</p>}
              <button type="submit" disabled={submitting || !email} style={{ padding:'14px', borderRadius:100, background: submitting ? '#A1A1A6' : '#1A1612', color:'#fff', border:'none', cursor: submitting ? 'not-allowed' : 'pointer', fontSize:14, fontWeight:700, letterSpacing:'0.01em', transition:'all 0.15s', marginTop:4 }}>
                {submitting ? 'Subscribing...' : buttonText}
              </button>
            </form>

            <p style={{ fontSize:11, color:'#A1A1A6', textAlign:'center', marginTop:14, lineHeight:1.5 }}>
              No spam, ever. Unsubscribe anytime. By subscribing you agree to our <a href="/privacy" style={{ color:'var(--accent)', textDecoration:'none' }}>privacy policy</a>.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
