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
        heading: 'Send us\na few lines.',
        intro: 'Tell us your business and what you need. We reply the same working day with a plan and a price. Rather talk? Ring 01443 805303 or book a call below.',
        emailEyebrow: 'Message us',
        emailHeading: 'What do you need?',
        successHeading: 'Thanks, {firstName}!',
        successBody: "We've got your message and will reply the same working day with a plan and a price.",
        geoEyebrow: 'Areas we work with',
        geoBody: 'Looking for a city-specific page first? Use the links below.',
      },
    },
  ],
}

export default CONTACT_DOCUMENT
