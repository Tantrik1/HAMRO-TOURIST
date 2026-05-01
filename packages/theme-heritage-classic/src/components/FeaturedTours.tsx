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
  tours?: TourItem[];
}

const difficultyColors: Record<string, string> = {
  easy: 'bg-[#1B5E3B]/10 text-[#1B5E3B] border-[#1B5E3B]/30',
  moderate: 'bg-[#B8860B]/10 text-[#B8860B] border-[#B8860B]/30',
  hard: 'bg-[#7B2D3B]/10 text-[#7B2D3B] border-[#7B2D3B]/30',
  extreme: 'bg-[#7B2D3B]/20 text-[#7B2D3B] border-[#7B2D3B]/50',
};

export function FeaturedTours({ config, tours = [] }: FeaturedToursProps) {
  const heading = (config.heading as string) ?? 'Featured Tours';
  const subheading = (config.subheading as string) ?? 'Timeless journeys through the world\'s most captivating destinations.';

  return (
    <section className="bg-[#FDF8F0] py-20 lg:py-28">
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-[#B8860B]" />
            <span className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-[#B8860B]">Tours</span>
            <div className="h-px w-12 bg-[#B8860B]" />
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#1C1510] mb-4">{heading}</h2>
          <p className="font-body text-base sm:text-lg text-[#5C4F3D] max-w-xl mx-auto">{subheading}</p>
        </div>

        {tours.length === 0 ? (
          <div className="py-16 text-center text-[#8B7E6A] font-body">No tours available yet.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tours.map((tour) => (
              <a
                key={tour.id}
                href={`/tours/${tour.slug}`}
                className="group block bg-[#FFFBF5] border border-[#D4C4A8] overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="relative h-52 bg-[#F5EDE0] overflow-hidden">
                  {tour.coverImageUrl ? (
                    <img src={tour.coverImageUrl} alt={tour.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1B5E3B]/10 to-[#B8860B]/10">
                      <svg className="w-12 h-12 text-[#D4C4A8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                  )}
                  <span className={`absolute top-3 left-3 px-2.5 py-1 text-xs font-body font-semibold capitalize border ${difficultyColors[tour.difficulty.toLowerCase()] ?? difficultyColors.moderate}`}>
                    {tour.difficulty}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-bold text-xl text-[#1C1510] mb-2 group-hover:text-[#1B5E3B] transition-colors duration-200 line-clamp-2">
                    {tour.title}
                  </h3>
                  {tour.description && (
                    <p className="font-body text-sm text-[#5C4F3D] line-clamp-2 mb-4">{tour.description}</p>
                  )}
                  <div className="flex items-center justify-between pt-3 border-t border-[#D4C4A8]">
                    <span className="font-body text-sm text-[#8B7E6A]">{tour.durationDays} days</span>
                    <span className="font-body text-sm font-semibold text-[#1B5E3B]">View Details →</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
