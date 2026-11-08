// Starts an online deposit for a fixed-price package: POST /api/deposit.
//
// The browser only says which plan; the amount comes from src/lib/plans.js on
// the server, so nobody can pay £1 for a website by editing the request.
// Stripe is the record of the payment -- there is no table for these -- and
// /api/deposit-confirm emails David once Stripe says it is paid.

import { depositPlan } from '../../src/lib/plans.js'
import { getEnv, json, stripeRequest } from './shop/_lib.js'
import { bfPlacesLeft } from './_deposits.js'

const clean = (v, max) => String(v ?? '').trim().slice(0, max)
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function onRequestPost(context) {
  try {
    const body = await context.request.json().catch(() => ({}))
    const plan = depositPlan(clean(body.plan, 40))
    if (!plan) return json({ error: 'That package can\'t be booked online right now. Call 01443 805303 and we\'ll sort it.' }, 400)

    const buyer = {
      name: clean(body.name, 120),
      business: clean(body.business, 160),
      email: clean(body.email, 200).toLowerCase(),
      phone: clean(body.phone, 40),
      notes: clean(body.notes, 450),
      buyerType: body.buyerType === 'consumer' ? 'consumer' : 'business',
    }
    if (buyer.name.length < 2) return json({ error: 'Please give your name.' }, 400)
    if (!EMAIL.test(buyer.email)) return json({ error: 'Please give a valid email address.' }, 400)
    if (buyer.phone.replace(/\D/g, '').length < 10) return json({ error: 'Please give a phone number we can reach you on.' }, 400)
    if (buyer.buyerType === 'business' && !buyer.business) return json({ error: 'Please give your business name.' }, 400)
    if (body.acceptTerms !== true) return json({ error: 'Please tick the box to accept the terms.' }, 400)
    // A consumer has 14 days to cancel. Starting inside that window needs
    // their express request (Consumer Contracts Regulations 2013, reg 36).
    if (buyer.buyerType === 'consumer' && body.startNow !== true) {
      return json({ error: 'Please tick the box asking us to start within the 14-day cancellation period.' }, 400)
    }

    if (plan.id === 'bf-website' && (await bfPlacesLeft(context)) <= 0) {
      return json({ error: 'All 10 Black Friday places have gone. Call 01443 805303 and we\'ll tell you what we can do.' }, 409)
    }

    const { siteUrl } = getEnv(context)
    const meta = {
      plan: plan.id,
      plan_name: plan.name,
      build_price: String(plan.price),
      name: buyer.name,
      business: buyer.business,
      phone: buyer.phone,
      buyer_type: buyer.buyerType,
      start_now: buyer.buyerType === 'consumer' ? 'yes' : 'n/a',
      notes: buyer.notes,
      care_plan: plan.care.slice(0, 450),
    }

    const params = new URLSearchParams()
    params.set('mode', 'payment')
    params.set('success_url', `${siteUrl}/order?session_id={CHECKOUT_SESSION_ID}`)
    params.set('cancel_url', `${siteUrl}/order?plan=${encodeURIComponent(plan.id)}&cancelled=1`)
    params.set('customer_email', buyer.email)
    params.set('payment_method_types[0]', 'card')
    params.set('billing_address_collection', 'required')
    params.set('line_items[0][quantity]', '1')
    params.set('line_items[0][price_data][currency]', 'gbp')
    params.set('line_items[0][price_data][unit_amount]', String(plan.depositPence))
    params.set('line_items[0][price_data][product_data][name]', `50% deposit: ${plan.name}`)
    params.set('line_items[0][price_data][product_data][description]', `Build price £${plan.price.toLocaleString('en-GB')} + VAT. The other 50% is due before launch.`)
    params.set('line_items[1][quantity]', '1')
    params.set('line_items[1][price_data][currency]', 'gbp')
    params.set('line_items[1][price_data][unit_amount]', String(plan.vatPence))
    params.set('line_items[1][price_data][product_data][name]', 'VAT at 20% (GB 517 076 395)')
    for (const [k, v] of Object.entries(meta)) {
      params.set(`metadata[${k}]`, v)
      params.set(`payment_intent_data[metadata][${k}]`, v)
    }
    params.set('payment_intent_data[description]', `50% deposit: ${plan.name} (${buyer.business || buyer.name})`)

    const session = await stripeRequest(context, '/checkout/sessions', params)
    return json({ url: session.url })
  } catch (error) {
    console.error('deposit', error)
    return json({ error: 'We couldn\'t start the payment. Please try again, or call 01443 805303.' }, 500)
  }
}
