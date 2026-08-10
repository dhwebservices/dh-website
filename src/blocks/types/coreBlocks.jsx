/**
 * Generic blocks that can go on any page.
 *
 * These are the ones you reach for when adding something new rather than
 * editing what is already there. They use the site's existing utility classes
 * so anything built from them matches the rest of the site by default.
 */

import { Link } from 'react-router-dom'

export function RichTextBlock({ eyebrow, heading, body, align, background }) {
  return (
    <section className="section" style={background ? { background } : undefined}>
      <div className="container section-narrow" style={{ textAlign: align || 'left' }}>
        {eyebrow ? <p className="eyebrow" style={{ marginBottom: 12 }}>{eyebrow}</p> : null}
        {heading ? <h2 className="headline-lg" style={{ marginBottom: 16 }}>{heading}</h2> : null}
        {String(body || '')
          .split(/\n{2,}/)
          .map((paragraph) => paragraph.trim())
          .filter(Boolean)
          .map((paragraph, i) => (
            <p key={i} className="body-md" style={{ marginBottom: 14 }}>{paragraph}</p>
          ))}
      </div>
    </section>
  )
}

export function ImageBlock({ src, alt, caption, maxWidth, rounded }) {
  if (!src) return null
  return (
    <section className="section">
      <div className="container" style={{ textAlign: 'center' }}>
        <img
          src={src}
          alt={alt || ''}
          style={{ width: '100%', maxWidth: maxWidth || 960, height: 'auto', borderRadius: rounded ? 20 : 0, display: 'block', margin: '0 auto' }}
        />
        {caption ? (
          <p className="body-sm" style={{ marginTop: 12, color: 'var(--light)' }}>{caption}</p>
        ) : null}
      </div>
    </section>
  )
}

export function CtaBlock({ heading, body, primaryLabel, primaryHref, secondaryLabel, secondaryHref, tone }) {
  const dark = tone !== 'light'
  return (
    <section className="section" style={{ background: dark ? 'var(--dark)' : 'var(--cream)' }}>
      <div className="container section-narrow" style={{ textAlign: 'center' }}>
        <h2 className="headline-lg" style={{ marginBottom: 14, color: dark ? 'var(--white)' : undefined }}>{heading}</h2>
        {body ? (
          <p className="body-md" style={{ marginBottom: 28, color: dark ? 'rgba(255,255,255,0.72)' : undefined }}>{body}</p>
        ) : null}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          {primaryLabel ? <Link to={primaryHref || '/contact'} className="btn-primary">{primaryLabel}</Link> : null}
          {secondaryLabel ? <Link to={secondaryHref || '/pricing'} className="btn-secondary">{secondaryLabel}</Link> : null}
        </div>
      </div>
    </section>
  )
}

export function ColumnsBlock({ columns, background }) {
  const list = columns || []
  return (
    <section className="section" style={background ? { background } : undefined}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(240px, 1fr))`, gap: 'clamp(20px,3vw,32px)' }}>
          {list.map((column, i) => (
            <div key={i}>
              {column.heading ? (
                <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 8, letterSpacing: '-0.01em' }}>{column.heading}</h3>
              ) : null}
              <p className="body-sm">{column.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function SpacerBlock({ height }) {
  return <div aria-hidden style={{ height: Number(height) || 48 }} />
}

/**
 * Escape hatch for one-off markup. Rendered as-is, so it is director-only in
 * the editor - anything pasted here runs on the live site.
 */
export function HtmlBlock({ html }) {
  if (!html) return null
  return (
    <section className="section">
      <div className="container" dangerouslySetInnerHTML={{ __html: html }} />
    </section>
  )
}

/**
 * Free-positioning area. Children are placed by percentage on a fixed-aspect
 * canvas, so it scales with the viewport instead of breaking below a hard pixel
 * width. This is the "put it anywhere" escape hatch, deliberately scoped to one
 * block rather than the whole page.
 */
export function CanvasBlock({ height, background, items }) {
  return (
    <section style={{ position: 'relative', width: '100%', height: Number(height) || 480, background: background || 'transparent', overflow: 'hidden' }}>
      {(items || []).map((item, i) => (
        <div
          key={item.id || i}
          style={{
            position: 'absolute',
            left: `${item.x ?? 0}%`,
            top: `${item.y ?? 0}%`,
            width: item.w ? `${item.w}%` : 'auto',
            transform: 'translate(-50%, -50%)',
            textAlign: item.align || 'left',
          }}
        >
          {item.kind === 'image' && item.src ? (
            <img src={item.src} alt={item.alt || ''} style={{ width: '100%', height: 'auto', display: 'block' }} />
          ) : (
            <div style={{ fontSize: item.fontSize || 18, fontWeight: item.weight || 400, color: item.color || 'inherit', lineHeight: 1.4 }}>
              {item.text}
            </div>
          )}
        </div>
      ))}
    </section>
  )
}
