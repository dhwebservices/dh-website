import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import { useCMS } from '../hooks/useCMS'

const BUILDS = [
  { name:'Starter', price:449, badge:'', delivery:'2–3 weeks', revisions:'1 round', desc:'5 pages, mobile responsive, basic SEO, contact form, SSL.', features:['5-page professional website','Mobile responsive design','Basic SEO setup','Contact form','Google Maps embed','SSL certificate'] },
  { name:'Growth', price:999, badge:'Most Popular', delivery:'3–4 weeks', revisions:'2 rounds', desc:'10 pages, blog, full SEO, branding, analytics.', features:['10-page website','Blog section','Full SEO setup','Branding integration','Google Analytics','Social media links','SSL certificate'] },
  { name:'Pro', price:1499, badge:'', delivery:'4–6 weeks', revisions:'3 rounds', desc:'15 pages, e-commerce, custom integrations, advanced SEO.', features:['15 pages','E-commerce ready','Custom integrations','Advanced SEO','Blog / News section','Priority support','SSL certificate'] },
  { name:'Enterprise + HR', price:2499, badge:'Complete Package', delivery:'6–8 weeks', revisions:'3 rounds', desc:'Full enterprise site with built-in HR system.', features:['Full enterprise website','Integrated HR system','Staff onboarding portal','Leave and timesheet management','SEO and branding','Content creation'] },
]
const HOSTING = [
  { name:'Starter', price:35, desc:'1 content update/month, 48–72hr support, weekly backups, uptime monitoring.' },
  { name:'Professional', price:65, desc:'3 updates/month, priority support, weekly backups, SEO health check, monitoring.', badge:'Most Popular' },
  { name:'Business', price:109, desc:'Unlimited updates, priority support, weekly backups, performance tuning, quarterly review.' },
]
const HR = [
  { name:'HR Add-on', price:'£1,200', type:'one-off', desc:'HR system added to an existing DH website.' },
  { name:'Standalone HR', price:'£1,800', type:'one-off', desc:'HR system built independently, hosted on our infrastructure.' },
  { name:'Enterprise + HR', price:'£2,499', type:'one-off', desc:'Full enterprise website with integrated HR portal.', badge:'Best Value' },
  { name:'HR Maintenance', price:'£49/mo', type:'monthly', desc:'Ongoing HR support, staff changes, updates.' },
]
const FAQS = [
  { q:'Do you offer payment plans?', a:'Yes — staged payments available on larger projects. Get in touch to discuss.' },
  { q:'What happens after delivery?', a:'You receive a handover call, all source files, and ongoing support through a hosting plan.' },
  { q:'Can I upgrade my package later?', a:'Absolutely. Many clients start on Starter and upgrade as they grow.' },
  { q:'Is hosting included in the build price?', a:'No — hosting is a separate monthly plan so you only pay for what you need.' },
  { q:'Do you work outside Wales and the UK?', a:'Yes, we work with clients across the UK and internationally, fully remote.' },
]

export default function Pricing() {
  useReveal()
  const { data: pricingCms } = useCMS('pricing')
  const { data: faqCms } = useCMS('faq')
  const [tab, setTab] = useState('build')
  const [openFaq, setOpenFaq] = useState(null)
  const buildPackages = Array.isArray(pricingCms?.builds) && pricingCms.builds.length > 0 ? pricingCms.builds : BUILDS
  const hostingPlans = Array.isArray(pricingCms?.hosting) && pricingCms.hosting.length > 0 ? pricingCms.hosting : HOSTING
  const faqs = Array.isArray(faqCms) && faqCms.length > 0 ? faqCms : FAQS

  return (
    <main style={{ paddingTop:'var(--nav-h)' }}>
      {/* Hero */}
      <section className="section" style={{ paddingBottom:'clamp(40px,5vw,64px)' }}>
        <div className="container" style={{ maxWidth:720 }}>
          <div className="reveal">
            <p className="eyebrow" style={{ marginBottom:16 }}>Pricing</p>
            <h1 style={{ fontFamily:'var(--font-sans)', fontSize:'clamp(40px,6vw,80px)', fontWeight:600, letterSpacing:'-0.03em', lineHeight:1.0, marginBottom:20 }}>
              Simple,<br />fixed pricing.
            </h1>
            <p className="body-lg">No hourly billing, no surprises. Clear packages built around what growing businesses actually need.</p>
          </div>
        </div>
      </section>

      {/* Tab bar */}
      <div style={{ borderBottom:'1px solid var(--border-light)', position:'sticky', top:'var(--nav-h)', background:'rgba(255,255,255,0.92)', backdropFilter:'saturate(1.8) blur(20px)', zIndex:50 }}>
        <div className="container" style={{ display:'flex', gap:0 }}>
          {[['build','Website Builds'],['hosting','Hosting'],['hr','HR System']].map(([k,l])=>(
            <button key={k} onClick={()=>setTab(k)} style={{ padding:'14px 20px', background:'none', border:'none', fontFamily:'var(--font-mono)', fontSize:12, fontWeight:500, letterSpacing:'0.06em', textTransform:'uppercase', color:tab===k?'var(--dark)':'var(--light)', cursor:'pointer', borderBottom:`2px solid ${tab===k?'var(--dark)':'transparent'}`, marginBottom:-1, transition:'color 0.15s' }}>{l}</button>
          ))}
        </div>
      </div>

      {/* Build packages */}
      {tab==='build' && (
        <section className="section">
          <div className="container">
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:16 }}>
              {buildPackages.map((p,i)=>(
                <div key={p.name} className={`reveal pricing-card ${p.badge==='Most Popular' ? 'glass-card-dark' : 'glass-card'}`} style={{ padding:'28px 24px', borderRadius:20, position:'relative', transitionDelay:`${i*0.07}s` }}>
                  {p.badge && <div style={{ position:'absolute', top:16, right:16, padding:'3px 10px', borderRadius:100, background: p.badge==='Most Popular'?'var(--accent)':'var(--accent-soft)', fontSize:11, fontWeight:600, color:p.badge==='Most Popular'?'white':'var(--accent)', letterSpacing:'0.04em' }}>{p.badge}</div>}
                  <p style={{ fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'0.08em', textTransform:'uppercase', color:p.badge==='Most Popular'?'rgba(255,255,255,0.4)':'var(--light)', marginBottom:12 }}>{p.name}</p>
                  <div style={{ fontSize:40, fontWeight:600, letterSpacing:'-0.03em', lineHeight:1, color:p.badge==='Most Popular'?'white':'var(--dark)', marginBottom:6 }}>£{p.price.toLocaleString()}</div>
                  <p style={{ fontFamily:'var(--font-mono)', fontSize:11, color:p.badge==='Most Popular'?'rgba(255,255,255,0.4)':'var(--light)', marginBottom:16, letterSpacing:'0.04em' }}>ONE-OFF</p>
                  <div style={{ display:'flex', gap:16, marginBottom:20, paddingBottom:20, borderBottom:`1px solid ${p.badge==='Most Popular'?'rgba(255,255,255,0.1)':'var(--border-light)'}` }}>
                    <div style={{ fontSize:12, color:p.badge==='Most Popular'?'rgba(255,255,255,0.5)':'var(--mid)' }}>Delivery: <strong style={{ color:p.badge==='Most Popular'?'white':'var(--dark)' }}>{p.delivery}</strong></div>
                  </div>
                  {p.features.map(f=>(
                    <div key={f} style={{ display:'flex', gap:8, marginBottom:8, fontSize:13.5, color:p.badge==='Most Popular'?'rgba(255,255,255,0.65)':'var(--dark2)', alignItems:'baseline' }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink:0, marginTop:2 }}><path d="M1.5 6.5L4 9L10.5 2.5" stroke={p.badge==='Most Popular'?'rgba(255,255,255,0.5)':'var(--accent)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      {f}
                    </div>
                  ))}
                  <Link to="/contact" style={{ display:'block', textAlign:'center', padding:'12px', borderRadius:100, fontSize:14, fontWeight:500, marginTop:20, background:p.badge==='Most Popular'?'white':'var(--accent)', color:p.badge==='Most Popular'?'var(--dark)':'white', transition:'opacity 0.15s' }}
                    className="card-cta"
                  >Get started</Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Hosting */}
      {tab==='hosting' && (
        <section className="section">
          <div className="container" style={{ maxWidth:860 }}>
            <div className="reveal" style={{ marginBottom:40 }}>
              <p className="body-md">Monthly hosting plans to keep your site fast, secure and up to date.</p>
            </div>
            <div className="pricing-grid-three" style={{ gap:16 }}>
              {hostingPlans.map((p,i)=>(
                <div key={p.name} className={`reveal pricing-card ${p.badge ? 'glass-card-dark' : 'glass-card'}`} style={{ padding:'28px 24px', borderRadius:20, position:'relative', transitionDelay:`${i*0.07}s` }}>
                  {p.badge && <div style={{ position:'absolute', top:16, right:16, padding:'3px 10px', borderRadius:100, background:'var(--accent)', fontSize:11, fontWeight:600, color:'white', letterSpacing:'0.04em' }}>{p.badge}</div>}
                  <p style={{ fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'0.08em', textTransform:'uppercase', color:p.badge?'rgba(255,255,255,0.4)':'var(--light)', marginBottom:12 }}>{p.name}</p>
                  <div style={{ fontSize:40, fontWeight:600, letterSpacing:'-0.03em', lineHeight:1, color:p.badge?'white':'var(--dark)', marginBottom:4 }}>£{p.price}</div>
                  <p style={{ fontFamily:'var(--font-mono)', fontSize:11, color:p.badge?'rgba(255,255,255,0.4)':'var(--light)', marginBottom:20, letterSpacing:'0.04em' }}>PER MONTH</p>
                  <p style={{ fontSize:14, lineHeight:1.6, color:p.badge?'rgba(255,255,255,0.6)':'var(--mid)', marginBottom:24 }}>{p.desc}</p>
                  <Link to="/contact" style={{ display:'block', textAlign:'center', padding:'12px', borderRadius:100, fontSize:14, fontWeight:500, background:p.badge?'white':'var(--accent)', color:p.badge?'var(--dark)':'white', transition:'opacity 0.15s' }}
                    className="card-cta"
                  >Get started</Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* HR */}
      {tab==='hr' && (
        <section className="section">
          <div className="container" style={{ maxWidth:860 }}>
            <div className="reveal" style={{ marginBottom:40 }}>
              <p className="body-md" style={{ maxWidth:520 }}>A fully integrated HR portal — onboarding, leave, payslips, timesheets, policies — built into your site or standalone.</p>
            </div>
            <div className="pricing-grid-two" style={{ gap:16 }}>
              {HR.map((p,i)=>(
                <div key={p.name} className={`reveal pricing-card ${p.badge ? 'glass-card-dark' : 'glass-card'}`} style={{ padding:'28px 24px', borderRadius:20, position:'relative', transitionDelay:`${i*0.07}s` }}>
                  {p.badge && <div style={{ position:'absolute', top:16, right:16, padding:'3px 10px', borderRadius:100, background:p.badge === 'Best Value' ? 'white' : 'var(--accent-soft)', fontSize:11, fontWeight:600, color:p.badge === 'Best Value' ? 'var(--accent)' : 'var(--accent)', letterSpacing:'0.04em' }}>{p.badge}</div>}
                  <p style={{ fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'0.08em', textTransform:'uppercase', color:p.badge ? 'rgba(255,255,255,0.4)' : 'var(--light)', marginBottom:12 }}>{p.name}</p>
                  <div style={{ fontSize:40, fontWeight:600, letterSpacing:'-0.03em', lineHeight:1, color:p.badge ? 'white' : 'var(--dark)', marginBottom:4 }}>{p.price}</div>
                  <p style={{ fontFamily:'var(--font-mono)', fontSize:11, color:p.badge ? 'rgba(255,255,255,0.4)' : 'var(--light)', marginBottom:20, letterSpacing:'0.04em' }}>{p.type}</p>
                  <p style={{ fontSize:14, lineHeight:1.6, color:p.badge ? 'rgba(255,255,255,0.68)' : 'var(--mid)', marginBottom:24 }}>{p.desc}</p>
                  <Link
                    to="/contact"
                    style={{ display:'block', textAlign:'center', padding:'12px', borderRadius:100, fontSize:14, fontWeight:500, background:p.badge ? 'white' : 'var(--accent)', color:p.badge ? 'var(--dark)' : 'white', transition:'opacity 0.15s' }}
                    className="card-cta"
                  >
                    Get started
                  </Link>
                </div>
              ))}
            </div>
            <div className="reveal" style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:12, flexWrap:'wrap', marginTop:32 }}>
              <Link to="/contact" className="btn-primary">Discuss HR integration →</Link>
              <a href="https://dhworkplace.co.uk" target="_blank" rel="noreferrer" className="btn-secondary">
                Get your HR and CMS portal today
              </a>
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="section" style={{ background:'var(--cream)', borderTop:'1px solid var(--border-light)' }}>
        <div className="container section-narrow">
          <div className="reveal" style={{ marginBottom:48 }}>
            <p className="eyebrow" style={{ marginBottom:14 }}>FAQ</p>
            <h2 className="headline-md">Common questions</h2>
          </div>
          {faqs.map((f,i)=>(
            <div key={i} className="reveal" style={{ borderTop:'1px solid var(--border-light)' }}>
              <button onClick={()=>setOpenFaq(openFaq===i?null:i)} style={{ width:'100%', padding:'20px 0', background:'none', border:'none', display:'flex', justifyContent:'space-between', alignItems:'center', gap:16, cursor:'pointer', textAlign:'left' }}>
                <span style={{ fontSize:16, fontWeight:500, letterSpacing:'-0.01em', color:'var(--dark)' }}>{f.q}</span>
                <span style={{ fontSize:20, color:'var(--mid)', transition:'transform 0.2s', display:'block', flexShrink:0, transform:openFaq===i?'rotate(45deg)':'none' }}>+</span>
              </button>
              {openFaq===i && <p className="body-sm" style={{ paddingBottom:20, animation:'slideUp 0.25s ease both', maxWidth:560 }}>{f.a}</p>}
            </div>
          ))}
          <div style={{ borderTop:'1px solid var(--border-light)', paddingTop:40, marginTop:8, display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:16 }}>
            <p className="body-sm">Still have questions?</p>
            <Link to="/contact" className="btn-primary">Talk to us →</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
