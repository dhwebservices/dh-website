import { BookingWidget } from './BookingWidget'
import { useState, useEffect, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useWebsitePages } from '../hooks/useWebsitePages'

const LINKS = [
  { to: '/services',   label: 'Services' },
  { to: '/about',      label: 'About' },
  { to: '/partners',   label: 'Partners' },
  { to: '/portfolio',  label: 'Portfolio' },
  { to: '/shop',       label: 'Shop' },
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
  const customLinks = useMemo(() => (
    pages
      .filter((page) => page.show_in_nav)
      .map((page) => ({
        to: `/${page.slug}`,
        label: page.nav_label || page.title,
      }))
  ), [pages])
  const navLinks = useMemo(() => ([
    ...LINKS.slice(0, 4),
    ...customLinks,
    ...LINKS.slice(4),
  ]), [customLinks])

  useEffect(() => {
    let ticking = false

    const update = () => {
      setScrolled(window.scrollY > 12)
      ticking = false
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => setOpen(false), [loc])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])
  useEffect(() => {
    if (!bookModal && !open) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setBookModal(false)
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [bookModal, open])

  return (
    <>
      <header className={`site-header${scrolled || open ? ' is-solid' : ''}`}>
        <div className="site-header__inner">
        <Link to="/" style={{ flex: 1, minWidth: 0 }}>
          <img src="/dh-logo.png" alt="DH Website Services"
            style={{ height: 20, filter: 'brightness(0)', transition: 'filter 0.3s' }} />
        </Link>

        <nav className="nav-links site-nav" aria-label="Primary navigation">
          {navLinks.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`site-nav__link${l.accent ? ' is-accent' : ''}${loc.pathname === l.to ? ' is-active' : ''}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="site-header__actions">
          <a href="https://app.dhwebsiteservices.co.uk" target="_blank" rel="noreferrer"
            className="site-header__signin hide-mob"
          >Sign in</a>
          <button onClick={() => setBookModal(true)} className="site-header__ghost hide-mob">
            Book a call
          </button>
          <Link to="/contact" className="btn-primary hide-mob" style={{ padding: '10px 18px', fontSize: 14, fontWeight: 500 }}>
            Get started
          </Link>

          <button
            onClick={() => setOpen(o => !o)}
            className={`hamburger${open ? ' is-open' : ''}`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            {[0,1,2].map(i => (
              <span key={i} />
            ))}
          </button>
        </div>
        </div>
      </header>

      {open && (
        <>
          <button
            type="button"
            className="mob-menu-backdrop"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <div id="mobile-navigation" className="mob-menu" aria-label="Mobile navigation">
            <div className="mob-menu__eyebrow">Menu</div>
            <nav className="mob-menu__links">
              {navLinks.map(l => (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`mob-menu__link${loc.pathname === l.to ? ' is-active' : ''}`}
                >
                  <span>{l.label}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              ))}
            </nav>
            <div className="mob-menu__actions">
              <button onClick={() => { setOpen(false); setBookModal(true) }} className="site-header__ghost">
                Book a call
              </button>
              <Link to="/contact" className="btn-primary" style={{ justifyContent: 'center' }}>Get started</Link>
              <a href="https://app.dhwebsiteservices.co.uk" target="_blank" rel="noreferrer" className="btn-secondary" style={{ justifyContent: 'center' }}>Client login</a>
            </div>
          </div>
        </>
      )}

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
