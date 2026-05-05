import { create } from 'zustand';
import type { SectionSchema } from '@hamrotourist/shared-types';
import { ALL_SECTION_SCHEMAS } from '@hamrotourist/builder-blocks';

export interface BuilderPage {
  id: string;
  slug: string;
  label: string;
  navLabel?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  isHome: boolean;
  showInNav: boolean;
  showInFooter: boolean;
  status: string;
  navbarVariant: string;
  footerVariant: string;
  themeOverrides?: Record<string, any> | null;
  sortOrder: number;
  publishedAt?: string | null;
  sections: BuilderSection[];
  createdAt: string;
  updatedAt: string;
}

export interface BuilderSection {
  id: string;
  sectionType: string;
  label: string;
  enabled: boolean;
  config: Record<string, any>;
  sortOrder: number;
  parentSectionId?: string | null;
  variant: string;
  pageId: string;
  createdAt: string;
  updatedAt: string;
}

export interface BuilderTheme {
  id: string;
  key: string;
  name: string;
  description: string | null;
  source: string;
  isPremium: boolean;
  colorDefaults: Record<string, string>;
  fontDefaults: Record<string, string>;
  allowedSections: string[];
  defaultNavLinks: any[];
  defaultFooterColumns: any[];
  defaultNavbarVariant: string;
  defaultFooterVariant: string;
  previewImageUrl: string | null;
  isActive: boolean;
}

export interface BuilderSettings {
  id: string;
  activeThemeKey: string;
  colors: Record<string, string>;
  fonts: Record<string, string>;
  faviconUrl: string | null;
  logoUrl: string | null;
  ogImageUrl: string | null;
  googleAnalyticsId: string | null;
  customCss: string[];
  customHeadScripts: string[];
  seoDefaults: Record<string, string>;
  navbarVariant: string | null;
  footerVariant: string | null;
  navLinks: any[];
  footerColumns: any[];
  socialLinks: Record<string, string>;
  published: boolean;
  publishedAt: string | null;
}

export interface BuilderSnapshot {
  id: string;
  name: string;
  description: string | null;
  snapshotType: string;
  pages: any[];
  themeOverrides: Record<string, any>;
  themeKey: string;
  publishedByUserId: string | null;
  publishedByName: string | null;
  publishedAt: string | null;
  isLive: boolean;
  createdAt: string;
}

type Panel = 'none' | 'pages' | 'sections' | 'settings' | 'theme' | 'snapshots';

interface BuilderState {
  // Data
  pages: BuilderPage[];
  themes: BuilderTheme[];
  settings: BuilderSettings | null;
  snapshots: BuilderSnapshot[];
  selectedPageId: string | null;
  selectedSectionId: string | null;
  activePanel: Panel;
  isLoading: boolean;
  isSaving: boolean;
  lastSavedAt: string | null;
  error: string | null;

  // Actions
  setPages: (pages: BuilderPage[]) => void;
  setThemes: (themes: BuilderTheme[]) => void;
  setSettings: (settings: BuilderSettings | null) => void;
  setSnapshots: (snapshots: BuilderSnapshot[]) => void;
  selectPage: (pageId: string | null) => void;
  selectSection: (sectionId: string | null) => void;
  setActivePanel: (panel: Panel) => void;
  setLoading: (v: boolean) => void;
  setSaving: (v: boolean) => void;
  setLastSaved: (at: string) => void;
  setError: (err: string | null) => void;

  // Derived
  selectedPage: BuilderPage | null;
  selectedSection: BuilderSection | null;
  availableSchemas: SectionSchema[];
}

export const useBuilderStore = create<BuilderState>((set, get) => ({
  pages: [],
  themes: [],
  settings: null,
  snapshots: [],
  selectedPageId: null,
  selectedSectionId: null,
  activePanel: 'pages',
  isLoading: false,
  isSaving: false,
  lastSavedAt: null,
  error: null,

  setPages: (pages) => set({ pages }),
  setThemes: (themes) => set({ themes }),
  setSettings: (settings) => set({ settings }),
  setSnapshots: (snapshots) => set({ snapshots }),

  selectPage: (pageId) => {
    const state = get();
    // Deselect section if switching pages
    const nextSectionId = state.selectedPageId === pageId ? state.selectedSectionId : null;
    set({ selectedPageId: pageId, selectedSectionId: nextSectionId });
  },

  selectSection: (sectionId) => set({ selectedSectionId: sectionId }),

  setActivePanel: (panel) => set({ activePanel: panel }),
  setLoading: (v) => set({ isLoading: v }),
  setSaving: (v) => set({ isSaving: v }),
  setLastSaved: (at) => set({ lastSavedAt: at }),
  setError: (err) => set({ error: err }),

  get selectedPage() {
    const state = get();
    return state.pages.find((p) => p.id === state.selectedPageId) ?? null;
  },

  get selectedSection() {
    const state = get();
    const page = state.selectedPage;
    if (!page) return null;
    return page.sections.find((s) => s.id === state.selectedSectionId) ?? null;
  },

  get availableSchemas() {
    const state = get();
    const activeTheme = state.themes.find((t) => t.key === state.settings?.activeThemeKey);
    if (!activeTheme || !activeTheme.allowedSections?.length) return ALL_SECTION_SCHEMAS;
    return ALL_SECTION_SCHEMAS.filter(
      (s) => activeTheme.allowedSections.includes(s.id),
    );
  },
}));
