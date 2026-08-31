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
          { title: 'Fast review', desc: 'I read every application myself and reply by email or phone either way.' },
          { title: 'Built for clarity', desc: 'Role detail, application steps, and expectations are visible before you apply.' },
          { title: 'Human process', desc: 'A conversation and a practical task. No four-stage panel for a small business job.' },
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
        emptyBody: 'Nothing open in this filter right now.',
      },
    },
  ],
}

export default CAREERS_DOCUMENT
