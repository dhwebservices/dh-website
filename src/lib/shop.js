import { SUPABASE_ANON_KEY, SUPABASE_URL } from './siteConfig'

const REST_BASE = `${SUPABASE_URL}/rest/v1`
const CART_KEY = 'dhws:shop:cart'

function buildHeaders(extra = {}) {
  return {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
    ...extra,
  }
}

async function rest(path, { method = 'GET', body, headers = {}, prefer } = {}) {
  const response = await fetch(`${REST_BASE}/${path}`, {
    method,
    headers: buildHeaders({
      ...(prefer ? { Prefer: prefer } : {}),
      ...headers,
    }),
    body: body ? JSON.stringify(body) : undefined,
  })

  const text = await response.text()
  const payload = text ? JSON.parse(text) : null
  if (!response.ok) {
    const message =
      payload?.message ||
      payload?.error_description ||
      payload?.details ||
      payload?.hint ||
      response.statusText ||
      'Shop request failed'
    throw new Error(message)
  }
  return payload
}

function normalizeProduct(product) {
  const variants = Array.isArray(product.shop_product_variants)
    ? [...product.shop_product_variants].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
    : []

  return {
    ...product,
    category: product.shop_categories || null,
    variants,
  }
}

export function formatPrice(value) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(Number(value || 0))
}

export function buildVariantLabel(variant = {}) {
  return [variant.model, variant.colour, variant.storage, variant.size].filter(Boolean).join(' · ')
}

export function getProductStartingPrice(product = {}) {
  const prices = (product.variants || [])
    .filter((variant) => variant.is_available !== false)
    .map((variant) => Number(variant.price || 0))
    .filter((value) => Number.isFinite(value) && value > 0)

  if (!prices.length) return Number(product.price || 0)
  return Math.min(...prices)
}

export async function fetchShopCategories() {
  return rest(
    "shop_categories?select=*&is_active=eq.true&order=sort_order.asc,name.asc"
  )
}

export async function fetchFeaturedProducts(limit = 8) {
  const rows = await rest(
    `shop_products?select=*,shop_categories(name,slug),shop_product_variants(id,sku,colour,storage,size,model,price,compare_at_price,is_available,lead_time_days,sort_order)&status=eq.active&featured=is.true&order=updated_at.desc&limit=${limit}`
  )
  return (rows || []).map(normalizeProduct)
}

export async function fetchProductsByCategorySlug(categorySlug = '') {
  const categories = await rest(
    `shop_categories?select=*&slug=eq.${encodeURIComponent(categorySlug)}&limit=1`
  )
  const category = categories?.[0]
  if (!category) return { category: null, products: [] }

  const rows = await rest(
    `shop_products?select=*,shop_categories(name,slug),shop_product_variants(id,sku,colour,storage,size,model,price,compare_at_price,is_available,lead_time_days,sort_order)&status=eq.active&category_id=eq.${category.id}&order=featured.desc,updated_at.desc`
  )

  return {
    category,
    products: (rows || []).map(normalizeProduct),
  }
}

export async function fetchAllShopProducts() {
  const rows = await rest(
    "shop_products?select=*,shop_categories(name,slug),shop_product_variants(id,sku,colour,storage,size,model,price,compare_at_price,is_available,lead_time_days,sort_order)&status=eq.active&order=featured.desc,updated_at.desc"
  )
  return (rows || []).map(normalizeProduct)
}

export async function fetchProductBySlug(slug = '') {
  const rows = await rest(
    `shop_products?select=*,shop_categories(name,slug),shop_product_variants(id,sku,colour,storage,size,model,price,compare_at_price,is_available,lead_time_days,sort_order)&slug=eq.${encodeURIComponent(slug)}&limit=1`
  )
  return rows?.[0] ? normalizeProduct(rows[0]) : null
}

export function readCart() {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(CART_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function writeCart(items) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(CART_KEY, JSON.stringify(items))
  window.dispatchEvent(new CustomEvent('shop-cart-updated'))
}

export function getCartCount(items = readCart()) {
  return items.reduce((sum, item) => sum + Number(item.quantity || 0), 0)
}

export function getCartSubtotal(items = readCart()) {
  return items.reduce((sum, item) => sum + Number(item.unitPrice || 0) * Number(item.quantity || 0), 0)
}

export function addCartItem({ product, variant, quantity = 1 }) {
  const current = readCart()
  const key = `${product.id}:${variant.id}`
  const existing = current.find((item) => item.key === key)

  if (existing) {
    existing.quantity += quantity
    writeCart([...current])
    return
  }

  current.push({
    key,
    productId: product.id,
    variantId: variant.id,
    slug: product.slug,
    productName: product.name,
    imageUrl: product.image_url,
    variantLabel: buildVariantLabel(variant),
    sku: variant.sku || '',
    quantity,
    unitPrice: Number(variant.price || 0),
  })
  writeCart(current)
}

export function updateCartItemQuantity(key, quantity) {
  const current = readCart()
  const next = current
    .map((item) => (item.key === key ? { ...item, quantity: Math.max(1, Number(quantity || 1)) } : item))
  writeCart(next)
}

export function removeCartItem(key) {
  writeCart(readCart().filter((item) => item.key !== key))
}

export function clearCart() {
  writeCart([])
}

function createOrderNumber() {
  const now = new Date()
  const y = now.getFullYear().toString().slice(-2)
  const m = `${now.getMonth() + 1}`.padStart(2, '0')
  const d = `${now.getDate()}`.padStart(2, '0')
  const rand = `${Math.floor(Math.random() * 9000) + 1000}`
  return `DH-${y}${m}${d}-${rand}`
}

async function upsertCustomer({ firstName, lastName, email, phone }) {
  const safeEmail = String(email || '').toLowerCase().trim()
  const rows = await rest(`shop_customers?select=*&email=eq.${encodeURIComponent(safeEmail)}&limit=1`)
  const existing = rows?.[0]

  if (existing) {
    const updated = await rest(`shop_customers?id=eq.${existing.id}`, {
      method: 'PATCH',
      body: {
        first_name: firstName,
        last_name: lastName,
        phone: phone || null,
        updated_at: new Date().toISOString(),
      },
      prefer: 'return=representation',
    })
    return Array.isArray(updated) ? updated[0] : existing
  }

  const created = await rest('shop_customers', {
    method: 'POST',
    body: {
      email: safeEmail,
      first_name: firstName,
      last_name: lastName,
      phone: phone || null,
    },
    prefer: 'return=representation',
  })

  return Array.isArray(created) ? created[0] : created
}

export async function createShopOrder({ customer, shippingAddress, billingAddress, notes, items }) {
  const safeItems = Array.isArray(items) ? items.filter((item) => item.quantity > 0) : []
  if (!safeItems.length) {
    throw new Error('Your cart is empty.')
  }

  const customerRecord = await upsertCustomer(customer)
  const subtotal = getCartSubtotal(safeItems)
  const orderNumber = createOrderNumber()

  const orderRows = await rest('shop_orders', {
    method: 'POST',
    body: {
      order_number: orderNumber,
      customer_id: customerRecord.id,
      email: customer.email.toLowerCase().trim(),
      phone: customer.phone || null,
      customer_name: `${customer.firstName} ${customer.lastName}`.trim(),
      shipping_address: shippingAddress,
      billing_address: billingAddress,
      subtotal,
      grand_total: subtotal,
      payment_status: 'pending',
      order_status: 'awaiting_procurement',
      procurement_status: 'not_started',
      fulfilment_status: 'unfulfilled',
      payment_provider: 'manual',
      customer_notes: notes || null,
    },
    prefer: 'return=representation',
  })

  const order = Array.isArray(orderRows) ? orderRows[0] : orderRows
  await rest('shop_order_items', {
    method: 'POST',
    body: safeItems.map((item) => ({
      order_id: order.id,
      product_id: item.productId,
      variant_id: item.variantId,
      product_name: item.productName,
      variant_label: item.variantLabel,
      sku: item.sku || null,
      quantity: Number(item.quantity || 1),
      unit_price: Number(item.unitPrice || 0),
      line_total: Number(item.unitPrice || 0) * Number(item.quantity || 1),
    })),
    prefer: 'return=minimal',
  })

  return order
}
