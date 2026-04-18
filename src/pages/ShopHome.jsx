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
    <main style={{ paddingTop: 'calc(var(--nav-h) + 48px)' }}>
      <section style={{ padding: '0 max(24px, 50vw - 580px) 52px' }}>
        <div
          style={{
            borderRadius: 26,
            padding: '28px clamp(20px, 3vw, 34px)',
            background: 'linear-gradient(135deg, #fbfbfc 0%, #f5f7fb 58%, #eef2f8 100%)',
            color: 'var(--dark)',
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.3fr) minmax(260px, 0.8fr)',
            gap: 22,
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
              <h1 style={{ fontSize: 'clamp(28px, 4vw, 46px)', lineHeight: 0.98, letterSpacing: '-0.06em', fontWeight: 600 }}>
                Phones, tablets and laptops in one catalogue.
              </h1>
              <p style={{ maxWidth: 620, fontSize: 15, lineHeight: 1.7, color: 'var(--mid)' }}>
                Browse current device lines, compare configurations and move straight into checkout without leaving the site.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/shop/category/apple" className="btn-primary" style={{ padding: '12px 18px' }}>Browse Apple</Link>
              <Link to="/shop/category/samsung" className="btn-secondary" style={{ padding: '12px 18px' }}>Browse Samsung</Link>
            </div>
          </div>

          <div
            style={{
              alignSelf: 'stretch',
              borderRadius: 26,
              background: '#ffffff',
              color: 'var(--dark)',
              padding: 22,
              display: 'grid',
              gap: 16,
              border: '1px solid var(--border-light)',
            }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.08em', color: 'var(--light)', textTransform: 'uppercase' }}>
              Catalogue snapshot
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

      <section style={{ padding: '0 max(24px, 50vw - 640px) 44px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: 24 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--light)' }}>Categories</div>
            <h2 style={{ marginTop: 8, fontSize: 'clamp(24px, 4vw, 38px)', letterSpacing: '-0.04em', fontWeight: 600 }}>Browse by product line</h2>
          </div>
          <Link to="/shop/cart" style={{ fontSize: 14, fontWeight: 600, color: 'var(--accent)' }}>Open cart</Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 12 }}>
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/shop/category/${category.slug}`}
              style={{
                minHeight: 132,
                padding: 16,
                borderRadius: 18,
                background: 'linear-gradient(180deg, #fbfbfc, #f4f6fa)',
                border: '1px solid var(--border-light)',
                display: 'grid',
                alignContent: 'space-between',
              }}
            >
              <div style={{ display: 'grid', gap: 8 }}>
                <div style={{ fontSize: 23, fontWeight: 600, letterSpacing: '-0.04em' }}>{category.name}</div>
                <div style={{ fontSize: 13, lineHeight: 1.65, color: 'var(--mid)' }}>{category.description || 'Browse currently configured models.'}</div>
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)' }}>View range</div>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ padding: '0 max(24px, 50vw - 640px) 96px' }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--light)' }}>Featured hardware</div>
          <h2 style={{ marginTop: 8, fontSize: 'clamp(24px, 4vw, 38px)', letterSpacing: '-0.04em', fontWeight: 600 }}>Live catalogue</h2>
        </div>

        {loading ? (
          <div style={{ fontSize: 14, color: 'var(--mid)' }}>Loading shop catalogue…</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
            {products.map((product) => (
              <ShopProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
