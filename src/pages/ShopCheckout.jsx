import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { formatPrice, getCartSubtotal, readCart, startShopCheckout } from '../lib/shop'

const EMPTY_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  line1: '',
  line2: '',
  city: '',
  county: '',
  postcode: '',
  notes: '',
}

export default function ShopCheckout() {
  const [items, setItems] = useState(() => readCart())
  const [form, setForm] = useState(EMPTY_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const subtotal = useMemo(() => getCartSubtotal(items), [items])

  const updateField = (key, value) => setForm((current) => ({ ...current, [key]: value }))

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    if (!items.length) {
      setError('Your cart is empty.')
      return
    }
    setSubmitting(true)
    try {
      const address = {
        line1: form.line1,
        line2: form.line2,
        city: form.city,
        county: form.county,
        postcode: form.postcode,
        country: 'United Kingdom',
      }
      const result = await startShopCheckout({
        customer: {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
        },
        shippingAddress: address,
        billingAddress: address,
        notes: form.notes,
        items,
      })
      if (!result?.url) throw new Error('Checkout session did not return a payment URL')
      window.location.href = result.url
    } catch (err) {
      setError(err.message || 'Checkout failed.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main style={{ padding: 'calc(var(--nav-h) + 40px) max(24px, 50vw - 580px) 96px' }}>
      <div style={{ marginBottom: 18 }}>
        <Link to="/shop/cart" style={{ fontSize: 14, fontWeight: 600, color: 'var(--accent)' }}>← Back to cart</Link>
      </div>

      <div style={{ marginBottom: 28 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--light)' }}>Checkout</div>
        <h1 style={{ marginTop: 8, fontSize: 'clamp(34px, 5vw, 54px)', lineHeight: 0.98, letterSpacing: '-0.05em', fontWeight: 600 }}>Submit your order</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 360px', gap: 24, alignItems: 'start' }}>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 18 }}>
            <div style={{ padding: 24, borderRadius: 24, border: '1px solid var(--border-light)', background: '#fff', display: 'grid', gap: 16 }}>
              <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.03em' }}>Customer details</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 14 }}>
                <input required placeholder="First name" value={form.firstName} onChange={(e) => updateField('firstName', e.target.value)} style={inputStyle} />
                <input required placeholder="Last name" value={form.lastName} onChange={(e) => updateField('lastName', e.target.value)} style={inputStyle} />
                <input required type="email" placeholder="Email address" value={form.email} onChange={(e) => updateField('email', e.target.value)} style={inputStyle} />
                <input placeholder="Phone number" value={form.phone} onChange={(e) => updateField('phone', e.target.value)} style={inputStyle} />
              </div>
            </div>

            <div style={{ padding: 24, borderRadius: 24, border: '1px solid var(--border-light)', background: '#fff', display: 'grid', gap: 16 }}>
              <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.03em' }}>Delivery address</div>
              <div style={{ display: 'grid', gap: 14 }}>
                <input required placeholder="Address line 1" value={form.line1} onChange={(e) => updateField('line1', e.target.value)} style={inputStyle} />
                <input placeholder="Address line 2" value={form.line2} onChange={(e) => updateField('line2', e.target.value)} style={inputStyle} />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 14 }}>
                  <input required placeholder="Town / city" value={form.city} onChange={(e) => updateField('city', e.target.value)} style={inputStyle} />
                  <input placeholder="County" value={form.county} onChange={(e) => updateField('county', e.target.value)} style={inputStyle} />
                  <input required placeholder="Postcode" value={form.postcode} onChange={(e) => updateField('postcode', e.target.value)} style={inputStyle} />
                </div>
                <textarea placeholder="Order notes" value={form.notes} onChange={(e) => updateField('notes', e.target.value)} style={{ ...inputStyle, minHeight: 110, resize: 'vertical' }} />
              </div>
            </div>

            {error ? (
              <div style={{ padding: '14px 16px', borderRadius: 18, border: '1px solid rgba(180, 35, 24, 0.22)', background: 'rgba(180,35,24,0.06)', color: '#b42318', fontSize: 14 }}>
                {error}
              </div>
            ) : null}

            <button type="submit" className="btn-primary" style={{ justifyContent: 'center', padding: '14px 18px', border: 0 }} disabled={submitting}>
              {submitting ? 'Redirecting to payment…' : 'Continue to payment'}
            </button>
          </form>

          <aside style={{ padding: 24, borderRadius: 24, border: '1px solid var(--border-light)', background: '#fff', display: 'grid', gap: 18 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--light)' }}>Order summary</div>
              <div style={{ marginTop: 8, fontSize: 30, fontWeight: 600, letterSpacing: '-0.04em' }}>{formatPrice(subtotal)}</div>
            </div>
            <div style={{ display: 'grid', gap: 12 }}>
              {items.map((item) => (
                <div key={item.key} style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 14 }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{item.productName}</div>
                    <div style={{ marginTop: 4, fontSize: 13, color: 'var(--mid)' }}>{item.variantLabel || 'Standard configuration'} · Qty {item.quantity}</div>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{formatPrice(Number(item.unitPrice || 0) * Number(item.quantity || 0))}</div>
                </div>
              ))}
            </div>
            <div style={{ padding: 14, borderRadius: 18, background: 'var(--cream)', color: 'var(--mid)', fontSize: 13, lineHeight: 1.7 }}>
              You will be redirected to secure Stripe-hosted checkout to complete payment.
            </div>
          </aside>
        </div>
    </main>
  )
}

const inputStyle = {
  width: '100%',
  padding: '14px 16px',
  borderRadius: 16,
  border: '1px solid var(--border-light)',
  background: '#fff',
  color: 'var(--dark)',
  fontSize: 15,
  outline: 'none',
}
