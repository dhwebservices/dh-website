import { useState, useEffect } from 'react'
import {
  addMinutes,
  bookAppointment,
  fetchAvailability,
  getGoogleCalendarUrl,
  getOutlookCalendarUrl,
  getAvailableSlots,
  hasAvailabilityForDate,
  isoLocalDate,
} from '../lib/booking'
import { trackEvent } from '../lib/analytics'

export function BookingWidget() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ name: '', business: '', email: '', phone: '', notes: '', website: '' })
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedDuration, setSelectedDuration] = useState(30)
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [availability, setAvailability] = useState({ staff: [], availability: [], appointments: [] })
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(null)
  const [error, setError] = useState('')
  const [calMonth, setCalMonth] = useState(new Date())

  useEffect(() => {
    setLoading(true)
    trackEvent('booking_started', { source: 'website_booking_widget' })
    fetchAvailability()
      .then((data) => {
        setAvailability(data)
        setLoading(false)
      })
      .catch(() => {
        setError('We could not load availability just now. Please try again.')
        trackEvent('booking_availability_failed', { source: 'website_booking_widget' })
        setLoading(false)
      })
  }, [])

  const submit = async () => {
    if (!selectedSlot) return
    setSubmitting(true)
    setError('')

    try {
      const end = addMinutes(selectedSlot.time, selectedDuration)
      const result = await bookAppointment({
        client_name: form.name,
        client_business: form.business,
        client_email: form.email,
        client_phone: form.phone,
        notes: form.notes,
        website: form.website,
        staff_email: selectedSlot.staffEmail,
        staff_name: selectedSlot.staffName,
        date: selectedDate,
        start_time: selectedSlot.time,
        end_time: end,
        duration: selectedDuration,
      })

      if (!result?.success) {
        setError(result?.error || 'Something went wrong. Please try again.')
      } else {
        trackEvent('booking_confirmed', {
          duration: selectedDuration,
          source: 'website_booking_widget',
        })
        setDone({
          date: selectedDate,
          time: selectedSlot.time,
          staffName: selectedSlot.staffName,
          cancelToken: result.cancel_token,
          notes: form.notes,
        })
      }
    } catch {
      setError('Network error. Please try again.')
      trackEvent('booking_submit_failed', { source: 'website_booking_widget' })
    }

    setSubmitting(false)
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const maxDate = new Date(today)
  maxDate.setDate(maxDate.getDate() + 30)

  const firstDay = new Date(calMonth.getFullYear(), calMonth.getMonth(), 1)
  const startOffset = (firstDay.getDay() + 6) % 7
  const daysInMonth = new Date(calMonth.getFullYear(), calMonth.getMonth() + 1, 0).getDate()
  const calDays = Array.from({ length: startOffset + daysInMonth }, (_, index) => {
    if (index < startOffset) return null
    return new Date(calMonth.getFullYear(), calMonth.getMonth(), index - startOffset + 1)
  })

  if (done) {
    return (
      <div style={{ padding: '32px 24px', textAlign: 'center', maxWidth: 420 }}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 24 }}>✓</div>
        <h3 style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif', fontSize: 22, fontWeight: 600, marginBottom: 8 }}>Call Confirmed</h3>
        <p style={{ color: '#6E6E73', fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
          Your call with <strong>{done.staffName?.split(' ')[0]}</strong> is booked for{' '}
          <strong>{new Date(done.date + 'T12:00').toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })} at {done.time}</strong>.
          A confirmation has been sent to <strong>{form.email}</strong>.
        </p>
        <div style={{ background: '#F5F5F7', borderRadius: 12, padding: '14px 18px', marginBottom: 20, border: '1px solid #E8E8ED', fontSize: 14 }}>
          We will call you from <strong>029 2002 4218</strong>
        </div>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 18 }}>
          <a href={getGoogleCalendarUrl({ date: done.date, start_time: done.time, end_time: addMinutes(done.time, selectedDuration), staff_name: done.staffName, cancel_token: done.cancelToken, notes: done.notes })} target="_blank" rel="noreferrer" className="btn-secondary" style={{ textDecoration: 'none' }}>
            Add to Google
          </a>
          <a href={getOutlookCalendarUrl({ date: done.date, start_time: done.time, end_time: addMinutes(done.time, selectedDuration), staff_name: done.staffName, cancel_token: done.cancelToken, notes: done.notes })} target="_blank" rel="noreferrer" className="btn-secondary" style={{ textDecoration: 'none' }}>
            Add to Outlook
          </a>
        </div>
        <a href={'/appointment/' + done.cancelToken} style={{ fontSize: 13, color: '#0071E3', textDecoration: 'underline' }}>
          Reschedule or cancel
        </a>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 480, width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 28 }}>
        {[1, 2, 3].map((n, index) => (
          <div key={n} style={{ display: 'flex', alignItems: 'center', flex: index < 2 ? 1 : 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: step > n ? '#166534' : step === n ? '#1D1D1F' : '#E8E8ED', border: '2px solid ' + (step > n ? '#166534' : step === n ? '#1D1D1F' : '#D2D2D7'), color: step >= n ? '#fff' : '#A1A1A6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, transition: 'all 0.25s', flexShrink: 0 }}>
                {step > n ? '✓' : n}
              </div>
              <span style={{ fontSize: 12, color: step === n ? '#1D1D1F' : '#A1A1A6', fontWeight: step === n ? 600 : 400, whiteSpace: 'nowrap' }}>{['Your details', 'Pick a date', 'Choose a slot'][n - 1]}</span>
            </div>
            {index < 2 && <div style={{ flex: 1, height: 1.5, background: step > n ? '#166534' : '#D2D2D7', margin: '0 10px', transition: 'background 0.25s' }} />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <h3 style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif', fontSize: 18, fontWeight: 600, marginBottom: 4 }}>Tell us about yourself</h3>
          {[['name', 'Your name *', 'text'], ['business', 'Business name', 'text'], ['email', 'Email address *', 'email'], ['phone', 'Phone number *', 'tel']].map(([key, placeholder, type]) => (
            <div key={key}>
              <label className="field-label">{placeholder}</label>
              <input className="field-inp" type={type} value={form[key]} onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))} placeholder={placeholder.replace(' *', '')} />
            </div>
          ))}
          <div>
            <label className="field-label">What should we prepare for?</label>
            <textarea className="field-inp" rows={4} value={form.notes} onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))} placeholder="Optional notes about your project or what you want to cover on the call." style={{ resize: 'vertical', lineHeight: 1.6 }} />
          </div>
          <input type="text" value={form.website} onChange={(event) => setForm((current) => ({ ...current, website: event.target.value }))} tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }} />
          <div>
            <label className="field-label">Call duration</label>
            <div style={{ display: 'flex', gap: 8 }}>
              {[15, 30].map((duration) => (
                <button key={duration} onClick={() => setSelectedDuration(duration)} style={{ flex: 1, padding: '10px', borderRadius: 8, border: '2px solid ' + (selectedDuration === duration ? '#1D1D1F' : '#D2D2D7'), background: selectedDuration === duration ? '#1D1D1F' : '#F5F5F7', color: selectedDuration === duration ? '#fff' : '#3D3D3F', cursor: 'pointer', fontSize: 13, fontWeight: 600, transition: 'all 0.15s' }}>
                  {duration} min
                </button>
              ))}
            </div>
          </div>
          <button className="btn-primary" disabled={!form.name || !form.email || !form.phone} onClick={() => setStep(2)} style={{ justifyContent: 'center', marginTop: 8, opacity: (!form.name || !form.email || !form.phone) ? 0.5 : 1 }}>
            Choose a date
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h3 style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif', fontSize: 18, fontWeight: 600, marginBottom: 4 }}>Pick a date</h3>
          <p style={{ color: '#6E6E73', fontSize: 13, marginBottom: 16 }}>Available dates shown in green. Up to 30 days ahead.</p>
          {loading ? (
            <div style={{ textAlign: 'center', padding: 32, color: '#6E6E73', fontSize: 13 }}>Loading availability...</div>
          ) : (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <button onClick={() => { const month = new Date(calMonth); month.setMonth(month.getMonth() - 1); setCalMonth(month) }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6E6E73', fontSize: 18 }}>←</button>
                <span style={{ fontSize: 14, fontWeight: 500, color: '#1D1D1F' }}>{calMonth.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</span>
                <button onClick={() => { const month = new Date(calMonth); month.setMonth(month.getMonth() + 1); setCalMonth(month) }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6E6E73', fontSize: 18 }}>→</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 4, marginBottom: 16 }}>
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => <div key={index} style={{ textAlign: 'center', fontSize: 11, color: '#A1A1A6', fontWeight: 500, paddingBottom: 4 }}>{day}</div>)}
                {calDays.map((date, index) => {
                  if (!date) return <div key={index} />
                  const dateStr = isoLocalDate(date)
                  const isPast = date < today
                  const isFuture = date > maxDate
                  const isAvail = !isPast && !isFuture && hasAvailabilityForDate(availability, dateStr, selectedDuration)
                  const isSelected = dateStr === selectedDate
                  return (
                    <button key={dateStr} disabled={!isAvail} onClick={() => { setSelectedDate(dateStr); setSelectedSlot(null); setStep(3) }}
                      style={{ padding: '6px 4px', borderRadius: 7, border: '1px solid ' + (isSelected ? '#1D1D1F' : isAvail ? '#bbf7d0' : '#D2D2D7'), background: isSelected ? '#1D1D1F' : isAvail ? '#f0fdf4' : 'transparent', color: isSelected ? '#fff' : isPast || isFuture ? '#D2D2D7' : isAvail ? '#166534' : '#A1A1A6', cursor: isAvail ? 'pointer' : 'default', fontSize: 12, fontWeight: isAvail ? 500 : 400, transition: 'all 0.15s' }}>
                      {date.getDate()}
                    </button>
                  )
                })}
              </div>
            </>
          )}
          {!loading && error && <p style={{ color: '#ef4444', fontSize: 13, marginBottom: 12 }}>{error}</p>}
          <button className="btn-secondary" onClick={() => setStep(1)} style={{ fontSize: 13 }}>← Back</button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h3 style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif', fontSize: 18, fontWeight: 600, marginBottom: 4 }}>Choose a time</h3>
          <p style={{ color: '#6E6E73', fontSize: 13, marginBottom: 16 }}>{new Date(selectedDate + 'T12:00').toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
          {(() => {
            const slots = getAvailableSlots(availability, selectedDate, selectedDuration)
            const byStaff = {}

            slots.forEach((slot) => {
              if (!byStaff[slot.staffEmail]) byStaff[slot.staffEmail] = { name: slot.staffName, role: slot.role, times: [] }
              byStaff[slot.staffEmail].times.push(slot.time)
            })

            if (!Object.keys(byStaff).length) {
              return <p style={{ color: '#6E6E73', fontSize: 13, padding: '16px 0' }}>No slots available on this date. Please pick another day.</p>
            }

            return Object.entries(byStaff).map(([email, { name, role, times }]) => (
              <div key={email} style={{ marginBottom: 20, padding: '16px', borderRadius: 12, border: '1px solid #E8E8ED', background: '#F5F5F7' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#1D1D1F', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600, flexShrink: 0 }}>
                    {name?.split(' ').map((word) => word[0]).join('').slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, color: '#1D1D1F' }}>{name?.split('(')[0].trim()}</div>
                    <div style={{ fontSize: 11, color: '#6E6E73' }}>{role}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {times.sort().map((time) => {
                    const isSelected = selectedSlot?.staffEmail === email && selectedSlot?.time === time
                    return (
                    <button key={time} onClick={() => { setSelectedSlot({ staffEmail: email, staffName: name, time }); trackEvent('booking_slot_selected', { duration: selectedDuration, staff: name, time }) }}
                        style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid ' + (isSelected ? '#1D1D1F' : '#D2D2D7'), background: isSelected ? '#1D1D1F' : '#fff', color: isSelected ? '#fff' : '#3D3D3F', cursor: 'pointer', fontSize: 12, fontWeight: isSelected ? 600 : 400, transition: 'all 0.15s' }}>
                        {time}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))
          })()}
          {error && <p style={{ color: '#ef4444', fontSize: 13, margin: '8px 0' }}>{error}</p>}
          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <button className="btn-secondary" onClick={() => setStep(2)} style={{ fontSize: 13 }}>← Back</button>
            {selectedSlot && (
              <button className="btn-primary" onClick={submit} disabled={submitting} style={{ flex: 1, justifyContent: 'center' }}>
                {submitting ? 'Booking...' : 'Confirm booking'}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
