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
  regions: RegionItem[];
}

export const RegionShowcase: React.FC<RegionShowcaseProps> = ({ config, regions }) => {
  const heading = (config.heading as string) ?? 'Explore Regions';
  const subheading =
    (config.subheading as string) ?? "Discover the world's most breathtaking destinations.";

  return (
    <section className="bg-[#111118] py-20 lg:py-28">
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-body font-medium uppercase tracking-widest text-[#06B6D4] mb-3">
            Destinations
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#F1F0FF] mb-4">
            {heading}
          </h2>
          <p className="font-body text-[#9B9BB8] text-base sm:text-lg max-w-xl mx-auto">
            {subheading}
          </p>
        </div>

        {regions.length === 0 ? (
          <div className="text-center py-16 text-[#5C5C78] font-body">
            No regions available yet. Check back soon.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {regions.map((region, index) => (
              <a
                key={region.id}
                href={`/regions/${region.slug}`}
                className={`group relative overflow-hidden rounded-[20px] bg-[#1A1A24] border border-[#2A2A3A] hover:border-[#06B6D4]/40 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.4)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.6)] ${
                  // Make the first card span 2 columns on large screens for visual interest
                  index === 0 ? 'lg:col-span-2 min-h-[380px]' : 'min-h-[280px]'
                }`}
              >
                {/* Background image */}
                {region.coverImageUrl ? (
                  <img
                    src={region.coverImageUrl}
                    alt={region.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, hsl(${(index * 60) % 360}, 70%, 20%) 0%, #0A0A0F 100%)`,
                    }}
                  />
                )}

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F]/40 to-transparent" />

                {/* Hover gradient accent */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#06B6D4]/0 to-[#7C3AED]/0 group-hover:from-[#06B6D4]/10 group-hover:to-[#7C3AED]/20 transition-all duration-500" />

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-end h-full p-6 lg:p-8">
                  {/* Location pin */}
                  <div className="flex items-center gap-1.5 mb-2">
                    <svg className="w-4 h-4 text-[#06B6D4]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-xs font-body text-[#9B9BB8] uppercase tracking-wider">Region</span>
                  </div>

                  <h3 className="font-display font-bold text-2xl lg:text-3xl text-[#F1F0FF] mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#06B6D4] group-hover:to-[#7C3AED] transition-all duration-300">
                    {region.name}
                  </h3>

                  {region.description && (
                    <p className="font-body text-sm text-[#9B9BB8] line-clamp-2 mb-4 max-w-lg">
                      {region.description}
                    </p>
                  )}

                  <div className="flex items-center gap-1 text-sm font-body font-medium text-[#06B6D4] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    Explore Region
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
