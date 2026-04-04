import { Link } from 'react-router-dom'

const LEGAL = [
  {l:'Privacy',to:'/privacy'},{l:'Terms',to:'/terms'},{l:'Services Terms',to:'/services-terms'},
  {l:'Refunds',to:'/refunds'},{l:'Cookies',to:'/cookies'},{l:'Acceptable Use',to:'/acceptable-use'},
  {l:'Accessibility',to:'/accessibility'},{l:'Security',to:'/security'},{l:'Complaints',to:'/complaints'},
]

export default function Footer() {
  return (
    <footer style={{ background:'var(--cream)', borderTop:'1px solid var(--border-light)' }}>
      <div style={{ maxWidth:'var(--max-w)', margin:'0 auto', padding:'clamp(48px,6vw,72px) clamp(20px,5vw,60px) 32px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', gap:40, marginBottom:48 }}>
          {/* Brand */}
          <div>
            <img src="/dh-logo.png" alt="DH Website Services" style={{ height:18, filter:'brightness(0)', marginBottom:16 }} />
            <p style={{ fontSize:14, lineHeight:1.7, color:'var(--mid)', maxWidth:280, marginBottom:20 }}>Production-ready websites that work as hard as you do. Built in Wales, serving clients across the UK.</p>
            <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
              <a href="mailto:clients@dhwebsiteservices.co.uk" style={{ fontSize:13, color:'var(--mid)', transition:'color 0.15s' }} onMouseOver={e=>e.currentTarget.style.color='var(--dark)'} onMouseOut={e=>e.currentTarget.style.color='var(--mid)'}>clients@dhwebsiteservices.co.uk</a>
              <a href="tel:02920024218" style={{ fontSize:13, color:'var(--mid)', transition:'color 0.15s' }} onMouseOver={e=>e.currentTarget.style.color='var(--dark)'} onMouseOut={e=>e.currentTarget.style.color='var(--mid)'}>029 2002 4218</a>
            </div>
          </div>
          {/* Nav */}
          <div>
            <p style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--light)', marginBottom:14 }}>Company</p>
            {[{l:'Home',to:'/'},{l:'About',to:'/about'},{l:'Services',to:'/services'},{l:'Portfolio',to:'/portfolio'},{l:'Pricing',to:'/pricing'},{l:'Careers',to:'/careers'},{l:'Contact',to:'/contact'}].map(n=>(
              <Link key={n.to} to={n.to} style={{ display:'block', fontSize:13, color:'var(--mid)', marginBottom:9, transition:'color 0.15s' }} onMouseOver={e=>e.currentTarget.style.color='var(--dark)'} onMouseOut={e=>e.currentTarget.style.color='var(--mid)'}>{n.l}</Link>
            ))}
          </div>
          {/* Support */}
          <div>
            <p style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--light)', marginBottom:14 }}>Support</p>
            <Link to="/contact" style={{ display:'block', fontSize:13, color:'var(--mid)', marginBottom:9, transition:'color 0.15s' }} onMouseOver={e=>e.currentTarget.style.color='var(--dark)'} onMouseOut={e=>e.currentTarget.style.color='var(--mid)'}>Contact Us</Link>
            <a href="https://app.dhwebsiteservices.co.uk" target="_blank" rel="noreferrer" style={{ display:'block', fontSize:13, color:'var(--mid)', marginBottom:9, transition:'color 0.15s' }} onMouseOver={e=>e.currentTarget.style.color='var(--dark)'} onMouseOut={e=>e.currentTarget.style.color='var(--mid)'}>Client Portal</a>
          </div>
          {/* Hours */}
          <div>
            <p style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--light)', marginBottom:14 }}>Hours</p>
            <div style={{ marginBottom:10 }}>
              <div style={{ fontSize:13, color:'var(--mid)', marginBottom:2 }}>Monday – Friday</div>
              <div style={{ fontSize:13, fontWeight:500, color:'var(--dark)' }}>9am – 5pm GMT</div>
            </div>
            <div>
              <div style={{ fontSize:13, color:'var(--mid)', marginBottom:2 }}>Weekends</div>
              <div style={{ fontSize:13, fontWeight:500, color:'var(--dark)' }}>Next business day</div>
            </div>
          </div>
        </div>

        <div style={{ borderTop:'1px solid var(--border-light)', paddingTop:24 }}>
          <div style={{ display:'flex', flexWrap:'wrap', gap:'4px 16px', marginBottom:16 }}>
            {LEGAL.map(l=>(
              <Link key={l.to} to={l.to} style={{ fontSize:12, color:'var(--light)', transition:'color 0.15s' }} onMouseOver={e=>e.currentTarget.style.color='var(--mid)'} onMouseOut={e=>e.currentTarget.style.color='var(--light)'}>{l.l}</Link>
            ))}
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:8 }}>
            <p style={{ fontSize:12, color:'var(--light)' }}>© 2026 DH Website Services (David Hooper Home Limited, Co. No. 17018784)</p>
            <p style={{ fontSize:12, color:'var(--light)' }}>Cardiff, Wales</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
