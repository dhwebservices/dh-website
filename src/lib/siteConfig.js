const env = import.meta.env

export const SITE_URL = env.VITE_SITE_URL || 'https://dhwebsiteservices.co.uk'
export const WORKER_URL =
  env.VITE_WORKER_URL || 'https://dh-email-worker.aged-silence-66a7.workers.dev'
export const SUPABASE_URL =
  env.VITE_SUPABASE_URL || 'https://xtunnfdwltfesscmpove.supabase.co'
export const SUPABASE_ANON_KEY =
  env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0dW5uZmR3bHRmZXNzY21wb3ZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1MDkyNzAsImV4cCI6MjA4OTA4NTI3MH0.MaNZGpdSrn5kSTmf3kR87WCK_ga5Meze0ZvlZDkIjfM'

export const PLAUSIBLE_DOMAIN = env.VITE_PLAUSIBLE_DOMAIN || ''
export const GA_MEASUREMENT_ID = env.VITE_GA_MEASUREMENT_ID || ''
