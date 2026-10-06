// Serve the SPA shell for /proposal/<slug>.
//
// Every other route on this site is prerendered to its own index.html, so
// Cloudflare Pages finds a static asset and serves it. A route with a dynamic
// segment has no such file, and Pages then serves 404.html -- which beats the
// `/* /index.html 200` rule in _redirects, and beats a narrower splat too.
// Both were tried and both still 404'd.
//
// A Function runs before static-asset resolution, so this is the fix that
// actually holds. See functions/appointment/[token].js for the same problem.
export async function onRequest(context) {
  const url = new URL(context.request.url)
  url.pathname = '/'
  const shell = await context.env.ASSETS.fetch(new Request(url, context.request))

  // Rebuild the response so the status is 200 and this page is never indexed.
  const headers = new Headers(shell.headers)
  headers.set('X-Robots-Tag', 'noindex, nofollow')
  headers.set('Cache-Control', 'no-store')

  return new Response(shell.body, { status: 200, headers })
}
