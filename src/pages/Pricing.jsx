/**
 * Pricing, rendered from a block document.
 *
 * Sections moved to src/blocks/types/pageBlocks.jsx unchanged; content to
 * src/blocks/documents/pricing.js.
 */

import { useReveal } from '../hooks/useReveal'
import { usePageDocument } from '../hooks/usePageDocument'
import BlockRenderer from '../blocks/BlockRenderer'
import { PRICING_DOCUMENT } from '../blocks/documents/pricing'

export default function Pricing() {
  useReveal()
  const document = usePageDocument('pricing', PRICING_DOCUMENT)

  return (
    <main style={{ paddingTop: 'var(--nav-h)' }}>
      <BlockRenderer document={document} />
    </main>
  )
}
