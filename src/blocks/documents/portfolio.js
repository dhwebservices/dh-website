/**
 * The Portfolio page as a block document.
 *
 * October 2026: leads with our own apps (shared with the homepage through
 * work.js), then the Glow With Lucy website as the web design example.
 */

import { WORK_ITEMS } from './work.js'

export const PORTFOLIO_DOCUMENT = {
  version: 1,
  blocks: [
    {
      id: 'portfolio-hero',
      type: 'page-hero',
      props: {
        eyebrow: 'Our work',
        heading: 'Apps and websites\nwe have shipped.',
        body: 'Go and look at them. Fish Tank is on both app stores, our staff portal and phone system run the business every day, and Fam & a Half, our family location app, is with Apple for review now.',
        maxWidth: 760,
        bodyMaxWidth: 560,
      },
    },

    {
      id: 'portfolio-work',
      type: 'work-showcase',
      props: {
        eyebrow: 'Apps',
        heading: 'Built and run by us.',
        body: 'We make our own products as well as client work. It is the quickest way to show what we can do, and it means we have dealt with app review, push notifications and live servers ourselves.',
        items: WORK_ITEMS,
      },
    },

    {
      id: 'portfolio-snapshot',
      type: 'project-snapshot',
      props: {
        heading: 'Web design: Glow With Lucy',
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
