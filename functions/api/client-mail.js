/**
 * Email relay for the client area (app.dhwebsiteservices.co.uk).
 *
 * The client area is its own Pages project with its own private D1 database,
 * and it needs to send three kinds of email. Rather than give it a second
 * Resend key, it calls this function, which already has RESEND_API_KEY.
 *
 * No shared secret: the caller only sends a job id. This function then asks
 * the client area itself for that job (GET APP_URL/api/mail-job/<id>), which
 * hands each job out once and only for two minutes after creating it. So the
 * only mail that can ever go out is mail the client area queued, and only
 * three fixed templates exist. Request alerts only ever go to our own inbox.
 */

const OUR_INBOX = 'clients@dhwebsiteservices.co.uk'
const APP_URL = 'https://app.dhwebsiteservices.co.uk'

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
const isEmail = (s) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(s || ''))

const shell = (inner) => `<div style="font-family:Arial,Helvetica,sans-serif;max-width:520px;padding:28px 24px;color:#14181A">
  <p style="font-weight:700;font-size:15px;margin:0 0 28px">DH Website Services</p>${inner}
  <p style="color:#555D60;font-size:13px;margin-top:32px;border-top:1px solid #E6EAE7;padding-top:16px">DH Website Services · Pontypridd · 01443 805303</p></div>`

function build(template, d) {
  if (template === 'code') {
    if (!/^\d{6}$/.test(String(d.code))) return null
    const code = String(d.code)
    return {
      subject: `${code} is your DH sign-in code`,
      text: `Your sign-in code for the DH Website Services client area is ${code}. It works for 10 minutes.\n\nIf you didn't ask for this, you can ignore this email.`,
      html: shell(`<p style="font-size:16px;line-height:1.6;margin:0 0 8px">Your sign-in code for the client area. It works for 10 minutes.</p>
        <p style="font-size:34px;font-weight:700;letter-spacing:6px;margin:12px 0 20px">${code.slice(0, 3)} ${code.slice(3)}</p>
        <p style="color:#555D60;font-size:14px">If you didn't ask for this, you can ignore this email.</p>`),
    }
  }
  if (template === 'invite') {
    const name = esc(d.name)
    const business = esc(d.business)
    return {
      subject: 'Your DH Website Services client area',
      text: `Hi${d.name ? ' ' + d.name : ''},\n\nWe've set up the client area for ${d.business || 'your business'}. You can see your website, ask for changes, and find invoices and documents there.\n\nSign in at ${APP_URL} with this email address. There's no password: we email you a code each time.\n\nDavid and Jack\nDH Website Services, 01443 805303`,
      html: shell(`<p style="font-size:16px;line-height:1.6">Hi${name ? ' ' + name : ''},</p>
        <p style="font-size:16px;line-height:1.6">We've set up the client area for ${business || 'your business'}. You can see your website, ask for changes, and find invoices and documents there.</p>
        <p style="margin:24px 0"><a href="${APP_URL}" style="display:inline-block;background:#C8102E;color:#fff;padding:13px 22px;border-radius:8px;text-decoration:none;font-weight:600">Open the client area</a></p>
        <p style="color:#555D60;font-size:14px;line-height:1.6">Sign in with this email address. There's no password: we email you a code each time.</p>`),
    }
  }
  if (template === 'request') {
    return {
      to: OUR_INBOX,
      subject: `Change request: ${String(d.business || 'client').slice(0, 80)}`,
      text: `${d.name || d.email} (${d.business}) asked for a change in the client area:\n\n${d.message}\n\nReply in the client area: ${APP_URL}`,
      html: shell(`<p style="font-size:16px;line-height:1.6"><strong>${esc(d.name || d.email)}</strong> (${esc(d.business)}) asked for a change:</p>
        <p style="white-space:pre-wrap;font-size:15px;line-height:1.6;background:#F4F5F3;padding:14px 16px;border-radius:8px">${esc(d.message)}</p>
        <p><a href="${APP_URL}" style="color:#C8102E;font-weight:600">Open the client area</a> · reply to: ${esc(d.email)}</p>`),
      replyTo: isEmail(d.email) ? d.email : undefined,
    }
  }
  return null
}

export async function onRequestPost({ request, env }) {
  let body
  try { body = await request.json() } catch { return new Response('Bad request', { status: 400 }) }
  const id = String(body.job || '')
  if (!/^[a-f0-9]{48}$/.test(id)) return new Response('Bad job', { status: 400 })

  // Preview builds of the client area (<branch>.dh-client-portal.pages.dev)
  // can use the relay too, so it can be tested before it goes live.
  const base = /^https:\/\/[a-z0-9-]+\.dh-client-portal\.pages\.dev$/.test(String(body.app || '')) ? body.app : APP_URL
  const jobRes = await fetch(`${base}/api/mail-job/${id}`, { headers: { accept: 'application/json' } })
  if (!jobRes.ok) return new Response('No such job', { status: 404 })
  const job = await jobRes.json()

  const mail = build(job.template, job.data || {})
  if (!mail) return new Response('Unknown template', { status: 400 })
  const to = mail.to || job.to
  if (!isEmail(to)) return new Response('Bad recipient', { status: 400 })
  if (!env.RESEND_API_KEY) return new Response('Email not configured', { status: 500 })

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: env.FROM_EMAIL || 'DH Website Services <noreply@dhwebsiteservices.co.uk>',
      to: [to], subject: mail.subject, html: mail.html, text: mail.text,
      ...(mail.replyTo ? { reply_to: mail.replyTo } : {}),
    }),
  })
  return new Response(JSON.stringify({ ok: res.ok }), { status: res.ok ? 200 : 502, headers: { 'Content-Type': 'application/json' } })
}
