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
    description: 'Websites, iOS and Android apps and games, built in Cardiff by David Hooper. Fixed price from £449, usually 7 days. You own the code.',
    heading: 'Websites, apps and games, built in Cardiff.',
    intro: 'I am David Hooper. I build websites in React, apps for the App Store and Google Play, and the systems behind them. You get a fixed price before I start and the source code when I finish.',
    sections: [
      {
        title: 'What I build',
        body: 'Websites from £449. Apps from £349. Staff portals with rotas, timesheets, leave and payslips. Games, including one on Google Play now.',
      },
      {
        title: 'How I work',
        body: 'One person builds it and that person is me. The price is agreed before anything starts and does not move. My mobile number is on the contact page and I answer it.',
      },
    ],
    ctaLabel: 'Start a project',
    ctaHref: '/contact',
    schema: makeServiceSchema('/', 'Website design and development', 'Websites, iOS and Android apps and games, built in Cardiff. Fixed price from £449.'),
  },
  {
    path: '/services',
    title: 'Services | DH Website Services',
    description: 'Websites, iOS and Android apps, games, staff portals and hosting. Fixed prices, published on the site. Cardiff based, working UK wide.',
    heading: 'What I build, and what it costs.',
    intro: 'Every price here is published rather than quoted on request. If a job does not fit one of them I will tell you what it costs before you commit to anything.',
    sections: [
      {
        title: 'Core services',
        body: 'Websites written in React. Apps built once and submitted to both stores. Staff portals handling rotas, clock-in, timesheets and payslips. Hosting from £35 a month.',
      },
      {
        title: 'Delivery style',
        body: 'I scope the job, give you one number, and build it. If you want something added halfway through I will price that separately rather than quietly absorbing it.',
      },
    ],
    ctaLabel: 'Discuss your project',
    ctaHref: '/contact',
    schema: makeServiceSchema('/services', 'Web development services', 'Custom website development, UX design, SEO, e-commerce, hosting, and HR portal integrations.'),
  },
  {
    path: '/pricing',
    title: 'Pricing | DH Website Services',
    description: 'Clear website build, hosting, and HR system pricing with fixed packages from £449. Transparent pricing with no hidden fees or hourly ambiguity.',
    heading: 'Fixed website pricing without hourly ambiguity.',
    intro: 'Four website packages from £449 to £2,499, apps from £349, hosting from £35 a month. The numbers are on the page so you can decide before you speak to me.',
    sections: [
      {
        title: 'Build packages',
        body: 'Starter at £449 for five pages. Growth at £999 for ten pages and a blog. Pro at £1,499 with e-commerce. Enterprise at £2,499 including a staff portal.',
      },
      {
        title: 'Ongoing costs',
        body: 'Hosting is separate and starts at £35 a month, so you can see what you pay once and what you pay every month.',
      },
    ],
    ctaLabel: 'View contact options',
    ctaHref: '/contact',
    schema: makeServiceSchema('/pricing', 'Website pricing', 'Clear website build, hosting, and HR system pricing with fixed packages and no hidden fees.'),
  },
  {
    path: '/portfolio',
    title: 'Portfolio | DH Website Services',
    description: 'Work built by DH Website Services: Fish Tank on Google Play, a staff portal running rotas and payroll, and websites built in Cardiff.',
    heading: 'Things I have built.',
    intro: 'Shipped work rather than mockups. Fish Tank is on Google Play and you can download it now.',
    sections: [
      {
        title: 'What the portfolio shows',
        body: 'Fish Tank, a multiplayer game on Google Play running on my own servers. A staff portal handling rotas, clock-in, timesheets, leave and payslips. Glow With Lucy, an online shop built in seven days.',
      },
    ],
    ctaLabel: 'Talk to us',
    ctaHref: '/contact',
  },
  {
    path: '/about',
    title: 'About | DH Website Services',
    description: 'Cardiff-based web development agency founded by David Hooper. Fixed pricing, founder-led delivery, production-quality websites for UK businesses. Microsoft Partner.',
    heading: 'One person, in Cardiff.',
    intro: 'DH Website Services is David Hooper. There is no team behind me, no account manager, and nobody your job gets passed down to.',
    sections: [
      {
        title: 'What clients get',
        body: 'You get my mobile number. The code is yours at the end and the domain stays in your name, so you can take the whole thing elsewhere whenever you want.',
      },
    ],
    ctaLabel: 'Contact us',
    ctaHref: '/contact',
  },
  {
    path: '/partners',
    title: 'Partners | DH Website Services',
    description: 'DH Website Services is a Microsoft approved partner building websites and practical workflows for businesses already already running on Microsoft 365.',
    heading: 'Microsoft-aware website delivery for businesses already using Microsoft tools.',
    intro: 'The partners page explains how DH Website Services can plan websites and connected workflows with Microsoft 365 in mind.',
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
]

const GEO_MARKETS = [
  {
    city: 'Cardiff',
    intro: 'I am based in Cardiff, so this is the one place I can be in your office the same week you call.',
    travel: 'I live here. If you want to sit down and go through it in person before you commit to anything, that costs you nothing and I can usually do it within a couple of days.',
  },
  {
    city: 'Newport',
    intro: 'Newport is twenty minutes up the M4 from me, which makes meeting in person straightforward rather than an event.',
    travel: 'About twenty minutes from Cardiff. I am happy to come to you for the first conversation and again at handover, at no extra cost.',
  },
  {
    city: 'Swansea',
    intro: 'Swansea is an hour down the M4. Close enough to visit, far enough that most of the work happens over email and calls.',
    travel: 'Roughly an hour each way. I will come out for the first meeting if you would rather do it face to face; after that it is usually quicker for both of us to work over email.',
  },
  {
    city: 'Bristol',
    intro: 'Bristol is over the bridge, about fifty minutes from Cardiff, and I price the same either side of the Severn.',
    travel: 'Around fifty minutes over the M4 bridge. Same price as a Cardiff project. I am not going to add a premium because you are in England.',
  },
  {
    city: 'London',
    intro: 'London is two hours from Cardiff Central. I work with London businesses remotely and price at Cardiff rates, not London ones.',
    travel: 'Two hours on the train, so most of this runs over calls and email. Worth saying plainly: you are paying Cardiff prices for London work, and that is the main reason to use someone outside the city.',
  },
]

export const GEO_CITY_LINKS = GEO_MARKETS.map((market) => ({
  city: market.city,
  to: `/web-design-${market.city.toLowerCase()}`,
}))

/**
 * One page per city.
 *
 * There used to be three -- website-builder, web-design and website-design --
 * generated from one template with the synonym swapped. Fifteen pages of
 * roughly 650 characters each, differing by a word. Google's spam policy names
 * that pattern (doorway pages) and it was 44% of the site's indexed URLs. The
 * other ten now 301 into these five.
 *
 * What makes each page genuinely different is the only thing that honestly
 * differs by city: how far away it is and whether I can sit in a room with
 * you. The price, the person and the work are identical wherever you are, and
 * pretending otherwise is what produced sentences like "local context helps
 * with tone, targeting, operational understanding".
 */
function makeGeoPage(market) {
  const cityLower = market.city.toLowerCase()
  const path = `/web-design-${cityLower}`

  return {
    path,
    city: market.city,
    intentLabel: 'Web design',
    title: `Web Design ${market.city} | DH Website Services`,
    description: `Websites, apps and games built for ${market.city} businesses. Fixed price from £449, usually 7 days.`,
    heading: `Web design in ${market.city}.`,
    intro: market.intro,
    sections: [
      { title: 'Getting to you', body: market.travel },
      {
        title: 'What it costs',
        body: 'Websites start at £449, quoted in full before anything starts. Apps start at £349. No hourly rate and no change-order billing: the number I give you is the number you pay.',
      },
      {
        title: 'Who does the work',
        body: 'I do. There is no team to be handed down to and nobody else on the call. You get my mobile number and I answer it.',
      },
    ],
    ctaLabel: `Get a price for your ${market.city} project`,
    ctaHref: '/contact',
    schema: makeServiceSchema(path, `Web design ${market.city}`, `Websites, apps and games built for ${market.city} businesses. Fixed price from £449.`),
  }
}

export const GEO_PAGES = GEO_MARKETS.map(makeGeoPage)

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

/**
 * Everything that used to be its own page now points at the one page for that
 * city. 301 rather than 410 so whatever ranking the retired URLs earned is
 * passed on instead of thrown away.
 */
/**
 * Everything that used to be its own page now points at the one page for that
 * city. 301 rather than 410 so whatever ranking the retired URLs earned is
 * passed on instead of thrown away.
 */
export const GEO_REDIRECTS = [
  ['/website-builder-cardiff', '/web-design-cardiff'],
  ['/website-design-cardiff', '/web-design-cardiff'],
  ['/cardiff-website-builder', '/web-design-cardiff'],
  ['/website-builder-in-cardiff', '/web-design-cardiff'],
  ['/cardiff-web-design', '/web-design-cardiff'],
  ['/website-design-in-cardiff', '/web-design-cardiff'],
  ['/website-builder-newport', '/web-design-newport'],
  ['/website-design-newport', '/web-design-newport'],
  ['/newport-website-builder', '/web-design-newport'],
  ['/website-builder-in-newport', '/web-design-newport'],
  ['/newport-web-design', '/web-design-newport'],
  ['/website-design-in-newport', '/web-design-newport'],
  ['/website-builder-swansea', '/web-design-swansea'],
  ['/website-design-swansea', '/web-design-swansea'],
  ['/swansea-website-builder', '/web-design-swansea'],
  ['/website-builder-in-swansea', '/web-design-swansea'],
  ['/swansea-web-design', '/web-design-swansea'],
  ['/website-design-in-swansea', '/web-design-swansea'],
  ['/website-builder-bristol', '/web-design-bristol'],
  ['/website-design-bristol', '/web-design-bristol'],
  ['/bristol-website-builder', '/web-design-bristol'],
  ['/website-builder-in-bristol', '/web-design-bristol'],
  ['/bristol-web-design', '/web-design-bristol'],
  ['/website-design-in-bristol', '/web-design-bristol'],
  ['/website-builder-london', '/web-design-london'],
  ['/website-design-london', '/web-design-london'],
  ['/london-website-builder', '/web-design-london'],
  ['/website-builder-in-london', '/web-design-london'],
  ['/london-web-design', '/web-design-london'],
  ['/website-design-in-london', '/web-design-london'],
  ['/website-builder-uk', '/services'],
  ['/website-builder', '/services'],
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

export function getRelatedGeoPages(page) {
  if (!page?.city) return []
  return GEO_PAGES.filter((entry) => entry.city === page.city && entry.path !== page.path)
}
