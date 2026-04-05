import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getJobBySlug } from '../lib/careers'

function BulletSection({ title, content }) {
  if (!content) return null
  return (
    <section className="glass-card" style={{ padding: 28 }}>
      <h2 className="headline-md" style={{ fontSize: 28, marginBottom: 14 }}>{title}</h2>
      <div className="body-md" style={{ whiteSpace: 'pre-wrap', fontSize: 15, lineHeight: 1.8 }}>{content}</div>
    </section>
  )
}

export default function CareerRole() {
  const { slug } = useParams()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getJobBySlug(slug).then(setJob).finally(() => setLoading(false))
  }, [slug])

  if (loading) return <main style={{ paddingTop: 'var(--nav-h)' }}><section className="section"><div className="container"><div>Loading role...</div></div></section></main>
  if (!job) return <main style={{ paddingTop: 'var(--nav-h)' }}><section className="section"><div className="container"><h1 className="headline-md">Role not found</h1></div></section></main>

  return (
    <main style={{ paddingTop: 'var(--nav-h)' }}>
      <section className="section">
        <div className="container" style={{ display: 'grid', gap: 24 }}>
          <div className="career-role-layout">
            <div>
              <p className="eyebrow" style={{ marginBottom: 16 }}>Open role</p>
              <h1 className="headline-lg" style={{ marginBottom: 18 }}>{job.title}</h1>
              <p className="body-lg" style={{ maxWidth: 720 }}>{job.summary || job.description || 'Join DH Website Services in a live role now open for applications.'}</p>
            </div>
            <aside className="glass-card career-meta-card" style={{ padding: 26, display: 'grid', gap: 14 }}>
              {[['Department', job.department || 'General'], ['Location', job.location_text || job.location_type], ['Employment', job.employment_type.replace(/_/g, ' ')], ['Package', job.salary_text || (job.commission_only ? 'Commission only' : 'Discussed at interview')], ['Hiring manager', job.hiring_manager_name || 'DH Website Services HR'], ['Manager email', job.hiring_manager_email || 'HR@dhwebsiteservices.co.uk']].map(([label, value]) => (
                <div key={label}>
                  <div style={{ fontSize: 12, color: 'var(--light)', marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: 14.5, color: 'var(--dark2)' }}>{value}</div>
                </div>
              ))}
              {job.commission_only ? (
                <div style={{ padding: '14px 16px', borderRadius: 14, background: 'rgba(0,113,227,0.08)', color: 'var(--accent)', fontSize: 13.5, lineHeight: 1.6 }}>
                  This role is commission only with no basic salary. The application form requires confirmation that you understand this before submission.
                </div>
              ) : null}
              <Link to={`/careers/${job.slug}/apply`} className="btn-primary career-role-cta" style={{ justifyContent: 'center', marginTop: 4 }}>Apply for this role</Link>
            </aside>
          </div>

          <BulletSection title="About the role" content={job.description} />
          <BulletSection title="Responsibilities" content={job.responsibilities} />
          <BulletSection title="Requirements" content={job.requirements} />
          <BulletSection title="What you get" content={job.benefits} />
        </div>
      </section>
    </main>
  )
}
