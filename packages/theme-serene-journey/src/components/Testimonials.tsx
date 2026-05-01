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

export const Testimonials: React.FC<TestimonialsProps> = ({ config }) => {
  const heading = (config.heading as string) ?? 'Traveller Stories';
  const items = (config.items as TestimonialItem[]) ?? [
    { name: 'Anna W.', location: 'Berlin, Germany', text: 'A beautifully curated journey. Every detail was thoughtfully planned, allowing us to truly immerse in the experience.' },
    { name: 'James T.', location: 'Sydney, Australia', text: 'The serene landscapes and warm hospitality made this trip unforgettable. Highly recommended.' },
    { name: 'Priya S.', location: 'Mumbai, India', text: 'An elegant and seamless travel experience from start to finish. Can not wait to return.' },
  ];

  return (
    <section className="bg-[#FAFAFA] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-[#0D9488] mb-3">Testimonials</p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#0A0A0F] mb-4">{heading}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div key={i} className="bg-white border border-[#E4E4EF] rounded-2xl p-6 lg:p-8 shadow-sm">
              <svg className="w-8 h-8 text-[#0D9488]/30 mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
              </svg>
              <p className="font-body text-[#5C5C78] text-base leading-relaxed mb-6">"{item.text}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-[#E4E4EF]">
                {item.avatar ? (
                  <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full object-cover" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#0D9488]/10 flex items-center justify-center text-[#0D9488] font-display font-bold text-sm">
                    {item.name.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="font-body font-semibold text-sm text-[#0A0A0F]">{item.name}</p>
                  <p className="font-body text-xs text-[#9B9BB8]">{item.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
