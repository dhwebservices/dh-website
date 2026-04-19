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
        background: `
          radial-gradient(circle at top left, rgba(0,113,227,0.08), transparent 30%),
          radial-gradient(circle at bottom right, rgba(29,29,31,0.08), transparent 28%),
          linear-gradient(180deg, #f3f4f7 0%, #ffffff 56%, #f8f8fa 100%)
        `,
        color: 'var(--text)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px 56px',
      }}
    >
      <div
        style={{
          width: 'min(100%, 1120px)',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.25fr) minmax(320px, 390px)',
          gap: 22,
          alignItems: 'stretch',
        }}
      >
        <section
          style={{
            border: '1px solid rgba(255,255,255,0.4)',
            borderRadius: 32,
            background: 'linear-gradient(180deg, rgba(22,25,31,0.97) 0%, rgba(29,29,31,0.95) 100%)',
            boxShadow: '0 28px 70px rgba(29,29,31,0.18)',
            padding: 'clamp(28px, 4vw, 44px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 36,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `
                radial-gradient(circle at top right, rgba(0,113,227,0.22), transparent 28%),
                radial-gradient(circle at bottom left, rgba(255,255,255,0.06), transparent 30%)
              `,
              pointerEvents: 'none',
            }}
          />
          <div>
            <div
              style={{
                width: 68,
                height: 68,
                borderRadius: 22,
                background: '#fff',
                color: 'var(--dark)',
                boxShadow: '0 16px 42px rgba(0,0,0,0.14)',
                position: 'relative',
                zIndex: 1,
                marginBottom: 20,
                display: 'grid',
                placeItems: 'center',
                fontSize: 30,
                fontWeight: 700,
                letterSpacing: '-0.05em',
              }}
            >
              DH
            </div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 12px',
                borderRadius: 999,
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: 'rgba(255,255,255,0.92)',
                fontSize: 12,
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: 18,
                position: 'relative',
                zIndex: 1,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#ffb347',
                  boxShadow: '0 0 0 6px rgba(255,179,71,0.14)',
                }}
              />
              Scheduled maintenance
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(42px, 6.6vw, 82px)',
                lineHeight: 0.92,
                letterSpacing: '-0.06em',
                marginBottom: 18,
                maxWidth: 620,
                color: '#fff',
                position: 'relative',
                zIndex: 1,
              }}
            >
              {settings?.headline || 'We are updating the site right now.'}
            </h1>
            <p
              style={{
                fontSize: 'clamp(17px, 1.7vw, 20px)',
                lineHeight: 1.72,
                color: 'rgba(255,255,255,0.72)',
                maxWidth: 580,
                position: 'relative',
                zIndex: 1,
              }}
            >
              {settings?.message || 'We are carrying out a short maintenance window to improve the public website. Leave your name and number and our team will call you back directly.'}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
              gap: 14,
              position: 'relative',
              zIndex: 1,
            }}
          >
            {[
              ['Contact', 'mgmt@dhwebsiteservices.co.uk'],
              ['Response', 'Direct callback from our team'],
              ['Status', 'Public site temporarily unavailable'],
            ].map(([label, value]) => (
              <div
                key={label}
                style={{
                  padding: '18px 18px 20px',
                  borderRadius: 18,
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.46)',
                    marginBottom: 10,
                  }}
                >
                  {label}
                </div>
                <div style={{ fontSize: 15, lineHeight: 1.55, color: '#fff' }}>{value}</div>
              </div>
            ))}
          </div>
        </section>

        <aside
          style={{
            border: '1px solid var(--border-light)',
            borderRadius: 32,
            background: 'rgba(255,255,255,0.96)',
            boxShadow: '0 24px 60px rgba(29,29,31,0.08)',
            padding: 'clamp(24px, 3vw, 34px)',
            display: 'flex',
            flexDirection: 'column',
            gap: 22,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 12,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--faint)',
                marginBottom: 10,
              }}
            >
              Request a callback
            </div>
            <h2
              style={{
                fontSize: 34,
                lineHeight: 1,
                letterSpacing: '-0.04em',
                marginBottom: 12,
              }}
            >
              We can call you instead.
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--mid)' }}>
              Leave your details and we will email the management team immediately so you can still speak to someone while the site is offline.
            </p>
          </div>

          {settings?.form_enabled !== false ? (
            <form onSubmit={submitRequest} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                <span style={{ fontSize: 12, color: 'var(--faint)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Your name</span>
                <input
                  value={form.name}
                  onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                  placeholder="Full name"
                  style={{
                    height: 52,
                    borderRadius: 16,
                    border: '1px solid var(--border)',
                    padding: '0 16px',
                    fontSize: 15,
                    outline: 'none',
                    background: '#fff',
                  }}
                />
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                <span style={{ fontSize: 12, color: 'var(--faint)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Best phone number</span>
                <input
                  value={form.phone}
                  onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
                  placeholder="Number to call"
                  style={{
                    height: 52,
                    borderRadius: 16,
                    border: '1px solid var(--border)',
                    padding: '0 16px',
                    fontSize: 15,
                    outline: 'none',
                    background: '#fff',
                  }}
                />
              </label>

              {status.message ? (
                <div
                  style={{
                    borderRadius: 16,
                    padding: '13px 15px',
                    fontSize: 14,
                    lineHeight: 1.65,
                    border: `1px solid ${status.type === 'success' ? 'rgba(15,125,90,0.22)' : 'rgba(191,64,64,0.18)'}`,
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
                  height: 54,
                  borderRadius: 999,
                  border: 'none',
                  background: canSubmit ? 'var(--dark)' : 'rgba(29,29,31,0.18)',
                  color: '#fff',
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: canSubmit ? 'pointer' : 'not-allowed',
                  marginTop: 2,
                }}
              >
                {submitting ? 'Sending request…' : settings?.button_text || 'Request a callback'}
              </button>
            </form>
          ) : (
            <div style={{ borderRadius: 18, border: '1px solid var(--border-light)', padding: '16px 18px', fontSize: 14, color: 'var(--mid)', lineHeight: 1.7 }}>
              Callback requests are currently unavailable. Please email <strong>mgmt@dhwebsiteservices.co.uk</strong>.
            </div>
          )}

          <div
            style={{
              borderTop: '1px solid var(--border-light)',
              paddingTop: 18,
              display: 'grid',
              gap: 10,
            }}
          >
            <div style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--faint)' }}>
              What happens next
            </div>
            <div style={{ display: 'grid', gap: 9 }}>
              {[
                'You leave your contact details',
                'Our management team receives the request immediately',
                'We call you back once we are available',
              ].map((step, index) => (
                <div key={step} style={{ display: 'grid', gridTemplateColumns: '28px 1fr', gap: 10, alignItems: 'start' }}>
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      background: 'var(--cream)',
                      color: 'var(--dark)',
                      display: 'grid',
                      placeItems: 'center',
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  >
                    {index + 1}
                  </div>
                  <div style={{ fontSize: 14, color: 'var(--dark2)', lineHeight: 1.55 }}>{step}</div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}
