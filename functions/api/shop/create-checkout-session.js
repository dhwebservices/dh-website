import { createPendingShopOrder, getEnv, json, stripeRequest, supabaseRequest } from './_lib.js'

export async function onRequestPost(context) {
  try {
    const body = await context.request.json()
    const { siteUrl } = getEnv(context)
    const { customer, shippingAddress, billingAddress, notes, items } = body || {}

    const { order, lineItems } = await createPendingShopOrder(context, {
      customer,
      shippingAddress,
      billingAddress,
      notes,
      items,
    })

    const params = new URLSearchParams()
    params.set('mode', 'payment')
    params.set('success_url', `${siteUrl}/shop/checkout/success?session_id={CHECKOUT_SESSION_ID}`)
    params.set('cancel_url', `${siteUrl}/shop/checkout/cancel?order=${order.order_number}`)
    params.set('customer_email', order.email)
    params.set('payment_method_types[0]', 'card')
    params.set('billing_address_collection', 'required')
    params.set('shipping_address_collection[allowed_countries][0]', 'GB')
    params.set('metadata[order_id]', order.id)
    params.set('metadata[order_number]', order.order_number)
    params.set('metadata[customer_email]', order.email)

    lineItems.forEach((item, index) => {
      params.set(`line_items[${index}][quantity]`, String(item.quantity))
      params.set(`line_items[${index}][price_data][currency]`, 'gbp')
      params.set(`line_items[${index}][price_data][unit_amount]`, String(Math.round(Number(item.unitPrice || 0) * 100)))
      params.set(`line_items[${index}][price_data][product_data][name]`, item.productName)
      if (item.variantLabel) {
        params.set(`line_items[${index}][price_data][product_data][description]`, item.variantLabel)
      }
      if (item.imageUrl) {
        params.set(`line_items[${index}][price_data][product_data][images][0]`, item.imageUrl)
      }
    })

    const session = await stripeRequest(context, '/checkout/sessions', params)

    await supabaseRequest(context, `shop_orders?id=eq.${order.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        payment_reference: session.id,
        stripe_checkout_session_id: session.id,
        updated_at: new Date().toISOString(),
      }),
      headers: { Prefer: 'return=minimal' },
    })

    return json({ url: session.url, orderNumber: order.order_number })
  } catch (error) {
    return json({ error: error.message || 'Could not start checkout' }, 500)
  }
}
