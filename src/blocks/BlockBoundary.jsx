/**
 * Wraps a block so the portal editor can select it.
 *
 * The important property: in production this renders its children and nothing
 * else. No wrapper element, no attributes, no listeners, no layout change.
 * Editing chrome only exists when the page is open inside the editor, so a bug
 * in here can never reach a real visitor.
 */

import { useEditMode } from '../lib/editBridge'

export default function BlockBoundary({ blockId, blockType, index, children }) {
  const { isEditing, selectedId, selectBlock } = useEditMode()

  if (!isEditing) return children

  const selected = selectedId === blockId

  return (
    <div
      data-dh-block-id={blockId}
      data-dh-block-type={blockType}
      data-dh-block-index={index}
      className={`dh-block${selected ? ' dh-block--selected' : ''}`}
      onClick={(event) => {
        // Let a click land on the block itself rather than whatever link or
        // button happens to be under the cursor.
        event.preventDefault()
        event.stopPropagation()
        selectBlock(blockId)
      }}
    >
      {children}
      <span className="dh-block__label" aria-hidden="true">{blockType}</span>
    </div>
  )
}
