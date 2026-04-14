import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import { useCMS } from '../hooks/useCMS'
import { trackEvent } from '../lib/analytics'
import MicrosoftPartnerBadge from '../components/MicrosoftPartnerBadge'

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
        <div className="health-grid" style={{ gap:16, marginTop:4 }}>
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


/* ── Price Reveal Card ──────────────────────────────── */
function PriceRevealCard({ name, price, tagline, who, features, popular, delay }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className={`reveal pricing-card ${popular ? 'glass-card-dark' : 'glass-card'}`}
      style={{
        padding:'28px 24px', borderRadius:20, position:'relative',
        transitionDelay:`${delay}s`, cursor:'default',
        overflow:'hidden',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {popular && (
        <div style={{ position:'absolute', top:16, right:16, padding:'3px 10px', borderRadius:100, background:'var(--accent)', fontSize:11, fontWeight:600, color:'white', letterSpacing:'0.04em' }}>
          Popular
        </div>
      )}

      {/* Package name — always visible */}
      <p style={{ fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'0.08em', textTransform:'uppercase', color:popular?'rgba(255,255,255,0.45)':'var(--light)', marginBottom:16 }}>
        {name}
      </p>

      {/* Default state — tagline + who it's for */}
      <div style={{
        transition:'opacity 0.3s ease, transform 0.3s ease',
        opacity: hovered ? 0 : 1,
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        position: hovered ? 'absolute' : 'relative',
        pointerEvents:'none',
      }}>
        <div style={{ fontSize:18, fontWeight:600, letterSpacing:'-0.02em', lineHeight:1.3, color:popular?'white':'var(--dark)', marginBottom:10 }}>
          {tagline}
        </div>
        <p style={{ fontSize:13, color:popular?'rgba(255,255,255,0.5)':'var(--mid)', lineHeight:1.6, marginBottom:16 }}>
          {who}
        </p>
        <div style={{ fontSize:12, fontFamily:'var(--font-mono)', color:popular?'rgba(255,255,255,0.3)':'var(--light)', lineHeight:1.8 }}>
          {features.split(' · ').map(f => (
            <div key={f} style={{ display:'flex', alignItems:'center', gap:6, marginBottom:4 }}>
              <span style={{ width:4, height:4, borderRadius:'50%', background:popular?'rgba(255,255,255,0.3)':'var(--accent)', flexShrink:0, display:'inline-block' }}/>
              {f}
            </div>
          ))}
        </div>
        <div style={{ marginTop:20, fontSize:13, color:popular?'rgba(255,255,255,0.35)':'var(--light)', fontStyle:'italic' }}>
          Hover to see pricing →
        </div>
      </div>

      {/* Hovered state — price reveal */}
      <div style={{
        transition:'opacity 0.3s ease, transform 0.3s ease',
        opacity: hovered ? 1 : 0,
        transform: hovered ? 'translateY(0)' : 'translateY(12px)',
        position: hovered ? 'relative' : 'absolute',
        pointerEvents: hovered ? 'auto' : 'none',
      }}>
        <div style={{ fontSize:48, fontWeight:700, letterSpacing:'-0.04em', lineHeight:1, color:popular?'white':'var(--dark)', marginBottom:6 }}>
          {price}
        </div>
        <p style={{ fontSize:12, color:popular?'rgba(255,255,255,0.4)':'var(--light)', marginBottom:20, fontFamily:'var(--font-mono)', letterSpacing:'0.04em', textTransform:'uppercase' }}>
          One-off · Fixed price
        </p>
        <Link to="/pricing" style={{ display:'block', textAlign:'center', padding:'11px 20px', borderRadius:100, fontSize:13.5, fontWeight:600, background:popular?'white':'var(--accent)', color:popular?'var(--dark)':'white', transition:'opacity 0.15s', textDecoration:'none' }}
          onMouseOver={e=>e.currentTarget.style.opacity='0.85'}
          onMouseOut={e=>e.currentTarget.style.opacity='1'}
        >
          See what is included →
        </Link>
      </div>
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

const TESTIMONIALS = [
  {
    quote: "DH Website Services delivered our new site in under 3 weeks. The quality is exceptional — it genuinely looks better than agencies we were quoted 10x more from.",
    name: "Lucy Deane",
    business: "Glow With Lucy",
  },
]

const WHY = [
  ['Founder-led', 'You speak directly to the person doing the work, not a sales layer.'],
  ['Fixed pricing', 'Clear scope, clear cost, and no drifting hourly invoices.'],
  ['Technical build quality', 'Performance, SEO, integrations, and maintainability are part of the build.'],
  ['Commercial focus', 'The site should help you win work, not just sit online.'],
  ['Fast replies', 'Direct communication and a response target within 24 hours.'],
  ['Built for ownership', 'No rental trap. Your website should be an asset you control.'],
]

const CREDIBILITY = [
  ['How we work', 'Every project starts with scope clarity, priorities, and a defined outcome before we build.'],
  ['How we communicate', 'Short feedback loops, direct updates, and one accountable point of contact.'],
  ['How we price', 'We scope tightly enough to give fixed pricing instead of vague ranges and surprise costs.'],
]

export default function Home() {
  useReveal()
  const { data: servicesCms } = useCMS('services')
  const { data: pricingCms } = useCMS('pricing')
  const serviceCards = Array.isArray(servicesCms) && servicesCms.length > 0 ? servicesCms : SERVICES
  const buildCards = Array.isArray(pricingCms?.builds) && pricingCms.builds.length > 0 ? pricingCms.builds : []

  return (
    <main>

      {/* ── HERO ── */}
      <section style={{ minHeight:'100svh', display:'flex', flexDirection:'column', justifyContent:'center', position:'relative', overflow:'hidden', padding:`calc(var(--nav-h) + clamp(40px,6vw,80px)) clamp(20px,5vw,60px) clamp(60px,8vw,100px)` }}>
        <HeroBg />
        <div style={{ position:'relative', zIndex:1, maxWidth:880, margin:'0 auto', width:'100%' }}>

          {/* Pill badge */}
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'6px 16px', borderRadius:100, background:'var(--cream)', border:'1px solid var(--border-light)', fontSize:13, color:'var(--dark2)', marginBottom:32, animation:'fadeUp 0.6s ease both' }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background:'#34C759', display:'inline-block', animation:'pulse 2s ease infinite' }} />
            Founder-led web builds for UK businesses
          </div>

          {/* Main headline */}
          <h1 style={{ fontFamily:'var(--font-sans)', fontSize:'clamp(44px,7vw,88px)', fontWeight:600, letterSpacing:'-0.035em', lineHeight:1.0, marginBottom:24, animation:'fadeUp 0.7s ease 0.05s both' }}>
            Your website,<br />
            <Typewriter />
          </h1>

          <p className="body-lg" style={{ maxWidth:520, marginBottom:40, animation:'fadeUp 0.7s ease 0.1s both' }}>
            Production-ready websites for businesses that need speed, clarity, and something stronger than a template. Fixed pricing, direct communication, and a build you actually own.
          </p>

          <div style={{ display:'flex', gap:12, flexWrap:'wrap', animation:'fadeUp 0.7s ease 0.15s both' }}>
            <Link to="/contact" className="btn-primary" onClick={() => trackEvent('homepage_primary_cta', { location: 'hero' })}>Start a project<span style={{ marginLeft:2, opacity:0.7 }}>→</span></Link>
            <Link to="/pricing" className="btn-secondary">View pricing</Link>
          </div>

          <div style={{ display:'flex', alignItems:'center', gap:24, marginTop:56, flexWrap:'wrap', animation:'fadeUp 0.7s ease 0.2s both' }}>
            {[['Founder-led','Direct accountability'],['24h','Response target'],['£449','Entry package'],['Built from scratch','No template lock-in']].map(([v,l]) => (
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

      <section
        className="section"
        style={{ background:'var(--cream)', borderTop:'1px solid var(--border-light)', borderBottom:'1px solid var(--border-light)' }}
      >
        <div
          className="container partner-highlight-grid"
          style={{
            gap:32,
            alignItems:'center',
          }}
        >
          <div className="reveal">
            <p className="eyebrow" style={{ marginBottom:12 }}>Microsoft approved partner</p>
            <h2 style={{ fontFamily:'var(--font-sans)', fontSize:'clamp(30px,4vw,50px)', fontWeight:600, letterSpacing:'-0.03em', lineHeight:1.08, marginBottom:14, maxWidth:680 }}>
              Better suited to businesses already built around Microsoft.
            </h2>
            <p style={{ fontSize:16, lineHeight:1.75, color:'var(--mid)', maxWidth:650, marginBottom:24 }}>
              We now hold Microsoft approved partner status. If your business already runs on Microsoft tools, we can scope websites and operational workflows with that ecosystem in mind from the start.
            </p>
            <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
              <Link to="/partners" className="btn-primary">Explore partnerships</Link>
              <Link to="/contact" className="btn-secondary">Talk to us</Link>
            </div>
          </div>

          <div className="reveal">
            <div className="glass-card" style={{ padding:'28px clamp(22px,3vw,32px)' }}>
              <MicrosoftPartnerBadge width={280} />
              <div style={{ marginTop:20, paddingTop:20, borderTop:'1px solid var(--border-light)', display:'grid', gap:10 }}>
                {[
                  'Microsoft-aware delivery for service businesses',
                  'Cleaner planning around Microsoft 365 workflows',
                  'Founder-led build process with fixed pricing',
                ].map((item) => (
                  <div key={item} style={{ display:'flex', gap:10, alignItems:'flex-start' }}>
                    <span aria-hidden style={{ width:8, height:8, borderRadius:'50%', background:'var(--accent)', marginTop:7, flexShrink:0 }} />
                    <p style={{ fontSize:14, lineHeight:1.6, color:'var(--dark2)' }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT WE BUILD ── */}
      <section className="section" style={{ background:'var(--cream)', borderTop:'1px solid var(--border-light)' }}>
        <div className="container">
          <div className="services-intro-grid" style={{ gap:'clamp(40px,6vw,80px)', alignItems:'start' }}>
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
            <div className="feature-grid-two" style={{ gap:1, background:'var(--border-light)', border:'1px solid var(--border-light)', borderRadius:20, overflow:'hidden' }}>
              {serviceCards.map((s,i) => (
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
          <div className="why-grid" style={{ gap:1, background:'var(--border-light)', border:'1px solid var(--border-light)', borderRadius:20, overflow:'hidden' }}>
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

      <section className="section" style={{ background:'var(--cream)', borderTop:'1px solid var(--border-light)' }}>
        <div className="container">
          <div className="reveal section-narrow" style={{ textAlign:'center', marginBottom:'clamp(40px,5vw,56px)' }}>
            <p className="eyebrow" style={{ marginBottom:16 }}>Before you hire us</p>
            <h2 className="headline-lg">Judge the process.</h2>
            <p className="body-md" style={{ marginTop:16 }}>If we are early-stage, the right way to earn trust is through how we think, how we communicate, and how we build.</p>
          </div>
          <div className="pricing-grid-three" style={{ gap:16 }}>
            {CREDIBILITY.map(([title, desc], index) => (
              <div key={title} className="reveal glass-card" style={{ padding:'28px 24px', transitionDelay:`${index * 0.06}s` }}>
                <div style={{ fontSize:16, fontWeight:600, marginBottom:10 }}>{title}</div>
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

          {/* Pricing cards — hover to reveal price */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:16 }}>
            {(buildCards.length > 0 ? buildCards.slice(0, 4).map((pkg, i) => ({
              name: pkg.name,
              price: `£${Number(pkg.price || 0).toLocaleString()}`,
              tagline: pkg.badge || 'Fixed-price website package.',
              who: pkg.delivery ? `Typical delivery: ${pkg.delivery}` : 'Clear fixed scope and delivery.',
              features: Array.isArray(pkg.features) ? pkg.features.slice(0, 4).join(' · ') : '',
              popular: /popular/i.test(pkg.badge || ''),
              key: `${pkg.name}-${i}`,
            })) : [
              { name:'Starter', price:'£449', tagline:'For small businesses ready to launch.', who:'Solo traders, startups, local services', features:'5 pages · Mobile ready · Basic SEO · Contact form', popular:false, key:'Starter' },
              { name:'Growth', price:'£999', tagline:'For businesses that need more reach.', who:'SMEs, growing brands, service companies', features:'10 pages · Blog · Full SEO · Analytics', popular:true, key:'Growth' },
              { name:'Pro', price:'£1,499', tagline:'For established businesses scaling up.', who:'E-commerce, agencies, professional firms', features:'15 pages · E-commerce · Custom integrations', popular:false, key:'Pro' },
              { name:'Enterprise', price:'£2,499', tagline:'The complete business operating system.', who:'Companies needing HR + web in one', features:'Full site · Integrated HR · Staff portal', popular:false, key:'Enterprise' },
            ]).map((p,i) => (
              <PriceRevealCard key={p.key || p.name} {...p} delay={i*0.07} />
            ))}
          </div>

          <div className="reveal" style={{ textAlign:'center', marginTop:24 }}>
            <Link to="/pricing" className="btn-ghost">See full pricing & hosting plans <span className="arrow">→</span></Link>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ── */}
      <section className="section" style={{ background:'var(--white)', borderTop:'1px solid var(--border-light)' }}>
        <div className="container">
          <div className="reveal" style={{ textAlign:'center', marginBottom:'clamp(40px,5vw,56px)' }}>
            <p className="eyebrow" style={{ marginBottom:14 }}>Client results</p>
            <h2 className="headline-lg">Real businesses.<br />Real outcomes.</h2>
          </div>

          {/* Testimonials */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:16, marginBottom:48 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="reveal glass-card" style={{ padding:'28px 24px', transitionDelay:`${i*0.08}s` }}>
                {/* Stars */}
                <div style={{ display:'flex', gap:3, marginBottom:16 }}>
                  {[...Array(5)].map((_,s) => (
                    <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill="var(--accent)" stroke="none">
                      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                    </svg>
                  ))}
                </div>
                {/* Quote */}
                <p style={{ fontSize:15, lineHeight:1.7, color:'var(--dark2)', marginBottom:20, fontStyle:'italic' }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                {/* Author */}
                <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                  <div style={{ width:36, height:36, borderRadius:'50%', background:'var(--accent-soft)', border:'1px solid rgba(0,113,227,0.15)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, fontWeight:700, color:'var(--accent)', flexShrink:0 }}>
                    {t.name.split(' ').map(w=>w[0]).join('')}
                  </div>
                  <div>
                    <div style={{ fontSize:13, fontWeight:600, color:'var(--dark)' }}>{t.name}</div>
                    <div style={{ fontSize:12, color:'var(--light)', fontFamily:'var(--font-mono)' }}>{t.business}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats bar */}
          <div className="reveal glass-card" style={{ padding:'28px 32px', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))', gap:24, textAlign:'center' }}>
            {[
              ['100%', 'Client satisfaction'],
              ['< 24h', 'Response time'],
              ['3 weeks', 'Avg. delivery'],
              ['£449', 'Starting from'],
            ].map(([val, label]) => (
              <div key={label}>
                <div style={{ fontSize:28, fontWeight:700, letterSpacing:'-0.03em', color:'var(--dark)', marginBottom:4 }}>{val}</div>
                <div style={{ fontSize:12, color:'var(--light)', fontFamily:'var(--font-mono)', letterSpacing:'0.04em', textTransform:'uppercase' }}>{label}</div>
              </div>
            ))}
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
                onClick={() => trackEvent('homepage_primary_cta', { location: 'footer_cta' })}
                onMouseOver={e=>e.currentTarget.style.background='rgba(255,255,255,0.88)'}
                onMouseOut={e=>e.currentTarget.style.background='white'}
              >Start a project →</Link>
              <Link to="/pricing" className="btn-secondary" style={{ borderColor:'rgba(255,255,255,0.2)', color:'rgba(255,255,255,0.7)' }}
                onMouseOver={e=>{ e.currentTarget.style.borderColor='rgba(255,255,255,0.5)'; e.currentTarget.style.color='white' }}
                onMouseOut={e=>{ e.currentTarget.style.borderColor='rgba(255,255,255,0.2)'; e.currentTarget.style.color='rgba(255,255,255,0.7)' }}
              >View pricing</Link>
            </div>
            <div style={{ display:'flex', gap:20, justifyContent:'center', marginTop:20, flexWrap:'wrap' }}>
              {['Fixed price — always','No contracts','Reply within 24 hrs'].map(t => (
                <div key={t} style={{ display:'flex', alignItems:'center', gap:6, fontSize:12, color:'rgba(255,255,255,0.4)' }}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1.5 5L3.5 7L8.5 2" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
