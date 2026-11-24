// POST /api/security-check -- the "Book your free quick test" form on /security-check.
//
// Saved first (ENQUIRIES KV, prefix security:, kept two years, including the
// permission the person gave and when), then emailed to clients@ and a fixed
// confirmation to the sender. Same pattern as /api/enquiry. The saved record
// is the written authorisation for the free quick test; anything deeper still
// needs the signed DH Security Check authorisation form.

import { esc } from './_deposits.js'

const NOTIFY = 'clients@dhwebsiteservices.co.uk'
const KEEP_SECONDS = 60 * 60 * 24 * 730
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const CONSENT_TEXT = "I own this website, or I'm authorised to make decisions about it, and I give DH Website Services permission to run a non-intrusive security check on it."
const clean = (v, max) => String(v ?? '').trim().slice(0, max)
const json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })

function normaliseSite(raw) {
  let s = clean(raw, 300).replace(/\s+/g, '')
  if (!s) return ''
  if (!/^https?:\/\//i.test(s)) s = `https://${s}`
  try {
    const u = new URL(s)
    if (!/\.[a-z]{2,}$/i.test(u.hostname)) return ''
    return `${u.protocol}//${u.hostname}${u.pathname === '/' ? '' : u.pathname}`
  } catch { return '' }
}

async function send(env, { to, subject, html, replyTo }) {
  if (!env.RESEND_API_KEY) return false
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: 'DH Website Services <clients@dhwebsiteservices.co.uk>',
      to: [to], subject, html,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  }).catch(() => null)
  return Boolean(res?.ok)
}

const row = (label, value) => value
  ? `<tr><td style="padding:9px 14px;background:#F9FAFB;border:1px solid #E5E7EB;font-weight:600;font-size:13px;width:140px">${esc(label)}</td><td style="padding:9px 14px;border:1px solid #E5E7EB;font-size:13px">${esc(value)}</td></tr>`
  : ''

export async function onRequestPost({ request, env }) {
  const body = await request.json().catch(() => ({}))
  if (clean(body.website, 200)) return json({ ok: true }) // honeypot

  const r = {
    name: clean(body.name, 120),
    business: clean(body.business, 160),
    email: clean(body.email, 200).toLowerCase(),
    phone: clean(body.phone, 40),
    site: normaliseSite(body.site),
    consent: body.consent === true,
    consentText: CONSENT_TEXT,
    receivedAt: new Date().toISOString(),
    ip: request.headers.get('CF-Connecting-IP') || '',
    country: request.cf?.country || '',
  }
  if (r.name.length < 2 || r.business.length < 2 || !EMAIL.test(r.email)) return json({ error: 'Please fill in your name, business and email.' }, 400)
  if (!/^(?:\+44|0044|0)7\d{9}$/.test(r.phone.replace(/[\s()-]/g, ''))) return json({ error: 'Please enter a UK mobile number, for example 07700 900123.' }, 400)
  if (!r.site) return json({ error: 'Please enter your website address, for example yourbusiness.co.uk.' }, 400)
  if (!r.consent) return json({ error: 'Please tick the box to confirm the website is yours and we have your permission.' }, 400)

  let saved = false
  if (env.ENQUIRIES) {
    const key = `security:${r.receivedAt}:${crypto.randomUUID().slice(0, 8)}`
    saved = await env.ENQUIRIES.put(key, JSON.stringify(r), { expirationTtl: KEEP_SECONDS }).then(() => true, () => false)
  }

  const [notified] = await Promise.all([
    send(env, {
      to: NOTIFY,
      replyTo: r.email,
      subject: `Security check request - ${r.business} (${r.site})`,
      html: `<div style="font-family:Arial,sans-serif;padding:32px;max-width:560px"><h2 style="color:#1A1612;margin-bottom:4px">Free quick security test requested</h2><p style="color:#6E6E73;margin-bottom:20px;font-size:14px">From dhwebsiteservices.co.uk/security-check${saved ? ' · saved' : ' · NOT saved, keep this email'}. Permission ticked at ${esc(r.receivedAt)} from ${esc(r.ip)}.</p><table style="width:100%;border-collapse:collapse;margin-bottom:20px">${row('Name', r.name)}${row('Business', r.business)}${row('Email', r.email)}${row('Phone', r.phone)}${row('Website', r.site)}${row('Country', r.country)}</table><p style="font-size:13px;color:#6E6E73">Consent given: "${esc(CONSENT_TEXT)}"</p><p style="font-size:13px;color:#6E6E73">Log it in growth/security/engagements.csv before testing. Quick test = outside only. Full test needs the signed authorisation form.</p></div>`,
    }),
    send(env, {
      to: r.email,
      subject: 'Your free website security check - DH Website Services',
      html: `<div style="font-family:Arial,sans-serif;padding:32px;max-width:560px"><h2 style="color:#1A1612;margin-bottom:10px">Thanks, ${esc(r.name.split(' ')[0])}</h2><p style="font-size:14px;line-height:1.7;color:#3D3D3F">We've got your request for a free quick security test of ${esc(r.site)}. We'll run it and get back to you within two working days with what we found.</p><p style="font-size:14px;line-height:1.7;color:#3D3D3F;margin-top:16px">If the quick test turns something up, a full test is £30 + VAT and most fixes are £90 + VAT. We'll always tell you the price before doing anything.</p><p style="font-size:14px;line-height:1.7;color:#3D3D3F;margin-top:16px">If you didn't ask for this, just reply and let us know and we won't test anything.</p><p style="font-size:14px;line-height:1.7;color:#3D3D3F;margin-top:16px">DH Website Services, Pontypridd<br>01443 805303</p></div>`,
    }),
  ])

  if (!saved && !notified) return json({ error: 'We could not send that just now. Please call 01443 805303.' }, 502)

  // Confirmation text to their mobile, if they gave one. DH Phone decides
  // whether it's a UK mobile and limits it to one a day per number; a failed
  // text never fails the booking.
  if (r.phone && env.DH_PHONE_TEXT_KEY) {
    await fetch('https://dh-phone.aged-silence-66a7.workers.dev/hook/website-text', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-website-text-key': env.DH_PHONE_TEXT_KEY },
      body: JSON.stringify({ to: r.phone, business: r.business }),
    }).catch(() => null)
  }
  return json({ ok: true })
}
