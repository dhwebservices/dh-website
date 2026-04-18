const SITE_URL = 'https://dhwebsiteservices.co.uk'
const DEFAULT_SUPABASE_URL = 'https://xtunnfdwltfesscmpove.supabase.co'
const DEFAULT_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0dW5uZmR3bHRmZXNzY21wb3ZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1MDkyNzAsImV4cCI6MjA4OTA4NTI3MH0.MaNZGpdSrn5kSTmf3kR87WCK_ga5Meze0ZvlZDkIjfM'
const DEFAULT_WORKER_URL = 'https://dh-email-worker.aged-silence-66a7.workers.dev'

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  })
}

function getEnv(context) {
  const { env } = context
  return {
    supabaseUrl: env.SUPABASE_URL || DEFAULT_SUPABASE_URL,
    supabaseKey: env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY,
    workerUrl: env.WORKER_URL || DEFAULT_WORKER_URL,
    siteUrl: env.SITE_URL || SITE_URL,
  }
}

async function supabaseRequest(context, path, init = {}) {
  const { supabaseUrl, supabaseKey } = getEnv(context)
  if (!supabaseKey) throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY')

  const response = await fetch(`${supabaseUrl}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      ...(init.body ? { 'Content-Type': 'application/json' } : {}),
      ...init.headers,
    },
  })

  const text = await response.text()
  const payload = text ? JSON.parse(text) : null

  if (!response.ok) {
    const error = new Error(payload?.message || payload?.error || 'Supabase request failed')
    error.payload = payload
    throw error
  }

  return payload
}

async function postWorker(context, type, data) {
  const { workerUrl } = getEnv(context)
  const response = await fetch(workerUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, data }),
  })

  const text = await response.text()
  const payload = text ? JSON.parse(text) : null
  if (!response.ok) throw new Error(payload?.error || 'Worker request failed')
  return payload
}

async function getMaintenanceSettings(context) {
  const rows = await supabaseRequest(
    context,
    'website_content?section=eq.maintenance&select=content&limit=1'
  )
  return rows?.[0]?.content || {}
}

async function logMaintenanceLead(context, payload) {
  try {
    await supabaseRequest(context, 'audit_log', {
      method: 'POST',
      body: JSON.stringify([{
        user_email: null,
        user_name: payload.name,
        action: 'maintenance_callback_requested',
        target: 'dh-website',
        target_id: null,
        details: payload,
      }]),
    })
  } catch {
    // Do not block lead submission on logging failures.
  }
}

export async function onRequestPost(context) {
  try {
    const body = await context.request.json().catch(() => ({}))
    const name = String(body?.name || '').trim()
    const phone = String(body?.phone || '').trim()

    if (!name || !phone) {
      return json({ error: 'Name and phone number are required.' }, 400)
    }

    const settings = await getMaintenanceSettings(context)
    const toEmail = String(settings?.email_to || 'mgmt@dhwebsiteservices.co.uk').trim() || 'mgmt@dhwebsiteservices.co.uk'

    await postWorker(context, 'outreach_contact', {
      to_email: toEmail,
      contact_name: name,
      subject: 'DH Website Services maintenance callback request',
      message: [
        'A visitor requested a callback while the public site was in maintenance mode.',
        '',
        `Name: ${name}`,
        `Phone: ${phone}`,
        '',
        `Submitted from: ${getEnv(context).siteUrl}`,
        `Submitted at: ${new Date().toISOString()}`,
      ].join('\n'),
    })

    await logMaintenanceLead(context, {
      name,
      phone,
      to_email: toEmail,
      submitted_at: new Date().toISOString(),
    })

    return json({ ok: true })
  } catch (error) {
    return json({ error: error.message || 'Could not send callback request.' }, 500)
  }
}
