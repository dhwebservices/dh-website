import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  addMinutes,
  cancelAppointment,
  fetchAvailability,
  getAppointment,
  getGoogleCalendarUrl,
  getOutlookCalendarUrl,
  getAvailableSlots,
  hasAvailabilityForDate,
  isoLocalDate,
  rescheduleAppointment,
} from '../lib/booking'
import { trackEvent } from '../lib/analytics'

function fmt(date) {
  if (!date) return ''
  return new Date(date + 'T12:00:00').toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function Appointment() {
  const { token } = useParams()
  const [appt, setAppt] = useState(null)
  const [loading, setLoading] = useState(true)
  const [mode, setMode] = useState('view')
  const [working, setWorking] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    getAppointment(token)
      .then((data) => {
        setAppt(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [token])

  const cancel = async () => {
    if (!confirm('Are you sure you want to cancel this appointment?')) return

    setWorking(true)
    try {
      const result = await cancelAppointment(token)
      if (result.success) {
        setMode('cancelled')
        setAppt(result.appointment)
        trackEvent('booking_cancelled', { source: 'appointment_page' })
      } else {
        setError(result.error || 'Failed to cancel')
      }
    } catch (err) {
      setError(err.message || 'Failed to cancel')
    }
    setWorking(false)
  }

  if (loading) {
    return (
      <main style={{ paddingTop: '52px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 32, height: 32, border: '2px solid var(--border)', borderTopColor: 'var(--accent)', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
      </main>
    )
  }

  if (!appt) {
    return (
      <main style={{ paddingTop: '52px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div>
          <div style={{ fontSize: 40, marginBottom: 16 }}>?</div>
          <h2 style={{ fontFamily: 'SF Pro Display, -apple-system, sans-serif', fontSize: 22, fontWeight: 600, marginBottom: 8 }}>Appointment not found</h2>
          <p style={{ color: 'var(--mid)' }}>This link may have expired or already been used.</p>
          <a href="/contact" style={{ display: 'inline-block', marginTop: 20, color: 'var(--accent)', textDecoration: 'underline', fontSize: 14 }}>Book a new call</a>
        </div>
      </main>
    )
  }

  return (
    <main style={{ paddingTop: '52px', minHeight: '100vh', background: '#ffffff' }}>
      <section style={{ maxWidth: 560, margin: '0 auto', padding: 'clamp(40px,6vw,80px) 24px' }}>
        {mode === 'cancelled' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>Cancelled</div>
            <h2 style={{ fontFamily: 'SF Pro Display, -apple-system, sans-serif', fontSize: 24, fontWeight: 600, marginBottom: 8 }}>Appointment Cancelled</h2>
            <p style={{ color: 'var(--mid)', marginBottom: 24 }}>Your appointment has been cancelled. A confirmation has been sent to your email.</p>
            <a href="/contact" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-flex' }}>Book a new call</a>
          </div>
        )}

        {mode === 'rescheduled' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>Updated</div>
            <h2 style={{ fontFamily: 'SF Pro Display, -apple-system, sans-serif', fontSize: 24, fontWeight: 600, marginBottom: 8 }}>Appointment Rescheduled</h2>
            <p style={{ color: 'var(--mid)' }}>Your appointment has been updated. Check your email for the new confirmation.</p>
          </div>
        )}

        {mode === 'view' && appt.status === 'cancelled' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>Cancelled</div>
            <h2 style={{ fontFamily: 'SF Pro Display, -apple-system, sans-serif', fontSize: 24, fontWeight: 600, marginBottom: 8 }}>This appointment was cancelled</h2>
            <a href="/contact" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-flex', marginTop: 16 }}>Book a new call</a>
          </div>
        )}

        {mode === 'view' && appt.status !== 'cancelled' && (
          <>
            <div style={{ marginBottom: 32 }}>
              <p className="eyebrow" style={{ marginBottom: 8 }}>Your appointment</p>
              <h1 style={{ fontFamily: 'SF Pro Display, -apple-system, sans-serif', fontSize: 'clamp(28px,4vw,40px)', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 8 }}>
                {fmt(appt.date)}
              </h1>
              <div style={{ fontSize: 18, color: 'var(--mid)' }}>{appt.start_time} - {appt.end_time} · {appt.duration} min</div>
            </div>

            <div style={{ border: '1px solid var(--border-light)', borderRadius: 16, overflow: 'hidden', marginBottom: 28 }}>
              {[['With', appt.staff_name?.split('(')[0].trim()], ['Name', appt.client_name], ['Business', appt.client_business || '-'], ['Email', appt.client_email], ['Call from', '029 2002 4218'], ['Notes', appt.notes || '-'], ['Status', appt.status]].map(([label, value], index, list) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px', borderBottom: index < list.length - 1 ? '1px solid var(--border-light)' : 'none' }}>
                  <span style={{ fontFamily: 'SF Mono, Monaco, monospace', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--light)' }}>{label}</span>
                  <span style={{ fontSize: 14, color: 'var(--dark)', fontWeight: label === 'Call from' ? 500 : 400 }}>{value}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
              <a href={getGoogleCalendarUrl(appt)} target="_blank" rel="noreferrer" className="btn-secondary" style={{ textDecoration: 'none' }}>Add to Google</a>
              <a href={getOutlookCalendarUrl(appt)} target="_blank" rel="noreferrer" className="btn-secondary" style={{ textDecoration: 'none' }}>Add to Outlook</a>
            </div>

            {error && <p style={{ color: '#ef4444', fontSize: 13, marginBottom: 16 }}>{error}</p>}

            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => setMode('reschedule')} className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                Reschedule
              </button>
              <button onClick={cancel} disabled={working} style={{ flex: 1, padding: '12px', borderRadius: 100, border: '1px solid var(--border)', background: 'transparent', color: 'var(--dark2)', cursor: 'pointer', fontSize: 14, fontWeight: 500 }}>
                {working ? 'Cancelling...' : 'Cancel appointment'}
              </button>
            </div>
          </>
        )}

        {mode === 'reschedule' && (
          <>
            <div style={{ marginBottom: 24 }}>
              <button onClick={() => setMode('view')} style={{ background: 'none', border: 'none', color: 'var(--mid)', cursor: 'pointer', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16 }}>← Back</button>
              <h2 style={{ fontFamily: 'SF Pro Display, -apple-system, sans-serif', fontSize: 24, fontWeight: 600 }}>Reschedule</h2>
              <p style={{ color: 'var(--mid)', fontSize: 14 }}>Pick a new date and time for your call.</p>
            </div>
            <RescheduleFlow token={token} appt={appt} onDone={(updated) => { setAppt(updated); setMode('rescheduled') }} />
          </>
        )}
      </section>
    </main>
  )
}

function RescheduleFlow({ token, appt, onDone }) {
  const [avail, setAvail] = useState({ staff: [], availability: [], appointments: [] })
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [calMonth, setCalMonth] = useState(new Date())

  useEffect(() => {
    fetchAvailability()
      .then((data) => {
        setAvail(data)
        setLoading(false)
      })
      .catch(() => {
        setError('We could not load availability just now.')
        setLoading(false)
      })
  }, [])

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const maxDate = new Date(today)
  maxDate.setDate(maxDate.getDate() + 30)
  const firstDay = new Date(calMonth.getFullYear(), calMonth.getMonth(), 1)
  const startOffset = (firstDay.getDay() + 6) % 7
  const daysInMonth = new Date(calMonth.getFullYear(), calMonth.getMonth() + 1, 0).getDate()
  const calDays = Array.from({ length: startOffset + daysInMonth }, (_, index) => (
    index < startOffset ? null : new Date(calMonth.getFullYear(), calMonth.getMonth(), index - startOffset + 1)
  ))

  const confirm = async () => {
    setSubmitting(true)
    try {
      const result = await rescheduleAppointment(token, {
        new_date: selectedDate,
        new_start: selectedSlot.time,
        new_end: addMinutes(selectedSlot.time, appt.duration),
        new_duration: appt.duration,
        new_staff_email: selectedSlot.staffEmail,
        new_staff_name: selectedSlot.staffName,
        notes: appt.notes,
      })

      if (result.success) {
        trackEvent('booking_rescheduled', { source: 'appointment_page' })
        onDone(result.appointment)
      }
      else setError(result.error || 'Failed to reschedule')
    } catch (err) {
      setError(err.message || 'Failed to reschedule')
    }
    setSubmitting(false)
  }

  if (loading) return <div style={{ textAlign: 'center', padding: 32, color: 'var(--mid)' }}>Loading availability...</div>

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <button onClick={() => { const month = new Date(calMonth); month.setMonth(month.getMonth() - 1); setCalMonth(month) }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--mid)', fontSize: 18 }}>←</button>
          <span style={{ fontSize: 14, fontWeight: 500 }}>{calMonth.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</span>
          <button onClick={() => { const month = new Date(calMonth); month.setMonth(month.getMonth() + 1); setCalMonth(month) }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--mid)', fontSize: 18 }}>→</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 4 }}>
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => <div key={index} style={{ textAlign: 'center', fontSize: 11, color: 'var(--light)', paddingBottom: 4 }}>{day}</div>)}
          {calDays.map((date, index) => {
            if (!date) return <div key={index} />
            const dateStr = isoLocalDate(date)
            const isPast = date < today
            const isFuture = date > maxDate
            const isAvail = !isPast && !isFuture && hasAvailabilityForDate(avail, dateStr, appt.duration)
            const isSelected = dateStr === selectedDate
            return (
              <button key={dateStr} disabled={!isAvail} onClick={() => { setSelectedDate(dateStr); setSelectedSlot(null) }}
                style={{ padding: '6px 4px', borderRadius: 7, border: '1px solid ' + (isSelected ? 'var(--dark)' : isAvail ? '#bbf7d0' : 'var(--border)'), background: isSelected ? 'var(--dark)' : isAvail ? '#f0fdf4' : 'transparent', color: isSelected ? '#fff' : isPast || isFuture ? 'var(--border)' : isAvail ? '#166534' : 'var(--light)', cursor: isAvail ? 'pointer' : 'default', fontSize: 12 }}>
                {date.getDate()}
              </button>
            )
          })}
        </div>
      </div>

      {selectedDate && (
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>{fmt(selectedDate)}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {getAvailableSlots(avail, selectedDate, appt.duration).sort((a, b) => a.time.localeCompare(b.time)).map((slot) => {
              const isSelected = selectedSlot?.staffEmail === slot.staffEmail && selectedSlot?.time === slot.time
              return (
                <button key={slot.staffEmail + slot.time} onClick={() => setSelectedSlot(slot)}
                  style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid ' + (isSelected ? 'var(--dark)' : 'var(--border)'), background: isSelected ? 'var(--dark)' : 'transparent', color: isSelected ? '#fff' : 'var(--dark2)', cursor: 'pointer', fontSize: 12, fontWeight: isSelected ? 600 : 400 }}>
                  {slot.time} <span style={{ fontSize: 10, opacity: 0.7 }}>({slot.staffName?.split(' ')[0]})</span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {error && <p style={{ color: '#ef4444', fontSize: 13 }}>{error}</p>}
      {selectedSlot && (
        <button onClick={confirm} disabled={submitting} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
          {submitting ? 'Rescheduling...' : 'Confirm new time'}
        </button>
      )}
    </div>
  )
}
