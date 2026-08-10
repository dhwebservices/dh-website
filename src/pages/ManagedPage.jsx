/**
 * Pages created in the portal editor.
 *
 * Any slug not owned by a hardcoded route lands here and renders whatever
 * blocks the page has published. That is what makes "add a page" work: no
 * deploy, no route to write - publish it in the portal and the URL starts
 * working.
 *
 * Previously this rendered page.body as plain paragraphs, a column that no
 * longer exists, so it always fell through to Not Found.
 */

import { useParams } from 'react-router-dom'
import { useWebsitePages } from '../hooks/useWebsitePages'
import { useDraftDocument } from '../lib/editBridge'
import BlockRenderer from '../blocks/BlockRenderer'
import NotFound from './NotFound'

// Slugs owned by real routes. A managed page cannot shadow one of these, or it
// would silently take over a page that has its own code.
const RESERVED_SLUGS = new Set([
  '', 'services', 'about', 'partners', 'portfolio', 'pricing', 'calculator',
  'careers', 'contact', 'privacy', 'terms', 'services-terms', 'refunds',
  'cookies', 'acceptable-use', 'accessibility', 'security', 'complaints',
  'appointment', 'shop',
])

export default function ManagedPage() {
  const { slug } = useParams()
  const { pages, loading } = useWebsitePages(true)
  const draft = useDraftDocument(slug)

  if (!slug || RESERVED_SLUGS.has(slug)) return <NotFound />

  // A draft pushed by the editor wins, so a page can be built and previewed
  // before it has ever been published.
  if (draft?.blocks?.length) {
    return (
      <main style={{ paddingTop: 'var(--nav-h)' }}>
        <BlockRenderer document={draft} />
      </main>
    )
  }

  if (loading) {
    return (
      <main style={{ paddingTop: 'var(--nav-h)' }}>
        <section className="section">
          <div className="container section-narrow">
            <p className="body-md">Loading page…</p>
          </div>
        </section>
      </main>
    )
  }

  const page = pages.find((entry) => entry.slug === slug)
  const document = page?.published_content

  if (!page || !document?.blocks?.length) return <NotFound />

  return (
    <main style={{ paddingTop: 'var(--nav-h)' }}>
      <BlockRenderer document={document} />
    </main>
  )
}
