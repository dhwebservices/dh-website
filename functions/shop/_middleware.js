/**
 * Serves the SPA shell for shop deep links (/shop, /shop/cart,
 * /shop/product/<slug> and the rest).
 *
 * Same problem and same fix as functions/careers/_middleware.js: the build
 * writes a 404.html, and Cloudflare Pages serves it in preference to the
 * `/* /index.html 200` rule, so every shop URL loaded directly (a link, a
 * refresh, a Stripe return URL) was a hard 404. Scoped to /shop on purpose so
 * genuine typos elsewhere still get a real 404.
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
      // Product data is fetched client side; keep the shell fresh.
      'Cache-Control': 'no-cache',
    },
  })
}
