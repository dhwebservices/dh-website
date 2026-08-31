import { Link } from 'react-router-dom'
import MicrosoftPartnerBadge from './MicrosoftPartnerBadge'
import BrandLogo from './BrandLogo'
import { GEO_CITY_LINKS } from '../lib/seoContent'

const LEGAL = [
  { l: 'Privacy', to: '/privacy' },
  { l: 'Terms', to: '/terms' },
  { l: 'Services Terms', to: '/services-terms' },
  { l: 'Refunds', to: '/refunds' },
  { l: 'Cookies', to: '/cookies' },
  { l: 'Acceptable Use', to: '/acceptable-use' },
  { l: 'Accessibility', to: '/accessibility' },
  { l: 'Security', to: '/security' },
  { l: 'Complaints', to: '/complaints' },
]

const COMPANY = [
  { l: 'About', to: '/about' },
  { l: 'Partners', to: '/partners' },
  { l: 'Portfolio', to: '/portfolio' },
  { l: 'Contact', to: '/contact' },
]

const AREAS = GEO_CITY_LINKS.map((page) => ({
  label: page.city,
  to: page.to,
}))

export default function Footer() {
  return (
    <footer style={{ background: 'var(--cream)', borderTop: '1px solid var(--border-light)' }}>
      <div
        style={{
          maxWidth: 'var(--max-w)',
          margin: '0 auto',
          padding: 'clamp(48px,6vw,72px) clamp(20px,5vw,60px) 32px',
        }}
      >
        <div className="footer-grid" style={{ gap: 40, marginBottom: 48 }}>
          <div>
            <div style={{ marginBottom: 16 }}>
              <BrandLogo compact />
            </div>
            <p
              style={{
                fontSize: 14,
                lineHeight: 1.7,
                color: 'var(--mid)',
                maxWidth: 280,
                marginBottom: 20,
              }}
            >
              Production-ready websites that work as hard as you do. Built in Wales, serving clients
              across the UK.
            </p>
            <div style={{ marginBottom: 20 }}>
              <MicrosoftPartnerBadge width={180} framed />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              <a
                href="mailto:clients@dhwebsiteservices.co.uk"
                style={{ fontSize: 13, color: 'var(--mid)', transition: 'color 0.15s' }}
                onMouseOver={(e) => (e.currentTarget.style.color = 'var(--dark)')}
                onMouseOut={(e) => (e.currentTarget.style.color = 'var(--mid)')}
              >
                clients@dhwebsiteservices.co.uk
              </a>
              <a
                href="tel:02920024218"
                style={{ fontSize: 13, color: 'var(--mid)', transition: 'color 0.15s' }}
                onMouseOver={(e) => (e.currentTarget.style.color = 'var(--dark)')}
                onMouseOut={(e) => (e.currentTarget.style.color = 'var(--mid)')}
              >
                029 2002 4218
              </a>
              <a
                href="tel:07364166285"
                style={{ fontSize: 13, color: 'var(--mid)', transition: 'color 0.15s' }}
                onMouseOver={(e) => (e.currentTarget.style.color = 'var(--dark)')}
                onMouseOut={(e) => (e.currentTarget.style.color = 'var(--mid)')}
              >
                07364 166285
              </a>
              <div style={{ fontSize: 13, color: 'var(--mid)', marginTop: 8 }}>
                <div style={{ fontWeight: 500, marginBottom: 2 }}>Cardiff Office</div>
                <div>Cardiff, Wales, UK</div>
              </div>
            </div>
            <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid var(--border-light)' }}>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--light)',
                  marginBottom: 12,
                }}
              >
                Follow Us
              </p>
              <div style={{ display: 'flex', gap: 12 }}>
                <a
                  href="https://linkedin.com/company/dh-website-services"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: 'var(--cream)',
                    border: '1px solid var(--border-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--mid)',
                    transition: 'all 0.15s',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'var(--accent)'
                    e.currentTarget.style.color = 'white'
                    e.currentTarget.style.borderColor = 'var(--accent)'
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'var(--cream)'
                    e.currentTarget.style.color = 'var(--mid)'
                    e.currentTarget.style.borderColor = 'var(--border-light)'
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a
                  href="https://facebook.com/dhwebsiteservices"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: 'var(--cream)',
                    border: '1px solid var(--border-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--mid)',
                    transition: 'all 0.15s',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'var(--accent)'
                    e.currentTarget.style.color = 'white'
                    e.currentTarget.style.borderColor = 'var(--accent)'
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'var(--cream)'
                    e.currentTarget.style.color = 'var(--mid)'
                    e.currentTarget.style.borderColor = 'var(--border-light)'
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                  </svg>
                </a>
                <a
                  href="https://twitter.com/dhwebservices"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter / X"
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: 'var(--cream)',
                    border: '1px solid var(--border-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--mid)',
                    transition: 'all 0.15s',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'var(--accent)'
                    e.currentTarget.style.color = 'white'
                    e.currentTarget.style.borderColor = 'var(--accent)'
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'var(--cream)'
                    e.currentTarget.style.color = 'var(--mid)'
                    e.currentTarget.style.borderColor = 'var(--border-light)'
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--light)',
                marginBottom: 14,
              }}
            >
              Company
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {COMPANY.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  style={{ fontSize: 14, color: 'var(--mid)', transition: 'color 0.15s' }}
                  onMouseOver={(e) => (e.currentTarget.style.color = 'var(--dark)')}
                  onMouseOut={(e) => (e.currentTarget.style.color = 'var(--mid)')}
                >
                  {item.l}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--light)',
                marginBottom: 14,
              }}
            >
              Areas
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {AREAS.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  style={{ fontSize: 14, color: 'var(--mid)', transition: 'color 0.15s' }}
                  onMouseOver={(e) => (e.currentTarget.style.color = 'var(--dark)')}
                  onMouseOut={(e) => (e.currentTarget.style.color = 'var(--mid)')}
                >
                  Web design {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--light)',
                marginBottom: 14,
              }}
            >
              Access
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Link
                to="/services"
                style={{ fontSize: 14, color: 'var(--mid)', transition: 'color 0.15s' }}
                onMouseOver={(e) => (e.currentTarget.style.color = 'var(--dark)')}
                onMouseOut={(e) => (e.currentTarget.style.color = 'var(--mid)')}
              >
                Services
              </Link>
              <Link
                to="/pricing"
                style={{ fontSize: 14, color: 'var(--mid)', transition: 'color 0.15s' }}
                onMouseOver={(e) => (e.currentTarget.style.color = 'var(--dark)')}
                onMouseOut={(e) => (e.currentTarget.style.color = 'var(--mid)')}
              >
                Pricing
              </Link>
              <Link
                to="/calculator"
                style={{ fontSize: 14, color: 'var(--mid)', transition: 'color 0.15s' }}
                onMouseOver={(e) => (e.currentTarget.style.color = 'var(--dark)')}
                onMouseOut={(e) => (e.currentTarget.style.color = 'var(--mid)')}
              >
                Get a quote
              </Link>
              <a
                href="https://portal.dhwebsiteservices.co.uk"
                target="_blank"
                rel="noreferrer"
                style={{ fontSize: 14, color: 'var(--mid)', transition: 'color 0.15s' }}
                onMouseOver={(e) => (e.currentTarget.style.color = 'var(--dark)')}
                onMouseOut={(e) => (e.currentTarget.style.color = 'var(--mid)')}
              >
                Client Portal
              </a>
            </div>
          </div>

          <div>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--light)',
                marginBottom: 14,
              }}
            >
              Hours
            </p>
            <div style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 13, color: 'var(--mid)', marginBottom: 2 }}>Monday - Friday</div>
              <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--dark)' }}>9am - 5pm GMT</div>
            </div>
            <div>
              <div style={{ fontSize: 13, color: 'var(--mid)', marginBottom: 2 }}>Weekends</div>
              <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--dark)' }}>Next business day</div>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: 24 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 16px', marginBottom: 16 }}>
            {LEGAL.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                style={{ fontSize: 12, color: 'var(--light)', transition: 'color 0.15s' }}
                onMouseOver={(e) => (e.currentTarget.style.color = 'var(--mid)')}
                onMouseOut={(e) => (e.currentTarget.style.color = 'var(--light)')}
              >
                {item.l}
              </Link>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
            <p style={{ fontSize: 12, color: 'var(--light)' }}>
              © 2026 DH Website Services (David Hooper Home Limited, Co. No. 17018784)
            </p>
            <p style={{ fontSize: 12, color: 'var(--light)' }}>Cardiff, Wales</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
