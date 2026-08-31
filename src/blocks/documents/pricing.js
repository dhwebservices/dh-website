/**
 * The Pricing page as a block document.
 *
 * The build packages, hosting plans and FAQ are taken from the useCMS
 * defaults, because that is what the live page renders - the BUILDS, HOSTING
 * and FAQS constants in Pricing.jsx are shadowed by them and never appear.
 * The HR plans are local to the page and are taken from there.
 */

export const PRICING_DOCUMENT = {
  version: 1,
  blocks: [
    {
      id: "pricing-hero",
      type: "page-hero",
      props: {
        eyebrow: "Pricing",
        heading: "Simple,\nfixed pricing.",
        body: "No hourly billing, no surprises. Clear packages built around what growing businesses actually need.",
        maxWidth: 720,
        bodyMaxWidth: null,
        paddingBottom: "clamp(40px,5vw,64px)"
      }
    },
    {
      id: "pricing-tabs",
      type: "pricing-tabs",
      props: {
        ctaLabel: "Get started",
        builds: [
          {
            name: "Starter",
            price: 449,
            delivery: "7 days",
            revisions: "1 round",
            badge: "",
            features: [
              "5-page professional website",
              "Mobile responsive design",
              "Basic SEO setup",
              "Contact form",
              "Google Maps embed",
              "SSL certificate"
            ]
          },
          {
            name: "Growth",
            price: 999,
            delivery: "7 days",
            revisions: "2 rounds",
            badge: "Most Popular",
            features: [
              "10-page website",
              "Blog section",
              "Full SEO setup",
              "Branding integration",
              "Google Analytics",
              "Social media links",
              "SSL certificate"
            ]
          },
          {
            name: "Pro",
            price: 1499,
            delivery: "7 days",
            revisions: "3 rounds",
            badge: "",
            features: [
              "15 pages",
              "E-commerce ready",
              "Custom integrations",
              "Advanced SEO",
              "Blog/News section",
              "Priority support",
              "SSL certificate"
            ]
          },
          {
            name: "Enterprise + HR",
            price: 2499,
            delivery: "Agreed at scoping",
            revisions: "3 rounds",
            badge: "Everything",
            features: [
              "Full enterprise website",
              "Integrated HR system",
              "Staff onboarding portal",
              "Leave & timesheet management",
              "SEO & branding",
              "Content creation"
            ]
          }
        ],
        hostingIntro: "Monthly hosting plans to keep your site fast, secure and up to date.",
        hosting: [
          {
            name: "Starter",
            price: 35,
            badge: "",
            features: [
              "1 content update/month",
              "48–72hr support response",
              "Weekly backups",
              "Uptime monitoring"
            ]
          },
          {
            name: "Professional",
            price: 65,
            badge: "Most Popular",
            features: [
              "3 content updates/month",
              "Priority support",
              "Weekly backups",
              "SEO health check",
              "Uptime monitoring"
            ]
          },
          {
            name: "Business",
            price: 109,
            badge: "",
            features: [
              "Unlimited content updates",
              "Priority support",
              "Weekly backups",
              "Weekly performance tuning",
              "Quarterly strategy review"
            ]
          }
        ],
        hrIntro: "A fully integrated HR portal — onboarding, leave, payslips, timesheets, policies — built into your site or standalone.",
        hrPlans: [
          {
            name: "HR Add-on",
            price: "£1,200",
            type: "one-off",
            desc: "HR system added to an existing DH website."
          },
          {
            name: "Standalone HR",
            price: "£1,800",
            type: "one-off",
            desc: "HR system built independently, hosted on our infrastructure."
          },
          {
            name: "Enterprise + HR",
            price: "£2,499",
            type: "one-off",
            desc: "Full enterprise website with integrated HR portal.",
            badge: "Best Value"
          },
          {
            name: "HR Maintenance",
            price: "£49/mo",
            type: "monthly",
            desc: "Ongoing HR support, staff changes, updates."
          }
        ],
        // App and game pricing, set low to win the first projects without
        // reading as a hobby. Market rate for a wrapped app is £3-5k and for a
        // business app £8-15k; these undercut that heavily while still sitting
        // above the website ladder, so the two price lists make sense together.
        appIntro: "Most businesses round here do not need an app, and I will say so rather than sell you one. If you just want to be found, the £449 website does that better. An app earns its keep when you have customers who come back: booking, ordering, loyalty, or staff who need something on their phone.",
        appNote: "Prices start low deliberately. A first app should be cheap enough to try, not a decision you have to sleep on.",
        appPlans: [
          {
            name: "Simple app",
            price: "£349",
            type: "one-off",
            desc: "Your website as a real app on the App Store and Google Play, with push notifications so you can message customers directly. Both store submissions handled."
          },
          {
            name: "Booking or ordering app",
            price: "£699",
            type: "one-off",
            desc: "Customers book a slot or place an order from their phone, pay by card, and get a reminder. You run the lot from one screen.",
            badge: "Most Popular"
          },
          {
            name: "Business app or game",
            price: "from £1,499",
            monthly: "or from £135/mo over 12 months",
            type: "one-off",
            desc: "A proper build: your own system, your own rules, or a full game on both stores. Quoted once I know what it has to do."
          },
          {
            name: "App care",
            price: "£29/mo",
            type: "monthly",
            desc: "Apple and Google change the rules a few times a year and apps stop working if nobody keeps up. This covers that, plus the store fees."
          }
        ],
        appPrimaryLabel: "Talk about an app →",
        appPrimaryHref: "/contact",
        hrPrimaryLabel: "Discuss HR integration →",
        hrPrimaryHref: "/contact",
        hrSecondaryLabel: "Get your HR and CMS portal today",
        hrSecondaryHref: "https://dhworkplace.co.uk"
      }
    },
    {
      id: "pricing-faq",
      type: "faq-accordion",
      props: {
        eyebrow: "FAQ",
        heading: "Common questions",
        items: [
          {
            q: "Do you offer payment plans?",
            a: "Yes — I can arrange staged payments for larger projects. Get in touch to discuss what works for you."
          },
          {
            q: "What happens after the project is delivered?",
            a: "You get a handover call, access to all files, and ongoing support through one of our hosting & maintenance plans."
          },
          {
            q: "Can I upgrade my package later?",
            a: "Absolutely. Many clients start on Starter and grow into Growth or Pro as their business scales."
          },
          {
            q: "Is hosting included in the build price?",
            a: "No — hosting is a separate monthly plan. This keeps things flexible so you're not locked into a bundle you don't need."
          },
          {
            q: "Do you work with clients outside Wales / the UK?",
            a: "Yes, I work with clients across the UK and internationally. Everything is done remotely."
          }
        ],
        footerNote: "Still have questions?",
        ctaLabel: "Talk to us →",
        ctaHref: "/contact"
      }
    }
  ]
}

export default PRICING_DOCUMENT
