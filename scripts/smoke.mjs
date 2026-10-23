/**
 * Checks a deployed copy of the site the way a visitor and Google see it.
 *
 *   npm run smoke                                   # production
 *   npm run smoke -- https://site-care.dh-website.pages.dev   # a branch preview
 *
 * It exists because this site's worst bugs all passed a local dev server: the
 * Pages 404-over-SPA trap (every /appointment link dead), city routes that only
 * worked on a direct load, and legal pages that soft-404'd on a trailing slash.
 * Every check here is one of those, run against the real host.
 *
 * Read-only: GET requests only, no forms submitted. Exits 1 if anything fails.
 */

const PROD = 'https://www.dhwebsiteservices.co.uk'
const base = (process.argv[2] || PROD).replace(/\/+$/, '')
const isProd = base === PROD

const failures = []
const warnings = []
let passed = 0

function check(ok, label, detail = '') {
  if (ok) passed += 1
  else failures.push(detail ? `${label}: ${detail}` : label)
}

async function get(path, { accept = 'text/html', redirect = 'follow' } = {}) {
  const url = path.startsWith('http') ? path : base + path
  const res = await fetch(url, { headers: { Accept: accept, 'User-Agent': 'dh-smoke/1' }, redirect })
  const body = redirect === 'manual' ? '' : await res.text()
  return { res, body, url }
}

// 1. Every page in the sitemap, served as real HTML with its own canonical.
const sitemap = await get('/sitemap.xml', { accept: 'application/xml' })
check(sitemap.res.ok, 'sitemap.xml loads', String(sitemap.res.status))
const paths = [...sitemap.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname)
check(paths.length > 20, 'sitemap lists the site', `${paths.length} urls`)

const pageResults = await Promise.all(paths.map(async (path) => {
  try {
    const { res, body } = await get(path)
    return { path, res, body }
  } catch (error) {
    return { path, error }
  }
}))
for (const { path, res, body, error } of pageResults) {
  if (error) { check(false, `GET ${path}`, error.message); continue }
  check(res.status === 200, `GET ${path}`, `status ${res.status}`)
  check(/<title>[^<]{10,}<\/title>/.test(body), `${path} has a title`)
  const canonical = body.match(/<link rel="canonical" href="([^"]+)"/)?.[1]
  check(canonical && new URL(canonical).pathname === path, `${path} canonical points at itself`, canonical || 'missing')
  // Prerendered "not found" text on a 200 is what Google calls a soft 404.
  check(!/Page Not Found|Page not found/.test(body), `${path} is not a soft 404`)
  check(/<h1[\s>]/.test(body), `${path} has an h1 in the prerendered HTML`)
}

// 2. Deep links into client-side routes. Pages serves 404.html in preference
//    to the SPA fallback, so each of these needs a function in functions/.
for (const path of ['/appointment/smoke-test', '/proposal/smoke-test', '/careers/smoke-test', '/shop/product/smoke-test']) {
  const { res, body } = await get(path)
  check(res.status === 200 && body.includes('id="root"'), `deep link ${path} serves the app`, `status ${res.status}`)
}

// 3. Unknown pages are real 404s, not 200s.
const missing = await get('/smoke-test-no-such-page')
check(missing.res.status === 404, 'unknown page returns 404', `status ${missing.res.status}`)

// 4. Crawling rules.
const robots = await get('/robots.txt', { accept: 'text/plain' })
check(robots.res.ok && /Disallow: \/proposal\//.test(robots.body), 'robots.txt hides /proposal/')
check(/Sitemap: /.test(robots.body), 'robots.txt lists the sitemap')

// 5. The portal editor reads this file; a broken one breaks editing.
const manifest = await get('/block-manifest.json', { accept: 'application/json' })
try {
  check(JSON.parse(manifest.body).blocks.length > 0, 'block-manifest.json is valid')
} catch {
  check(false, 'block-manifest.json is valid', `status ${manifest.res.status}`)
}

// 6. Production only: one canonical host.
if (isProd) {
  const apex = await get('https://dhwebsiteservices.co.uk/', { redirect: 'manual' })
  if (![301, 308].includes(apex.res.status)) {
    warnings.push(`https://dhwebsiteservices.co.uk/ returns ${apex.res.status}, not a 301 to www (needs a Cloudflare redirect rule)`)
  }
}

console.log(`\n${base}\n${passed} passed, ${failures.length} failed, ${warnings.length} warnings\n`)
for (const line of failures) console.log(`  FAIL  ${line}`)
for (const line of warnings) console.log(`  WARN  ${line}`)
process.exit(failures.length ? 1 : 0)
