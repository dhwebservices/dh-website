import { useEffect, useState } from 'react'
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../lib/siteConfig'

export function useWebsitePages() {
  const [pages, setPages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    const fetchPages = async () => {
      try {
        const response = await fetch(
          `${SUPABASE_URL}/rest/v1/website_pages?active=eq.true&select=*&order=sort_order.asc.nullslast,created_at.asc`,
          {
            headers: {
              apikey: SUPABASE_ANON_KEY,
              Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            },
          }
        )
        const rows = await response.json()
        if (active) setPages(Array.isArray(rows) ? rows : [])
      } catch {
        if (active) setPages([])
      }
      if (active) setLoading(false)
    }

    fetchPages()
    return () => {
      active = false
    }
  }, [])

  return { pages, loading }
}
