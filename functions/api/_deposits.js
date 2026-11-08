// Shared by /api/deposit and /api/deposit-confirm. The leading underscore
// keeps Pages from serving this file as a route.

import { getEnv, requireEnv } from './shop/_lib.js'

const STRIPE = 'https://api.stripe.com/v1'
export const NOTIFY_EMAIL = 'david@dhwebsiteservices.co.uk'
const BF_PLACES = 10

export async function stripeGet(context, path) {
  const key = requireEnv(getEnv(context).stripeSecretKey, 'STRIPE_SECRET_KEY')
  const res = await fetch(`${STRIPE}${path}`, { headers: { Authorization: `Bearer ${key}` } })
  const body = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(body?.error?.message || 'Stripe request failed')
  return body
}

/**
 * Black Friday places still free. Online deposits are counted from Stripe;
 * places Jack booked by phone or email are added with the BF_BOOKED_OFFLINE
 * Pages variable, so the "only 10" on the page stays true.
 */
export async function bfPlacesLeft(context) {
  const query = encodeURIComponent("metadata['plan']:'bf-website' AND status:'succeeded'")
  const found = await stripeGet(context, `/payment_intents/search?query=${query}&limit=100`)
  const offline = Number(context.env.BF_BOOKED_OFFLINE || 0) || 0
  return BF_PLACES - offline - (found.data || []).length
}

export async function sendEmail(context, to, subject, html) {
  const { env } = context
  if (!env.RESEND_API_KEY || !to) return false
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: env.FROM_EMAIL || 'DH Website Services <noreply@dhwebsiteservices.co.uk>', to: [to], subject, html }),
  }).catch(() => null)
  return Boolean(res?.ok)
}

export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])
