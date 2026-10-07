import { Link, useLocation } from 'react-router-dom'
import { getIndexablePage } from '../lib/seoContent'
import NotFound from './NotFound'

// Guides and case studies. The body is the same markdown subset the static
// prerender reads, so a crawler and a visitor see the same words.

function inline(text, keyBase) {
  const parts = []
  const pattern = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g
  let last = 0
  let match
  let i = 0
  while ((match = pattern.exec(text))) {
    if (match.index > last) parts.push(text.slice(last, match.index))
    const key = `${keyBase}-${i++}`
    if (match[1]) {
      parts.push(<strong key={key} style={{ color: 'var(--dark)' }}>{match[1]}</strong>)
    } else if (match[3].startsWith('/')) {
      parts.push(<Link key={key} to={match[3]} style={{ color: 'var(--accent)', textDecoration: 'underline' }}>{match[2]}</Link>)
    } else {
      parts.push(<a key={key} href={match[3]} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>{match[2]}</a>)
    }
    last = pattern.lastIndex
  }
  if (last < text.length) parts.push(text.slice(last))
  return parts
}

function renderBody(body) {
  const blocks = []
  let list = null
  const flush = () => {
    if (!list) return
    const Tag = list.tag
    blocks.push(
      <Tag key={`list-${blocks.length}`} style={{ margin: '0 0 20px', paddingLeft: 22 }}>
        {list.items.map((item, i) => (
          <li key={i} className="body-md" style={{ marginBottom: 8, lineHeight: 1.75 }}>{inline(item, `li-${blocks.length}-${i}`)}</li>
        ))}
      </Tag>,
    )
    list = null
  }

  body.split('\n').forEach((raw, index) => {
    const line = raw.trim()
    if (!line) return flush()
    if (line.startsWith('### ')) {
      flush()
      blocks.push(<h3 key={index} style={{ fontSize: 19, fontWeight: 600, margin: '28px 0 10px', letterSpacing: '-0.01em' }}>{inline(line.slice(4), `h3-${index}`)}</h3>)
      return
    }
    if (line.startsWith('## ')) {
      flush()
      blocks.push(<h2 key={index} style={{ fontSize: 'clamp(24px,3vw,30px)', fontWeight: 600, margin: '44px 0 14px', letterSpacing: '-0.02em' }}>{inline(line.slice(3), `h2-${index}`)}</h2>)
      return
    }
    const bullet = line.startsWith('- ') ? ['ul', line.slice(2)] : /^\d+\.\s/.test(line) ? ['ol', line.replace(/^\d+\.\s/, '')] : null
    if (bullet) {
      if (!list || list.tag !== bullet[0]) {
        flush()
        list = { tag: bullet[0], items: [] }
      }
      list.items.push(bullet[1])
      return
    }
    flush()
    blocks.push(<p key={index} className="body-md" style={{ margin: '0 0 18px', lineHeight: 1.8 }}>{inline(line, `p-${index}`)}</p>)
  })
  flush()
  return blocks
}

export default function ArticlePage() {
  const { pathname } = useLocation()
  const page = getIndexablePage(pathname)
  if (!page?.article) return <NotFound />

  const { kind, published } = page.article
  const isIndex = !published
  const parent = pathname.startsWith('/case-studies') ? { to: '/case-studies', label: 'Case studies' } : { to: '/guides', label: 'Guides' }

  return (
    <main style={{ paddingTop: 'var(--nav-h)' }}>
      <section className="section">
        <article className="container" style={{ maxWidth: 760 }}>
          <p className="eyebrow" style={{ marginBottom: 16 }}>
            {isIndex ? kind : <Link to={parent.to} style={{ color: 'inherit' }}>{parent.label}</Link>}
          </p>
          <h1 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(36px,5.5vw,64px)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 20 }}>
            {page.heading}
          </h1>
          <p className="body-lg" style={{ marginBottom: published ? 12 : 32 }}>{page.intro}</p>
          {published && (
            <p className="body-sm" style={{ marginBottom: 32 }}>
              {new Date(published).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} · DH Website Services
            </p>
          )}
          {renderBody(page.article.body)}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 40 }}>
            <Link to={page.ctaHref} className="btn-primary">{page.ctaLabel} <span style={{ opacity: 0.7 }}>→</span></Link>
            {!isIndex && <Link to={parent.to} className="btn-secondary">More {parent.label.toLowerCase()}</Link>}
          </div>
        </article>
      </section>
    </main>
  )
}
