// GET /api/staff-stats -- numbers for the DH Staff app's Home screen.
//
// Signed-in DH staff only: the caller sends the Entra ID token the staff app
// already holds, verified in _entra.js. Returns enquiry counts with the
// latest few (name, business and date only, never the brief or email), and
// the daily page counts from /api/hit.

import { verifyStaff } from './_entra.js'

const ORIGINS = ['capacitor://localhost', 'https://staff.dhwebsiteservices.co.uk', 'http://localhost:5173']

function cors(request) {
  const origin = request.headers.get('Origin') || ''
  return {
    'Access-Control-Allow-Origin': ORIGINS.includes(origin) ? origin : ORIGINS[1],
    'Access-Control-Allow-Headers': 'authorization,content-type',
    'Access-Control-Allow-Methods': 'GET,OPTIONS',
    Vary: 'Origin',
  }
}
const json = (request, body, status = 200) => new Response(JSON.stringify(body), {
  status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...cors(request) },
})

async function listAll(kv, prefix) {
  const names = []
  let cursor
  do {
    const page = await kv.list({ prefix, cursor })
    names.push(...page.keys.map((k) => k.name))
    cursor = page.list_complete ? undefined : page.cursor
  } while (cursor)
  return names
}

export const onRequestOptions = ({ request }) => new Response(null, { status: 204, headers: cors(request) })

export async function onRequestGet({ request, env }) {
  let email
  try { email = await verifyStaff(request) } catch (e) { return json(request, { error: e.message }, 401) }
  if (!email.endsWith('@dhwebsiteservices.co.uk')) return json(request, { error: 'DH staff only.' }, 403)
  const kv = env.ENQUIRIES
  if (!kv) return json(request, { error: 'Storage not bound.' }, 500)

  const now = Date.now()
  const today = new Date(now).toISOString().slice(0, 10)
  const weekAgo = new Date(now - 7 * 86400_000).toISOString()

  const [enq, sec] = await Promise.all([listAll(kv, 'enquiry:'), listAll(kv, 'security:')])
  const all = [...enq.map((k) => ({ k, type: 'Website brief' })), ...sec.map((k) => ({ k, type: 'Security check' }))]
    .map((r) => ({ ...r, at: r.k.split(':').slice(1, -1).join(':') }))
    .sort((a, b) => b.at.localeCompare(a.at))
  const latest = await Promise.all(all.slice(0, 5).map(async (r) => {
    const v = await kv.get(r.k, 'json').catch(() => null)
    return { name: v?.name || '', business: v?.business || v?.company || '', type: r.type, at: v?.receivedAt || r.at }
  }))

  const days = []
  for (let i = 6; i >= 0; i -= 1) {
    const d = new Date(now - i * 86400_000).toISOString().slice(0, 10)
    const [views, visits] = await Promise.all([kv.get(`stats:views:${d}`), kv.get(`stats:visits:${d}`)])
    days.push({ date: d, views: Number(views) || 0, visits: Number(visits) || 0 })
  }
  const sum = (f) => days.reduce((n, d) => n + d[f], 0)

  return json(request, {
    enquiries: {
      total: all.length,
      today: all.filter((r) => r.at.startsWith(today)).length,
      week: all.filter((r) => r.at >= weekAgo).length,
      latest,
    },
    visitors: {
      since: await kv.get('stats:since'),
      today: days[6].visits, todayViews: days[6].views,
      week: sum('visits'), weekViews: sum('views'),
      days,
    },
  })
}
