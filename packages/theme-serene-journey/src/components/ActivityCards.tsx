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

export const ActivityCards: React.FC<ActivityCardsProps> = ({ config, activities = [] }) => {
  const heading = (config.heading as string) ?? 'Activities';
  const subheading = (config.subheading as string) ?? 'Unique experiences to enrich your journey.';

  return (
    <section className="bg-[#FAFAFA] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mb-12 lg:mb-16">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-[#D97706] mb-3">Experiences</p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#0A0A0F] mb-4">{heading}</h2>
          <p className="font-body text-base sm:text-lg text-[#5C5C78]">{subheading}</p>
        </div>

        {activities.length === 0 ? (
          <div className="py-20 text-center text-[#9B9BB8] font-body">No activities available yet.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {activities.map((act) => (
              <a
                key={act.id}
                href={`/activities/${act.slug}`}
                className="group block bg-white border border-[#E4E4EF] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-[3/2] overflow-hidden bg-[#F4F4F8]">
                  {act.coverImageUrl ? (
                    <img src={act.coverImageUrl} alt={act.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0D9488]/10 to-[#D97706]/10">
                      <svg className="w-10 h-10 text-[#9B9BB8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm shadow-sm">
                    <span className="font-mono text-sm font-medium text-[#0A0A0F]">${act.basePrice}</span>
                  </div>
                </div>
                <div className="p-4">
                  <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-body font-semibold uppercase tracking-wider text-[#0D9488] bg-[#0D9488]/10 mb-2">
                    {act.type}
                  </span>
                  <h3 className="font-display font-semibold text-base text-[#0A0A0F] line-clamp-1 group-hover:text-[#0D9488] transition-colors duration-200">
                    {act.title}
                  </h3>
                  {act.description && (
                    <p className="font-body text-sm text-[#5C5C78] line-clamp-2 mt-1">{act.description}</p>
                  )}
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
