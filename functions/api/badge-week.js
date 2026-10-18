// Ticks for the hidden /jack/ badge checklist. Stored in Supabase table
// badge_week_ticks (RLS on, no policies), so only the service role can touch it.

const TASKS = new Set([
  'press', 'case-studies', 'review-list', 'free-awards', 'gbp-post', 'usw', 'cynnig',
  'disability-confident', 'green-web', 'companies-house',
  'apple-business', 'bing-places', 'yell', 'freeindex', 'thomson', 'cylex', 'hotfrog', 'scoot',
  'clutch', 'goodfirms', 'designrush', 'trustpilot',
  'hubspot-seo', 'hubspot-inbound', 'google-analytics', 'shopify-partner', 'wcrc', 'ce-ready',
  'product-hunt', 'green-growth', 'sme-climate', 'armed-forces', 'behance-dribbble', 'crunchbase',
])

const DEFAULT_SUPABASE_URL = 'https://xtunnfdwltfesscmpove.supabase.co'

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' },
  })
}

function db(context, path, init = {}) {
  const url = context.env.SUPABASE_URL || DEFAULT_SUPABASE_URL
  const key = context.env.SUPABASE_SERVICE_ROLE_KEY
  if (!key) throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY')
  return fetch(`${url}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      ...init.headers,
    },
  })
}

export async function onRequestGet(context) {
  try {
    const res = await db(context, 'badge_week_ticks?select=task_id,done_at')
    if (!res.ok) return json({ error: 'Could not load ticks' }, 502)
    return json({ ticks: await res.json() })
  } catch {
    return json({ error: 'Could not load ticks' }, 500)
  }
}

export async function onRequestPost(context) {
  let body
  try { body = await context.request.json() } catch { return json({ error: 'Bad request' }, 400) }
  const task = String(body?.task || '')
  if (!TASKS.has(task)) return json({ error: 'Unknown task' }, 400)

  try {
    const res = body.done
      ? await db(context, 'badge_week_ticks?on_conflict=task_id', {
          method: 'POST',
          headers: { Prefer: 'resolution=merge-duplicates' },
          body: JSON.stringify({ task_id: task, done_at: new Date().toISOString() }),
        })
      : await db(context, `badge_week_ticks?task_id=eq.${encodeURIComponent(task)}`, { method: 'DELETE' })
    if (!res.ok) return json({ error: 'Could not save tick' }, 502)
    return json({ ok: true })
  } catch {
    return json({ error: 'Could not save tick' }, 500)
  }
}
