/**
 * Blocks for the apps-and-team version of the site.
 *
 * Work showcase: the products we have built and run ourselves, with real
 * screenshots and app icons rather than a grid of text cards. The first item
 * is shown large; the rest sit underneath as a row.
 *
 * Team: the people a client actually deals with. Initials stand in until
 * there are real photos -- set `photo` on a person and it is used instead.
 *
 * Both follow the same rule as the rest of the site: words and lists are
 * props, markup is not, so the portal editor can change the copy without
 * being able to break the layout.
 */

import { Link } from 'react-router-dom'

function Lines({ text }) {
  const parts = String(text ?? '').split('\n')
  return parts.map((part, i) => (
    <span key={i}>
      {part}
      {i < parts.length - 1 ? <br /> : null}
    </span>
  ))
}

/** Store and status labels are facts, so they get a colour that says which. */
const TONES = {
  live: '#2E7D4F',
  beta: '#B26A00',
  internal: '#555D60',
}

function StatusPill({ status, tone, onDark }) {
  if (!status) return null
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', color: onDark ? 'rgba(255,255,255,0.75)' : 'var(--mid)' }}>
      <span aria-hidden style={{ width: 7, height: 7, borderRadius: '50%', background: TONES[tone] || TONES.internal, flexShrink: 0 }} />
      {status}
    </span>
  )
}

function splitPoints(points) {
  if (Array.isArray(points)) return points
  return String(points || '').split('·').map((p) => p.trim()).filter(Boolean)
}

const STATIC_PATHS = ['/famandahalf']

function SmartLink({ href, children, className, style }) {
  if (!href) return null
  if (/^https?:/.test(href)) {
    return <a href={href} target="_blank" rel="noreferrer" className={className} style={style}>{children}</a>
  }
  // Static pages outside the React app (e.g. /famandahalf/) need a real page
  // load: a router <Link> would look for a route that doesn't exist.
  if (STATIC_PATHS.some((p) => href.startsWith(p))) {
    return <a href={href} className={className} style={style}>{children}</a>
  }
  return <Link to={href} className={className} style={style}>{children}</Link>
}

function PhoneFrame({ src, alt }) {
  return (
    <div style={{ width: '100%', maxWidth: 260, margin: '0 auto', borderRadius: 38, padding: 9, background: '#0B0E0F', boxShadow: '0 30px 60px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.08)' }}>
      <img src={src} alt={alt || ''} loading="lazy" style={{ display: 'block', width: '100%', borderRadius: 30, aspectRatio: '1320 / 2868', objectFit: 'cover' }} />
    </div>
  )
}

/** A call's route through DH Phone, drawn from a plain "a → b → c" string. */
function FlowVisual({ flow }) {
  const steps = String(flow || '').split('→').map((s) => s.trim()).filter(Boolean)
  return (
    <div style={{ display: 'grid', gap: 6, width: '100%', maxWidth: 240 }}>
      {steps.map((step, i) => (
        <div key={i} style={{ display: 'grid', justifyItems: 'center', gap: 6 }}>
          <div style={{ width: '100%', textAlign: 'center', padding: '8px 12px', borderRadius: 8, background: i === steps.length - 1 ? 'var(--dark)' : 'var(--white)', color: i === steps.length - 1 ? 'white' : 'var(--dark2)', border: '1px solid var(--border)', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.04em' }}>
            {step}
          </div>
          {i < steps.length - 1 ? <span aria-hidden style={{ width: 1, height: 10, background: 'var(--light-decor)' }} /> : null}
        </div>
      ))}
    </div>
  )
}

function CardVisual({ item }) {
  return (
    <div style={{ height: 210, borderRadius: 14, background: item.panel || 'var(--cream)', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 22, overflow: 'hidden', padding: 18 }}>
      {item.flow ? (
        <FlowVisual flow={item.flow} />
      ) : item.icon ? (
        <img src={item.icon} alt={item.iconAlt || ''} loading="lazy" style={{ width: 104, height: 104, borderRadius: 24, boxShadow: '0 12px 30px rgba(20,24,26,0.18)' }} />
      ) : null}
    </div>
  )
}

/* ── Work showcase ─────────────────────────────────────────────────────── */

export function WorkShowcaseBlock({ eyebrow, heading, body, items }) {
  const [feature, ...rest] = items || []

  return (
    <section className="section" style={{ background: 'var(--white)', borderTop: '1px solid var(--border-light)' }}>
      <div className="container">
        <div className="reveal" style={{ maxWidth: 720, marginBottom: 'clamp(36px,5vw,56px)' }}>
          {eyebrow ? <p className="eyebrow" style={{ marginBottom: 16 }}>{eyebrow}</p> : null}
          <h2 className="headline-lg"><Lines text={heading} /></h2>
          {body ? <p className="body-md" style={{ marginTop: 16 }}>{body}</p> : null}
        </div>

        {feature ? (
          <div className="reveal portfolio-hero-grid" style={{ alignItems: 'stretch', gap: 0, borderRadius: 20, overflow: 'hidden', border: '1px solid var(--border-light)', marginBottom: 16 }}>
            <div style={{ padding: 'clamp(28px,4vw,48px)', background: 'var(--cream)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
                {feature.icon ? <img src={feature.icon} alt="" style={{ width: 52, height: 52, borderRadius: 12 }} /> : null}
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,3vw,36px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.05 }}>{feature.name}</h3>
                  {feature.platforms ? <p style={{ fontSize: 13, color: 'var(--mid)', marginTop: 4 }}>{feature.platforms}</p> : null}
                </div>
              </div>
              <div style={{ marginBottom: 16 }}><StatusPill status={feature.status} tone={feature.tone} /></div>
              <p className="body-md" style={{ marginBottom: 20 }}>{feature.desc}</p>
              {splitPoints(feature.points).length > 0 ? (
                <ul style={{ listStyle: 'none', display: 'grid', gap: 8, marginBottom: 28 }}>
                  {splitPoints(feature.points).map((point) => (
                    <li key={point} style={{ display: 'flex', gap: 10, fontSize: 14, lineHeight: 1.55, color: 'var(--dark2)' }}>
                      <span aria-hidden style={{ width: 12, height: 1, background: 'var(--dark2)', marginTop: 10, flexShrink: 0 }} />
                      {point}
                    </li>
                  ))}
                </ul>
              ) : null}
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <SmartLink href={feature.linkHref} className="btn-primary">{feature.linkLabel}</SmartLink>
                <SmartLink href={feature.link2Href} className="btn-secondary">{feature.link2Label}</SmartLink>
              </div>
            </div>
            <div style={{ background: 'linear-gradient(160deg, #1B2326 0%, #0E1315 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, padding: 'clamp(32px,5vw,56px) clamp(20px,4vw,48px)' }}>
              {feature.image ? <PhoneFrame src={feature.image} alt={feature.imageAlt} /> : null}
              {feature.image2 ? (
                <div className="hide-mob" style={{ width: '100%', maxWidth: 220, transform: 'translateY(28px)' }}>
                  <PhoneFrame src={feature.image2} alt={feature.image2Alt} />
                </div>
              ) : null}
            </div>
          </div>
        ) : null}

        {rest.length > 0 ? (
          <div className="pricing-grid-three" style={{ gap: 16 }}>
            {rest.map((item, i) => (
              <article key={item.name || i} className="reveal glass-card" style={{ padding: 18, display: 'flex', flexDirection: 'column', transitionDelay: `${i * 0.06}s` }}>
                {item.linkHref ? (
                  <SmartLink href={item.linkHref} style={{ display: 'block' }}><CardVisual item={item} /></SmartLink>
                ) : <CardVisual item={item} />}
                <div style={{ padding: '0 6px 8px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ marginBottom: 10 }}><StatusPill status={item.status} tone={item.tone} /></div>
                  <h3 style={{ fontSize: 19, fontWeight: 600, letterSpacing: '-0.015em', marginBottom: 4 }}>{item.name}</h3>
                  {item.platforms ? <p style={{ fontSize: 13, color: 'var(--mid)', marginBottom: 12 }}>{item.platforms}</p> : null}
                  <p className="body-sm" style={{ marginBottom: 16 }}>{item.desc}</p>
                  {item.linkHref ? (
                    <div style={{ marginTop: 'auto' }}>
                      <SmartLink href={item.linkHref} className="btn-ghost" style={{ paddingLeft: 0 }}>{item.linkLabel} <span className="arrow">→</span></SmartLink>
                    </div>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}

/* ── Team ──────────────────────────────────────────────────────────────── */

function Avatar({ person }) {
  if (person.photo) {
    return <img src={person.photo} alt={person.name} style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover' }} />
  }
  return (
    <div aria-hidden style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--dark)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em' }}>
      {person.initials || String(person.name || '').split(' ').map((w) => w[0]).join('')}
    </div>
  )
}

export function TeamBlock({ eyebrow, heading, body, people, note, background }) {
  return (
    <section className="section" style={{ background: background || 'var(--cream)', borderTop: '1px solid var(--border-light)' }}>
      <div className="container">
        <div className="services-intro-grid" style={{ gap: 'clamp(40px,6vw,80px)', alignItems: 'start' }}>
          <div className="reveal">
            {eyebrow ? <p className="eyebrow" style={{ marginBottom: 16 }}>{eyebrow}</p> : null}
            <h2 className="headline-lg" style={{ marginBottom: 20 }}><Lines text={heading} /></h2>
            {body ? <p className="body-md" style={{ marginBottom: 20 }}>{body}</p> : null}
            {note ? <p className="body-sm" style={{ color: 'var(--mid)' }}>{note}</p> : null}
          </div>
          <div className="feature-grid-two" style={{ gap: 16 }}>
            {(people || []).map((person, i) => (
              <article key={person.name || i} className="reveal glass-card" style={{ padding: 'clamp(24px,3vw,32px)', transitionDelay: `${i * 0.06}s` }}>
                <div style={{ marginBottom: 18 }}><Avatar person={person} /></div>
                <h3 style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.01em', marginBottom: 4 }}>{person.name}</h3>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--light)', marginBottom: 14 }}>{person.role}</p>
                <p className="body-sm">{person.desc}</p>
                {person.phone || person.email ? (
                  <div style={{ display: 'grid', gap: 8, marginTop: 18, paddingTop: 16, borderTop: '1px solid var(--border-light)' }}>
                    {person.phone ? (
                      <a href={person.phoneHref || `tel:${String(person.phone).replace(/\s+/g, '')}`} style={{ fontSize: 14, fontWeight: 500, color: 'var(--dark)' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--light)', marginRight: 10 }}>Call</span>{person.phone}
                      </a>
                    ) : null}
                    {person.email ? (
                      <a href={`mailto:${person.email}`} style={{ fontSize: 14, fontWeight: 500, color: 'var(--dark)', overflowWrap: 'anywhere' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--light)', marginRight: 10 }}>Email</span>{person.email}
                      </a>
                    ) : null}
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
