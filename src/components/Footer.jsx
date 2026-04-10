import { Link } from 'react-router-dom'
import MicrosoftPartnerBadge from './MicrosoftPartnerBadge'

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
            <img
              src="/dh-logo.png"
              alt="DH Website Services"
              style={{ height: 18, filter: 'brightness(0)', marginBottom: 16 }}
            />
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
