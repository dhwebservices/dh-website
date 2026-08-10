/**
 * The homepage, rendered from a block document.
 *
 * The sections are the same ones this file used to hold inline - they have
 * moved into src/blocks/types/homeBlocks.jsx with their markup unchanged, and
 * their content into src/blocks/documents/home.js. What renders should be
 * identical; the difference is that it can now be edited from the portal.
 *
 * The previous version is kept as Home.legacy.jsx.bak until the two have been
 * compared side by side at every breakpoint.
 */

import { useReveal } from '../hooks/useReveal'
import { usePageDocument } from '../hooks/usePageDocument'
import BlockRenderer from '../blocks/BlockRenderer'
import { HOME_DOCUMENT } from '../blocks/documents/home'

export default function Home() {
  useReveal()
  const document = usePageDocument('home', HOME_DOCUMENT)

  return (
    <main>
      <BlockRenderer document={document} />
    </main>
  )
}
