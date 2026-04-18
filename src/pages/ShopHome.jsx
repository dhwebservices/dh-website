import { Link } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import ShopProductCard from '../components/shop/ShopProductCard'
import { fetchAllShopProducts, fetchShopCategories } from '../lib/shop'

export default function ShopHome() {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = 'Shop | DH Website Services'
    Promise.all([fetchShopCategories(), fetchAllShopProducts()])
      .then(([nextCategories, nextProducts]) => {
        setCategories(nextCategories || [])
        setProducts(nextProducts || [])
      })
      .finally(() => setLoading(false))
  }, [])

  const introStats = useMemo(() => [
    { label: 'Brands', value: 'Apple · Samsung · Windows' },
    { label: 'Support', value: 'Managed through DH Website Services' },
  ], [])

  return (
    <main style={{ paddingTop: 'calc(var(--nav-h) + 48px)' }}>
      <section style={{ padding: '0 max(24px, 50vw - 580px) 72px' }}>
        <div
          style={{
            borderRadius: 36,
            padding: '48px clamp(24px, 4vw, 56px)',
            background: 'linear-gradient(135deg, #10131a 0%, #171c25 52%, #f5f5f7 52%, #ffffff 100%)',
            color: '#fff',
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.2fr) minmax(280px, 0.9fr)',
            gap: 32,
          }}
        >
          <div style={{ display: 'grid', gap: 20 }}>
            <span
              style={{
                display: 'inline-flex',
                width: 'fit-content',
                padding: '8px 12px',
                borderRadius: 999,
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.12)',
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              Device Shop
            </span>
            <div style={{ display: 'grid', gap: 12 }}>
              <h1 style={{ fontSize: 'clamp(42px, 6vw, 78px)', lineHeight: 0.96, letterSpacing: '-0.06em', fontWeight: 600 }}>
                Apple, Samsung and work-ready hardware.
              </h1>
              <p style={{ maxWidth: 620, fontSize: 17, lineHeight: 1.75, color: 'rgba(255,255,255,0.72)' }}>
                Browse devices through DH Website Services and submit the order in one place.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/shop/category/apple" className="btn-primary" style={{ padding: '12px 18px' }}>Browse Apple</Link>
              <Link to="/shop/category/samsung" className="btn-secondary" style={{ padding: '12px 18px', background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.15)', color: '#fff' }}>Browse Samsung</Link>
            </div>
          </div>

          <div
            style={{
              alignSelf: 'stretch',
              borderRadius: 28,
              background: 'rgba(255,255,255,0.92)',
              color: 'var(--dark)',
              padding: 24,
              display: 'grid',
              gap: 18,
            }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.08em', color: 'var(--light)', textTransform: 'uppercase' }}>
              How this works
            </div>
            {introStats.map((item) => (
              <div key={item.label} style={{ paddingBottom: 14, borderBottom: '1px solid var(--border-light)' }}>
                <div style={{ fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--light)', marginBottom: 6 }}>{item.label}</div>
                <div style={{ fontSize: 18, lineHeight: 1.5, fontWeight: 600 }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '0 max(24px, 50vw - 580px) 56px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: 24 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--light)' }}>Categories</div>
            <h2 style={{ marginTop: 8, fontSize: 'clamp(28px, 4vw, 44px)', letterSpacing: '-0.04em', fontWeight: 600 }}>Shop by product line</h2>
          </div>
          <Link to="/shop/cart" style={{ fontSize: 14, fontWeight: 600, color: 'var(--accent)' }}>Open cart</Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/shop/category/${category.slug}`}
              style={{
                minHeight: 170,
                padding: 22,
                borderRadius: 24,
                background: 'linear-gradient(180deg, #fbfbfc, #f1f4f9)',
                border: '1px solid var(--border-light)',
                display: 'grid',
                alignContent: 'space-between',
              }}
            >
              <div style={{ display: 'grid', gap: 8 }}>
                <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.04em' }}>{category.name}</div>
                <div style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--mid)' }}>{category.description || 'Browse currently configured models.'}</div>
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)' }}>View range</div>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ padding: '0 max(24px, 50vw - 580px) 96px' }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--light)' }}>Featured hardware</div>
          <h2 style={{ marginTop: 8, fontSize: 'clamp(28px, 4vw, 44px)', letterSpacing: '-0.04em', fontWeight: 600 }}>Live catalogue</h2>
        </div>

        {loading ? (
          <div style={{ fontSize: 14, color: 'var(--mid)' }}>Loading shop catalogue…</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 18 }}>
            {products.map((product) => (
              <ShopProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
