import React from 'react';

interface Tour {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  difficulty: string;
  durationDays: number;
  coverImageUrl: string | null;
}

interface FeaturedToursProps {
  config: Record<string, unknown>;
  tours: Tour[];
}

const difficultyColors: Record<string, string> = {
  easy:     'bg-[#D1FAE5] text-[#065F46]',
  moderate: 'bg-[#FEF3C7] text-[#92400E]',
  hard:     'bg-[#FEE2E2] text-[#991B1B]',
  extreme:  'bg-[#EDE9FE] text-[#5B21B6]',
};

export const FeaturedTours: React.FC<FeaturedToursProps> = ({ config, tours }) => {
  const heading = (config.heading as string) ?? 'Featured Tours';
  const subheading = (config.subheading as string) ?? 'Handpicked journeys curated for every kind of traveller.';
  const ctaLabel = (config.ctaLabel as string) ?? 'View All Tours';
  const ctaHref = (config.ctaHref as string) ?? '/tours';

  return (
    <section id="featured-tours" className="bg-[#FAFAFA] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="max-w-xl mb-12 lg:mb-16">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-[#0D9488] mb-3">
            Our Tours
          </p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#0A0A0F] leading-tight mb-4">
            {heading}
          </h2>
          <p className="font-body text-base sm:text-lg text-[#5C5C78] leading-relaxed">
            {subheading}
          </p>
        </div>

        {/* Tours grid */}
        {tours.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {tours.map((tour) => (
              <a
                key={tour.id}
                href={`/tours/${tour.slug}`}
                className="group block bg-white border border-[#E4E4EF] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#F4F4F8]">
                  {tour.coverImageUrl ? (
                    <img
                      src={tour.coverImageUrl}
                      alt={tour.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0D9488]/10 to-[#D97706]/10">
                      <svg className="w-12 h-12 text-[#9B9BB8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                  )}

                  {/* Difficulty badge */}
                  <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-body font-semibold capitalize ${difficultyColors[tour.difficulty.toLowerCase()] ?? 'bg-[#F4F4F8] text-[#5C5C78]'}`}>
                    {tour.difficulty}
                  </span>
                </div>

                {/* Card body */}
                <div className="p-5">
                  <h3 className="font-display font-semibold text-lg text-[#0A0A0F] mb-2 group-hover:text-[#0D9488] transition-colors duration-200 leading-snug">
                    {tour.title}
                  </h3>

                  {tour.description && (
                    <p className="font-body text-sm text-[#5C5C78] leading-relaxed mb-4 line-clamp-2">
                      {tour.description}
                    </p>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-[#E4E4EF]">
                    <div className="flex items-center gap-1.5 text-[#5C5C78]">
                      <svg className="w-4 h-4 text-[#0D9488]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="font-body text-sm">{tour.durationDays} {tour.durationDays === 1 ? 'day' : 'days'}</span>
                    </div>
                    <span className="font-body text-sm font-medium text-[#0D9488] flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
                      View tour
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center text-[#9B9BB8] font-body text-base">
            No tours available yet.
          </div>
        )}

        {/* View all CTA */}
        {tours.length > 0 && (
          <div className="text-center">
            <a
              href={ctaHref}
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-[#0D9488] text-[#0D9488] font-body font-semibold text-sm rounded-full hover:bg-[#0D9488] hover:text-white transition-all duration-200 min-h-[44px]"
            >
              {ctaLabel}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </section>
  );
};
