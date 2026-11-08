// The site's own address, for links in emails and Stripe return URLs.
//
// The SITE_URL setting in production is not a valid URL (Stripe rejected it,
// 8 Nov 2026), which broke card checkout and links built from it. A value is
// only used if it parses as an http(s) origin; anything else falls back to
// the real address rather than sending customers to a broken link.
export const DEFAULT_SITE_URL = 'https://dhwebsiteservices.co.uk'

export function siteUrlFrom(...candidates) {
  for (const raw of candidates) {
    if (!raw) continue
    try {
      const url = new URL(String(raw).trim())
      if (url.protocol === 'https:' || url.protocol === 'http:') return url.origin
    } catch {}
  }
  return DEFAULT_SITE_URL
}
