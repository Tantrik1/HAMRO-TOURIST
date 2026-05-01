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
  const subheading = (config.subheading as string) ?? 'Thrilling experiences that push your limits.';

  return (
    <section className="bg-ht-ink py-20 lg:py-28">
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-body font-medium uppercase tracking-widest text-[#F97316] mb-3">
            Experiences
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#F1F0FF] mb-4">
            {heading}
          </h2>
          <p className="font-body text-[#9B9BB8] text-base sm:text-lg max-w-xl mx-auto">{subheading}</p>
        </div>

        {activities.length === 0 ? (
          <div className="text-center py-16 text-[#5C5C78] font-body">No activities available yet.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {activities.map((act) => (
              <a
                key={act.id}
                href={`/activities/${act.slug}`}
                className="group block bg-[#111118] border border-[#2A2A3A] rounded-[20px] overflow-hidden hover:border-[#F97316]/40 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.4)] hover:shadow-[0_0_40px_rgba(249,115,22,0.15)]"
              >
                <div className="relative h-44 bg-[#1A1A24] overflow-hidden">
                  {act.coverImageUrl ? (
                    <img src={act.coverImageUrl} alt={act.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#F97316]/20 to-[#F43F5E]/20">
                      <svg className="w-10 h-10 text-[#3D3D52]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-[#0A0A0F]/80 backdrop-blur-sm border border-[#2A2A3A]">
                    <span className="font-mono text-sm font-medium text-[#F97316]">${act.basePrice}</span>
                  </div>
                </div>
                <div className="p-5">
                  <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider text-[#06B6D4] border border-[#06B6D4]/30 bg-[#06B6D4]/10 mb-2">
                    {act.type}
                  </span>
                  <h3 className="font-display font-bold text-lg text-[#F1F0FF] mb-1 line-clamp-1 group-hover:text-[#F97316] transition-colors duration-200">
                    {act.title}
                  </h3>
                  {act.description && (
                    <p className="font-body text-sm text-[#9B9BB8] line-clamp-2">{act.description}</p>
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
