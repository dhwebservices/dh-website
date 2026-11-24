// Emails for the public website forms (mailing list popup, careers form).
//
// These used to be sent straight from the visitor's browser through the DH
// email worker with a caller-chosen recipient, subject and HTML, which let
// anyone on the internet send any email as DH. Now the browser only says
// "I just signed up" / "I just applied", and this function builds both emails
// itself from the saved database row. Nothing here takes a recipient, subject
// or body from the request.
import { buildSubscriberEmail } from '../../src/lib/subscriberEmail.js'
import { buildApplicationConfirmationEmail, buildInternalApplicationEmail } from '../../src/lib/recruitingEmail.js'

const DEFAULT_SUPABASE_URL = 'https://xtunnfdwltfesscmpove.supabase.co'
const DEFAULT_WORKER_URL = 'https://dh-email-worker.aged-silence-66a7.workers.dev'
const RECENT_MS = 30 * 60 * 1000

const json = (data, status = 200) => new Response(JSON.stringify(data), {
  status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
})
const esc = (v = '') => String(v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))

async function db(env, path) {
  const key = env.SUPABASE_SERVICE_ROLE_KEY
  const res = await fetch(`${env.SUPABASE_URL || DEFAULT_SUPABASE_URL}/rest/v1/${path}`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
  })
  if (!res.ok) throw new Error(`lookup failed (${res.status})`)
  return res.json()
}

async function send(env, to, subject, html, from) {
  const res = await fetch(env.WORKER_URL || DEFAULT_WORKER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-dh-email-key': env.EMAIL_WORKER_KEY || '' },
    body: JSON.stringify({ type: 'custom_email', data: { to, subject, html, from } }),
  })
  if (!res.ok) throw new Error(`send failed (${res.status})`)
}

const recent = (iso) => iso && Date.now() - new Date(iso).getTime() < RECENT_MS

export async function onRequestPost({ request, env }) {
  let body
  try { body = await request.json() } catch { return json({ error: 'Bad request.' }, 400) }

  try {
    if (body?.kind === 'mailing_signup') {
      const email = String(body.email || '').trim().toLowerCase()
      if (!/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(email)) return json({ error: 'Bad request.' }, 400)
      const rows = await db(env, `mailing_list?email=eq.${encodeURIComponent(email)}&select=email,name,subscribed_at&order=subscribed_at.desc&limit=1`)
      const row = rows?.[0]
      // Only for a signup that really just happened.
      if (!row || !recent(row.subscribed_at)) return json({ ok: true })
      const name = row.name || email.split('@')[0]
      await send(env, email, "You're on the list! Your discount is on its way", buildSubscriberEmail(name), 'DH Website Services <clients@dhwebsiteservices.co.uk>')
      await send(env, 'clients@dhwebsiteservices.co.uk', `New mailing list signup - ${email}`,
        `<div style="font-family:Arial,sans-serif;padding:32px;max-width:500px"><h2 style="color:#1A1612">New Mailing List Signup</h2><p><b>Email:</b> ${esc(email)}</p>${row.name ? `<p><b>Name:</b> ${esc(row.name)}</p>` : ''}<p><b>Source:</b> Website popup</p><p><b>Time:</b> ${esc(new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' }))}</p><p style="font-size:13px;color:#6b7280">Remember to reach out with their discount code.</p></div>`,
        'DH Website Services <clients@dhwebsiteservices.co.uk>')
      return json({ ok: true })
    }

    if (body?.kind === 'career_application') {
      const ref = String(body.application_ref || '').trim()
      if (!/^[A-Za-z0-9-]{4,40}$/.test(ref)) return json({ error: 'Bad request.' }, 400)
      const apps = await db(env, `job_applications?application_ref=eq.${encodeURIComponent(ref)}&select=*&limit=1`)
      const application = apps?.[0]
      if (!application || !recent(application.created_at || application.submitted_at)) return json({ ok: true })
      const jobs = application.job_post_id ? await db(env, `job_posts?id=eq.${encodeURIComponent(application.job_post_id)}&select=*&limit=1`) : []
      const job = jobs?.[0] || { title: 'your application' }
      const from = 'DH Website Services HR <HR@dhwebsiteservices.co.uk>'
      await Promise.allSettled([
        send(env, application.email, `Application received — ${job.title}`, buildApplicationConfirmationEmail(application, job), from),
        send(env, 'HR@dhwebsiteservices.co.uk', `New application — ${job.title} — ${application.full_name}`, buildInternalApplicationEmail(application, job), from),
      ])
      return json({ ok: true })
    }

    return json({ error: 'Bad request.' }, 400)
  } catch (error) {
    return json({ error: 'Could not send the email right now.' }, 502)
  }
}
