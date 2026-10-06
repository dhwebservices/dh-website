/**
 * The About page as a block document.
 *
 * October 2026: written as the team. The people are in work.js so the
 * homepage and this page cannot disagree. The closing CTA reuses the
 * homepage block at a smaller scale.
 */

import { TEAM_PEOPLE } from './work.js'

export const ABOUT_DOCUMENT = {
  version: 1,
  blocks: [
    {
      id: "about-hero",
      type: "about-hero",
      props: {
        eyebrow: "About",
        heading: "A small team.\nApps and websites.",
        lead: "DH Website Services is a small app and web studio based in Pontypridd, serving Cardiff and south Wales. You deal directly with the people who build your project.",
        body: "We build iPhone and Android apps and design websites for businesses across Wales and the UK, and we run our own apps too. Fixed prices, straight answers, and we are still here after launch.",
        primaryLabel: "Start a project →",
        primaryHref: "/contact",
        secondaryLabel: "See the work",
        secondaryHref: "/portfolio",
        initials: "DH",
        name: "DH Website Services",
        role: "David Hooper Home Limited · Co. No. 17018784",
        cardParagraphs: [
          "David started DH Website Services after seeing small businesses in Wales pay agency prices for template work, then get handed to someone who did not understand their business.",
          "So we keep it short: the people who scope your project are the people who build it and look after it afterwards. No layers between you and the work."
        ],
        contacts: [
          {
            kind: "email",
            href: "mailto:clients@dhwebsiteservices.co.uk",
            label: "clients@dhwebsiteservices.co.uk"
          },
          {
            kind: "phone",
            href: "tel:+441443805303",
            label: "01443 805303"
          },
          {
            kind: "phone",
            href: "tel:07364166285",
            label: "07364 166285"
          }
        ]
      }
    },
    {
      id: "about-team",
      type: "team",
      props: {
        eyebrow: "The team",
        heading: "Who you will\ndeal with.",
        body: "Two names to remember. David Hooper builds, Jack Deane keeps everything moving. You can ring either of them directly.",
        people: TEAM_PEOPLE,
        background: "var(--white)"
      }
    },
    {
      id: "about-values",
      type: "values-grid",
      props: {
        eyebrow: "How we work",
        heading: "What you can expect.",
        items: [
          {
            title: "Fixed price",
            desc: "We quote before starting. That is what you pay."
          },
          {
            title: "People you know",
            desc: "You deal with David Hooper and Jack Deane by name, not a ticket queue."
          },
          {
            title: "You own it",
            desc: "When it is done, you get the code, the files and the store listings. Take them anywhere."
          },
          {
            title: "Built to work",
            desc: "We are not chasing design awards. Apps and sites are built to be used."
          },
          {
            title: "Quick replies",
            desc: "Usually the same day. If something will take longer, we tell you."
          },
          {
            title: "Based in Pontypridd",
            desc: "Based in Pontypridd. We meet clients across Cardiff and south Wales and work with businesses anywhere in the UK."
          }
        ]
      }
    },
    {
      id: "about-cta",
      type: "closing-cta",
      props: {
        eyebrow: "Ready to work together?",
        heading: "Let us build something that works.",
        body: "Free 15 minute call. Clear plan. Fixed price. No obligation.",
        primaryLabel: "Book a free call →",
        primaryHref: "/contact",
        secondaryLabel: "See pricing",
        secondaryHref: "/pricing",
        assurances: [],
        maxWidth: 600,
        headingSize: "clamp(32px,4vw,52px)",
        bodySize: 16,
        bodyGap: 36
      }
    }
  ]
}

export default ABOUT_DOCUMENT
