import { SUPABASE_ANON_KEY, SUPABASE_URL } from './siteConfig'

export const CANDIDATE_DOCUMENT_MAX_BYTES = 5 * 1024 * 1024
export const CANDIDATE_DOCUMENT_ACCEPTED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]
export const CANDIDATE_DOCUMENT_ACCEPTED_EXTENSIONS = ['.pdf', '.doc', '.docx']

function restHeaders(extra = {}) {
  return {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    ...extra,
  }
}

function getFileExtension(name = '') {
  const match = String(name || '').toLowerCase().match(/\.[^.]+$/)
  return match ? match[0] : ''
}

export function validateCandidateDocument(file, label = 'file') {
  if (!file) return ''
  const extension = getFileExtension(file.name)
  const hasAcceptedType = !file.type || CANDIDATE_DOCUMENT_ACCEPTED_TYPES.includes(file.type)
  const hasAcceptedExtension = CANDIDATE_DOCUMENT_ACCEPTED_EXTENSIONS.includes(extension)

  if (!hasAcceptedType && !hasAcceptedExtension) {
    return `Please upload ${label} as a PDF, DOC, or DOCX file.`
  }
  if (file.size > CANDIDATE_DOCUMENT_MAX_BYTES) {
    return `${label.charAt(0).toUpperCase() + label.slice(1)} must be 5MB or smaller.`
  }
  return ''
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

// Files are sent with the application itself (see submitApplication); the
// server uploads them, so the storage bucket stays closed to the public key.
export async function uploadCandidateDocument(file, applicationRef, type = 'cv') {
  return { file, type, name: file?.name || '', contentType: file?.type || 'application/octet-stream' }
}

export function buildApplicationRef() {
  const stamp = new Date().toISOString().slice(2, 10).replace(/-/g, '')
  const random = Math.random().toString(36).slice(2, 7).toUpperCase()
  return `DH-${stamp}-${random}`
}

export async function submitApplication({ job, form, cvUpload, coverLetterUpload = null }) {
  const body = new FormData()
  body.append('job_id', job.id)
  for (const name of [
    'application_ref', 'first_name', 'last_name', 'email', 'phone', 'location', 'linkedin_url', 'portfolio_url',
    'cover_note', 'experience_summary', 'current_job_title', 'years_experience',
  ]) body.append(name, String(form[name] ?? '').trim())
  body.append('screening_answers', JSON.stringify(form.screening_answers || {}))
  body.append('commission_acknowledged', String(form.commission_acknowledged === true))
  body.append('privacy_acknowledged', String(form.privacy_acknowledged === true))
  if (cvUpload?.file) body.append('cv', cvUpload.file)
  if (coverLetterUpload?.file) body.append('cover_letter', coverLetterUpload.file)

  const response = await fetch('/api/careers-apply', { method: 'POST', body })
  const result = await response.json().catch(() => null)
  if (!response.ok || !result?.ok) throw new Error(result?.error || 'Could not submit application')
  return result.application
}
