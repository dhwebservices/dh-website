/**
 * The Partners page as a block document.
 */

export const PARTNERS_DOCUMENT = {
  version: 1,
  blocks: [
    {
      id: "partners-hero",
      type: "partner-hero",
      props: {
        eyebrow: "Microsoft approved partner",
        heading: "Websites that fit the Microsoft stack your business already runs on.",
        body: "DH Website Services is a Microsoft approved partner. For clients already working inside Microsoft tools, that means I can build with those operational realities in mind instead of forcing a disconnected website on top.",
        primaryLabel: "Discuss your project",
        primaryHref: "/contact",
        secondaryLabel: "View services",
        secondaryHref: "/services",
        points: [
          "Direct founder-led delivery",
          "Fixed pricing and scoped outcomes",
          "Built for UK service businesses and growing teams"
        ]
      }
    },
    {
      id: "partners-benefits",
      type: "partner-benefits",
      props: {
        eyebrow: "What this means",
        heading: "A better fit for businesses already running on Microsoft.",
        body: "A lot of small and mid-sized businesses already depend on Microsoft for email, calendars, files, team collaboration, and day-to-day operations. The partnership means I can plan a site around those tools rather than working against them.",
        cardEyebrow: "Partner benefit",
        cards: [
          {
            title: "Microsoft-aware builds",
            body: "I can shape websites and business tools around the Microsoft products many UK teams already use every day."
          },
          {
            title: "Practical integration planning",
            body: "That includes workflows around Microsoft 365, Outlook, Teams, Bookings, forms, automation, and internal admin handoffs."
          },
          {
            title: "Commercial delivery first",
            body: "The point is not to add complexity. It is to make your website fit your operating stack so leads, bookings, and staff processes move cleanly."
          }
        ],
        appleEyebrow: "Device supply",
        appleHeading: "I can also supply Apple hardware as an authorised seller.",
        appleBody: "Alongside websites and business systems, DH Website Services can support Apple device procurement for teams that need iPads, iPhones, and related hardware as part of a wider project rollout."
      }
    },
    {
      id: "partners-fit",
      type: "typical-fit",
      props: {
        eyebrow: "Typical fit",
        heading: "Best suited to businesses that want a joined-up website, not another isolated tool.",
        body: "If your team already lives in Microsoft products, the website should respect that. I can scope around operational realities from the start rather than fixing them after launch.",
        areas: [
          "Microsoft 365-aligned client workflows",
          "Outlook and calendar-based booking",
          "Teams-ready internal handover processes",
          "Azure-friendly hosting and deployment planning",
          "Operational websites for service businesses and growing teams",
          "Clear fixed-scope delivery without agency layers"
        ]
      }
    },
    {
      id: "partners-cta",
      type: "closing-cta",
      props: {
        eyebrow: "Start with the right stack",
        heading: "Need a website that works cleanly with your Microsoft-led workflow?",
        body: "Tell me how your team operates today and I can scope the site around that from day one.",
        primaryLabel: "Book a free call",
        primaryHref: "/contact",
        secondaryLabel: "Get a quote",
        secondaryHref: "/calculator",
        assurances: [],
        maxWidth: 720,
        headingSize: "clamp(34px,4.5vw,58px)",
        bodySize: 16,
        bodyGap: 34
      }
    }
  ]
}

export default PARTNERS_DOCUMENT
