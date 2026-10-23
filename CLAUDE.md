# DH Website Services: working on this site

This is the **live** marketing site, https://www.dhwebsiteservices.co.uk. A push to `main` deploys to production through Cloudflare Pages (project `dh-website`), so treat merging to `main` as publishing.

## The loop

1. Branch off `main`. Never commit straight to it.
2. Change it, then run `npm run build`. The build fails loudly if the prerender or the manifest breaks.
3. Push the branch. Cloudflare builds a preview at `https://<branch>.dh-website.pages.dev`.
4. Run `npm run smoke -- https://<branch>.dh-website.pages.dev`. It must report 0 failed.
5. Look at what you changed on the preview in a real browser, on a phone width too. A passing build doesn't prove a page looks right.
6. Only merge to `main` once David says yes. Then run `npm run smoke` against production.

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Vite dev server. Pages Functions (`functions/`) don't run here. |
| `npm run build` | block manifest → Vite → prerendered HTML, sitemap, `_redirects`, `llms.txt`, `404.html` |
| `npm run smoke [-- <url>]` | Read-only check of a deployed copy: every sitemap page, canonicals, soft 404s, SPA deep links, robots, manifest |

## Where things live

- `src/blocks/documents/*.js`: the bundled page content (home, services, pricing…). The portal editor can override a page by publishing to Supabase `website_pages.published_content`; the bundled document is the fallback (`src/hooks/usePageDocument.js`).
- `src/blocks/documents/work.js`: our products and the team. **Status lines must stay literally true** (see the comment at the top).
- `src/lib/seoContent.js`: titles, descriptions, prerendered page text, the city pages (`GEO_MARKETS`), FAQs and JSON-LD. `scripts/generate-static-seo.mjs` turns these into static HTML, the sitemap and `llms.txt`.
- `src/lib/articles.js`: the guides and case studies. `src/lib/legalContent.js`: the legal pages.
- `functions/`: Pages Functions (booking, proposals, agreements, shop/Stripe, Jack's checklist).
- `public/`: copied as-is. `public/block-manifest.json` is generated; don't edit it by hand.

## Traps that have bitten this site

- **Pages serves `404.html` before the SPA fallback.** Any new client-side route with a path segment (`/thing/:id`) needs a matching `functions/thing/[id].js` that returns `/index.html`, in the same change. Dev mode hides this; `npm run smoke` against a preview catches it.
- **A dynamic segment must be a whole path segment** in React Router v6 (`/web-design-:city` never matches). Generate explicit routes, like `GEO_PAGES`.
- **Trailing slashes.** Pages serves `/security/`, so never look things up by raw `pathname`; normalise it or pass the key as a prop.
- **New lazy pages go in `PAGES_BY_SEGMENT` / `preloadRoute()` in `src/App.jsx`.** Otherwise a direct visit shows "Loading…" and the footer jumps (Lighthouse CLS 0.77).
- **The apex `dhwebsiteservices.co.uk` returns 200, not a 301 to www.** Fix it with a Cloudflare redirect rule, not code: a root `_middleware.js` would run a Function on every asset request.

## Rules

- **Facts stay true.** Phone 01443 805303 only. Based in Pontypridd, serving Cardiff and Wales; city pages never claim an office there. Prices come from `SITE_FAQS` and the pricing document; don't invent new ones.
- **The repo is public.** Never commit client data, proposal pricing, passcodes or keys. Proposals live in the `PROPOSALS_JSON` Pages secret. The Supabase anon key in `src/lib/siteConfig.js` is public by design; the service-role key never goes in this repo.
- **Don't write to the shared Supabase project** (`xtunnfdwltfesscmpove`) from here. The staff portal owns that data.
- `/proposal/` stays disallowed in `robots.txt`, and `/jack/` stays noindex and unlinked.
- Match the surrounding code: inline styles in components, CSS tokens in `src/index.css`, and comments that explain *why*.
