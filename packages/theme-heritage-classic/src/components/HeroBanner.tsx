import React from 'react';

interface HeroBannerProps {
  config: Record<string, unknown>;
  agency: {
    name: string;
    logo: string;
    tagline: string;
  };
}

export function HeroBanner({ config, agency }: HeroBannerProps) {
  const heading = (config.heading as string) ?? `Discover the World with ${agency.name}`;
  const subheading = (config.subheading as string) ?? agency.tagline;
  const backgroundImage = (config.backgroundImage as string) ?? '';
  const ctaLabel = (config.ctaLabel as string) ?? 'Explore Our Tours';
  const ctaHref = (config.ctaHref as string) ?? '/tours';
  const secondaryCtaLabel = (config.secondaryCtaLabel as string) ?? 'View Packages';
  const secondaryCtaHref = (config.secondaryCtaHref as string) ?? '/packages';

  return (
    <section
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
      style={
        backgroundImage
          ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
          : { backgroundColor: '#1C1510' }
      }
    >
      {/* Warm dark overlay */}
      <div className="absolute inset-0 bg-[#1C1510]/65" />

      {/* Ornamental top border */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-[#B8860B]" />

      {/* Ornamental bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-[#B8860B]" />

      <div className="relative z-10 mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 text-center py-20">

        {/* Ornamental top element */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-16 bg-[#B8860B]" />
          <div className="text-[#B8860B] text-xl">✦</div>
          <div className="h-px w-16 bg-[#B8860B]" />
        </div>

        {/* Logo */}
        {agency.logo && (
          <div className="mb-6">
            <img
              src={agency.logo}
              alt={agency.name}
              className="h-16 w-auto mx-auto object-contain brightness-0 invert"
            />
          </div>
        )}

        {/* Main heading */}
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FDF8F0] leading-tight mb-6">
          {heading}
        </h1>

        {/* Ornamental divider */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-12 bg-[#B8860B]/70" />
          <div className="w-2 h-2 rounded-full bg-[#B8860B]" />
          <div className="h-px w-12 bg-[#B8860B]/70" />
        </div>

        {/* Subheading */}
        <p className="font-body text-lg sm:text-xl text-[#FDF8F0]/85 max-w-2xl mx-auto leading-relaxed mb-10">
          {subheading}
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href={ctaHref}
            className="
              inline-flex items-center gap-2 px-8 py-4
              bg-[#1B5E3B] text-[#FDF8F0]
              font-body font-semibold text-base
              border-2 border-[#B8860B]
              hover:bg-[#B8860B] hover:text-[#1C1510]
              transition-all duration-300
              min-h-[44px]
            "
          >
            {ctaLabel}
          </a>
          <a
            href={secondaryCtaHref}
            className="
              inline-flex items-center gap-2 px-8 py-4
              bg-transparent text-[#FDF8F0]
              font-body font-semibold text-base
              border-2 border-[#FDF8F0]/60
              hover:border-[#FDF8F0] hover:bg-[#FDF8F0]/10
              transition-all duration-300
              min-h-[44px]
            "
          >
            {secondaryCtaLabel}
          </a>
        </div>

        {/* Ornamental bottom element */}
        <div className="flex items-center justify-center gap-4 mt-12">
          <div className="h-px w-16 bg-[#B8860B]/60" />
          <div className="text-[#B8860B]/60 text-sm">✦</div>
          <div className="h-px w-16 bg-[#B8860B]/60" />
        </div>
      </div>
    </section>
  );
}
