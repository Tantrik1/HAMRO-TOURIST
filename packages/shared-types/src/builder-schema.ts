// ============================================================
// Website Builder — Schema System (Shopify-grade)
// ============================================================
// These types drive the entire schema-driven visual editor.
// Every theme declares its sections + fields using this contract.
// The admin editor renders field controls automatically from the schema.
// The renderer validates section content against the schema.
// ============================================================

/** Field categories available in the editor settings panel. */
export type FieldType =
  | 'text'
  | 'textarea'
  | 'richtext'
  | 'url'
  | 'email'
  | 'tel'
  | 'number'
  | 'range'
  | 'toggle'
  | 'select'
  | 'multi-select'
  | 'color'
  | 'gradient'
  | 'media'
  | 'media-gallery'
  | 'icon'
  | 'font'
  | 'link-list'
  | 'social-list'
  | 'package-selector'
  | 'tour-selector'
  | 'trek-selector'
  | 'activity-selector'
  | 'region-selector'
  | 'country-selector'
  | 'destination-selector'
  | 'testimonial-list'
  | 'feature-list'
  | 'faq-list'
  | 'stat-list'
  | 'team-list'
  | 'custom-html'
  | 'divider';

export interface FieldBase {
  type: FieldType;
  label: string;
  help?: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: unknown;
  /** When set, field only shows if target field equals one of these values. */
  showIf?: { field: string; equals: unknown | unknown[] };
  /** Group label for visual grouping in editor panel. */
  group?: string;
}

export interface TextField extends FieldBase {
  type: 'text' | 'email' | 'tel' | 'url';
  maxLength?: number;
  minLength?: number;
  pattern?: string;
}

export interface TextareaField extends FieldBase {
  type: 'textarea' | 'richtext';
  maxLength?: number;
  rows?: number;
}

export interface NumberField extends FieldBase {
  type: 'number' | 'range';
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}

export interface ToggleField extends FieldBase {
  type: 'toggle';
}

export interface SelectOption {
  label: string;
  value: string;
  icon?: string;
  preview?: string;
}

export interface SelectField extends FieldBase {
  type: 'select' | 'multi-select';
  options: SelectOption[];
  maxSelected?: number;
}

export interface ColorField extends FieldBase {
  type: 'color' | 'gradient';
  presets?: string[];
  allowCustom?: boolean;
}

export interface MediaField extends FieldBase {
  type: 'media' | 'media-gallery';
  accept?: 'image' | 'video' | 'any';
  maxSize?: number;
  maxCount?: number;
  aspectRatio?: string;
}

export interface IconField extends FieldBase {
  type: 'icon';
  iconSet?: 'lucide' | 'heroicons' | 'custom';
}

export interface FontField extends FieldBase {
  type: 'font';
  fontFamily?: 'display' | 'body' | 'mono';
}

export interface LinkListField extends FieldBase {
  type: 'link-list' | 'social-list';
  maxItems?: number;
  itemLabel?: string;
}

export interface SelectorField extends FieldBase {
  type:
    | 'package-selector'
    | 'tour-selector'
    | 'trek-selector'
    | 'activity-selector'
    | 'region-selector'
    | 'country-selector'
    | 'destination-selector';
  multiple?: boolean;
  maxSelected?: number;
}

export interface ListField extends FieldBase {
  type:
    | 'testimonial-list'
    | 'feature-list'
    | 'faq-list'
    | 'stat-list'
    | 'team-list';
  maxItems?: number;
  itemSchema?: Record<string, FieldSchema>;
}

export interface CustomHtmlField extends FieldBase {
  type: 'custom-html';
  sanitize?: boolean;
  rows?: number;
}

export interface DividerField extends FieldBase {
  type: 'divider';
}

export type FieldSchema =
  | TextField
  | TextareaField
  | NumberField
  | ToggleField
  | SelectField
  | ColorField
  | MediaField
  | IconField
  | FontField
  | LinkListField
  | SelectorField
  | ListField
  | CustomHtmlField
  | DividerField;

// ─── Section Schema ─────────────────────────────────────────

export type SectionCategory =
  | 'hero'
  | 'content'
  | 'product'
  | 'discovery'
  | 'trust'
  | 'media'
  | 'conversion'
  | 'navigation'
  | 'structure'
  | 'advanced';

export interface SectionSchema {
  /** Unique section identifier — used in database section_type column. */
  id: string;
  /** Human-readable label shown in editor palette. */
  label: string;
  /** Short description for editor tooltip. */
  description?: string;
  /** Category for editor palette grouping. */
  category: SectionCategory;
  /** Lucide icon name. */
  icon?: string;
  /** Preview image (base64 or URL). */
  preview?: string;
  /** Whether this section can appear only once per page. */
  unique?: boolean;
  /** Whether this section is required (system sections like header/footer). */
  required?: boolean;
  /** Premium plan required to use this section. */
  premium?: boolean;
  /** Fields declaration — keys become section content JSON keys. */
  fields: Record<string, FieldSchema>;
  /** Default content values applied on section creation. */
  defaults?: Record<string, unknown>;
  /** Layout/appearance settings (separate from content fields). */
  settings?: Record<string, FieldSchema>;
}

// ─── Theme Manifest ─────────────────────────────────────────

export interface ThemeManifest {
  /** Theme ID — matches package name suffix. */
  id: string;
  /** Human name. */
  name: string;
  /** Short description. */
  description: string;
  /** Version. */
  version: string;
  /** Preview screenshots per breakpoint. */
  previews?: {
    desktop?: string;
    tablet?: string;
    mobile?: string;
  };
  /** Best-for tags, e.g. ['adventure','trekking']. */
  tags?: string[];
  /** Default color palette (overridable per tenant). */
  defaultColors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  /** Default font stack (overridable). */
  defaultFonts: {
    heading: string;
    body: string;
    mono?: string;
  };
  /** Sections this theme provides, with schemas. */
  sections: SectionSchema[];
  /** Theme-level settings (colors/fonts/global). */
  globalSettings?: Record<string, FieldSchema>;
  /** Default pages created when a theme instance is initialized. */
  defaultPages: DefaultPage[];
}

export interface DefaultPage {
  slug: string;
  title: string;
  isSystemPage?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  sections: DefaultSection[];
}

export interface DefaultSection {
  type: string;
  content?: Record<string, unknown>;
  settings?: Record<string, unknown>;
}

// ─── Field Defaults Helper ──────────────────────────────────

export interface FieldGroup {
  label: string;
  fields: string[];
}
