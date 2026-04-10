import { Link } from 'react-router-dom'
import MicrosoftPartnerBadge from '../components/MicrosoftPartnerBadge'
import { useReveal } from '../hooks/useReveal'

const PARTNER_POINTS = [
  [
    'Microsoft-aware builds',
    'We can shape websites and business tools around the Microsoft products many UK teams already use every day.',
  ],
  [
    'Practical integration planning',
    'That includes workflows around Microsoft 365, Outlook, Teams, Bookings, forms, automation, and internal admin handoffs.',
  ],
  [
    'Commercial delivery first',
    'The point is not to add complexity. It is to make your website fit your operating stack so leads, bookings, and staff processes move cleanly.',
  ],
]

const AREAS = [
  'Microsoft 365-aligned client workflows',
  'Outlook and calendar-based booking journeys',
  'Teams-ready internal handover processes',
  'Azure-friendly hosting and deployment planning',
  'Operational websites for service businesses and growing teams',
  'Clear fixed-scope delivery without agency layers',
]

export default function Partners() {
  useReveal()

  return (
    <main>
      <section
        style={{
          padding: `calc(var(--nav-h) + clamp(44px,7vw,92px)) clamp(20px,5vw,60px) clamp(60px,8vw,90px)`,
          background:
            'linear-gradient(180deg, rgba(245,245,247,0.8) 0%, rgba(255,255,255,1) 42%, rgba(255,255,255,1) 100%)',
          borderBottom: '1px solid var(--border-light)',
        }}
      >
        <div
          className="reveal partners-hero-grid"
          style={{
            maxWidth: 'var(--max-w)',
            margin: '0 auto',
            gap: 'clamp(28px,4vw,56px)',
            alignItems: 'center',
          }}
        >
          <div>
            <p className="eyebrow" style={{ marginBottom: 18 }}>
              Microsoft approved partner
            </p>
            <h1
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(38px,6vw,74px)',
                fontWeight: 600,
                letterSpacing: '-0.04em',
                lineHeight: 0.98,
                marginBottom: 22,
                maxWidth: 700,
              }}
            >
              Websites that fit the Microsoft stack your business already runs on.
            </h1>
            <p
              style={{
                fontSize: 'clamp(16px,1.5vw,19px)',
                lineHeight: 1.7,
                color: 'var(--dark2)',
                maxWidth: 620,
                marginBottom: 34,
              }}
            >
              DH Website Services is a Microsoft approved partner. For clients already working inside
              Microsoft tools, that means we can build with those operational realities in mind instead
              of forcing a disconnected website on top.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn-primary">
                Discuss your project
              </Link>
              <Link to="/services" className="btn-secondary">
                View services
              </Link>
            </div>
          </div>

          <div
            className="reveal"
            style={{
              padding: 'clamp(24px,3vw,34px)',
              borderRadius: 28,
              border: '1px solid var(--border-light)',
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(245,245,247,0.95) 100%)',
              boxShadow: '0 18px 40px rgba(29,29,31,0.06)',
            }}
          >
            <MicrosoftPartnerBadge width={320} />
            <div
              style={{
                marginTop: 24,
                display: 'grid',
                gap: 14,
                paddingTop: 22,
                borderTop: '1px solid var(--border-light)',
              }}
            >
              {[
                'Direct founder-led delivery',
                'Fixed pricing and scoped outcomes',
                'Built for UK service businesses and growing teams',
              ].map((item) => (
                <div key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span
                    aria-hidden
                    style={{
                      width: 9,
                      height: 9,
                      borderRadius: '50%',
                      background: 'var(--accent)',
                      marginTop: 7,
                      flexShrink: 0,
                    }}
                  />
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--dark2)' }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="reveal" style={{ maxWidth: 820, marginBottom: 42 }}>
            <p className="eyebrow" style={{ marginBottom: 12 }}>
              What this means
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(30px,4vw,52px)',
                fontWeight: 600,
                letterSpacing: '-0.03em',
                lineHeight: 1.08,
                marginBottom: 16,
              }}
            >
              A better fit for businesses already running on Microsoft.
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--mid)', maxWidth: 720 }}>
              A lot of small and mid-sized businesses already depend on Microsoft for email, calendars,
              files, team collaboration, and day-to-day operations. The partnership gives that a clear
              home on our website because it is now part of how we position and deliver work.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 18 }}>
            {PARTNER_POINTS.map(([title, body]) => (
              <div
                key={title}
                className="reveal glass-card"
                style={{ padding: '26px 24px', minHeight: 220, display: 'flex', flexDirection: 'column' }}
              >
                <p
                  style={{
                    fontSize: 12,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: 'var(--light)',
                    marginBottom: 14,
                  }}
                >
                  Partner benefit
                </p>
                <h3
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 22,
                    fontWeight: 600,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.12,
                    marginBottom: 12,
                  }}
                >
                  {title}
                </h3>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--dark2)' }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="section"
        style={{ background: 'var(--cream)', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}
      >
        <div
          className="container partners-fit-grid"
          style={{ gap: 32, alignItems: 'start' }}
        >
          <div className="reveal">
            <p className="eyebrow" style={{ marginBottom: 12 }}>
              Typical fit
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(30px,4vw,48px)',
                fontWeight: 600,
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                marginBottom: 16,
              }}
            >
              Best suited to businesses that want a joined-up website, not another isolated tool.
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--mid)', maxWidth: 560 }}>
              If your team already lives in Microsoft products, the website should respect that. We can
              scope around operational realities from the start rather than fixing them after launch.
            </p>
          </div>

          <div
            className="reveal"
            style={{
              borderRadius: 26,
              padding: '28px clamp(22px,3vw,30px)',
              background: 'white',
              border: '1px solid var(--border-light)',
            }}
          >
            <div style={{ display: 'grid', gap: 14 }}>
              {AREAS.map((item) => (
                <div key={item} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span
                    aria-hidden
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 999,
                      background: 'var(--accent-soft)',
                      border: '1px solid rgba(0,113,227,0.14)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent)',
                      fontSize: 11,
                      fontWeight: 700,
                      flexShrink: 0,
                      marginTop: 2,
                    }}
                  >
                    +
                  </span>
                  <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--dark2)' }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--dark)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: 720 }}>
          <div className="reveal">
            <p className="eyebrow" style={{ color: 'rgba(255,255,255,0.35)', marginBottom: 18 }}>
              Start with the right stack
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(34px,4.5vw,58px)',
                fontWeight: 600,
                letterSpacing: '-0.03em',
                lineHeight: 1.06,
                color: 'white',
                marginBottom: 18,
              }}
            >
              Need a website that works cleanly with your Microsoft-led workflow?
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'rgba(255,255,255,0.58)', marginBottom: 34 }}>
              Tell us how your team operates today and we can scope the site around that from day one.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn-primary" style={{ background: 'white', color: 'var(--dark)' }}>
                Book a free call
              </Link>
              <Link
                to="/calculator"
                className="btn-secondary"
                style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)' }}
              >
                Get a quote
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
