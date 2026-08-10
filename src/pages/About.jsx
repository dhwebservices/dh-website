/**
 * About, rendered from a block document.
 */

import { useReveal } from '../hooks/useReveal'
import { usePageDocument } from '../hooks/usePageDocument'
import BlockRenderer from '../blocks/BlockRenderer'
import { ABOUT_DOCUMENT } from '../blocks/documents/about'

export default function About() {
  useReveal()
  const document = usePageDocument('about', ABOUT_DOCUMENT)

  return (
    <main style={{ paddingTop: 'var(--nav-h)' }}>
      <BlockRenderer document={document} />
    </main>
  )
}
