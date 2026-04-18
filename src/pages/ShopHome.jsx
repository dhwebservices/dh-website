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
    { label: 'Popular now', value: `${products.length || 0} live products` },
  ], [products.length])

  return (
    <main style={{ paddingTop: 'calc(var(--nav-h) + 40px)' }}>
      <section style={{ padding: '0 max(20px, 50vw - 620px) 22px' }}>
        <div
          style={{
            borderRadius: 18,
            padding: '20px clamp(16px, 2.5vw, 24px)',
            background: 'linear-gradient(135deg, #fbfbfc 0%, #f5f7fb 58%, #eef2f8 100%)',
            color: 'var(--dark)',
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.4fr) minmax(220px, 0.65fr)',
            gap: 16,
            border: '1px solid var(--border-light)',
          }}
        >
          <div style={{ display: 'grid', gap: 20 }}>
            <span
              style={{
                display: 'inline-flex',
                width: 'fit-content',
                padding: '7px 11px',
                borderRadius: 999,
                background: '#ffffff',
                border: '1px solid var(--border-light)',
                fontSize: 12,
                fontWeight: 600,
                color: 'var(--mid)',
              }}
            >
              Device Shop
            </span>
            <div style={{ display: 'grid', gap: 12 }}>
              <h1 style={{ fontSize: 'clamp(24px, 3.5vw, 34px)', lineHeight: 1.02, letterSpacing: '-0.05em', fontWeight: 600 }}>
                Devices for work, upgrade cycles and day-one checkout.
              </h1>
              <p style={{ maxWidth: 560, fontSize: 14, lineHeight: 1.65, color: 'var(--mid)' }}>
                Browse the live device range, compare configurations and move from shortlist to checkout without leaving the site.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/shop/category/apple" className="btn-primary" style={{ padding: '11px 16px' }}>Browse Apple</Link>
              <Link to="/shop/category/samsung" className="btn-secondary" style={{ padding: '11px 16px' }}>Browse Samsung</Link>
            </div>
          </div>

          <div
            style={{
              alignSelf: 'stretch',
              borderRadius: 20,
              background: '#ffffff',
              color: 'var(--dark)',
              padding: 16,
              display: 'grid',
              gap: 12,
              border: '1px solid var(--border-light)',
            }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.08em', color: 'var(--light)', textTransform: 'uppercase' }}>
              Catalogue snapshot
            </div>
            {introStats.map((item) => (
              <div key={item.label} style={{ paddingBottom: 14, borderBottom: '1px solid var(--border-light)' }}>
                <div style={{ fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--light)', marginBottom: 6 }}>{item.label}</div>
                <div style={{ fontSize: 16, lineHeight: 1.4, fontWeight: 600 }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '0 max(20px, 50vw - 620px) 26px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: 24 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--light)' }}>Categories</div>
            <h2 style={{ marginTop: 8, fontSize: 'clamp(20px, 3vw, 28px)', letterSpacing: '-0.04em', fontWeight: 600 }}>Browse by product line</h2>
          </div>
          <Link to="/shop/cart" style={{ fontSize: 14, fontWeight: 600, color: 'var(--accent)' }}>Open cart</Link>
        </div>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/shop/category/${category.slug}`}
              style={{
                padding: '10px 14px',
                borderRadius: 999,
                background: 'linear-gradient(180deg, #fbfbfc, #f4f6fa)',
                border: '1px solid var(--border-light)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--dark)' }}>{category.name}</span>
              <span style={{ fontSize: 12, color: 'var(--mid)' }}>View</span>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ padding: '0 max(20px, 50vw - 620px) 88px' }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--light)' }}>Featured hardware</div>
          <h2 style={{ marginTop: 8, fontSize: 'clamp(20px, 3vw, 28px)', letterSpacing: '-0.04em', fontWeight: 600 }}>Live catalogue</h2>
        </div>

        {loading ? (
          <div style={{ fontSize: 14, color: 'var(--mid)' }}>Loading shop catalogue…</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, alignItems: 'start' }}>
            {products.map((product) => (
              <ShopProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
