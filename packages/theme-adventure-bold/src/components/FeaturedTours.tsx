import React from 'react';

interface TourItem {
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
  tours: TourItem[];
}

const difficultyColors: Record<string, string> = {
  easy: 'bg-[#84CC16]/15 text-[#84CC16] border-[#84CC16]/30',
  moderate: 'bg-[#06B6D4]/15 text-[#06B6D4] border-[#06B6D4]/30',
  hard: 'bg-[#F97316]/15 text-[#F97316] border-[#F97316]/30',
  extreme: 'bg-[#F43F5E]/15 text-[#F43F5E] border-[#F43F5E]/30',
};

export const FeaturedTours: React.FC<FeaturedToursProps> = ({ config, tours }) => {
  const heading = (config.heading as string) ?? 'Featured Tours';
  const subheading =
    (config.subheading as string) ?? 'Handpicked adventures for the bold and curious.';
  const viewAllHref = (config.viewAllHref as string) ?? '#';

  return (
    <section id="featured-tours" className="bg-ht-ink py-20 lg:py-28">
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-body font-medium uppercase tracking-widest text-[#7C3AED] mb-3">
            Explore
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#F1F0FF] mb-4">
            {heading}
          </h2>
          <p className="font-body text-[#9B9BB8] text-base sm:text-lg max-w-xl mx-auto">
            {subheading}
          </p>
        </div>

        {/* Tour grid */}
        {tours.length === 0 ? (
          <div className="text-center py-16 text-[#5C5C78] font-body">
            No tours available yet. Check back soon.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {tours.map((tour) => (
              <a
                key={tour.id}
                href={`/tours/${tour.slug}`}
                className="group block bg-[#111118] border border-[#2A2A3A] rounded-[20px] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.4)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.6)] hover:border-[#7C3AED]/40 transition-all duration-300"
              >
                {/* Cover image */}
                <div className="relative h-52 bg-[#1A1A24] overflow-hidden">
                  {tour.coverImageUrl ? (
                    <img
                      src={tour.coverImageUrl}
                      alt={tour.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#7C3AED]/20 to-[#06B6D4]/20">
                      <svg className="w-12 h-12 text-[#3D3D52]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  {/* Gradient overlay on image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111118]/80 via-transparent to-transparent" />

                  {/* Difficulty badge */}
                  <span
                    className={`absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium border ${
                      difficultyColors[tour.difficulty.toLowerCase()] ?? difficultyColors.moderate
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    {tour.difficulty}
                  </span>
                </div>

                {/* Card body */}
                <div className="p-5">
                  <h3 className="font-display font-bold text-xl text-[#F1F0FF] mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#7C3AED] group-hover:to-[#06B6D4] transition-all duration-200 line-clamp-2">
                    {tour.title}
                  </h3>

                  {tour.description && (
                    <p className="font-body text-sm text-[#9B9BB8] leading-relaxed mb-4 line-clamp-2">
                      {tour.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    {/* Duration */}
                    <div className="flex items-center gap-1.5 text-[#9B9BB8]">
                      <svg className="w-4 h-4 text-[#7C3AED]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm font-body">{tour.durationDays} days</span>
                    </div>

                    {/* Arrow CTA */}
                    <span className="flex items-center gap-1 text-sm font-body font-medium text-[#7C3AED] group-hover:gap-2 transition-all duration-200">
                      View Tour
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* View all */}
        {tours.length > 0 && (
          <div className="text-center mt-12">
            <a
              href={viewAllHref}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-body font-semibold text-base text-[#9B9BB8] border border-[#2A2A3A] hover:border-[#7C3AED] hover:text-[#F1F0FF] transition-all duration-200 min-h-[44px]"
            >
              View All Tours
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
