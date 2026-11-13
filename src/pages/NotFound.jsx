import { Link } from 'react-router-dom'
import DeadEndGame from '../components/DeadEndGame'

export default function NotFound() {
  return (
    <main style={{ minHeight:'80vh', display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'calc(var(--nav-h) + 32px) 20px 80px' }}>
      <div style={{ width:'100%', maxWidth:720 }}>
        <p style={{ fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--light)', marginBottom:16 }}>404</p>
        <h1 style={{ fontSize:48, fontWeight:600, letterSpacing:'-0.03em', marginBottom:16 }}>Page not found</h1>
        <p className="body-md" style={{ marginBottom:32 }}>The page you're looking for doesn't exist.</p>
        <div style={{ marginBottom:32 }}>
          <DeadEndGame />
        </div>
        <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
          <Link to="/" className="btn-primary">Go home →</Link>
          <Link to="/contact" className="btn-secondary">Contact us</Link>
        </div>
      </div>
    </main>
  )
}
