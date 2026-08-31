/**
 * The homepage as a block document.
 *
 * This is a transcription of what Home.jsx already renders - same words, same
 * order, same links. It ships in the bundle as the fallback so the page still
 * works before anything is published from the portal, and so the editor opens
 * on the real homepage instead of an empty canvas.
 *
 * Once a published document exists in website_pages for slug "home", that wins
 * and this is only a safety net.
 */

export const HOME_DOCUMENT = {
  version: 1,
  blocks: [
    {
      id: 'home-hero',
      type: 'hero',
      props: {
        headlineLead: 'Built in Cardiff:',
        typewriterLines: [
          'your website.',
          'your app, on both stores.',
          'your staff portal.',
          'your game.',
          'and the code is yours.',
        ],
        body: 'I build websites, apps and games from Cardiff. You get a fixed price before I start, and you own everything at the end.',
        primaryLabel: 'Get started',
        primaryHref: '/contact',
        secondaryLabel: 'See pricing',
        secondaryHref: '/pricing',
        showScrollHint: true,
        stats: [
          { value: 'David Hooper', label: 'Your only contact' },
          { value: 'Cardiff', label: 'Based in Wales' },
          { value: 'From £449', label: 'Real pricing' },
          { value: '7 days', label: 'Typical delivery' },
        ],
      },
    },

    {
      id: 'home-trust',
      type: 'trust-bar',
      props: {
        items: [
          { icon: '🎮', label: 'On Google Play', sub: 'Fish Tank' },
          { icon: '🔒', label: 'GDPR compliant', sub: 'Data protection' },
          { icon: '🏆', label: 'Microsoft Partner', sub: 'Verified' },
          { icon: '⚡', label: '7 day delivery', sub: 'Websites' },
        ],
      },
    },

    {
      id: 'home-partner',
      type: 'partner-highlight',
      props: {
        eyebrow: 'Microsoft approved partner',
        heading: 'Better suited to businesses already built around Microsoft.',
        body: 'I now hold Microsoft approved partner status. If your business already runs on Microsoft tools, I can scope websites and operational workflows with Microsoft 365, Teams and Outlook in mind from the start.',
        primaryLabel: 'Explore partnerships',
        primaryHref: '/partners',
        secondaryLabel: 'Talk to us',
        secondaryHref: '/contact',
        points: [
          'Microsoft-aware delivery for service businesses',
          'Cleaner planning around Microsoft 365 workflows',
          'Founder-led build process with fixed pricing',
        ],
      },
    },

    {
      id: 'home-services',
      type: 'services-grid',
      props: {
        eyebrow: 'What I build',
        heading: 'Websites, apps\nand games.',
        body: 'Same person builds all of it. Fixed price agreed before anything starts.',
        linkLabel: 'See all services',
        linkHref: '/services',
        // Transcribed from what the live page actually renders. Home.jsx also
        // held a six-item SERVICES array, but it was dead: useCMS('services')
        // returns its own defaults, so the site has been showing these four.
        services: [
          { icon: '💻', title: 'Websites', desc: 'Written in React, not assembled in a page builder. You get the source code and the domain stays in your name.' },
          { icon: '📱', title: 'iOS and Android apps', desc: 'One build, both stores. I handle Apple review and Google Play submission, which is the part that catches most people out.' },
          { icon: '🎮', title: 'Games', desc: 'Native iOS and Android. Fish Tank is on Google Play now — download it and see what the work looks like.' },
          { icon: '👥', title: 'Staff portals', desc: 'Rotas, timesheets, leave, payslips, onboarding, push notifications. I run one of these to manage my own staff.' },
        ],
      },
    },

    {
      id: 'home-why',
      type: 'why-grid',
      props: {
        eyebrow: 'How I work',
        heading: 'What you get.',
        items: [
          { title: 'You work with me', desc: 'Not a sales team. Not juniors. Just David, from start to finish.' },
          { title: 'Fixed price', desc: 'Quote upfront, no surprises. That is the price.' },
          { title: 'Built properly', desc: 'Fast, ranks on Google, works on mobile. Not a rushed template.' },
          { title: 'Your website', desc: 'You own the code, the design, the domain. Take it anywhere.' },
          { title: 'Quick replies', desc: 'Email or call back same day. Usually within a few hours.' },
          { title: 'Cardiff-based', desc: 'Working from Wales. Happy to work with clients across the UK.' },
        ],
      },
    },

    {
      id: 'home-credibility',
      type: 'card-row',
      props: {
        eyebrow: 'Things I have built',
        heading: 'Go and look at them.',
        body: 'Anyone can describe how they work. These are shipped and you can check them yourself.',
        cards: [
          { title: 'Fish Tank', desc: 'A multiplayer game on Google Play. Cross-platform play, friends, leaderboards, push notifications, running on my own servers.' },
          { title: 'A staff portal', desc: 'Microsoft sign-in, rota publishing, clock-in, timesheets, leave approvals and payslips. It runs my business day to day.' },
          { title: 'This website', desc: 'The booking system and the quote calculator on this site are mine. Try the calculator and see the price it gives you.' },
        ],
      },
    },

    {
      id: 'home-pricing',
      type: 'pricing-preview',
      props: {
        eyebrow: 'Pricing',
        heading: 'Simple,\nfixed pricing.',
        note: 'No hidden fees. No hourly billing. One price, everything included.',
        linkLabel: 'See full pricing & hosting plans',
        linkHref: '/pricing',
        // Same again: the live cards come from useCMS('pricing') defaults run
        // through a transform, not the fallback array in Home.jsx.
        packages: [
          { name: 'Starter', price: '£449', tagline: 'Fixed-price website package.', who: 'Delivered in 7 days', features: '5-page professional website · Mobile responsive design · Basic SEO setup · Contact form', popular: false },
          { name: 'Growth', price: '£999', tagline: 'Most Popular', who: 'Delivered in 7 days', features: '10-page website · Blog section · Full SEO setup · Branding integration', popular: true },
          { name: 'Pro', price: '£1,499', tagline: 'Fixed-price website package.', who: 'Delivered in 7 days', features: '15 pages · E-commerce ready · Custom integrations · Advanced SEO', popular: false },
          { name: 'Enterprise + HR', price: '£2,499', tagline: 'Most Complete', who: 'Timeline agreed at scoping', features: 'Full enterprise website · Integrated HR system · Staff onboarding portal · Leave & timesheet management', popular: false },
        ],
      },
    },

    {
      id: 'home-social-proof',
      type: 'testimonials',
      props: {
        eyebrow: 'The numbers',
        heading: 'What you can\nhold me to.',
        testimonials: [],
        stats: [
          { value: '7 days', label: 'Website delivery' },
          { value: '< 24h', label: 'Reply to enquiries' },
          { value: '£449', label: 'Starting from' },
          { value: '£0', label: 'Cost to get a quote' },
        ],
      },
    },

    {
      id: 'home-faq',
      type: 'faq',
      props: {
        eyebrow: 'Common questions',
        heading: 'Everything you need to know',
        body: 'The things people ask before they get in touch.',
        items: [
          { q: 'How long does a website project take?', a: 'Websites are delivered in 7 days. HR portals and complex integrations vary too much to put a number on here, so I agree a date with you at scoping and stick to it.' },
          { q: "What's included in your fixed pricing?", a: "Design, build, mobile layout, SEO setup, analytics, contact forms and getting it live. Hosting is billed separately from £35 a month so you can see what you pay once and what you pay monthly." },
          { q: 'Do you offer website hosting and maintenance?', a: 'Yes. Hosting is on Cloudflare from £35 a month and covers SSL, backups, updates and monitoring. It is billed separately from the build so you can see what you pay once and what you pay every month.' },
          { q: 'Can you integrate with our existing systems?', a: "Usually, yes. I have built against Microsoft 365, Stripe, Supabase, Resend and Apple and Google push notifications. Tell me what you run and I will say plainly whether it is straightforward or whether it will add cost." },
          { q: 'What makes you different from other web agencies?', a: 'Founder-led delivery means you work directly with David Hooper throughout the project—no sales handoff or junior developer roulette. Fixed pricing eliminates scope creep surprises. I build production-quality code from day one, not MVP filler that needs rebuilding later.' },
          { q: 'Do I own the website after launch?', a: "Yes, completely. You own all design files, source code, content, and domain. There's no rental trap or proprietary platform lock-in. You can take the website to another developer or host if needed, though we provide ongoing support for clients who want it." },
        ],
        footerNote: 'Still have questions?',
        linkLabel: 'Get in touch',
        linkHref: '/contact',
      },
    },

    {
      id: 'home-cta',
      type: 'closing-cta',
      props: {
        eyebrow: 'Ready to start?',
        heading: "Let's build something that works.",
        body: "Tell me about your project. We'll reply within 24 hours with a clear plan and a fixed price.",
        primaryLabel: 'Start a project →',
        primaryHref: '/contact',
        secondaryLabel: 'View pricing',
        secondaryHref: '/pricing',
        assurances: ['Fixed price — always', 'No contracts', 'Reply within 24 hrs'],
      },
    },
  ],
}

export default HOME_DOCUMENT
