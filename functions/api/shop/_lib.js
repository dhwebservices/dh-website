const DEFAULT_SUPABASE_URL = 'https://xtunnfdwltfesscmpove.supabase.co'
const DEFAULT_WORKER_URL = 'https://dh-email-worker.aged-silence-66a7.workers.dev'
const STRIPE_API_BASE = 'https://api.stripe.com/v1'
const STRIPE_API_VERSION = '2026-02-25.clover'

export function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  })
}

export function getEnv(context) {
  const { env } = context
  return {
    siteUrl: env.VITE_SITE_URL || env.SITE_URL || 'https://dhwebsiteservices.co.uk',
    supabaseUrl: env.SUPABASE_URL || DEFAULT_SUPABASE_URL,
    supabaseServiceRoleKey: env.SUPABASE_SERVICE_ROLE_KEY,
    stripeSecretKey: env.STRIPE_SECRET_KEY,
    stripeWebhookSecret: env.STRIPE_WEBHOOK_SECRET,
    workerUrl: env.WORKER_URL || DEFAULT_WORKER_URL,
  }
}

export function requireEnv(value, name) {
  if (!value) throw new Error(`Missing ${name}`)
  return value
}

export async function supabaseRequest(context, path, init = {}) {
  const { supabaseUrl, supabaseServiceRoleKey } = getEnv(context)
  requireEnv(supabaseServiceRoleKey, 'SUPABASE_SERVICE_ROLE_KEY')

  const response = await fetch(`${supabaseUrl}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: supabaseServiceRoleKey,
      Authorization: `Bearer ${supabaseServiceRoleKey}`,
      ...(init.body ? { 'Content-Type': 'application/json' } : {}),
      ...init.headers,
    },
  })

  const text = await response.text()
  const payload = text ? JSON.parse(text) : null

  if (!response.ok) {
    const error = new Error(
      payload?.message ||
      payload?.error_description ||
      payload?.details ||
      payload?.hint ||
      response.statusText ||
      'Supabase request failed'
    )
    error.payload = payload
    throw error
  }

  return payload
}

export async function postWorker(context, type, data) {
  const { workerUrl } = getEnv(context)
  const response = await fetch(workerUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, data }),
  })
  const text = await response.text()
  const payload = text ? JSON.parse(text) : null
  if (!response.ok) {
    throw new Error(payload?.error || 'Worker request failed')
  }
  return payload
}

export function buildVariantLabel(variant = {}) {
  return [variant.model, variant.colour, variant.storage, variant.size].filter(Boolean).join(' · ')
}

export function createOrderNumber() {
  const now = new Date()
  const y = String(now.getFullYear()).slice(-2)
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  const rand = String(Math.floor(Math.random() * 9000) + 1000)
  return `DH-${y}${m}${d}-${rand}`
}

export async function upsertCustomer(context, customer = {}) {
  const safeEmail = String(customer.email || '').toLowerCase().trim()
  if (!safeEmail) throw new Error('Customer email is required')

  const existing = await supabaseRequest(
    context,
    `shop_customers?select=*&email=eq.${encodeURIComponent(safeEmail)}&limit=1`
  )

  const payload = {
    email: safeEmail,
    first_name: String(customer.firstName || customer.first_name || '').trim(),
    last_name: String(customer.lastName || customer.last_name || '').trim(),
    phone: String(customer.phone || '').trim() || null,
    updated_at: new Date().toISOString(),
  }

  if (!payload.first_name || !payload.last_name) {
    throw new Error('Customer first and last name are required')
  }

  if (existing?.[0]?.id) {
    const updated = await supabaseRequest(context, `shop_customers?id=eq.${existing[0].id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
      headers: { Prefer: 'return=representation' },
    })
    return Array.isArray(updated) ? updated[0] : existing[0]
  }

  const created = await supabaseRequest(context, 'shop_customers', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: { Prefer: 'return=representation' },
  })
  return Array.isArray(created) ? created[0] : created
}

export async function fetchCatalogItems(context, items = []) {
  const variantIds = [...new Set(items.map((item) => item.variantId).filter(Boolean))]
  if (!variantIds.length) throw new Error('No variants selected')

  const rows = await supabaseRequest(
    context,
    `shop_product_variants?select=*,shop_products(*,shop_categories(name,slug))&id=in.(${variantIds.join(',')})`
  )

  const variantMap = new Map((rows || []).map((row) => [row.id, row]))
  return items.map((item) => {
    const variant = variantMap.get(item.variantId)
    if (!variant || variant.is_available === false || variant.shop_products?.status !== 'active') {
      throw new Error('One or more selected products are unavailable')
    }
    return {
      ...item,
      unitPrice: Number(variant.price || 0),
      sku: variant.sku || null,
      variantLabel: buildVariantLabel(variant),
      productName: variant.shop_products?.name || item.productName,
      imageUrl: variant.shop_products?.image_url || item.imageUrl || null,
      productId: variant.product_id,
      variantId: variant.id,
    }
  })
}

export async function createPendingShopOrder(context, { customer, shippingAddress, billingAddress, notes, items }) {
  const safeItems = (Array.isArray(items) ? items : []).filter((item) => Number(item.quantity || 0) > 0)
  if (!safeItems.length) throw new Error('Your cart is empty.')

  const lineItems = await fetchCatalogItems(context, safeItems)
  const customerRow = await upsertCustomer(context, customer)
  const subtotal = lineItems.reduce((sum, item) => sum + Number(item.unitPrice || 0) * Number(item.quantity || 0), 0)

  const orderRows = await supabaseRequest(context, 'shop_orders', {
    method: 'POST',
    body: JSON.stringify({
      order_number: createOrderNumber(),
      customer_id: customerRow.id,
      email: customerRow.email,
      phone: customerRow.phone,
      customer_name: `${customerRow.first_name} ${customerRow.last_name}`.trim(),
      shipping_address: shippingAddress || {},
      billing_address: billingAddress || {},
      subtotal,
      grand_total: subtotal,
      payment_status: 'pending',
      order_status: 'new',
      procurement_status: 'not_started',
      fulfilment_status: 'unfulfilled',
      payment_provider: 'stripe_checkout',
      customer_notes: notes || null,
    }),
    headers: { Prefer: 'return=representation' },
  })

  const order = Array.isArray(orderRows) ? orderRows[0] : orderRows

  await supabaseRequest(context, 'shop_order_items', {
    method: 'POST',
    body: JSON.stringify(
      lineItems.map((item) => ({
        order_id: order.id,
        product_id: item.productId,
        variant_id: item.variantId,
        product_name: item.productName,
        variant_label: item.variantLabel,
        sku: item.sku || null,
        quantity: Number(item.quantity || 1),
        unit_price: Number(item.unitPrice || 0),
        line_total: Number(item.unitPrice || 0) * Number(item.quantity || 1),
      }))
    ),
    headers: { Prefer: 'return=minimal' },
  })

  return { order, lineItems, customerRow }
}

export async function stripeRequest(context, path, body) {
  const { stripeSecretKey } = getEnv(context)
  requireEnv(stripeSecretKey, 'STRIPE_SECRET_KEY')

  const response = await fetch(`${STRIPE_API_BASE}${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${stripeSecretKey}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Stripe-Version': STRIPE_API_VERSION,
    },
    body,
  })

  const payload = await response.json()
  if (!response.ok) {
    throw new Error(payload?.error?.message || 'Stripe request failed')
  }
  return payload
}

export async function retrieveStripeCheckoutSession(context, sessionId) {
  const { stripeSecretKey } = getEnv(context)
  requireEnv(stripeSecretKey, 'STRIPE_SECRET_KEY')

  const response = await fetch(`${STRIPE_API_BASE}/checkout/sessions/${encodeURIComponent(sessionId)}?expand[]=payment_intent`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${stripeSecretKey}`,
      'Stripe-Version': STRIPE_API_VERSION,
    },
  })

  const payload = await response.json()
  if (!response.ok) {
    throw new Error(payload?.error?.message || 'Could not load Stripe session')
  }
  return payload
}

export function formatPrice(value) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(Number(value || 0))
}

function orderEmailShell({ eyebrow, title, body, details = [], ctaLabel, ctaUrl }) {
  const detailRows = details
    .filter((item) => item.value)
    .map(
      (item) => `
        <tr>
          <td style="padding:10px 0;color:#7a8090;font-size:13px;text-transform:uppercase;letter-spacing:0.08em;">${item.label}</td>
          <td style="padding:10px 0;color:#141822;font-size:15px;font-weight:600;text-align:right;">${item.value}</td>
        </tr>
      `
    )
    .join('')

  return `
  <!doctype html>
  <html>
    <body style="margin:0;padding:32px 0;background:#f4f6fb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#141822;">
      <div style="max-width:620px;margin:0 auto;padding:0 20px;">
        <div style="background:#ffffff;border:1px solid rgba(18,26,46,0.08);border-radius:28px;overflow:hidden;box-shadow:0 18px 48px rgba(15,23,42,0.08);">
          <div style="padding:32px 32px 18px;background:linear-gradient(180deg,#f8fbff 0%,#ffffff 100%);border-bottom:1px solid rgba(18,26,46,0.06);">
            <div style="display:inline-flex;align-items:center;gap:8px;padding:8px 12px;border-radius:999px;background:#eef4ff;color:#0f62fe;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">${eyebrow}</div>
            <h1 style="margin:18px 0 10px;font-size:34px;line-height:1.05;letter-spacing:-0.04em;">${title}</h1>
            <p style="margin:0;color:#5d6577;font-size:16px;line-height:1.75;">${body}</p>
          </div>
          <div style="padding:28px 32px;">
            <table style="width:100%;border-collapse:collapse;">${detailRows}</table>
            ${
              ctaLabel && ctaUrl
                ? `<div style="margin-top:26px;"><a href="${ctaUrl}" style="display:inline-block;padding:14px 18px;border-radius:999px;background:#111827;color:#ffffff;text-decoration:none;font-size:14px;font-weight:700;">${ctaLabel}</a></div>`
                : ''
            }
          </div>
        </div>
        <div style="padding:18px 8px 0;color:#7a8090;font-size:12px;line-height:1.7;text-align:center;">
          DH Website Services · Cardiff, United Kingdom<br/>
          clients@dhwebsiteservices.co.uk
        </div>
      </div>
    </body>
  </html>`
}

export function orderConfirmationEmail(order) {
  return orderEmailShell({
    eyebrow: 'Order confirmed',
    title: `Thanks, your order ${order.order_number} is confirmed.`,
    body: 'Payment has been received successfully. We have logged your order and will keep you updated as it moves through dispatch and fulfilment.',
    details: [
      { label: 'Order number', value: order.order_number },
      { label: 'Total paid', value: formatPrice(order.grand_total) },
      { label: 'Status', value: 'Confirmed' },
    ],
    ctaLabel: 'View shop',
    ctaUrl: 'https://dhwebsiteservices.co.uk/shop',
  })
}

export async function sendOrderConfirmationEmail(context, order) {
  if (!order?.email) return
  await postWorker(context, 'custom_email', {
    to: order.email,
    from: 'noreply@dhwebsiteservices.co.uk',
    subject: `Order confirmed: ${order.order_number}`,
    html: orderConfirmationEmail(order),
    text: `Order confirmed: ${order.order_number}. Total paid: ${formatPrice(order.grand_total)}.`,
  })
}

export async function confirmPaidOrder(context, { orderId, sessionId, paymentIntentId }) {
  const existingRows = await supabaseRequest(context, `shop_orders?select=*&id=eq.${orderId}&limit=1`)
  const existing = existingRows?.[0]
  if (!existing) throw new Error('Order not found')

  if (existing.payment_status === 'paid') {
    return existing
  }

  const rows = await supabaseRequest(context, `shop_orders?id=eq.${orderId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      payment_status: 'paid',
      order_status: 'awaiting_procurement',
      payment_reference: sessionId || existing.payment_reference || null,
      stripe_checkout_session_id: sessionId || existing.stripe_checkout_session_id || null,
      stripe_payment_intent_id: paymentIntentId || existing.stripe_payment_intent_id || null,
      payment_confirmed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }),
    headers: { Prefer: 'return=representation' },
  })

  const updated = Array.isArray(rows) ? rows[0] : rows
  if (!existing.confirmation_emailed_at) {
    await sendOrderConfirmationEmail(context, updated)
    const emailRows = await supabaseRequest(context, `shop_orders?id=eq.${orderId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        confirmation_emailed_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }),
      headers: { Prefer: 'return=representation' },
    })
    return Array.isArray(emailRows) ? emailRows[0] : updated
  }
  return updated
}
