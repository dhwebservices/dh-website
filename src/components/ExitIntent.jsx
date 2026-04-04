import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

export default function ExitIntent() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const firedRef = useRef(false)

  useEffect(() => {
    // Don't show if dismissed this session
    if (sessionStorage.getItem('exit_dismissed')) return

    // Only on desktop — detect mouse leaving toward top of screen
    const onMouseOut = (e) => {
      if (firedRef.current) return
      if (e.clientY <= 8 && e.relatedTarget === null) {
        firedRef.current = true
        // Small delay so it doesn't feel jarring
        setTimeout(() => setVisible(true), 150)
      }
    }

    // On mobile — show after 45s of inactivity (different trigger)
    const onMobile = !window.matchMedia('(hover: hover)').matches
    let mobileTimer
    if (onMobile) {
      mobileTimer = setTimeout(() => {
        if (!firedRef.current && !sessionStorage.getItem('exit_dismissed')) {
          firedRef.current = true
          setVisible(true)
        }
      }, 45000)
    }

    document.addEventListener('mouseout', onMouseOut)
    return () => {
      document.removeEventListener('mouseout', onMouseOut)
      clearTimeout(mobileTimer)
    }
  }, [])

  const dismiss = () => {
    setVisible(false)
    setDismissed(true)
    sessionStorage.setItem('exit_dismissed', '1')
  }

  if (dismissed || !visible) return null

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9990, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <style>{`
        @keyframes exit-in {
          from { opacity:0; transform:scale(0.94) translateY(-12px); }
          to   { opacity:1; transform:scale(1) translateY(0); }
        }
      `}</style>

      {/* Backdrop */}
      <div onClick={dismiss} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }} />

      {/* Modal */}
      <div style={{ position: 'relative', background: '#fff', borderRadius: 24, maxWidth: 440, width: '100%', overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,0.25)', animation: 'exit-in 0.35s cubic-bezier(0.16,1,0.3,1)' }}>
        {/* Gold top bar */}
        <div style={{ height: 4, background: 'linear-gradient(90deg, var(--accent) 0%, #C9A84C 100%)' }} />

        <div style={{ padding: '36px 36px 32px' }}>
          {/* Close */}
          <button onClick={dismiss} style={{ position: 'absolute', top: 16, right: 16, width: 28, height: 28, borderRadius: '50%', background: 'var(--cream)', border: 'none', cursor: 'pointer', fontSize: 16, color: 'var(--mid)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>

          <div style={{ fontSize: 32, marginBottom: 12 }}>👋</div>
          <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 10, color: 'var(--dark)' }}>
            Before you go —
          </h2>
          <p style={{ fontSize: 15, color: 'var(--mid)', lineHeight: 1.65, marginBottom: 24 }}>
            Got a question about pricing, timelines, or what we can build? We reply within 24 hours and the first call is completely free.
          </p>

          {/* Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            <Link to="/contact" onClick={dismiss} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '13px 20px', borderRadius: 100, background: 'var(--dark)', color: '#fff', textDecoration: 'none', fontSize: 14, fontWeight: 600, transition: 'opacity 0.15s' }}
              onMouseOver={e => e.currentTarget.style.opacity = '0.88'}
              onMouseOut={e => e.currentTarget.style.opacity = '1'}>
              Book a free 15 min call →
            </Link>
            <a href="https://wa.me/447359587007?text=Hi%2C%20I%20have%20a%20quick%20question%20about%20your%20services" target="_blank" rel="noreferrer" onClick={dismiss}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px 20px', borderRadius: 100, background: '#25D366', color: '#fff', textDecoration: 'none', fontSize: 14, fontWeight: 600, transition: 'opacity 0.15s' }}
              onMouseOver={e => e.currentTarget.style.opacity = '0.88'}
              onMouseOut={e => e.currentTarget.style.opacity = '1'}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Message us on WhatsApp
            </a>
          </div>

          <button onClick={dismiss} style={{ display: 'block', width: '100%', textAlign: 'center', fontSize: 13, color: 'var(--light)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0' }}>
            No thanks, I will have a look around
          </button>
        </div>
      </div>
    </div>
  )
}
