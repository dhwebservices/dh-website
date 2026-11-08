import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

export default function ExitIntent() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const firedRef = useRef(false)
  const armedRef = useRef(false)

  useEffect(() => {
    if (sessionStorage.getItem('exit_dismissed')) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const onMouseOut = (e) => {
      if (firedRef.current) return
      if (!armedRef.current) return
      if (e.clientY <= 4 && e.relatedTarget === null) {
        firedRef.current = true
        setTimeout(() => setVisible(true), 150)
      }
    }

    const armTimer = setTimeout(() => { armedRef.current = true }, 12000)

    document.addEventListener('mouseout', onMouseOut)
    return () => {
      document.removeEventListener('mouseout', onMouseOut)
      clearTimeout(armTimer)
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
          <button onClick={dismiss} style={{ position: 'absolute', top: 16, right: 16, width: 28, height: 28, borderRadius: '50%', background: 'var(--cream)', border: 'none', cursor: 'pointer', fontSize: 16, color: 'var(--mid)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>

          <p className="eyebrow" style={{ marginBottom: 10, color: 'var(--accent)' }}>Quick question</p>
          <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 10, color: 'var(--dark)' }}>
            Need an answer before you leave?
          </h2>
          <p style={{ fontSize: 15, color: 'var(--mid)', lineHeight: 1.65, marginBottom: 24 }}>
            If you are weighing up pricing, timelines, or whether we are the right fit, you can book a quick call and get a straight answer.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            <Link to="/contact" onClick={dismiss} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '13px 20px', borderRadius: 100, background: 'var(--dark)', color: '#fff', textDecoration: 'none', fontSize: 14, fontWeight: 600, transition: 'opacity 0.15s' }}
              onMouseOver={e => e.currentTarget.style.opacity = '0.88'}
              onMouseOut={e => e.currentTarget.style.opacity = '1'}>
              Book a free call →
            </Link>
            <a href="tel:+441443805303" onClick={dismiss}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px 20px', borderRadius: 100, border: '1px solid var(--border)', color: 'var(--dark)', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>
              Or ring 01443 805303
            </a>
          </div>

          <button onClick={dismiss} style={{ display: 'block', width: '100%', textAlign: 'center', fontSize: 13, color: 'var(--light)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0' }}>
            Carry on browsing
          </button>
        </div>
      </div>
    </div>
  )
}
