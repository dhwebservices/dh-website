// Passcode-locked client agreements with online signing: /agreement/<slug>.
//
// The agreement text lives in Supabase (client_agreements, RLS on, service role
// only) because this repo is public. The page is rendered here rather than in
// the SPA so the text never ships in the JS bundle.

const DEFAULT_SUPABASE_URL = 'https://xtunnfdwltfesscmpove.supabase.co'
const NOTIFY_EMAIL = 'david@dhwebsiteservices.co.uk'
const MAX_SIGNATURE_BYTES = 300_000

function db(env, path, init = {}) {
  const key = env.SUPABASE_SERVICE_ROLE_KEY
  if (!key) throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY')
  return fetch(`${env.SUPABASE_URL || DEFAULT_SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', ...init.headers },
  })
}

async function sha256(text) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

function ukDateTime(iso) {
  return new Date(iso).toLocaleString('en-GB', { timeZone: 'Europe/London', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}
function ukDate(iso) {
  return new Date(iso).toLocaleDateString('en-GB', { timeZone: 'Europe/London', day: 'numeric', month: 'long', year: 'numeric' })
}

function page(title, body) {
  const html = `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>${esc(title)} | DH Website Services</title>
<link rel="icon" href="/dh-logo-icon.png">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500&display=swap">
<style>
  :root { --ink:#14181A; --mid:#555D60; --line:#E6EAE7; --bg:#F4F5F3; --card:#FFFFFF; --accent:#C8102E; --ok:#1E7A46; --ok-soft:#E8F4EC; }
  * { box-sizing:border-box; }
  body { margin:0; background:var(--bg); color:var(--ink); font-family:'IBM Plex Sans', -apple-system, 'Segoe UI', sans-serif; font-size:16px; line-height:1.6; padding:0 16px; }
  .wrap { max-width:780px; margin:0 auto; padding-block:32px 64px; }
  header { display:flex; align-items:center; gap:12px; margin-bottom:28px; }
  header img { width:36px; height:36px; }
  header span { font-weight:600; }
  .card { background:var(--card); border:1px solid var(--line); border-radius:14px; padding:clamp(22px,5vw,48px); }
  .eyebrow { font-family:'IBM Plex Mono', monospace; font-size:12px; letter-spacing:.12em; text-transform:uppercase; color:var(--mid); border-top:2px solid var(--accent); padding-top:12px; margin:0 0 10px; }
  h1 { font-size:clamp(28px,5vw,38px); line-height:1.15; margin:0 0 8px; letter-spacing:-.02em; }
  .sub { color:var(--mid); margin:0 0 28px; }
  .doc h2.doc-title { font-size:24px; margin:48px 0 12px; padding-top:28px; border-top:1px solid var(--line); }
  .doc h3 { font-size:17px; margin:28px 0 8px; }
  .doc p, .doc li { color:#2A3033; }
  .doc ol, .doc ul { padding-left:22px; }
  .doc li { margin-bottom:6px; }
  .sign { margin-top:40px; padding-top:28px; border-top:1px solid var(--line); display:flex; flex-direction:column; gap:16px; }
  .sign h2 { font-size:22px; margin:0; }
  label { font-weight:600; font-size:14px; display:block; margin-bottom:6px; }
  input[type=text], input[type=password], input[type=email], textarea { width:100%; font:inherit; padding:12px 14px; border:1px solid #C9CFCB; border-radius:10px; background:#fff; color:var(--ink); }
  input:focus, canvas:focus { outline:3px solid rgba(200,16,46,.25); border-color:var(--accent); }
  .pad { position:relative; }
  canvas { width:100%; height:180px; border:1px dashed #9AA3A0; border-radius:10px; background:#fff; touch-action:none; display:block; }
  .pad button { position:absolute; top:8px; right:8px; }
  .check { display:flex; gap:10px; align-items:flex-start; font-weight:400; font-size:15px; }
  .check input { width:20px; height:20px; margin-top:2px; flex:none; }
  button, .btn { font:inherit; font-weight:600; border-radius:10px; padding:12px 20px; border:1px solid var(--line); background:#fff; color:var(--ink); cursor:pointer; text-decoration:none; display:inline-block; }
  .primary { background:var(--accent); border-color:var(--accent); color:#fff; }
  .primary:hover { background:#A50D26; }
  .error { background:#FBEBEB; color:#8A1020; border-radius:10px; padding:12px 14px; margin:0; }
  .done { background:var(--ok-soft); color:var(--ok); border-radius:10px; padding:14px 16px; margin:0 0 24px; font-weight:600; }
  .sigs { display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:16px; margin-top:12px; }
  .sigbox { border:1px solid var(--line); border-radius:10px; padding:16px; min-width:0; }
  .sigbox small { display:block; color:var(--mid); font-size:13px; }
  .sigbox img { max-width:100%; height:90px; object-fit:contain; display:block; margin:8px 0; }
  .typed { font-size:22px; font-style:italic; margin:14px 0; }
  .audit { font-family:'IBM Plex Mono', monospace; font-size:12px; color:var(--mid); word-break:break-all; margin-top:20px; }
  .row { display:flex; gap:12px; flex-wrap:wrap; }
  footer { margin-top:24px; font-size:13px; color:var(--mid); text-align:center; }
  @media print { body { background:#fff; padding:0; } .card { border:0; padding:0; } .noprint { display:none !important; } }
</style>
</head>
<body>
<div class="wrap">
<header><img src="/dh-logo-icon.png" alt=""><span>DH Website Services</span></header>
${body}
<footer>DH Website Services · David Hooper Home Limited · Company number 17018784 · 01443 805303</footer>
</div>
</body>
</html>`
  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow', 'Referrer-Policy': 'no-referrer' },
  })
}

function passcodeForm(slug, error) {
  return page('Agreement', `<main class="card">
  <p class="eyebrow">Private agreement</p>
  <h1>Enter your passcode</h1>
  <p class="sub">This agreement is private. Enter the passcode or PIN we gave you to read and sign it.</p>
  <form method="post" action="/agreement/${esc(slug)}" class="sign" style="border:0;padding:0;margin:0">
    ${error ? `<p class="error">${esc(error)}</p>` : ''}
    <div><label for="passcode">Passcode or PIN</label><input id="passcode" name="passcode" type="password" autocomplete="off" autofocus required></div>
    <input type="hidden" name="action" value="view">
    <div><button class="primary" type="submit">Open agreement</button></div>
  </form>
</main>`)
}

// An agreement with issuer_passcode_sha256 is countersigned: David opens the
// same link with his own PIN and draws his signature. Older agreements only
// carry his typed name as the issuer.
const countersigned = (row) => Boolean(row.issuer_passcode_sha256)
const fullySigned = (row) => Boolean(row.signed_at) && (!countersigned(row) || Boolean(row.issuer_signed_at))

function signatures(row) {
  const signed = Boolean(row.signed_at)
  const issuerBox = !countersigned(row)
    ? `<p class="typed">David Hooper</p>
      <strong>${esc(row.issued_by)}</strong>
      <small>Issued ${esc(ukDate(row.issued_at))}</small>`
    : row.issuer_signed_at
      ? `<img src="${esc(row.issuer_signature_png)}" alt="Signature of ${esc(row.issuer_signer_name)}">
      <strong>${esc(row.issuer_signer_name)}, Director</strong>
      <small>David Hooper Home Limited (company number 17018784)</small>
      <small>Signed ${esc(ukDateTime(row.issuer_signed_at))}</small>`
      : `<p class="typed" style="color:var(--mid)">Not yet signed</p>`
  const details = row.collect_party_details && signed
    ? `<small>${esc(row.signer_entity)}${row.signer_incorporation ? `, ${esc(row.signer_incorporation)}` : ''}</small>
       <small>${esc(row.signer_address)}</small>
       <small>${esc(row.signer_email)}</small>`
    : ''
  return `<div class="sigs">
    <div class="sigbox">
      <small>For ${countersigned(row) ? 'David Hooper Home Limited' : 'DH Website Services'}</small>
      ${issuerBox}
    </div>
    <div class="sigbox">
      <small>${esc(row.party_label || 'For the client')}</small>
      ${signed
        ? `<img src="${esc(row.signature_png)}" alt="Signature of ${esc(row.signer_name)}">
           <strong>${esc(row.signer_name)}${row.signer_role ? `, ${esc(row.signer_role)}` : ''}</strong>
           ${details}
           <small>Signed ${esc(ukDateTime(row.signed_at))}</small>`
        : `<p class="typed" style="color:var(--mid)">Not yet signed</p>`}
    </div>
  </div>`
}

function field(id, label, opts = {}) {
  const tag = opts.multiline
    ? `<textarea id="${id}" name="${id}" rows="3" ${opts.required ? 'required' : ''}>${esc(opts.value || '')}</textarea>`
    : `<input id="${id}" name="${id}" type="${opts.type || 'text'}" ${opts.autocomplete ? `autocomplete="${opts.autocomplete}"` : ''} ${opts.placeholder ? `placeholder="${esc(opts.placeholder)}"` : ''} value="${esc(opts.value || '')}" ${opts.required ? 'required' : ''}>`
  return `<div><label for="${id}">${label}</label>${opts.hint ? `<small style="display:block;color:var(--mid);margin:-2px 0 6px">${opts.hint}</small>` : ''}${tag}</div>`
}

function signForm(row, passcode, role, error) {
  const issuer = role === 'issuer'
  if (issuer ? row.issuer_signed_at : row.signed_at) return ''
  const partyFields = !issuer && row.collect_party_details
    ? field('signer_entity', 'Full legal name of the company or individual signing up to this agreement', { required: true, autocomplete: 'organization' }) +
      field('signer_incorporation', 'Where it is incorporated and its registration number', { placeholder: 'For example, Delaware, file number 1234567', hint: 'Leave blank if you are signing as an individual.' }) +
      field('signer_address', 'Registered office or principal address', { required: true, multiline: true }) +
      field('signer_email', 'Email address for notices', { type: 'email', required: true, autocomplete: 'email' })
    : ''
  const agree = issuer
    ? 'I am a director of David Hooper Home Limited and I sign this agreement for it.'
    : esc(row.agree_text || 'I have read and agree to the Website Services Agreement and the Letter of Authority above, and I am authorised to sign for the Maltsters Arms.')
  return `<form method="post" action="/agreement/${esc(row.slug)}" class="sign noprint" id="signform">
    <h2>${issuer ? 'Sign for David Hooper Home Limited' : 'Sign this agreement'}</h2>
    ${error ? `<p class="error">${esc(error)}</p>` : ''}
    <input type="hidden" name="passcode" value="${esc(passcode)}">
    <input type="hidden" name="action" value="sign">
    <input type="hidden" name="signature" id="signature">
    ${partyFields}
    ${field('signer_name', issuer ? 'Your full name' : 'Your full name (the person signing)', { required: true, autocomplete: 'name', value: issuer ? 'David Hooper' : '' })}
    ${issuer ? '' : field('signer_role', 'Your position', { placeholder: 'For example, Founder or CEO', required: Boolean(row.collect_party_details) })}
    <div class="pad">
      <label for="canvas">Signature</label>
      <canvas id="canvas" tabindex="0" aria-label="Draw your signature here"></canvas>
      <button type="button" id="clear" style="top:34px">Clear</button>
    </div>
    <label class="check"><input type="checkbox" name="agree" value="yes" required> ${agree}</label>
    <div><button class="primary" type="submit">Sign agreement</button></div>
  </form>
  <script>
  (function () {
    var c = document.getElementById('canvas'), ctx = c.getContext('2d'), drawing = false, inked = false;
    function size() {
      var r = c.getBoundingClientRect(), d = window.devicePixelRatio || 1, keep = inked ? c.toDataURL() : null;
      c.width = r.width * d; c.height = r.height * d; ctx.setTransform(d, 0, 0, d, 0, 0);
      ctx.lineWidth = 2.4; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = '#14181A';
      if (keep) { var img = new Image(); img.onload = function () { ctx.drawImage(img, 0, 0, r.width, r.height); }; img.src = keep; }
    }
    function pos(e) { var r = c.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; }
    c.addEventListener('pointerdown', function (e) { drawing = true; c.setPointerCapture(e.pointerId); var p = pos(e); ctx.beginPath(); ctx.moveTo(p.x, p.y); });
    c.addEventListener('pointermove', function (e) { if (!drawing) return; var p = pos(e); ctx.lineTo(p.x, p.y); ctx.stroke(); inked = true; });
    c.addEventListener('pointerup', function () { drawing = false; });
    c.addEventListener('pointercancel', function () { drawing = false; });
    document.getElementById('clear').addEventListener('click', function () { ctx.clearRect(0, 0, c.width, c.height); inked = false; });
    document.getElementById('signform').addEventListener('submit', function (e) {
      if (!inked) { e.preventDefault(); alert('Please draw your signature in the box.'); return; }
      document.getElementById('signature').value = c.toDataURL('image/png');
    });
    window.addEventListener('resize', size); size();
  })();
  </script>`
}

function agreementPage(row, passcode, role, error) {
  const done = fullySigned(row)
  const waiting = !done && (role === 'issuer' ? row.issuer_signed_at : row.signed_at)
  return page(row.title, `<main class="card">
  ${done ? `<p class="done">Signed by both parties. Last signature ${esc(ukDateTime([row.signed_at, row.issuer_signed_at].filter(Boolean).sort().pop()))}. A copy is saved with us.</p>` : ''}
  ${waiting ? `<p class="done">Your signature is saved. This page will show the other signature once it has been added.</p>` : ''}
  <p class="eyebrow">${esc(row.eyebrow || 'Private agreement')}</p>
  <h1>${esc(row.title)}</h1>
  <p class="sub">${countersigned(row) ? `Between David Hooper Home Limited and ${esc(row.client_name)}.` : `Between DH Website Services and ${esc(row.client_name)}.`}</p>
  <div class="doc">${row.body_html}</div>
  <div class="sign" style="gap:8px">
    <h2>Signatures</h2>
    ${signatures(row)}
    ${row.signed_at || row.issuer_signed_at ? `<p class="audit">Signed electronically. Document fingerprint (SHA-256): ${esc(row.body_sha256)}</p>
    <div class="row noprint"><button type="button" onclick="window.print()">Print or save as PDF</button></div>` : ''}
  </div>
  ${signForm(row, passcode, role, error)}
</main>`)
}

async function loadRow(env, slug) {
  const res = await db(env, `client_agreements?slug=eq.${encodeURIComponent(slug)}&select=*`)
  if (!res.ok) throw new Error('lookup failed')
  const rows = await res.json()
  return rows[0] || null
}

async function sendEmail(env, to, subject, html) {
  if (!env.RESEND_API_KEY || !to) return
  const from = env.FROM_EMAIL || 'DH Website Services <noreply@dhwebsiteservices.co.uk>'
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to: [to], subject, html }),
  }).catch(() => {})
}

// Every open, passcode attempt and signing is logged. A plain page load can be
// an email link scanner rather than a person, so only a correct passcode counts
// as "opened" for the notification email.
async function logEvent(context, slug, event) {
  const { request, env } = context
  await db(env, 'client_agreement_events', {
    method: 'POST',
    body: JSON.stringify({
      slug,
      event,
      ip: request.headers.get('CF-Connecting-IP') || '',
      user_agent: (request.headers.get('User-Agent') || '').slice(0, 400),
    }),
  }).catch(() => {})
}

async function notifyFirstOpen(context, row) {
  const res = await db(context.env, `client_agreement_events?slug=eq.${encodeURIComponent(row.slug)}&event=eq.passcode_ok&select=id&limit=2`)
  if (!res.ok) return
  if ((await res.json()).length !== 1) return
  const link = `https://dhwebsiteservices.co.uk/agreement/${encodeURIComponent(row.slug)}`
  await sendEmail(context.env, NOTIFY_EMAIL, `Opened: ${row.title} (${row.client_name})`,
    `<p>${esc(row.client_name)} entered the passcode and opened the ${esc(row.title)} at ${esc(ukDateTime(new Date().toISOString()))}.</p><p><a href="${link}">${link}</a></p>`)
}

export async function onRequestGet(context) {
  const slug = String(context.params.slug || '')
  context.waitUntil(logEvent(context, slug, 'page_open'))
  return passcodeForm(slug)
}

export async function onRequestPost(context) {
  const { request, env, params } = context
  const slug = String(params.slug || '')
  let row
  try { row = await loadRow(env, slug) } catch { return page('Agreement', '<main class="card"><h1>Something went wrong</h1><p>Please try again in a minute, or call us on 01443 805303.</p></main>') }

  const form = await request.formData()
  const passcode = String(form.get('passcode') || '').trim()
  const hash = await sha256(passcode.toUpperCase())
  const role = !row ? null : hash === row.passcode_sha256 ? 'party' : row.issuer_passcode_sha256 && hash === row.issuer_passcode_sha256 ? 'issuer' : null
  if (!role) {
    context.waitUntil(logEvent(context, slug, 'passcode_wrong'))
    return passcodeForm(slug, 'That passcode is not right. Check it and try again.')
  }

  if (form.get('action') !== 'sign') {
    context.waitUntil(logEvent(context, slug, role === 'issuer' ? 'issuer_passcode_ok' : 'passcode_ok').then(() => role === 'party' && notifyFirstOpen(context, row)))
  }

  const issuer = role === 'issuer'
  if (form.get('action') !== 'sign' || (issuer ? row.issuer_signed_at : row.signed_at)) return agreementPage(row, passcode, role)

  const text = (k, max) => String(form.get(k) || '').trim().slice(0, max)
  const name = text('signer_name', 120)
  const role_ = text('signer_role', 80)
  const signature = String(form.get('signature') || '')
  const details = {
    signer_entity: text('signer_entity', 200),
    signer_incorporation: text('signer_incorporation', 200),
    signer_address: text('signer_address', 400),
    signer_email: text('signer_email', 200),
  }
  if (!name) return agreementPage(row, passcode, role, 'Please type your full name.')
  if (!issuer && row.collect_party_details) {
    if (!details.signer_entity) return agreementPage(row, passcode, role, 'Please give the full legal name of the company or individual signing up.')
    if (!details.signer_address) return agreementPage(row, passcode, role, 'Please give the registered office or principal address.')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.signer_email)) return agreementPage(row, passcode, role, 'Please give a valid email address for notices.')
    if (!role_) return agreementPage(row, passcode, role, 'Please give your position.')
  }
  if (form.get('agree') !== 'yes') return agreementPage(row, passcode, role, 'Please tick the box to confirm you agree.')
  if (!signature.startsWith('data:image/png;base64,') || signature.length > MAX_SIGNATURE_BYTES) {
    return agreementPage(row, passcode, role, 'Please draw your signature in the box.')
  }
  if ((await sha256(row.body_html)) !== row.body_sha256) {
    return agreementPage(row, passcode, role, 'This agreement has changed since it was issued. Please call us on 01443 805303.')
  }

  const now = new Date().toISOString()
  const ip = request.headers.get('CF-Connecting-IP') || ''
  const ua = (request.headers.get('User-Agent') || '').slice(0, 400)
  const patch = issuer
    ? { issuer_signed_at: now, issuer_signer_name: name, issuer_signature_png: signature, issuer_ip: ip, issuer_user_agent: ua }
    : { signed_at: now, signer_name: name, signer_role: role_ || null, signature_png: signature, signer_ip: ip, signer_user_agent: ua,
        ...(row.collect_party_details ? { ...details, signer_incorporation: details.signer_incorporation || null } : {}) }
  const update = await db(env, `client_agreements?slug=eq.${encodeURIComponent(slug)}&${issuer ? 'issuer_signed_at' : 'signed_at'}=is.null`, {
    method: 'PATCH',
    headers: { Prefer: 'return=representation' },
    body: JSON.stringify(patch),
  })
  if (!update.ok) return agreementPage(row, passcode, role, 'We could not save your signature. Please try again.')
  const saved = (await update.json())[0]
  if (!saved) return agreementPage(await loadRow(env, slug), passcode, role)

  context.waitUntil(logEvent(context, slug, issuer ? 'issuer_signed' : 'signed'))
  const link = `https://dhwebsiteservices.co.uk/agreement/${encodeURIComponent(slug)}`
  const when = ukDateTime(now)
  const partyEmail = saved.signer_email || saved.client_email
  const partyFirst = String(saved.signer_name || '').split(' ')[0]
  const jobs = [
    sendEmail(env, NOTIFY_EMAIL, `${issuer ? 'Countersigned' : 'Signed'}: ${saved.title} (${saved.client_name})`,
      `<p>${esc(name)}${!issuer && role_ ? `, ${esc(role_)}` : ''}${!issuer && details.signer_entity ? ` for ${esc(details.signer_entity)}` : ''} signed the ${esc(saved.title)} on ${esc(when)}.</p>
       <p>${fullySigned(saved) ? 'Both parties have now signed.' : issuer ? 'Waiting for the other party.' : 'It needs your countersignature: open the link with your own PIN.'}</p><p><a href="${link}">${link}</a></p>`),
  ]
  if (partyEmail && saved.signed_at && (!issuer || fullySigned(saved))) {
    jobs.push(sendEmail(env, partyEmail, fullySigned(saved) ? `Your signed ${saved.title}` : `We've received your signature: ${saved.title}`,
      `<p>Hi ${esc(partyFirst)},</p><p>${fullySigned(saved)
        ? `The ${esc(saved.title)} has now been signed by both parties (${esc(when)}).`
        : `Thanks for signing the ${esc(saved.title)} on ${esc(when)}. We'll countersign it and let you know.`} You can view or print the signed copy at any time here, using the same passcode:</p><p><a href="${link}">${link}</a></p><p>${countersigned(saved) ? 'The Bill Pal team<br>David Hooper Home Limited' : 'David Hooper<br>DH Website Services<br>01443 805303'}</p>`))
  }
  context.waitUntil(Promise.all(jobs))

  return agreementPage(saved, passcode, role)
}
