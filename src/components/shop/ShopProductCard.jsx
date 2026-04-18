import { Link } from 'react-router-dom'
import { formatPrice, getProductStartingPrice } from '../../lib/shop'

export default function ShopProductCard({ product }) {
  const startPrice = getProductStartingPrice(product)
  const availableVariants = (product.variants || []).filter((variant) => variant.is_available !== false)
  const leadTime = Math.min(...availableVariants.map((variant) => Number(variant.lead_time_days || 2)).filter(Number.isFinite))

  return (
    <Link
      to={`/shop/product/${product.slug}`}
      style={{
        display: 'grid',
        gap: 14,
        padding: 16,
        borderRadius: 22,
        background: '#fff',
        border: '1px solid var(--border-light)',
        boxShadow: '0 10px 32px rgba(15, 23, 42, 0.04)',
        transition: 'transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease',
      }}
      onMouseOver={(event) => {
        event.currentTarget.style.transform = 'translateY(-2px)'
        event.currentTarget.style.boxShadow = '0 16px 40px rgba(15, 23, 42, 0.08)'
        event.currentTarget.style.borderColor = 'rgba(0, 113, 227, 0.18)'
      }}
      onMouseOut={(event) => {
        event.currentTarget.style.transform = 'translateY(0)'
        event.currentTarget.style.boxShadow = '0 10px 32px rgba(15, 23, 42, 0.04)'
        event.currentTarget.style.borderColor = 'var(--border-light)'
      }}
    >
      <div
        style={{
          aspectRatio: '1 / 1',
          borderRadius: 18,
          background: product.image_url
            ? 'linear-gradient(180deg, #f7f8fb, #eef2f6)'
            : 'linear-gradient(180deg, #f4f6fb, #e9edf5)',
          display: 'grid',
          placeItems: 'center',
          overflow: 'hidden',
          padding: 18,
        }}
      >
        {product.image_url ? (
          <img src={product.image_url} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        ) : (
          <div style={{ fontSize: 13, color: 'var(--mid)' }}>{product.brand}</div>
        )}
      </div>

      <div style={{ display: 'grid', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '5px 9px',
              borderRadius: 999,
              background: '#eff5ff',
              color: '#2463d5',
              fontSize: 11,
              fontWeight: 600,
            }}
          >
            {product.brand}
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--mid)' }}>
            {availableVariants.length} config{availableVariants.length === 1 ? '' : 's'}
          </span>
        </div>

        <div style={{ display: 'grid', gap: 5 }}>
          <div style={{ fontSize: 24, fontWeight: 600, letterSpacing: '-0.04em', color: 'var(--dark)' }}>{product.name}</div>
          <div style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--mid)', minHeight: 38 }}>
            {product.description || `Configured ${product.brand} hardware for business teams and personal upgrades.`}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: 12, paddingTop: 4 }}>
          <div style={{ display: 'grid', gap: 2 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--light)' }}>
              From
            </div>
            <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.04em', color: 'var(--dark)' }}>
              {formatPrice(startPrice)}
            </div>
            <div style={{ fontSize: 12, color: 'var(--mid)' }}>
              {Number.isFinite(leadTime) ? `${leadTime} day lead estimate` : 'Configured to order'}
            </div>
          </div>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)' }}>View</span>
        </div>
      </div>
    </Link>
  )
}
