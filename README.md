# DH Website Services — Public Website

Public marketing site for dhwebsiteservices.co.uk

## Stack
- React 18 + Vite
- React Router v6
- Cloudflare Pages (hosting)
- No external CSS frameworks

## Pages
- `/` — Home (hero, services preview, stats, health checker, CTA)
- `/services` — Full services breakdown
- `/pricing` — Build packages, hosting plans, HR system pricing
- `/careers` — Job listings & expression of interest form
- `/contact` — Contact form + details
- `/privacy`, `/terms`, `/cookies` etc — Legal pages

## Development
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```
Output: `dist/`

## Deploy
Connected to Cloudflare Pages. Push to `main` to deploy.
Build command: `npm run build`
Output directory: `dist`

## DNS (Cloudflare)
Point `dhwebsiteservices.co.uk` to Cloudflare Pages via CNAME.
