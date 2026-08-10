/**
 * The Calculator page as a block document.
 *
 * Prices live here so they can be changed without a deploy. The arithmetic
 * stays in the block.
 */

export const CALCULATOR_DOCUMENT = {
  version: 1,
  blocks: [
    {
      id: "calculator-main",
      type: "app.calculator",
      props: {
        eyebrow: "Project Calculator",
        heading: "Build your quote\nin real time.",
        intro: "Select what you need and see the price update instantly. No forms, no waiting — just transparency.",
        basePrice: 449,
        pageOptions: [
          {
            id: "pages5",
            label: "Up to 5 pages",
            cost: 0,
            desc: "Starter — from £449"
          },
          {
            id: "pages10",
            label: "Up to 10 pages",
            cost: 550,
            desc: "Growth — from £999"
          },
          {
            id: "pages15",
            label: "Up to 15 pages",
            cost: 1050,
            desc: "Pro — from £1,499"
          },
          {
            id: "pagesUnlimited",
            label: "Enterprise / Unlimited",
            cost: 2050,
            desc: "Enterprise + HR — from £2,499"
          }
        ],
        features: [
          {
            id: "blog",
            label: "Blog / News section",
            cost: 0,
            icon: "📰",
            group: "Content",
            note: "Included in Growth+"
          },
          {
            id: "gallery",
            label: "Photo gallery",
            cost: 99,
            icon: "🖼",
            group: "Content"
          },
          {
            id: "video",
            label: "Video embed / hero video",
            cost: 99,
            icon: "🎬",
            group: "Content"
          },
          {
            id: "booking",
            label: "Booking / appointment system",
            cost: 350,
            icon: "📅",
            group: "Business"
          },
          {
            id: "ecommerce",
            label: "E-commerce store",
            cost: 500,
            icon: "🛒",
            group: "Business",
            note: "Included in Pro+"
          },
          {
            id: "payments",
            label: "Online payments (Stripe)",
            cost: 199,
            icon: "💳",
            group: "Business"
          },
          {
            id: "members",
            label: "Members / login area",
            cost: 299,
            icon: "🔐",
            group: "Business"
          },
          {
            id: "livechat",
            label: "Live chat integration",
            cost: 79,
            icon: "💬",
            group: "Business"
          },
          {
            id: "seo",
            label: "Full SEO setup",
            cost: 0,
            icon: "🔍",
            group: "Marketing",
            note: "Included in Growth+"
          },
          {
            id: "analytics",
            label: "Google Analytics setup",
            cost: 0,
            icon: "📊",
            group: "Marketing",
            note: "Included in Growth+"
          },
          {
            id: "mailchimp",
            label: "Email marketing integration",
            cost: 149,
            icon: "📧",
            group: "Marketing"
          },
          {
            id: "social",
            label: "Social media links / feeds",
            cost: 79,
            icon: "📱",
            group: "Marketing"
          },
          {
            id: "multilang",
            label: "Multi-language support",
            cost: 399,
            icon: "🌍",
            group: "Technical"
          },
          {
            id: "hr",
            label: "HR portal integration",
            cost: 0,
            icon: "👥",
            group: "Technical",
            note: "Included in Enterprise"
          },
          {
            id: "crm",
            label: "CRM integration",
            cost: 299,
            icon: "🤝",
            group: "Technical"
          },
          {
            id: "api",
            label: "Custom API integration",
            cost: 399,
            icon: "⚡",
            group: "Technical"
          }
        ],
        designOptions: [
          {
            id: "template",
            label: "Template-based design",
            cost: 0,
            desc: "Clean, professional starter template"
          },
          {
            id: "custom",
            label: "Custom brand design",
            cost: 300,
            desc: "Bespoke design matching your brand guidelines"
          },
          {
            id: "rebrand",
            label: "Full rebrand + design",
            cost: 600,
            desc: "Logo, colours, typography and full identity"
          }
        ],
        hostingOptions: [
          {
            id: "none",
            label: "No hosting needed",
            cost: 0
          },
          {
            id: "starter",
            label: "Starter — £35/mo",
            cost: 35,
            desc: "1 update/mo, 48–72hr support"
          },
          {
            id: "professional",
            label: "Professional — £65/mo",
            cost: 65,
            desc: "3 updates/mo, priority support",
            badge: "Most Popular"
          },
          {
            id: "business",
            label: "Business — £109/mo",
            cost: 109,
            desc: "Unlimited updates, weekly tuning"
          }
        ],
        ctaLabel: "Book a free call →",
        ctaNote: "This is an estimate. Final price confirmed on your free call."
      }
    }
  ]
}

export default CALCULATOR_DOCUMENT
