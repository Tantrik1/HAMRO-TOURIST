import React from 'react';

interface HeroBannerProps {
  config: Record<string, unknown>;
  agency: { name: string; logo: string; tagline: string };
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ config, agency }) => {
  const heading = (config.heading as string) ?? agency.name;
  const subheading = (config.subheading as string) ?? agency.tagline;
  const ctaLabel = (config.ctaLabel as string) ?? 'Explore Tours';
  const ctaHref = (config.ctaHref as string) ?? '#featured-tours';
  const secondaryCtaLabel = (config.secondaryCtaLabel as string) ?? 'Discover Regions';
  const secondaryCtaHref = (config.secondaryCtaHref as string) ?? '#region-showcase';
  const backgroundImage = (config.backgroundImage as string) ?? null;
  const overlayOpacity = (config.overlayOpacity as number) ?? 0.35;

  return (
    <section
      className="relative min-h-[80vh] flex items-end overflow-hidden bg-[#0A0A0F]"
      style={
        backgroundImage
          ? {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : { background: 'linear-gradient(135deg, #0D9488 0%, #D97706 100%)' }
      }
    >
      {/* Subtle dark gradient at bottom for text legibility — editorial style */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top, rgba(10,10,15,${overlayOpacity + 0.45}) 0%, rgba(10,10,15,${overlayOpacity * 0.4}) 50%, rgba(10,10,15,${overlayOpacity * 0.15}) 100%)`,
        }}
      />

      {/* Top-left agency logo — small, unobtrusive */}
      {agency.logo && (
        <div className="absolute top-6 left-6 sm:top-8 sm:left-8 z-20">
          <img
            src={agency.logo}
            alt={agency.name}
            className="h-8 sm:h-10 object-contain brightness-0 invert opacity-90"
          />
        </div>
      )}

      {/* Content — pinned to bottom-left, editorial layout */}
      <div className="relative z-10 mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 lg:pb-24 pt-32">
        <div className="max-w-2xl">
          {/* Eyebrow label */}
          <p className="font-body text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-white/70 mb-4">
            {agency.name}
          </p>

          {/* Main heading — large, editorial serif-like display */}
          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-tight text-white mb-5">
            {heading}
          </h1>

          {/* Thin rule */}
          <div className="w-12 h-px bg-white/50 mb-5" />

          {/* Subheading */}
          <p className="font-body text-base sm:text-lg text-white/80 leading-relaxed mb-8 max-w-xl">
            {subheading}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-start gap-3">
            <a
              href={ctaHref}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#0A0A0F] font-body font-semibold text-sm rounded-full hover:bg-[#F4F4F8] transition-all duration-200 min-h-[44px] shadow-lg"
            >
              {ctaLabel}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href={secondaryCtaHref}
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/40 text-white font-body font-medium text-sm rounded-full hover:border-white/80 hover:bg-white/10 transition-all duration-200 min-h-[44px]"
            >
              {secondaryCtaLabel}
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator — bottom-right */}
      <div className="absolute bottom-8 right-8 z-10 hidden sm:flex flex-col items-center gap-2">
        <span className="font-body text-[10px] uppercase tracking-[0.2em] text-white/50 rotate-90 origin-center translate-y-6">
          Scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-white/50 to-transparent" />
      </div>
    </section>
  );
};
