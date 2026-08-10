/**
 * Calculator, rendered from a block document.
 */

import { useReveal } from '../hooks/useReveal'
import { usePageDocument } from '../hooks/usePageDocument'
import BlockRenderer from '../blocks/BlockRenderer'
import { CALCULATOR_DOCUMENT } from '../blocks/documents/calculator'

export default function Calculator() {
  useReveal()
  const document = usePageDocument('calculator', CALCULATOR_DOCUMENT)

  return <BlockRenderer document={document} />
}
