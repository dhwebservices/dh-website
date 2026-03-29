import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'

/* ── Typewriter ─────────────────────────────────────── */
const LINES = [
  'ready before your next meeting.',
  'faster than any template.',
  'built to rank on Google.',
  'designed to win customers.',
  'yours. Not a rental.',
]
function Typewriter() {
  const [idx, setIdx] = useState(0)
  const [text, setText] = useState('')
  const [del, setDel] = useState(false)
  const t = useRef()
  useEffect(() => {
    const line = LINES[idx]
    if (!del) {
      if (text.length < line.length) t.current = setTimeout(() => setText(line.slice(0, text.length+1)), 44)
      else t.current = setTimeout(() => setDel(true), 2800)
    } else {
      if (text.length > 0) t.current = setTimeout(() => setText(t => t.slice(0,-1)), 18)
      else { setIdx(i => (i+1) % LINES.length); setDel(false) }
    }
    return () => clearTimeout(t.current)
  }, [text, del, idx])
  return (
    <span style={{ color: 'var(--accent)' }}>
      {text}<span style={{ display:'inline-block', width:2, height:'0.85em', background:'var(--accent)', marginLeft:2, verticalAlign:'middle', animation:'blink 1s step-end infinite' }} />
    </span>
  )
}

/* ── Animated background ────────────────────────────── */
function HeroBg() {
  return (
    <div aria-hidden style={{ position:'absolute', inset:0, overflow:'hidden', zIndex:0, pointerEvents:'none' }}>
      {/* Subtle gradient orbs */}
      <div style={{ position:'absolute', top:'-20%', right:'-10%', width:'60%', height:'70%', borderRadius:'50%', background:'radial-gradient(ellipse, rgba(0,113,227,0.05) 0%, transparent 70%)', animation:'float 18s ease-in-out infinite' }} />
      <div style={{ position:'absolute', bottom:'-10%', left:'-5%', width:'50%', height:'50%', borderRadius:'50%', background:'radial-gradient(ellipse, rgba(0,113,227,0.03) 0%, transparent 70%)', animation:'float 24s ease-in-out infinite reverse' }} />
      {/* Fine dot grid */}
      <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(circle, rgba(0,0,0,0.08) 1px, transparent 1px)', backgroundSize:'32px 32px', opacity:0.5 }} />
    </div>
  )
}

/* ── Count-up ───────────────────────────────────────── */
function CountUp({ to, suffix='' }) {
  const [v, setV] = useState(0)
  const ref = useRef(); const done = useRef(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true
        const s = performance.now()
        const run = n => { const p=Math.min((n-s)/1400,1); setV(Math.round((1-Math.pow(1-p,3))*to)); if(p<1) requestAnimationFrame(run) }
        requestAnimationFrame(run)
      }
    }, { threshold:0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [to])
  return <span ref={ref}>{v}{suffix}</span>
}

/* ── Score ring ─────────────────────────────────────── */
function Ring({ score }) {
  const r=24, circ=2*Math.PI*r
  const c = score>=90?'#34C759':score>=50?'#FF9500':'#FF3B30'
  return (
    <svg width="56" height="56" viewBox="0 0 56 56">
      <circle cx="28" cy="28" r={r} fill="none" stroke="var(--border-light)" strokeWidth="4"/>
      <circle cx="28" cy="28" r={r} fill="none" stroke={c} strokeWidth="4"
        strokeDasharray={`${circ*score/100} ${circ}`} strokeLinecap="round"
        transform="rotate(-90 28 28)" style={{ transition:'stroke-dasharray 1s ease' }}/>
      <text x="28" y="33" textAnchor="middle" fontSize="12" fontWeight="600" fill={c} fontFamily="var(--font-sans)">{score}</text>
    </svg>
  )
}

/* ── Health checker ─────────────────────────────────── */
function HealthChecker() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [res, setRes] = useState(null)
  const [err, setErr] = useState('')
  const run = async () => {
    if (!url.trim()) return
    setLoading(true); setErr(''); setRes(null)
    try {
      let u = url.trim(); if(!u.startsWith('http')) u='https://'+u
      const d = await (await fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(u)}&strategy=mobile&category=performance&category=seo&category=accessibility&category=best-practices`)).json()
      const c = d.lighthouseResult?.categories; if(!c) throw new Error('Could not analyse this URL.')
      setRes({ performance:Math.round((c.performance?.score||0)*100), seo:Math.round((c.seo?.score||0)*100), accessibility:Math.round((c.accessibility?.score||0)*100), bestPractices:Math.round((c['best-practices']?.score||0)*100) })
    } catch(e) { setErr(e.message) }
    setLoading(false)
  }
  return (
    <div className="reveal" style={{ background:'var(--cream)', borderRadius:24, padding:'clamp(32px,4vw,56px)', border:'1px solid var(--border-light)' }}>
      <p className="eyebrow" style={{ marginBottom:12 }}>Free tool</p>
      <h2 style={{ fontFamily:'var(--font-serif)', fontSize:'clamp(28px,3.5vw,42px)', fontWeight:400, letterSpacing:'-0.02em', marginBottom:8, lineHeight:1.1 }}>
        How healthy is your website?
      </h2>
      <p className="body-sm" style={{ marginBottom:24 }}>Instant analysis — performance, SEO, accessibility, best practices.</p>
      <div style={{ display:'flex', gap:8, marginBottom:16 }}>
        <input value={url} onChange={e=>setUrl(e.target.value)} onKeyDown={e=>e.key==='Enter'&&run()}
          placeholder="yourwebsite.com"
          className="field-inp" style={{ flex:1, borderRadius:100, padding:'12px 20px' }} />
        <button onClick={run} disabled={loading||!url.trim()} className="btn-primary" style={{ padding:'12px 24px', fontSize:14, opacity:url.trim()?1:0.45 }}>
          {loading ? <span className="spinner" style={{width:14,height:14,borderWidth:1.5}} /> : 'Analyse'}
        </button>
      </div>
      {err && <p style={{ fontSize:13, color:'#FF3B30', marginBottom:12 }}>{err}</p>}
      {!res && !loading && !err && <p style={{ fontSize:13, color:'var(--light)', fontStyle:'italic' }}>Enter any URL to get a free health report</p>}
      {res && (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16, marginTop:4 }}>
          {[['Performance',res.performance],['SEO',res.seo],['Accessibility',res.accessibility],['Best Practices',res.bestPractices]].map(([l,v])=>(
            <div key={l} style={{ textAlign:'center', animation:'scaleIn 0.4s ease both' }}>
              <Ring score={v} />
              <div style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--light)', marginTop:8 }}>{l}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ── Main ───────────────────────────────────────────── */
const SERVICES = [
  { icon:'⬡', title:'Custom Development', desc:'Production-ready code built specifically for your business. No templates, no shortcuts.' },
  { icon:'◈', title:'Conversion Design', desc:'Every pixel earns its place. Interfaces designed around what your customers actually need.' },
  { icon:'◎', title:'SEO & Performance', desc:'Built to rank and built to load fast. Technical SEO from the first line of code.' },
  { icon:'◫', title:'Ongoing Support', desc:'We stay after launch. Fast response, regular updates, no disappearing acts.' },
  { icon:'⬡', title:'E-commerce', desc:'Sell online with a store built to convert. Fast checkout, secure payments, full inventory control.' },
  { icon:'◈', title:'HR System Integration', desc:'Complete staff management — onboarding, leave, timesheets, payslips — built into your site.' },
]

const WHY = [
  ['No templates', 'Every site built from scratch for your goals.'],
  ['Fixed pricing', 'No surprises. You know the cost before we start.'],
  ['Full-stack', 'Backend, database, APIs — all included.'],
  ['UK-based', 'Real people, direct communication, fast responses.'],
  ['Post-launch support', 'We\'re with you after go-live, not just before.'],
  ['Speed & SEO', 'Optimised for Core Web Vitals from day one.'],
]

export default function Home() {
  useReveal()
  return (
    <main>

      {/* ── HERO ── */}
      <section style={{ minHeight:'100svh', display:'flex', flexDirection:'column', justifyContent:'center', position:'relative', overflow:'hidden', padding:`calc(var(--nav-h) + clamp(40px,6vw,80px)) clamp(20px,5vw,60px) clamp(60px,8vw,100px)` }}>
        <HeroBg />
        <div style={{ position:'relative', zIndex:1, maxWidth:880, margin:'0 auto', width:'100%' }}>

          {/* Pill badge */}
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'6px 16px', borderRadius:100, background:'var(--cream)', border:'1px solid var(--border-light)', fontSize:13, color:'var(--dark2)', marginBottom:32, animation:'fadeUp 0.6s ease both' }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background:'#34C759', display:'inline-block', animation:'pulse 2s ease infinite' }} />
            Now serving clients across the UK
          </div>

          {/* Main headline */}
          <h1 style={{ fontFamily:'var(--font-sans)', fontSize:'clamp(44px,7vw,88px)', fontWeight:600, letterSpacing:'-0.035em', lineHeight:1.0, marginBottom:24, animation:'fadeUp 0.7s ease 0.05s both' }}>
            Your website,<br />
            <Typewriter />
          </h1>

          <p className="body-lg" style={{ maxWidth:520, marginBottom:40, animation:'fadeUp 0.7s ease 0.1s both' }}>
            We build production-ready websites that work as hard as you do. From £449, delivered in weeks, supported for life.
          </p>

          <div style={{ display:'flex', gap:12, flexWrap:'wrap', animation:'fadeUp 0.7s ease 0.15s both' }}>
            <Link to="/contact" className="btn-primary">Start a project<span style={{ marginLeft:2, opacity:0.7 }}>→</span></Link>
            <Link to="/pricing" className="btn-secondary">View pricing</Link>
          </div>

          {/* Social proof row */}
          <div style={{ display:'flex', alignItems:'center', gap:24, marginTop:56, flexWrap:'wrap', animation:'fadeUp 0.7s ease 0.2s both' }}>
            {[['100%','Satisfaction rate'],['24h','Response time'],['£449','Starting from'],['3wk','Avg. delivery']].map(([v,l]) => (
              <div key={l}>
                <div style={{ fontSize:20, fontWeight:600, letterSpacing:'-0.02em', lineHeight:1 }}>{v}</div>
                <div style={{ fontSize:12, color:'var(--light)', marginTop:3 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{ position:'absolute', bottom:28, left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:6, animation:'fadeIn 1s ease 1.5s both', opacity:0, animationFillMode:'forwards' }}>
          <div style={{ width:1, height:32, background:'linear-gradient(to bottom, transparent, var(--border))' }} />
          <span style={{ fontFamily:'var(--font-mono)', fontSize:9, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--light)' }}>Scroll</span>
        </div>
      </section>

      {/* ── WHAT WE BUILD ── */}
      <section className="section" style={{ background:'var(--cream)', borderTop:'1px solid var(--border-light)' }}>
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 2fr', gap:'clamp(40px,6vw,80px)', alignItems:'start' }}>
            <div style={{ position:'sticky', top: 80 }}>
              <div className="reveal">
                <p className="eyebrow" style={{ marginBottom:16 }}>What we build</p>
                <h2 className="headline-lg" style={{ marginBottom:20 }}>Everything<br />you need.</h2>
                <p className="body-md" style={{ marginBottom:32 }}>From your first website to a full enterprise stack with HR integration — we cover every layer.</p>
                <Link to="/services" className="btn-ghost" style={{ paddingLeft:0 }}>
                  See all services <span className="arrow">→</span>
                </Link>
              </div>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:1, background:'var(--border-light)', border:'1px solid var(--border-light)', borderRadius:20, overflow:'hidden' }}>
              {SERVICES.map((s,i) => (
                <div key={s.title} className="reveal glass-card" style={{ borderRadius:0, border:'none', padding:'28px 24px', transitionDelay:`${i*0.04}s` }}>
                  <div style={{ fontSize:22, marginBottom:12, filter:'grayscale(1) opacity(0.4)' }}>{s.icon}</div>
                  <div style={{ fontSize:15, fontWeight:600, marginBottom:8, letterSpacing:'-0.01em' }}>{s.title}</div>
                  <p className="body-sm">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY DH ── */}
      <section className="section">
        <div className="container">
          <div className="reveal section-narrow" style={{ textAlign:'center', marginBottom:'clamp(48px,6vw,72px)' }}>
            <p className="eyebrow" style={{ marginBottom:16 }}>Why choose us</p>
            <h2 className="headline-lg">Built different.<br />Delivered properly.</h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:1, background:'var(--border-light)', border:'1px solid var(--border-light)', borderRadius:20, overflow:'hidden' }}>
            {WHY.map(([title, desc], i) => (
              <div key={title} className="reveal" style={{ padding:'32px 28px', background:'var(--white)', transitionDelay:`${i*0.05}s` }}>
                <div style={{ width:32, height:32, borderRadius:8, background:'var(--accent-soft)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:16 }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7L5.5 10.5L12 3" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div style={{ fontSize:15, fontWeight:600, marginBottom:6, letterSpacing:'-0.01em' }}>{title}</div>
                <p className="body-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING PREVIEW ── */}
      <section className="section" style={{ background:'var(--cream)', borderTop:'1px solid var(--border-light)', borderBottom:'1px solid var(--border-light)' }}>
        <div className="container">
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'clamp(32px,4vw,48px)', flexWrap:'wrap', gap:16 }}>
            <div className="reveal">
              <p className="eyebrow" style={{ marginBottom:12 }}>Pricing</p>
              <h2 className="headline-lg">Simple,<br />fixed pricing.</h2>
            </div>
            <div className="reveal">
              <p className="body-sm" style={{ maxWidth:280, textAlign:'right' }}>No hidden fees. No hourly billing. One price, everything included.</p>
            </div>
          </div>

          {/* Pricing cards */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:16 }}>
            {[
              { name:'Starter', price:'£449', desc:'Perfect for small businesses launching online.', popular:false },
              { name:'Growth', price:'£999', desc:'Ideal for growing companies who need more.', popular:true },
              { name:'Pro', price:'£1,499', desc:'Advanced features for established businesses.', popular:false },
              { name:'Enterprise', price:'£2,499', desc:'Full enterprise site with integrated HR system.', popular:false },
            ].map((p,i) => (
              <div key={p.name} className={`reveal pricing-card ${p.popular ? 'glass-card-dark' : 'glass-card'}${p.popular?' stagger-'+i:''}`} style={{
                padding:'28px 24px', borderRadius:20, position:'relative',
                background: 'transparent',
                border: 'none',
                transitionDelay:`${i*0.07}s`,
              }}>
                {p.popular && <div style={{ position:'absolute', top:16, right:16, padding:'3px 10px', borderRadius:100, background:'var(--accent)', fontSize:11, fontWeight:600, color:'white', letterSpacing:'0.04em' }}>Popular</div>}
                <p style={{ fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'0.08em', textTransform:'uppercase', color: p.popular?'rgba(255,255,255,0.45)':'var(--light)', marginBottom:12 }}>{p.name}</p>
                <div style={{ fontSize:36, fontWeight:600, letterSpacing:'-0.03em', lineHeight:1, color:p.popular?'white':'var(--dark)', marginBottom:8 }}>{p.price}</div>
                <p style={{ fontSize:13.5, lineHeight:1.5, color:p.popular?'rgba(255,255,255,0.6)':'var(--mid)', marginBottom:20 }}>{p.desc}</p>
                <Link to="/contact" style={{ display:'block', textAlign:'center', padding:'10px 20px', borderRadius:100, fontSize:13.5, fontWeight:500, background:p.popular?'white':'var(--accent)', color:p.popular?'var(--dark)':'white', transition:'opacity 0.15s' }}
                  onMouseOver={e=>e.currentTarget.style.opacity='0.85'}
                  onMouseOut={e=>e.currentTarget.style.opacity='1'}
                >Get started</Link>
              </div>
            ))}
          </div>

          <div className="reveal" style={{ textAlign:'center', marginTop:24 }}>
            <Link to="/pricing" className="btn-ghost">See full pricing & hosting plans <span className="arrow">→</span></Link>
          </div>
        </div>
      </section>

      {/* ── HEALTH CHECKER ── */}
      <section className="section">
        <div className="container" style={{ maxWidth:760 }}>
          <HealthChecker />
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section" style={{ background:'var(--dark)' }}>
        <div className="container" style={{ textAlign:'center', maxWidth:680 }}>
          <div className="reveal">
            <p className="eyebrow" style={{ color:'rgba(255,255,255,0.35)', marginBottom:20 }}>Ready to start?</p>
            <h2 style={{ fontFamily:'var(--font-sans)', fontSize:'clamp(36px,5vw,64px)', fontWeight:600, letterSpacing:'-0.03em', lineHeight:1.05, color:'white', marginBottom:20 }}>
              Let's build something that works.
            </h2>
            <p style={{ fontSize:17, color:'rgba(255,255,255,0.5)', lineHeight:1.65, marginBottom:40 }}>
              Tell us about your project. We'll reply within 24 hours with a clear plan and a fixed price.
            </p>
            <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
              <Link to="/contact" className="btn-primary" style={{ background:'white', color:'var(--dark)' }}
                onMouseOver={e=>e.currentTarget.style.background='rgba(255,255,255,0.88)'}
                onMouseOut={e=>e.currentTarget.style.background='white'}
              >Start a project →</Link>
              <Link to="/pricing" className="btn-secondary" style={{ borderColor:'rgba(255,255,255,0.2)', color:'rgba(255,255,255,0.7)' }}
                onMouseOver={e=>{ e.currentTarget.style.borderColor='rgba(255,255,255,0.5)'; e.currentTarget.style.color='white' }}
                onMouseOut={e=>{ e.currentTarget.style.borderColor='rgba(255,255,255,0.2)'; e.currentTarget.style.color='rgba(255,255,255,0.7)' }}
              >View pricing</Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
