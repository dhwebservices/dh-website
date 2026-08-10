/**
 * The block registry - the contract between this site and the portal editor.
 *
 * Each entry pairs a React component with a field schema. The portal builds its
 * properties panel from the schema alone, so adding a block here is all it
 * takes for it to appear in the editor with working controls. There is no
 * per-block editor UI to write and nothing to keep in sync by hand.
 *
 * The schema (minus the components, which cannot cross the wire) is written to
 * /block-manifest.json at build time by scripts/generate-block-manifest.mjs.
 *
 * Field types the portal understands:
 *   text, textarea, number, boolean, colour, image, link, select, list
 * A `list` field carries `itemFields`, which is a nested schema of the same
 * shape - that is what drives repeaters like the hero stats or service cards.
 */

import {
  HeroBlock,
  TrustBarBlock,
  PartnerHighlightBlock,
  ServicesGridBlock,
  WhyGridBlock,
  CardRowBlock,
  PricingPreviewBlock,
  TestimonialsBlock,
  FaqBlock,
  ClosingCtaBlock,
} from './types/homeBlocks'

import {
  PageHeroBlock,
  ServiceRowsBlock,
  ProcessStepsBlock,
  GeoLinksBlock,
  CaseStudyHeroBlock,
  ProjectSnapshotBlock,
  DeliverablesBlock,
  DomainFeatureBlock,
  PricingTabsBlock,
  FaqAccordionBlock,
  AboutHeroBlock,
  ValuesGridBlock,
  PartnerHeroBlock,
  PartnerBenefitsBlock,
  TypicalFitBlock,
} from './types/pageBlocks'

import {
  RichTextBlock,
  ImageBlock,
  CtaBlock,
  ColumnsBlock,
  SpacerBlock,
  HtmlBlock,
  CanvasBlock,
} from './types/coreBlocks'

export const BLOCKS = {
  hero: {
    label: 'Hero',
    group: 'Sections',
    component: HeroBlock,
    fields: [
      { key: 'headlineLead', type: 'text', label: 'Headline (first line)' },
      { key: 'typewriterLines', type: 'list', label: 'Rotating lines', itemType: 'text', hint: 'Typed out one after another under the headline.' },
      { key: 'body', type: 'textarea', label: 'Intro paragraph' },
      { key: 'primaryLabel', type: 'text', label: 'Primary button' },
      { key: 'primaryHref', type: 'link', label: 'Primary link' },
      { key: 'secondaryLabel', type: 'text', label: 'Secondary button' },
      { key: 'secondaryHref', type: 'link', label: 'Secondary link' },
      { key: 'showScrollHint', type: 'boolean', label: 'Show scroll hint' },
      {
        key: 'stats',
        type: 'list',
        label: 'Stats',
        itemFields: [
          { key: 'value', type: 'text', label: 'Value' },
          { key: 'label', type: 'text', label: 'Caption' },
        ],
      },
    ],
    defaults: {
      headlineLead: 'Your website,',
      typewriterLines: [],
      body: '',
      primaryLabel: 'Get started',
      primaryHref: '/contact',
      secondaryLabel: 'See pricing',
      secondaryHref: '/pricing',
      showScrollHint: true,
      stats: [],
    },
  },

  'trust-bar': {
    label: 'Trust bar',
    group: 'Sections',
    component: TrustBarBlock,
    fields: [
      {
        key: 'items',
        type: 'list',
        label: 'Items',
        itemFields: [
          { key: 'icon', type: 'text', label: 'Icon (emoji)' },
          { key: 'label', type: 'text', label: 'Label' },
          { key: 'sub', type: 'text', label: 'Sub-label' },
        ],
      },
    ],
    defaults: { items: [] },
  },

  'partner-highlight': {
    label: 'Partner highlight',
    group: 'Sections',
    component: PartnerHighlightBlock,
    fields: [
      { key: 'eyebrow', type: 'text', label: 'Eyebrow' },
      { key: 'heading', type: 'text', label: 'Heading' },
      { key: 'body', type: 'textarea', label: 'Body' },
      { key: 'primaryLabel', type: 'text', label: 'Primary button' },
      { key: 'primaryHref', type: 'link', label: 'Primary link' },
      { key: 'secondaryLabel', type: 'text', label: 'Secondary button' },
      { key: 'secondaryHref', type: 'link', label: 'Secondary link' },
      { key: 'points', type: 'list', label: 'Bullet points', itemType: 'text' },
    ],
    defaults: { eyebrow: '', heading: '', body: '', points: [] },
  },

  'services-grid': {
    label: 'Services grid',
    group: 'Sections',
    component: ServicesGridBlock,
    fields: [
      { key: 'eyebrow', type: 'text', label: 'Eyebrow' },
      { key: 'heading', type: 'text', label: 'Heading' },
      { key: 'body', type: 'textarea', label: 'Body' },
      { key: 'linkLabel', type: 'text', label: 'Link text' },
      { key: 'linkHref', type: 'link', label: 'Link target' },
      {
        key: 'services',
        type: 'list',
        label: 'Service cards',
        itemFields: [
          { key: 'icon', type: 'text', label: 'Icon (emoji)' },
          { key: 'title', type: 'text', label: 'Title' },
          { key: 'desc', type: 'textarea', label: 'Description' },
        ],
      },
    ],
    defaults: { eyebrow: '', heading: '', body: '', linkLabel: 'See all services', linkHref: '/services', services: [] },
  },

  'why-grid': {
    label: 'Feature grid',
    group: 'Sections',
    component: WhyGridBlock,
    fields: [
      { key: 'eyebrow', type: 'text', label: 'Eyebrow' },
      { key: 'heading', type: 'text', label: 'Heading' },
      {
        key: 'items',
        type: 'list',
        label: 'Features',
        itemFields: [
          { key: 'title', type: 'text', label: 'Title' },
          { key: 'desc', type: 'textarea', label: 'Description' },
        ],
      },
    ],
    defaults: { eyebrow: '', heading: '', items: [] },
  },

  'card-row': {
    label: 'Card row',
    group: 'Sections',
    component: CardRowBlock,
    fields: [
      { key: 'eyebrow', type: 'text', label: 'Eyebrow' },
      { key: 'heading', type: 'text', label: 'Heading' },
      { key: 'body', type: 'textarea', label: 'Intro' },
      { key: 'background', type: 'colour', label: 'Background' },
      {
        key: 'cards',
        type: 'list',
        label: 'Cards',
        itemFields: [
          { key: 'title', type: 'text', label: 'Title' },
          { key: 'desc', type: 'textarea', label: 'Description' },
        ],
      },
    ],
    defaults: { eyebrow: '', heading: '', body: '', cards: [] },
  },

  'pricing-preview': {
    label: 'Pricing preview',
    group: 'Sections',
    component: PricingPreviewBlock,
    fields: [
      { key: 'eyebrow', type: 'text', label: 'Eyebrow' },
      { key: 'heading', type: 'text', label: 'Heading' },
      { key: 'note', type: 'textarea', label: 'Note (right side)' },
      { key: 'linkLabel', type: 'text', label: 'Link text' },
      { key: 'linkHref', type: 'link', label: 'Link target' },
      {
        key: 'packages',
        type: 'list',
        label: 'Packages',
        itemFields: [
          { key: 'name', type: 'text', label: 'Name' },
          { key: 'price', type: 'text', label: 'Price' },
          { key: 'tagline', type: 'text', label: 'Tagline' },
          { key: 'who', type: 'textarea', label: 'Who it is for' },
          { key: 'features', type: 'text', label: 'Features', hint: 'Separate with " \u00b7 "' },
          { key: 'popular', type: 'boolean', label: 'Mark as popular' },
        ],
      },
    ],
    defaults: { eyebrow: 'Pricing', heading: '', note: '', linkLabel: 'See full pricing', linkHref: '/pricing', packages: [] },
  },

  testimonials: {
    label: 'Testimonials',
    group: 'Sections',
    component: TestimonialsBlock,
    fields: [
      { key: 'eyebrow', type: 'text', label: 'Eyebrow' },
      { key: 'heading', type: 'text', label: 'Heading' },
      {
        key: 'testimonials',
        type: 'list',
        label: 'Quotes',
        itemFields: [
          { key: 'quote', type: 'textarea', label: 'Quote' },
          { key: 'name', type: 'text', label: 'Name' },
          { key: 'business', type: 'text', label: 'Business' },
        ],
      },
      {
        key: 'stats',
        type: 'list',
        label: 'Stats bar',
        itemFields: [
          { key: 'value', type: 'text', label: 'Value' },
          { key: 'label', type: 'text', label: 'Caption' },
        ],
      },
    ],
    defaults: { eyebrow: '', heading: '', testimonials: [], stats: [] },
  },

  faq: {
    label: 'FAQ',
    group: 'Sections',
    component: FaqBlock,
    fields: [
      { key: 'eyebrow', type: 'text', label: 'Eyebrow' },
      { key: 'heading', type: 'text', label: 'Heading' },
      { key: 'body', type: 'textarea', label: 'Intro' },
      {
        key: 'items',
        type: 'list',
        label: 'Questions',
        itemFields: [
          { key: 'q', type: 'text', label: 'Question' },
          { key: 'a', type: 'textarea', label: 'Answer' },
        ],
      },
      { key: 'footerNote', type: 'text', label: 'Footer note' },
      { key: 'linkLabel', type: 'text', label: 'Footer link text' },
      { key: 'linkHref', type: 'link', label: 'Footer link target' },
    ],
    defaults: { eyebrow: '', heading: '', items: [], linkHref: '/contact' },
  },

  'closing-cta': {
    label: 'Closing CTA (dark)',
    group: 'Sections',
    component: ClosingCtaBlock,
    fields: [
      { key: 'eyebrow', type: 'text', label: 'Eyebrow' },
      { key: 'heading', type: 'text', label: 'Heading' },
      { key: 'body', type: 'textarea', label: 'Body' },
      { key: 'primaryLabel', type: 'text', label: 'Primary button' },
      { key: 'primaryHref', type: 'link', label: 'Primary link' },
      { key: 'secondaryLabel', type: 'text', label: 'Secondary button' },
      { key: 'secondaryHref', type: 'link', label: 'Secondary link' },
      { key: 'assurances', type: 'list', label: 'Reassurance points', itemType: 'text' },
      { key: 'maxWidth', type: 'number', label: 'Column width (px)' },
      { key: 'headingSize', type: 'text', label: 'Heading size override' },
      { key: 'bodySize', type: 'number', label: 'Body size override' },
    ],
    defaults: { eyebrow: 'Ready to start?', heading: '', body: '', primaryLabel: 'Start a project \u2192', primaryHref: '/contact', secondaryLabel: 'View pricing', secondaryHref: '/pricing', assurances: [] },
  },

  'page-hero': {
    label: 'Page hero',
    group: 'Sections',
    component: PageHeroBlock,
    fields: [
      { key: 'eyebrow', type: 'text', label: 'Eyebrow' },
      { key: 'heading', type: 'textarea', label: 'Heading', hint: 'A new line becomes a line break.' },
      { key: 'body', type: 'textarea', label: 'Intro' },
      { key: 'maxWidth', type: 'number', label: 'Column width (px)' },
      { key: 'bodyMaxWidth', type: 'number', label: 'Intro width (px)', hint: 'Blank = full width.' },
      { key: 'paddingBottom', type: 'text', label: 'Bottom padding override' },
    ],
    defaults: { eyebrow: '', heading: 'New page', body: '', maxWidth: 720, bodyMaxWidth: 480 },
  },

  'service-rows': {
    label: 'Numbered rows',
    group: 'Sections',
    component: ServiceRowsBlock,
    fields: [
      {
        key: 'items',
        type: 'list',
        label: 'Rows',
        itemFields: [
          { key: 'num', type: 'text', label: 'Number' },
          { key: 'title', type: 'text', label: 'Title' },
          { key: 'desc', type: 'textarea', label: 'Description' },
          { key: 'points', type: 'list', label: 'Bullet points', itemType: 'text' },
        ],
      },
    ],
    defaults: { items: [] },
  },

  'process-steps': {
    label: 'Process steps',
    group: 'Sections',
    component: ProcessStepsBlock,
    fields: [
      { key: 'eyebrow', type: 'text', label: 'Eyebrow' },
      { key: 'heading', type: 'text', label: 'Heading' },
      {
        key: 'steps',
        type: 'list',
        label: 'Steps',
        itemFields: [
          { key: 'n', type: 'text', label: 'Number' },
          { key: 'title', type: 'text', label: 'Title' },
          { key: 'desc', type: 'textarea', label: 'Description' },
        ],
      },
      { key: 'primaryLabel', type: 'text', label: 'Primary button' },
      { key: 'primaryHref', type: 'link', label: 'Primary link' },
      { key: 'secondaryLabel', type: 'text', label: 'Secondary button' },
      { key: 'secondaryHref', type: 'link', label: 'Secondary link' },
    ],
    defaults: { eyebrow: '', heading: '', steps: [], primaryHref: '/contact', secondaryHref: '/pricing' },
  },

  'app.geo-links': {
    label: 'Location links',
    group: 'Apps',
    component: GeoLinksBlock,
    hint: 'The city list comes from the site\u2019s routes, so it cannot be edited here \u2014 only the wording around it.',
    fields: [
      { key: 'eyebrow', type: 'text', label: 'Eyebrow' },
      { key: 'heading', type: 'text', label: 'Heading' },
      { key: 'body', type: 'textarea', label: 'Body' },
    ],
    defaults: { eyebrow: '', heading: '', body: '' },
  },

  'case-study-hero': {
    label: 'Case study hero',
    group: 'Sections',
    component: CaseStudyHeroBlock,
    fields: [
      { key: 'eyebrow', type: 'text', label: 'Eyebrow' },
      { key: 'heading', type: 'text', label: 'Client name' },
      { key: 'body', type: 'textarea', label: 'Summary' },
      { key: 'primaryLabel', type: 'text', label: 'Primary button' },
      { key: 'primaryHref', type: 'link', label: 'Primary link (external)' },
      { key: 'secondaryLabel', type: 'text', label: 'Secondary button' },
      { key: 'secondaryHref', type: 'link', label: 'Secondary link' },
      { key: 'note', type: 'textarea', label: 'Note under the buttons' },
      { key: 'image', type: 'image', label: 'Showcase image' },
      { key: 'imageAlt', type: 'text', label: 'Image alt text' },
    ],
    defaults: { eyebrow: 'Featured project', heading: '', body: '', secondaryHref: '/contact' },
  },

  'project-snapshot': {
    label: 'Project snapshot',
    group: 'Sections',
    component: ProjectSnapshotBlock,
    fields: [
      { key: 'heading', type: 'text', label: 'Heading' },
      { key: 'body', type: 'textarea', label: 'Body' },
      {
        key: 'rows', type: 'list', label: 'Snapshot rows',
        itemFields: [
          { key: 'label', type: 'text', label: 'Label' },
          { key: 'value', type: 'text', label: 'Value' },
        ],
      },
      { key: 'impactEyebrow', type: 'text', label: 'Right-hand eyebrow' },
      { key: 'impact', type: 'list', label: 'Right-hand points', itemType: 'text' },
    ],
    defaults: { heading: 'Project snapshot', body: '', rows: [], impactEyebrow: 'Why it works', impact: [] },
  },

  deliverables: {
    label: 'Deliverables',
    group: 'Sections',
    component: DeliverablesBlock,
    fields: [
      { key: 'eyebrow', type: 'text', label: 'Eyebrow' },
      { key: 'heading', type: 'text', label: 'Heading' },
      { key: 'body', type: 'textarea', label: 'Body' },
      {
        key: 'items', type: 'list', label: 'Items',
        itemFields: [
          { key: 'icon', type: 'select', label: 'Icon', options: ['spark', 'device', 'domain'] },
          { key: 'title', type: 'text', label: 'Title' },
          { key: 'description', type: 'textarea', label: 'Description' },
        ],
      },
    ],
    defaults: { eyebrow: '', heading: '', body: '', items: [] },
  },

  'domain-feature': {
    label: 'Domain feature',
    group: 'Sections',
    component: DomainFeatureBlock,
    fields: [
      { key: 'eyebrow', type: 'text', label: 'Eyebrow' },
      { key: 'heading', type: 'text', label: 'Domain' },
      { key: 'body', type: 'textarea', label: 'Body' },
      { key: 'linkLabel', type: 'text', label: 'Link label' },
      { key: 'linkHref', type: 'link', label: 'Link target' },
      { key: 'linkCaption', type: 'text', label: 'Link caption' },
      { key: 'ctaLabel', type: 'text', label: 'Button' },
      { key: 'ctaHref', type: 'link', label: 'Button link' },
    ],
    defaults: { eyebrow: 'Featured domain', heading: '', body: '', ctaHref: '/contact' },
  },

  'pricing-tabs': {
    label: 'Pricing tabs',
    group: 'Sections',
    component: PricingTabsBlock,
    hint: 'Which tab is open is behaviour, not content, so there is nothing to set for it.',
    fields: [
      { key: 'ctaLabel', type: 'text', label: 'Card button text' },
      {
        key: 'builds', type: 'list', label: 'Website build packages',
        itemFields: [
          { key: 'name', type: 'text', label: 'Name' },
          { key: 'price', type: 'number', label: 'Price (£)' },
          { key: 'badge', type: 'text', label: 'Badge', hint: '"Most Popular" makes the card dark.' },
          { key: 'delivery', type: 'text', label: 'Delivery' },
          { key: 'features', type: 'list', label: 'Features', itemType: 'text' },
        ],
      },
      { key: 'hostingIntro', type: 'textarea', label: 'Hosting tab intro' },
      {
        key: 'hosting', type: 'list', label: 'Hosting plans',
        itemFields: [
          { key: 'name', type: 'text', label: 'Name' },
          { key: 'price', type: 'number', label: 'Price per month (£)' },
          { key: 'badge', type: 'text', label: 'Badge' },
          { key: 'desc', type: 'textarea', label: 'Description' },
        ],
      },
      { key: 'hrIntro', type: 'textarea', label: 'HR tab intro' },
      {
        key: 'hrPlans', type: 'list', label: 'HR plans',
        itemFields: [
          { key: 'name', type: 'text', label: 'Name' },
          { key: 'price', type: 'text', label: 'Price' },
          { key: 'type', type: 'text', label: 'Type' },
          { key: 'badge', type: 'text', label: 'Badge' },
          { key: 'desc', type: 'textarea', label: 'Description' },
        ],
      },
      { key: 'hrPrimaryLabel', type: 'text', label: 'HR primary button' },
      { key: 'hrPrimaryHref', type: 'link', label: 'HR primary link' },
      { key: 'hrSecondaryLabel', type: 'text', label: 'HR secondary button' },
      { key: 'hrSecondaryHref', type: 'link', label: 'HR secondary link' },
    ],
    defaults: { ctaLabel: 'Get started', builds: [], hosting: [], hrPlans: [], hrPrimaryHref: '/contact' },
  },

  'faq-accordion': {
    label: 'FAQ (accordion)',
    group: 'Sections',
    component: FaqAccordionBlock,
    fields: [
      { key: 'eyebrow', type: 'text', label: 'Eyebrow' },
      { key: 'heading', type: 'text', label: 'Heading' },
      {
        key: 'items', type: 'list', label: 'Questions',
        itemFields: [
          { key: 'q', type: 'text', label: 'Question' },
          { key: 'a', type: 'textarea', label: 'Answer' },
        ],
      },
      { key: 'footerNote', type: 'text', label: 'Footer note' },
      { key: 'ctaLabel', type: 'text', label: 'Footer button' },
      { key: 'ctaHref', type: 'link', label: 'Footer link' },
    ],
    defaults: { eyebrow: 'FAQ', heading: 'Common questions', items: [], ctaHref: '/contact' },
  },

  'about-hero': {
    label: 'About hero',
    group: 'Sections',
    component: AboutHeroBlock,
    fields: [
      { key: 'eyebrow', type: 'text', label: 'Eyebrow' },
      { key: 'heading', type: 'textarea', label: 'Heading' },
      { key: 'lead', type: 'textarea', label: 'Lead paragraph' },
      { key: 'body', type: 'textarea', label: 'Second paragraph' },
      { key: 'primaryLabel', type: 'text', label: 'Primary button' },
      { key: 'primaryHref', type: 'link', label: 'Primary link' },
      { key: 'secondaryLabel', type: 'text', label: 'Secondary button' },
      { key: 'secondaryHref', type: 'link', label: 'Secondary link' },
      { key: 'initials', type: 'text', label: 'Card initials' },
      { key: 'name', type: 'text', label: 'Name' },
      { key: 'role', type: 'text', label: 'Role' },
      { key: 'cardParagraphs', type: 'list', label: 'Card paragraphs', itemType: 'text' },
      {
        key: 'contacts', type: 'list', label: 'Contact links',
        itemFields: [
          { key: 'kind', type: 'select', label: 'Type', options: ['email', 'phone'] },
          { key: 'href', type: 'text', label: 'Link', hint: 'mailto: or tel:' },
          { key: 'label', type: 'text', label: 'Shown as' },
        ],
      },
    ],
    defaults: { eyebrow: 'About us', heading: '', lead: '', body: '', cardParagraphs: [], contacts: [] },
  },

  'values-grid': {
    label: 'Values grid',
    group: 'Sections',
    component: ValuesGridBlock,
    fields: [
      { key: 'eyebrow', type: 'text', label: 'Eyebrow' },
      { key: 'heading', type: 'text', label: 'Heading' },
      {
        key: 'items', type: 'list', label: 'Values',
        itemFields: [
          { key: 'title', type: 'text', label: 'Title' },
          { key: 'desc', type: 'textarea', label: 'Description' },
        ],
      },
    ],
    defaults: { eyebrow: '', heading: '', items: [] },
  },

  'partner-hero': {
    label: 'Partner hero',
    group: 'Sections',
    component: PartnerHeroBlock,
    fields: [
      { key: 'eyebrow', type: 'text', label: 'Eyebrow' },
      { key: 'heading', type: 'textarea', label: 'Heading' },
      { key: 'body', type: 'textarea', label: 'Body' },
      { key: 'primaryLabel', type: 'text', label: 'Primary button' },
      { key: 'primaryHref', type: 'link', label: 'Primary link' },
      { key: 'secondaryLabel', type: 'text', label: 'Secondary button' },
      { key: 'secondaryHref', type: 'link', label: 'Secondary link' },
      { key: 'points', type: 'list', label: 'Badge card points', itemType: 'text' },
    ],
    defaults: { eyebrow: '', heading: '', body: '', points: [] },
  },

  'partner-benefits': {
    label: 'Partner benefits',
    group: 'Sections',
    component: PartnerBenefitsBlock,
    fields: [
      { key: 'eyebrow', type: 'text', label: 'Eyebrow' },
      { key: 'heading', type: 'textarea', label: 'Heading' },
      { key: 'body', type: 'textarea', label: 'Body' },
      { key: 'cardEyebrow', type: 'text', label: 'Label above each card' },
      {
        key: 'cards', type: 'list', label: 'Benefit cards',
        itemFields: [
          { key: 'title', type: 'text', label: 'Title' },
          { key: 'body', type: 'textarea', label: 'Body' },
        ],
      },
      { key: 'appleEyebrow', type: 'text', label: 'Apple strip eyebrow' },
      { key: 'appleHeading', type: 'textarea', label: 'Apple strip heading' },
      { key: 'appleBody', type: 'textarea', label: 'Apple strip body' },
    ],
    defaults: { eyebrow: '', heading: '', body: '', cardEyebrow: 'Partner benefit', cards: [] },
  },

  'typical-fit': {
    label: 'Typical fit',
    group: 'Sections',
    component: TypicalFitBlock,
    fields: [
      { key: 'eyebrow', type: 'text', label: 'Eyebrow' },
      { key: 'heading', type: 'textarea', label: 'Heading' },
      { key: 'body', type: 'textarea', label: 'Body' },
      { key: 'areas', type: 'list', label: 'Areas', itemType: 'text' },
    ],
    defaults: { eyebrow: '', heading: '', body: '', areas: [] },
  },

  'rich-text': {
    label: 'Text',
    group: 'Basics',
    component: RichTextBlock,
    fields: [
      { key: 'eyebrow', type: 'text', label: 'Eyebrow' },
      { key: 'heading', type: 'text', label: 'Heading' },
      { key: 'body', type: 'textarea', label: 'Body', hint: 'Blank line starts a new paragraph.' },
      { key: 'align', type: 'select', label: 'Alignment', options: ['left', 'center'] },
      { key: 'background', type: 'colour', label: 'Background' },
    ],
    defaults: { heading: 'New section', body: '', align: 'left' },
  },

  image: {
    label: 'Image',
    group: 'Basics',
    component: ImageBlock,
    fields: [
      { key: 'src', type: 'image', label: 'Image' },
      { key: 'alt', type: 'text', label: 'Alt text', hint: 'Describes the image to screen readers and search engines.' },
      { key: 'caption', type: 'text', label: 'Caption' },
      { key: 'maxWidth', type: 'number', label: 'Max width (px)' },
      { key: 'rounded', type: 'boolean', label: 'Rounded corners' },
    ],
    defaults: { alt: '', maxWidth: 960, rounded: true },
  },

  cta: {
    label: 'Call to action',
    group: 'Sections',
    component: CtaBlock,
    fields: [
      { key: 'heading', type: 'text', label: 'Heading' },
      { key: 'body', type: 'textarea', label: 'Body' },
      { key: 'primaryLabel', type: 'text', label: 'Primary button' },
      { key: 'primaryHref', type: 'link', label: 'Primary link' },
      { key: 'secondaryLabel', type: 'text', label: 'Secondary button' },
      { key: 'secondaryHref', type: 'link', label: 'Secondary link' },
      { key: 'tone', type: 'select', label: 'Tone', options: ['dark', 'light'] },
    ],
    defaults: { heading: 'Ready to start?', primaryLabel: 'Get in touch', primaryHref: '/contact', tone: 'dark' },
  },

  columns: {
    label: 'Columns',
    group: 'Basics',
    component: ColumnsBlock,
    fields: [
      {
        key: 'columns',
        type: 'list',
        label: 'Columns',
        itemFields: [
          { key: 'heading', type: 'text', label: 'Heading' },
          { key: 'body', type: 'textarea', label: 'Body' },
        ],
      },
      { key: 'background', type: 'colour', label: 'Background' },
    ],
    defaults: { columns: [{ heading: 'Column one', body: '' }, { heading: 'Column two', body: '' }] },
  },

  spacer: {
    label: 'Spacer',
    group: 'Basics',
    component: SpacerBlock,
    fields: [{ key: 'height', type: 'number', label: 'Height (px)' }],
    defaults: { height: 48 },
  },

  canvas: {
    label: 'Free canvas',
    group: 'Advanced',
    component: CanvasBlock,
    hint: 'Place items anywhere. Positions are percentages, so it scales with the screen.',
    fields: [
      { key: 'height', type: 'number', label: 'Height (px)' },
      { key: 'background', type: 'colour', label: 'Background' },
      {
        key: 'items',
        type: 'list',
        label: 'Items',
        itemFields: [
          { key: 'kind', type: 'select', label: 'Type', options: ['text', 'image'] },
          { key: 'text', type: 'text', label: 'Text' },
          { key: 'src', type: 'image', label: 'Image' },
          { key: 'x', type: 'number', label: 'X (%)' },
          { key: 'y', type: 'number', label: 'Y (%)' },
          { key: 'w', type: 'number', label: 'Width (%)' },
          { key: 'fontSize', type: 'number', label: 'Font size' },
          { key: 'color', type: 'colour', label: 'Colour' },
        ],
      },
    ],
    defaults: { height: 480, items: [] },
  },

  html: {
    label: 'Custom HTML',
    group: 'Advanced',
    component: HtmlBlock,
    directorOnly: true,
    hint: 'Runs as-is on the live site.',
    fields: [{ key: 'html', type: 'textarea', label: 'HTML' }],
    defaults: { html: '' },
  },
}

/** Schema only - safe to serialise and send to the portal. */
export function getBlockManifest() {
  return Object.entries(BLOCKS).map(([type, definition]) => ({
    type,
    label: definition.label,
    group: definition.group || 'Other',
    hint: definition.hint || null,
    directorOnly: definition.directorOnly === true,
    fields: definition.fields || [],
    defaults: definition.defaults || {},
  }))
}
