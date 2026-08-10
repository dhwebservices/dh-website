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
        eyebrow: 'Featured project',
        heading: 'Glow With Lucy',
        body: 'A cleaner, softer web presence for a candle business that needed to feel more polished, giftable, and commercially credible.',
        primaryLabel: 'Visit site',
        primaryHref: 'https://glowwithlucy.co.uk',
        secondaryLabel: 'Book a project call',
        secondaryHref: '/contact',
        note: 'The goal was to give the brand a better-quality home online without overcomplicating it, so the business feels more established from the first click.',
        image: '/glow-with-lucy-logo.png',
        imageAlt: 'Glow With Lucy logo',
      },
    },

    {
      id: 'portfolio-snapshot',
      type: 'project-snapshot',
      props: {
        heading: 'Project snapshot',
        body: 'Glow With Lucy needed a site that felt more like a considered brand than a starter storefront. The aim was to support trust, gifting appeal, and future growth without losing the softness of the product.',
        rows: [
          { label: 'Client', value: 'Glow With Lucy' },
          { label: 'Sector', value: 'Candle business / lifestyle retail' },
          { label: 'Domain', value: 'GlowWithLucy.co.uk' },
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
        heading: 'A neater brand experience with room to grow.',
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
            description: 'The experience is designed to stay tidy and readable on smaller screens, where social traffic and gift-led browsing often start.',
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
        eyebrow: 'Featured domain',
        heading: 'GlowWithLucy.co.uk',
        body: 'The live site gives the business a cleaner home for its brand story and product direction, with a stronger base for direct traffic than relying on social alone.',
        linkLabel: 'Open live website',
        linkHref: 'https://glowwithlucy.co.uk',
        linkCaption: 'glowwithlucy.co.uk',
        ctaLabel: 'Want something like this?',
        ctaHref: '/contact',
      },
    },
  ],
}

export default PORTFOLIO_DOCUMENT
