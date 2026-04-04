import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'

const SVCS = [
  { num:'01', title:'Custom Web Development', desc:"We don't use templates. Every site is purpose-built for your business using production-ready code.", points:['React, Next.js or vanilla JS','Backend APIs and database integration','Authentication and user accounts','Third-party integrations','Performance-optimised from day one'] },
  { num:'02', title:'User-Centric Design', desc:'Interfaces built around what your customers actually need. Every decision has a reason.', points:['Brand-aligned design system','Mobile-first responsive layouts','WCAG 2.1 accessibility','Conversion-focused UX','Purposeful interaction design'] },
  { num:'03', title:'SEO & Performance', desc:'A website nobody finds is worthless. SEO is built in from line one, not bolted on at the end.', points:['Technical SEO setup','Core Web Vitals optimisation','Structured data and schema markup','Google Analytics integration','Ongoing health monitoring'] },
  { num:'04', title:'Hosting & Maintenance', desc:"We stay after launch. Your site is kept fast, secure, and current without you worrying about it.", points:['Managed Cloudflare hosting','Weekly backups','Security updates and patches','Content updates on request','Uptime monitoring and alerts'] },
  { num:'05', title:'E-commerce', desc:'Sell online with a store built for conversion. From simple product pages to complex catalogues.', points:['Product catalogue management','Secure payment processing','Inventory and order management','Discount codes and promotions','Mobile-optimised checkout'] },
  { num:'06', title:'HR System Integration', desc:'A complete staff management portal — onboarding, leave, timesheets, payslips — built into your site or standalone.', points:['Staff onboarding portal','Leave and timesheet management','Payslip delivery system','Policy document storage','Manager dashboard and approvals'] },
]

const PROCESS = [
  { n:'01', title:'Discovery', desc:'We learn your business, your customers, and what success looks like. This shapes every decision.' },
  { n:'02', title:'Design', desc:'Wireframes and mockups before any code. You see it and approve it before we build.' },
  { n:'03', title:'Build', desc:'Development with regular check-ins. No surprises, no scope creep, no disappearing.' },
  { n:'04', title:'Launch', desc:'Testing, revisions, and a smooth handover. You go live with confidence.' },
  { n:'05', title:'Support', desc:'Ongoing maintenance and support through one of our hosting plans. We\'re here.' },
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
    </main>
  )
}
