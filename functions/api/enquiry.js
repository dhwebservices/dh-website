// POST /api/enquiry -- the "Send your brief" form on /contact.
//
// It used to send two emails straight from the browser through the booking
// Worker and keep nothing, so one failed email meant a lost lead. Now the
// brief is saved first, in the ENQUIRIES KV namespace (bound to the Pages
// project, kept two years), and then emailed to clients@ and the sender.
// A brief counts as received if either the save or the email worked.

import { esc } from './_deposits.js'

const NOTIFY = 'clients@dhwebsiteservices.co.uk'
const KEEP_SECONDS = 60 * 60 * 24 * 730
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const clean = (v, max) => String(v ?? '').trim().slice(0, max)
const json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })

async function send(env, { to, subject, html, replyTo }) {
  if (!env.RESEND_API_KEY) return false
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: 'DH Website Services <clients@dhwebsiteservices.co.uk>',
      to: [to],
      subject,
      html,
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
  // Honeypot: people never see this field, form-filling bots do.
  if (clean(body.website, 200)) return json({ ok: true })

  const e = {
    name: clean(body.name, 120),
    email: clean(body.email, 200).toLowerCase(),
    business: clean(body.business, 160),
    budget: clean(body.budget, 80),
    timeline: clean(body.timeline, 80),
    message: clean(body.message, 5000),
    estimate: clean(body.estimate, 400),
    offer: clean(body.offer, 200),
    page: clean(body.page, 200),
    receivedAt: new Date().toISOString(),
    country: request.cf?.country || '',
  }
  if (e.name.length < 2 || !EMAIL.test(e.email) || e.message.length < 2) {
    return json({ error: 'Please fill in your name, email and project brief.' }, 400)
  }

  let saved = false
  if (env.ENQUIRIES) {
    const key = `enquiry:${e.receivedAt}:${crypto.randomUUID().slice(0, 8)}`
    saved = await env.ENQUIRIES.put(key, JSON.stringify(e), { expirationTtl: KEEP_SECONDS }).then(() => true, () => false)
  }

  const kind = e.offer ? 'Black Friday booking' : 'New website enquiry'
  const [notified] = await Promise.all([
    send(env, {
      to: NOTIFY,
      replyTo: e.email,
      subject: `${kind} - ${e.name}`,
      html: `<div style="font-family:Arial,sans-serif;padding:32px;max-width:560px"><h2 style="color:#1A1612;margin-bottom:4px">${esc(kind)}</h2><p style="color:#6E6E73;margin-bottom:20px;font-size:14px">Sent from dhwebsiteservices.co.uk${esc(e.page)}${saved ? ' · saved' : ' · NOT saved, keep this email'}. Reply to answer them.</p><table style="width:100%;border-collapse:collapse;margin-bottom:20px">${row('Name', e.name)}${row('Email', e.email)}${row('Business', e.business)}${row('Budget', e.budget)}${row('Timeline', e.timeline)}${row('Estimate', e.estimate)}${row('Offer', e.offer)}${row('Country', e.country)}</table><div style="padding:16px 18px;background:#F9FAFB;border:1px solid #E5E7EB;border-radius:12px"><div style="font-size:12px;font-weight:700;color:#6E6E73;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:10px">Project brief</div><p style="font-size:14px;line-height:1.7;color:#1A1612;white-space:pre-wrap;margin:0">${esc(e.message)}</p></div></div>`,
    }),
    send(env, {
      to: e.email,
      subject: 'We received your enquiry - DH Website Services',
      html: `<div style="font-family:Arial,sans-serif;padding:32px;max-width:560px"><h2 style="color:#1A1612;margin-bottom:10px">Thanks, ${esc(e.name.split(' ')[0])}</h2><p style="font-size:14px;line-height:1.7;color:#3D3D3F">We have your enquiry and will reply within one working day with a clear next step. If your brief needs a call, we will say so. If it can be priced directly, we will do that too.</p><p style="font-size:14px;line-height:1.7;color:#3D3D3F;margin-top:16px">If you need anything in the meantime, reply to this email or call 01443 805303.</p><p style="font-size:14px;line-height:1.7;color:#3D3D3F;margin-top:16px">David Hooper and Jack Deane<br>DH Website Services, Pontypridd</p></div>`,
    }),
  ])

  if (!saved && !notified) {
    console.error('enquiry: neither saved nor emailed', e.email)
    return json({ error: 'We could not send that just now. Please email clients@dhwebsiteservices.co.uk or call 01443 805303.' }, 502)
  }
  return json({ ok: true })
}
