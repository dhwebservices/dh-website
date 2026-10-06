// Serve the SPA shell for /appointment/<token>.
//
// This route was returning 404 for every client who followed a link to view,
// reschedule or cancel their appointment. Cause: the route has a dynamic
// segment so it is not prerendered, no static asset matches, and Cloudflare
// Pages serves 404.html in preference to the SPA fallback in _redirects.
//
// Found 3 September 2026 while adding /proposal/<slug>, which had the same
// problem. A Function runs before static-asset resolution, so it wins.
export async function onRequest(context) {
  const url = new URL(context.request.url)
  url.pathname = '/'
  const shell = await context.env.ASSETS.fetch(new Request(url, context.request))

  const headers = new Headers(shell.headers)
  headers.set('X-Robots-Tag', 'noindex, nofollow')
  headers.set('Cache-Control', 'no-store')

  return new Response(shell.body, { status: 200, headers })
}
