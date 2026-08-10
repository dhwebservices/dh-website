/**
 * The Careers page as a block document.
 *
 * One app block: the vacancy list is live data from the recruitment system,
 * the copy around it is editable.
 */

export const CAREERS_DOCUMENT = {
  version: 1,
  blocks: [
    {
      id: 'careers-main',
      type: 'app.careers',
      props: {
        eyebrow: 'Careers',
        heading: 'Join the team\nbuilding with us.',
        body: 'Explore live roles at DH Website Services and apply directly here with your CV, optional cover letter, experience summary, and screening responses.',
        infoRows: [
          { title: 'Live vacancies', desc: 'Every role shown here is open for direct application through this careers page.' },
          { title: 'Fast review', desc: 'Our hiring team reviews applications directly and contacts shortlisted candidates by email or phone.' },
          { title: 'Built for clarity', desc: 'Role detail, application steps, and expectations are visible before you apply.' },
          { title: 'Human process', desc: 'We keep the process practical and avoid long, unclear hiring loops.' },
        ],
        essentialsLabel: 'Application essentials',
        essentials: [
          'Upload your CV',
          'Add an optional cover letter or cover note',
          'Complete role-specific questions',
          'Confirm commission-only terms where required',
          'Receive a confirmation email after applying',
        ],
        listingHeading: 'Open positions',
        allLabel: 'All departments',
        loadingLabel: 'Loading careers...',
        emptyHeading: 'No live roles right now',
        emptyBody: 'We do not have an open vacancy in this filter at the moment. Please check back soon.',
      },
    },
  ],
}

export default CAREERS_DOCUMENT
