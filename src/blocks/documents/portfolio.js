/**
 * The Portfolio case study as a block document.
 *
 * Transcribed from what Portfolio.jsx renders, with one deliberate correction:
 * the live page shows literal backticks around `.co.uk`, markdown that never
 * became markup. Those are removed here, so this page is two characters
 * shorter than the live one by design.
 */

export const PORTFOLIO_DOCUMENT = {
  version: 1,
  blocks: [
    {
      id: 'portfolio-hero',
      type: 'case-study-hero',
      props: {
        eyebrow: 'On Google Play',
        heading: 'Fish Tank',
        body: 'A multiplayer game for iOS and Android. Cross-platform play, friends, leaderboards and push notifications, running on servers I built and maintain.',
        primaryLabel: 'Download it on Google Play',
        primaryHref: 'https://play.google.com/store/search?q=fish%20tank%20dh&c=apps',
        secondaryLabel: 'Talk about your project',
        secondaryHref: '/contact',
        note: 'Worth downloading before you decide whether to hire me. It is the quickest way to see the standard of the work rather than read about it.',
        image: '/dh-logo-icon.png',
        imageAlt: 'Fish Tank',
      },
    },

    {
      id: 'portfolio-snapshot',
      type: 'project-snapshot',
      props: {
        heading: 'Project snapshot',
        body: 'Glow With Lucy needed a site that felt more like a considered brand than a starter storefront. The aim was to support trust, gifting appeal, and future growth without losing the softness of the product.',
        rows: [
          { label: 'Project', value: 'Glow With Lucy' },
          { label: 'Sector', value: 'Candle business / lifestyle retail' },
          { label: 'Built in', value: '7 days' },
          { label: 'Scope', value: 'Brand-led marketing website and product showcase' },
        ],
        impactEyebrow: 'Why it works',
        impact: [
          'Sharper positioning for a handmade candle brand',
          'A proper web presence for Instagram traffic, referrals, and direct enquiries',
          'A stronger base for later catalogue, gifting, and e-commerce growth',
        ],
      },
    },

    {
      id: 'portfolio-deliverables',
      type: 'deliverables',
      props: {
        eyebrow: 'What changed',
        heading: 'A tidier shopfront with room to grow.',
        body: 'The build direction focuses on visual calm, product credibility, and a structure that can later expand into richer catalogue and campaign work without having to start over.',
        items: [
          {
            icon: 'spark',
            title: 'Softer premium presentation',
            description: 'The layout leans into calm spacing, warm neutrals, and a more considered brand feel so the site reads as polished rather than homemade in the wrong way.',
          },
          {
            icon: 'device',
            title: 'Clean mobile browsing',
            description: 'Designed to stay tidy and readable on smaller screens, where social traffic and gift-led browsing often start.',
          },
          {
            icon: 'domain',
            title: 'Direct-brand credibility',
            description: 'A branded .co.uk site gives the business a stronger home for direct traffic than relying only on marketplaces or social platforms.',
          },
        ],
      },
    },

    {
      id: 'portfolio-domain',
      type: 'domain-feature',
      props: {
        eyebrow: 'Also built',
        heading: 'Glow With Lucy',
        body: 'An online shop for a candle business, built in seven days. Product pages, checkout and a brand that reads as established rather than improvised.',
        linkLabel: '',
        linkHref: '',
        linkCaption: 'Built in 7 days',
        ctaLabel: 'Want something like this?',
        ctaHref: '/contact',
      },
    },
  ],
}

export default PORTFOLIO_DOCUMENT
