/**
 * Renders a block document: { version, blocks: [{ id, type, props }] }.
 *
 * Unknown block types are the case that matters. Content lives in the database
 * and the components live here, so a page can reference a block this build does
 * not have - after a rollback, or if the portal is ahead of the site. In the
 * editor that shows as a visible placeholder so it can be fixed; in production
 * it renders nothing at all rather than crashing the page.
 */

import { BLOCKS } from './registry'
import BlockBoundary from './BlockBoundary'
import { useEditMode } from '../lib/editBridge'

function UnknownBlock({ type }) {
  return (
    <section className="section">
      <div className="container">
        <div
          style={{
            border: '1px dashed var(--border)',
            borderRadius: 12,
            padding: 24,
            textAlign: 'center',
            color: 'var(--light)',
            fontFamily: 'var(--font-mono)',
            fontSize: 13,
          }}
        >
          Unknown block “{type}” — this page uses a block this site build does not have.
        </div>
      </div>
    </section>
  )
}

export default function BlockRenderer({ document: doc }) {
  const { isEditing } = useEditMode()
  const blocks = Array.isArray(doc?.blocks) ? doc.blocks : []

  return blocks.map((block, index) => {
    const definition = BLOCKS[block?.type]

    if (!definition) {
      // Silent in production, loud in the editor.
      return isEditing
        ? <UnknownBlock key={block?.id || index} type={block?.type} />
        : null
    }

    const Component = definition.component
    const props = { ...(definition.defaults || {}), ...(block.props || {}) }

    return (
      <BlockBoundary
        key={block.id || index}
        blockId={block.id}
        blockType={block.type}
        index={index}
      >
        <Component {...props} />
      </BlockBoundary>
    )
  })
}
