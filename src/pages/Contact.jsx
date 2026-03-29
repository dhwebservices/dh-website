import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import { useCMS } from '../hooks/useCMS'
import { BookingWidget } from '../components/BookingWidget'

export default function Contact() {
  useReveal()
  const { data: cms } = useCMS('contact')

  return (
    <main style={{ paddingTop:'var(--nav-h)' }}>
      <section className="section">
        <div className="container">

          {/* Header */}
          <div className="reveal" style={{ textAlign:'center', maxWidth:640, margin:'0 auto 64px' }}>
            <p className="eyebrow" style={{ marginBottom:16 }}>Book a Call</p>
            <h1 style={{ fontFamily:'var(--font-sans)', fontSize:'clamp(40px,6vw,72px)', fontWeight:600, letterSpacing:'-0.03em', lineHeight:1.0, marginBottom:20 }}>
              Let's build<br />something.
            </h1>
            <p className="body-md" style={{ marginBottom:0 }}>
              Book a free 15 or 30 minute consultation. We'll discuss your project and give you a clear plan and a fixed price.
            </p>
          </div>

          {/* Two column — contact info + booking widget */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1.6fr', gap:'clamp(40px,6vw,96px)', alignItems:'start', maxWidth:960, margin:'0 auto' }}>

            {/* Left — contact details */}
            <div className="reveal-left">
              {/* Contact info card */}
              <div className="glass-card" style={{ borderRadius:16, overflow:'hidden', marginBottom:24 }}>
                {[
                  { label:'Email',    val: cms?.email    || 'clients@dhwebsiteservices.co.uk', href:'mailto:clients@dhwebsiteservices.co.uk' },
                  { label:'Phone',    val: cms?.phone    || '029 2002 4218', href:'tel:02920024218' },
                  { label:'Location', val: cms?.location || 'Cardiff, United Kingdom' },
                  { label:'Response', val: cms?.response_time || 'Within 24 hours' },
                ].map((c,i,arr) => (
                  <div key={c.label} style={{ padding:'16px 20px', borderBottom:i<arr.length-1?'1px solid var(--border-light)':'none', display:'flex', justifyContent:'space-between', alignItems:'center', gap:16 }}>
                    <span style={{ fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--light)' }}>{c.label}</span>
                    {c.href
                      ? <a href={c.href} style={{ fontSize:14, color:'var(--dark)', transition:'color 0.15s' }} onMouseOver={e=>e.currentTarget.style.color='var(--accent)'} onMouseOut={e=>e.currentTarget.style.color='var(--dark)'}>{c.val}</a>
                      : <span style={{ fontSize:14, color:'var(--dark2)' }}>{c.val}</span>
                    }
                  </div>
                ))}
              </div>

              {/* Business hours */}
              <div style={{ padding:'16px 20px', background:'var(--cream)', borderRadius:12, border:'1px solid var(--border-light)' }}>
                <p style={{ fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--light)', marginBottom:10 }}>Business hours</p>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6, fontSize:14 }}>
                  <span style={{ color:'var(--mid)' }}>Monday – Friday</span>
                  <span style={{ fontWeight:500, color:'var(--dark)' }}>{cms?.hours_weekday || '9am – 5pm GMT'}</span>
                </div>
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:14 }}>
                  <span style={{ color:'var(--mid)' }}>Weekends</span>
                  <span style={{ fontWeight:500, color:'var(--dark)' }}>{cms?.hours_weekend || 'Next business day'}</span>
                </div>
              </div>

              {/* What to expect */}
              <div style={{ marginTop:24 }}>
                <p style={{ fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--light)', marginBottom:14 }}>What to expect</p>
                {[
                  ['📞', 'We call you', 'From 029 2002 4218 at your chosen time'],
                  ['💬', 'Discuss your project', 'Tell us what you need, we listen'],
                  ['📋', 'Clear plan & price', 'Fixed quote, no surprises'],
                ].map(([icon, title, desc]) => (
                  <div key={title} style={{ display:'flex', gap:12, marginBottom:14, alignItems:'flex-start' }}>
                    <div style={{ width:32, height:32, borderRadius:8, background:'var(--cream)', border:'1px solid var(--border-light)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, flexShrink:0 }}>{icon}</div>
                    <div>
                      <div style={{ fontSize:13, fontWeight:600, color:'var(--dark)', marginBottom:2 }}>{title}</div>
                      <div style={{ fontSize:12, color:'var(--mid)' }}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — booking widget */}
            <div className="reveal-right">
              <div className="glass-card" style={{ borderRadius:20, padding:'32px' }}>
                <BookingWidget />
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  )
}
