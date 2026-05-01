import React from 'react';

interface RegionItem {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  coverImageUrl: string | null;
}

interface RegionShowcaseProps {
  config: Record<string, unknown>;
  regions?: RegionItem[];
}

export const RegionShowcase: React.FC<RegionShowcaseProps> = ({ config, regions = [] }) => {
  const heading = (config.heading as string) ?? 'Discover Regions';
  const subheading = (config.subheading as string) ?? 'Find your perfect destination across stunning landscapes.';

  return (
    <section id="region-showcase" className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-[#D97706] mb-3">Destinations</p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#0A0A0F] mb-4">{heading}</h2>
          <p className="font-body text-base sm:text-lg text-[#5C5C78] max-w-xl mx-auto">{subheading}</p>
        </div>

        {regions.length === 0 ? (
          <div className="py-20 text-center text-[#9B9BB8] font-body">No regions available yet.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {regions.map((region, i) => (
              <a
                key={region.id}
                href={`/regions/${region.slug}`}
                className={`group relative overflow-hidden rounded-2xl ${i === 0 ? 'sm:col-span-2 min-h-[360px]' : 'min-h-[280px]'}`}
              >
                {region.coverImageUrl ? (
                  <img src={region.coverImageUrl} alt={region.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0D9488]/30 to-[#D97706]/30" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="relative z-10 flex flex-col justify-end h-full p-6 lg:p-8">
                  <h3 className="font-display font-bold text-2xl text-white mb-1">{region.name}</h3>
                  {region.description && (
                    <p className="font-body text-sm text-white/80 line-clamp-2 max-w-md">{region.description}</p>
                  )}
                  <span className="mt-3 font-body text-sm font-medium text-white/70 flex items-center gap-1 group-hover:text-white group-hover:gap-2 transition-all duration-200">
                    Explore
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
