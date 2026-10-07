import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { POLICIES } from '../lib/legalContent'

function renderMarkdown(text) {
  return text
    .split('\n')
    .map((line, i) => {
      if (line.startsWith('## ')) return <h2 key={i} style={{ fontFamily: 'var(--font-sans)', fontSize: '20px', fontWeight: 700, marginTop: '32px', marginBottom: '12px', color: 'var(--dark)' }}>{line.slice(3)}</h2>
      if (line.startsWith('### ')) return <h3 key={i} style={{ fontSize: '16px', fontWeight: 700, marginTop: '20px', marginBottom: '8px', color: 'var(--cyan)' }}>{line.slice(4)}</h3>
      if (line.startsWith('- ')) {
        const parts = line.slice(2).split(/\*\*(.*?)\*\*/)
        return <li key={i} style={{ fontSize: '14px', color: 'var(--mid)', lineHeight: 1.8, marginBottom: '4px', marginLeft: '16px' }}>{parts.map((p, j) => j % 2 === 1 ? <strong key={j} style={{ color: 'var(--dark)' }}>{p}</strong> : p)}</li>
      }
      if (/^\d+\./.test(line)) return <li key={i} style={{ fontSize: '14px', color: 'var(--mid)', lineHeight: 1.8, marginBottom: '6px', marginLeft: '16px' }}>{line.replace(/^\d+\.\s/, '')}</li>
      if (line.trim() === '') return <div key={i} style={{ height: '8px' }} />
      const parts = line.split(/\*\*(.*?)\*\*/)
      return <p key={i} style={{ fontSize: '14px', color: 'var(--mid)', lineHeight: 1.8, marginBottom: '8px' }}>{parts.map((p, j) => j % 2 === 1 ? <strong key={j} style={{ color: 'var(--dark)', fontWeight: 600 }}>{p}</strong> : p)}</p>
    })
}

export default function Legal() {
  const { pathname } = useLocation()
  const policy = POLICIES[pathname]

  useEffect(() => { window.scrollTo(0, 0) }, [pathname])

  if (!policy) return (
    <main style={{ paddingTop: '88px', padding: '120px 24px', textAlign: 'center' }}>
      <h1 style={{ fontFamily: 'var(--font-sans)', fontSize: '40px', fontWeight: 800, marginBottom: '16px' }}>Page Not Found</h1>
      <Link to="/" style={{ color: 'var(--cyan)' }}>← Back to Home</Link>
    </main>
  )

  return (
    <main style={{ paddingTop: '88px' }}>
      <section style={{ padding: 'clamp(80px,10vw,120px) clamp(20px,5vw,60px)' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.06em', color: 'var(--mid)', marginBottom: '32px', transition: 'color 0.15s' }}
            onMouseOver={e => e.currentTarget.style.color = 'var(--cyan)'}
            onMouseOut={e => e.currentTarget.style.color = 'var(--mid)'}
          >← Back to Home</Link>
          <div style={{ display: 'inline-block', fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '16px' }}>
Legal
          </div>
          <h1 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(32px, 4.5vw, 52px)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.0, marginBottom: '8px' }}>{policy.title}</h1>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--light)', letterSpacing: '0.06em', marginBottom: '40px' }}>Last updated: {policy.updated}</p>
          <div style={{ padding: '40px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '4px' }}>
            {renderMarkdown(policy.content)}
          </div>
          <div style={{ marginTop: '32px', padding: '20px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '4px', fontSize: '13.5px', color: 'var(--mid)' }}>
            Questions about this policy? Email us at{' '}
            <a href="mailto:clients@dhwebsiteservices.co.uk" style={{ color: 'var(--cyan)' }}>clients@dhwebsiteservices.co.uk</a>
          </div>
        </div>
      </section>
    </main>
  )
}
