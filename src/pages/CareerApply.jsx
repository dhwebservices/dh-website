import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CareerApplicationForm from '../components/CareerApplicationForm'
import { getJobBySlug } from '../lib/careers'

export default function CareerApply() {
  const navigate = useNavigate()
  const { slug } = useParams()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getJobBySlug(slug).then(setJob).finally(() => setLoading(false))
  }, [slug])

  if (loading) return <main style={{ paddingTop: 'var(--nav-h)' }}><section className="section"><div className="container"><div>Loading application...</div></div></section></main>
  if (!job) return <main style={{ paddingTop: 'var(--nav-h)' }}><section className="section"><div className="container"><h1 className="headline-md">Role not found</h1></div></section></main>

  return (
    <main style={{ paddingTop: 'var(--nav-h)' }}>
      <section className="section">
        <div className="container career-apply-layout">
          <div>
            <p className="eyebrow" style={{ marginBottom: 16 }}>Apply now</p>
            <h1 className="headline-lg" style={{ marginBottom: 18 }}>Apply for {job.title}</h1>
            <p className="body-md" style={{ maxWidth: 620 }}>{job.summary || 'Complete the application form below and upload your CV to apply.'}</p>
          </div>
          <div className="glass-card career-apply-card" style={{ padding: 'clamp(24px,4vw,36px)' }}>
            <CareerApplicationForm
              job={job}
              onSuccess={(application) => navigate('/careers/application-success', { state: { applicationRef: application.application_ref, roleTitle: job.title } })}
            />
          </div>
        </div>
      </section>
    </main>
  )
}
