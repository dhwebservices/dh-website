// POST /api/hit -- first-party page counter for the staff app's Home screen.
//
// No cookies, no IP, no user agent stored, nothing per person: just two
// numbers per day in the ENQUIRIES KV namespace. `views` counts page loads
// and in-site navigations; `visits` counts arrivals from outside the site
// (the landing page of a visit). Sent by src/components/Analytics.jsx on the
// live domain only, so previews, crawlers that don't run JavaScript and our
// own uptime monitors never reach it.

const BOT = /bot|crawl|spider|slurp|monitor|uptime|lighthouse|headless|preview|scan|curl|wget|python|httpclient/i
const KEEP = 60 * 60 * 24 * 400

async function bump(kv, key) {
  const n = Number(await kv.get(key)) || 0
  await kv.put(key, String(n + 1), { expirationTtl: KEEP })
}

export async function onRequestPost({ request, env }) {
  const done = new Response(null, { status: 204 })
  const kv = env.ENQUIRIES
  if (!kv || BOT.test(request.headers.get('User-Agent') || '')) return done
  const body = await request.json().catch(() => ({}))
  const day = new Date().toISOString().slice(0, 10)
  try {
    if (!(await kv.get('stats:since'))) await kv.put('stats:since', day)
    await bump(kv, `stats:views:${day}`)
    if (body.visit === true) await bump(kv, `stats:visits:${day}`)
  } catch { /* a lost count is fine; a failed page isn't */ }
  return done
}
