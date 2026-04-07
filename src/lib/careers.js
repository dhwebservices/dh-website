import { SUPABASE_ANON_KEY, SUPABASE_URL } from './siteConfig'

export const CANDIDATE_PORTAL_URL = 'https://careers.dhwebsiteservices.co.uk'

const HIRING_PERMISSION_KEYS = [
  'recruiting_dashboard',
  'recruiting_jobs',
  'recruiting_applications',
  'recruiting_board',
  'recruiting_settings',
]

function restHeaders(extra = {}) {
  return {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    ...extra,
  }
}

function encodePath(path = '') {
  return String(path || '').split('/').map((part) => encodeURIComponent(part)).join('/')
}

function normalizeJobProfileMeta(raw = {}) {
  return {
    hiring_manager_name: String(raw.hiring_manager_name || '').trim(),
    hiring_manager_email: String(raw.hiring_manager_email || '').trim().toLowerCase(),
  }
}

export function normalizeQuestion(raw = {}, index = 0) {
  return {
    id: String(raw?.id || `q_${index + 1}`),
    label: String(raw?.label || raw?.question || '').trim(),
    type: ['text', 'textarea', 'select'].includes(raw?.type) ? raw.type : 'textarea',
    required: raw?.required !== false,
    help: String(raw?.help || '').trim(),
    options: Array.isArray(raw?.options) ? raw.options.filter(Boolean) : [],
  }
}

export function normalizeJob(row = {}) {
  return {
    id: row.id || '',
    slug: row.slug || '',
    title: row.title || '',
    department: row.department || '',
    location_type: row.location_type || 'remote',
    location_text: row.location_text || '',
    employment_type: row.employment_type || 'full_time',
    compensation_model: row.compensation_model || 'commission_only',
    salary_text: row.salary_text || '',
    commission_only: row.commission_only === true,
    summary: row.summary || '',
    description: row.description || '',
    responsibilities: row.responsibilities || '',
    requirements: row.requirements || '',
    benefits: row.benefits || '',
    screening_questions: Array.isArray(row.screening_questions) ? row.screening_questions.map(normalizeQuestion).filter((item) => item.label) : [],
    status: row.status || 'draft',
    closing_at: row.closing_at || '',
    published_at: row.published_at || '',
    hiring_manager_name: row.hiring_manager_name || '',
    hiring_manager_email: row.hiring_manager_email || '',
  }
}

async function listJobProfileMetaMap(jobIds = []) {
  if (!jobIds.length) return {}

  const response = await fetch(`${SUPABASE_URL}/rest/v1/portal_settings?select=key,value&key=like.recruiting:job_profile:%`, {
    headers: restHeaders(),
  })
  const payload = await response.json().catch(() => [])
  if (!response.ok) throw new Error(payload?.message || 'Could not load hiring manager details')

  const jobIdSet = new Set(jobIds)
  return (payload || []).reduce((acc, row) => {
    const key = String(row.key || '')
    const jobId = key.split(':').pop()
    if (!jobIdSet.has(jobId)) return acc
    acc[jobId] = normalizeJobProfileMeta(row.value?.value ?? row.value ?? {})
    return acc
  }, {})
}

async function tryListJobProfileMetaMap(jobIds = []) {
  try {
    return await listJobProfileMetaMap(jobIds)
  } catch (error) {
    console.warn('Could not load public job profile metadata', error)
    return {}
  }
}

export async function getPublishedJobs() {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/job_posts?status=eq.published&select=*&order=published_at.desc.nullslast`, {
    headers: restHeaders(),
  })
  const payload = await response.json()
  if (!response.ok) throw new Error(payload?.message || 'Could not load jobs')
  const jobs = (payload || []).map(normalizeJob)
  const metaMap = await tryListJobProfileMetaMap(jobs.map((job) => job.id))
  return jobs.map((job) => ({ ...job, ...(metaMap[job.id] || {}) }))
}

export async function getJobBySlug(slug) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/job_posts?slug=eq.${encodeURIComponent(slug)}&status=eq.published&select=*`, {
    headers: restHeaders(),
  })
  const payload = await response.json()
  if (!response.ok) throw new Error(payload?.message || 'Could not load the role')
  if (!payload?.[0]) return null
  const job = normalizeJob(payload[0])
  const metaMap = await tryListJobProfileMetaMap([job.id])
  return { ...job, ...(metaMap[job.id] || {}) }
}

export async function uploadCv(file, applicationRef) {
  const filePath = `applications/${applicationRef}/${Date.now()}-${file.name.replace(/\s+/g, '-')}`
  const uploadResponse = await fetch(`${SUPABASE_URL}/storage/v1/object/recruiting-documents/${encodePath(filePath)}`, {
    method: 'POST',
    headers: restHeaders({
      'Content-Type': file.type || 'application/octet-stream',
      'x-upsert': 'false',
    }),
    body: file,
  })
  if (!uploadResponse.ok) {
    const payload = await uploadResponse.text()
    throw new Error(payload || 'Could not upload CV')
  }

  return {
    path: filePath,
    url: `${SUPABASE_URL}/storage/v1/object/public/recruiting-documents/${encodePath(filePath)}`,
  }
}

export function buildApplicationRef() {
  const stamp = new Date().toISOString().slice(2, 10).replace(/-/g, '')
  const random = Math.random().toString(36).slice(2, 7).toUpperCase()
  return `DH-${stamp}-${random}`
}

export function getCandidatePortalJobUrl(slug = '') {
  return `${CANDIDATE_PORTAL_URL}/jobs/${slug}`
}

export function getCandidatePortalApplyUrl(slug = '') {
  return `${CANDIDATE_PORTAL_URL}/apply/${slug}`
}

function hasHiringAccess(permissions = {}) {
  if (!permissions || typeof permissions !== 'object' || Array.isArray(permissions)) return false
  return HIRING_PERMISSION_KEYS.some((key) => permissions[key] === true)
}

async function createHiringNotifications(application, job) {
  const recipientsResponse = await fetch(`${SUPABASE_URL}/rest/v1/user_permissions?select=user_email,permissions`, {
    headers: restHeaders(),
  })
  const recipients = await recipientsResponse.json().catch(() => [])
  if (!recipientsResponse.ok) {
    throw new Error(recipients?.message || 'Could not load hiring recipients')
  }

  const targetEmails = [...new Set(
    (recipients || [])
      .filter((row) => hasHiringAccess(row.permissions))
      .map((row) => String(row.user_email || '').toLowerCase().trim())
      .filter(Boolean)
  )]

  if (!targetEmails.length) return

  const createdAt = new Date().toISOString()
  const title = `New application for ${job.title || 'open role'}`
  const applicantLabel = application.full_name || application.email || 'A new applicant'
  const message = `${applicantLabel} applied for ${job.title || 'this role'}.`
  const link = `/recruiting/applications/${application.id}`

  const insertResponse = await fetch(`${SUPABASE_URL}/rest/v1/notifications`, {
    method: 'POST',
    headers: restHeaders({
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    }),
    body: JSON.stringify(
      targetEmails.map((user_email) => ({
        user_email,
        title,
        message,
        type: 'info',
        link,
        read: false,
        created_at: createdAt,
      }))
    ),
  })

  if (!insertResponse.ok) {
    const payload = await insertResponse.text()
    throw new Error(payload || 'Could not create hiring notifications')
  }
}

export async function submitApplication({ job, form, cvUpload }) {
  const payload = {
    job_post_id: job.id,
    application_ref: form.application_ref,
    status: 'new',
    first_name: form.first_name.trim(),
    last_name: form.last_name.trim(),
    full_name: `${form.first_name} ${form.last_name}`.trim(),
    email: form.email.trim(),
    phone: form.phone.trim(),
    location: form.location.trim(),
    linkedin_url: form.linkedin_url.trim(),
    portfolio_url: form.portfolio_url.trim(),
    cv_file_url: cvUpload.url,
    cv_file_path: cvUpload.path,
    cover_note: form.cover_note.trim(),
    experience_summary: form.experience_summary.trim(),
    current_job_title: form.current_job_title.trim(),
    years_experience: form.years_experience.trim(),
    screening_answers: form.screening_answers,
    commission_acknowledged: form.commission_acknowledged === true,
    privacy_acknowledged: form.privacy_acknowledged === true,
    source: 'website',
    submitted_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  const response = await fetch(`${SUPABASE_URL}/rest/v1/job_applications`, {
    method: 'POST',
    headers: restHeaders({
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    }),
    body: JSON.stringify(payload),
  })
  const result = await response.json().catch(() => [])
  if (!response.ok) throw new Error(result?.message || 'Could not submit application')
  const saved = result?.[0] || payload
  await createHiringNotifications(saved, job).catch((error) => {
    console.warn('Could not create hiring notifications', error)
  })
  return saved
}
