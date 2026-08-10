/**
 * Resolves which block document a page should render, in priority order:
 *
 *   1. the draft the portal editor has pushed in  (editing only)
 *   2. published_content from website_pages       (what visitors get)
 *   3. the document bundled with this build       (fallback)
 *
 * The bundled fallback is the important one. It means a page renders correctly
 * before anything has ever been published, and it means a database problem
 * degrades to "slightly out of date" rather than a blank homepage.
 *
 * Only published_content is ever fetched here. Drafts live behind RLS and are
 * pushed in by the editor, so an anonymous visitor cannot read unpublished
 * work by guessing a URL.
 */

import { useEffect, useState } from 'react'
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../lib/siteConfig'
import { useDraftDocument } from '../lib/editBridge'

const cache = new Map()

function isUsableDocument(doc) {
  return !!doc && Array.isArray(doc.blocks) && doc.blocks.length > 0
}

async function fetchPublished(slug) {
  if (cache.has(slug)) return cache.get(slug)

  const request = fetch(
    `${SUPABASE_URL}/rest/v1/website_pages`
      + `?slug=eq.${encodeURIComponent(slug)}&active=eq.true&status=eq.published`
      + '&select=published_content&limit=1',
    {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    },
  )
    .then((response) => (response.ok ? response.json() : []))
    .then((rows) => (Array.isArray(rows) ? rows[0]?.published_content : null) || null)
    .catch(() => null)

  cache.set(slug, request)
  return request
}

export function usePageDocument(slug, fallbackDocument) {
  const draft = useDraftDocument(slug)
  const [published, setPublished] = useState(null)

  useEffect(() => {
    let active = true
    fetchPublished(slug).then((doc) => {
      if (active && isUsableDocument(doc)) setPublished(doc)
    })
    return () => { active = false }
  }, [slug])

  if (isUsableDocument(draft)) return draft
  if (isUsableDocument(published)) return published
  return fallbackDocument
}
