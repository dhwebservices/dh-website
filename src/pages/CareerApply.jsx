import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getCandidatePortalApplyUrl, getJobBySlug } from '../lib/careers'

export default function CareerApply() {
  const { slug } = useParams()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getJobBySlug(slug).then(setJob).finally(() => setLoading(false))
  }, [slug])

  useEffect(() => {
    if (!job?.slug) return
    const timeout = window.setTimeout(() => {
      window.location.assign(getCandidatePortalApplyUrl(job.slug))
    }, 250)
    return () => window.clearTimeout(timeout)
  }, [job?.slug])

  if (loading) return <main style={{ paddingTop: 'var(--nav-h)' }}><section className="section"><div className="container"><div>Loading application...</div></div></section></main>
  if (!job) return <main style={{ paddingTop: 'var(--nav-h)' }}><section className="section"><div className="container"><h1 className="headline-md">Role not found</h1></div></section></main>

  return (
    <main style={{ paddingTop: 'var(--nav-h)' }}>
      <section className="section">
        <div className="container career-apply-layout">
          <div>
            <p className="eyebrow" style={{ marginBottom: 16 }}>Apply now</p>
            <h1 className="headline-lg" style={{ marginBottom: 18 }}>Apply for {job.title}</h1>
            <p className="body-md" style={{ maxWidth: 620 }}>You are being transferred to the DH Careers candidate portal so you can sign in, manage your profile, and complete this application properly.</p>
          </div>
          <div className="glass-card career-apply-card" style={{ padding: 'clamp(24px,4vw,36px)' }}>
            <div style={{ display:'grid', gap:16 }}>
              <div style={{ fontSize:16, fontWeight:600 }}>Opening candidate portal</div>
              <div className="body-sm" style={{ fontSize:14, lineHeight:1.7 }}>
                Use the same email address you applied with before if you are an existing applicant. Your historic applications can then be linked into the portal.
              </div>
              <a href={getCandidatePortalApplyUrl(job.slug)} className="btn-primary" style={{ justifyContent:'center' }}>
                Continue to candidate portal
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
