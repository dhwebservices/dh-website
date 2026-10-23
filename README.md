# DH Website Services: public website

The marketing site for https://www.dhwebsiteservices.co.uk: apps and web design from Pontypridd.

**Stack:** React 18, Vite, React Router v6, Cloudflare Pages + Pages Functions, Supabase (read-only content), no CSS framework.

```bash
npm install
npm run dev      # local dev server (Pages Functions don't run here)
npm run build    # writes dist/: app, prerendered pages, sitemap, llms.txt
npm run smoke    # checks production; add `-- <preview url>` to check a branch
```

**Deploy:** pushing to `main` deploys to production. Every other branch gets a preview at `https://<branch>.dh-website-djh.pages.dev`. Build command `npm run build`, output `dist`.

Read [CLAUDE.md](CLAUDE.md) before changing anything. It covers where the content lives, the release loop, and the Cloudflare Pages traps this site has already hit.
