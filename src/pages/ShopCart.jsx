import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { formatPrice, getCartSubtotal, readCart, removeCartItem, updateCartItemQuantity } from '../lib/shop'

export default function ShopCart() {
  const navigate = useNavigate()
  const [items, setItems] = useState([])

  useEffect(() => {
    const sync = () => setItems(readCart())
    sync()
    window.addEventListener('shop-cart-updated', sync)
    return () => window.removeEventListener('shop-cart-updated', sync)
  }, [])

  const subtotal = getCartSubtotal(items)

  return (
    <main style={{ padding: 'calc(var(--nav-h) + 40px) max(24px, 50vw - 580px) 96px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, marginBottom: 28 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--light)' }}>Shop cart</div>
          <h1 style={{ marginTop: 8, fontSize: 'clamp(34px, 5vw, 54px)', lineHeight: 0.98, letterSpacing: '-0.05em', fontWeight: 600 }}>Review your order</h1>
        </div>
        <Link to="/shop" style={{ fontSize: 14, fontWeight: 600, color: 'var(--accent)' }}>Continue shopping</Link>
      </div>

      {!items.length ? (
        <div style={{ padding: 32, borderRadius: 24, border: '1px solid var(--border-light)', background: 'var(--cream)' }}>
          <div style={{ fontSize: 24, fontWeight: 600, letterSpacing: '-0.03em', marginBottom: 8 }}>Your cart is empty.</div>
          <div style={{ color: 'var(--mid)', marginBottom: 18 }}>Add products from the shop before continuing to checkout.</div>
          <Link to="/shop" className="btn-primary">Browse devices</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 360px', gap: 24, alignItems: 'start' }}>
          <div style={{ display: 'grid', gap: 16 }}>
            {items.map((item) => (
              <div key={item.key} style={{ display: 'grid', gridTemplateColumns: '120px minmax(0, 1fr)', gap: 18, padding: 20, borderRadius: 24, border: '1px solid var(--border-light)', background: '#fff' }}>
                <div style={{ aspectRatio: '1 / 1', borderRadius: 18, overflow: 'hidden', background: 'var(--cream)' }}>
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.productName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : null}
                </div>
                <div style={{ display: 'grid', gap: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 14 }}>
                    <div>
                      <div style={{ fontSize: 21, fontWeight: 600, letterSpacing: '-0.03em' }}>{item.productName}</div>
                      <div style={{ marginTop: 6, fontSize: 14, color: 'var(--mid)' }}>{item.variantLabel || 'Standard configuration'}</div>
                    </div>
                    <button type="button" onClick={() => removeCartItem(item.key)} style={{ border: 0, background: 'transparent', color: '#b42318', fontSize: 14, fontWeight: 600 }}>Remove</button>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: 6, borderRadius: 999, border: '1px solid var(--border-light)' }}>
                      <button type="button" onClick={() => updateCartItemQuantity(item.key, item.quantity - 1)} style={{ border: 0, background: 'transparent', fontSize: 18, padding: '6px 10px' }}>−</button>
                      <span style={{ minWidth: 22, textAlign: 'center', fontSize: 15, fontWeight: 600 }}>{item.quantity}</span>
                      <button type="button" onClick={() => updateCartItemQuantity(item.key, item.quantity + 1)} style={{ border: 0, background: 'transparent', fontSize: 18, padding: '6px 10px' }}>+</button>
                    </div>
                    <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.03em' }}>
                      {formatPrice(Number(item.unitPrice || 0) * Number(item.quantity || 0))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside style={{ padding: 24, borderRadius: 24, border: '1px solid var(--border-light)', background: '#fff', display: 'grid', gap: 16 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--light)' }}>Summary</div>
              <div style={{ marginTop: 8, fontSize: 28, fontWeight: 600, letterSpacing: '-0.04em' }}>{formatPrice(subtotal)}</div>
            </div>
            <div style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--mid)' }}>
              Prices are shown before delivery. Payment is completed securely in Stripe at the next step.
            </div>
            <button className="btn-primary" style={{ justifyContent: 'center', padding: '14px 18px', border: 0 }} onClick={() => navigate('/shop/checkout')}>
              Continue to checkout
            </button>
          </aside>
        </div>
      )}
    </main>
  )
}
