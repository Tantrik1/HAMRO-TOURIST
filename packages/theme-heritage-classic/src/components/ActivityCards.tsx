import React from 'react';

interface ActivityItem {
  id: string;
  title: string;
  slug: string;
  type: string;
  description: string | null;
  basePrice: number;
  coverImageUrl: string | null;
}

interface ActivityCardsProps {
  config: Record<string, unknown>;
  activities?: ActivityItem[];
}

export function ActivityCards({ config, activities = [] }: ActivityCardsProps) {
  const heading = (config.heading as string) ?? 'Activities & Experiences';
  const subheading = (config.subheading as string) ?? 'Authentic encounters that bring culture and nature to life.';

  return (
    <section className="bg-[#FDF8F0] py-20 lg:py-28">
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-[#B8860B]" />
            <span className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-[#B8860B]">Experiences</span>
            <div className="h-px w-12 bg-[#B8860B]" />
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#1C1510] mb-4">{heading}</h2>
          <p className="font-body text-base sm:text-lg text-[#5C4F3D] max-w-xl mx-auto">{subheading}</p>
        </div>

        {activities.length === 0 ? (
          <div className="py-16 text-center text-[#8B7E6A] font-body">No activities available yet.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {activities.map((act) => (
              <a
                key={act.id}
                href={`/activities/${act.slug}`}
                className="group block bg-[#FFFBF5] border border-[#D4C4A8] overflow-hidden hover:border-[#B8860B] hover:shadow-lg transition-all duration-300"
              >
                <div className="relative h-44 bg-[#F5EDE0] overflow-hidden">
                  {act.coverImageUrl ? (
                    <img src={act.coverImageUrl} alt={act.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1B5E3B]/10 to-[#B8860B]/10">
                      <svg className="w-10 h-10 text-[#D4C4A8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute top-3 right-3 px-3 py-1.5 bg-[#1C1510]/80 text-[#B8860B]">
                    <span className="font-mono text-sm font-medium">${act.basePrice}</span>
                  </div>
                </div>
                <div className="p-4">
                  <span className="inline-block px-2 py-0.5 text-[10px] font-body font-semibold uppercase tracking-wider text-[#1B5E3B] bg-[#1B5E3B]/10 border border-[#1B5E3B]/20 mb-2">
                    {act.type}
                  </span>
                  <h3 className="font-display font-bold text-base text-[#1C1510] line-clamp-1 group-hover:text-[#1B5E3B] transition-colors duration-200">
                    {act.title}
                  </h3>
                  {act.description && (
                    <p className="font-body text-sm text-[#5C4F3D] line-clamp-2 mt-1">{act.description}</p>
                  )}
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
