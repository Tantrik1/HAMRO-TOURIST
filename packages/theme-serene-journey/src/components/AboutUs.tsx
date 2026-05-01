import React from 'react';

interface AboutUsProps {
  config: Record<string, unknown>;
  agency?: { name: string; logo: string; tagline: string };
}

export const AboutUs: React.FC<AboutUsProps> = ({ config, agency }) => {
  const heading = (config.heading as string) ?? `About ${agency?.name ?? 'Us'}`;
  const body = (config.body as string) ?? 'We believe travel is about connection — with nature, culture, and yourself. Our carefully crafted journeys are designed to create moments of wonder and lasting memories.';
  const imageUrl = config.imageUrl as string | undefined;

  return (
    <section className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          <div className="w-full lg:w-1/2">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#F4F4F8]">
              {imageUrl ? (
                <img src={imageUrl} alt={heading} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#0D9488]/10 to-[#D97706]/10 flex items-center justify-center">
                  {agency?.logo ? (
                    <img src={agency.logo} alt={agency.name} className="h-16 object-contain opacity-30" />
                  ) : (
                    <svg className="w-16 h-16 text-[#9B9BB8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582" />
                    </svg>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-[#0D9488] mb-3">Our Story</p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#0A0A0F] mb-6">{heading}</h2>
            <div className="w-12 h-px bg-[#0D9488] mb-6" />
            <p className="font-body text-base text-[#5C5C78] leading-relaxed">{body}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
