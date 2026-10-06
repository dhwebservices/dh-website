/**
 * Fam & a Half live-location share links, on our own domain:
 * /famandahalf/s/<token> and /famandahalf/s/<token>/live are passed through
 * to the app's share Worker, so the person you send a link to sees
 * dhwebsiteservices.co.uk rather than a workers.dev address.
 */
const WORKER = 'https://findmygang-push.aged-silence-66a7.workers.dev/s/'

export async function onRequestGet({ params }) {
  const parts = Array.isArray(params.path) ? params.path : [params.path]
  const [token, live] = parts
  if (!/^[A-Za-z0-9_-]{20,64}$/.test(token || '') || (live && live !== 'live') || parts.length > 2) {
    return new Response('Not found', { status: 404 })
  }
  const upstream = await fetch(WORKER + token + (live ? '/live' : ''), { headers: { accept: live ? 'application/json' : 'text/html' } })
  const headers = new Headers(upstream.headers)
  headers.set('cache-control', 'no-store')
  return new Response(upstream.body, { status: upstream.status, headers })
}
