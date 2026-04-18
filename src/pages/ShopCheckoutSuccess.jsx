import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { clearCart } from '../lib/shop'

export default function ShopCheckoutSuccess() {
  const [searchParams] = useSearchParams()
  const [state, setState] = useState({ loading: true, error: '', order: null })

  useEffect(() => {
    const sessionId = searchParams.get('session_id')
    if (!sessionId) {
      setState({ loading: false, error: 'Missing checkout session.', order: null })
      return
    }

    let active = true
    fetch(`/api/shop/confirm-checkout?session_id=${encodeURIComponent(sessionId)}`)
      .then(async (response) => {
        const payload = await response.json().catch(() => ({}))
        if (!response.ok) throw new Error(payload?.error || 'Could not confirm payment')
        return payload
      })
      .then((payload) => {
        if (!active) return
        clearCart()
        setState({ loading: false, error: '', order: payload.order || null })
      })
      .catch((error) => {
        if (!active) return
        setState({ loading: false, error: error.message || 'Could not confirm payment', order: null })
      })

    return () => {
      active = false
    }
  }, [searchParams])

  return (
    <main style={{ padding: 'calc(var(--nav-h) + 40px) max(24px, 50vw - 580px) 96px' }}>
      <div style={{ maxWidth: 760, padding: 32, borderRadius: 28, border: '1px solid rgba(17,24,39,0.08)', background: '#fff' }}>
        {state.loading ? (
          <>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)' }}>Confirming payment</div>
            <div style={{ marginTop: 10, fontSize: 34, fontWeight: 600, letterSpacing: '-0.04em' }}>Finalising your order…</div>
            <p style={{ marginTop: 12, fontSize: 16, lineHeight: 1.8, color: 'var(--mid)' }}>
              We are confirming payment with Stripe and preparing your order record.
            </p>
          </>
        ) : state.error ? (
          <>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#b42318' }}>Confirmation failed</div>
            <div style={{ marginTop: 10, fontSize: 34, fontWeight: 600, letterSpacing: '-0.04em' }}>We couldn’t confirm that payment.</div>
            <p style={{ marginTop: 12, fontSize: 16, lineHeight: 1.8, color: 'var(--mid)' }}>{state.error}</p>
            <div style={{ marginTop: 20, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/shop/cart" className="btn-primary">Return to cart</Link>
              <Link to="/contact" className="btn-outline">Contact support</Link>
            </div>
          </>
        ) : (
          <>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)' }}>Order confirmed</div>
            <div style={{ marginTop: 10, fontSize: 34, fontWeight: 600, letterSpacing: '-0.04em' }}>{state.order?.order_number}</div>
            <p style={{ marginTop: 12, fontSize: 16, lineHeight: 1.8, color: 'var(--mid)' }}>
              Payment has been received successfully. We have emailed your confirmation and will keep you updated as the order moves toward dispatch.
            </p>
            <div style={{ marginTop: 20, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/shop" className="btn-primary">Continue shopping</Link>
              <Link to="/contact" className="btn-outline">Need help?</Link>
            </div>
          </>
        )}
      </div>
    </main>
  )
}
