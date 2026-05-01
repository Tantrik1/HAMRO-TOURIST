import React from 'react';

interface TestimonialsProps {
  config: Record<string, unknown>;
}

interface TestimonialItem {
  name: string;
  location: string;
  text: string;
  avatar?: string;
}

export function Testimonials({ config }: TestimonialsProps) {
  const heading = (config.heading as string) ?? 'Guest Testimonials';
  const items = (config.items as TestimonialItem[]) ?? [
    { name: 'Margaret H.', location: 'Edinburgh, UK', text: 'A truly classical travel experience. The attention to detail and historical knowledge of our guides was remarkable.' },
    { name: 'Robert K.', location: 'Toronto, Canada', text: 'Elegant arrangements from start to finish. The accommodations were charming and the itinerary was perfectly paced.' },
    { name: 'Sunita D.', location: 'Kathmandu, Nepal', text: 'A wonderful blend of tradition and comfort. Every destination felt special and carefully curated.' },
  ];

  return (
    <section className="bg-[#FDF8F0] py-20 lg:py-28">
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-[#B8860B]" />
            <span className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-[#B8860B]">Testimonials</span>
            <div className="h-px w-12 bg-[#B8860B]" />
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#1C1510] mb-4">{heading}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div key={i} className="bg-[#FFFBF5] border border-[#D4C4A8] p-6 lg:p-8">
              <div className="text-[#B8860B] text-3xl font-display leading-none mb-4">"</div>
              <p className="font-body text-[#5C4F3D] text-base leading-relaxed mb-6">{item.text}</p>
              <div className="flex items-center gap-3 pt-4 border-t border-[#D4C4A8]">
                {item.avatar ? (
                  <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full object-cover" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#1B5E3B]/10 flex items-center justify-center text-[#1B5E3B] font-display font-bold text-sm">
                    {item.name.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="font-body font-semibold text-sm text-[#1C1510]">{item.name}</p>
                  <p className="font-body text-xs text-[#8B7E6A]">{item.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
