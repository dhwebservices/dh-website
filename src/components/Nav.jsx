import { BookingWidget } from './BookingWidget'
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useWebsitePages } from '../hooks/useWebsitePages'

const LINKS = [
  { to: '/services',   label: 'Services' },
  { to: '/about',      label: 'About' },
  { to: '/partners',   label: 'Partners' },
  { to: '/portfolio',  label: 'Portfolio' },
  { to: '/pricing',    label: 'Pricing' },
  { to: '/calculator', label: '⚡ Get a quote', accent: true },
  { to: '/careers',    label: 'Careers' },
  { to: '/contact',    label: 'Contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [bookModal, setBookModal] = useState(false)
  const loc = useLocation()
  const { pages } = useWebsitePages()
  const customLinks = pages
    .filter((page) => page.show_in_nav)
    .map((page) => ({
      to: `/${page.slug}`,
      label: page.nav_label || page.title,
    }))
  const navLinks = [
    ...LINKS.slice(0, 4),
    ...customLinks,
    ...LINKS.slice(4),
  ]

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  useEffect(() => setOpen(false), [loc])
  useEffect(() => {
    if (!bookModal) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setBookModal(false)
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [bookModal])

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
        height: 'var(--nav-h)',
        display: 'flex', alignItems: 'center',
        padding: '0 max(20px, 50vw - 580px)',
        background: scrolled ? 'rgba(255,255,255,0.82)' : 'rgba(255,255,255,0)',
        backdropFilter: scrolled ? 'saturate(1.8) blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'saturate(1.8) blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : '1px solid transparent',
        transition: 'background 0.35s ease, border-color 0.35s ease',
      }}>
        {/* Logo */}
        <Link to="/" style={{ flex: 1 }}>
          <img src="/dh-logo.png" alt="DH Website Services"
            style={{ height: 20, filter: 'brightness(0)', transition: 'filter 0.3s' }} />
        </Link>

        {/* Links */}
        <nav className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {navLinks.map(l => (
            <Link key={l.to} to={l.to} style={{
              padding: '6px 14px', borderRadius: 100,
              fontSize: 14, fontWeight: l.accent ? 600 : 400,
              color: l.accent ? 'var(--accent)' : loc.pathname === l.to ? 'var(--dark)' : 'var(--mid)',
              background: l.accent ? 'rgba(0,113,227,0.08)' : loc.pathname === l.to ? 'rgba(0,0,0,0.05)' : 'transparent',
              border: l.accent ? '1px solid rgba(0,113,227,0.2)' : 'none',
              transition: 'all 0.15s',
            }}
              onMouseOver={e => { e.currentTarget.style.color = l.accent ? 'var(--accent-hover)' : 'var(--dark)'; if(l.accent) e.currentTarget.style.background='rgba(0,113,227,0.14)' }}
              onMouseOut={e => { e.currentTarget.style.color = l.accent ? 'var(--accent)' : loc.pathname === l.to ? 'var(--dark)' : 'var(--mid)'; if(l.accent) e.currentTarget.style.background='rgba(0,113,227,0.08)' }}
            >{l.label}</Link>
          ))}
        </nav>

        {/* CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 16 }}>
          <a href="https://app.dhwebsiteservices.co.uk" target="_blank" rel="noreferrer"
            className="hide-mob"
            style={{ fontSize: 14, fontWeight: 400, color: 'var(--mid)', padding: '6px 14px', transition: 'color 0.15s' }}
            onMouseOver={e => e.currentTarget.style.color = 'var(--dark)'}
            onMouseOut={e => e.currentTarget.style.color = 'var(--mid)'}
          >Sign in</a>
          <button onClick={() => setBookModal(true)} className="hide-mob" style={{ padding:'8px 18px', fontSize:14, fontWeight:500, borderRadius:100, border:'1px solid var(--dark)', background:'transparent', color:'var(--dark)', cursor:'pointer', whiteSpace:'nowrap', transition:'all 0.2s' }}
            onMouseOver={e=>{ e.currentTarget.style.background='var(--dark)'; e.currentTarget.style.color='#fff' }}
            onMouseOut={e=>{ e.currentTarget.style.background='transparent'; e.currentTarget.style.color='var(--dark)' }}>
            Book a call
          </button>
          <Link to="/contact" className="btn-primary hide-mob" style={{ padding: '8px 18px', fontSize: 14, fontWeight: 500 }}>
            Get started
          </Link>

          {/* Hamburger */}
          <button onClick={() => setOpen(o => !o)} className="hamburger"
            aria-label="Menu"
            style={{ display: 'none', background: 'none', border: 'none', padding: 6, flexDirection: 'column', gap: 5, cursor: 'pointer' }}>
            {[0,1,2].map(i => (
              <span key={i} style={{
                display: 'block', width: 22, height: 1.5, background: 'var(--dark)',
                borderRadius: 2, transition: 'all 0.25s',
                transform: open ? (i===0?'rotate(45deg) translate(4.5px,4.5px)':i===2?'rotate(-45deg) translate(4.5px,-4.5px)':'none'):'none',
                opacity: open && i===1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div className="mob-menu" style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 499,
        background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(24px)',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        alignItems: 'center', gap: 4, padding: 32,
        opacity: open ? 1 : 0, pointerEvents: open ? 'all' : 'none',
        transition: 'opacity 0.25s ease',
      }}>
        {navLinks.map(l => (
          <Link key={l.to} to={l.to} style={{
            fontSize: 32, fontWeight: 600, color: loc.pathname===l.to ? 'var(--accent)' : 'var(--dark)',
            padding: '12px 0', letterSpacing: '-0.02em',
          }}>{l.label}</Link>
        ))}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 24, width: '100%', maxWidth: 280 }}>
          <Link to="/contact" className="btn-primary" style={{ justifyContent: 'center' }}>Get started</Link>
          <a href="https://app.dhwebsiteservices.co.uk" target="_blank" rel="noreferrer" className="btn-secondary" style={{ justifyContent: 'center' }}>Client login</a>
        </div>
      </div>

  {/* Booking Modal */}
  {bookModal && (
    <div style={{ position:'fixed', inset:0, zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}>
      <div onClick={() => setBookModal(false)} style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.5)', backdropFilter:'blur(4px)' }}/>
      <div role="dialog" aria-modal="true" aria-labelledby="booking-modal-heading" style={{ position:'relative', background:'#ffffff', borderRadius:20, padding:'32px', maxWidth:520, width:'100%', maxHeight:'85vh', overflowY:'auto', boxShadow:'0 32px 80px rgba(0,0,0,0.25)', marginTop:40, border:'1px solid rgba(0,0,0,0.08)' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
          <div>
            <h2 id="booking-modal-heading" style={{ fontFamily:'var(--font-sans)', fontSize:22, fontWeight:600, letterSpacing:'-0.02em', marginBottom:4 }}>Book a Call</h2>
            <p style={{ color:'var(--mid)', fontSize:13 }}>Free 15 or 30 minute consultation</p>
          </div>
          <button onClick={() => setBookModal(false)} style={{ background:'none', border:'none', color:'var(--mid)', cursor:'pointer', fontSize:24, lineHeight:1, padding:4 }}>×</button>
        </div>
        <BookingWidget onClose={() => setBookModal(false)} />
      </div>
    </div>
  )}
  </>
  )
}
