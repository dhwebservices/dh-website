export const SEO_SITE_URL = 'https://www.dhwebsiteservices.co.uk'

const makeServiceSchema = (path, title, description) => ({
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'DH Website Services',
  url: `${SEO_SITE_URL}${path}`,
  description,
  areaServed: 'United Kingdom',
  serviceType: title,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Cardiff',
    addressCountry: 'GB',
  },
})

const BASE_INDEXABLE_PAGES = [
  {
    path: '/',
    title: 'DH Website Services | Production-Ready Websites for Growth',
    description: 'Production-ready websites, booking systems, and business platforms built for speed, SEO, and conversion.',
    heading: 'Production-ready websites for businesses that need speed, clarity, and real commercial value.',
    intro: 'DH Website Services builds custom websites, landing pages, booking systems, and business platforms for companies that need more than a template.',
    sections: [
      {
        title: 'What we build',
        body: 'Custom brochure sites, service websites, e-commerce builds, lead generation pages, booking journeys, and practical integrations with your existing operations.',
      },
      {
        title: 'How we work',
        body: 'Founder-led delivery, fixed pricing, direct communication, and a build process designed around launch quality rather than filler.',
      },
    ],
    ctaLabel: 'Start a project',
    ctaHref: '/contact',
    schema: makeServiceSchema('/', 'Website design and development', 'Production-ready websites, booking systems, and business platforms built for speed, SEO, and conversion.'),
  },
  {
    path: '/services',
    title: 'Services | DH Website Services',
    description: 'Custom website development, UX design, SEO, e-commerce, hosting, and HR portal integrations.',
    heading: 'Website services built around growth, conversion, and maintainable delivery.',
    intro: 'We cover the full website build process from UX and front-end development through SEO foundations, integrations, and post-launch support.',
    sections: [
      {
        title: 'Core services',
        body: 'Custom web development, conversion-led design, technical SEO, managed hosting, e-commerce builds, and HR portal integrations.',
      },
      {
        title: 'Delivery style',
        body: 'Projects are scoped clearly, priced clearly, and built with practical business outcomes in mind.',
      },
    ],
    ctaLabel: 'Discuss your project',
    ctaHref: '/contact',
    schema: makeServiceSchema('/services', 'Web development services', 'Custom website development, UX design, SEO, e-commerce, hosting, and HR portal integrations.'),
  },
  {
    path: '/pricing',
    title: 'Pricing | DH Website Services',
    description: 'Clear website build, hosting, and HR system pricing with fixed packages and no hidden fees.',
    heading: 'Fixed website pricing without hourly ambiguity.',
    intro: 'DH Website Services offers clear build packages, monthly hosting plans, and HR system pricing so businesses can budget properly before a project starts.',
    sections: [
      {
        title: 'Build packages',
        body: 'Starter, Growth, Pro, and Enterprise options for businesses that need clarity on scope, delivery time, and included features.',
      },
      {
        title: 'Ongoing costs',
        body: 'Hosting and support plans are kept separate so clients can see what is one-off and what is recurring.',
      },
    ],
    ctaLabel: 'View contact options',
    ctaHref: '/contact',
    schema: makeServiceSchema('/pricing', 'Website pricing', 'Clear website build, hosting, and HR system pricing with fixed packages and no hidden fees.'),
  },
  {
    path: '/portfolio',
    title: 'Portfolio | DH Website Services',
    description: 'Recent website work from DH Website Services, including Glow With Lucy at glowwithlucy.co.uk.',
    heading: 'Recent website work and delivery examples.',
    intro: 'Portfolio content highlights the kind of commercial website work DH Website Services ships for real businesses.',
    sections: [
      {
        title: 'What the portfolio shows',
        body: 'A focus on practical launch quality, speed, search visibility, and design that supports conversion rather than vanity.',
      },
    ],
    ctaLabel: 'Talk to us',
    ctaHref: '/contact',
  },
  {
    path: '/about',
    title: 'About | DH Website Services',
    description: 'DH Website Services is a Cardiff-based web agency founded by David Hooper. Fixed prices, founder-led delivery, production-quality websites for UK businesses.',
    heading: 'Founder-led website delivery based in Cardiff.',
    intro: 'DH Website Services works with UK businesses that want direct accountability, fixed pricing, and a stronger technical standard than template-led web builds.',
    sections: [
      {
        title: 'What clients get',
        body: 'Direct communication, commercial decision-making, and a site that is built to be owned and improved over time.',
      },
    ],
    ctaLabel: 'Contact us',
    ctaHref: '/contact',
  },
  {
    path: '/partners',
    title: 'Partners | DH Website Services',
    description: 'DH Website Services is a Microsoft approved partner building websites and practical workflows for businesses already operating in the Microsoft ecosystem.',
    heading: 'Microsoft-aware website delivery for businesses already using Microsoft tools.',
    intro: 'The partners page explains how DH Website Services can plan websites and connected workflows with the Microsoft ecosystem in mind.',
    sections: [
      {
        title: 'Who this is for',
        body: 'Service businesses and operational teams already relying on Microsoft 365 and adjacent tooling.',
      },
    ],
    ctaLabel: 'Explore partnerships',
    ctaHref: '/contact',
  },
  {
    path: '/contact',
    title: 'Book a Call | DH Website Services',
    description: 'Book a free project consultation and get a clear plan with a fixed price.',
    heading: 'Start with a call or a written project brief.',
    intro: 'Businesses can book a consultation or send a structured brief directly to DH Website Services and get a clear next step.',
    sections: [
      {
        title: 'Contact options',
        body: 'Live booking, project brief submission, direct email, and phone contact for new enquiries.',
      },
    ],
    ctaLabel: 'Send a brief',
    ctaHref: '/contact?mode=brief#brief',
  },
  {
    path: '/calculator',
    title: 'Project Calculator | DH Website Services',
    description: 'Build a live website quote based on pages, features, design, and support needs.',
    heading: 'A practical project calculator for scoping a website build.',
    intro: 'The calculator gives businesses a clearer estimate based on the pages, features, design needs, and ongoing support involved.',
    sections: [
      {
        title: 'Why it matters',
        body: 'It reduces vague enquiries and helps move quickly into a usable project brief.',
      },
    ],
    ctaLabel: 'Open contact page',
    ctaHref: '/contact',
  },
  {
    path: '/careers',
    title: 'Careers | DH Website Services',
    description: 'Live vacancies, role details, and direct online applications at DH Website Services.',
    heading: 'Current vacancies and application routes.',
    intro: 'The careers page lists open roles, role details, and the direct application path for candidates.',
    sections: [
      {
        title: 'What candidates can do',
        body: 'Review vacancies, open a role page, and submit an online application.',
      },
    ],
    ctaLabel: 'View roles',
    ctaHref: '/careers',
  },
  {
    path: '/privacy',
    title: 'Privacy Policy | DH Website Services',
    description: 'Privacy policy for DH Website Services covering how personal data is collected, processed, and stored.',
    heading: 'Privacy policy and data handling information.',
    intro: 'This page outlines how DH Website Services handles personal information submitted through the website and related enquiries.',
    sections: [
      {
        title: 'What it covers',
        body: 'Personal data collection, processing, storage, and the basic rights available to website users and clients.',
      },
    ],
    ctaLabel: 'Contact us about privacy',
    ctaHref: '/contact',
  },
  {
    path: '/terms',
    title: 'Terms and Conditions | DH Website Services',
    description: 'General website terms and conditions for DH Website Services.',
    heading: 'General website terms and conditions.',
    intro: 'The terms page sets out the general rules, responsibilities, and limitations that apply to use of the DH Website Services website.',
    sections: [
      {
        title: 'What it covers',
        body: 'Site usage terms, acceptable conduct, limitations of liability, and general legal conditions for visitors.',
      },
    ],
    ctaLabel: 'Contact us',
    ctaHref: '/contact',
  },
  {
    path: '/services-terms',
    title: 'Service Terms | DH Website Services',
    description: 'Service terms for projects and ongoing work delivered by DH Website Services.',
    heading: 'Service terms for project delivery and support.',
    intro: 'This page outlines the terms that apply to website projects, related services, and ongoing support arrangements.',
    sections: [
      {
        title: 'What it covers',
        body: 'Scope, delivery, client responsibilities, payments, revisions, support, and other service-level conditions.',
      },
    ],
    ctaLabel: 'Discuss a project',
    ctaHref: '/contact',
  },
  {
    path: '/refunds',
    title: 'Refund Policy | DH Website Services',
    description: 'Refund policy for DH Website Services.',
    heading: 'Refund policy for website services and related purchases.',
    intro: 'The refunds page explains how refund requests are handled for relevant services and purchases.',
    sections: [
      {
        title: 'What it covers',
        body: 'Eligibility, process, and limitations relating to refunds where they apply.',
      },
    ],
    ctaLabel: 'Contact support',
    ctaHref: '/contact',
  },
  {
    path: '/cookies',
    title: 'Cookie Policy | DH Website Services',
    description: 'Cookie policy for DH Website Services.',
    heading: 'Cookie policy and tracking information.',
    intro: 'This page explains how cookies and similar tracking technologies are used across the DH Website Services website.',
    sections: [
      {
        title: 'What it covers',
        body: 'Cookie categories, analytics usage, and the purpose of the main tracking mechanisms used on the site.',
      },
    ],
    ctaLabel: 'Contact us',
    ctaHref: '/contact',
  },
  {
    path: '/acceptable-use',
    title: 'Acceptable Use Policy | DH Website Services',
    description: 'Acceptable use policy for DH Website Services.',
    heading: 'Acceptable use rules for the website and related services.',
    intro: 'The acceptable use policy sets out prohibited behaviour and misuse standards for site visitors and service users.',
    sections: [
      {
        title: 'What it covers',
        body: 'Restricted behaviours, abuse prevention, and the standards expected when using the website or connected services.',
      },
    ],
    ctaLabel: 'Contact us',
    ctaHref: '/contact',
  },
  {
    path: '/accessibility',
    title: 'Accessibility Statement | DH Website Services',
    description: 'Accessibility statement for DH Website Services.',
    heading: 'Accessibility statement and support information.',
    intro: 'The accessibility page explains the site accessibility intent and how to report issues or request assistance.',
    sections: [
      {
        title: 'What it covers',
        body: 'Accessibility aims, practical limitations, and the contact route for accessibility-related support.',
      },
    ],
    ctaLabel: 'Report an issue',
    ctaHref: '/contact',
  },
  {
    path: '/security',
    title: 'Security | DH Website Services',
    description: 'Security information for DH Website Services.',
    heading: 'Security information and reporting routes.',
    intro: 'This page outlines the security posture of DH Website Services at a high level and how to report relevant concerns.',
    sections: [
      {
        title: 'What it covers',
        body: 'Basic security expectations, responsible contact routes, and how concerns or vulnerabilities should be raised.',
      },
    ],
    ctaLabel: 'Contact us',
    ctaHref: '/contact',
  },
  {
    path: '/complaints',
    title: 'Complaints Procedure | DH Website Services',
    description: 'Complaints process for DH Website Services.',
    heading: 'Complaints procedure and escalation route.',
    intro: 'The complaints page explains how concerns can be raised and how they are handled.',
    sections: [
      {
        title: 'What it covers',
        body: 'Complaint submission, review, response expectations, and escalation handling.',
      },
    ],
    ctaLabel: 'Raise a concern',
    ctaHref: '/contact',
  },
  {
    path: '/website-builder',
    title: 'Website Builder for UK Businesses | DH Website Services',
    description: 'Website builder services for UK businesses that need custom sites, fixed pricing, technical SEO, and direct delivery.',
    heading: 'Website builder services for businesses that need more than a template.',
    intro: 'If you are looking for a website builder for a serious business website, the real requirement is not drag-and-drop software. It is a build partner who can plan, write, optimise, and launch a site that performs commercially.',
    sections: [
      {
        title: 'What we mean by website builder',
        body: 'Custom design, front-end and back-end delivery, technical SEO, analytics, lead capture, booking flows, and practical support after launch.',
      },
      {
        title: 'Who this fits',
        body: 'Professional services, local businesses, founders, and growing teams that need a site they actually own and can build on.',
      },
    ],
    ctaLabel: 'Start a website brief',
    ctaHref: '/contact?mode=brief#brief',
    schema: makeServiceSchema('/website-builder', 'Website builder for UK businesses', 'Website builder services for UK businesses that need custom sites, fixed pricing, technical SEO, and direct delivery.'),
  },
]

export const GEO_PAGES = [
  {
    path: '/website-builder-cardiff',
    city: 'Cardiff',
    title: 'Website Builder Cardiff | DH Website Services',
    description: 'Cardiff website builder for businesses that need custom websites, technical SEO, fixed pricing, and direct delivery.',
    heading: 'Website builder in Cardiff for businesses that need something stronger than a template.',
    intro: 'DH Website Services works with Cardiff businesses that need a website to generate enquiries, support sales conversations, and hold up technically after launch.',
    sections: [
      {
        title: 'What Cardiff businesses usually need',
        body: 'A fast brochure site, a better lead-generation journey, clearer service positioning, and technical SEO that gives Google usable page content from day one.',
      },
      {
        title: 'Why work locally',
        body: 'Local context helps with tone, targeting, operational understanding, and the practical realities of how service businesses in Cardiff actually sell.',
      },
    ],
  },
  {
    path: '/website-builder-newport',
    city: 'Newport',
    title: 'Website Builder Newport | DH Website Services',
    description: 'Newport website builder for businesses that need custom websites, fixed pricing, SEO-ready delivery, and founder-led communication.',
    heading: 'Website builder in Newport for businesses that want clarity, speed, and direct delivery.',
    intro: 'For Newport businesses, we build websites that are commercially useful, technically strong, and easy to extend as the business grows.',
    sections: [
      {
        title: 'What this covers',
        body: 'Service websites, landing pages, booking journeys, and business sites that need better messaging and more usable conversion paths.',
      },
      {
        title: 'What matters most',
        body: 'Clear scope, fixed pricing, and a website that helps sales instead of just existing online.',
      },
    ],
  },
  {
    path: '/website-builder-swansea',
    city: 'Swansea',
    title: 'Website Builder Swansea | DH Website Services',
    description: 'Swansea website builder services for businesses that need custom websites, technical SEO, and direct founder-led delivery.',
    heading: 'Website builder in Swansea for businesses that need custom build quality.',
    intro: 'We help Swansea businesses move beyond basic template websites and into sites that are faster, clearer, and more credible in front of customers.',
    sections: [
      {
        title: 'Typical outcomes',
        body: 'Sharper service pages, better local search visibility, cleaner calls to action, and an easier route from first click to enquiry.',
      },
      {
        title: 'Delivery style',
        body: 'Projects stay founder-led and direct, with fixed pricing and a straightforward path from brief to launch.',
      },
    ],
  },
  {
    path: '/website-builder-bristol',
    city: 'Bristol',
    title: 'Website Builder Bristol | DH Website Services',
    description: 'Bristol website builder for businesses that need high-performance custom websites, conversion-focused UX, and technical SEO.',
    heading: 'Website builder in Bristol for businesses that need a site to perform commercially.',
    intro: 'For Bristol businesses, the priority is usually not having a website at all. It is having one that is credible, fast, and easier for customers to act on.',
    sections: [
      {
        title: 'What we build',
        body: 'Custom business websites, campaign pages, lead funnels, and service pages written and structured to support conversion.',
      },
      {
        title: 'What makes the difference',
        body: 'Technical quality, SEO foundations, good information architecture, and direct communication during delivery.',
      },
    ],
  },
  {
    path: '/website-builder-london',
    city: 'London',
    title: 'Website Builder London | DH Website Services',
    description: 'London website builder services for businesses that need custom websites, fixed pricing, clear positioning, and strong technical delivery.',
    heading: 'Website builder in London for teams that need a sharper, faster website.',
    intro: 'London businesses often need a website that stands up in a more competitive market, with better positioning, stronger page quality, and cleaner conversion paths.',
    sections: [
      {
        title: 'Where the value is',
        body: 'Sharper messaging, better technical SEO, and a build that supports proposals, inbound leads, and higher-trust first impressions.',
      },
      {
        title: 'How we work',
        body: 'Remote-friendly, founder-led, and direct from scoping through launch.',
      },
    ],
  },
].map((page) => ({
  ...page,
  ctaLabel: `Discuss your ${page.city} website project`,
  ctaHref: '/contact',
  schema: makeServiceSchema(page.path, `Website builder ${page.city}`, page.description),
}))

export const INDEXABLE_PAGES = [...BASE_INDEXABLE_PAGES, ...GEO_PAGES]

export const INDEXABLE_PAGE_META = Object.fromEntries(
  INDEXABLE_PAGES.map((page) => [
    page.path,
    {
      title: page.title,
      description: page.description,
      robots: 'index,follow',
      schema: page.schema,
    },
  ]),
)

export const GEO_REDIRECTS = [
  ['/cardiff-website-builder', '/website-builder-cardiff'],
  ['/website-builder-in-cardiff', '/website-builder-cardiff'],
  ['/web-design-cardiff', '/website-builder-cardiff'],
  ['/website-design-cardiff', '/website-builder-cardiff'],
  ['/newport-website-builder', '/website-builder-newport'],
  ['/website-builder-in-newport', '/website-builder-newport'],
  ['/web-design-newport', '/website-builder-newport'],
  ['/swansea-website-builder', '/website-builder-swansea'],
  ['/website-builder-in-swansea', '/website-builder-swansea'],
  ['/web-design-swansea', '/website-builder-swansea'],
  ['/bristol-website-builder', '/website-builder-bristol'],
  ['/website-builder-in-bristol', '/website-builder-bristol'],
  ['/web-design-bristol', '/website-builder-bristol'],
  ['/london-website-builder', '/website-builder-london'],
  ['/website-builder-in-london', '/website-builder-london'],
  ['/web-design-london', '/website-builder-london'],
  ['/website-builder-uk', '/website-builder'],
  ['/web-design-services', '/services'],
  ['/website-design-services', '/services'],
]

export function withTrailingSlash(path) {
  if (!path || path === '/') return '/'
  return path.endsWith('/') ? path : `${path}/`
}

export function toAbsolutePublicUrl(path) {
  return `${SEO_SITE_URL}${withTrailingSlash(path)}`
}

export function getIndexablePage(pathname) {
  const normalizedPath = pathname && pathname !== '/' && pathname.endsWith('/')
    ? pathname.slice(0, -1)
    : pathname

  return INDEXABLE_PAGES.find((page) => page.path === normalizedPath) || null
}
