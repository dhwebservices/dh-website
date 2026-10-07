/**
 * Guides and case studies.
 *
 * Written to be useful on their own, not as keyword filler: every price is the
 * one on /pricing, every app store rule is the real one, and every case study
 * describes something we built and still run. No invented numbers, clients or
 * results -- if a figure is not true today, it does not go in.
 *
 * Body text is a small markdown subset shared with the legal pages:
 * ## / ### headings, - and 1. lists, **bold**, [links](/path), paragraphs.
 */

export const GUIDES = [
  {
    slug: 'website-cost-wales',
    title: 'How Much Does a Website Cost in Wales? (2026 Prices) | DH Website Services',
    description: 'What a small business website really costs in Wales in 2026: build prices, hosting, domains and the extras people forget, with fixed prices from £449.',
    heading: 'How much does a website cost in Wales?',
    intro: 'Most small businesses in Wales pay somewhere between a few hundred and a few thousand pounds for a website, plus a monthly cost to keep it online. Here is what drives the price, what we charge, and the costs that catch people out.',
    published: '2026-10-07',
    body: `
## The short answer
For a small business, expect to pay roughly:
- **£400 to £1,000** for a professionally built five to ten page website
- **£1,500 to £3,000** if you need online payments, a shop or a booking system
- **£20 to £50 a month** for hosting, security updates and backups

Anything much cheaper is usually a template with your logo dropped in. Anything much more expensive should come with a clear reason, such as a large shop or a custom system behind the scenes.

## What we charge
Our prices are published on the [pricing page](/pricing) and agreed in full before anything starts. All prices exclude VAT.
- **Starter, £449:** five pages, mobile layout, SEO setup and a contact form, delivered in seven days
- **Growth, £999:** ten pages, a blog, a full SEO setup and branding
- **Pro, £1,499:** everything in Growth plus an online shop
- **Enterprise, £2,499:** a full site plus a staff portal for rotas, timesheets and leave

Hosting starts at **£35 a month**, kept separate from the build price so you can see what you pay once and what you pay every month.

## What actually changes the price
### The number of pages
A five-page site (home, about, services, gallery, contact) covers most trades and local services. Each extra page is more writing, design and testing.

### Taking payments or bookings
A shop or booking system means card payments, stock or availability, confirmation emails and a screen for you to run it. That is the biggest single jump in cost.

### Who writes the words
If you supply your own text and photos, the job is quicker. If the copy has to be written from scratch, it takes longer, but it is usually worth it: the words are what Google reads and what makes people pick up the phone.

### Custom features
Logins, customer accounts, quote calculators and links to other systems are priced separately, because they vary too much to fit a package.

## The costs people forget
- **Your domain name:** around £10 to £20 a year for a .co.uk or .com
- **Hosting:** a website has to live somewhere. Cheap shared hosting is slow; good hosting is £20 to £50 a month including security updates and backups
- **Email:** Microsoft 365 or Google Workspace is around £5 a user per month if you want email at your own domain
- **Changes after launch:** ask up front what small changes cost once the site is live

## Questions to ask any web designer
1. **Is the price fixed?** Get one number in writing before work starts.
2. **Do I own the site?** You should get the code and keep the domain in your own name.
3. **Who does the work?** Find out whether it is built by the person you are speaking to or passed on to someone else.
4. **What happens if I leave?** You should be able to take your site to another company without paying to get it back.

With us the answers are yes, yes, us, and you take it with you. If you would like a price for your project, [get in touch](/contact) or try the [project calculator](/calculator).
`,
  },
  {
    slug: 'get-your-app-on-the-app-store',
    title: 'How to Get Your Business App on the App Store and Google Play | DH Website Services',
    description: 'A plain-English guide to getting a business app onto the Apple App Store and Google Play: accounts, costs, review rules, privacy forms and how long it takes.',
    heading: 'How to get your business app on the App Store and Google Play',
    intro: 'Getting an app into the stores is less about writing code and more about accounts, rules and paperwork. This is the process we go through for our own apps and for clients, step by step.',
    published: '2026-10-07',
    body: `
## 1. Set up the developer accounts
Both stores need a developer account, and it should be in your business name rather than your developer's.
- **Apple Developer Program:** an annual fee (99 US dollars, charged in local currency). For a company account Apple needs your D-U-N-S number, a free business identifier that can take a few days to come through.
- **Google Play Console:** a one-off registration fee of 25 US dollars. Google checks your identity, and new personal accounts have to run a closed test with real testers before they can publish.

Having the accounts in your name means the app, its reviews and its downloads belong to you.

## 2. Build something the stores will accept
Apple in particular rejects apps that are just a website in a frame. Its review guidelines call this minimum functionality. An app has to do something an app is good at, such as:
- **Push notifications** for bookings, offers or order updates
- **Working offline** or saving things to the phone
- **Using the phone itself:** camera, location, Apple Pay or Google Pay, sign in with Apple

This is why even our simplest app package includes push notifications rather than only showing your website.

## 3. Test it on real phones
Before anything goes public, test builds go onto real phones through **TestFlight** on iPhone and **internal testing** on Google Play. You use the app exactly as a customer would, and nothing is released until you have signed it off.

## 4. Prepare the store listing
Each store needs:
- An app name and short description, with the words people actually search for
- Screenshots at the sizes each store requires
- A privacy policy on a public web page
- A support web address customers can reach you on

## 5. Fill in the privacy declarations
Apple's App Privacy section and Google's Data safety form ask exactly what data the app collects, why, and whether it is linked to the user. They must match what the app really does. Getting these wrong is one of the most common reasons an app is held up or pulled later.

## 6. Submit for review
- **Apple** reviews every version. Most reviews finish within a day or two. If your app has a login, Apple needs a working demo account.
- **Google** reviews new apps too. The first review can take several days.

If a reviewer rejects the app, they say which rule it broke. You fix it, reply and resubmit.

## 7. After launch
Keep the app working with each new version of iOS and Android, reply to reviews, and update the privacy declarations whenever you add something that collects data.

## How long does it take?
For a straightforward app with the accounts already in place, from finished build to live in both stores is usually one to two weeks. The developer accounts are often the slowest part, so start those first.

## What we do
We set up the store listings, write the privacy declarations, submit the builds and deal with the reviewers for you. Our own apps, [Fish Tank](/case-studies/fish-tank/) and [Fam & a Half](/case-studies/fam-and-a-half/), went through exactly this. App prices start at £349 and are on the [pricing page](/pricing).
`,
  },
  {
    slug: 'website-or-app',
    title: 'Website or App: Which Does Your Small Business Need First? | DH Website Services',
    description: 'Should a small business start with a website or an app? A straight comparison of cost, reach and what each is good at, from a team that builds both.',
    heading: 'Website or app: which does your business need first?',
    intro: 'We build both, so we have no reason to push you towards one. For most small businesses the honest answer is a website first, then an app when your customers come back often enough to want one.',
    published: '2026-10-07',
    body: `
## Start with a website if
- **People need to find you.** Google sends people to websites, not apps. If new customers search for what you do, a website is how they find you.
- **Most customers visit once or occasionally.** Nobody installs an app for a plumber they call once a year.
- **You want the lowest cost to get going.** Our websites start at £449.

## Add an app when
- **Customers come back often.** Cafés, salons, gyms, takeaways, clubs and shops with regulars are where apps earn their keep.
- **You want to reach people directly.** A push notification lands on the customer's lock screen. An email may never be opened.
- **You want bookings or orders without the fees.** An app can take orders and payments directly instead of through a marketplace that takes a cut.
- **You have staff to organise.** A staff app for rotas, clock-in and leave can save hours every week. We run our own business on one.

## Side by side
- **Found on Google:** website yes, app no
- **On the customer's home screen:** website no, app yes
- **Push notifications:** website limited, app yes
- **Works for one-off visitors:** website yes, app rarely
- **Starting price with us:** website £449, app £349 (turning your existing website into an app with push notifications)

## The route we usually recommend
1. Get a fast, clear website that ranks for what you do and where you are.
2. Once you have regular customers, add an app built on top of it, starting with push notifications.
3. Add bookings, ordering or a loyalty scheme in the app when there is demand for it.

You never pay twice for the same thing: the app can reuse your website's content and systems.

## Still not sure?
[Book a free call](/contact) and tell us how your customers find you and how often they come back. We will tell you honestly which one to do first, even if the answer is neither yet.
`,
  },
]

export const CASE_STUDIES = [
  {
    slug: 'fish-tank',
    title: 'Fish Tank: Building a Multiplayer Game for iPhone and Android | DH Website Services',
    description: 'How we designed, built and launched Fish Tank, a real-time multiplayer game live on the App Store and Google Play, and the servers that run it.',
    heading: 'Fish Tank: a multiplayer game on both app stores',
    intro: 'Fish Tank is our own game. We designed it, built it, got it through Apple and Google review, and run the servers it plays on. It is live on the App Store and Google Play.',
    published: '2026-10-07',
    body: `
## The brief
Build a game people can play against their friends in real time, on iPhone and Android, without the cost of a big games studio or a hosted game server bill.

## What we built
- **A native iPhone and iPad game,** written in Swift with Apple's SpriteKit games engine
- **A separate Android build** with the same features, so both sets of players get a game made for their phone
- **Real-time multiplayer between iPhone and Android:** players add friends, challenge them and climb a shared leaderboard
- **Push notifications** when a friend challenges you

## How it runs
The multiplayer server runs on Cloudflare's network, close to players wherever they are, and costs a fraction of a traditional game server. Push notifications go out through Apple's and Google's own notification services.

## Getting it into the stores
We handled the developer accounts, the store listings and screenshots, the privacy declarations and both review processes, on Apple and Google.

## What it shows
If you want a game or an app with real-time features, accounts and friends, we have already solved the hard parts on our own product.

[See Fish Tank on the App Store](https://apps.apple.com/gb/app/the-fish-tank/id6801622379) · [Get it on Google Play](https://play.google.com/store/apps/details?id=com.dhwebsiteservices.fishtank) · [Talk to us about your app](/contact)
`,
  },
  {
    slug: 'fam-and-a-half',
    title: 'Fam & a Half: Building a Private Family Locator App | DH Website Services',
    description: 'How we built Fam & a Half, a free family and friends location app for iPhone with live maps, arrival alerts, SOS and crash detection, and the backend behind it.',
    heading: 'Fam & a Half: a free, private family locator',
    intro: 'Fam & a Half is our own location-sharing app for family and friends, named after our family WhatsApp group. We built it as a free, private alternative to paid family locator apps.',
    published: '2026-10-07',
    body: `
## The brief
Families should not have to pay a monthly subscription for safety features. We wanted a locator that does the important things for free, never sells location data, and works for friends as well as families.

## What it does
- **A live map** of everyone in your circle
- **Arrival and departure alerts** for saved places like home, school and work
- **SOS and crash detection,** free for everyone
- **"Can someone get me?"** pick-up requests sent to the whole circle
- **Walk me home:** someone watches your journey and is alerted if you stop or go quiet
- **Meet-ups** that show who is on their way
- **Night-out circles** that delete themselves afterwards
- **Privacy controls,** including a temporary Bubble mode and a record of who has checked your location

## How it is built
- **A native iPhone app** in Swift and SwiftUI, built to use as little battery as possible while still keeping the map up to date
- **A secure database** where every request is checked against who is allowed to see what, so people only ever see the circles they belong to
- **Urgent alerts** for SOS, crash detection and pick-up requests that can break through Focus modes, using Apple's Time Sensitive notifications
- **Built-in crash and problem reporting,** plus support and feature requests that come straight to us
- **A staff admin console** in our own staff portal for support, announcements and keeping the service healthy

## Where it is now
Fam & a Half is with Apple for review. [Find out more about the app](/famandahalf/).

## What it shows
Location, real-time updates, notifications, privacy and a proper backend are the hard parts of most serious apps. If your idea needs any of them, [talk to us](/contact).
`,
  },
  {
    slug: 'staff-portal',
    title: 'DH Staff Portal: Rotas, Timesheets and Payslips in One App | DH Website Services',
    description: 'The staff portal we built and run our own business on: Microsoft sign-in, rotas, clock-in, timesheets, leave and payslips on web and iPhone.',
    heading: 'DH Staff Portal: the system we run our own staff on',
    intro: 'Before we sold staff portals to anyone else, we built one for ourselves. It runs the day-to-day of DH Website Services on the web and on iPhone.',
    published: '2026-10-07',
    body: `
## The brief
Replace the spreadsheets, group chats and separate apps a small business uses to manage its staff with one system that people actually open.

## What it does
- **Microsoft sign-in,** so staff use the work account they already have
- **Rotas** that staff can see on their phone, with shifts synced to their Outlook calendar
- **Clock-in and timesheets,** with reminders before a shift starts
- **Leave requests and approvals**
- **Payslips** in one place
- **Push notifications** to the phone for anything that needs attention

## How it is built
A web app and an iPhone app sharing the same secure database, with sign-in through Microsoft so there are no extra passwords to manage. Our admin tools for our other products, such as our phone system and Fam & a Half, live inside it too.

## What it shows
If your business runs on Microsoft 365, we can build staff tools around it from the start. A staff portal is included in our £2,499 Enterprise package, or can be priced on its own. [Talk to us about yours](/contact).
`,
  },
  {
    slug: 'phone-system',
    title: 'DH Phone: Replacing a Hosted Business Phone System | DH Website Services',
    description: 'How we replaced a hosted business phone service with our own system on Twilio and Cloudflare: greeting, call menu, queue and ring order, all in our own code.',
    heading: 'DH Phone: our own business phone system',
    intro: 'We were paying around £200 a month for a hosted business phone service. We replaced it with our own system, which now answers every call to 01443 805303.',
    published: '2026-10-07',
    body: `
## The brief
Keep everything a business phone line needs, including a greeting, a call menu, a queue and calls ringing the right people in the right order, without the monthly bill of a hosted phone provider.

## What we built
- **The greeting and call menu** callers hear when they ring
- **A call queue** so nobody gets an engaged tone
- **Ring order:** who the call goes to first, and who it moves on to if they do not answer
- **Call forwarding** to each team member's own phone
- **Admin controls** inside our staff portal

## How it runs
Twilio carries the calls on the phone network. The logic that decides what happens to each call is our own code, running on Cloudflare. Changing the greeting or who answers is a setting, not a support ticket.

## What it shows
If you are paying for software that does not quite fit, it can often be replaced with something built around how you actually work. Ring **01443 805303** and you are on it. [Talk to us](/contact) about what you would like to replace.
`,
  },
]

const SITE = 'https://www.dhwebsiteservices.co.uk'

function articleSchema(item, path, type) {
  return {
    '@context': 'https://schema.org',
    '@type': type,
    headline: item.heading,
    description: item.description,
    datePublished: item.published,
    dateModified: item.updated || item.published,
    inLanguage: 'en-GB',
    mainEntityOfPage: `${SITE}${path}/`,
    image: `${SITE}/og-image.png`,
    author: { '@type': 'Organization', '@id': `${SITE}/#organization`, name: 'DH Website Services' },
    publisher: { '@type': 'Organization', '@id': `${SITE}/#organization`, name: 'DH Website Services', logo: { '@type': 'ImageObject', url: `${SITE}/dh-logo.png` } },
  }
}

function toPage(item, base, kind, type) {
  const path = `/${base}/${item.slug}`
  return {
    path,
    title: item.title,
    description: item.description,
    heading: item.heading,
    intro: item.intro,
    sections: [],
    ctaLabel: 'Talk to us about your project',
    ctaHref: '/contact',
    article: { kind, body: item.body, published: item.published },
    schema: articleSchema(item, path, type),
  }
}

const listBody = (items, base) => items
  .map((item) => `### [${item.heading}](/${base}/${item.slug}/)\n${item.intro}`)
  .join('\n\n')

export const ARTICLE_PAGES = [
  {
    path: '/guides',
    title: 'Guides for Small Businesses: Websites and Apps | DH Website Services',
    description: 'Plain-English guides on website costs, getting an app onto the App Store and Google Play, and whether your business needs a website or an app first.',
    heading: 'Guides for small businesses.',
    intro: 'Straight answers to the questions we get asked most about websites and apps, with real prices and the actual rules.',
    sections: [],
    ctaLabel: 'Ask us a question',
    ctaHref: '/contact',
    article: { kind: 'Guides', body: listBody(GUIDES, 'guides') },
  },
  ...GUIDES.map((item) => toPage(item, 'guides', 'Guide', 'BlogPosting')),
  {
    path: '/case-studies',
    title: 'Case Studies: Apps and Systems We Have Built | DH Website Services',
    description: 'How we built Fish Tank, Fam & a Half, our staff portal and our own phone system: what each one does, how it works and what it shows.',
    heading: 'Case studies.',
    intro: 'Products we designed, built and still run ourselves. Each one is live or in daily use, not a mockup.',
    sections: [],
    ctaLabel: 'Talk to us about your project',
    ctaHref: '/contact',
    article: { kind: 'Case studies', body: listBody(CASE_STUDIES, 'case-studies') },
  },
  ...CASE_STUDIES.map((item) => toPage(item, 'case-studies', 'Case study', 'Article')),
]
