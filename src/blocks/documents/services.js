/**
 * The Services page as a block document.
 *
 * Transcribed from what Services.jsx renders. The two lists are lifted from
 * its own SVCS and PROCESS arrays rather than retyped, so the wording cannot
 * drift during the conversion.
 */

export const SERVICES_DOCUMENT = {
  version: 1,
  blocks: [
    {
      id: "services-hero",
      type: "page-hero",
      props: {
        eyebrow: "Services",
        heading: "Everything\nyou need.",
        body: "From your first website to a full enterprise stack. I cover every layer of what makes a great web presence.",
        maxWidth: 720,
        bodyMaxWidth: 480
      }
    },
    {
      id: "services-rows",
      type: "service-rows",
      props: {
        items: [
          {
            num: "01",
            title: "Custom Web Development",
            desc: "No templates. I build your site from scratch, specifically for what you need.",
            points: [
              "React, Next.js or vanilla JS",
              "Backend APIs and database integration",
              "Authentication and user accounts",
              "Third-party integrations",
              "Fast and optimised from the start"
            ]
          },
          {
            num: "02",
            title: "Design That Works",
            desc: "Clean, fast, and easy to use. Looks professional on phones and desktops.",
            points: [
              "Brand-aligned design",
              "Mobile-first responsive",
              "Accessibility built-in",
              "Conversion-focused",
              "A clear route to the enquiry form"
            ]
          },
          {
            num: "03",
            title: "SEO & Performance",
            desc: "Built to rank on Google. Fast loading, clean code, proper setup from the start.",
            points: [
              "Technical SEO setup",
              "Core Web Vitals optimisation",
              "Structured data and schema markup",
              "Google Analytics integration",
              "Ongoing health monitoring"
            ]
          },
          {
            num: "04",
            title: "Hosting & Maintenance",
            desc: "Hosting on Cloudflare. I keep it updated, backed up, and running fast.",
            points: [
              "Managed Cloudflare hosting",
              "Weekly backups",
              "Security updates and patches",
              "Content updates on request",
              "Uptime monitoring and alerts"
            ]
          },
          {
            num: "05",
            title: "E-commerce",
            desc: "Sell online with a store built to convert. Simple products or full catalogues.",
            points: [
              "Product catalogue management",
              "Secure payment processing",
              "Inventory and order management",
              "Discount codes and promotions",
              "Mobile-optimised checkout"
            ]
          },
          {
            num: "06",
            title: "HR System Integration",
            desc: "Staff portal for onboarding, leave requests, timesheets, and payslips. Built into your site or standalone.",
            points: [
              "Staff onboarding portal",
              "Leave and timesheet management",
              "Payslip delivery system",
              "Policy document storage",
              "Manager dashboard and approvals"
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
        heading: "Our process.",
        steps: [
          {
            n: "01",
            title: "Brief",
            desc: "Tell me what you need. I will ask questions until it is clear."
          },
          {
            n: "02",
            title: "Quote",
            desc: "Fixed price. You will know exactly what you are paying before I start."
          },
          {
            n: "03",
            title: "Design",
            desc: "Mockups first. You approve the look before I write any code."
          },
          {
            n: "04",
            title: "Build",
            desc: "7-10 days. I will send progress updates so you know where it is at."
          },
          {
            n: "05",
            title: "Launch",
            desc: "Test it, fix any issues, then it goes live. You get the login details."
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
        eyebrow: "Areas I cover",
        heading: "Location-focused website builder pages.",
        body: "I work with businesses across the UK. These pages are written for common search intent for local website builder and web design queries."
      }
    }
  ]
}

export default SERVICES_DOCUMENT
