import { useEffect, useMemo, useState } from 'react'
import CareerJobCard from '../components/CareerJobCard'
import { useReveal } from '../hooks/useReveal'
import { getPublishedJobs } from '../lib/careers'

export default function Careers() {
  useReveal()
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    getPublishedJobs().then(setJobs).finally(() => setLoading(false))
  }, [])

  const departments = useMemo(() => ['all', ...new Set(jobs.map((job) => job.department).filter(Boolean))], [jobs])
  const filteredJobs = useMemo(() => jobs.filter((job) => filter === 'all' ? true : job.department === filter), [jobs, filter])

  return (
    <main style={{ paddingTop:'var(--nav-h)' }}>
      <section className="section">
        <div className="container">
          <div className="careers-hero-grid">
            <div>
              <div className="reveal">
                <p className="eyebrow" style={{ marginBottom:16 }}>Careers</p>
                <h1 style={{ fontFamily:'var(--font-sans)', fontSize:'clamp(36px,5vw,60px)', fontWeight:600, letterSpacing:'-0.03em', lineHeight:1.0, marginBottom:24 }}>
                  Join the team<br />building with us.
                </h1>
                <p className="body-lg" style={{ marginBottom:40 }}>Explore live roles at DH Website Services and apply through our secure candidate portal, where you can manage your profile, applications, and interview updates in one place.</p>
              </div>
              <div className="reveal" style={{ display:'flex', flexDirection:'column', gap:0, border:'1px solid var(--border-light)', borderRadius:16, overflow:'hidden', marginBottom:24 }}>
                {[
                  ['Live vacancies', 'Every role shown here is managed from our internal recruiting workspace.'],
                  ['Fast review', 'Applicants move through a structured pipeline with direct status updates.'],
                  ['Built for clarity', 'Role detail, application steps, and expectations are visible before you apply.'],
                  ['Human process', 'We keep the process practical and avoid long, unclear hiring loops.'],
                ].map(([t, d], i, arr) => (
                  <div key={t} style={{ padding:'18px 20px', borderBottom:i<arr.length-1?'1px solid var(--border-light)':'none' }}>
                    <div style={{ fontSize:14, fontWeight:600, marginBottom:4, letterSpacing:'-0.01em' }}>{t}</div>
                    <div className="body-sm" style={{ fontSize:13 }}>{d}</div>
                  </div>
                ))}
              </div>
              <div className="reveal" style={{ padding:'18px 20px', background:'var(--cream)', borderRadius:12, border:'1px solid var(--border-light)' }}>
                <p style={{ fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--light)', marginBottom:12 }}>Application essentials</p>
                {['Upload your CV', 'Add relevant experience', 'Complete role-specific questions', 'Confirm commission-only terms where required', 'Receive confirmation by email'].map(r => (
                  <div key={r} style={{ display:'flex', gap:8, marginBottom:8, fontSize:14, color:'var(--dark2)', alignItems:'baseline' }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink:0, marginTop:2 }}><path d="M1.5 6.5L4 9L10.5 2.5" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    {r}
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal">
              <div style={{ display:'grid', gap:16 }}>
                <div className="career-jobs-head">
                  <h2 style={{ fontSize:20, fontWeight:600, letterSpacing:'-0.02em' }}>Open positions</h2>
                  <div className="career-filter-row">
                    {departments.map((department) => (
                      <button
                        key={department}
                        onClick={() => setFilter(department)}
                        style={{
                          padding:'9px 14px',
                          borderRadius:999,
                          border:'1px solid var(--border-light)',
                          background: filter === department ? 'var(--accent)' : 'var(--white)',
                          color: filter === department ? '#fff' : 'var(--dark2)',
                          fontSize:13,
                        }}
                      >
                        {department === 'all' ? 'All departments' : department}
                      </button>
                    ))}
                  </div>
                </div>
                {loading ? <div className="glass-card" style={{ padding: 26 }}>Loading careers...</div> : null}
                {!loading && filteredJobs.length === 0 ? (
                  <div className="glass-card" style={{ padding: 26 }}>
                    <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>No live roles right now</div>
                    <div className="body-sm">We do not have an open vacancy in this filter at the moment. Please check back soon.</div>
                  </div>
                ) : null}
                {filteredJobs.map((job) => <CareerJobCard key={job.id} job={job} />)}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
