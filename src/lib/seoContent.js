export const SEO_SITE_URL = 'https://www.dhwebsiteservices.co.uk'

const ORG_ID = `${SEO_SITE_URL}/#organization`
const SAME_AS = [
  'https://www.linkedin.com/company/dh-website-services/',
  'https://www.facebook.com/dhwebsiteservices',
  'https://x.com/dhwebservices',
  'https://find-and-update.company-information.service.gov.uk/company/17018784',
  'https://apps.apple.com/gb/app/the-fish-tank/id6801622379',
]

export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'DH Website Services',
  legalName: 'David Hooper Home Limited',
  url: `${SEO_SITE_URL}/`,
  logo: `${SEO_SITE_URL}/dh-logo.png`,
  image: `${SEO_SITE_URL}/og-image.png`,
  foundingDate: '2026-02-07',
  founder: { '@type': 'Person', name: 'David Hooper' },
  vatID: 'GB517076395',
  identifier: { '@type': 'PropertyValue', propertyID: 'Companies House', value: '17018784' },
  telephone: '+44 1443 805303',
  email: 'clients@dhwebsiteservices.co.uk',
  address: { '@type': 'PostalAddress', addressLocality: 'Pontypridd', addressRegion: 'Rhondda Cynon Taf', addressCountry: 'GB' },
  sameAs: SAME_AS,
  owns: [
    { '@type': 'MobileApplication', name: 'Fish Tank', operatingSystem: 'iOS, Android', applicationCategory: 'GameApplication', url: 'https://apps.apple.com/gb/app/the-fish-tank/id6801622379' },
    { '@type': 'MobileApplication', name: 'Fam & a Half', operatingSystem: 'iOS', applicationCategory: 'LifestyleApplication', url: `${SEO_SITE_URL}/famandahalf/` },
  ],
}

export const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SEO_SITE_URL}/#website`,
  name: 'DH Website Services',
  url: `${SEO_SITE_URL}/`,
  inLanguage: 'en-GB',
  publisher: { '@id': ORG_ID },
}

export function breadcrumbSchema(page) {
  const name = page.city ? `Web design ${page.city}` : page.heading || page.title.split(' | ')[0]
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SEO_SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name, item: `${SEO_SITE_URL}${page.path}${page.path.endsWith('/') ? '' : '/'}` },
    ],
  }
}

const makeServiceSchema = (path, title, description) => ({
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SEO_SITE_URL}/#business`,
  parentOrganization: { '@id': ORG_ID },
  logo: `${SEO_SITE_URL}/dh-logo.png`,
  image: `${SEO_SITE_URL}/og-image.png`,
  priceRange: '£349–£2,499',
  sameAs: SAME_AS,
  name: 'DH Website Services',
  url: `${SEO_SITE_URL}${path}`,
  description,
  areaServed: [
    { '@type': 'City', name: 'Pontypridd' },
    { '@type': 'City', name: 'Cardiff' },
    { '@type': 'AdministrativeArea', name: 'South Wales' },
    { '@type': 'Country', name: 'United Kingdom' },
  ],
  telephone: '+44 1443 805303',
  email: 'clients@dhwebsiteservices.co.uk',
  serviceType: title,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Pontypridd',
    addressRegion: 'Rhondda Cynon Taf',
    addressCountry: 'GB',
  },
})

const BASE_INDEXABLE_PAGES = [
  {
    path: '/',
    title: 'Web Design & App Development in Pontypridd, Wales | DH Website Services',
    description: 'Web designer and app developer in Pontypridd. Websites from £449 and iPhone and Android apps from £349 for businesses in Rhondda Cynon Taf, Cardiff and Wales.',
    heading: 'We build apps and websites.',
    intro: 'DH Website Services is a small software company in Pontypridd, Wales. We build and run our own apps: Fam & a Half, a free family location app, and Fish Tank, a multiplayer game on both app stores. We also build iPhone and Android apps and websites for businesses, at a fixed price agreed before we start.',
    sections: [
      {
        title: 'Our products',
        body: 'Fam & a Half is a free family and friends location app for iPhone: live map, arrival alerts, SOS and crash detection, pick-up requests and Walk Me Home. It is with Apple for review now (dhwebsiteservices.co.uk/famandahalf). Fish Tank is a real-time multiplayer game, live on the App Store and Google Play. We also run our own staff portal and phone system.',
      },
      {
        title: 'What we build',
        body: 'Apps for the App Store and Google Play from £349. Websites from £449. Staff portals with rotas, timesheets, leave and payslips. Our own game, Fish Tank, is live on both stores.',
      },
      {
        title: 'How we work',
        body: 'You deal with the people who build your project: David Hooper, who founded the company and does the development, and Jack Deane, our assistant manager. The price is agreed before anything starts and does not move.',
      },
    ],
    ctaLabel: 'Start a project',
    ctaHref: '/contact',
    schema: makeServiceSchema('/', 'App development and web design', 'iPhone and Android app development and web design for UK businesses. Apps from £349, websites from £449.'),
  },
  {
    path: '/services',
    title: 'App Development & Web Design Services | DH Website Services',
    description: 'iPhone and Android app development, web design, staff portals, SEO and hosting. Fixed prices published on the site. Based in Pontypridd, serving Cardiff, Wales and the UK.',
    heading: 'Apps and websites, built properly.',
    intro: 'Every price here is published rather than quoted on request. If a job does not fit one of them, we tell you what it costs before you commit to anything.',
    sections: [
      {
        title: 'Core services',
        body: 'Apps for the App Store and Google Play, with store review handled for you. Websites designed for your business and written in React. Staff portals handling rotas, clock-in, timesheets and payslips. Hosting from £35 a month.',
      },
      {
        title: 'How a project runs',
        body: 'We scope the job, give you one number and build it. You get test builds on your own phone before anything goes live. If you want something added halfway through, we price it separately rather than quietly absorbing it.',
      },
    ],
    ctaLabel: 'Discuss your project',
    ctaHref: '/contact',
    schema: makeServiceSchema('/services', 'App development and web design', 'iPhone and Android app development, web design, staff portals, SEO, e-commerce and hosting.'),
  },
  {
    path: '/pricing',
    title: 'Pricing | DH Website Services',
    description: 'Fixed prices for apps and websites: apps from £349, websites from £449, hosting from £35 a month. All prices exclude VAT. No hourly billing.',
    heading: 'Fixed prices for apps and websites.',
    intro: 'Apps from £349, four website packages from £449 to £2,499, and hosting from £35 a month, all excluding VAT. The numbers are on the page so you can decide before you speak to us.',
    sections: [
      {
        title: 'Build packages',
        body: 'Apps: £349 for your website as an app on both stores, £699 for booking or ordering, from £1,499 for a full build or game. Websites: Starter at £449 for five pages. Growth at £999 for ten pages and a blog. Pro at £1,499 with e-commerce. Enterprise at £2,499 including a staff portal.',
      },
      {
        title: 'Ongoing costs',
        body: 'Hosting is separate and starts at £35 a month, so you can see what you pay once and what you pay every month.',
      },
    ],
    ctaLabel: 'View contact options',
    ctaHref: '/contact',
    schema: makeServiceSchema('/pricing', 'App and website pricing', 'Fixed prices for apps from £349 and websites from £449, with hosting listed separately.'),
  },
  {
    path: '/portfolio',
    title: 'Our Work: Apps and Websites | DH Website Services',
    description: 'Apps and websites we have built: Fish Tank on the App Store and Google Play, Fam & a Half in App Store review, our staff portal and phone system, and web design work.',
    heading: 'Apps and websites we have shipped.',
    intro: 'Shipped work rather than mockups. Fish Tank is on the App Store and Google Play and you can download it now.',
    sections: [
      {
        title: 'Apps',
        body: 'Fish Tank, a cross-platform multiplayer game on the App Store and Google Play, running on servers we run. Fam & a Half, a free and private family location app for iPhone, in TestFlight beta. The DH Staff Portal, on the web and as an iOS app. DH Phone, the cloud phone system our calls come through.',
      },
      {
        title: 'Web design',
        body: 'Glow With Lucy, a website for a candle business, built in seven days.',
      },
    ],
    ctaLabel: 'Talk to us',
    ctaHref: '/contact',
  },
  {
    path: '/about',
    title: 'About Us | DH Website Services',
    description: 'A small app and web design team based in Pontypridd, serving Cardiff and Wales: David Hooper, founder and developer, and Jack Deane, assistant manager.',
    heading: 'A small team. Apps and websites.',
    intro: 'DH Website Services is a small app and web studio based in Pontypridd, serving Cardiff and Wales. You deal directly with the people who build your project, with no account manager in between.',
    sections: [
      {
        title: 'The team',
        body: 'David Hooper founded the company and designs and builds the apps, websites and systems. Jack Deane, our assistant manager, handles enquiries, bookings and keeping projects moving.',
      },
      {
        title: 'What clients get',
        body: 'Direct phone numbers and quick replies. The code is yours at the end and the domain stays in your name, so you can take the whole thing elsewhere whenever you want.',
      },
    ],
    ctaLabel: 'Contact us',
    ctaHref: '/contact',
  },
  {
    path: '/partners',
    title: 'Partners | DH Website Services',
    description: 'DH Website Services is a Microsoft approved partner building apps, websites and practical workflows for businesses already running on Microsoft 365.',
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
    city: 'Pontypridd',
    intro: 'We are a web design and app development company based in Pontypridd. If your business is in Ponty, Treforest, Porth, the Rhondda or anywhere else in Rhondda Cynon Taf, we are minutes away.',
    travel: 'We are local, so we can meet you at your business, in town or on a video call, whichever suits. The first conversation is free and there is no obligation to go ahead.',
    extra: [
      {
        title: 'Areas we cover nearby',
        body: 'Pontypridd town centre, Treforest, Trallwn, Graig, Cilfynydd, Hopkinstown, Porth, Tonypandy, Treorchy and the rest of the Rhondda, Abercynon, Mountain Ash, Aberdare, Church Village, Llantwit Fardre, Beddau, Tonyrefail, Llantrisant, Talbot Green, Caerphilly and Merthyr Tydfil.',
      },
      {
        title: 'What we have built here',
        body: 'Our own apps are made in Pontypridd: Fish Tank, a multiplayer game on the App Store and Google Play, and Fam & a Half, a free family location app. We also run our own staff portal and phone system, and we build websites and apps for local businesses.',
      },
    ],
  },
  {
    city: 'Cardiff',
    intro: 'Cardiff is a short drive down the A470 from us in Pontypridd, so we can be in your office the same week you call.',
    travel: 'If you want to sit down and go through it in person before you commit to anything, that costs you nothing and we can usually do it within a couple of days.',
  },
  {
    city: 'Newport',
    intro: 'Newport is a short drive along the M4, which makes meeting in person straightforward rather than an event.',
    travel: 'We are happy to come to you for the first conversation and again at handover, at no extra cost.',
  },
  {
    city: 'Swansea',
    intro: 'Swansea is an hour down the M4. Close enough to visit, far enough that most of the work happens over email and calls.',
    travel: 'Roughly an hour each way. We will come out for the first meeting if you would rather do it face to face; after that it is usually quicker for both of us to work over email.',
  },
  {
    city: 'Bristol',
    intro: 'Bristol is over the bridge, about an hour from Pontypridd, and we price the same either side of the Severn.',
    travel: 'Around an hour over the M4 bridge. Same price as a Welsh project. We do not add a premium because you are in England.',
  },
  {
    city: 'London',
    intro: 'London is a couple of hours away by train. We work with London businesses remotely and price at Welsh rates, not London ones.',
    travel: 'Two hours on the train, so most of this runs over calls and email. Worth saying plainly: you are paying Welsh prices for London work, and that is the main reason to use someone outside the city.',
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
    title: `Web Design & App Development ${market.city} | DH Website Services`,
    description: `Web design and iPhone and Android apps for ${market.city} businesses. Websites from £449, apps from £349, fixed price.`,
    heading: `Web design and apps in ${market.city}.`,
    intro: market.intro,
    sections: [
      { title: 'Getting to you', body: market.travel },
      {
        title: 'What it costs',
        body: 'Websites start at £449 and apps at £349, quoted in full before anything starts. No hourly rate and no change-order billing: the number we give you is the number you pay.',
      },
      {
        title: 'Who does the work',
        body: 'We do: David Hooper builds it and Jack Deane keeps it moving. No account manager and no outsourcing. You get our direct numbers and we answer them.',
      },
      ...(market.extra || []),
    ],
    ctaLabel: `Get a price for your ${market.city} project`,
    ctaHref: '/contact',
    schema: makeServiceSchema(path, `Web design and app development ${market.city}`, `Web design and iPhone and Android apps for ${market.city} businesses. Fixed price.`),
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


/**
 * The questions people ask before they get in touch.
 *
 * Written out here rather than only in the React blocks so they reach the
 * prerendered HTML: pages were shipping 300-600 characters for Google to judge
 * them on, which is a thin thing to be ranked against for a business whose
 * product is websites.
 */
export const SITE_FAQS = [
  {
    q: 'How much does an app cost?',
    a: '£349 puts your website on the App Store and Google Play as a real app with push notifications. £699 adds booking or ordering. From £1,499 for a full build or a game. All prices exclude VAT and are agreed in full before anything starts.',
  },
  {
    q: 'How much does a website cost?',
    a: 'Four fixed packages: £449 for five pages, £999 for ten pages with a blog, £1,499 with e-commerce, and £2,499 including a staff portal. The price is agreed in full before anything starts and does not move.',
  },
  {
    q: 'How long does it take?',
    a: 'Seven days for a website. Apps, staff portals and larger integrations vary too much to put a number on, so we agree a date with you at scoping and stick to it.',
  },
  {
    q: 'Do I own the app or website afterwards?',
    a: 'Yes. You get the source code and the domain stays in your name, so you can take the whole thing to somebody else whenever you want. Nothing here is rented to you.',
  },
  {
    q: 'Who actually does the work?',
    a: 'We do. David Hooper founded the company and does the development; Jack Deane is our assistant manager. There is no account manager and nobody your job gets passed down to.',
  },
  {
    q: 'Do you deal with Apple and Google for us?',
    a: 'Yes. We set up the store listings, write the privacy declarations, submit the builds and deal with the reviewers. Our own game, Fish Tank, is on the App Store and Google Play now.',
  },
  {
    q: 'What does hosting cost?',
    a: 'From £35 a month, kept separate from the build price so you can see what you pay once and what you pay every month. It covers the server, SSL, backups and updates.',
  },
  {
    q: 'Where are you based?',
    a: 'Pontypridd. We meet clients in person across Cardiff and Wales, but most work happens over email and calls, and we price the same wherever you are.',
  },
]

export const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: SITE_FAQS.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
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
