const env = import.meta.env

export const SITE_URL = env.VITE_SITE_URL || 'https://www.dhwebsiteservices.co.uk'
export const WORKER_URL =
  env.VITE_WORKER_URL || 'https://dh-email-worker.aged-silence-66a7.workers.dev'
export const SUPABASE_URL =
  env.VITE_SUPABASE_URL || 'https://xtunnfdwltfesscmpove.supabase.co'
// Public (publishable) key: safe in the browser, can only reach what RLS allows.
export const SUPABASE_ANON_KEY =
  env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  'sb_publishable_EGqHepeD-Opey2OLrg-dmg_dCIjYmrt'

export const PLAUSIBLE_DOMAIN = env.VITE_PLAUSIBLE_DOMAIN || ''
export const GA_MEASUREMENT_ID = env.VITE_GA_MEASUREMENT_ID || ''
