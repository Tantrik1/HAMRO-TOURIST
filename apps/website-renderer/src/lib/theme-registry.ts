import type { ComponentType } from 'react';

export interface SectionProps {
  config: Record<string, unknown>;
  agency?: { name: string; logo: string; tagline: string };
  tours?: Array<{
    id: string; title: string; slug: string; description: string | null;
    difficulty: string; durationDays: number; coverImageUrl: string | null;
  }>;
  treks?: Array<{
    id: string; title: string; slug: string; description: string | null;
    difficulty: string; maxAltitude: number | null; coverImageUrl: string | null;
  }>;
  regions?: Array<{
    id: string; name: string; slug: string;
    description: string | null; coverImageUrl: string | null;
  }>;
  activities?: Array<{
    id: string; title: string; slug: string; type: string;
    description: string | null; basePrice: number; coverImageUrl: string | null;
  }>;
  packages?: Array<{
    id: string; title: string; slug: string;
    description: string | null; coverImageUrl: string | null;
  }>;
}

type ThemeComponents = Record<string, ComponentType<SectionProps>>;

const themeRegistry: Record<string, ThemeComponents> = {};

export function registerTheme(themeId: string, components: ThemeComponents) {
  themeRegistry[themeId] = components;
}

export function getThemeComponents(themeId: string): ThemeComponents | null {
  return themeRegistry[themeId] || null;
}

export function getSectionComponent(themeId: string, sectionType: string): ComponentType<SectionProps> | null {
  const theme = themeRegistry[themeId];
  if (!theme) return null;
  return theme[sectionType] || null;
}
