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
        headlineLead: 'Your website,',
        typewriterLines: [
          'ready before your next meeting.',
          'faster than any template.',
          'built to rank on Google.',
          'designed to win customers.',
          'yours. Not a rental.',
        ],
        body: 'Production-ready websites for businesses that need speed, clarity, and something stronger than a template. Fixed pricing, direct communication, and a build you actually own.',
        primaryLabel: 'Get started',
        primaryHref: '/contact',
        secondaryLabel: 'See pricing',
        secondaryHref: '/pricing',
        showScrollHint: true,
        stats: [
          { value: 'David Hooper', label: 'Your only contact' },
          { value: 'Cardiff', label: 'Based in Wales' },
          { value: 'From £449', label: 'Real pricing' },
          { value: '7-10 days', label: 'Typical delivery' },
        ],
      },
    },

    {
      id: 'home-trust',
      type: 'trust-bar',
      props: {
        items: [
          { icon: '✓', label: 'Real client work', sub: 'Glow With Lucy' },
          { icon: '🔒', label: 'GDPR compliant', sub: 'Data protection' },
          { icon: '🏆', label: 'Microsoft Partner', sub: 'Verified' },
          { icon: '⚡', label: '7-10 day delivery', sub: 'Fixed timeline' },
        ],
      },
    },

    {
      id: 'home-partner',
      type: 'partner-highlight',
      props: {
        eyebrow: 'Microsoft approved partner',
        heading: 'Better suited to businesses already built around Microsoft.',
        body: 'We now hold Microsoft approved partner status. If your business already runs on Microsoft tools, we can scope websites and operational workflows with that ecosystem in mind from the start.',
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
        eyebrow: 'What we build',
        heading: 'Everything\nyou need.',
        body: 'From your first website to a full enterprise stack with HR integration — we cover every layer.',
        linkLabel: 'See all services',
        linkHref: '/services',
        // Transcribed from what the live page actually renders. Home.jsx also
        // held a six-item SERVICES array, but it was dead: useCMS('services')
        // returns its own defaults, so the site has been showing these four.
        services: [
          { icon: '💻', title: 'Custom Web Development', desc: 'Tailored solutions built from the ground up for your unique business needs. Production-ready code, not templates.' },
          { icon: '🎨', title: 'User-Centric Design', desc: 'Beautiful interfaces that engage visitors and drive conversions. Every pixel intentional, every interaction purposeful.' },
          { icon: '🛠', title: 'Full Support & Maintenance', desc: "Ongoing maintenance to keep your site running at peak performance. We're here long after launch." },
          { icon: '👥', title: 'HR System Integration', desc: 'Full HR portal built into your website — onboarding, leave, payslips, timesheets and more.' },
        ],
      },
    },

    {
      id: 'home-why',
      type: 'why-grid',
      props: {
        eyebrow: 'Why choose us',
        heading: 'Built different.\nDelivered properly.',
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
        eyebrow: 'Before you hire us',
        heading: 'Judge the process.',
        body: 'If we are early-stage, the right way to earn trust is through how we think, how we communicate, and how we build.',
        cards: [
          { title: 'How we work', desc: 'Every project starts with scope clarity, priorities, and a defined outcome before we build.' },
          { title: 'How we communicate', desc: 'Short feedback loops, direct updates, and one accountable point of contact.' },
          { title: 'How we price', desc: 'We scope tightly enough to give fixed pricing instead of vague ranges and surprise costs.' },
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
          { name: 'Starter', price: '£449', tagline: 'Fixed-price website package.', who: 'Typical delivery: 2–3 weeks', features: '5-page professional website · Mobile responsive design · Basic SEO setup · Contact form', popular: false },
          { name: 'Growth', price: '£999', tagline: 'Most Popular', who: 'Typical delivery: 3–4 weeks', features: '10-page website · Blog section · Full SEO setup · Branding integration', popular: true },
          { name: 'Pro', price: '£1,499', tagline: 'Fixed-price website package.', who: 'Typical delivery: 4–6 weeks', features: '15 pages · E-commerce ready · Custom integrations · Advanced SEO', popular: false },
          { name: 'Enterprise + HR', price: '£2,499', tagline: 'Most Complete', who: 'Typical delivery: 6–8 weeks', features: 'Full enterprise website · Integrated HR system · Staff onboarding portal · Leave & timesheet management', popular: false },
        ],
      },
    },

    {
      id: 'home-social-proof',
      type: 'testimonials',
      props: {
        eyebrow: 'Client results',
        heading: 'Real businesses.\nReal outcomes.',
        testimonials: [
          {
            quote: 'DH Website Services delivered our new site in 7 days. The quality is exceptional — it genuinely looks better than agencies we were quoted 10x more from.',
            name: 'Lucy Deane',
            business: 'Glow With Lucy',
          },
        ],
        stats: [
          { value: '100%', label: 'Client satisfaction' },
          { value: '< 24h', label: 'Response time' },
          { value: '3 weeks', label: 'Avg. delivery' },
          { value: '£449', label: 'Starting from' },
        ],
      },
    },

    {
      id: 'home-faq',
      type: 'faq',
      props: {
        eyebrow: 'Common questions',
        heading: 'Everything you need to know',
        body: 'Quick answers to questions we hear most often about our website development process.',
        items: [
          { q: 'How long does a website project take?', a: 'Standard websites are delivered in 7 days. HR portals and complex integrations take 10 days. Timeline is confirmed during scoping, and we stick to it.' },
          { q: "What's included in your fixed pricing?", a: "Our fixed-price packages include custom design, development, mobile optimization, technical SEO setup, analytics integration, contact forms, and launch support. Ongoing hosting and support are billed separately so you can see exactly what's one-off versus recurring." },
          { q: 'Do you offer website hosting and maintenance?', a: 'Yes. We provide managed hosting on Cloudflare Pages with 99.9%+ uptime, global CDN, automatic SSL, and regular security updates. Hosting plans start from £29/month and include ongoing technical support, updates, and monitoring.' },
          { q: 'Can you integrate with our existing systems?', a: "Absolutely. We specialize in integrations with Microsoft 365, Supabase databases, payment processors (Stripe), booking systems, email platforms (Resend), and HR management tools. As a Microsoft Partner, we're particularly strong with Microsoft ecosystem integrations." },
          { q: 'What makes you different from other web agencies?', a: 'Founder-led delivery means you work directly with David Hooper throughout the project—no sales handoff or junior developer roulette. Fixed pricing eliminates scope creep surprises. We build production-quality code from day one, not MVP filler that needs rebuilding later.' },
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
        body: "Tell us about your project. We'll reply within 24 hours with a clear plan and a fixed price.",
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
