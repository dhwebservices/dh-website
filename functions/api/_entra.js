// Verifies a DH staff member's Microsoft Entra ID token, the same checks the
// staff portal's own API makes (functions/api/_portalAuth.js in that repo):
// RS256 signature against the tenant's published keys, issuer, audience,
// expiry. The tenant and app IDs are public identifiers, not secrets.

const TENANT = 'c8bd84c5-4ddb-4cb7-8276-0b7d30a42e5f'
const CLIENT = '79722400-3699-4f12-a4a1-df71949b5805'
const SKEW = 120
let cache = { keys: null, at: 0 }

const b64 = (v) => {
  const s = v.replace(/-/g, '+').replace(/_/g, '/')
  const bin = atob(s + '='.repeat((4 - (s.length % 4)) % 4))
  return Uint8Array.from(bin, (c) => c.charCodeAt(0))
}
const seg = (v) => JSON.parse(new TextDecoder().decode(b64(v)))

async function keys() {
  if (cache.keys && Date.now() - cache.at < 3600_000) return cache.keys
  const res = await fetch(`https://login.microsoftonline.com/${TENANT}/discovery/v2.0/keys`)
  if (!res.ok) throw new Error('Could not fetch signing keys.')
  cache = { keys: (await res.json()).keys || [], at: Date.now() }
  return cache.keys
}

export async function verifyStaff(request) {
  const token = (request.headers.get('Authorization') || '').replace(/^Bearer\s+/i, '')
  const parts = token.split('.')
  if (parts.length !== 3) throw new Error('Sign in to the staff portal.')
  const header = seg(parts[0])
  const claims = seg(parts[1])
  if (header.alg !== 'RS256') throw new Error('Unexpected token type.')
  const jwk = (await keys()).find((k) => k.kid === header.kid)
  if (!jwk) throw new Error('Unknown signing key.')
  const key = await crypto.subtle.importKey('jwk', { kty: jwk.kty, n: jwk.n, e: jwk.e, alg: 'RS256', ext: true },
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['verify'])
  const ok = await crypto.subtle.verify('RSASSA-PKCS1-v1_5', key, b64(parts[2]),
    new TextEncoder().encode(`${parts[0]}.${parts[1]}`))
  if (!ok) throw new Error('Bad token signature.')
  const issuers = [`https://login.microsoftonline.com/${TENANT}/v2.0`, `https://sts.windows.net/${TENANT}/`]
  if (!issuers.includes(claims.iss)) throw new Error('Token came from another tenant.')
  if (![CLIENT, `api://${CLIENT}`].includes(claims.aud)) throw new Error('Token was for another app.')
  const now = Math.floor(Date.now() / 1000)
  if (claims.exp && now > claims.exp + SKEW) throw new Error('Token expired. Sign in again.')
  if (claims.nbf && now < claims.nbf - SKEW) throw new Error('Token not valid yet.')
  return String(claims.preferred_username || claims.email || claims.upn || '').toLowerCase()
}
