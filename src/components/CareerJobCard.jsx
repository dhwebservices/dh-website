import { Link } from 'react-router-dom'

export default function CareerJobCard({ job }) {
  return (
    <article className="glass-card" style={{ padding: 24, display: 'grid', gap: 16 }}>
      <div className="career-job-head">
        <div>
          <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--dark)', marginBottom: 8 }}>{job.title}</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {[job.department || 'General', job.location_text || job.location_type, job.employment_type.replace(/_/g, ' ')].map((item) => (
              <span key={item} style={{ padding: '6px 10px', borderRadius: 999, border: '1px solid var(--border-light)', background: 'var(--white)', fontSize: 12.5, color: 'var(--mid)' }}>{item}</span>
            ))}
          </div>
        </div>
        {job.commission_only ? (
          <span style={{ padding: '7px 10px', borderRadius: 999, background: 'rgba(0,113,227,0.08)', color: 'var(--accent)', fontSize: 12.5, fontWeight: 600 }}>Commission only</span>
        ) : null}
      </div>
      <div className="body-sm" style={{ fontSize: 14, lineHeight: 1.7 }}>{job.summary || 'Open role at DH Website Services.'}</div>
      {job.hiring_manager_name || job.hiring_manager_email ? (
        <div style={{ fontSize: 12.5, color: 'var(--mid)' }}>
          Hiring manager: {job.hiring_manager_name || 'DH Website Services HR'}{job.hiring_manager_email ? ` · ${job.hiring_manager_email}` : ''}
        </div>
      ) : null}
      <div className="career-job-actions">
        <Link to={`/careers/${job.slug}`} className="btn-secondary">View role</Link>
        <Link to={`/careers/${job.slug}/apply`} className="btn-primary">Apply now</Link>
      </div>
    </article>
  )
}
