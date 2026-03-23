// BookingWidget.jsx - shared component used on Contact page and in modal
import { useState, useEffect } from 'react'

const WORKER = 'https://dh-email-worker.aged-silence-66a7.workers.dev'
const SLOTS_15 = ['09:00','09:15','09:30','09:45','10:00','10:15','10:30','10:45','11:00','11:15','11:30','11:45','12:00','12:15','12:30','12:45','13:00','13:15','13:30','13:45','14:00','14:15','14:30','14:45','15:00','15:15','15:30','15:45','16:00','16:15','16:30','16:45']
const SLOTS_30 = ['09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30']

function addMins(t, m) {
  const [h,min] = t.split(':').map(Number)
  const tot = h*60+min+m
  return `${String(Math.floor(tot/60)).padStart(2,'0')}:${String(tot%60).padStart(2,'0')}`
}

function isoDate(d) {
  // Use local date parts to avoid UTC offset issues in Safari
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return y + '-' + m + '-' + day
}

export function BookingWidget({ onClose }) {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ name:'', business:'', email:'', phone:'' })
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedDuration, setSelectedDuration] = useState(30)
  const [selectedSlot, setSelectedSlot] = useState(null) // { staffEmail, staffName, time }
  const [availability, setAvailability] = useState({ staff:[], availability:[], appointments:[] })
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(null)
  const [error, setError] = useState('')
  const [calMonth, setCalMonth] = useState(new Date())

  useEffect(() => {
    const from = isoDate(new Date())
    const to = isoDate(new Date(Date.now() + 30*24*60*60*1000))
    setLoading(true)
    fetch(WORKER, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ type:'get_availability', data:{ date_from:from, date_to:to } }) })
      .then(r=>r.json()).then(d => { setAvailability(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const hasAvailability = (dateStr) => {
    if (!availability.staff?.length) return false
    const override = availability.availability?.find(a => a.date === dateStr)
    if (override && !override.is_available) return false
    const appts = availability.appointments?.filter(a => a.date === dateStr) || []
    const slots = selectedDuration === 30 ? SLOTS_30 : SLOTS_15
    return availability.staff?.some(s => {
      const staffOverride = availability.availability?.find(a => a.date === dateStr && a.staff_email === s.user_email)
      if (staffOverride && !staffOverride.is_available) return false
      return slots.some(t => !appts.find(a => a.staff_email === s.user_email && a.start_time === t))
    })
  }

  const getSlots = (dateStr) => {
    if (!availability.staff?.length) return []
    const slots = selectedDuration === 30 ? SLOTS_30 : SLOTS_15
    return availability.staff?.flatMap(s => {
      const override = availability.availability?.find(a => a.date === dateStr && a.staff_email === s.user_email)
      if (override && !override.is_available) return []
      return slots
        .filter(t => !availability.appointments?.find(a => a.staff_email === s.user_email && a.date === dateStr && a.start_time === t && a.status !== 'cancelled'))
        .map(t => ({ staffEmail: s.user_email, staffName: s.full_name, role: s.role, time: t }))
    })
  }

  const submit = async () => {
    if (!selectedSlot) return
    setSubmitting(true); setError('')
    try {
      const end = addMins(selectedSlot.time, selectedDuration)
      const res = await fetch(WORKER, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ type:'book_appointment', data:{
        client_name: form.name, client_business: form.business, client_email: form.email, client_phone: form.phone, client_phone: form.phone,
        staff_email: selectedSlot.staffEmail, staff_name: selectedSlot.staffName,
        date: selectedDate, start_time: selectedSlot.time, end_time: end, duration: selectedDuration
      }})})
      const d = await res.json()
      if (d.success) {
        setDone({ date: selectedDate, time: selectedSlot.time, staffName: selectedSlot.staffName, cancelToken: d.cancel_token })
      } else {
        setError(d.error || 'Something went wrong. Please try again.')
      }
    } catch { setError('Network error. Please try again.') }
    setSubmitting(false)
  }

  // Build calendar
  const today = new Date(); today.setHours(0,0,0,0)
  const maxDate = new Date(today); maxDate.setDate(maxDate.getDate()+30)
  const firstDay = new Date(calMonth.getFullYear(), calMonth.getMonth(), 1)
  const startOffset = (firstDay.getDay() + 6) % 7 // Mon=0
  const daysInMonth = new Date(calMonth.getFullYear(), calMonth.getMonth()+1, 0).getDate()
  const calDays = Array.from({ length: startOffset + daysInMonth }, (_, i) => {
    if (i < startOffset) return null
    return new Date(calMonth.getFullYear(), calMonth.getMonth(), i - startOffset + 1)
  })

  if (done) return (
    <div style={{ padding:'32px 24px', textAlign:'center', maxWidth:420 }}>
      <div style={{ width:56, height:56, borderRadius:'50%', background:'#dcfce7', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px', fontSize:24 }}>✅</div>
      <h3 style={{ fontFamily:'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif', fontSize:22, fontWeight:600, marginBottom:8 }}>Call Confirmed!</h3>
      <p style={{ color:'#6E6E73', fontSize:14, lineHeight:1.6, marginBottom:20 }}>
        Your call with <strong>{done.staffName?.split(' ')[0]}</strong> is booked for{' '}
        <strong>{new Date(done.date+'T12:00').toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long'})} at {done.time}</strong>.
        A confirmation has been sent to <strong>{form.email}</strong>.
      </p>
      <div style={{ background:'#F5F5F7', borderRadius:12, padding:'14px 18px', marginBottom:20, border:'1px solid #E8E8ED', fontSize:14 }}>
        📞 We'll call you from <strong>029 2002 4218</strong>
      </div>
      <a href={'/appointment/' + done.cancelToken} style={{ fontSize:13, color:'#0071E3', textDecoration:'underline' }}>
        Reschedule or cancel →
      </a>
    </div>
  )

  return (
    <div style={{ maxWidth:480, width:'100%' }}>
      {/* Progress */}
      <div style={{ display:'flex', alignItems:'center', marginBottom:28 }}>
        {[1,2,3].map((n,i) => (
          <div key={n} style={{ display:'flex', alignItems:'center', flex: i<2 ? 1 : 'none' }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, flexShrink:0 }}>
              <div style={{ width:28, height:28, borderRadius:'50%', background:step>n?'#166534':step===n?'#1D1D1F':'#E8E8ED', border:'2px solid '+(step>n?'#166534':step===n?'#1D1D1F':'#D2D2D7'), color:step>=n?'#fff':'#A1A1A6', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700, transition:'all 0.25s', flexShrink:0 }}>
                {step>n?'✓':n}
              </div>
              <span style={{ fontSize:12, color:step===n?'#1D1D1F':'#A1A1A6', fontWeight:step===n?600:400, whiteSpace:'nowrap' }}>{['Your details','Pick a date','Choose a slot'][n-1]}</span>
            </div>
            {i<2 && <div style={{ flex:1, height:1.5, background:step>n?'#166534':'#D2D2D7', margin:'0 10px', transition:'background 0.25s' }}/>}
          </div>
        ))}
      </div>

      {/* Step 1 */}
      {step === 1 && (
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          <h3 style={{ fontFamily:'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif', fontSize:18, fontWeight:600, marginBottom:4 }}>Tell us about yourself</h3>
          {[['name','Your name *','text'],['business','Business name','text'],['email','Email address *','email'],['phone','Phone number *','tel']].map(([k,p,t]) => (
            <div key={k}>
              <label className="field-label">{p}</label>
              <input className="field-inp" type={t} value={form[k]} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))} placeholder={p.replace(' *','')}/>
            </div>
          ))}
          <div>
            <label className="field-label">Call duration</label>
            <div style={{ display:'flex', gap:8 }}>
              {[15,30].map(d => (
                <button key={d} onClick={()=>setSelectedDuration(d)} style={{ flex:1, padding:'10px', borderRadius:8, border:'2px solid '+(selectedDuration===d?'#1D1D1F':'#D2D2D7'), background:selectedDuration===d?'#1D1D1F':'#F5F5F7', color:selectedDuration===d?'#fff':'#3D3D3F', cursor:'pointer', fontSize:13, fontWeight:600, transition:'all 0.15s' }}>
                  {d} min
                </button>
              ))}
            </div>
          </div>
          <button className="btn-primary" disabled={!form.name||!form.email||!form.phone} onClick={()=>setStep(2)} style={{ justifyContent:'center', marginTop:8, opacity:(!form.name||!form.email||!form.phone)?0.5:1 }}>
            Choose a date →
          </button>
        </div>
      )}

      {/* Step 2 — Calendar */}
      {step === 2 && (
        <div>
          <h3 style={{ fontFamily:'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif', fontSize:18, fontWeight:600, marginBottom:4 }}>Pick a date</h3>
          <p style={{ color:'#6E6E73', fontSize:13, marginBottom:16 }}>Available dates shown in green. Up to 30 days ahead.</p>
          {loading ? <div style={{ textAlign:'center', padding:32, color:'#6E6E73', fontSize:13 }}>Loading availability...</div> : (
            <>
              {/* Month nav */}
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
                <button onClick={()=>{const m=new Date(calMonth);m.setMonth(m.getMonth()-1);setCalMonth(m)}} style={{ background:'none', border:'none', cursor:'pointer', color:'#6E6E73', fontSize:18 }}>←</button>
                <span style={{ fontSize:14, fontWeight:500, color:'#1D1D1F' }}>{calMonth.toLocaleDateString('en-GB',{month:'long',year:'numeric'})}</span>
                <button onClick={()=>{const m=new Date(calMonth);m.setMonth(m.getMonth()+1);setCalMonth(m)}} style={{ background:'none', border:'none', cursor:'pointer', color:'#6E6E73', fontSize:18 }}>→</button>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:4, marginBottom:16 }}>
                {['M','T','W','T','F','S','S'].map((d,i) => <div key={i} style={{ textAlign:'center', fontSize:11, color:'#A1A1A6', fontWeight:500, paddingBottom:4 }}>{d}</div>)}
                {calDays.map((d, i) => {
                  if (!d) return <div key={i}/>
                  const ds = isoDate(d)
                  const isPast = d < today
                  const isFuture = d > maxDate
                  const isAvail = !isPast && !isFuture && hasAvailability(ds)
                  const isSelected = ds === selectedDate
                  return (
                    <button key={ds} disabled={!isAvail} onClick={()=>{setSelectedDate(ds);setStep(3)}}
                      style={{ padding:'6px 4px', borderRadius:7, border:'1px solid '+(isSelected?'#1D1D1F':isAvail?'#bbf7d0':'#D2D2D7'), background:isSelected?'#1D1D1F':isAvail?'#f0fdf4':'transparent', color:isSelected?'#fff':isPast||isFuture?'#D2D2D7':isAvail?'#166534':'#A1A1A6', cursor:isAvail?'pointer':'default', fontSize:12, fontWeight:isAvail?500:400, transition:'all 0.15s' }}>
                      {d.getDate()}
                    </button>
                  )
                })}
              </div>
            </>
          )}
          <button className="btn-outline" onClick={()=>setStep(1)} style={{ fontSize:13 }}>← Back</button>
        </div>
      )}

      {/* Step 3 — Slots */}
      {step === 3 && (
        <div>
          <h3 style={{ fontFamily:'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif', fontSize:18, fontWeight:600, marginBottom:4 }}>Choose a time</h3>
          <p style={{ color:'#6E6E73', fontSize:13, marginBottom:16 }}>{new Date(selectedDate+'T12:00').toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long'})}</p>
          {(() => {
            const slots = getSlots(selectedDate)
            // Group by staff
            const byStaff = {}
            slots.forEach(s => {
              if (!byStaff[s.staffEmail]) byStaff[s.staffEmail] = { name:s.staffName, role:s.role, times:[] }
              byStaff[s.staffEmail].times.push(s.time)
            })
            if (!Object.keys(byStaff).length) return <p style={{ color:'#6E6E73', fontSize:13, padding:'16px 0' }}>No slots available on this date. Please pick another day.</p>
            return Object.entries(byStaff).map(([email, { name, role, times }]) => (
              <div key={email} style={{ marginBottom:20, padding:'16px', borderRadius:12, border:'1px solid #E8E8ED', background:'#F5F5F7' }}>
                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12 }}>
                  <div style={{ width:36, height:36, borderRadius:'50%', background:'#1D1D1F', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:600, flexShrink:0 }}>
                    {name?.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontWeight:600, fontSize:14, color:'#1D1D1F' }}>{name?.split('(')[0].trim()}</div>
                    <div style={{ fontSize:11, color:'#6E6E73' }}>{role}</div>
                  </div>
                </div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                  {times.sort().map(t => {
                    const isSelected = selectedSlot?.staffEmail === email && selectedSlot?.time === t
                    return (
                      <button key={t} onClick={()=>setSelectedSlot({staffEmail:email,staffName:name,time:t})}
                        style={{ padding:'6px 12px', borderRadius:6, border:'1px solid '+(isSelected?'#1D1D1F':'#D2D2D7'), background:isSelected?'#1D1D1F':'#fff', color:isSelected?'#fff':'#3D3D3F', cursor:'pointer', fontSize:12, fontWeight:isSelected?600:400, transition:'all 0.15s' }}>
                        {t}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))
          })()}
          {error && <p style={{ color:'#ef4444', fontSize:13, margin:'8px 0' }}>{error}</p>}
          <div style={{ display:'flex', gap:10, marginTop:16 }}>
            <button className="btn-outline" onClick={()=>setStep(2)} style={{ fontSize:13 }}>← Back</button>
            {selectedSlot && (
              <button className="btn-primary" onClick={submit} disabled={submitting} style={{ flex:1, justifyContent:'center' }}>
                {submitting ? 'Booking...' : 'Confirm booking →'}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
