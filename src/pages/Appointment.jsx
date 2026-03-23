import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { BookingWidget } from '../components/BookingWidget'

const WORKER = 'https://dh-email-worker.aged-silence-66a7.workers.dev'

function fmt(d) {
  if (!d) return ''
  return new Date(d+'T12:00:00').toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long',year:'numeric'})
}

export default function Appointment() {
  const { token } = useParams()
  const [appt, setAppt] = useState(null)
  const [loading, setLoading] = useState(true)
  const [mode, setMode] = useState('view') // view | reschedule | cancelled | rescheduled
  const [working, setWorking] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(WORKER, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ type:'get_appointment', data:{ cancel_token: token } }) })
      .then(r=>r.json()).then(d => { setAppt(d.appointment); setLoading(false) })
      .catch(() => setLoading(false))
  }, [token])

  const cancel = async () => {
    if (!confirm('Are you sure you want to cancel this appointment?')) return
    setWorking(true)
    const res = await fetch(WORKER, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ type:'cancel_appointment', data:{ cancel_token: token, action:'cancel' } }) })
    const d = await res.json()
    if (d.success) { setMode('cancelled'); setAppt(a => ({...a, status:'cancelled'})) }
    else setError(d.error || 'Failed to cancel')
    setWorking(false)
  }

  if (loading) return (
    <main style={{ paddingTop:'52px', minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ width:32, height:32, border:'2px solid var(--border)', borderTopColor:'var(--accent)', borderRadius:'50%', animation:'spin 0.7s linear infinite' }}/>
    </main>
  )

  if (!appt) return (
    <main style={{ paddingTop:'52px', minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center' }}>
      <div>
        <div style={{ fontSize:40, marginBottom:16 }}>🔍</div>
        <h2 style={{ fontFamily:'SF Pro Display, -apple-system, sans-serif', fontSize:22, fontWeight:600, marginBottom:8 }}>Appointment not found</h2>
        <p style={{ color:'var(--mid)' }}>This link may have expired or already been used.</p>
        <a href="/contact" style={{ display:'inline-block', marginTop:20, color:'var(--accent)', textDecoration:'underline', fontSize:14 }}>Book a new call →</a>
      </div>
    </main>
  )

  return (
    <main style={{ paddingTop:'52px', minHeight:'100vh', background:'#ffffff' }}>
      <section style={{ maxWidth:560, margin:'0 auto', padding:'clamp(40px,6vw,80px) 24px' }}>

        {mode === 'cancelled' && (
          <div style={{ textAlign:'center' }}>
            <div style={{ fontSize:40, marginBottom:16 }}>❌</div>
            <h2 style={{ fontFamily:'SF Pro Display, -apple-system, sans-serif', fontSize:24, fontWeight:600, marginBottom:8 }}>Appointment Cancelled</h2>
            <p style={{ color:'var(--mid)', marginBottom:24 }}>Your appointment has been cancelled. A confirmation has been sent to your email.</p>
            <a href="/contact" className="btn-primary" style={{ textDecoration:'none', display:'inline-flex' }}>Book a new call →</a>
          </div>
        )}

        {mode === 'rescheduled' && (
          <div style={{ textAlign:'center' }}>
            <div style={{ fontSize:40, marginBottom:16 }}>✅</div>
            <h2 style={{ fontFamily:'SF Pro Display, -apple-system, sans-serif', fontSize:24, fontWeight:600, marginBottom:8 }}>Appointment Rescheduled</h2>
            <p style={{ color:'var(--mid)' }}>Your appointment has been updated. Check your email for the new confirmation.</p>
          </div>
        )}

        {mode === 'view' && appt.status === 'cancelled' && (
          <div style={{ textAlign:'center' }}>
            <div style={{ fontSize:40, marginBottom:16 }}>❌</div>
            <h2 style={{ fontFamily:'SF Pro Display, -apple-system, sans-serif', fontSize:24, fontWeight:600, marginBottom:8 }}>This appointment was cancelled</h2>
            <a href="/contact" className="btn-primary" style={{ textDecoration:'none', display:'inline-flex', marginTop:16 }}>Book a new call →</a>
          </div>
        )}

        {mode === 'view' && appt.status !== 'cancelled' && (
          <>
            <div style={{ marginBottom:32 }}>
              <p className="eyebrow" style={{ marginBottom:8 }}>Your appointment</p>
              <h1 style={{ fontFamily:'SF Pro Display, -apple-system, sans-serif', fontSize:'clamp(28px,4vw,40px)', fontWeight:600, letterSpacing:'-0.02em', marginBottom:8 }}>
                {fmt(appt.date)}
              </h1>
              <div style={{ fontSize:18, color:'var(--mid)' }}>{appt.start_time} – {appt.end_time} · {appt.duration} min</div>
            </div>

            {/* Details card */}
            <div style={{ border:'1px solid var(--border-light)', borderRadius:16, overflow:'hidden', marginBottom:28 }}>
              {[['With', appt.staff_name?.split('(')[0].trim()], ['Name', appt.client_name], ['Business', appt.client_business||'—'], ['Email', appt.client_email], ['Call from', '029 2002 4218'], ['Status', appt.status]].map(([l,v],i,arr) => (
                <div key={l} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 20px', borderBottom:i<arr.length-1?'1px solid var(--border-light)':'none' }}>
                  <span style={{ fontFamily:'SF Mono, Monaco, monospace', fontSize:11, letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--light)' }}>{l}</span>
                  <span style={{ fontSize:14, color:'var(--dark)', fontWeight: l==='Call from'?500:400 }}>{v}</span>
                </div>
              ))}
            </div>

            {error && <p style={{ color:'#ef4444', fontSize:13, marginBottom:16 }}>{error}</p>}

            <div style={{ display:'flex', gap:12 }}>
              <button onClick={() => setMode('reschedule')} className="btn-primary" style={{ flex:1, justifyContent:'center' }}>
                Reschedule
              </button>
              <button onClick={cancel} disabled={working} style={{ flex:1, padding:'12px', borderRadius:100, border:'1px solid var(--border)', background:'transparent', color:'var(--dark2)', cursor:'pointer', fontSize:14, fontWeight:500 }}>
                {working ? 'Cancelling...' : 'Cancel appointment'}
              </button>
            </div>
          </>
        )}

        {mode === 'reschedule' && (
          <>
            <div style={{ marginBottom:24 }}>
              <button onClick={() => setMode('view')} style={{ background:'none', border:'none', color:'var(--mid)', cursor:'pointer', fontSize:13, display:'flex', alignItems:'center', gap:6, marginBottom:16 }}>← Back</button>
              <h2 style={{ fontFamily:'SF Pro Display, -apple-system, sans-serif', fontSize:24, fontWeight:600 }}>Reschedule</h2>
              <p style={{ color:'var(--mid)', fontSize:14 }}>Pick a new date and time for your call.</p>
            </div>
            <RescheduleFlow token={token} appt={appt} onDone={() => setMode('rescheduled')} />
          </>
        )}

      </section>
    </main>
  )
}

function RescheduleFlow({ token, appt, onDone }) {
  const [avail, setAvail] = useState({ staff:[], availability:[], appointments:[] })
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [calMonth, setCalMonth] = useState(new Date())

  const WORKER = 'https://dh-email-worker.aged-silence-66a7.workers.dev'

  useEffect(() => {
    const from = new Date().toISOString().split('T')[0]
    const to = new Date(Date.now()+30*24*60*60*1000).toISOString().split('T')[0]
    fetch(WORKER, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ type:'get_availability', data:{ date_from:from, date_to:to } }) })
      .then(r=>r.json()).then(d => { setAvail(d); setLoading(false) })
  }, [])

  const today = new Date(); today.setHours(0,0,0,0)
  const maxDate = new Date(today); maxDate.setDate(maxDate.getDate()+30)
  const firstDay = new Date(calMonth.getFullYear(), calMonth.getMonth(), 1)
  const startOffset = (firstDay.getDay()+6)%7
  const daysInMonth = new Date(calMonth.getFullYear(), calMonth.getMonth()+1, 0).getDate()
  const calDays = Array.from({ length: startOffset+daysInMonth }, (_, i) => i < startOffset ? null : new Date(calMonth.getFullYear(), calMonth.getMonth(), i-startOffset+1))

  const isoDate = d => {
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return y + '-' + m + '-' + day
  }
  const SLOTS = appt.duration === 15 ? ['09:00','09:15','09:30','09:45','10:00','10:15','10:30','10:45','11:00','11:15','11:30','11:45','12:00','12:15','12:30','12:45','13:00','13:15','13:30','13:45','14:00','14:15','14:30','14:45','15:00','15:15','15:30','15:45','16:00','16:15','16:30','16:45'] : ['09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30']

  const hasAvail = ds => {
    const override = avail.availability?.find(a => a.date===ds)
    if (override && !override.is_available) return false
    return avail.staff?.some(s => {
      const so = avail.availability?.find(a => a.date===ds && a.staff_email===s.user_email)
      if (so && !so.is_available) return false
      return SLOTS.some(t => !avail.appointments?.find(a => a.staff_email===s.user_email && a.date===ds && a.start_time===t && a.status!=='cancelled'))
    })
  }

  const getSlots = ds => avail.staff?.flatMap(s => {
    const so = avail.availability?.find(a => a.date===ds && a.staff_email===s.user_email)
    if (so && !so.is_available) return []
    return SLOTS.filter(t => !avail.appointments?.find(a => a.staff_email===s.user_email && a.date===ds && a.start_time===t && a.status!=='cancelled')).map(t => ({ staffEmail:s.user_email, staffName:s.full_name, time:t }))
  })

  const addMins = (t,m) => { const [h,min]=t.split(':').map(Number); const tot=h*60+min+m; return `${String(Math.floor(tot/60)).padStart(2,'0')}:${String(tot%60).padStart(2,'0')}` }

  const confirm = async () => {
    setSubmitting(true)
    const res = await fetch(WORKER, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ type:'cancel_appointment', data:{ cancel_token:token, action:'reschedule', new_date:selectedDate, new_start:selectedSlot.time, new_end:addMins(selectedSlot.time,appt.duration), new_duration:appt.duration, new_staff_name:selectedSlot.staffName } }) })
    const d = await res.json()
    if (d.success) onDone()
    else setError(d.error || 'Failed to reschedule')
    setSubmitting(false)
  }

  if (loading) return <div style={{ textAlign:'center', padding:32, color:'var(--mid)' }}>Loading availability...</div>

  return (
    <div>
      {/* Calendar */}
      <div style={{ marginBottom:24 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
          <button onClick={()=>{const m=new Date(calMonth);m.setMonth(m.getMonth()-1);setCalMonth(m)}} style={{ background:'none', border:'none', cursor:'pointer', color:'var(--mid)', fontSize:18 }}>←</button>
          <span style={{ fontSize:14, fontWeight:500 }}>{calMonth.toLocaleDateString('en-GB',{month:'long',year:'numeric'})}</span>
          <button onClick={()=>{const m=new Date(calMonth);m.setMonth(m.getMonth()+1);setCalMonth(m)}} style={{ background:'none', border:'none', cursor:'pointer', color:'var(--mid)', fontSize:18 }}>→</button>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:4 }}>
          {['M','T','W','T','F','S','S'].map((d,i) => <div key={i} style={{ textAlign:'center', fontSize:11, color:'var(--light)', paddingBottom:4 }}>{d}</div>)}
          {calDays.map((d,i) => {
            if (!d) return <div key={i}/>
            const ds = isoDate(d)
            const isPast = d < today, isFuture = d > maxDate
            const isAvail = !isPast && !isFuture && hasAvail(ds)
            const isSel = ds === selectedDate
            return (
              <button key={ds} disabled={!isAvail} onClick={()=>{ setSelectedDate(ds); setSelectedSlot(null) }}
                style={{ padding:'6px 4px', borderRadius:7, border:'1px solid '+(isSel?'var(--dark)':isAvail?'#bbf7d0':'var(--border)'), background:isSel?'var(--dark)':isAvail?'#f0fdf4':'transparent', color:isSel?'#fff':isPast||isFuture?'var(--border)':isAvail?'#166534':'var(--light)', cursor:isAvail?'pointer':'default', fontSize:12 }}>
                {d.getDate()}
              </button>
            )
          })}
        </div>
      </div>

      {selectedDate && (
        <div style={{ marginBottom:20 }}>
          <div style={{ fontSize:14, fontWeight:600, marginBottom:10 }}>{fmt(selectedDate)}</div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
            {getSlots(selectedDate)?.sort((a,b)=>a.time.localeCompare(b.time)).map(s => {
              const isSel = selectedSlot?.staffEmail===s.staffEmail && selectedSlot?.time===s.time
              return (
                <button key={s.staffEmail+s.time} onClick={()=>setSelectedSlot(s)}
                  style={{ padding:'6px 12px', borderRadius:6, border:'1px solid '+(isSel?'var(--dark)':'var(--border)'), background:isSel?'var(--dark)':'transparent', color:isSel?'#fff':'var(--dark2)', cursor:'pointer', fontSize:12, fontWeight:isSel?600:400 }}>
                  {s.time} <span style={{ fontSize:10, opacity:0.7 }}>({s.staffName?.split(' ')[0]})</span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {error && <p style={{ color:'#ef4444', fontSize:13 }}>{error}</p>}
      {selectedSlot && (
        <button onClick={confirm} disabled={submitting} className="btn-primary" style={{ width:'100%', justifyContent:'center' }}>
          {submitting ? 'Rescheduling...' : 'Confirm new time →'}
        </button>
      )}
    </div>
  )
}
