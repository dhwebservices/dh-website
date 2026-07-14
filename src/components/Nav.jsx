import { lazy, Suspense, useState, useEffect, useMemo, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useWebsitePages } from '../hooks/useWebsitePages'
import BrandLogo from './BrandLogo'

const BookingWidget = lazy(() => import('./BookingWidget').then((module) => ({ default: module.BookingWidget })))

const LINKS = [
  { to: '/services',   label: 'Services' },
  { to: '/portfolio',  label: 'Portfolio' },
  { to: '/pricing',    label: 'Pricing' },
  { to: '/about',      label: 'About' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [desktopMenuOpen, setDesktopMenuOpen] = useState(false)
  const [bookModal, setBookModal] = useState(false)
  const desktopMenuRef = useRef(null)
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
    ...LINKS,
    ...customLinks,
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
  useEffect(() => {
    setOpen(false)
    setDesktopMenuOpen(false)
  }, [loc])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])
  useEffect(() => {
    if (!bookModal && !open && !desktopMenuOpen) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setBookModal(false)
      if (event.key === 'Escape') setOpen(false)
      if (event.key === 'Escape') setDesktopMenuOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [bookModal, open, desktopMenuOpen])
  useEffect(() => {
    if (!desktopMenuOpen) return undefined

    const onPointerDown = (event) => {
      if (!desktopMenuRef.current?.contains(event.target)) {
        setDesktopMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [desktopMenuOpen])

  return (
    <>
      <header className={`site-header${scrolled || open ? ' is-solid' : ''}`}>
        <div className="site-header__inner">
        <Link to="/" aria-label="DH Website Services" style={{ flex: 1, minWidth: 0 }}>
          <BrandLogo compact />
        </Link>

        <div className="nav-links site-nav" ref={desktopMenuRef}>
          <button
            type="button"
            className={`site-nav__trigger${desktopMenuOpen ? ' is-open' : ''}`}
            aria-label="Open site navigation"
            aria-expanded={desktopMenuOpen}
            aria-controls="desktop-navigation"
            onClick={() => setDesktopMenuOpen((value) => !value)}
          >
            <span>Browse</span>
            <span className="site-nav__chevron" aria-hidden="true">⌄</span>
          </button>

          {desktopMenuOpen && (
            <nav id="desktop-navigation" className="site-nav__menu" aria-label="Primary navigation">
              {navLinks.map(l => (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`site-nav__menu-link${l.accent ? ' is-accent' : ''}${loc.pathname === l.to ? ' is-active' : ''}`}
                >
                  <span>{l.label}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              ))}
            </nav>
          )}
        </div>

        <div className="site-header__actions">
          <Link to="/contact?mode=brief#brief" className="btn-primary show-mob site-header__mobile-cta">
            Start brief
          </Link>
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
    <div className="booking-modal-shell">
      <div onClick={() => setBookModal(false)} className="booking-modal-backdrop" />
      <div role="dialog" aria-modal="true" aria-labelledby="booking-modal-heading" className="booking-modal-card">
        <div className="booking-modal-head">
          <div>
            <h2 id="booking-modal-heading" style={{ fontFamily:'var(--font-sans)', fontSize:22, fontWeight:600, letterSpacing:'-0.02em', marginBottom:4 }}>Book a Call</h2>
            <p style={{ color:'var(--mid)', fontSize:13 }}>Free 15 or 30 minute consultation</p>
          </div>
          <button onClick={() => setBookModal(false)} className="booking-modal-close">×</button>
        </div>
        <Suspense fallback={<div style={{ padding: '24px 0', color: 'var(--mid)', fontSize: 14 }}>Loading booking options…</div>}>
          <BookingWidget onClose={() => setBookModal(false)} />
        </Suspense>
      </div>
    </div>
  )}
  </>
  )
}
