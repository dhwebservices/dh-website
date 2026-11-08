// Serve the SPA shell for /order (the online deposit page).
//
// /order is not prerendered, so Pages served 404.html instead of the SPA
// fallback -- the same trap as functions/appointment/[token].js. A Function
// runs before static-asset resolution, so it wins. noindex: the page is a
// checkout step, not something to find in search.
export async function onRequest(context) {
  const url = new URL(context.request.url)
  url.pathname = '/'
  url.search = ''
  const shell = await context.env.ASSETS.fetch(new Request(url, context.request))

  const headers = new Headers(shell.headers)
  headers.set('X-Robots-Tag', 'noindex, nofollow')
  headers.set('Cache-Control', 'no-store')

  return new Response(shell.body, { status: 200, headers })
}
