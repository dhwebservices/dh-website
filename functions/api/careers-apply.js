/**
 * Job applications from the careers pages.
 *
 * This used to happen in the visitor's browser with the public anon key:
 * upload the CV, insert the application, then read the WHOLE staff
 * permissions table to work out who to notify. That meant those tables had to
 * be open to anyone. Now the browser sends one form here and the server does
 * all three with the server key.
 */
const MAX_BYTES = 5 * 1024 * 1024
const TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
])
const HIRING_PERMISSION_KEYS = [
  'recruiting_dashboard', 'recruiting_jobs', 'recruiting_applications', 'recruiting_board', 'recruiting_settings',
]
const TEXT_FIELDS = [
  'first_name', 'last_name', 'email', 'phone', 'location', 'linkedin_url', 'portfolio_url',
  'cover_note', 'experience_summary', 'current_job_title', 'years_experience',
]

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  })
}

function db(env) {
  const url = env.SUPABASE_URL
  const key = env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) throw new Error('Applications are not configured.')
  const headers = { apikey: key, Authorization: `Bearer ${key}` }
  return {
    url,
    headers,
    async rest(path, init = {}) {
      const response = await fetch(`${url}/rest/v1/${path}`, {
        ...init,
        headers: { ...headers, ...(init.body ? { 'Content-Type': 'application/json' } : {}), ...(init.headers || {}) },
      })
      const text = await response.text()
      const data = text ? JSON.parse(text) : null
      if (!response.ok) throw new Error(data?.message || `Database error (${response.status}).`)
      return data
    },
  }
}

function clean(value, max = 4000) {
  return String(value ?? '').trim().slice(0, max)
}

function sanitizeFilename(name = 'document') {
  return String(name).replace(/[^a-zA-Z0-9._-]+/g, '-').replace(/-+/g, '-').slice(0, 120) || 'document'
}

function encodePath(path) {
  return path.split('/').map(encodeURIComponent).join('/')
}

async function upload(store, file, ref, type) {
  if (!file || typeof file === 'string' || !file.size) return null
  if (file.size > MAX_BYTES) throw Object.assign(new Error('Files must be 5MB or smaller.'), { status: 400 })
  if (!TYPES.has(file.type)) throw Object.assign(new Error('Upload a PDF or Word document.'), { status: 400 })
  const path = `applications/${ref}/${type}-${Date.now()}-${sanitizeFilename(file.name)}`
  const response = await fetch(`${store.url}/storage/v1/object/recruiting-documents/${encodePath(path)}`, {
    method: 'POST',
    headers: { ...store.headers, 'Content-Type': file.type, 'x-upsert': 'false' },
    body: file.stream(),
  })
  if (!response.ok) throw new Error('Could not upload your document. Try again.')
  return {
    path,
    url: `${store.url}/storage/v1/object/public/recruiting-documents/${encodePath(path)}`,
    name: file.name,
    contentType: file.type,
  }
}

function hasHiringAccess(permissions) {
  if (!permissions || typeof permissions !== 'object' || Array.isArray(permissions)) return false
  return HIRING_PERMISSION_KEYS.some((key) => permissions[key] === true)
}

async function notifyHiringTeam(store, application, job) {
  const rows = await store.rest('user_permissions?select=user_email,permissions')
  const emails = [...new Set((rows || [])
    .filter((row) => hasHiringAccess(row.permissions))
    .map((row) => String(row.user_email || '').toLowerCase().trim())
    .filter(Boolean))]
  if (!emails.length) return
  const createdAt = new Date().toISOString()
  const who = application.full_name || application.email || 'A new applicant'
  await store.rest('notifications', {
    method: 'POST',
    headers: { Prefer: 'return=minimal' },
    body: JSON.stringify(emails.map((user_email) => ({
      user_email,
      title: `New application for ${job.title || 'open role'}`,
      message: `${who} applied for ${job.title || 'this role'}.`,
      type: 'info',
      link: `/recruiting/applications/${application.id}`,
      read: false,
      created_at: createdAt,
    }))),
  })
}

export async function onRequestPost({ request, env }) {
  let form
  try {
    form = await request.formData()
  } catch {
    return json({ ok: false, error: 'Send the application as a form.' }, 400)
  }

  try {
    const store = db(env)
    const jobId = clean(form.get('job_id'), 64)
    if (!/^[0-9a-f-]{8,64}$/i.test(jobId)) return json({ ok: false, error: 'That role could not be found.' }, 400)

    const jobs = await store.rest(`job_posts?id=eq.${encodeURIComponent(jobId)}&status=eq.published&select=id,title&limit=1`)
    const job = jobs?.[0]
    if (!job) return json({ ok: false, error: 'That role is no longer open.' }, 404)

    const fields = Object.fromEntries(TEXT_FIELDS.map((name) => [name, clean(form.get(name))]))
    if (!fields.first_name || !fields.last_name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      return json({ ok: false, error: 'Add your name and a valid email address.' }, 400)
    }

    let screening = {}
    try { screening = JSON.parse(String(form.get('screening_answers') || '{}')) } catch { screening = {} }

    const ref = /^DH-[0-9]{6}-[A-Z0-9]{3,8}$/.test(String(form.get('application_ref') || ''))
      ? String(form.get('application_ref'))
      : `DH-${new Date().toISOString().slice(2, 10).replace(/-/g, '')}-${crypto.randomUUID().slice(0, 5).toUpperCase()}`

    const cv = await upload(store, form.get('cv'), ref, 'cv')
    if (!cv) return json({ ok: false, error: 'Attach your CV.' }, 400)
    const cover = await upload(store, form.get('cover_letter'), ref, 'cover-letter')

    const now = new Date().toISOString()
    const payload = {
      job_post_id: job.id,
      application_ref: ref,
      status: 'new',
      ...fields,
      full_name: `${fields.first_name} ${fields.last_name}`.trim(),
      cv_file_url: cv.url,
      cv_file_path: cv.path,
      cv_file_name: cv.name,
      cv_file_content_type: cv.contentType,
      cover_letter_file_url: cover?.url || null,
      cover_letter_file_path: cover?.path || null,
      cover_letter_file_name: cover?.name || null,
      cover_letter_file_content_type: cover?.contentType || null,
      screening_answers: screening,
      commission_acknowledged: form.get('commission_acknowledged') === 'true',
      privacy_acknowledged: form.get('privacy_acknowledged') === 'true',
      source: 'website',
      submitted_at: now,
      created_at: now,
      updated_at: now,
    }

    const saved = (await store.rest('job_applications', {
      method: 'POST',
      headers: { Prefer: 'return=representation' },
      body: JSON.stringify(payload),
    }))?.[0] || payload

    await notifyHiringTeam(store, saved, job).catch((error) => console.warn('Hiring notifications failed', error))

    return json({ ok: true, application: { id: saved.id, application_ref: saved.application_ref, full_name: saved.full_name, email: saved.email } })
  } catch (error) {
    return json({ ok: false, error: error.message || 'Could not submit your application.' }, error.status || 500)
  }
}
