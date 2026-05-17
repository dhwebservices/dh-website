import { Link, useLocation } from 'react-router-dom'
import { getIndexablePage } from '../lib/seoContent'
import { useReveal } from '../hooks/useReveal'
import NotFound from './NotFound'

export default function GeoPage() {
  useReveal()
  const { pathname } = useLocation()
  const page = getIndexablePage(pathname)

  if (!page || !pathname.startsWith('/website-builder')) {
    return <NotFound />
  }

  return (
    <main style={{ paddingTop: 'var(--nav-h)' }}>
      <section className="section">
        <div className="container" style={{ maxWidth: 860 }}>
          <div className="reveal">
            <p className="eyebrow" style={{ marginBottom: 16 }}>
              {page.city ? `${page.city} website builder` : 'Website builder UK'}
            </p>
            <h1
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(40px,6vw,78px)',
                fontWeight: 600,
                letterSpacing: '-0.03em',
                lineHeight: 1.02,
                marginBottom: 20,
                maxWidth: 900,
              }}
            >
              {page.heading}
            </h1>
            <p className="body-lg" style={{ maxWidth: 720, marginBottom: 32 }}>
              {page.intro}
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to={page.ctaHref} className="btn-primary">
                {page.ctaLabel} <span style={{ opacity: 0.7 }}>→</span>
              </Link>
              <Link to="/services" className="btn-secondary">
                View services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container pricing-grid-two" style={{ gap: 20, alignItems: 'start' }}>
          {page.sections.map((section, index) => (
            <article
              key={section.title}
              className="reveal glass-card"
              style={{
                padding: '28px clamp(22px,3vw,32px)',
                borderRadius: 20,
                transitionDelay: `${index * 0.07}s`,
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--light)',
                  marginBottom: 14,
                }}
              >
                {section.title}
              </p>
              <p className="body-sm" style={{ fontSize: 15, lineHeight: 1.75 }}>
                {section.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        className="section"
        style={{ background: 'var(--cream)', borderTop: '1px solid var(--border-light)' }}
      >
        <div className="container" style={{ maxWidth: 860 }}>
          <div className="reveal" style={{ marginBottom: 32 }}>
            <p className="eyebrow" style={{ marginBottom: 12 }}>Why this page exists</p>
            <h2 className="headline-md" style={{ marginBottom: 14 }}>
              Search intent matched to a real service.
            </h2>
            <p className="body-md" style={{ maxWidth: 700 }}>
              These pages target businesses searching for a website builder in a specific area,
              but the offer is still the same: custom website delivery, technical SEO, fixed
              pricing, and direct founder-led communication.
            </p>
          </div>
          <div className="reveal" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link to="/pricing" className="btn-primary">
              View pricing
            </Link>
            <Link to="/contact?mode=brief#brief" className="btn-secondary">
              Send a brief
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
