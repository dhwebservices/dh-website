import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import { GEO_CITY_LINKS } from '../lib/seoContent'

const SVCS = [
  { num:'01', title:'Custom Web Development', desc:"No templates. I build your site from scratch, specifically for what you need.", points:['React, Next.js or vanilla JS','Backend APIs and database integration','Authentication and user accounts','Third-party integrations','Fast and optimised from the start'] },
  { num:'02', title:'Design That Works', desc:'Clean, fast, and easy to use. Looks professional on phones and desktops.', points:['Brand-aligned design','Mobile-first responsive','Accessibility built-in','Conversion-focused','Clear user journeys'] },
  { num:'03', title:'SEO & Performance', desc:'Built to rank on Google. Fast loading, clean code, proper setup from the start.', points:['Technical SEO setup','Core Web Vitals optimisation','Structured data and schema markup','Google Analytics integration','Ongoing health monitoring'] },
  { num:'04', title:'Hosting & Maintenance', desc:"Hosting on Cloudflare. I keep it updated, backed up, and running fast.", points:['Managed Cloudflare hosting','Weekly backups','Security updates and patches','Content updates on request','Uptime monitoring and alerts'] },
  { num:'05', title:'E-commerce', desc:'Sell online with a store built to convert. Simple products or full catalogues.', points:['Product catalogue management','Secure payment processing','Inventory and order management','Discount codes and promotions','Mobile-optimised checkout'] },
  { num:'06', title:'HR System Integration', desc:'Staff portal for onboarding, leave requests, timesheets, and payslips. Built into your site or standalone.', points:['Staff onboarding portal','Leave and timesheet management','Payslip delivery system','Policy document storage','Manager dashboard and approvals'] },
]

const PROCESS = [
  { n:'01', title:'Brief', desc:'Tell me what you need. I'll ask questions until it's clear.' },
  { n:'02', title:'Quote', desc:'Fixed price. You'll know exactly what you're paying before I start.' },
  { n:'03', title:'Design', desc:'Mockups first. You approve the look before I write any code.' },
  { n:'04', title:'Build', desc:'7-10 days. I'll send progress updates so you know where it's at.' },
  { n:'05', title:'Launch', desc:'Test it, fix any issues, then it goes live. You get the login details.' },
]

export default function Services() {
  useReveal()
  return (
    <main style={{ paddingTop:'var(--nav-h)' }}>
      <section className="section">
        <div className="container" style={{ maxWidth:720 }}>
          <div className="reveal">
            <p className="eyebrow" style={{ marginBottom:16 }}>Services</p>
            <h1 style={{ fontFamily:'var(--font-sans)', fontSize:'clamp(40px,6vw,80px)', fontWeight:600, letterSpacing:'-0.03em', lineHeight:1.0, marginBottom:20 }}>
              Everything<br />you need.
            </h1>
            <p className="body-lg" style={{ maxWidth:480 }}>From your first website to a full enterprise stack. We cover every layer of what makes a great web presence.</p>
          </div>
        </div>
      </section>

      {/* Services */}
      {SVCS.map((s,i)=>(
        <div key={s.num} className="reveal" style={{ borderTop:'1px solid var(--border-light)' }}>
          <div className="container service-row" style={{ padding:'clamp(36px,4vw,52px) clamp(20px,5vw,60px)', gap:'clamp(24px,4vw,48px)', alignItems:'start' }}>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:12, color:'var(--light)', letterSpacing:'0.04em', paddingTop:4 }}>{s.num}</span>
            <div>
              <h2 style={{ fontSize:'clamp(20px,2.4vw,28px)', fontWeight:600, letterSpacing:'-0.02em', marginBottom:12 }}>{s.title}</h2>
              <p className="body-sm">{s.desc}</p>
            </div>
            <div>
              {s.points.map(p=>(
                <div key={p} style={{ display:'flex', gap:10, marginBottom:10, fontSize:14, color:'var(--dark2)', alignItems:'baseline' }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink:0, marginTop:2 }}><path d="M1.5 6.5L4 9L10.5 2.5" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  {p}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
      <div style={{ borderTop:'1px solid var(--border-light)' }} />

      {/* Process */}
      <section className="section" style={{ background:'var(--cream)', borderTop:'1px solid var(--border-light)' }}>
        <div className="container">
          <div className="reveal" style={{ marginBottom:'clamp(40px,5vw,64px)' }}>
            <p className="eyebrow" style={{ marginBottom:14 }}>How it works</p>
            <h2 className="headline-lg">Our process.</h2>
          </div>
          <div className="process-grid" style={{ gap:24, position:'relative' }}>
            <div style={{ position:'absolute', top:20, left:'10%', right:'10%', height:1, background:'var(--border-light)' }} />
            {PROCESS.map((p,i)=>(
              <div key={p.n} className="reveal" style={{ transitionDelay:`${i*0.07}s` }}>
                <div style={{ width:40, height:40, borderRadius:'50%', background:'var(--white)', border:'1px solid var(--border-light)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-mono)', fontSize:11, color:'var(--dark)', marginBottom:20, position:'relative', zIndex:1 }}>{p.n}</div>
                <div style={{ fontSize:15, fontWeight:600, marginBottom:8, letterSpacing:'-0.01em' }}>{p.title}</div>
                <p className="body-sm" style={{ fontSize:13 }}>{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="reveal" style={{ marginTop:64, display:'flex', gap:12, alignItems:'center' }}>
            <Link to="/contact" className="btn-primary">Start a project →</Link>
            <Link to="/pricing" className="btn-ghost">View pricing <span className="arrow">→</span></Link>
          </div>
        </div>
      </section>

      <section className="section" style={{ borderTop:'1px solid var(--border-light)' }}>
        <div className="container" style={{ maxWidth: 960 }}>
          <div className="reveal" style={{ marginBottom: 24 }}>
            <p className="eyebrow" style={{ marginBottom: 12 }}>Areas we cover</p>
            <h2 className="headline-md" style={{ marginBottom: 12 }}>Location-focused website builder pages.</h2>
            <p className="body-sm" style={{ maxWidth: 720 }}>
              We serve businesses across the UK. These pages are tailored to common search intent for local website builder and web design queries.
            </p>
          </div>
          <div className="reveal" style={{ display:'flex', flexWrap:'wrap', gap:12 }}>
            {GEO_CITY_LINKS.map((page) => (
              <Link
                key={page.to}
                to={page.to}
                className="btn-secondary"
                style={{ minWidth: 0 }}
              >
                {page.city}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
