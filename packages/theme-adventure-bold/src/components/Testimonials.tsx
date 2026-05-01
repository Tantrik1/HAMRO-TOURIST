import React from 'react';

interface TestimonialsProps {
  config: Record<string, unknown>;
}

interface TestimonialItem {
  name: string;
  location: string;
  text: string;
  avatar?: string;
  rating?: number;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ config }) => {
  const heading = (config.heading as string) ?? 'What Adventurers Say';
  const items = (config.items as TestimonialItem[]) ?? [];

  const defaultItems: TestimonialItem[] = [
    { name: 'Sarah K.', location: 'Colorado, USA', text: 'An absolutely incredible experience. The guides were knowledgeable and the scenery was beyond breathtaking.', rating: 5 },
    { name: 'Raj M.', location: 'Delhi, India', text: 'Best trekking experience of my life. Everything was perfectly organized from start to finish.', rating: 5 },
    { name: 'Emma L.', location: 'London, UK', text: 'The adventure exceeded all expectations. Will definitely be coming back for more.', rating: 5 },
  ];

  const testimonials = items.length > 0 ? items : defaultItems;

  return (
    <section className="bg-ht-ink py-20 lg:py-28">
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-body font-medium uppercase tracking-widest text-[#7C3AED] mb-3">
            Testimonials
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#F1F0FF] mb-4">{heading}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((item, i) => (
            <div
              key={i}
              className="bg-[#111118] border border-[#2A2A3A] rounded-[20px] p-6 lg:p-8 hover:border-[#7C3AED]/30 transition-all duration-300"
            >
              {/* Quote icon */}
              <svg className="w-8 h-8 text-[#7C3AED]/40 mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
              </svg>

              <p className="font-body text-[#9B9BB8] text-base leading-relaxed mb-6">"{item.text}"</p>

              {/* Stars */}
              {item.rating && (
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <svg key={j} className={`w-4 h-4 ${j < item.rating! ? 'text-[#F97316]' : 'text-[#3D3D52]'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-3">
                {item.avatar ? (
                  <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full object-cover" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] flex items-center justify-center text-white font-display font-bold text-sm">
                    {item.name.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="font-body font-semibold text-sm text-[#F1F0FF]">{item.name}</p>
                  <p className="font-body text-xs text-[#5C5C78]">{item.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
