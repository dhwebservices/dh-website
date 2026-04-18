import { Link } from 'react-router-dom'
import { formatPrice, getProductStartingPrice } from '../../lib/shop'

export default function ShopProductCard({ product }) {
  const startPrice = getProductStartingPrice(product)
  const availableVariants = (product.variants || []).filter((variant) => variant.is_available !== false)

  return (
    <Link
      to={`/shop/product/${product.slug}`}
      style={{
        display: 'grid',
        gap: 18,
        padding: 22,
        borderRadius: 24,
        background: '#fff',
        border: '1px solid var(--border-light)',
        boxShadow: '0 18px 50px rgba(15, 23, 42, 0.05)',
        transition: 'transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease',
      }}
      onMouseOver={(event) => {
        event.currentTarget.style.transform = 'translateY(-3px)'
        event.currentTarget.style.boxShadow = '0 24px 60px rgba(15, 23, 42, 0.09)'
        event.currentTarget.style.borderColor = 'rgba(0, 113, 227, 0.18)'
      }}
      onMouseOut={(event) => {
        event.currentTarget.style.transform = 'translateY(0)'
        event.currentTarget.style.boxShadow = '0 18px 50px rgba(15, 23, 42, 0.05)'
        event.currentTarget.style.borderColor = 'var(--border-light)'
      }}
    >
      <div
        style={{
          aspectRatio: '4 / 3',
          borderRadius: 18,
          background: 'linear-gradient(180deg, #f8f9fb, #eef1f7)',
          display: 'grid',
          placeItems: 'center',
          overflow: 'hidden',
        }}
      >
        {product.image_url ? (
          <img src={product.image_url} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ fontSize: 14, color: 'var(--mid)' }}>{product.brand}</div>
        )}
      </div>

      <div style={{ display: 'grid', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 10px',
              borderRadius: 999,
              background: 'var(--accent-soft)',
              color: 'var(--accent)',
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            {product.brand}
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--mid)' }}>
            {availableVariants.length} options
          </span>
        </div>

        <div>
          <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--dark)' }}>{product.name}</div>
          <div style={{ marginTop: 6, fontSize: 14, lineHeight: 1.6, color: 'var(--mid)' }}>
            {product.description || 'Configured, ordered, and fulfilled by DH Website Services.'}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--light)' }}>
              From
            </div>
            <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--dark)' }}>
              {formatPrice(startPrice)}
            </div>
          </div>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--accent)' }}>View product</span>
        </div>
      </div>
    </Link>
  )
}
