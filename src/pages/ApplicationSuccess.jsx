import { Link, useLocation } from 'react-router-dom'

export default function ApplicationSuccess() {
  const location = useLocation()
  const applicationRef = location.state?.applicationRef || 'Your application reference'
  const roleTitle = location.state?.roleTitle || 'this role'

  return (
    <main style={{ paddingTop: 'var(--nav-h)' }}>
      <section className="section">
        <div className="container" style={{ maxWidth: 760 }}>
          <div className="glass-card" style={{ padding: 'clamp(30px,5vw,48px)', textAlign: 'center' }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,113,227,0.08)', color: 'var(--accent)', fontSize: 30 }}>✓</div>
            <h1 className="headline-md" style={{ marginBottom: 14 }}>Application submitted</h1>
            <p className="body-md" style={{ maxWidth: 520, margin: '0 auto 18px' }}>Your application for {roleTitle} has been sent successfully. Our HR team has also emailed a confirmation to the address you provided.</p>
            <div style={{ display: 'inline-flex', padding: '10px 16px', borderRadius: 999, border: '1px solid var(--border-light)', background: 'var(--off-white)', fontSize: 13.5, color: 'var(--dark2)', marginBottom: 24 }}>
              Reference: {applicationRef}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
              <Link to="/careers" className="btn-secondary">Back to careers</Link>
              <Link to="/" className="btn-primary">Return home</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
