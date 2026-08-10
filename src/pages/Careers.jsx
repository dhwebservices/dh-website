/**
 * Careers, rendered from a block document.
 */

import { useReveal } from '../hooks/useReveal'
import { usePageDocument } from '../hooks/usePageDocument'
import BlockRenderer from '../blocks/BlockRenderer'
import { CAREERS_DOCUMENT } from '../blocks/documents/careers'

export default function Careers() {
  useReveal()
  const document = usePageDocument('careers', CAREERS_DOCUMENT)

  return (
    <main style={{ paddingTop: 'var(--nav-h)' }}>
      <BlockRenderer document={document} />
    </main>
  )
}
