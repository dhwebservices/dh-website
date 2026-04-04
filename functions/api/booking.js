const SITE_URL = 'https://dhwebsiteservices.co.uk'
const DEFAULT_SUPABASE_URL = 'https://xtunnfdwltfesscmpove.supabase.co'
const DEFAULT_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0dW5uZmR3bHRmZXNzY21wb3ZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1MDkyNzAsImV4cCI6MjA4OTA4NTI3MH0.MaNZGpdSrn5kSTmf3kR87WCK_ga5Meze0ZvlZDkIjfM'
const DEFAULT_WORKER_URL = 'https://dh-email-worker.aged-silence-66a7.workers.dev'
const SLOTS_15 = [
  '09:00', '09:15', '09:30', '09:45', '10:00', '10:15', '10:30', '10:45',
  '11:00', '11:15', '11:30', '11:45', '12:00', '12:15', '12:30', '12:45',
  '13:00', '13:15', '13:30', '13:45', '14:00', '14:15', '14:30', '14:45',
  '15:00', '15:15', '15:30', '15:45', '16:00', '16:15', '16:30', '16:45',
]
const SLOTS_30 = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
]

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  })
}

function getEnv(context) {
  const { env } = context
  return {
    supabaseUrl: env.SUPABASE_URL || DEFAULT_SUPABASE_URL,
    supabaseKey: env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY,
    workerUrl: env.WORKER_URL || DEFAULT_WORKER_URL,
    siteUrl: env.SITE_URL || SITE_URL,
  }
}

async function supabaseRequest(context, path, init = {}) {
  const { supabaseUrl, supabaseKey } = getEnv(context)
  if (!supabaseKey) throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY')

  const response = await fetch(`${supabaseUrl}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      ...(init.body ? { 'Content-Type': 'application/json' } : {}),
      ...init.headers,
    },
  })

  const text = await response.text()
  const payload = text ? JSON.parse(text) : null

  if (!response.ok) {
    const error = new Error(payload?.message || payload?.error || 'Supabase request failed')
    error.payload = payload
    throw error
  }

  return payload
}

async function postWorker(context, type, data) {
  const { workerUrl } = getEnv(context)
  const response = await fetch(workerUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, data }),
  })

  const text = await response.text()
  const payload = text ? JSON.parse(text) : null
  if (!response.ok) throw new Error(payload?.error || 'Worker request failed')
  return payload
}

async function sendOutreachContact(context, { to, name, subject, message }) {
  return postWorker(context, 'outreach_contact', {
    to_email: to,
    contact_name: name,
    subject,
    message,
  })
}

async function logEvent(context, request, action, target, details = {}) {
  const forwardedFor = request.headers.get('CF-Connecting-IP') || request.headers.get('x-forwarded-for') || ''
  const userAgent = request.headers.get('user-agent') || ''

  try {
    await supabaseRequest(context, 'audit_log', {
      method: 'POST',
      body: JSON.stringify([{
        user_email: details.client_email || null,
        user_name: details.client_name || null,
        action,
        target,
        target_id: details.cancel_token || details.token || null,
        details: {
          ...details,
          ip: forwardedFor,
          user_agent: userAgent,
        },
      }]),
    })
  } catch {
    // Logging should never break booking flow.
  }
}

function addMinutes(time, minutes) {
  const [hours, mins] = time.split(':').map(Number)
  const total = hours * 60 + mins + minutes
  return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`
}

function getSlotsForDuration(duration) {
  return duration === 30 ? SLOTS_30 : SLOTS_15
}

function isWeekend(dateStr) {
  const day = new Date(`${dateStr}T12:00:00Z`).getUTCDay()
  return day === 0 || day === 6
}

function getLondonNowParts() {
  const formatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  const parts = Object.fromEntries(formatter.formatToParts(new Date()).map((part) => [part.type, part.value]))
  return {
    date: `${parts.year}-${parts.month}-${parts.day}`,
    minutes: Number(parts.hour) * 60 + Number(parts.minute),
  }
}

function getWeekStart(dateStr) {
  const dt = new Date(`${dateStr}T12:00:00`)
  const day = dt.getDay()
  const diff = dt.getDate() - day + (day === 0 ? -6 : 1)
  dt.setDate(diff)
  dt.setHours(0, 0, 0, 0)
  const year = dt.getUTCFullYear()
  const month = String(dt.getUTCMonth() + 1).padStart(2, '0')
  const dayOfMonth = String(dt.getUTCDate()).padStart(2, '0')
  return `${year}-${month}-${dayOfMonth}`
}

function shiftDate(dateStr, days) {
  const dt = new Date(`${dateStr}T12:00:00Z`)
  dt.setUTCDate(dt.getUTCDate() + days)
  return dt.toISOString().split('T')[0]
}

function normalizeStoredWeekStart(dateStr) {
  const dt = new Date(`${dateStr}T12:00:00Z`)
  if (dt.getUTCDay() === 0) {
    dt.setUTCDate(dt.getUTCDate() + 1)
  }
  return dt.toISOString().split('T')[0]
}

function getDayName(dateStr) {
  return new Date(`${dateStr}T12:00:00`).toLocaleDateString('en-GB', { weekday: 'long' })
}

function enumerateDates(from, to) {
  const dates = []
  const current = new Date(`${from}T12:00:00`)
  const end = new Date(`${to}T12:00:00`)

  while (current <= end) {
    const year = current.getFullYear()
    const month = String(current.getMonth() + 1).padStart(2, '0')
    const day = String(current.getDate()).padStart(2, '0')
    dates.push(`${year}-${month}-${day}`)
    current.setDate(current.getDate() + 1)
  }

  return dates
}

function buildWindowSlots(start, end, duration) {
  if (!start || !end) return []
  const slots = []
  let current = start
  const step = duration === 30 ? 30 : 15

  while (addMinutes(current, duration) <= end) {
    slots.push(current)
    current = addMinutes(current, step)
  }

  return slots
}

function getDayOverride(availability, dateStr) {
  return availability.availability.find((item) => item.date === dateStr && !item.staff_email)
}

function getStaffOverride(availability, staffEmail, dateStr) {
  return availability.availability.find((item) => item.date === dateStr && item.staff_email === staffEmail)
}

function getSlotsForStaffDate(availability, staff, dateStr, duration) {
  const override = getStaffOverride(availability, staff.user_email, dateStr)
  if (override?.slots?.length) {
    return override.slots.filter((slot) => typeof slot === 'string').sort()
  }
  if (override?.start_time && override?.end_time) {
    return buildWindowSlots(override.start_time, override.end_time, duration)
  }
  return getSlotsForDuration(duration)
}

async function getAvailability(context, from, to) {
  const scheduleFrom = shiftDate(getWeekStart(from), -1)
  const scheduleTo = getWeekStart(to)
  const [profiles, permissions, schedules, availability, appointments] = await Promise.all([
    supabaseRequest(context, 'hr_profiles?select=user_email,full_name,role,bookable&order=full_name.asc'),
    supabaseRequest(context, 'user_permissions?select=user_email,bookable_staff'),
    supabaseRequest(context, `schedules?select=user_email,user_name,week_start,submitted,week_data&week_start=gte.${scheduleFrom}&week_start=lte.${scheduleTo}`),
    supabaseRequest(context, `staff_availability?select=*&date=gte.${from}&date=lte.${to}`),
    supabaseRequest(context, `appointments?select=*&date=gte.${from}&date=lte.${to}&status=neq.cancelled`),
  ])

  const profileMap = new Map((profiles || []).map((item) => [String(item.user_email || '').toLowerCase(), item]))
  const permissionMap = new Map((permissions || []).map((item) => [String(item.user_email || '').toLowerCase(), item]))
  const scheduleMap = new Map(
    (schedules || [])
      .filter((item) => item?.submitted)
      .map((item) => [`${String(item.user_email || '').toLowerCase()}::${normalizeStoredWeekStart(item.week_start)}`, item])
  )

  const bookableEmails = new Set()
  for (const item of profiles || []) {
    if (item.bookable) bookableEmails.add(String(item.user_email || '').toLowerCase())
  }
  for (const item of permissions || []) {
    if (item.bookable_staff) bookableEmails.add(String(item.user_email || '').toLowerCase())
  }

  const staff = Array.from(bookableEmails)
    .map((email) => {
      const profile = profileMap.get(email)
      return {
        user_email: email,
        full_name: profile?.full_name || email,
        role: profile?.role || null,
        bookable: true,
      }
    })
    .sort((a, b) => (a.full_name || '').localeCompare(b.full_name || ''))

  const explicitOverrides = availability || []
  const explicitKeys = new Set(
    explicitOverrides
      .filter((item) => item.staff_email && item.date)
      .map((item) => `${String(item.staff_email).toLowerCase()}::${item.date}`)
  )

  const scheduleDerivedAvailability = []
  for (const dateStr of enumerateDates(from, to)) {
    if (isWeekend(dateStr)) continue

    const weekStart = getWeekStart(dateStr)
    const dayName = getDayName(dateStr)

    for (const member of staff) {
      const key = `${member.user_email}::${dateStr}`
      if (explicitKeys.has(key)) continue

      const schedule = scheduleMap.get(`${member.user_email}::${weekStart}`)
      const day = schedule?.week_data?.[dayName]
      if (!day?.start || !day?.end) continue

      scheduleDerivedAvailability.push({
        staff_email: member.user_email,
        staff_name: member.full_name,
        date: dateStr,
        is_available: true,
        start_time: day.start,
        end_time: day.end,
        slots: [],
        source: 'schedule',
      })
    }
  }

  return {
    staff,
    availability: [...explicitOverrides, ...scheduleDerivedAvailability],
    appointments: appointments || [],
  }
}

function getAvailableSlots(availability, dateStr, duration) {
  const dayOverride = getDayOverride(availability, dateStr)
  if (dayOverride && !dayOverride.is_available) return []

  return availability.staff.flatMap((staff) => {
    const staffOverride = getStaffOverride(availability, staff.user_email, dateStr)
    if (staffOverride && !staffOverride.is_available) return []

    return getSlotsForStaffDate(availability, staff, dateStr, duration)
      .filter((time) => {
        return !availability.appointments.find(
          (item) =>
            item.staff_email === staff.user_email &&
            item.date === dateStr &&
            item.start_time === time &&
            item.status !== 'cancelled'
        )
      })
      .map((time) => ({
        staffEmail: staff.user_email,
        staffName: staff.full_name,
        role: staff.role,
        time,
      }))
  })
}

async function getAppointmentByToken(context, token) {
  const payload = await supabaseRequest(context, `appointments?select=*&cancel_token=eq.${encodeURIComponent(token)}&limit=1`)
  return payload?.[0] || null
}

function buildCalendarLinks(siteUrl, appointment) {
  const start = `${appointment.date.replaceAll('-', '')}T${appointment.start_time.replace(':', '')}00`
  const end = `${appointment.date.replaceAll('-', '')}T${appointment.end_time.replace(':', '')}00`
  const details = encodeURIComponent(
    [
      `Call with ${appointment.staff_name}`,
      appointment.notes ? `Notes: ${appointment.notes}` : null,
      `Manage booking: ${siteUrl}/appointment/${appointment.cancel_token}`,
    ].filter(Boolean).join('\n')
  )
  return {
    google: `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`DH Website Services Call with ${appointment.staff_name}`)}&dates=${start}/${end}&details=${details}`,
    outlook: `https://outlook.office.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(`DH Website Services Call with ${appointment.staff_name}`)}&body=${details}&startdt=${appointment.date}T${appointment.start_time}:00&enddt=${appointment.date}T${appointment.end_time}:00`,
  }
}

async function sendBookingEmails(context, type, appointment) {
  const { siteUrl } = getEnv(context)
  const formattedDate = new Date(`${appointment.date}T12:00:00Z`).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  const links = buildCalendarLinks(siteUrl, appointment)

  const clientMessages = {
    booked: [
      `Your call with ${appointment.staff_name} is confirmed.`,
      '',
      `Date: ${formattedDate}`,
      `Time: ${appointment.start_time} - ${appointment.end_time}`,
      `Duration: ${appointment.duration} minutes`,
      appointment.notes ? `Discussion notes: ${appointment.notes}` : null,
      '',
      `Manage booking: <a href="${siteUrl}/appointment/${appointment.cancel_token}">${siteUrl}/appointment/${appointment.cancel_token}</a>`,
      `Add to Google Calendar: <a href="${links.google}">${links.google}</a>`,
      `Add to Outlook Calendar: <a href="${links.outlook}">${links.outlook}</a>`,
    ],
    cancelled: [
      `Your call with ${appointment.staff_name} has been cancelled.`,
      '',
      `Date: ${formattedDate}`,
      `Time: ${appointment.start_time} - ${appointment.end_time}`,
      '',
      `Book a new call: <a href="${siteUrl}/contact">${siteUrl}/contact</a>`,
    ],
    rescheduled: [
      `Your call with ${appointment.staff_name} has been rescheduled.`,
      '',
      `New date: ${formattedDate}`,
      `New time: ${appointment.start_time} - ${appointment.end_time}`,
      appointment.notes ? `Discussion notes: ${appointment.notes}` : null,
      '',
      `Manage booking: <a href="${siteUrl}/appointment/${appointment.cancel_token}">${siteUrl}/appointment/${appointment.cancel_token}</a>`,
      `Add to Google Calendar: <a href="${links.google}">${links.google}</a>`,
      `Add to Outlook Calendar: <a href="${links.outlook}">${links.outlook}</a>`,
    ],
  }

  const internalMessages = {
    booked: [
      'New website booking confirmed.',
      '',
      `Name: ${appointment.client_name}`,
      `Email: ${appointment.client_email}`,
      appointment.client_phone ? `Phone: ${appointment.client_phone}` : null,
      appointment.client_business ? `Business: ${appointment.client_business}` : null,
      appointment.notes ? `Notes: ${appointment.notes}` : null,
      `Staff: ${appointment.staff_name}`,
      `Date: ${appointment.date}`,
      `Time: ${appointment.start_time} - ${appointment.end_time}`,
      `Duration: ${appointment.duration} minutes`,
      `Manage link: ${siteUrl}/appointment/${appointment.cancel_token}`,
    ],
    cancelled: [
      'A website booking was cancelled.',
      '',
      `Name: ${appointment.client_name}`,
      `Email: ${appointment.client_email}`,
      `Staff: ${appointment.staff_name}`,
      `Date: ${appointment.date}`,
      `Time: ${appointment.start_time} - ${appointment.end_time}`,
    ],
    rescheduled: [
      'A website booking was rescheduled.',
      '',
      `Name: ${appointment.client_name}`,
      `Email: ${appointment.client_email}`,
      appointment.notes ? `Notes: ${appointment.notes}` : null,
      `Staff: ${appointment.staff_name}`,
      `New date: ${appointment.date}`,
      `New time: ${appointment.start_time} - ${appointment.end_time}`,
      `Manage link: ${siteUrl}/appointment/${appointment.cancel_token}`,
    ],
  }

  const clientSubjects = {
    booked: 'Your call is confirmed - DH Website Services',
    cancelled: 'Your call has been cancelled - DH Website Services',
    rescheduled: 'Your call has been rescheduled - DH Website Services',
  }

  const internalSubjects = {
    booked: `New booking - ${appointment.client_name}`,
    cancelled: `Booking cancelled - ${appointment.client_name}`,
    rescheduled: `Booking rescheduled - ${appointment.client_name}`,
  }

  await Promise.allSettled([
    sendOutreachContact(context, {
      to: appointment.client_email,
      name: appointment.client_name,
      subject: clientSubjects[type],
      message: clientMessages[type].filter(Boolean).join('<br/>'),
    }),
    sendOutreachContact(context, {
      to: 'clients@dhwebsiteservices.co.uk',
      name: appointment.client_name,
      subject: internalSubjects[type],
      message: internalMessages[type].filter(Boolean).join('<br/>'),
    }),
  ])
}

async function validateBooking(context, request, payload, currentAppointment = null) {
  const clean = {
    client_name: String(payload.client_name || '').trim(),
    client_business: String(payload.client_business || '').trim(),
    client_email: String(payload.client_email || '').trim().toLowerCase(),
    client_phone: String(payload.client_phone || '').trim(),
    staff_email: String(payload.staff_email || '').trim().toLowerCase(),
    staff_name: String(payload.staff_name || '').trim(),
    date: String(payload.date || '').trim(),
    start_time: String(payload.start_time || '').trim(),
    end_time: String(payload.end_time || '').trim(),
    duration: Number(payload.duration || 0),
    notes: String(payload.notes || '').trim(),
    website: String(payload.website || '').trim(),
  }

  if (clean.website) throw new Error('Spam check failed')
  if (!clean.client_name || !clean.client_email || !clean.client_phone) throw new Error('Please fill in your name, email, and phone number.')
  if (!clean.staff_email || !clean.staff_name || !clean.date || !clean.start_time || !clean.end_time || !clean.duration) throw new Error('Missing booking details.')
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean.client_email)) throw new Error('Please enter a valid email address.')
  if (clean.notes.length > 1200) throw new Error('Notes are too long. Please keep them under 1,200 characters.')
  if (isWeekend(clean.date)) throw new Error('Weekend bookings are currently unavailable. Please choose a weekday.')

  const londonNow = getLondonNowParts()
  if (clean.date < londonNow.date) throw new Error('Please choose a future date.')
  if (clean.date === londonNow.date) {
    const slotMinutes = Number(clean.start_time.slice(0, 2)) * 60 + Number(clean.start_time.slice(3, 5))
    if (slotMinutes - londonNow.minutes < 120) {
      throw new Error('Bookings need at least 2 hours notice.')
    }
  }

  const availability = await getAvailability(context, clean.date, clean.date)
  const availableSlots = getAvailableSlots(availability, clean.date, clean.duration)
  const matchingSlot = availableSlots.find(
    (slot) =>
      slot.staffEmail === clean.staff_email &&
      slot.time === clean.start_time &&
      (!currentAppointment || slot.staffEmail !== currentAppointment.staff_email || slot.time !== currentAppointment.start_time || clean.date !== currentAppointment.date)
  )

  if (
    !currentAppointment &&
    !matchingSlot &&
    !availableSlots.find((slot) => slot.staffEmail === clean.staff_email && slot.time === clean.start_time)
  ) {
    throw new Error('That slot is no longer available. Please choose another time.')
  }

  if (currentAppointment) {
    const unchanged =
      currentAppointment.date === clean.date &&
      currentAppointment.start_time === clean.start_time &&
      currentAppointment.staff_email?.toLowerCase() === clean.staff_email

    if (!unchanged && !availableSlots.find((slot) => slot.staffEmail === clean.staff_email && slot.time === clean.start_time)) {
      throw new Error('That slot is no longer available. Please choose another time.')
    }
  }

  const futureBookings = await supabaseRequest(
    context,
    `appointments?select=id,date,status,staff_email,start_time&client_email=eq.${encodeURIComponent(clean.client_email)}&date=gte.${londonNow.date}&status=neq.cancelled`
  )

  const otherFutureBookings = (futureBookings || []).filter((item) => item.id !== currentAppointment?.id)
  if (otherFutureBookings.length >= 3) throw new Error('This email already has multiple active bookings. Please manage an existing booking instead.')
  if (otherFutureBookings.some((item) => item.date === clean.date)) throw new Error('There is already an active booking for this email address on that date.')

  const staffDayBookings = availability.appointments.filter(
    (item) =>
      item.staff_email === clean.staff_email &&
      item.date === clean.date &&
      item.id !== currentAppointment?.id
  )
  if (staffDayBookings.length >= 10) throw new Error('That team member is fully booked for the day. Please choose another date.')

  return clean
}

async function handleAvailability(context, request) {
  const url = new URL(request.url)
  const from = url.searchParams.get('from')
  const to = url.searchParams.get('to')
  if (!from || !to) return json({ error: 'Missing from/to range' }, 400)

  const availability = await getAvailability(context, from, to)
  return json(availability)
}

async function handleAppointment(context, request) {
  const url = new URL(request.url)
  const token = url.searchParams.get('token')
  if (!token) return json({ error: 'Missing token' }, 400)

  const appointment = await getAppointmentByToken(context, token)
  if (!appointment) return json({ appointment: null }, 404)
  return json({ appointment, calendar_links: buildCalendarLinks(getEnv(context).siteUrl, appointment) })
}

async function handleBook(context, request, body) {
  const data = await validateBooking(context, request, body.data || {})
  const appointment = {
    cancel_token: crypto.randomUUID(),
    client_name: data.client_name,
    client_business: data.client_business || null,
    client_email: data.client_email,
    client_phone: data.client_phone,
    staff_email: data.staff_email,
    staff_name: data.staff_name,
    date: data.date,
    start_time: data.start_time,
    end_time: data.end_time,
    duration: data.duration,
    notes: data.notes || null,
    status: 'confirmed',
  }

  const payload = await supabaseRequest(context, 'appointments', {
    method: 'POST',
    headers: { Prefer: 'return=representation' },
    body: JSON.stringify([appointment]),
  })

  const created = payload?.[0] || appointment
  await logEvent(context, request, 'website_booking_created', 'appointment', created)
  void sendBookingEmails(context, 'booked', created)

  return json({
    success: true,
    cancel_token: created.cancel_token,
    appointment: created,
    calendar_links: buildCalendarLinks(getEnv(context).siteUrl, created),
  })
}

async function handleCancel(context, request, body) {
  const token = String(body.token || '').trim()
  if (!token) return json({ error: 'Missing token' }, 400)

  const appointment = await getAppointmentByToken(context, token)
  if (!appointment) return json({ success: false, error: 'Appointment not found' }, 404)
  if (appointment.status === 'cancelled') return json({ success: true, appointment })

  const payload = await supabaseRequest(context, `appointments?cancel_token=eq.${encodeURIComponent(token)}`, {
    method: 'PATCH',
    headers: { Prefer: 'return=representation' },
    body: JSON.stringify({ status: 'cancelled', updated_at: new Date().toISOString() }),
  })

  const updated = payload?.[0] || { ...appointment, status: 'cancelled' }
  await logEvent(context, request, 'website_booking_cancelled', 'appointment', updated)
  void sendBookingEmails(context, 'cancelled', updated)
  return json({ success: true, appointment: updated })
}

async function handleReschedule(context, request, body) {
  const token = String(body.token || '').trim()
  if (!token) return json({ error: 'Missing token' }, 400)

  const appointment = await getAppointmentByToken(context, token)
  if (!appointment) return json({ success: false, error: 'Appointment not found' }, 404)
  if (appointment.status === 'cancelled') return json({ success: false, error: 'This appointment has already been cancelled.' }, 400)

  const data = await validateBooking(context, request, {
    ...appointment,
    ...body.data,
    client_name: appointment.client_name,
    client_email: appointment.client_email,
    client_phone: appointment.client_phone,
    client_business: appointment.client_business,
    notes: body.data?.notes ?? appointment.notes,
  }, appointment)

  const payload = await supabaseRequest(context, `appointments?cancel_token=eq.${encodeURIComponent(token)}`, {
    method: 'PATCH',
    headers: { Prefer: 'return=representation' },
    body: JSON.stringify({
      date: data.date,
      start_time: data.start_time,
      end_time: data.end_time,
      duration: data.duration,
      staff_email: data.staff_email,
      staff_name: data.staff_name,
      notes: data.notes || null,
      updated_at: new Date().toISOString(),
    }),
  })

  const updated = payload?.[0] || {
    ...appointment,
    date: data.date,
    start_time: data.start_time,
    end_time: data.end_time,
    duration: data.duration,
    staff_email: data.staff_email,
    staff_name: data.staff_name,
    notes: data.notes || null,
  }

  await logEvent(context, request, 'website_booking_rescheduled', 'appointment', updated)
  void sendBookingEmails(context, 'rescheduled', updated)

  return json({
    success: true,
    appointment: updated,
    calendar_links: buildCalendarLinks(getEnv(context).siteUrl, updated),
  })
}

export async function onRequestGet(context) {
  try {
    const url = new URL(context.request.url)
    const action = url.searchParams.get('action')

    if (action === 'availability') return handleAvailability(context, context.request)
    if (action === 'appointment') return handleAppointment(context, context.request)
    return json({ error: 'Unknown action' }, 400)
  } catch (error) {
    return json({ error: error.message || 'Booking API failed' }, 500)
  }
}

export async function onRequestPost(context) {
  try {
    const body = await context.request.json()
    const action = body.action

    if (action === 'book') return handleBook(context, context.request, body)
    if (action === 'cancel') return handleCancel(context, context.request, body)
    if (action === 'reschedule') return handleReschedule(context, context.request, body)
    return json({ error: 'Unknown action' }, 400)
  } catch (error) {
    return json({ error: error.message || 'Booking API failed' }, 500)
  }
}
