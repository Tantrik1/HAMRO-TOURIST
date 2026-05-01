import React from 'react';

interface AboutUsProps {
  config: Record<string, unknown>;
  agency?: { name: string; logo: string; tagline: string };
}

export const AboutUs: React.FC<AboutUsProps> = ({ config, agency }) => {
  const heading = (config.heading as string) ?? `About ${agency?.name ?? 'Us'}`;
  const body = (config.body as string) ?? 'We are passionate adventurers dedicated to creating unforgettable experiences. Our team of expert guides ensures every journey is safe, exciting, and truly transformative.';
  const imageUrl = config.imageUrl as string | undefined;
  const stats = (config.stats as Array<{ label: string; value: string }>) ?? [
    { label: 'Years Experience', value: '10+' },
    { label: 'Happy Travelers', value: '5000+' },
    { label: 'Destinations', value: '50+' },
    { label: 'Expert Guides', value: '30+' },
  ];

  return (
    <section className="bg-ht-ink py-20 lg:py-28">
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          {/* Image / visual side */}
          <div className="w-full lg:w-1/2">
            <div className="relative rounded-[20px] overflow-hidden aspect-[4/3] bg-[#111118] border border-[#2A2A3A]">
              {imageUrl ? (
                <img src={imageUrl} alt={heading} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#7C3AED]/20 to-[#06B6D4]/20 flex items-center justify-center">
                  {agency?.logo ? (
                    <img src={agency.logo} alt={agency.name} className="h-20 object-contain opacity-50" />
                  ) : (
                    <svg className="w-20 h-20 text-[#3D3D52]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </div>
              )}
              {/* Accent glow */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-[#7C3AED]/20 blur-[80px] pointer-events-none" />
            </div>
          </div>

          {/* Text side */}
          <div className="w-full lg:w-1/2">
            <span className="inline-block text-xs font-body font-medium uppercase tracking-widest text-[#7C3AED] mb-3">
              Our Story
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#F1F0FF] mb-6">{heading}</h2>
            <p className="font-body text-[#9B9BB8] text-base leading-relaxed mb-8">{body}</p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, i) => (
                <div key={i}>
                  <p className="font-mono text-3xl font-medium text-[#F1F0FF]">{stat.value}</p>
                  <p className="font-body text-sm text-[#5C5C78] mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
