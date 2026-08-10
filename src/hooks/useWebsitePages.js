import { useEffect, useState } from 'react'
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../lib/siteConfig'

const PAGES_CACHE_KEY = 'dh:website_pages:v1'
let pagesCache = null
let pagesPromise = null

function readPagesCache() {
  if (pagesCache || typeof window === 'undefined') return pagesCache
  try {
    const raw = window.sessionStorage.getItem(PAGES_CACHE_KEY)
    pagesCache = raw ? JSON.parse(raw) : null
  } catch {
    pagesCache = null
  }
  return pagesCache
}

async function fetchWebsitePages() {
  if (pagesCache) return pagesCache
  if (!pagesPromise) {
    pagesPromise = fetch(
      `${SUPABASE_URL}/rest/v1/website_pages?active=eq.true&status=eq.published`
      // Explicit columns, not select=*: the wildcard includes `content`,
      // the unpublished draft, which anon is deliberately not granted.
      + '&select=id,slug,title,nav_label,summary,published_content,meta_description,show_in_nav,sort_order'
      + '&order=sort_order.asc.nullslast,created_at.asc',
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      }
    )
      .then((response) => response.json())
      .then((rows) => {
        pagesCache = Array.isArray(rows) ? rows : []
        if (typeof window !== 'undefined') {
          window.sessionStorage.setItem(PAGES_CACHE_KEY, JSON.stringify(pagesCache))
        }
        return pagesCache
      })
      .catch(() => [])
      .finally(() => {
        pagesPromise = null
      })
  }
  return pagesPromise
}

export function useWebsitePages(priority = false) {
  const [pages, setPages] = useState(readPagesCache() || [])
  const [loading, setLoading] = useState(!pagesCache)

  useEffect(() => {
    let active = true

    const run = async () => {
      const rows = await fetchWebsitePages()
      if (active) {
        setPages(rows)
        setLoading(false)
      }
    }

    if (pagesCache) {
      setLoading(false)
    } else if (priority) {
      run()
    } else {
      const canIdle = typeof window.requestIdleCallback === 'function'
      const schedule = canIdle
        ? window.requestIdleCallback(() => run(), { timeout: 1500 })
        : window.setTimeout(run, 300)

      return () => {
        active = false
        if (canIdle && typeof window.cancelIdleCallback === 'function') {
          window.cancelIdleCallback(schedule)
        } else {
          window.clearTimeout(schedule)
        }
      }
    }

    return () => {
      active = false
    }
  }, [priority])

  return { pages, loading }
}
