import React from 'react';
import { BlockButton } from '../primitives/Button';
import { Container } from '../primitives/Container';
import { cn, safeStr } from '../utils';

export type HeroVariant = 'split' | 'centered' | 'imageOverlay' | 'video' | 'gradient';

export interface HeroSectionProps {
  variant?: HeroVariant;
  eyebrow?: string;
  heading: string;
  subheading?: string;
  ctaPrimaryLabel?: string;
  ctaPrimaryHref?: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryHref?: string;
  imageUrl?: string;
  videoUrl?: string;
  className?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  variant = 'imageOverlay',
  eyebrow,
  heading,
  subheading,
  ctaPrimaryLabel,
  ctaPrimaryHref,
  ctaSecondaryLabel,
  ctaSecondaryHref,
  imageUrl,
  videoUrl,
  className,
}) => {
  if (variant === 'split') {
    return (
      <section className={cn('relative overflow-hidden bg-[var(--bb-ink,#0A0A0F)]', className)}>
        <Container>
          <div className="grid lg:grid-cols-2 gap-10 items-center py-16 lg:py-24">
            <div>
              {eyebrow && (
                <span className="inline-block text-xs font-medium uppercase tracking-widest text-[var(--bb-primary,#7C3AED)] mb-4 font-mono">
                  {eyebrow}
                </span>
              )}
              <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-[var(--bb-text,#F1F0FF)] leading-tight">
                {heading}
              </h1>
              {subheading && (
                <p className="mt-5 text-lg text-[var(--bb-text-soft,#9B9BB8)] leading-relaxed max-w-xl">
                  {subheading}
                </p>
              )}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                {ctaPrimaryHref && (
                  <BlockButton href={ctaPrimaryHref} size="lg">
                    {safeStr(ctaPrimaryLabel, 'Get Started')}
                  </BlockButton>
                )}
                {ctaSecondaryHref && (
                  <BlockButton href={ctaSecondaryHref} variant="outline" size="lg">
                    {safeStr(ctaSecondaryLabel, 'Learn More')}
                  </BlockButton>
                )}
              </div>
            </div>
            {imageUrl && (
              <div className="relative aspect-[4/3] lg:aspect-square rounded-3xl overflow-hidden">
                <img src={imageUrl} alt="" className="absolute inset-0 w-full h-full object-cover" />
              </div>
            )}
          </div>
        </Container>
      </section>
    );
  }

  if (variant === 'centered') {
    return (
      <section className={cn('relative overflow-hidden bg-[var(--bb-ink,#0A0A0F)]', className)}>
        <Container>
          <div className="text-center py-20 lg:py-28">
            {eyebrow && (
              <span className="inline-block text-xs font-medium uppercase tracking-widest text-[var(--bb-primary,#7C3AED)] mb-4 font-mono">
                {eyebrow}
              </span>
            )}
            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-[var(--bb-text,#F1F0FF)] leading-tight max-w-4xl mx-auto">
              {heading}
            </h1>
            {subheading && (
              <p className="mt-5 text-lg text-[var(--bb-text-soft,#9B9BB8)] leading-relaxed max-w-2xl mx-auto">
                {subheading}
              </p>
            )}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {ctaPrimaryHref && (
                <BlockButton href={ctaPrimaryHref} size="lg">
                  {safeStr(ctaPrimaryLabel, 'Get Started')}
                </BlockButton>
              )}
              {ctaSecondaryHref && (
                <BlockButton href={ctaSecondaryHref} variant="outline" size="lg">
                  {safeStr(ctaSecondaryLabel, 'Learn More')}
                </BlockButton>
              )}
            </div>
          </div>
        </Container>
      </section>
    );
  }

  if (variant === 'gradient') {
    return (
      <section className={cn('relative overflow-hidden', className)}>
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--bb-primary,#7C3AED)] via-[var(--bb-secondary,#06B6D4)] to-[var(--bb-accent,#F97316)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.2),transparent_70%)]" />
        <Container className="relative z-10">
          <div className="text-center py-24 lg:py-32 text-white">
            {eyebrow && (
              <span className="inline-block text-xs font-medium uppercase tracking-widest text-white/90 mb-4 font-mono">
                {eyebrow}
              </span>
            )}
            <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl leading-tight max-w-4xl mx-auto drop-shadow-2xl">
              {heading}
            </h1>
            {subheading && (
              <p className="mt-5 text-lg lg:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
                {subheading}
              </p>
            )}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              {ctaPrimaryHref && (
                <BlockButton href={ctaPrimaryHref} size="lg" variant="secondary">
                  {safeStr(ctaPrimaryLabel, 'Start Exploring')}
                </BlockButton>
              )}
              {ctaSecondaryHref && (
                <BlockButton href={ctaSecondaryHref} variant="ghost" size="lg" className="!text-white border border-white/30">
                  {safeStr(ctaSecondaryLabel, 'Watch Video')}
                </BlockButton>
              )}
            </div>
          </div>
        </Container>
      </section>
    );
  }

  if (variant === 'video' && videoUrl) {
    return (
      <section className={cn('relative overflow-hidden h-[80vh] min-h-[600px] flex items-center', className)}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src={videoUrl}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/30" />
        <Container className="relative z-10">
          <div className="text-center py-12 text-white">
            {eyebrow && (
              <span className="inline-block text-xs font-medium uppercase tracking-widest text-white/80 mb-4 font-mono">
                {eyebrow}
              </span>
            )}
            <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl leading-tight max-w-4xl mx-auto drop-shadow-2xl">
              {heading}
            </h1>
            {subheading && (
              <p className="mt-5 text-lg text-white/90 leading-relaxed max-w-2xl mx-auto">
                {subheading}
              </p>
            )}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {ctaPrimaryHref && (
                <BlockButton href={ctaPrimaryHref} size="lg">
                  {safeStr(ctaPrimaryLabel, 'Begin Journey')}
                </BlockButton>
              )}
            </div>
          </div>
        </Container>
      </section>
    );
  }

  // imageOverlay (default)
  return (
    <section className={cn('relative overflow-hidden h-[70vh] min-h-[560px] flex items-center', className)}>
      {imageUrl ? (
        <img src={imageUrl} alt="" className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--bb-primary,#7C3AED)]/40 to-[var(--bb-secondary,#06B6D4)]/40" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/30" />
      <Container className="relative z-10">
        <div className="py-12 text-white max-w-3xl">
          {eyebrow && (
            <span className="inline-block text-xs font-medium uppercase tracking-widest text-white/80 mb-4 font-mono">
              {eyebrow}
            </span>
          )}
          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-7xl leading-tight drop-shadow-2xl">
            {heading}
          </h1>
          {subheading && (
            <p className="mt-5 text-base sm:text-lg text-white/90 leading-relaxed max-w-2xl">
              {subheading}
            </p>
          )}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {ctaPrimaryHref && (
              <BlockButton href={ctaPrimaryHref} size="lg">
                {safeStr(ctaPrimaryLabel, 'Explore Now')}
              </BlockButton>
            )}
            {ctaSecondaryHref && (
              <BlockButton href={ctaSecondaryHref} variant="outline" size="lg" className="!text-white border-white/30 hover:!border-white">
                {safeStr(ctaSecondaryLabel, 'Learn More')}
              </BlockButton>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};
