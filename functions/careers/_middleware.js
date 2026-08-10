/**
 * Serves the SPA shell for career deep links.
 *
 * The build writes a 404.html into dist, and Cloudflare Pages serves that for
 * any path without a matching static file - it takes precedence over the
 * `/* /index.html 200` rule in _redirects. Only /careers/ is prerendered, so
 * every individual role URL returned a real 404 with a noindex tag:
 *
 *   /careers/<slug>              404
 *   /careers/<slug>/apply        404
 *   /careers/application-success 404
 *
 * Clicking through from /careers worked, because that is client-side routing
 * and never asks the server. Only direct loads, refreshes and shared links
 * broke - which is exactly how a job advert reaches anyone, and why Google
 * could never index a vacancy.
 *
 * Scoped to /careers/* on purpose. A genuine typo anywhere else on the site
 * still gets a proper 404 rather than a soft one.
 */

export async function onRequest(context) {
  const { request, next, env } = context

  // Prerendered pages (/careers/ itself) and real assets answer normally.
  const response = await next()
  if (response.status !== 404) return response

  // Only rewrite page navigations. A missing image or script under this path
  // should still 404 rather than being handed an HTML document.
  if (request.method !== 'GET' && request.method !== 'HEAD') return response
  if (!String(request.headers.get('Accept') || '').includes('text/html')) return response

  const shellUrl = new URL(request.url)
  shellUrl.pathname = '/index.html'
  shellUrl.search = ''

  const shell = await env.ASSETS.fetch(new Request(shellUrl.toString(), { method: 'GET' }))
  if (!shell.ok) return response

  return new Response(shell.body, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      // The role is fetched client side, so a cached shell would go stale
      // against a withdrawn vacancy.
      'Cache-Control': 'no-cache',
    },
  })
}
