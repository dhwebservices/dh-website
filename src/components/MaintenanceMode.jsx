import { useState } from 'react'

export default function MaintenanceMode({ settings }) {
  const [form, setForm] = useState({ name: '', phone: '' })
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState({ type: '', message: '' })

  const canSubmit = form.name.trim() && form.phone.trim() && !submitting

  async function submitRequest(event) {
    event.preventDefault()
    if (!canSubmit) return
    setSubmitting(true)
    setStatus({ type: '', message: '' })

    try {
      const response = await fetch('/api/maintenance-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
        }),
      })
      const payload = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(payload?.error || 'Request failed')
      setStatus({
        type: 'success',
        message: 'Thanks. We have your details and will call you back as soon as possible.',
      })
      setForm({ name: '', phone: '' })
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'Could not send your callback request.',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #f7f8fb 0%, #ffffff 100%)',
        color: 'var(--text)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
      }}
    >
      <div
        style={{
          width: 'min(100%, 960px)',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.1fr) minmax(320px, 420px)',
          gap: 28,
          alignItems: 'stretch',
        }}
      >
        <section
          style={{
            border: '1px solid var(--border-light)',
            borderRadius: 28,
            background: 'linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(245,245,247,0.95) 100%)',
            boxShadow: '0 20px 50px rgba(29,29,31,0.08)',
            padding: 'clamp(28px, 4vw, 46px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 28,
          }}
        >
          <div>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 18,
                background: 'var(--dark)',
                color: '#fff',
                display: 'grid',
                placeItems: 'center',
                fontSize: 28,
                fontWeight: 700,
                letterSpacing: '-0.05em',
                marginBottom: 22,
              }}
            >
              DH
            </div>
            <p className="eyebrow" style={{ marginBottom: 14 }}>
              Maintenance mode
            </p>
            <h1
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(38px, 6vw, 68px)',
                lineHeight: 0.98,
                letterSpacing: '-0.05em',
                marginBottom: 20,
                maxWidth: 560,
              }}
            >
              {settings?.headline || 'We are currently carrying out scheduled maintenance.'}
            </h1>
            <p
              style={{
                fontSize: 'clamp(16px, 1.6vw, 19px)',
                lineHeight: 1.75,
                color: 'var(--mid)',
                maxWidth: 620,
              }}
            >
              {settings?.message || 'Leave your name and phone number and a member of our team will call you back as soon as possible.'}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: 14,
            }}
          >
            {[
              ['Email', 'mgmt@dhwebsiteservices.co.uk'],
              ['Response', 'We call back manually'],
              ['Status', 'Public site temporarily unavailable'],
            ].map(([label, value]) => (
              <div
                key={label}
                style={{
                  padding: '16px 18px',
                  borderRadius: 16,
                  border: '1px solid var(--border-light)',
                  background: '#fff',
                }}
              >
                <div style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--faint)', marginBottom: 8 }}>
                  {label}
                </div>
                <div style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--dark2)' }}>{value}</div>
              </div>
            ))}
          </div>
        </section>

        <aside
          style={{
            border: '1px solid var(--border-light)',
            borderRadius: 28,
            background: '#fff',
            boxShadow: '0 20px 50px rgba(29,29,31,0.06)',
            padding: 'clamp(24px, 3vw, 34px)',
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
          }}
        >
          <div>
            <div style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--faint)', marginBottom: 10 }}>
              Callback request
            </div>
            <h2 style={{ fontSize: 28, lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: 10 }}>
              Leave your details
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--mid)' }}>
              We will email the management team immediately and call you back once the site is available again.
            </p>
          </div>

          {settings?.form_enabled !== false ? (
            <form onSubmit={submitRequest} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span style={{ fontSize: 12, color: 'var(--faint)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Name</span>
                <input
                  value={form.name}
                  onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                  placeholder="Your full name"
                  style={{
                    height: 48,
                    borderRadius: 14,
                    border: '1px solid var(--border)',
                    padding: '0 14px',
                    fontSize: 15,
                    outline: 'none',
                  }}
                />
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span style={{ fontSize: 12, color: 'var(--faint)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Phone number</span>
                <input
                  value={form.phone}
                  onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
                  placeholder="Best number to call"
                  style={{
                    height: 48,
                    borderRadius: 14,
                    border: '1px solid var(--border)',
                    padding: '0 14px',
                    fontSize: 15,
                    outline: 'none',
                  }}
                />
              </label>

              {status.message ? (
                <div
                  style={{
                    borderRadius: 14,
                    padding: '12px 14px',
                    fontSize: 14,
                    lineHeight: 1.6,
                    border: `1px solid ${status.type === 'success' ? 'rgba(15,125,90,0.25)' : 'rgba(191,64,64,0.2)'}`,
                    background: status.type === 'success' ? 'rgba(15,125,90,0.08)' : 'rgba(191,64,64,0.08)',
                    color: status.type === 'success' ? '#0f7d5a' : '#b04f4f',
                  }}
                >
                  {status.message}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={!canSubmit}
                style={{
                  height: 50,
                  borderRadius: 999,
                  border: 'none',
                  background: canSubmit ? 'var(--dark)' : 'rgba(29,29,31,0.2)',
                  color: '#fff',
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: canSubmit ? 'pointer' : 'not-allowed',
                }}
              >
                {submitting ? 'Sending…' : settings?.button_text || 'Request a callback'}
              </button>
            </form>
          ) : (
            <div style={{ borderRadius: 16, border: '1px solid var(--border-light)', padding: '14px 16px', fontSize: 14, color: 'var(--mid)', lineHeight: 1.6 }}>
              Callback requests are currently unavailable. Please email <strong>mgmt@dhwebsiteservices.co.uk</strong>.
            </div>
          )}
        </aside>
      </div>
    </main>
  )
}
