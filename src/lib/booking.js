import { SITE_URL, WORKER_URL } from './siteConfig'

export const SLOTS_15 = [
  '09:00', '09:15', '09:30', '09:45', '10:00', '10:15', '10:30', '10:45',
  '11:00', '11:15', '11:30', '11:45', '12:00', '12:15', '12:30', '12:45',
  '13:00', '13:15', '13:30', '13:45', '14:00', '14:15', '14:30', '14:45',
  '15:00', '15:15', '15:30', '15:45', '16:00', '16:15', '16:30', '16:45',
]

export const SLOTS_30 = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
]

export function addMinutes(time, minutes) {
  const [hours, mins] = time.split(':').map(Number)
  const total = hours * 60 + mins + minutes
  return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`
}

export function isoLocalDate(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function getSlotsForDuration(duration) {
  return duration === 30 ? SLOTS_30 : SLOTS_15
}

function getAvailabilityOverride(availability, staffEmail, dateStr) {
  return availability.availability?.find(
    (item) => item.date === dateStr && (staffEmail ? item.staff_email === staffEmail : !item.staff_email)
  )
}

function getSlotsForStaffDate(availability, staff, dateStr, duration) {
  const override = getAvailabilityOverride(availability, staff.user_email, dateStr)
  if (override?.slots?.length) {
    return override.slots.filter((slot) => typeof slot === 'string').sort()
  }
  if (override?.start_time && override?.end_time) {
    const slots = []
    const step = duration === 30 ? 30 : 15
    let current = override.start_time

    while (addMinutes(current, duration) <= override.end_time) {
      slots.push(current)
      current = addMinutes(current, step)
    }

    return slots
  }
  return getSlotsForDuration(duration)
}

async function apiRequest(path, init = {}) {
  const response = await fetch(path, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init.headers,
    },
  })

  let payload = null
  try {
    payload = await response.json()
  } catch {
    payload = null
  }

  if (!response.ok) {
    const error = new Error(payload?.error || 'Booking request failed')
    error.payload = payload
    throw error
  }

  return payload
}

export async function postWorker(type, data) {
  const response = await fetch(WORKER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, data }),
  })

  let payload = null
  try {
    payload = await response.json()
  } catch {
    payload = null
  }

  if (!response.ok) {
    const error = new Error(payload?.error || 'Worker request failed')
    error.payload = payload
    throw error
  }

  return payload
}

export async function sendOutreachContact({ to, name, subject, message }) {
  return postWorker('outreach_contact', {
    to_email: to,
    contact_name: name,
    subject,
    message,
  })
}

export async function fetchAvailability(range = 30, options = {}) {
  const from = options.dateFrom || isoLocalDate(new Date())
  const to = options.dateTo || isoLocalDate(new Date(Date.now() + range * 24 * 60 * 60 * 1000))
  return apiRequest(`/api/booking?action=availability&from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`)
}

export function hasAvailabilityForDate(availability, dateStr, duration) {
  if (!availability.staff?.length) return false
  const weekday = new Date(`${dateStr}T12:00:00`).getDay()
  if (weekday === 0 || weekday === 6) return false

  const dayOverride = getAvailabilityOverride(availability, null, dateStr)
  if (dayOverride && !dayOverride.is_available) return false

  return availability.staff.some((staff) => {
    const staffOverride = getAvailabilityOverride(availability, staff.user_email, dateStr)
    if (staffOverride && !staffOverride.is_available) return false

    return getSlotsForStaffDate(availability, staff, dateStr, duration).some((time) => {
      return !availability.appointments?.find(
        (item) =>
          item.staff_email === staff.user_email &&
          item.date === dateStr &&
          item.start_time === time &&
          item.status !== 'cancelled'
      )
    })
  })
}

export function getAvailableSlots(availability, dateStr, duration) {
  if (!availability.staff?.length) return []
  const weekday = new Date(`${dateStr}T12:00:00`).getDay()
  if (weekday === 0 || weekday === 6) return []

  return availability.staff.flatMap((staff) => {
    const staffOverride = getAvailabilityOverride(availability, staff.user_email, dateStr)
    if (staffOverride && !staffOverride.is_available) return []

    return getSlotsForStaffDate(availability, staff, dateStr, duration)
      .filter((time) => {
        return !availability.appointments?.find(
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

export async function bookAppointment(input) {
  return apiRequest('/api/booking', {
    method: 'POST',
    body: JSON.stringify({ action: 'book', data: input }),
  })
}

export async function getAppointment(cancelToken) {
  const payload = await apiRequest(`/api/booking?action=appointment&token=${encodeURIComponent(cancelToken)}`)
  return payload.appointment || null
}

export async function cancelAppointment(cancelToken) {
  return apiRequest('/api/booking', {
    method: 'POST',
    body: JSON.stringify({ action: 'cancel', token: cancelToken }),
  })
}

export async function rescheduleAppointment(cancelToken, changes) {
  return apiRequest('/api/booking', {
    method: 'POST',
    body: JSON.stringify({ action: 'reschedule', token: cancelToken, data: changes }),
  })
}

function toCalendarStamp(date, time) {
  return `${date.replaceAll('-', '')}T${time.replace(':', '')}00`
}

export function getGoogleCalendarUrl(appointment) {
  const text = encodeURIComponent(`DH Website Services Call with ${appointment.staff_name}`)
  const details = encodeURIComponent(
    [
      `Call with ${appointment.staff_name}`,
      appointment.notes ? `Notes: ${appointment.notes}` : null,
      `Manage booking: ${SITE_URL}/appointment/${appointment.cancel_token}`,
    ].filter(Boolean).join('\n')
  )
  const dates = `${toCalendarStamp(appointment.date, appointment.start_time)}/${toCalendarStamp(appointment.date, appointment.end_time)}`
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&details=${details}`
}

export function getOutlookCalendarUrl(appointment) {
  const subject = encodeURIComponent(`DH Website Services Call with ${appointment.staff_name}`)
  const body = encodeURIComponent(
    [
      `Call with ${appointment.staff_name}`,
      appointment.notes ? `Notes: ${appointment.notes}` : null,
      `Manage booking: ${SITE_URL}/appointment/${appointment.cancel_token}`,
    ].filter(Boolean).join('\n')
  )
  return `https://outlook.office.com/calendar/0/deeplink/compose?subject=${subject}&body=${body}&startdt=${appointment.date}T${appointment.start_time}:00&enddt=${appointment.date}T${appointment.end_time}:00`
}
