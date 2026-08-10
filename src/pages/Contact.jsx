/**
 * Contact, rendered from a block document.
 *
 * No <main> here: the contact block owns it, because its className depends on
 * the ?mode= parameter it reads.
 */

import { useReveal } from '../hooks/useReveal'
import { usePageDocument } from '../hooks/usePageDocument'
import BlockRenderer from '../blocks/BlockRenderer'
import { CONTACT_DOCUMENT } from '../blocks/documents/contact'

export default function Contact() {
  useReveal()
  const document = usePageDocument('contact', CONTACT_DOCUMENT)

  return <BlockRenderer document={document} />
}
