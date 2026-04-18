import { confirmPaidOrder, getEnv, json, supabaseRequest } from './_lib.js'

async function verifyStripeSignature(context, payload, header) {
  const { stripeWebhookSecret } = getEnv(context)
  if (!stripeWebhookSecret) return true
  if (!header) return false

  const parts = Object.fromEntries(
    header.split(',').map((part) => {
      const [key, value] = part.split('=')
      return [key?.trim(), value]
    })
  )
  const timestamp = parts.t
  const signature = parts.v1
  if (!timestamp || !signature) return false

  const encodedSecret = new TextEncoder().encode(stripeWebhookSecret)
  const encodedPayload = new TextEncoder().encode(`${timestamp}.${payload}`)
  const key = await crypto.subtle.importKey('raw', encodedSecret, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  const digest = await crypto.subtle.sign('HMAC', key, encodedPayload)
  const expected = Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, '0')).join('')
  return expected === signature
}

export async function onRequestPost(context) {
  try {
    const rawBody = await context.request.text()
    const signature = context.request.headers.get('stripe-signature')

    const verified = await verifyStripeSignature(context, rawBody, signature)
    if (!verified) return json({ error: 'Invalid signature' }, 400)

    const event = JSON.parse(rawBody)
    if (event.type === 'checkout.session.completed' || event.type === 'checkout.session.async_payment_succeeded') {
      const session = event.data?.object
      const orderId = session?.metadata?.order_id
      if (orderId) {
        await confirmPaidOrder(context, {
          orderId,
          sessionId: session.id,
          paymentIntentId: session.payment_intent || null,
        })
      }
    }

    if (event.type === 'checkout.session.expired') {
      const session = event.data?.object
      const orderId = session?.metadata?.order_id
      if (orderId) {
        await supabaseRequest(context, `shop_orders?id=eq.${orderId}`, {
          method: 'PATCH',
          body: JSON.stringify({
            payment_status: 'failed',
            updated_at: new Date().toISOString(),
          }),
          headers: { Prefer: 'return=minimal' },
        })
      }
    }

    return json({ ok: true })
  } catch (error) {
    return json({ error: error.message || 'Webhook failed' }, 500)
  }
}
