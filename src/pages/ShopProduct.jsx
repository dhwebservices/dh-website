import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { addCartItem, buildVariantLabel, fetchProductBySlug, formatPrice, getShopProductImage } from '../lib/shop'

export default function ShopProduct() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [selectedVariantId, setSelectedVariantId] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetchProductBySlug(slug)
      .then((nextProduct) => {
        setProduct(nextProduct)
        const defaultVariant = (nextProduct?.variants || []).find((variant) => variant.is_available !== false)
        setSelectedVariantId(defaultVariant?.id || '')
        document.title = `${nextProduct?.name || 'Product'} | DH Website Services`
      })
      .finally(() => setLoading(false))
  }, [slug])

  const variants = product?.variants || []
  const selectedVariant = useMemo(
    () => variants.find((variant) => variant.id === selectedVariantId) || variants[0] || null,
    [variants, selectedVariantId]
  )
  const imageUrl = getShopProductImage(product || {})

  const handleAddToCart = () => {
    if (!product || !selectedVariant) return
    addCartItem({ product, variant: selectedVariant, quantity })
    navigate('/shop/cart')
  }

  if (loading) {
    return <main style={{ padding: 'calc(var(--nav-h) + 40px) max(24px, 50vw - 640px) 96px', color: 'var(--mid)' }}>Loading product…</main>
  }

  if (!product) {
    return <main style={{ padding: 'calc(var(--nav-h) + 40px) max(24px, 50vw - 640px) 96px' }}>This product is unavailable.</main>
  }

  return (
    <main style={{ padding: 'calc(var(--nav-h) + 24px) max(20px, 50vw - 640px) 88px' }}>
      <div style={{ marginBottom: 18 }}>
        <Link to="/shop" style={{ fontSize: 14, fontWeight: 600, color: 'var(--accent)' }}>← Back to shop</Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 0.8fr) minmax(320px, 0.9fr)', gap: 20, alignItems: 'start' }}>
        <div style={{ borderRadius: 20, overflow: 'hidden', background: 'linear-gradient(180deg, #f8f9fb, #edf1f7)', minHeight: 300, padding: 20 }}>
          {imageUrl ? (
            <img src={imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          ) : (
            <div style={{ minHeight: 260, display: 'grid', placeItems: 'center', color: 'var(--mid)' }}>{product.brand}</div>
          )}
        </div>

        <div style={{ display: 'grid', gap: 16 }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <span style={{ display: 'inline-flex', width: 'fit-content', padding: '6px 10px', borderRadius: 999, background: 'var(--accent-soft)', color: 'var(--accent)', fontSize: 12, fontWeight: 600 }}>
              {product.brand}
            </span>
            <h1 style={{ fontSize: 'clamp(24px, 3vw, 34px)', lineHeight: 1.02, letterSpacing: '-0.05em', fontWeight: 600 }}>{product.name}</h1>
            <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--mid)' }}>
              {product.description || 'Explore current configurations, choose the right specification and move straight to checkout.'}
            </p>
          </div>

          <div style={{ padding: 18, borderRadius: 18, border: '1px solid var(--border-light)', background: '#fff', display: 'grid', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--light)' }}>Selected price</div>
                <div style={{ marginTop: 8, fontSize: 24, fontWeight: 600, letterSpacing: '-0.04em' }}>
                  {formatPrice(selectedVariant?.price || 0)}
                </div>
              </div>
              {selectedVariant?.compare_at_price ? (
                <div style={{ fontSize: 14, color: 'var(--mid)', textDecoration: 'line-through' }}>
                  {formatPrice(selectedVariant.compare_at_price)}
                </div>
              ) : null}
            </div>

            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--light)', marginBottom: 10 }}>Configuration</div>
              <div style={{ display: 'grid', gap: 10 }}>
                {variants.map((variant) => {
                  const selected = variant.id === selectedVariantId
                  return (
                    <button
                      key={variant.id}
                      type="button"
                      onClick={() => setSelectedVariantId(variant.id)}
                      disabled={variant.is_available === false}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 12,
                        padding: '10px 12px',
                        borderRadius: 12,
                        border: selected ? '1px solid rgba(0,113,227,0.4)' : '1px solid var(--border-light)',
                        background: selected ? 'rgba(0,113,227,0.06)' : '#fff',
                        color: variant.is_available === false ? 'var(--light)' : 'var(--dark)',
                        cursor: variant.is_available === false ? 'not-allowed' : 'pointer',
                        textAlign: 'left',
                      }}
                    >
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>{buildVariantLabel(variant) || 'Standard configuration'}</div>
                        <div style={{ fontSize: 12, color: 'var(--mid)', marginTop: 4 }}>
                          {variant.is_available === false ? 'Unavailable' : `Supplier lead time: ${variant.lead_time_days || 2} days`}
                        </div>
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{formatPrice(variant.price)}</div>
                    </button>
                  )
                })}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: 6, borderRadius: 999, border: '1px solid var(--border-light)' }}>
                <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} style={{ border: 0, background: 'transparent', fontSize: 18, padding: '6px 10px' }}>−</button>
                <span style={{ minWidth: 22, textAlign: 'center', fontSize: 15, fontWeight: 600 }}>{quantity}</span>
                <button type="button" onClick={() => setQuantity((value) => value + 1)} style={{ border: 0, background: 'transparent', fontSize: 18, padding: '6px 10px' }}>+</button>
              </div>
              <button className="btn-primary" style={{ flex: 1, justifyContent: 'center', padding: '14px 18px', border: 0 }} onClick={handleAddToCart}>
                Add to cart
              </button>
            </div>

            <div style={{ padding: 14, borderRadius: 16, background: 'var(--cream)', color: 'var(--mid)', fontSize: 12, lineHeight: 1.7 }}>
              Select your preferred configuration, add it to cart and complete checkout when you are ready.
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
