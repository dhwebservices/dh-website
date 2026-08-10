/**
 * Portfolio case study, rendered from a block document.
 *
 * Sections moved to src/blocks/types/pageBlocks.jsx unchanged; content to
 * src/blocks/documents/portfolio.js.
 */

import { useReveal } from '../hooks/useReveal'
import { usePageDocument } from '../hooks/usePageDocument'
import BlockRenderer from '../blocks/BlockRenderer'
import { PORTFOLIO_DOCUMENT } from '../blocks/documents/portfolio'

export default function Portfolio() {
  useReveal()
  const document = usePageDocument('portfolio', PORTFOLIO_DOCUMENT)

  return (
    <main style={{ paddingTop: 'var(--nav-h)' }}>
      <BlockRenderer document={document} />
    </main>
  )
}
