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

export function RegionShowcase({ config, regions = [] }: RegionShowcaseProps) {
  const heading = (config.heading as string) ?? 'Our Destinations';
  const subheading = (config.subheading as string) ?? 'Explore regions steeped in history and natural beauty.';

  return (
    <section className="bg-[#FFFBF5] py-20 lg:py-28">
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-[#B8860B]" />
            <span className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-[#B8860B]">Destinations</span>
            <div className="h-px w-12 bg-[#B8860B]" />
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#1C1510] mb-4">{heading}</h2>
          <p className="font-body text-base sm:text-lg text-[#5C4F3D] max-w-xl mx-auto">{subheading}</p>
        </div>

        {regions.length === 0 ? (
          <div className="py-16 text-center text-[#8B7E6A] font-body">No regions available yet.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {regions.map((region, i) => (
              <a
                key={region.id}
                href={`/regions/${region.slug}`}
                className={`group relative overflow-hidden border-2 border-[#D4C4A8] hover:border-[#B8860B] transition-all duration-300 ${
                  i === 0 ? 'sm:col-span-2 min-h-[360px]' : 'min-h-[280px]'
                }`}
              >
                {region.coverImageUrl ? (
                  <img src={region.coverImageUrl} alt={region.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1B5E3B]/20 to-[#B8860B]/20" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1510]/70 via-[#1C1510]/30 to-transparent" />
                <div className="relative z-10 flex flex-col justify-end h-full p-6 lg:p-8">
                  <h3 className="font-display font-bold text-2xl lg:text-3xl text-[#FDF8F0] mb-2">{region.name}</h3>
                  {region.description && (
                    <p className="font-body text-sm text-[#FDF8F0]/80 line-clamp-2 max-w-lg">{region.description}</p>
                  )}
                  <span className="mt-3 font-body text-sm font-semibold text-[#B8860B] group-hover:text-[#FDF8F0] transition-colors duration-200">
                    Explore Region →
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
