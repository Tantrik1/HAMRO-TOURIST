import React from 'react';

interface AboutUsProps {
  config: Record<string, unknown>;
  agency?: { name: string; logo: string; tagline: string };
}

export function AboutUs({ config, agency }: AboutUsProps) {
  const heading = (config.heading as string) ?? `About ${agency?.name ?? 'Us'}`;
  const body = (config.body as string) ?? 'For generations, we have been guiding travellers through the world\'s most remarkable landscapes. Our commitment to quality, tradition, and authentic cultural experiences has earned us the trust of discerning explorers.';
  const imageUrl = config.imageUrl as string | undefined;

  return (
    <section className="bg-[#FFFBF5] py-20 lg:py-28">
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          <div className="w-full lg:w-1/2">
            <div className="relative aspect-[4/3] border-2 border-[#D4C4A8] overflow-hidden">
              {imageUrl ? (
                <img src={imageUrl} alt={heading} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#1B5E3B]/10 to-[#B8860B]/10 flex items-center justify-center">
                  {agency?.logo ? (
                    <img src={agency.logo} alt={agency.name} className="h-16 object-contain opacity-30" />
                  ) : (
                    <svg className="w-16 h-16 text-[#D4C4A8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3" />
                    </svg>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-[#B8860B]" />
              <span className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-[#B8860B]">Our Story</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#1C1510] mb-6">{heading}</h2>
            <p className="font-body text-base text-[#5C4F3D] leading-relaxed">{body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
