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
} from './types/homeBlocks'

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
      { key: 'headlineRotating', type: 'text', label: 'Headline (second line)' },
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
      headlineRotating: 'built properly.',
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
