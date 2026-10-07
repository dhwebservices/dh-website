/**
 * The homepage as a block document.
 *
 * October 2026: refocused on app development and web design, written as the
 * team rather than as one person. Every product named here is real and every
 * status is what is true today -- Fish Tank is live on both stores,
 * Fam & a Half (was FindMyGang) is in App Store review and NOT on the App Store yet. Keep it that way:
 * no download counts, ratings, client logos or testimonials until there are
 * real ones to show.
 *
 * Once a published document exists in website_pages for slug "home", that wins
 * and this is only a safety net. As of 6 Oct 2026 there is no such row.
 */

import { WORK_ITEMS, TEAM_PEOPLE } from './work.js'

export const HOME_DOCUMENT = {
  version: 1,
  blocks: [
    {
      id: 'home-hero',
      type: 'hero',
      props: {
        headlineLead: 'We build apps',
        typewriterLines: ['and websites.'],
        body: 'DH Website Services is a small software company in Pontypridd, Wales. We build and run our own apps: Fam & a Half, a free family location app, and Fish Tank, a multiplayer game on both app stores. We also build iPhone and Android apps and websites for businesses, at a fixed price agreed before we start.',
        primaryLabel: 'See Fam & a Half',
        primaryHref: '/famandahalf/',
        secondaryLabel: 'Talk to us about a project',
        secondaryHref: '/contact',
        showScrollHint: true,
        stats: [
          { value: '2 apps', label: 'Our own products' },
          { value: 'From £349', label: 'Client apps' },
          { value: 'From £449', label: 'Websites' },
          { value: 'Fixed price', label: 'Agreed before we start' },
        ],
      },
    },

    {
      id: 'home-work',
      type: 'work-showcase',
      props: {
        eyebrow: 'Our products',
        heading: 'Apps we build\nfor ourselves.',
        body: 'Our own products, not client work. Fish Tank is live on both app stores, Fam & a Half is with Apple for review, and two more run our business every day.',
        items: WORK_ITEMS,
      },
    },

    {
      id: 'home-trust',
      type: 'trust-bar',
      props: {
        items: [
          { icon: 'phone', label: 'On the App Store', sub: 'Fish Tank' },
          { icon: 'game', label: 'On Google Play', sub: 'Fish Tank' },
          { icon: 'award', label: 'Microsoft Partner', sub: 'Verified' },
          { icon: 'lock', label: 'GDPR compliant', sub: 'Data protection' },
        ],
      },
    },


    {
      id: 'home-services',
      type: 'services-grid',
      props: {
        eyebrow: 'What we build',
        heading: 'Apps first.\nWebsites too.',
        body: 'We design it, build it, get it through the app stores and keep it running. One fixed price, agreed before anything starts.',
        linkLabel: 'See all services',
        linkHref: '/services',
        services: [
          { icon: 'phone', title: 'iPhone and Android apps', desc: 'Native apps for the App Store and Google Play. We handle Apple review and the Play Console, which is where most first apps get stuck.' },
          { icon: 'design', title: 'Web design', desc: 'Websites designed for your business and written in React, not assembled in a page builder. The domain stays in your name.' },
          { icon: 'people', title: 'Staff portals and business systems', desc: 'Rotas, clock-in, timesheets, leave and payslips, on the web and on the phone. We run our own business on one.' },
          { icon: 'game', title: 'Games', desc: 'Fish Tank is ours: a multiplayer game on the App Store and Google Play. If you have a game in mind, we have done the hard parts before.' },
        ],
      },
    },

    {
      id: 'home-team',
      type: 'team',
      props: {
        eyebrow: 'Who you deal with',
        heading: 'A small team,\nby name.',
        body: 'There is no account manager between you and the work. You talk to the people building your app or site, and when you ring, you get one of us.',
        people: TEAM_PEOPLE,
      },
    },

    {
      id: 'home-why',
      type: 'why-grid',
      props: {
        eyebrow: 'How we work',
        heading: 'What you get.',
        items: [
          { title: 'Fixed price', desc: 'We quote before we start and that is the price. If you add something halfway through, we price it separately and tell you first.' },
          { title: 'Both app stores handled', desc: 'Developer accounts, screenshots, privacy forms, Apple review and Google Play. You do not need to learn any of it.' },
          { title: 'You try it first', desc: 'Test builds go onto your own phone through Apple TestFlight and Google Play testing. Nothing reaches the public stores until you have signed it off.' },
          { title: 'You own it', desc: 'Source code, design files, the domain and the store listings are yours. Take them anywhere.' },
          { title: 'Quick replies', desc: 'Email or call and we reply the same working day, usually within a few hours.' },
          { title: 'Based in Pontypridd', desc: 'We meet clients in person across Cardiff and Wales, and work with businesses anywhere in the UK.' },
        ],
      },
    },

    {
      id: 'home-pricing',
      type: 'pricing-preview',
      props: {
        eyebrow: 'Pricing',
        heading: 'Prices on the page,\nnot on request.',
        note: 'All prices exclude VAT. Hosting and app care are monthly and listed separately.',
        linkLabel: 'See full pricing, hosting and app care',
        linkHref: '/pricing',
        packages: [
          { name: 'Simple app', price: '£349', tagline: 'Your website as a real app', who: 'On the App Store and Google Play', features: 'Both store submissions · Push notifications · Your own app icon and listing', popular: false },
          { name: 'Booking or ordering app', price: '£699', tagline: 'Customers book or order from their phone', who: 'Card payments and reminders', features: 'Bookings or orders · Card payments · Reminder notifications · One screen to run it', popular: true },
          { name: 'Starter website', price: '£449', tagline: 'A five-page website', who: 'Delivered in 7 days', features: '5 pages · Mobile layout · SEO setup · Contact form', popular: false },
          { name: 'Growth website', price: '£999', tagline: 'Ten pages and a blog', who: 'Delivered in 7 days', features: '10 pages · Blog · Full SEO setup · Branding', popular: false },
        ],
      },
    },

    {
      id: 'home-partner',
      type: 'partner-highlight',
      props: {
        eyebrow: 'Microsoft approved partner',
        heading: 'Already run on Microsoft? We build with that in mind.',
        body: 'We hold Microsoft approved partner status. If your business runs on Microsoft 365, Teams and Outlook, we plan apps, websites and staff tools around them from the start. Our own staff portal signs in with Microsoft.',
        primaryLabel: 'Explore partnerships',
        primaryHref: '/partners',
        secondaryLabel: 'Talk to us',
        secondaryHref: '/contact',
        points: [
          'Microsoft sign-in for staff apps and portals',
          'Rotas and leave synced to Outlook calendars',
          'Fixed pricing, agreed before we start',
        ],
      },
    },

    {
      id: 'home-social-proof',
      type: 'testimonials',
      props: {
        eyebrow: 'What you can hold us to',
        heading: 'Promises, not\nstatistics.',
        testimonials: [],
        stats: [
          { value: '7 days', label: 'Website delivery' },
          { value: '< 24h', label: 'Reply to enquiries' },
          { value: '£349', label: 'Apps from' },
          { value: '£0', label: 'Cost to get a quote' },
        ],
      },
    },

    {
      id: 'home-faq',
      type: 'faq',
      props: {
        eyebrow: 'Common questions',
        heading: 'Before you get in touch',
        body: 'The things people usually ask first.',
        items: [
          { q: 'Do I need an app, or just a website?', a: 'Most businesses need a website first, and we will say so rather than sell you an app. An app earns its keep when customers come back again and again: booking, ordering, loyalty, or staff who need something on their phone.' },
          { q: 'Do you deal with Apple and Google for us?', a: 'Yes. We set up the store listings, write the privacy declarations, submit the builds and answer the reviewers. We have taken our own apps through Apple review and Google Play, so we know where they get held up.' },
          { q: 'Can we try the app before it goes live?', a: 'Yes. You get test builds on your own phone through Apple TestFlight and Google Play testing, and nothing goes to the public stores until you have signed it off.' },
          { q: 'How long does a website take?', a: 'Seven days for our website packages. Apps, staff portals and larger integrations vary too much to put a number on here, so we agree a date at scoping and stick to it.' },
          { q: 'Can you connect it to what we already use?', a: 'Usually, yes. We have built against Microsoft 365, Stripe, Supabase, Twilio, Resend and Apple and Google push notifications. Tell us what you run and we will say plainly whether it is straightforward or will add cost.' },
          { q: 'Do we own the app or website afterwards?', a: 'Yes. You get the source code and design files, the domain stays in your name, and the apps can sit under your own developer accounts. Nothing is rented to you.' },
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
        eyebrow: 'Got an app or a site in mind?',
        heading: 'Tell us what it needs to do.',
        body: 'We will reply within a working day with questions, a plan and a fixed price.',
        primaryLabel: 'Start a project →',
        primaryHref: '/contact',
        secondaryLabel: 'View pricing',
        secondaryHref: '/pricing',
        assurances: ['Fixed price', 'No contracts', 'Reply within 24 hours'],
      },
    },
  ],
}

export default HOME_DOCUMENT
