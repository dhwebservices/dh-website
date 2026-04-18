import { confirmPaidOrder, json, retrieveStripeCheckoutSession } from './_lib.js'

export async function onRequestGet(context) {
  try {
    const url = new URL(context.request.url)
    const sessionId = url.searchParams.get('session_id')
    if (!sessionId) return json({ error: 'Missing session_id' }, 400)

    const session = await retrieveStripeCheckoutSession(context, sessionId)
    if (session.payment_status !== 'paid') {
      return json({ error: 'Payment is not complete yet' }, 409)
    }

    const orderId = session.metadata?.order_id
    if (!orderId) return json({ error: 'Missing order metadata' }, 400)

    const order = await confirmPaidOrder(context, {
      orderId,
      sessionId: session.id,
      paymentIntentId: session.payment_intent?.id || null,
    })

    return json({ order })
  } catch (error) {
    return json({ error: error.message || 'Could not confirm checkout' }, 500)
  }
}
