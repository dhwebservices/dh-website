// Client proposals, served behind a passcode.
//
// The proposal body lives here rather than in the React bundle on purpose: a
// passcode checked in the browser protects nothing, because the content would
// already have been downloaded. The page sends the code here and gets the
// proposal back only if it matches.

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  })
}

/**
 * Proposals live in the PROPOSALS_JSON Pages secret, not in this file: the
 * repo is public, and the data is client names, pricing and passcodes.
 *
 * Shape: { "<slug>": { "passcode": "ABC123", "ref": ..., "client": ..., ... } }
 * The master copy is ~/.config/dh-website/proposals.json on David's Mac. To add
 * a proposal, add an entry there and re-upload it to BOTH environments:
 *   npx wrangler pages secret put PROPOSALS_JSON --project-name=dh-website \
 *     < ~/.config/dh-website/proposals.json            (production)
 * and the preview environment through the dashboard or the Pages API.
 * Then send the client https://dhwebsiteservices.co.uk/proposal/<slug>.
 */
function loadProposals(env) {
  try {
    const parsed = JSON.parse(env?.PROPOSALS_JSON || '{}')
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

// David Hooper Home Limited is VAT registered, so every figure a client sees
// has to be unambiguous about whether VAT is in it. Prices are quoted ex VAT
// (standard for B2B) with the VAT and the gross total both shown, and the
// payment schedule gives the gross figures, because those are what actually
// gets invoiced.
const VAT_RATE = 0.2

const COMPANY = {
  legalName: 'David Hooper Home Limited',
  tradingAs: 'DH Website Services',
  companyNumber: '17018784',
  vatNumber: 'GB 517 076 395',
}

export async function onRequestPost(context) {
  let body
  try {
    body = await context.request.json()
  } catch {
    return json({ error: 'Invalid request.' }, 400)
  }

  const slug = String(body?.slug || '').trim().toLowerCase()
  const passcode = String(body?.passcode || '').trim().toUpperCase()

  const proposals = loadProposals(context.env)
  const proposal = Object.prototype.hasOwnProperty.call(proposals, slug) ? proposals[slug] : null
  // Same response whether the slug or the code is wrong, so the endpoint does
  // not confirm which proposals exist.
  if (!proposal || !proposal.passcode || passcode !== String(proposal.passcode).toUpperCase()) {
    return json({ error: 'That code did not work. Check it and try again.' }, 401)
  }

  const { passcode: _omit, ...safe } = proposal
  return json({ proposal: { ...safe, company: COMPANY } })
}

export async function onRequestGet() {
  return json({ error: 'Method not allowed.' }, 405)
}
