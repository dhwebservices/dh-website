import { useMemo, useState } from 'react'
import CareerQuestionField from './CareerQuestionField'
import { buildApplicationRef, submitApplication, uploadCv } from '../lib/careers'
import { buildApplicationConfirmationEmail, buildInternalApplicationEmail } from '../lib/recruitingEmail'
import { sendCustomEmail } from '../lib/booking'

const EMPTY_FORM = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  location: '',
  linkedin_url: '',
  portfolio_url: '',
  current_job_title: '',
  years_experience: '',
  experience_summary: '',
  cover_note: '',
  screening_answers: {},
  commission_acknowledged: false,
  privacy_acknowledged: false,
}

export default function CareerApplicationForm({ job, onSuccess }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [cvFile, setCvFile] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const questions = useMemo(() => Array.isArray(job.screening_questions) ? job.screening_questions : [], [job.screening_questions])

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }))
  const updateAnswer = (key, value) => setForm((current) => ({ ...current, screening_answers: { ...current.screening_answers, [key]: value } }))

  const validate = () => {
    if (!form.first_name || !form.last_name || !form.email || !form.phone || !form.experience_summary) return 'Please complete all required applicant fields.'
    if (!cvFile) return 'Please upload your CV before submitting.'
    if (job.commission_only && !form.commission_acknowledged) return 'You must confirm that you understand this is a commission-only role with no basic salary.'
    if (!form.privacy_acknowledged) return 'Please confirm that you agree to the privacy acknowledgement.'
    for (const question of questions) {
      if (question.required && !String(form.screening_answers[question.id] || '').trim()) {
        return `Please complete the question: ${question.label}`
      }
    }
    return ''
  }

  const submit = async (event) => {
    event.preventDefault()
    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }

    setSubmitting(true)
    setError('')
    try {
      const application_ref = buildApplicationRef()
      const cvUpload = await uploadCv(cvFile, application_ref)
      const application = await submitApplication({
        job,
        form: {
          ...form,
          application_ref,
        },
        cvUpload,
      })

      await Promise.allSettled([
        sendCustomEmail({
          to: form.email,
          subject: `Application received — ${job.title}`,
          html: buildApplicationConfirmationEmail(application, job),
          from: 'DH Website Services HR <HR@dhwebsiteservices.co.uk>',
        }),
        sendCustomEmail({
          to: 'HR@dhwebsiteservices.co.uk',
          subject: `New application — ${job.title} — ${application.full_name}`,
          html: buildInternalApplicationEmail(application, job),
          from: 'DH Website Services HR <HR@dhwebsiteservices.co.uk>',
        }),
      ])

      onSuccess(application)
    } catch (submitError) {
      console.error(submitError)
      setError(submitError.message || 'Could not submit your application right now.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={submit} style={{ display: 'grid', gap: 14 }}>
      <div className="career-form-grid">
        <div><label className="field-label">First name *</label><input className="field-inp" value={form.first_name} onChange={(e) => update('first_name', e.target.value)} /></div>
        <div><label className="field-label">Last name *</label><input className="field-inp" value={form.last_name} onChange={(e) => update('last_name', e.target.value)} /></div>
        <div><label className="field-label">Email *</label><input className="field-inp" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} /></div>
        <div><label className="field-label">Phone *</label><input className="field-inp" value={form.phone} onChange={(e) => update('phone', e.target.value)} /></div>
        <div><label className="field-label">Location</label><input className="field-inp" value={form.location} onChange={(e) => update('location', e.target.value)} /></div>
        <div><label className="field-label">Current role</label><input className="field-inp" value={form.current_job_title} onChange={(e) => update('current_job_title', e.target.value)} /></div>
        <div><label className="field-label">LinkedIn</label><input className="field-inp" value={form.linkedin_url} onChange={(e) => update('linkedin_url', e.target.value)} /></div>
        <div><label className="field-label">Portfolio / Website</label><input className="field-inp" value={form.portfolio_url} onChange={(e) => update('portfolio_url', e.target.value)} /></div>
      </div>

      <div>
        <label className="field-label">Years of relevant experience</label>
        <input className="field-inp" value={form.years_experience} onChange={(e) => update('years_experience', e.target.value)} placeholder="e.g. 3 years" />
      </div>

      <div>
        <label className="field-label">Relevant experience *</label>
        <textarea className="field-inp" rows={5} value={form.experience_summary} onChange={(e) => update('experience_summary', e.target.value)} style={{ resize: 'vertical', lineHeight: 1.6 }} />
      </div>

      <div>
        <label className="field-label">Cover note</label>
        <textarea className="field-inp" rows={4} value={form.cover_note} onChange={(e) => update('cover_note', e.target.value)} style={{ resize: 'vertical', lineHeight: 1.6 }} />
      </div>

      {questions.length > 0 ? (
        <div style={{ display: 'grid', gap: 14, paddingTop: 6 }}>
          {questions.map((question) => (
            <CareerQuestionField key={question.id} question={question} value={form.screening_answers[question.id]} onChange={updateAnswer} />
          ))}
        </div>
      ) : null}

      <div>
        <label className="field-label">Upload CV *</label>
        <input className="field-inp" type="file" accept=".pdf,.doc,.docx" onChange={(e) => setCvFile(e.target.files?.[0] || null)} />
        <div style={{ fontSize: 12.5, color: 'var(--light)', marginTop: 6 }}>{cvFile ? `Selected: ${cvFile.name}` : 'Accepted formats: PDF, DOC, DOCX'}</div>
      </div>

      {job.commission_only ? (
        <label style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '14px 16px', border: '1px solid var(--border-light)', borderRadius: 14, background: 'var(--cream)' }}>
          <input type="checkbox" checked={form.commission_acknowledged} onChange={(e) => update('commission_acknowledged', e.target.checked)} style={{ marginTop: 3 }} />
          <span style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--dark2)' }}>I understand that this is a commission-only role with no basic salary.</span>
        </label>
      ) : null}

      <label style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '14px 16px', border: '1px solid var(--border-light)', borderRadius: 14, background: 'var(--off-white)' }}>
        <input type="checkbox" checked={form.privacy_acknowledged} onChange={(e) => update('privacy_acknowledged', e.target.checked)} style={{ marginTop: 3 }} />
        <span style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--dark2)' }}>I consent to DH Website Services storing and processing my application data for recruitment purposes.</span>
      </label>

      {error ? <div style={{ fontSize: 13.5, color: '#C23B22' }}>{error}</div> : null}

      <button type="submit" className="btn-primary career-submit-btn" disabled={submitting} style={{ justifyContent: 'center', opacity: submitting ? 0.7 : 1 }}>
        {submitting ? 'Submitting application...' : 'Submit application'}
      </button>
    </form>
  )
}
