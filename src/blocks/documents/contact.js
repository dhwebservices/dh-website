/**
 * The Contact page as a block document.
 *
 * One app block. Only the surrounding copy is editable - the form fields and
 * the emails it sends are wired to each other and stay in code.
 */

export const CONTACT_DOCUMENT = {
  version: 1,
  blocks: [
    {
      id: 'contact-main',
      type: 'app.contact',
      props: {
        eyebrow: 'Contact',
        heading: 'Start with a call\nor a brief.',
        intro: 'Book a free consultation, or send your project brief if you would rather skip the call first. Either way, you get a direct response and a clear next step.',
        emailEyebrow: 'Prefer email?',
        emailHeading: 'Send your brief.',
        successHeading: 'Thanks, {firstName}!',
        successBody: "We've received your enquiry and will respond within 24 hours with a clear next step.",
        geoEyebrow: 'Areas we work with',
        geoBody: 'Looking for a city-specific page first? Use the links below.',
      },
    },
  ],
}

export default CONTACT_DOCUMENT
