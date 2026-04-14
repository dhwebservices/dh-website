import { useParams } from 'react-router-dom'
import { useWebsitePages } from '../hooks/useWebsitePages'
import NotFound from './NotFound'

const RESERVED_SLUGS = new Set([
  '',
  'services',
  'about',
  'partners',
  'portfolio',
  'pricing',
  'calculator',
  'careers',
  'contact',
  'privacy',
  'terms',
  'services-terms',
  'refunds',
  'cookies',
  'acceptable-use',
  'accessibility',
  'security',
  'complaints',
  'appointment',
])

function paragraphize(content) {
  return String(content || '')
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
}

export default function ManagedPage() {
  const { slug } = useParams()
  const { pages, loading } = useWebsitePages()

  if (!slug || RESERVED_SLUGS.has(slug)) {
    return <NotFound />
  }

  if (loading) {
    return (
      <main style={{ paddingTop: 'var(--nav-h)' }}>
        <section className="section">
          <div className="container section-narrow">
            <p className="body-md">Loading page…</p>
          </div>
        </section>
      </main>
    )
  }

  const page = pages.find((entry) => entry.slug === slug)

  if (!page) {
    return <NotFound />
  }

  const blocks = paragraphize(page.body)

  return (
    <main style={{ paddingTop: 'var(--nav-h)' }}>
      <section className="section" style={{ paddingBottom: 'clamp(40px,5vw,64px)' }}>
        <div className="container section-narrow">
          <p className="eyebrow" style={{ marginBottom: 16 }}>
            {page.nav_label || 'Page'}
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(40px,6vw,80px)',
              fontWeight: 600,
              letterSpacing: '-0.03em',
              lineHeight: 1.0,
              marginBottom: 20,
            }}
          >
            {page.title}
          </h1>
          {page.summary && <p className="body-lg">{page.summary}</p>}
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container section-narrow">
          <div className="glass-card" style={{ padding: 'clamp(28px,4vw,40px)' }}>
            {blocks.map((block, index) => (
              <p
                key={`${page.slug}-${index}`}
                className="body-md"
                style={{ marginBottom: index < blocks.length - 1 ? 18 : 0 }}
              >
                {block}
              </p>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
