/**
 * The Services page as a block document.
 *
 * October 2026: apps and web design lead; the other services follow.
 */

export const SERVICES_DOCUMENT = {
  version: 1,
  blocks: [
    {
      id: "services-hero",
      type: "page-hero",
      props: {
        eyebrow: "Services",
        heading: "Apps and websites,\nbuilt properly.",
        body: "We build iPhone and Android apps and design websites for businesses, then host and look after them. Everything else we do supports those two.",
        maxWidth: 720,
        bodyMaxWidth: 520
      }
    },
    {
      id: "services-rows",
      type: "service-rows",
      props: {
        items: [
          {
            num: "01",
            title: "iPhone and Android Apps",
            desc: "Apps for the App Store and Google Play, from your website as an app through to a full booking system or game. We take them through store review for you.",
            points: [
              "Native iOS apps in Swift, Android builds for Google Play",
              "Push notifications, sign-in and payments",
              "Test builds on your phone through TestFlight and Play testing",
              "App Store and Google Play listings, privacy forms and review",
              "Ongoing app care when Apple and Google change the rules"
            ]
          },
          {
            num: "02",
            title: "Web Design and Development",
            desc: "Websites designed for your business and written in React. No page builder and no theme you share with a thousand others.",
            points: [
              "Designed around your brand, mockups before code",
              "Mobile-first and accessible",
              "Booking, enquiry and quote forms",
              "Backend APIs, accounts and database work",
              "Fast from the start"
            ]
          },
          {
            num: "03",
            title: "Staff Portals and Business Systems",
            desc: "Rotas, clock-in, timesheets, leave and payslips, on the web and in an app. We run our own staff on one.",
            points: [
              "Microsoft sign-in",
              "Rotas, clock-in and timesheets",
              "Leave requests and approvals",
              "Payslips and policy documents",
              "Push notifications to staff phones"
            ]
          },
          {
            num: "04",
            title: "SEO and Performance",
            desc: "Built to be found on Google: fast pages, clean code and a proper setup from day one.",
            points: [
              "Technical SEO setup",
              "Core Web Vitals work",
              "Structured data and schema markup",
              "Analytics setup",
              "Ongoing health checks"
            ]
          },
          {
            num: "05",
            title: "E-commerce",
            desc: "Sell online, from a handful of products to a full catalogue.",
            points: [
              "Product catalogue",
              "Card payments",
              "Orders and stock",
              "Discount codes",
              "A checkout that works on a phone"
            ]
          },
          {
            num: "06",
            title: "Hosting and Maintenance",
            desc: "Hosting on Cloudflare. We keep sites and apps updated, backed up and running.",
            points: [
              "Managed Cloudflare hosting",
              "Weekly backups",
              "Security updates",
              "Content changes on request",
              "Uptime monitoring"
            ]
          }
        ]
      }
    },
    {
      id: "services-process",
      type: "process-steps",
      props: {
        eyebrow: "How it works",
        heading: "How it goes.",
        steps: [
          {
            n: "01",
            title: "Brief",
            desc: "Tell us what you need. We will ask questions until it is clear."
          },
          {
            n: "02",
            title: "Quote",
            desc: "One fixed price. You know exactly what you are paying before we start."
          },
          {
            n: "03",
            title: "Design",
            desc: "Mockups first. You approve the look before we write any code."
          },
          {
            n: "04",
            title: "Build",
            desc: "Seven days for a website; apps to the date we agree. You get progress updates and test builds as we go."
          },
          {
            n: "05",
            title: "Launch",
            desc: "You sign it off, it goes live or into the stores, and you get every login."
          }
        ],
        primaryLabel: "Start a project →",
        primaryHref: "/contact",
        secondaryLabel: "View pricing",
        secondaryHref: "/pricing"
      }
    },
    {
      id: "services-geo",
      type: "app.geo-links",
      props: {
        eyebrow: "Areas we cover",
        heading: "Where we work.",
        body: "We work with businesses across the UK and can meet in person around south Wales."
      }
    }
  ]
}

export default SERVICES_DOCUMENT
