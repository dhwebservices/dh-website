/**
 * The link between this site and the editor in the staff portal.
 *
 * The editor loads the real site in an iframe with ?dh_edit=1, so what you edit
 * is genuinely the live page - same CSS, same fonts, same responsive rules -
 * rather than the editor's impression of it.
 *
 * Design rules:
 *  - Edit mode is off unless the URL says otherwise AND the parent frame speaks
 *    the protocol. A visitor who types ?dh_edit=1 gets the ordinary site.
 *  - Messages are only accepted from the portal's own origin.
 *  - Draft content is never fetched here. The portal already holds the draft and
 *    pushes it in, so drafts are never exposed to an anonymous reader.
 */

import { useSyncExternalStore, useCallback } from 'react'

const PORTAL_ORIGINS = [
  'https://staff.dhwebsiteservices.co.uk',
  'http://localhost:5173',
  'http://localhost:4173',
]

const PROTOCOL = 'dh-website-editor/v1'

const state = {
  isEditing: false,
  ready: false,
  selectedId: null,
  device: 'desktop',
  // slug -> { version, blocks[] } pushed from the editor
  documents: {},
}

/**
 * useSyncExternalStore compares snapshots with Object.is. Returning the mutable
 * `state` object meant the reference never changed, so React skipped every
 * re-render and the canvas sat there showing stale content while the editor
 * thought it had updated. The snapshot is rebuilt on each change instead.
 */
let currentSnapshot = { ...state }

const listeners = new Set()

function emit() {
  currentSnapshot = { ...state }
  listeners.forEach((listener) => listener())
}

function subscribe(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function snapshot() {
  return currentSnapshot
}

export function isEditRequested() {
  if (typeof window === 'undefined') return false
  return new URLSearchParams(window.location.search).has('dh_edit')
}

function post(type, payload) {
  if (typeof window === 'undefined' || window.parent === window) return
  window.parent.postMessage({ protocol: PROTOCOL, type, payload }, '*')
}

/**
 * Called once from App. Safe to call when not editing - it no-ops.
 */
export function initEditBridge() {
  if (typeof window === 'undefined') return
  if (!isEditRequested()) return
  if (window.parent === window) return // not framed: ignore the flag entirely

  window.addEventListener('message', (event) => {
    if (!PORTAL_ORIGINS.includes(event.origin)) return
    const message = event.data
    if (!message || message.protocol !== PROTOCOL) return

    switch (message.type) {
      case 'enable-edit':
        state.isEditing = true
        state.ready = true
        emit()
        break
      case 'set-document': {
        const { slug, document: doc } = message.payload || {}
        if (slug) {
          state.documents = { ...state.documents, [slug]: doc }
          emit()
        }
        break
      }
      case 'select-block':
        state.selectedId = message.payload?.blockId ?? null
        emit()
        break
      case 'scroll-to-block': {
        const target = document.querySelector(
          `[data-dh-block-id="${message.payload?.blockId}"]`,
        )
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' })
        break
      }
      default:
        break
    }
  })

  // Tell the portal we are alive and speaking the same protocol.
  post('hello', { href: window.location.pathname })
}

export function useEditMode() {
  const current = useSyncExternalStore(subscribe, snapshot, snapshot)

  const selectBlock = useCallback((blockId) => {
    state.selectedId = blockId
    emit()
    post('block-selected', { blockId })
  }, [])

  return {
    isEditing: current.isEditing,
    selectedId: current.selectedId,
    device: current.device,
    selectBlock,
  }
}

/**
 * The draft document the editor has pushed for this slug, if any.
 * Returns null everywhere except inside the editor, so production always falls
 * through to published content.
 */
export function useDraftDocument(slug) {
  const current = useSyncExternalStore(subscribe, snapshot, snapshot)
  if (!current.isEditing) return null
  return current.documents[slug] || null
}

export function reportBlockRects() {
  if (!state.isEditing) return
  const rects = Array.from(document.querySelectorAll('[data-dh-block-id]')).map((el) => {
    const rect = el.getBoundingClientRect()
    return {
      blockId: el.getAttribute('data-dh-block-id'),
      top: rect.top + window.scrollY,
      height: rect.height,
    }
  })
  post('block-rects', { rects })
}
