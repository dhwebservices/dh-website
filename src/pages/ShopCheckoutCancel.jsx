import { Link, useSearchParams } from 'react-router-dom'

export default function ShopCheckoutCancel() {
  const [searchParams] = useSearchParams()
  const orderNumber = searchParams.get('order')

  return (
    <main style={{ padding: 'calc(var(--nav-h) + 40px) max(24px, 50vw - 580px) 96px' }}>
      <div style={{ maxWidth: 760, padding: 32, borderRadius: 28, border: '1px solid rgba(17,24,39,0.08)', background: '#fff' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--light)' }}>Checkout cancelled</div>
        <div style={{ marginTop: 10, fontSize: 34, fontWeight: 600, letterSpacing: '-0.04em' }}>Your payment was not completed.</div>
        <p style={{ marginTop: 12, fontSize: 16, lineHeight: 1.8, color: 'var(--mid)' }}>
          {orderNumber
            ? `Order ${orderNumber} has been left unpaid. You can return to your cart and try again when ready.`
            : 'You can return to your cart and complete checkout when ready.'}
        </p>
        <div style={{ marginTop: 20, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link to="/shop/cart" className="btn-primary">Return to cart</Link>
          <Link to="/shop" className="btn-outline">Back to shop</Link>
        </div>
      </div>
    </main>
  )
}
