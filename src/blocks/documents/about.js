/**
 * The About page as a block document.
 *
 * Transcribed from About.jsx. The closing CTA reuses the homepage block at a
 * smaller scale rather than duplicating it.
 */

export const ABOUT_DOCUMENT = {
  version: 1,
  blocks: [
    {
      id: "about-hero",
      type: "about-hero",
      props: {
        eyebrow: "About us",
        heading: "Small team.\nSerious work.",
        lead: "DH Website Services is a Cardiff-based web agency built around one principle — your website should work as hard as you do.",
        body: "We build production-ready websites, booking systems, and lead-generation experiences for SMEs across Wales and the UK. Fixed prices, direct communication, and no disappearing acts after launch.",
        primaryLabel: "Start a project →",
        primaryHref: "/contact",
        secondaryLabel: "See our work",
        secondaryHref: "/portfolio",
        initials: "DH",
        name: "David Hooper",
        role: "Founder & Director — Cardiff, Wales",
        cardParagraphs: [
          "I started DH Website Services because I kept seeing small businesses in Wales paying agency prices for template work, then getting handed off to junior staff who did not understand their business.",
          "When you work with us, you work with me. I scope the project, I build it, and I support it after launch. No layers, no surprises, and no blurred line between sales and delivery."
        ],
        contacts: [
          {
            kind: "email",
            href: "mailto:clients@dhwebsiteservices.co.uk",
            label: "clients@dhwebsiteservices.co.uk"
          },
          {
            kind: "phone",
            href: "tel:02920024218",
            label: "029 2002 4218"
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
      id: "about-values",
      type: "values-grid",
      props: {
        eyebrow: "How we work",
        heading: "What you can expect.",
        items: [
          {
            title: "Fixed price",
            desc: "I quote before starting. That is what you pay. No extras."
          },
          {
            title: "Just me",
            desc: "You email me. I reply. No team to go through."
          },
          {
            title: "You own it",
            desc: "When it is done, you get all the files. Host it anywhere."
          },
          {
            title: "Built to work",
            desc: "Not trying to win design awards. Built to get you customers."
          },
          {
            title: "Quick replies",
            desc: "Usually same day. If it will take longer, I will tell you."
          },
          {
            title: "Cardiff-based",
            desc: "Working from Wales. Happy to work with clients anywhere in UK."
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
