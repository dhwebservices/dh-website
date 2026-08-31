import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { INDEXABLE_PAGES, GEO_REDIRECTS, SITE_FAQS, FAQ_SCHEMA, SEO_SITE_URL, withTrailingSlash } from '../src/lib/seoContent.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')
const distDir = path.join(rootDir, 'dist')
const ogImageUrl = `${SEO_SITE_URL}/og-image.svg`

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

/**
 * The questions, as readable content rather than only as markup.
 *
 * Pages were shipping a few hundred characters of prerendered text, which is
 * thin for a business selling websites. These are on every page: they are
 * genuinely what a buyer wants to know, and the answers carry the facts --
 * prices, days, ownership -- that the rest of the page asserts.
 */
function faqHtml(page) {
  if (['/privacy', '/terms', '/services-terms', '/refunds', '/cookies'].includes(page.path)) return ''
  const items = SITE_FAQS.map((item) => `
    <article style="padding:22px 0;border-top:1px solid var(--border-light)">
      <h2 style="font-size:17px;font-weight:600;letter-spacing:-0.01em;margin:0 0 8px">${escapeHtml(item.q)}</h2>
      <p class="body-sm" style="font-size:15px;line-height:1.75;margin:0">${escapeHtml(item.a)}</p>
    </article>
  `).join('')
  return `
    <section class="section" style="padding-top:0">
      <div class="container" style="max-width:760px">
        <p class="eyebrow" style="margin-bottom:18px">Common questions</p>
        ${items}
      </div>
    </section>
  `
}

function pageContent(page) {
  const eyebrow = page.city
    ? `${page.city} ${page.intentLabel.toLowerCase()}`
    : page.path === '/website-builder'
      ? 'Website builder UK'
      : 'DH Website Services'
  const sections = page.sections
    .map(
      (section) => `
        <article class="glass-card" style="padding:28px clamp(22px,3vw,32px);border-radius:20px">
          <p style="font-family:var(--font-mono);font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:var(--light);margin:0 0 14px">${escapeHtml(section.title)}</p>
          <p class="body-sm" style="font-size:15px;line-height:1.75;margin:0">${escapeHtml(section.body)}</p>
        </article>
      `,
    )
    .join('')

  return `
    <main style="padding-top:var(--nav-h)">
      <section class="section">
        <div class="container" style="max-width:860px">
          <p class="eyebrow" style="margin-bottom:16px">${escapeHtml(eyebrow)}</p>
          <h1 style="font-family:var(--font-sans);font-size:clamp(40px,6vw,78px);font-weight:600;letter-spacing:-0.03em;line-height:1.02;margin:0 0 20px">${escapeHtml(page.heading)}</h1>
          <p class="body-lg" style="max-width:720px;margin:0 0 32px">${escapeHtml(page.intro)}</p>
          <div style="display:flex;gap:12px;flex-wrap:wrap">
            <a href="${page.ctaHref}" class="btn-primary">${escapeHtml(page.ctaLabel)} <span style="opacity:0.7">→</span></a>
            <a href="/services" class="btn-secondary">View services</a>
          </div>
        </div>
      </section>
      <section class="section" style="padding-top:0">
        <div class="container pricing-grid-two" style="gap:20px;align-items:start">
          ${sections}
        </div>
      </section>
      ${faqHtml(page)}
    </main>
  `
}

function buildHtml(page, assetTags) {
  // FAQ schema only on the pages where the questions are actually answered,
  // because marking up content that is not on the page is exactly what
  // Google's structured-data guidelines forbid.
  const wantsFaq = ['/', '/pricing', '/services'].includes(page.path)
  const schema = page.schema
    ? `<script type="application/ld+json">${JSON.stringify(page.schema)}</script>`
      + (wantsFaq ? `<script type="application/ld+json">${JSON.stringify(FAQ_SCHEMA)}</script>` : '')
    : ''

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(page.title)}</title>
    <meta name="description" content="${escapeHtml(page.description)}" />
    <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
    <meta property="og:type" content="${page.path === '/' ? 'website' : 'article'}" />
    <meta property="og:site_name" content="DH Website Services" />
    <meta property="og:title" content="${escapeHtml(page.title)}" />
    <meta property="og:description" content="${escapeHtml(page.description)}" />
    <meta property="og:url" content="${SEO_SITE_URL}${withTrailingSlash(page.path)}" />
    <meta property="og:image" content="${ogImageUrl}" />
    <meta property="og:image:alt" content="${escapeHtml(page.title)} - DH Website Services" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(page.title)}" />
    <meta name="twitter:description" content="${escapeHtml(page.description)}" />
    <meta name="twitter:image" content="${ogImageUrl}" />
    <meta name="theme-color" content="#FFFFFF" />
    <link rel="icon" href="/dh-logo-icon.png" />
    <link rel="canonical" href="${SEO_SITE_URL}${withTrailingSlash(page.path)}" />
    ${assetTags.styles}
    ${schema}
  </head>
  <body>
    <div id="root">${pageContent(page)}</div>
    ${assetTags.scripts}
  </body>
</html>`
}

async function extractAssetTags() {
  const builtIndexPath = path.join(distDir, 'index.html')
  const builtIndex = await fs.readFile(builtIndexPath, 'utf8')
  const styles = [...builtIndex.matchAll(/<link rel="stylesheet"[^>]*href="[^"]+"[^>]*>/g)]
    .map((match) => match[0])
    .join('\n    ')
  const scripts = [...builtIndex.matchAll(/<script type="module"[^>]*src="[^"]+"[^>]*><\/script>/g)]
    .map((match) => match[0])
    .join('\n    ')

  return { styles, scripts }
}

async function writeRoutePage(page, assetTags) {
  const targetPath = page.path === '/'
    ? path.join(distDir, 'index.html')
    : path.join(distDir, page.path.replace(/^\//, ''), 'index.html')

  await fs.mkdir(path.dirname(targetPath), { recursive: true })
  await fs.writeFile(targetPath, buildHtml(page, assetTags), 'utf8')
}

async function writeLlmFiles() {
  const llms = [
    '# DH Website Services',
    '',
    'Production-ready website development for UK businesses.',
    '',
    'Key public pages:',
    ...INDEXABLE_PAGES.map((page) => `- ${SEO_SITE_URL}${withTrailingSlash(page.path)} | ${page.title}`),
    '',
    'Primary offer:',
    '- Custom websites, landing pages, booking systems, technical SEO, and founder-led delivery.',
    '',
    'Primary contact:',
    '- https://www.dhwebsiteservices.co.uk/contact',
  ].join('\n')

  const llmsFull = INDEXABLE_PAGES.map((page) => {
    const sections = page.sections.map((section) => `- ${section.title}: ${section.body}`).join('\n')
    return [
      `## ${page.title}`,
      `URL: ${SEO_SITE_URL}${withTrailingSlash(page.path)}`,
      `Description: ${page.description}`,
      `Summary: ${page.intro}`,
      sections,
      `CTA: ${SEO_SITE_URL}${page.ctaHref}`,
    ].join('\n')
  }).join('\n\n')

  await fs.writeFile(path.join(distDir, 'llms.txt'), llms, 'utf8')
  await fs.writeFile(path.join(distDir, 'llms-full.txt'), llmsFull, 'utf8')
}

async function write404Page(assetTags) {
  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Page not found | DH Website Services</title>
    <meta name="robots" content="noindex,nofollow" />
    ${assetTags.styles}
  </head>
  <body>
    <main style="padding:140px 20px 80px;min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center">
      <div>
        <p style="font-family:var(--font-mono);font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:var(--light);margin:0 0 16px">404</p>
        <h1 style="font-size:48px;font-weight:600;letter-spacing:-0.03em;margin:0 0 16px">Page not found</h1>
        <p class="body-md" style="margin:0 0 32px">The page you requested could not be found.</p>
        <a href="/" class="btn-primary">Go home →</a>
      </div>
    </main>
    ${assetTags.scripts}
  </body>
</html>`

  await fs.writeFile(path.join(distDir, '404.html'), html, 'utf8')
}

async function main() {
  const assetTags = await extractAssetTags()
  await Promise.all(INDEXABLE_PAGES.map((page) => writeRoutePage(page, assetTags)))
  await writeLlmFiles()
  await write404Page(assetTags)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})


/**
 * The sitemap, from the same list the pages are built from.
 *
 * It was a hand-written file in public/, and it had drifted: it advertised
 * fifteen geo URLs after the code stopped generating them. A sitemap that
 * promises pages which no longer exist is worse than no sitemap.
 */
async function writeSitemap() {
  const today = new Date().toISOString().slice(0, 10)
  const urls = INDEXABLE_PAGES.map((page) => {
    const loc = `${SEO_SITE_URL}${withTrailingSlash(page.path)}`
    const priority = page.path === '/' ? '1.0' : page.city ? '0.7' : '0.8'
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${priority}</priority>\n  </url>`
  }).join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
  await fs.writeFile(path.join(distDir, 'sitemap.xml'), xml, 'utf8')
  return INDEXABLE_PAGES.length
}

/**
 * Redirects, likewise generated.
 *
 * Includes the apex-to-www rule, which was missing entirely: both hostnames
 * were serving 200 for every page, so the site was competing with itself for
 * its own rankings.
 */
async function writeRedirects() {
  const lines = [
    '# Generated by scripts/generate-static-seo.mjs. Do not edit by hand.',
    '',
    '# One canonical hostname. Without this both the apex and www answer 200',
    '# for every URL and the ranking signal is split between them.',
    'https://dhwebsiteservices.co.uk/* https://www.dhwebsiteservices.co.uk/:splat 301!',
    '',
    '# Retired pages, pointing at whatever replaced them.',
    ...GEO_REDIRECTS.map(([from, to]) => `${from} ${to} 301`),
    '',
    '# SPA fallback. Must stay last.',
    '/* /index.html 200',
    '',
  ]
  await fs.writeFile(path.join(distDir, '_redirects'), lines.join('\n'), 'utf8')
  return GEO_REDIRECTS.length
}

const urlCount = await writeSitemap()
const redirectCount = await writeRedirects()
console.log(`sitemap: ${urlCount} urls, _redirects: ${redirectCount} redirects + apex canonical`)
