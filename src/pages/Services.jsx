/**
 * Services, rendered from a block document.
 *
 * The sections moved into src/blocks/types/pageBlocks.jsx with their markup
 * unchanged, and the content into src/blocks/documents/services.js.
 */

import { useReveal } from '../hooks/useReveal'
import { usePageDocument } from '../hooks/usePageDocument'
import BlockRenderer from '../blocks/BlockRenderer'
import { SERVICES_DOCUMENT } from '../blocks/documents/services'

export default function Services() {
  useReveal()
  const document = usePageDocument('services', SERVICES_DOCUMENT)

  return (
    <main style={{ paddingTop: 'var(--nav-h)' }}>
      <BlockRenderer document={document} />
    </main>
  )
}
