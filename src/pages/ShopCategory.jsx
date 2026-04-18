import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ShopProductCard from '../components/shop/ShopProductCard'
import { fetchProductsByCategorySlug } from '../lib/shop'

export default function ShopCategory() {
  const { slug } = useParams()
  const [category, setCategory] = useState(null)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetchProductsByCategorySlug(slug)
      .then(({ category: nextCategory, products: nextProducts }) => {
        setCategory(nextCategory)
        setProducts(nextProducts)
        document.title = `${nextCategory?.name || 'Shop'} | DH Website Services`
      })
      .finally(() => setLoading(false))
  }, [slug])

  return (
    <main style={{ padding: 'calc(var(--nav-h) + 48px) max(24px, 50vw - 580px) 96px' }}>
      <div style={{ marginBottom: 18 }}>
        <Link to="/shop" style={{ fontSize: 14, fontWeight: 600, color: 'var(--accent)' }}>← Back to shop</Link>
      </div>

      <div style={{ marginBottom: 28 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--light)' }}>
          Category
        </div>
        <h1 style={{ marginTop: 10, fontSize: 'clamp(36px, 5vw, 60px)', letterSpacing: '-0.05em', fontWeight: 600 }}>
          {category?.name || 'Shop'}
        </h1>
        <p style={{ marginTop: 12, maxWidth: 760, fontSize: 16, lineHeight: 1.8, color: 'var(--mid)' }}>
          {category?.description || 'Browse the current catalogue in this category.'}
        </p>
      </div>

      {loading ? (
        <div style={{ fontSize: 14, color: 'var(--mid)' }}>Loading category…</div>
      ) : !products.length ? (
        <div style={{ padding: 32, borderRadius: 24, border: '1px solid var(--border-light)', background: 'var(--cream)' }}>
          No products are live in this category yet.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 18 }}>
          {products.map((product) => (
            <ShopProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  )
}
