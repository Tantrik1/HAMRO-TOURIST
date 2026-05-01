import React from 'react';

interface HeroBannerProps {
  config: Record<string, unknown>;
  agency: { name: string; logo: string; tagline: string };
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ config, agency }) => {
  const heading = (config.heading as string) ?? agency.name;
  const subheading = (config.subheading as string) ?? agency.tagline;
  const ctaLabel = (config.ctaLabel as string) ?? 'Explore Adventures';
  const ctaHref = (config.ctaHref as string) ?? '#featured-tours';
  const secondaryCtaLabel = (config.secondaryCtaLabel as string) ?? 'View All Tours';
  const secondaryCtaHref = (config.secondaryCtaHref as string) ?? '#';
  const backgroundImage = (config.backgroundImage as string) ?? null;
  const overlayOpacity = (config.overlayOpacity as number) ?? 0.6;

  return (
    <section
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-ht-ink"
      style={
        backgroundImage
          ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
          : undefined
      }
    >
      {/* Dark overlay */}
      <div
        className="absolute inset-0 bg-ht-ink"
        style={{ opacity: backgroundImage ? overlayOpacity : 1 }}
      />

      {/* Gradient overlay — always present for drama */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/30 via-transparent to-[#06B6D4]/20 pointer-events-none" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#F1F0FF 1px, transparent 1px), linear-gradient(90deg, #F1F0FF 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#7C3AED]/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#06B6D4]/15 blur-[100px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 py-24 text-center">
        {/* Agency logo */}
        {agency.logo && (
          <div className="flex justify-center mb-8">
            <img
              src={agency.logo}
              alt={agency.name}
              className="h-12 sm:h-16 object-contain drop-shadow-lg"
            />
          </div>
        )}

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#7C3AED]/40 bg-[#7C3AED]/10 mb-6">
          <span className="w-2 h-2 rounded-full bg-[#06B6D4] animate-pulse" />
          <span className="text-xs font-body font-medium text-[#9B9BB8] uppercase tracking-widest">
            Adventure Awaits
          </span>
        </div>

        {/* Main heading */}
        <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] tracking-tight mb-6">
          <span className="block text-[#F1F0FF]">{heading}</span>
        </h1>

        {/* Gradient accent line */}
        <div className="flex justify-center mb-6">
          <div className="h-1 w-24 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#06B6D4]" />
        </div>

        {/* Subheading */}
        <p className="font-body text-lg sm:text-xl lg:text-2xl text-[#9B9BB8] max-w-2xl mx-auto leading-relaxed mb-10">
          {subheading}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={ctaHref}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-body font-semibold text-base text-white bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] shadow-[0_0_40px_rgba(124,58,237,0.35)] hover:shadow-[0_0_60px_rgba(124,58,237,0.55)] hover:scale-[1.03] transition-all duration-200 min-h-[52px]"
          >
            {ctaLabel}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href={secondaryCtaHref}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-body font-semibold text-base text-[#9B9BB8] border border-[#2A2A3A] hover:border-[#7C3AED] hover:text-[#F1F0FF] transition-all duration-200 min-h-[52px]"
          >
            {secondaryCtaLabel}
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 flex flex-col items-center gap-2 text-[#5C5C78]">
          <span className="text-xs font-body tracking-widest uppercase">Scroll to explore</span>
          <div className="w-px h-8 bg-gradient-to-b from-[#5C5C78] to-transparent" />
        </div>
      </div>
    </section>
  );
};
