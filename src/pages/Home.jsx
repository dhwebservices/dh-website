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

/* ── Pricing Card (Direct Display) ──────────────────── */
function PricingCard({ name, price, tagline, who, features, popular, delay }) {
  return (
    <div
      className={`reveal pricing-card ${popular ? 'glass-card-dark' : 'glass-card'}`}
      style={{
        padding:'28px 24px', borderRadius:20, position:'relative',
        transitionDelay:`${delay}s`,
        display:'flex', flexDirection:'column',
      }}
    >
      {popular && (
        <div style={{ position:'absolute', top:16, right:16, padding:'3px 10px', borderRadius:100, background:'var(--accent)', fontSize:11, fontWeight:600, color:'white', letterSpacing:'0.04em' }}>
          Popular
        </div>
      )}

      {/* Package name */}
      <p style={{ fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'0.08em', textTransform:'uppercase', color:popular?'rgba(255,255,255,0.45)':'var(--light)', marginBottom:8 }}>
        {name}
      </p>

      {/* Price - prominent and upfront */}
      <div style={{ fontSize:44, fontWeight:700, letterSpacing:'-0.04em', lineHeight:1, color:popular?'white':'var(--dark)', marginBottom:6 }}>
        {price}
      </div>
      <p style={{ fontSize:12, color:popular?'rgba(255,255,255,0.4)':'var(--light)', marginBottom:16, fontFamily:'var(--font-mono)', letterSpacing:'0.04em', textTransform:'uppercase' }}>
        One-off · Fixed price
      </p>

      {/* Tagline */}
      <div style={{ fontSize:15, fontWeight:600, letterSpacing:'-0.01em', lineHeight:1.3, color:popular?'white':'var(--dark)', marginBottom:8 }}>
        {tagline}
      </div>

      {/* Who it's for */}
      <p style={{ fontSize:13, color:popular?'rgba(255,255,255,0.5)':'var(--mid)', lineHeight:1.6, marginBottom:16, flex:1 }}>
        {who}
      </p>

      {/* Features */}
      <div style={{ fontSize:12, fontFamily:'var(--font-mono)', color:popular?'rgba(255,255,255,0.3)':'var(--light)', lineHeight:1.8, marginBottom:20 }}>
        {features.split(' · ').map(f => (
          <div key={f} style={{ display:'flex', alignItems:'center', gap:6, marginBottom:4 }}>
            <span style={{ width:4, height:4, borderRadius:'50%', background:popular?'rgba(255,255,255,0.3)':'var(--accent)', flexShrink:0, display:'inline-block' }}/>
            {f}
          </div>
        ))}
      </div>

      {/* CTA */}
      <Link to="/pricing" style={{ display:'block', textAlign:'center', padding:'11px 20px', borderRadius:100, fontSize:13.5, fontWeight:600, background:popular?'white':'var(--accent)', color:popular?'var(--dark)':'white', transition:'opacity 0.15s', textDecoration:'none' }}
        onMouseOver={e=>e.currentTarget.style.opacity='0.85'}
        onMouseOut={e=>e.currentTarget.style.opacity='1'}
      >
        See what's included →
      </Link>
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
      <section className="home-hero" style={{ minHeight:'100svh', display:'flex', flexDirection:'column', justifyContent:'flex-start', position:'relative', overflow:'hidden', padding:`calc(var(--nav-h) + clamp(10px,2vw,18px)) clamp(20px,5vw,60px) clamp(60px,8vw,100px)` }}>
        <HeroBg />
        <div style={{ position:'relative', zIndex:1, maxWidth:880, margin:'0 auto', width:'100%' }}>

          {/* Main headline */}
          <h1 style={{ fontFamily:'var(--font-sans)', fontSize:'clamp(44px,7vw,88px)', fontWeight:600, letterSpacing:'-0.035em', lineHeight:1.0, marginBottom:24, animation:'fadeUp 0.7s ease 0.05s both' }}>
            Your website,<br />
            <Typewriter />
          </h1>

          <p className="body-lg" style={{ maxWidth:520, marginBottom:40, animation:'fadeUp 0.7s ease 0.1s both' }}>
            Production-ready websites for businesses that need speed, clarity, and something stronger than a template. Fixed pricing, direct communication, and a build you actually own.
          </p>

          <div className="home-hero__actions" style={{ display:'flex', gap:12, flexWrap:'wrap', animation:'fadeUp 0.7s ease 0.15s both' }}>
            <Link to="/contact" className="btn-primary" onClick={() => trackEvent('homepage_primary_cta', { location: 'hero' })}>Get started<span style={{ marginLeft:2, opacity:0.7 }}>→</span></Link>
            <Link to="/pricing" className="btn-ghost">See pricing</Link>
          </div>

          <div className="home-hero__stats" style={{ display:'flex', alignItems:'center', gap:24, marginTop:56, flexWrap:'wrap', animation:'fadeUp 0.7s ease 0.2s both' }}>
            {[['Founder-led','Direct accountability'],['24h','Response target'],['£449','Entry package'],['Built from scratch','No template lock-in']].map(([v,l]) => (
              <div key={l}>
                <div style={{ fontSize:20, fontWeight:600, letterSpacing:'-0.02em', lineHeight:1 }}>{v}</div>
                <div style={{ fontSize:12, color:'var(--light)', marginTop:3 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="home-hero__scroll-hint" style={{ position:'absolute', bottom:28, left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:6, animation:'fadeIn 1s ease 1.5s both', opacity:0, animationFillMode:'forwards' }}>
          <div style={{ width:1, height:32, background:'linear-gradient(to bottom, transparent, var(--border))' }} />
          <span style={{ fontFamily:'var(--font-mono)', fontSize:9, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--light)' }}>Scroll</span>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section style={{ background:'var(--white)', borderBottom:'1px solid var(--border-light)', padding:'clamp(20px,3vw,28px) 0' }}>
        <div className="container">
          <div className="reveal" style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:'clamp(24px,5vw,48px)', flexWrap:'wrap' }}>
            {[
              { icon:'⭐', label:'5.0 rating', sub:'Google Reviews' },
              { icon:'🔒', label:'GDPR compliant', sub:'Data protection' },
              { icon:'🏆', label:'Microsoft Partner', sub:'Verified status' },
              { icon:'⚡', label:'2-6 week delivery', sub:'Fixed timeline' },
            ].map((item, i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:10 }}>
                <div style={{ fontSize:24, filter:'grayscale(0.3)', opacity:0.7 }}>{item.icon}</div>
                <div>
                  <div style={{ fontSize:14, fontWeight:600, color:'var(--dark)', lineHeight:1.3 }}>{item.label}</div>
                  <div style={{ fontSize:11, color:'var(--light)', fontFamily:'var(--font-mono)', letterSpacing:'0.04em' }}>{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
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
                  <h3 style={{ fontSize:15, fontWeight:600, marginBottom:8, letterSpacing:'-0.01em' }}>{s.title}</h3>
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
                <h3 style={{ fontSize:15, fontWeight:600, marginBottom:6, letterSpacing:'-0.01em' }}>{title}</h3>
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
                <h3 style={{ fontSize:16, fontWeight:600, marginBottom:10 }}>{title}</h3>
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
              <PricingCard key={p.key || p.name} {...p} delay={i*0.07} />
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

      {/* ── FAQ ── */}
      <section className="section" style={{ background:'var(--white)', borderTop:'1px solid var(--border-light)' }}>
        <div className="container section-narrow">
          <div className="reveal" style={{ textAlign:'center', marginBottom:'clamp(40px,5vw,56px)' }}>
            <p className="eyebrow" style={{ marginBottom:14 }}>Common questions</p>
            <h2 className="headline-lg">Everything you need to know</h2>
            <p className="body-md" style={{ marginTop:16 }}>Quick answers to questions we hear most often about our website development process.</p>
          </div>

          <div style={{ display:'grid', gap:20 }}>
            {[
              {
                q: 'How long does a website project take?',
                a: 'Typical delivery ranges from 2-6 weeks depending on scope. Starter websites can launch within 2 weeks, while complex builds with e-commerce or HR integration may take 4-6 weeks. We provide a clear timeline during the scoping phase.',
              },
              {
                q: 'What\'s included in your fixed pricing?',
                a: 'Our fixed-price packages include custom design, development, mobile optimization, technical SEO setup, analytics integration, contact forms, and launch support. Ongoing hosting and support are billed separately so you can see exactly what\'s one-off versus recurring.',
              },
              {
                q: 'Do you offer website hosting and maintenance?',
                a: 'Yes. We provide managed hosting on Cloudflare Pages with 99.9%+ uptime, global CDN, automatic SSL, and regular security updates. Hosting plans start from £29/month and include ongoing technical support, updates, and monitoring.',
              },
              {
                q: 'Can you integrate with our existing systems?',
                a: 'Absolutely. We specialize in integrations with Microsoft 365, Supabase databases, payment processors (Stripe), booking systems, email platforms (Resend), and HR management tools. As a Microsoft Partner, we\'re particularly strong with Microsoft ecosystem integrations.',
              },
              {
                q: 'What makes you different from other web agencies?',
                a: 'Founder-led delivery means you work directly with David Hooper throughout the project—no sales handoff or junior developer roulette. Fixed pricing eliminates scope creep surprises. We build production-quality code from day one, not MVP filler that needs rebuilding later.',
              },
              {
                q: 'Do I own the website after launch?',
                a: 'Yes, completely. You own all design files, source code, content, and domain. There\'s no rental trap or proprietary platform lock-in. You can take the website to another developer or host if needed, though we provide ongoing support for clients who want it.',
              },
            ].map((faq, i) => (
              <div key={i} className="reveal glass-card" style={{ padding:'28px 24px', transitionDelay:`${i*0.05}s` }}>
                <h3 style={{ fontSize:16, fontWeight:600, marginBottom:12, lineHeight:1.3 }}>{faq.q}</h3>
                <p className="body-sm" style={{ lineHeight:1.7 }}>{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="reveal" style={{ textAlign:'center', marginTop:32 }}>
            <p className="body-sm" style={{ marginBottom:16 }}>Still have questions?</p>
            <Link to="/contact" className="btn-ghost">Get in touch <span className="arrow">→</span></Link>
          </div>
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
