/**
 * Partners, rendered from a block document.
 */

import { useReveal } from '../hooks/useReveal'
import { usePageDocument } from '../hooks/usePageDocument'
import BlockRenderer from '../blocks/BlockRenderer'
import { PARTNERS_DOCUMENT } from '../blocks/documents/partners'

export default function Partners() {
  useReveal()
  const document = usePageDocument('partners', PARTNERS_DOCUMENT)

  return (
    <main>
      <BlockRenderer document={document} />
    </main>
  )
}
