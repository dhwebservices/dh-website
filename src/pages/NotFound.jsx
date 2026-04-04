import { Link } from 'react-router-dom'
export default function NotFound() {
  return (
    <main style={{ paddingTop:'var(--nav-h)', minHeight:'80vh', display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'var(--nav-h) 20px 80px' }}>
      <div>
        <p style={{ fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--light)', marginBottom:16 }}>404</p>
        <h1 style={{ fontSize:48, fontWeight:600, letterSpacing:'-0.03em', marginBottom:16 }}>Page not found</h1>
        <p className="body-md" style={{ marginBottom:32 }}>The page you're looking for doesn't exist.</p>
        <Link to="/" className="btn-primary">Go home →</Link>
      </div>
    </main>
  )
}
