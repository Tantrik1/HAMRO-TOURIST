import { getSectionComponent, type SectionProps } from '@/lib/theme-registry';
import '@/lib/register-themes';

interface SectionRendererProps {
  themeId: string;
  sections: Array<{
    id: string;
    type: string;
    title: string;
    enabled: boolean;
    config: Record<string, unknown>;
    sortOrder: number;
  }>;
  data: Omit<SectionProps, 'config'>;
}

export function SectionRenderer({ themeId, sections, data }: SectionRendererProps) {
  const sortedSections = [...sections]
    .filter((s) => s.enabled)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <>
      {sortedSections.map((section) => {
        const Component = getSectionComponent(themeId, section.type);
        if (!Component) {
          return null;
        }
        return (
          <Component
            key={section.id}
            config={section.config}
            agency={data.agency}
            tours={data.tours}
            treks={data.treks}
            regions={data.regions}
            activities={data.activities}
            packages={data.packages}
          />
        );
      })}
    </>
  );
}
