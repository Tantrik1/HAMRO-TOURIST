// ============================================================
// Section schemas — drive the visual editor.
// Themes pick which sections to expose; the editor reads these
// schemas to render fields and validate content.
// ============================================================

import type { SectionSchema } from '@hamrotourist/shared-types';

// ─── HERO ─────────────────────────────────────────────────

export const HERO_SECTION_SCHEMA: SectionSchema = {
  id: 'hero-banner',
  label: 'Hero Banner',
  description: 'Big eye-catching banner at the top of a page.',
  category: 'hero',
  icon: 'image',
  unique: false,
  fields: {
    variant: {
      type: 'select',
      label: 'Layout',
      defaultValue: 'imageOverlay',
      options: [
        { label: 'Image overlay', value: 'imageOverlay' },
        { label: 'Split (image + text)', value: 'split' },
        { label: 'Centered', value: 'centered' },
        { label: 'Gradient', value: 'gradient' },
        { label: 'Video background', value: 'video' },
      ],
    },
    eyebrow: {
      type: 'text',
      label: 'Eyebrow',
      placeholder: 'Discover',
      maxLength: 40,
    },
    heading: {
      type: 'text',
      label: 'Heading',
      required: true,
      placeholder: 'Adventures that change you',
      maxLength: 120,
    },
    subheading: {
      type: 'textarea',
      label: 'Subheading',
      placeholder: 'Curated tours, hand-built itineraries, breath-taking trails.',
      maxLength: 240,
      rows: 3,
    },
    imageUrl: {
      type: 'media',
      label: 'Background image',
      accept: 'image',
      showIf: { field: 'variant', equals: ['imageOverlay', 'split'] },
    },
    videoUrl: {
      type: 'url',
      label: 'Video URL (mp4)',
      placeholder: 'https://...',
      showIf: { field: 'variant', equals: 'video' },
    },
    ctaPrimaryLabel: {
      type: 'text',
      label: 'Primary button label',
      placeholder: 'Explore Now',
      group: 'Call to action',
    },
    ctaPrimaryHref: {
      type: 'text',
      label: 'Primary button link',
      placeholder: '/tours',
      group: 'Call to action',
    },
    ctaSecondaryLabel: {
      type: 'text',
      label: 'Secondary button label',
      placeholder: 'Learn More',
      group: 'Call to action',
    },
    ctaSecondaryHref: {
      type: 'text',
      label: 'Secondary button link',
      placeholder: '/about',
      group: 'Call to action',
    },
  },
  defaults: {
    variant: 'imageOverlay',
    heading: 'Adventures that change you',
    subheading: 'Curated tours, hand-built itineraries, breath-taking trails.',
    ctaPrimaryLabel: 'Explore Tours',
    ctaPrimaryHref: '/tours',
  },
};

// ─── FEATURED TOURS ────────────────────────────────────────

export const FEATURED_TOURS_SCHEMA: SectionSchema = {
  id: 'featured-tours',
  label: 'Featured Tours',
  description: 'A grid of tours, hand-picked or pulled from your catalog.',
  category: 'product',
  icon: 'compass',
  fields: {
    eyebrow: { type: 'text', label: 'Eyebrow', placeholder: 'Explore' },
    heading: { type: 'text', label: 'Heading', required: true, placeholder: 'Featured Tours' },
    subheading: { type: 'textarea', label: 'Subheading', rows: 2 },
    cardVariant: {
      type: 'select',
      label: 'Card style',
      defaultValue: 'standard',
      options: [
        { label: 'Standard', value: 'standard' },
        { label: 'Editorial', value: 'editorial' },
        { label: 'Compact', value: 'compact' },
        { label: 'Overlay (poster)', value: 'overlay' },
        { label: 'Horizontal', value: 'horizontal' },
      ],
    },
    columns: {
      type: 'select',
      label: 'Columns',
      defaultValue: '3',
      options: [
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
      ],
    },
    sourceMode: {
      type: 'select',
      label: 'Tour source',
      defaultValue: 'auto',
      options: [
        { label: 'Auto (latest published)', value: 'auto' },
        { label: 'Hand-picked', value: 'manual' },
      ],
    },
    selectedTours: {
      type: 'tour-selector',
      label: 'Tours',
      multiple: true,
      maxSelected: 12,
      showIf: { field: 'sourceMode', equals: 'manual' },
    },
    autoLimit: {
      type: 'number',
      label: 'How many to show',
      defaultValue: 6,
      min: 1,
      max: 24,
      showIf: { field: 'sourceMode', equals: 'auto' },
    },
    showViewAll: { type: 'toggle', label: 'Show "View all" button', defaultValue: true },
    viewAllHref: { type: 'text', label: '"View all" link', defaultValue: '/tours' },
  },
  defaults: {
    heading: 'Featured Tours',
    subheading: 'Handpicked adventures for the bold and curious.',
    cardVariant: 'standard',
    columns: '3',
    sourceMode: 'auto',
    autoLimit: 6,
    showViewAll: true,
    viewAllHref: '/tours',
  },
};

// ─── PACKAGE SHOWCASE ──────────────────────────────────────

export const PACKAGE_SHOWCASE_SCHEMA: SectionSchema = {
  id: 'package-showcase',
  label: 'Package Showcase',
  description: 'Display your packaged trips beautifully.',
  category: 'product',
  icon: 'package',
  fields: {
    eyebrow: { type: 'text', label: 'Eyebrow' },
    heading: { type: 'text', label: 'Heading', required: true },
    subheading: { type: 'textarea', label: 'Subheading', rows: 2 },
    cardVariant: {
      type: 'select',
      label: 'Card style',
      defaultValue: 'standard',
      options: [
        { label: 'Standard', value: 'standard' },
        { label: 'Premium (gradient border)', value: 'premium' },
        { label: 'Deal (with discount)', value: 'deal' },
        { label: 'Highlight (image left)', value: 'highlight' },
      ],
    },
    selectedPackages: {
      type: 'package-selector',
      label: 'Packages',
      multiple: true,
      maxSelected: 9,
    },
    showViewAll: { type: 'toggle', label: 'Show "View all"', defaultValue: true },
    viewAllHref: { type: 'text', label: '"View all" link', defaultValue: '/packages' },
  },
  defaults: {
    heading: 'Curated Packages',
    cardVariant: 'standard',
    showViewAll: true,
    viewAllHref: '/packages',
  },
};

// ─── REGION SHOWCASE ───────────────────────────────────────

export const REGION_SHOWCASE_SCHEMA: SectionSchema = {
  id: 'region-showcase',
  label: 'Region Showcase',
  description: 'Highlight destinations and regions you operate in.',
  category: 'discovery',
  icon: 'map-pin',
  fields: {
    eyebrow: { type: 'text', label: 'Eyebrow' },
    heading: { type: 'text', label: 'Heading', required: true },
    subheading: { type: 'textarea', label: 'Subheading', rows: 2 },
    cardVariant: {
      type: 'select',
      label: 'Card style',
      defaultValue: 'overlay',
      options: [
        { label: 'Overlay (poster)', value: 'overlay' },
        { label: 'Standard', value: 'standard' },
        { label: 'Poster', value: 'poster' },
        { label: 'Minimal', value: 'minimal' },
      ],
    },
    selectedRegions: {
      type: 'region-selector',
      label: 'Regions',
      multiple: true,
      maxSelected: 12,
    },
    columns: {
      type: 'select',
      label: 'Columns',
      defaultValue: '3',
      options: [
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
      ],
    },
  },
  defaults: {
    heading: 'Where we go',
    cardVariant: 'overlay',
    columns: '3',
  },
};

// ─── ACTIVITY CARDS ────────────────────────────────────────

export const ACTIVITY_CARDS_SCHEMA: SectionSchema = {
  id: 'activity-cards',
  label: 'Activity Cards',
  description: 'Showcase activities like rafting, paragliding, etc.',
  category: 'product',
  icon: 'activity',
  fields: {
    heading: { type: 'text', label: 'Heading', required: true },
    subheading: { type: 'textarea', label: 'Subheading', rows: 2 },
    cardVariant: {
      type: 'select',
      label: 'Card style',
      defaultValue: 'icon',
      options: [
        { label: 'Icon-only', value: 'icon' },
        { label: 'Standard with image', value: 'standard' },
        { label: 'Compact list', value: 'compact' },
      ],
    },
    selectedActivities: {
      type: 'activity-selector',
      label: 'Activities',
      multiple: true,
      maxSelected: 12,
    },
  },
  defaults: { heading: 'Things to do', cardVariant: 'icon' },
};

// ─── TESTIMONIALS ──────────────────────────────────────────

export const TESTIMONIALS_SCHEMA: SectionSchema = {
  id: 'testimonials',
  label: 'Testimonials',
  description: 'Customer reviews and trust signals.',
  category: 'trust',
  icon: 'message-square',
  fields: {
    heading: { type: 'text', label: 'Heading', required: true },
    subheading: { type: 'textarea', label: 'Subheading', rows: 2 },
    layout: {
      type: 'select',
      label: 'Layout',
      defaultValue: 'grid',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'Carousel', value: 'carousel' },
        { label: 'Featured + grid', value: 'featured' },
      ],
    },
    cardVariant: {
      type: 'select',
      label: 'Card style',
      defaultValue: 'standard',
      options: [
        { label: 'Standard', value: 'standard' },
        { label: 'Quote', value: 'quote' },
        { label: 'Featured', value: 'featured' },
        { label: 'Minimal', value: 'minimal' },
      ],
    },
    items: {
      type: 'testimonial-list',
      label: 'Testimonials',
      maxItems: 12,
    },
  },
  defaults: {
    heading: 'What travelers say',
    cardVariant: 'standard',
    layout: 'grid',
    items: [],
  },
};

// ─── ABOUT US ──────────────────────────────────────────────

export const ABOUT_US_SCHEMA: SectionSchema = {
  id: 'about-us',
  label: 'About Us',
  description: 'Tell your story.',
  category: 'content',
  icon: 'info',
  fields: {
    heading: { type: 'text', label: 'Heading', required: true },
    body: { type: 'richtext', label: 'Body', required: true, rows: 8 },
    imageUrl: { type: 'media', label: 'Image', accept: 'image' },
    layout: {
      type: 'select',
      label: 'Layout',
      defaultValue: 'imageLeft',
      options: [
        { label: 'Image left', value: 'imageLeft' },
        { label: 'Image right', value: 'imageRight' },
        { label: 'Centered (no image)', value: 'centered' },
      ],
    },
    stats: { type: 'stat-list', label: 'Stats (optional)' },
  },
  defaults: { heading: 'About us', body: '', layout: 'imageLeft' },
};

// ─── WHY CHOOSE US ─────────────────────────────────────────

export const WHY_CHOOSE_US_SCHEMA: SectionSchema = {
  id: 'why-choose-us',
  label: 'Why Choose Us',
  description: 'Highlight your differentiators.',
  category: 'trust',
  icon: 'award',
  fields: {
    heading: { type: 'text', label: 'Heading', required: true },
    subheading: { type: 'textarea', label: 'Subheading', rows: 2 },
    layout: {
      type: 'select',
      label: 'Layout',
      defaultValue: 'grid3',
      options: [
        { label: '3-column grid', value: 'grid3' },
        { label: '4-column grid', value: 'grid4' },
        { label: 'Vertical list', value: 'list' },
      ],
    },
    cardVariant: {
      type: 'select',
      label: 'Card style',
      defaultValue: 'iconbg',
      options: [
        { label: 'Icon background', value: 'iconbg' },
        { label: 'Centered', value: 'centered' },
        { label: 'Standard', value: 'standard' },
        { label: 'Minimal', value: 'minimal' },
      ],
    },
    features: { type: 'feature-list', label: 'Features', maxItems: 8 },
  },
  defaults: { heading: 'Why choose us', layout: 'grid3', cardVariant: 'iconbg', features: [] },
};

// ─── CONTACT FORM ──────────────────────────────────────────

export const CONTACT_FORM_SCHEMA: SectionSchema = {
  id: 'contact-form',
  label: 'Contact Form',
  description: 'Lead capture form with custom fields.',
  category: 'conversion',
  icon: 'mail',
  fields: {
    heading: { type: 'text', label: 'Heading', required: true },
    subheading: { type: 'textarea', label: 'Subheading', rows: 2 },
    submitLabel: { type: 'text', label: 'Submit button', defaultValue: 'Send message' },
    showPhone: { type: 'toggle', label: 'Phone field', defaultValue: true },
    showSubject: { type: 'toggle', label: 'Subject field', defaultValue: false },
    showInterest: { type: 'toggle', label: 'Interested in (dropdown)', defaultValue: true },
  },
  defaults: { heading: 'Get in touch', submitLabel: 'Send message', showPhone: true, showInterest: true },
};

// ─── NEWSLETTER ────────────────────────────────────────────

export const NEWSLETTER_SCHEMA: SectionSchema = {
  id: 'newsletter-signup',
  label: 'Newsletter Signup',
  description: 'Capture emails with a stylish CTA.',
  category: 'conversion',
  icon: 'send',
  fields: {
    heading: { type: 'text', label: 'Heading', required: true },
    subheading: { type: 'textarea', label: 'Subheading', rows: 2 },
    placeholder: { type: 'text', label: 'Input placeholder', defaultValue: 'you@example.com' },
    submitLabel: { type: 'text', label: 'Submit button', defaultValue: 'Subscribe' },
  },
  defaults: { heading: 'Stay in the loop', submitLabel: 'Subscribe' },
};

// ─── CTA STRIP ─────────────────────────────────────────────

export const CTA_STRIP_SCHEMA: SectionSchema = {
  id: 'cta-strip',
  label: 'CTA Strip',
  description: 'A prominent call-to-action band.',
  category: 'conversion',
  icon: 'arrow-right',
  fields: {
    heading: { type: 'text', label: 'Heading', required: true },
    subheading: { type: 'textarea', label: 'Subheading', rows: 2 },
    ctaLabel: { type: 'text', label: 'Button label', required: true },
    ctaHref: { type: 'text', label: 'Button link', required: true },
    style: {
      type: 'select',
      label: 'Style',
      defaultValue: 'gradient',
      options: [
        { label: 'Gradient', value: 'gradient' },
        { label: 'Solid primary', value: 'solid' },
        { label: 'Dark with image', value: 'image' },
      ],
    },
    backgroundImageUrl: {
      type: 'media',
      label: 'Background image',
      accept: 'image',
      showIf: { field: 'style', equals: 'image' },
    },
  },
  defaults: { heading: 'Ready for your next adventure?', ctaLabel: 'Plan your trip', ctaHref: '/contact', style: 'gradient' },
};

// ─── STATS ─────────────────────────────────────────────────

export const STATS_SCHEMA: SectionSchema = {
  id: 'stats',
  label: 'Stats / Numbers',
  description: 'Show off the numbers (years in business, travelers served, etc.)',
  category: 'trust',
  icon: 'bar-chart',
  fields: {
    heading: { type: 'text', label: 'Heading' },
    subheading: { type: 'textarea', label: 'Subheading', rows: 2 },
    cardVariant: {
      type: 'select',
      label: 'Style',
      defaultValue: 'gradient',
      options: [
        { label: 'Gradient cards', value: 'gradient' },
        { label: 'Centered', value: 'centered' },
        { label: 'Bordered', value: 'bordered' },
        { label: 'Standard', value: 'standard' },
      ],
    },
    stats: { type: 'stat-list', label: 'Stats', maxItems: 6 },
  },
  defaults: { cardVariant: 'gradient', stats: [] },
};

// ─── FAQ ───────────────────────────────────────────────────

export const FAQ_SCHEMA: SectionSchema = {
  id: 'faq',
  label: 'FAQ',
  description: 'Frequently asked questions.',
  category: 'content',
  icon: 'help-circle',
  fields: {
    heading: { type: 'text', label: 'Heading', required: true },
    subheading: { type: 'textarea', label: 'Subheading', rows: 2 },
    items: { type: 'faq-list', label: 'Questions', maxItems: 20 },
  },
  defaults: { heading: 'Frequently asked questions', items: [] },
};

// ─── BLOG GRID ─────────────────────────────────────────────

export const BLOG_GRID_SCHEMA: SectionSchema = {
  id: 'blog-grid',
  label: 'Blog Grid',
  description: 'Latest articles & travel guides.',
  category: 'content',
  icon: 'book-open',
  fields: {
    heading: { type: 'text', label: 'Heading' },
    subheading: { type: 'textarea', label: 'Subheading', rows: 2 },
    cardVariant: {
      type: 'select',
      label: 'Card style',
      defaultValue: 'standard',
      options: [
        { label: 'Standard', value: 'standard' },
        { label: 'Horizontal', value: 'horizontal' },
        { label: 'Featured (1 large + grid)', value: 'featured' },
        { label: 'Minimal', value: 'minimal' },
      ],
    },
    limit: { type: 'number', label: 'How many posts', defaultValue: 3, min: 1, max: 12 },
  },
  defaults: { heading: 'From our journal', cardVariant: 'standard', limit: 3 },
};

// ─── TEAM ──────────────────────────────────────────────────

export const TEAM_SCHEMA: SectionSchema = {
  id: 'team',
  label: 'Team',
  description: 'Showcase your guides and team members.',
  category: 'content',
  icon: 'users',
  fields: {
    heading: { type: 'text', label: 'Heading', required: true },
    subheading: { type: 'textarea', label: 'Subheading', rows: 2 },
    cardVariant: {
      type: 'select',
      label: 'Card style',
      defaultValue: 'standard',
      options: [
        { label: 'Standard', value: 'standard' },
        { label: 'Overlay', value: 'overlay' },
        { label: 'Minimal', value: 'minimal' },
      ],
    },
    members: { type: 'team-list', label: 'Team members', maxItems: 16 },
  },
  defaults: { heading: 'Meet the team', cardVariant: 'standard', members: [] },
};

// ─── PRICING ───────────────────────────────────────────────

export const PRICING_SCHEMA: SectionSchema = {
  id: 'pricing',
  label: 'Pricing',
  description: 'Display pricing tiers.',
  category: 'conversion',
  icon: 'dollar-sign',
  fields: {
    heading: { type: 'text', label: 'Heading', required: true },
    subheading: { type: 'textarea', label: 'Subheading', rows: 2 },
    tiers: {
      type: 'feature-list',
      label: 'Tiers',
      maxItems: 4,
    },
  },
  defaults: { heading: 'Simple pricing', tiers: [] },
};

// ─── GALLERY ───────────────────────────────────────────────

export const GALLERY_SCHEMA: SectionSchema = {
  id: 'gallery',
  label: 'Image Gallery',
  description: 'Photo grid or masonry gallery.',
  category: 'media',
  icon: 'image',
  fields: {
    heading: { type: 'text', label: 'Heading' },
    subheading: { type: 'textarea', label: 'Subheading', rows: 2 },
    layout: {
      type: 'select',
      label: 'Layout',
      defaultValue: 'grid',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'Masonry', value: 'masonry' },
        { label: 'Carousel', value: 'carousel' },
      ],
    },
    images: { type: 'media-gallery', label: 'Images', maxCount: 24 },
  },
  defaults: { layout: 'grid', images: [] },
};

// ─── CUSTOM HTML ───────────────────────────────────────────

export const CUSTOM_HTML_SCHEMA: SectionSchema = {
  id: 'custom-html',
  label: 'Custom HTML',
  description: 'Insert custom HTML or embed.',
  category: 'advanced',
  icon: 'code',
  premium: true,
  fields: {
    html: { type: 'custom-html', label: 'HTML', sanitize: true, rows: 10 },
  },
  defaults: { html: '' },
};

// ─── ALL SCHEMAS ───────────────────────────────────────────

export const ALL_SECTION_SCHEMAS: SectionSchema[] = [
  HERO_SECTION_SCHEMA,
  FEATURED_TOURS_SCHEMA,
  PACKAGE_SHOWCASE_SCHEMA,
  REGION_SHOWCASE_SCHEMA,
  ACTIVITY_CARDS_SCHEMA,
  TESTIMONIALS_SCHEMA,
  ABOUT_US_SCHEMA,
  WHY_CHOOSE_US_SCHEMA,
  STATS_SCHEMA,
  FAQ_SCHEMA,
  CONTACT_FORM_SCHEMA,
  NEWSLETTER_SCHEMA,
  CTA_STRIP_SCHEMA,
  BLOG_GRID_SCHEMA,
  TEAM_SCHEMA,
  PRICING_SCHEMA,
  GALLERY_SCHEMA,
  CUSTOM_HTML_SCHEMA,
];

export const SECTION_SCHEMAS_BY_ID: Record<string, SectionSchema> = ALL_SECTION_SCHEMAS.reduce(
  (acc, schema) => ({ ...acc, [schema.id]: schema }),
  {},
);
