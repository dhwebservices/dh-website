import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'

// All configurable options
const PAGE_OPTIONS = [
  { id:'pages5',         label:'Up to 5 pages',     cost:0,    desc:'Starter — from £449' },
  { id:'pages10',        label:'Up to 10 pages',     cost:550,  desc:'Growth — from £999' },
  { id:'pages15',        label:'Up to 15 pages',     cost:1050, desc:'Pro — from £1,499' },
  { id:'pagesUnlimited', label:'Enterprise / Unlimited', cost:2050, desc:'Enterprise + HR — from £2,499' },
]

const FEATURES = [
  // Content
  { id:'blog',       label:'Blog / News section',          cost:0,   icon:'📰', group:'Content', note:'Included in Growth+' },
  { id:'gallery',    label:'Photo gallery',                cost:99,  icon:'🖼', group:'Content' },
  { id:'video',      label:'Video embed / hero video',     cost:99,  icon:'🎬', group:'Content' },
  // Business
  { id:'booking',    label:'Booking / appointment system', cost:350, icon:'📅', group:'Business' },
  { id:'ecommerce',  label:'E-commerce store',             cost:500, icon:'🛒', group:'Business', note:'Included in Pro+' },
  { id:'payments',   label:'Online payments (Stripe)',     cost:199, icon:'💳', group:'Business' },
  { id:'members',    label:'Members / login area',         cost:299, icon:'🔐', group:'Business' },
  { id:'livechat',   label:'Live chat integration',        cost:79,  icon:'💬', group:'Business' },
  // Marketing
  { id:'seo',        label:'Full SEO setup',               cost:0,   icon:'🔍', group:'Marketing', note:'Included in Growth+' },
  { id:'analytics',  label:'Google Analytics setup',       cost:0,   icon:'📊', group:'Marketing', note:'Included in Growth+' },
  { id:'mailchimp',  label:'Email marketing integration',  cost:149, icon:'📧', group:'Marketing' },
  { id:'social',     label:'Social media links / feeds',   cost:79,  icon:'📱', group:'Marketing' },
  // Technical
  { id:'multilang',  label:'Multi-language support',       cost:399, icon:'🌍', group:'Technical' },
  { id:'hr',         label:'HR portal integration',        cost:0,   icon:'👥', group:'Technical', note:'Included in Enterprise' },
  { id:'crm',        label:'CRM integration',              cost:299, icon:'🤝', group:'Technical' },
  { id:'api',        label:'Custom API integration',       cost:399, icon:'⚡', group:'Technical' },
]

const DESIGN_OPTIONS = [
  { id:'template',   label:'Template-based design',    cost:0,    desc:'Clean, professional starter template' },
  { id:'custom',     label:'Custom brand design',      cost:300,  desc:'Bespoke design matching your brand guidelines' },
  { id:'rebrand',    label:'Full rebrand + design',    cost:600,  desc:'Logo, colours, typography and full identity' },
]

const HOSTING_OPTIONS = [
  { id:'none',         label:'No hosting needed',       cost:0 },
  { id:'starter',      label:'Starter — £35/mo',        cost:35,  desc:'1 update/mo, 48–72hr support' },
  { id:'professional', label:'Professional — £65/mo',   cost:65,  desc:'3 updates/mo, priority support', badge:'Most Popular' },
  { id:'business',     label:'Business — £109/mo',      cost:109, desc:'Unlimited updates, weekly tuning' },
]

const BASE_PRICE = 449 // Starter package base

function useCountUp(target, duration = 600) {
  const [value, setValue] = useState(target)
  const prev = useRef(target)
  useEffect(() => {
    const start = prev.current
    const diff = target - start
    if (diff === 0) return
    const startTime = performance.now()
    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(start + diff * eased))
      if (progress < 1) requestAnimationFrame(step)
      else prev.current = target
    }
    requestAnimationFrame(step)
  }, [target, duration])
  return value
}

export default function Calculator() {
  useReveal()
  const [pages, setPages] = useState('pages5')
  const [selected, setSelected] = useState(new Set())
  const [design, setDesign] = useState('template')
  const [hosting, setHosting] = useState('none')

  const toggle = (id) => {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id); else next.add(id)
      return next
    })
  }

  const pagesCost = PAGE_OPTIONS.find(p => p.id === pages)?.cost || 0
  const featuresCost = [...selected].reduce((sum, id) => {
    const f = FEATURES.find(f => f.id === id)
    return sum + (f?.cost || 0)
  }, 0)
  const designCost = DESIGN_OPTIONS.find(d => d.id === design)?.cost || 0
  const totalBuild = BASE_PRICE + pagesCost + featuresCost + designCost
  const monthlyCost = HOSTING_OPTIONS.find(h => h.id === hosting)?.cost || 0

  const displayTotal = useCountUp(totalBuild)

  const groups = [...new Set(FEATURES.map(f => f.group))]

  // Suggest closest package
  const suggest = totalBuild <= 449 ? 'Starter' : totalBuild <= 999 ? 'Growth' : totalBuild <= 1499 ? 'Pro' : 'Enterprise + HR'
  const suggestColour = { Starter:'#30A46C', Growth:'#0071E3', Pro:'#8E4EC6', 'Enterprise + HR':'#C2500D' }[suggest]

  return (
    <main style={{ paddingTop:'var(--nav-h)', background:'var(--bg)' }}>
      <section className="section">
        <div className="container">

          {/* Header */}
          <div className="reveal" style={{ maxWidth:600, marginBottom:56 }}>
            <p className="eyebrow" style={{ marginBottom:16 }}>Project Calculator</p>
            <h1 style={{ fontFamily:'var(--font-sans)', fontSize:'clamp(36px,5vw,60px)', fontWeight:600, letterSpacing:'-0.03em', lineHeight:1.0, marginBottom:20 }}>
              Build your quote<br />in real time.
            </h1>
            <p className="body-md">Select what you need and see the price update instantly. No forms, no waiting — just transparency.</p>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 320px', gap:40, alignItems:'start' }}>

            {/* Left — Options */}
            <div style={{ display:'flex', flexDirection:'column', gap:40 }}>

              {/* Pages */}
              <div className="reveal">
                <h3 style={{ fontSize:13, fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase', color:'var(--light)', marginBottom:16 }}>How many pages?</h3>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:10 }}>
                  {PAGE_OPTIONS.map(p => (
                    <button key={p.id} onClick={() => setPages(p.id)}
                      style={{ padding:'14px 18px', borderRadius:12, border:'2px solid', borderColor: pages===p.id ? 'var(--dark)' : 'var(--border-light)', background: pages===p.id ? 'var(--dark)' : 'var(--white)', color: pages===p.id ? '#fff' : 'var(--dark)', cursor:'pointer', textAlign:'left', transition:'all 0.15s', display:'flex', flexDirection:'column', gap:4 }}>
                      <span style={{ fontSize:14, fontWeight:600 }}>{p.label}</span>
                      <span style={{ fontSize:11, color: pages===p.id ? 'rgba(255,255,255,0.55)' : 'var(--light)' }}>{p.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Features by group */}
              {groups.map(group => (
                <div key={group} className="reveal">
                  <h3 style={{ fontSize:13, fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase', color:'var(--light)', marginBottom:16 }}>{group}</h3>
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:8 }}>
                    {FEATURES.filter(f => f.group === group).map(f => {
                      const on = selected.has(f.id)
                      return (
                        <button key={f.id} onClick={() => toggle(f.id)}
                          style={{ padding:'12px 14px', borderRadius:10, border:'2px solid', borderColor: on ? 'var(--accent)' : 'var(--border-light)', background: on ? 'rgba(0,113,227,0.06)' : 'var(--white)', cursor:'pointer', textAlign:'left', transition:'all 0.15s', display:'flex', gap:10, alignItems:'center' }}>
                          <span style={{ fontSize:18, flexShrink:0 }}>{f.icon}</span>
                          <div style={{ flex:1, minWidth:0 }}>
                            <div style={{ fontSize:13, fontWeight:500, color:'var(--dark)', lineHeight:1.3 }}>{f.label}</div>
                            <div style={{ fontSize:11, fontFamily:'var(--font-mono)', color: on ? 'var(--accent)' : 'var(--light)', marginTop:2 }}>{f.cost === 0 ? (f.note || 'Included') : '+£' + f.cost}</div>
                          </div>
                          <div style={{ width:18, height:18, borderRadius:5, border:'2px solid', borderColor: on ? 'var(--accent)' : 'var(--border)', background: on ? 'var(--accent)' : 'transparent', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, transition:'all 0.15s' }}>
                            {on && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}

              {/* Design */}
              <div className="reveal">
                <h3 style={{ fontSize:13, fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase', color:'var(--light)', marginBottom:16 }}>Design approach</h3>
                <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                  {DESIGN_OPTIONS.map(d => (
                    <button key={d.id} onClick={() => setDesign(d.id)}
                      style={{ padding:'14px 18px', borderRadius:12, border:'2px solid', borderColor: design===d.id ? 'var(--dark)' : 'var(--border-light)', background: design===d.id ? 'var(--dark)' : 'var(--white)', cursor:'pointer', textAlign:'left', transition:'all 0.15s', display:'flex', justifyContent:'space-between', alignItems:'center', gap:16 }}>
                      <div>
                        <div style={{ fontSize:14, fontWeight:500, color: design===d.id ? '#fff' : 'var(--dark)' }}>{d.label}</div>
                        <div style={{ fontSize:12, color: design===d.id ? 'rgba(255,255,255,0.55)' : 'var(--light)', marginTop:2 }}>{d.desc}</div>
                      </div>
                      <span style={{ fontSize:12, fontFamily:'var(--font-mono)', color: design===d.id ? 'rgba(255,255,255,0.6)' : 'var(--light)', whiteSpace:'nowrap', flexShrink:0 }}>
                        {d.cost === 0 ? 'Included' : '+£' + d.cost}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Hosting */}
              <div className="reveal">
                <h3 style={{ fontSize:13, fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase', color:'var(--light)', marginBottom:16 }}>Ongoing hosting & support</h3>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:8 }}>
                  {HOSTING_OPTIONS.map(h => (
                    <button key={h.id} onClick={() => setHosting(h.id)}
                      style={{ padding:'12px 14px', borderRadius:10, border:'2px solid', borderColor: hosting===h.id ? (h.badge ? 'var(--accent)' : 'var(--dark)') : 'var(--border-light)', background: hosting===h.id ? (h.badge ? 'var(--accent)' : 'var(--dark)') : 'var(--white)', cursor:'pointer', textAlign:'left', transition:'all 0.15s', position:'relative' }}>
                      <div style={{ fontSize:13, fontWeight:600, color: hosting===h.id ? '#fff' : 'var(--dark)', marginBottom:h.desc?3:0 }}>{h.label}</div>
                      {h.desc && <div style={{ fontSize:11, color: hosting===h.id ? 'rgba(255,255,255,0.6)' : 'var(--light)' }}>{h.desc}</div>}
                      {h.badge && <div style={{ position:'absolute', top:8, right:8, fontSize:9, fontWeight:700, letterSpacing:'0.05em', background: hosting===h.id ? 'rgba(255,255,255,0.2)' : 'var(--accent)', color:'#fff', padding:'2px 6px', borderRadius:4 }}>{h.badge}</div>}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — Sticky price panel */}
            <div style={{ position:'sticky', top:'calc(var(--nav-h) + 24px)' }}>
              <div style={{ background:'var(--dark)', borderRadius:20, padding:'28px 24px', color:'#fff' }}>

                {/* Live price */}
                <div style={{ marginBottom:24 }}>
                  <div style={{ fontSize:12, letterSpacing:'0.06em', textTransform:'uppercase', color:'rgba(255,255,255,0.45)', marginBottom:8 }}>One-off build price</div>
                  <div style={{ fontSize:52, fontWeight:700, letterSpacing:'-0.03em', lineHeight:1, color:'#fff' }}>
                    £{displayTotal.toLocaleString()}
                  </div>
                  {monthlyCost > 0 && (
                    <div style={{ fontSize:14, color:'rgba(255,255,255,0.5)', marginTop:6 }}>
                      + £{monthlyCost}/mo hosting
                    </div>
                  )}
                </div>

                {/* Divider */}
                <div style={{ height:1, background:'rgba(255,255,255,0.1)', marginBottom:20 }}/>

                {/* Breakdown */}
                <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:20 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', fontSize:13 }}>
                    <span style={{ color:'rgba(255,255,255,0.5)' }}>Base (5 pages)</span>
                    <span style={{ color:'rgba(255,255,255,0.8)' }}>£{BASE_PRICE}</span>
                  </div>
                  {pagesCost > 0 && (
                    <div style={{ display:'flex', justifyContent:'space-between', fontSize:13 }}>
                      <span style={{ color:'rgba(255,255,255,0.5)' }}>{PAGE_OPTIONS.find(p=>p.id===pages)?.label}</span>
                      <span style={{ color:'rgba(255,255,255,0.8)' }}>+£{pagesCost}</span>
                    </div>
                  )}
                  {[...selected].map(id => {
                    const f = FEATURES.find(f => f.id === id)
                    if (!f) return null
                    return (
                      <div key={id} style={{ display:'flex', justifyContent:'space-between', fontSize:13 }}>
                        <span style={{ color:'rgba(255,255,255,0.5)' }}>{f.icon} {f.label}</span>
                        <span style={{ color:'rgba(255,255,255,0.8)' }}>+£{f.cost}</span>
                      </div>
                    )
                  })}
                  {designCost > 0 && (
                    <div style={{ display:'flex', justifyContent:'space-between', fontSize:13 }}>
                      <span style={{ color:'rgba(255,255,255,0.5)' }}>Design</span>
                      <span style={{ color:'rgba(255,255,255,0.8)' }}>+£{designCost}</span>
                    </div>
                  )}
                </div>

                {/* Suggested package */}
                <div style={{ padding:'10px 14px', borderRadius:10, border:'1px solid rgba(255,255,255,0.1)', background:'rgba(255,255,255,0.06)', marginBottom:20 }}>
                  <div style={{ fontSize:11, color:'rgba(255,255,255,0.4)', letterSpacing:'0.05em', textTransform:'uppercase', marginBottom:4 }}>Closest package</div>
                  <div style={{ fontSize:14, fontWeight:600, color: suggestColour }}>{suggest}</div>
                </div>

                {/* CTA */}
                <Link to="/contact" style={{ display:'block', textAlign:'center', padding:'14px', borderRadius:100, background:'#fff', color:'var(--dark)', textDecoration:'none', fontSize:14, fontWeight:700, letterSpacing:'0.01em', transition:'opacity 0.15s' }}
                  onMouseOver={e => e.currentTarget.style.opacity='0.9'}
                  onMouseOut={e => e.currentTarget.style.opacity='1'}>
                  Book a free call →
                </Link>
                <p style={{ fontSize:11, color:'rgba(255,255,255,0.3)', textAlign:'center', marginTop:12, lineHeight:1.5 }}>
                  This is an estimate. Final price confirmed on your free call.
                </p>
              </div>

              {/* Trust signals */}
              <div style={{ marginTop:16, display:'flex', flexDirection:'column', gap:8 }}>
                {[['✓ Fixed price — no hourly billing'],['✓ No hidden extras'],['✓ Free discovery call']].map(([t]) => (
                  <div key={t} style={{ fontSize:13, color:'var(--mid)', display:'flex', alignItems:'center', gap:6 }}>{t}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
