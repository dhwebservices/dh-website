import { SUPABASE_ANON_KEY, SUPABASE_URL } from './siteConfig'

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
  }
}

export async function getPublishedJobs() {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/job_posts?status=eq.published&select=*&order=published_at.desc.nullslast`, {
    headers: restHeaders(),
  })
  const payload = await response.json()
  if (!response.ok) throw new Error(payload?.message || 'Could not load jobs')
  return (payload || []).map(normalizeJob)
}

export async function getJobBySlug(slug) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/job_posts?slug=eq.${encodeURIComponent(slug)}&status=eq.published&select=*`, {
    headers: restHeaders(),
  })
  const payload = await response.json()
  if (!response.ok) throw new Error(payload?.message || 'Could not load the role')
  return payload?.[0] ? normalizeJob(payload[0]) : null
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
  return result?.[0] || payload
}
