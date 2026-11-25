/**
 * The homepage as a block document.
 *
 * October 2026: refocused on app development and web design, written as the
 * team rather than as one person. Every product named here is real and every
 * status is what is true today -- Fish Tank is live on both stores,
 * Fam & a Half (was FindMyGang) is live on the App Store (iPhone only, since 15 Oct 2026). Keep it that way:
 * no download counts, ratings, client logos or testimonials until there are
 * real ones to show.
 *
 * November 2026: reordered for someone buying a website (David, 8 Nov):
 * what we do and the prices first, then proof, then how we work; our own
 * apps come after as evidence. DH Local is the first price card.
 *
 * 16 Nov 2026 (David: "slate it, don't hold back"): Maltsters moved into the
 * hero as the proof (its own section repeated the same screenshot, so it
 * went; the case study and /portfolio carry the detail), one action (book a call), plain headings instead of
 * slogans, the Microsoft section and the duplicate stats strip dropped, the
 * award folded into the trust bar, and our own apps cut down to a short
 * "we also build apps" section near the end. Maltsters is our only client
 * site; don't imply more.
 *
 * 24 Nov 2026 (David): the big idea is same-day updates -- the owner never
 * logs in, they message us and it is live that day. Maltsters is the proof:
 * every event on its site was posted by us. Don't claim the pub edits it.
 *
 * Once a published document exists in website_pages for slug "home", that wins
 * and this is only a safety net. As of 6 Oct 2026 there is no such row.
 */

import { WORK_ITEMS, CLIENT_SITES, TEAM_PEOPLE } from './work.js'

export const HOME_DOCUMENT = {
  version: 1,
  blocks: [
    {
      id: 'home-hero',
      type: 'hero',
      props: {
        headlineLead: 'Never touch your website again.',
        typewriterLines: ['We update it the same day.'],
        body: 'Message us your new menu, opening hours, offer or event, and it is live on your site the same day. We are a small team in Pontypridd: we build your website, host it and keep it current for one monthly price, with nothing to pay upfront.',
        primaryLabel: 'Start for £0 upfront',
        primaryHref: '/local',
        secondaryLabel: 'Message us',
        secondaryHref: '/contact#brief',
        stats: [
          { value: 'From £449', label: '+ VAT' },
          { value: '7 days', label: 'to build' },
          { value: '£0 upfront', label: 'with DH Local' },
        ],
        showcase: {
          image: CLIENT_SITES[0].image,
          imageSmall: CLIENT_SITES[0].imageSmall,
          alt: CLIENT_SITES[0].imageAlt,
          url: CLIENT_SITES[0].url,
          href: CLIENT_SITES[0].linkHref,
          caption: 'Our latest site: The Maltsters Arms on Bridge Street, Pontypridd. The pub messages us its events and we put them live the same day.',
          caseStudyHref: CLIENT_SITES[0].caseStudyHref,
        },
      },
    },

    {
      id: 'home-trust',
      type: 'trust-bar',
      props: {
        items: [
          { icon: 'award', label: 'Web Design Service of the Year', sub: 'Wales Prestige Awards 2027/28', href: '/news/web-design-service-of-the-year-wales' },
          { icon: 'phone', label: 'Our own apps are live', sub: 'App Store and Google Play' },
          { icon: 'lock', label: 'UK company', sub: 'Pontypridd, Wales' },
        ],
      },
    },

    {
      id: 'home-pricing',
      type: 'pricing-preview',
      props: {
        eyebrow: 'Prices',
        heading: 'What it costs',
        note: 'All prices exclude VAT. One-off builds come with a care plan from £35 a month once live; DH Local includes it.',
        linkLabel: 'See all prices, hosting and app care',
        linkHref: '/pricing',
        packages: [
          { name: 'DH Local', price: '£79', priceNote: 'a month + VAT · £0 upfront', tagline: 'Your website and Google listing, looked after', who: 'No build fee. A five-page site, updates whenever you need them and your Google listing kept up to date. 12-month minimum.', features: 'Up to 5 pages · Hosting included · Changes on request · Google listing', popular: true, badge: 'No build fee', href: '/local', ctaLabel: 'See DH Local' },
          { name: 'Starter website', price: '£449', tagline: 'A five-page website', who: 'Delivered in 7 days', features: '5 pages · Mobile layout · SEO setup · Contact form', popular: false, href: '/order?plan=starter', ctaLabel: 'Pay deposit & start' },
          { name: 'Growth website', price: '£999', tagline: 'Ten pages and a blog', who: 'Delivered in 7 days', features: '10 pages · Blog · Full SEO setup · Branding', popular: false, href: '/order?plan=growth', ctaLabel: 'Pay deposit & start' },
          { name: 'Booking or ordering app', price: '£699', tagline: 'Customers book or order from their phone', who: 'Card payments and reminders', features: 'Bookings or orders · Card payments · Reminder notifications · One screen to run it', popular: false, href: '/order?plan=booking-app', ctaLabel: 'Pay deposit & start' },
        ],
      },
    },


    {
      id: 'home-why',
      type: 'why-grid',
      props: {
        eyebrow: 'Working with us',
        heading: 'How it works',
        items: [
          { title: 'A fixed price', desc: 'We quote before we start and that is the price. If you add something halfway through, we price it separately and tell you first.' },
          { title: 'You see it before it goes live', desc: 'You get a preview link to check on your own phone and computer. Nothing goes live until you have signed it off.' },
          { title: 'You own it', desc: 'The domain, the content and the code are yours. If you ever leave, you take it with you.' },
          { title: 'Same-day updates', desc: 'Message us a change and it is live the same day. Hosting, security and backups are handled too, so the site never goes stale.' },
          { title: 'Quick replies', desc: 'Message or call and we reply the same working day, usually within a few hours.' },
          { title: 'Local', desc: 'Based in Pontypridd. We can meet you in person anywhere across RCT, Cardiff and South Wales.' },
        ],
      },
    },

    {
      id: 'home-team',
      type: 'team',
      props: {
        eyebrow: 'Who you deal with',
        heading: 'David and Jack',
        body: 'There is no account manager between you and the work. You talk to the people building your site, and when you ring 01443 805303, you get one of us.',
        people: TEAM_PEOPLE,
      },
    },


    {
      id: 'home-faq',
      type: 'faq',
      props: {
        eyebrow: 'Questions',
        heading: 'Before you get in touch',
        body: 'The things people usually ask first.',
        items: [
          { q: 'How much does a website cost?', a: 'Our websites start at £449 + VAT as a one-off, delivered in 7 days, plus a care plan from £35 a month once it is live (hosting, security, backups and updates). Until 30 November our Black Friday five-page site is £249 + VAT. If you would rather not pay upfront, DH Local is £79 a month + VAT with no build fee, on a 12-month minimum, and includes the care plan, changes and your Google listing.' },
          { q: 'Do I need an app, or just a website?', a: 'Most businesses need a website first, and we will say so rather than sell you an app. An app earns its keep when customers come back again and again: booking, ordering, loyalty, or staff who need something on their phone.' },
          { q: 'How long does a website take?', a: 'Seven days for our website packages. Apps, staff systems and larger integrations vary too much to put a number on here, so we agree a date at the start and stick to it.' },
          { q: 'Can I update it myself?', a: 'Yes. Like the Maltsters Arms, you get your own admin for the parts that change, such as offers, opening hours, photos and events. Most owners are busy, so they just message us and we put it live the same day.' },
          { q: 'Do you deal with Apple and Google for apps?', a: 'Yes. We set up the store listings, write the privacy declarations, submit the builds and answer the reviewers. We have taken our own apps through Apple review and Google Play, so we know where they get held up.' },
          { q: 'Do we own the website afterwards?', a: 'Yes. The domain stays in your name, and you get the content and the code. Nothing is rented to you.' },
        ],
        footerNote: 'Something else?',
        linkLabel: 'Ask us',
        linkHref: '/contact',
      },
    },

    {
      id: 'home-cta',
      type: 'closing-cta',
      props: {
        eyebrow: 'Need a website that stays up to date?',
        heading: 'Send us a few lines.',
        body: 'Tell us your business and what you need. We reply the same working day with a plan and a price. Prefer to talk? Ring 01443 805303.',
        primaryLabel: 'Message us',
        primaryHref: '/contact#brief',
        secondaryLabel: 'See DH Local',
        secondaryHref: '/local',
        assurances: ['£0 upfront', 'Same-day updates', 'Reply the same working day'],
      },
    },
  ],
}

export default HOME_DOCUMENT
