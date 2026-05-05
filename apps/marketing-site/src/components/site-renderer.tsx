import React from 'react';
import type { SiteData } from '@/lib/site-api';
import {
  HeroSection,
  Container,
  BlockSection,
  BlockGrid,
  BlockSectionHeading,
  BlockButton,
} from '@hamrotourist/builder-blocks';
import {
  TourCard, TrekCard, PackageCard, RegionCard, TestimonialCard,
  StatCard, FeatureCard, PricingCard, TeamCard, BlogCard,
  DestinationCard, ActivityCard,
} from '@hamrotourist/builder-blocks';
import { NavbarRenderer } from './navbar-renderer';
import { FooterRenderer } from './footer-renderer';

function buildCssVars(colors: Record<string, string>): React.CSSProperties {
  const defaults: Record<string, string> = {
    '--bb-primary': '#7C3AED',
    '--bb-secondary': '#06B6D4',
    '--bb-accent': '#F97316',
    '--bb-lime': '#84CC16',
    '--bb-ink': '#0A0A0F',
    '--bb-surface': '#111118',
    '--bb-surface2': '#1A1A24',
    '--bb-text': '#F1F0FF',
    '--bb-text-soft': '#9B9BB8',
    '--bb-text-faint': '#5C5C78',
    '--bb-border': '#2A2A3A',
    '--bb-muted': '#3D3D52',
    '--bb-danger': '#F43F5E',
  };
  const vars: Record<string, string> = { ...defaults, ...colors };
  return vars as React.CSSProperties;
}

function SectionRenderer({ section }: { section: SiteData['pages'][0]['sections'][0] }) {
  const { sectionType, config } = section;

  switch (sectionType) {
    case 'hero-banner':
      return (
        <HeroSection
          variant={config.variant || 'imageOverlay'}
          eyebrow={config.eyebrow}
          heading={config.heading || 'Welcome'}
          subheading={config.subheading}
          ctaPrimaryLabel={config.ctaPrimaryLabel}
          ctaPrimaryHref={config.ctaPrimaryHref}
          ctaSecondaryLabel={config.ctaSecondaryLabel}
          ctaSecondaryHref={config.ctaSecondaryHref}
          imageUrl={config.imageUrl}
          videoUrl={config.videoUrl}
        />
      );

    case 'featured-tours':
    case 'package-showcase':
      return (
        <BlockSection className="py-20">
          <Container>
            <BlockSectionHeading
              eyebrow={config.eyebrow}
              heading={config.heading || 'Featured'}
              subheading={config.subheading}
              align={config.align || 'left'}
            />
            <BlockGrid cols={(config.columns || 3) as 1|2|3|4|5|6} gap={'md'} className="mt-12">
              {(config.items || []).map((item: any, i: number) => (
                <PackageCard
                  key={i}
                  package={{
                    id: String(i),
                    slug: item.href?.replace(/^\//, '') || `item-${i}`,
                    title: item.title,
                    coverImageUrl: item.imageUrl,
                    minPrice: item.price,
                    maxPrice: item.price,
                    durationDays: item.duration,
                    badges: item.badge ? [item.badge] : undefined,
                  }}
                />
              ))}
            </BlockGrid>
            {config.ctaLabel && (
              <div className="mt-10 text-center">
                <BlockButton href={config.ctaHref || '#'} variant="primary">
                  {config.ctaLabel}
                </BlockButton>
              </div>
            )}
          </Container>
        </BlockSection>
      );

    case 'testimonials':
      return (
        <BlockSection className="py-20 bg-[var(--bb-surface2)]">
          <Container>
            <BlockSectionHeading
              heading={config.heading || 'What Travelers Say'}
              subheading={config.subheading}
              align="center"
            />
            <BlockGrid cols={Math.min(config.columns || 3, 3) as 1|2|3|4|5|6} gap={'md'} className="mt-12">
              {(config.items || []).map((item: any, i: number) => (
                <TestimonialCard
                  key={i}
                  testimonial={{
                    id: String(i),
                    content: item.quote,
                    authorName: item.authorName,
                    authorLocation: item.authorTitle,
                    authorImage: item.authorAvatarUrl,
                    rating: item.rating,
                  }}
                  variant={config.variant === 'featured' ? 'featured' : 'standard'}
                />
              ))}
            </BlockGrid>
          </Container>
        </BlockSection>
      );

    case 'stats':
      return (
        <BlockSection className="py-16">
          <Container>
            <BlockGrid cols={Math.min(config.columns || 4, 4) as 1|2|3|4|5|6} gap={'md'}>
              {(config.items || []).map((item: any, i: number) => (
                <StatCard
                  key={i}
                  stat={{ value: item.value, label: item.label, suffix: item.suffix }}
                  variant={config.variant || 'standard'}
                />
              ))}
            </BlockGrid>
          </Container>
        </BlockSection>
      );

    case 'cta-strip':
      return (
        <BlockSection className="py-16">
          <Container>
            <div className="relative overflow-hidden rounded-2xl bg-[var(--bb-primary)] px-8 py-12 text-center">
              {config.heading && (
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">{config.heading}</h2>
              )}
              {config.subheading && (
                <p className="text-white/80 mb-6 max-w-xl mx-auto">{config.subheading}</p>
              )}
              {config.ctaLabel && (
                <BlockButton href={config.ctaHref || '#'} variant="primary" className="bg-white text-[var(--bb-primary)]">
                  {config.ctaLabel}
                </BlockButton>
              )}
            </div>
          </Container>
        </BlockSection>
      );

    case 'custom-html':
      return (
        <BlockSection>
          <Container>
            <div dangerouslySetInnerHTML={{ __html: config.html || '' }} />
          </Container>
        </BlockSection>
      );

    case 'region-showcase':
    case 'activity-cards':
      return (
        <BlockSection className="py-20">
          <Container>
            <BlockSectionHeading
              eyebrow={config.eyebrow}
              heading={config.heading || 'Explore'}
              subheading={config.subheading}
              align={config.align || 'left'}
            />
            <BlockGrid cols={(config.columns || 3) as 1|2|3|4|5|6} gap={'md'} className="mt-12">
              {(config.items || []).map((item: any, i: number) => (
                <DestinationCard
                  key={i}
                  destination={{
                    id: String(i),
                    name: item.name,
                    slug: item.href?.replace(/^\//, '') || `dest-${i}`,
                    coverImageUrl: item.imageUrl,
                  }}
                />
              ))}
            </BlockGrid>
          </Container>
        </BlockSection>
      );

    case 'about-us':
    case 'why-choose-us':
      return (
        <BlockSection className="py-20">
          <Container>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <BlockSectionHeading
                  eyebrow={config.eyebrow}
                  heading={config.heading || 'About Us'}
                  subheading={config.subheading}
                  align="left"
                />
                {config.body && (
                  <p className="mt-6 text-[var(--bb-text-soft)] leading-relaxed">{config.body}</p>
                )}
                {config.ctaLabel && (
                  <BlockButton href={config.ctaHref || '#'} variant="primary" className="mt-8">
                    {config.ctaLabel}
                  </BlockButton>
                )}
              </div>
              {config.imageUrl && (
                <div className="rounded-2xl overflow-hidden">
                  <img src={config.imageUrl} alt="" className="w-full h-auto object-cover" />
                </div>
              )}
            </div>
          </Container>
        </BlockSection>
      );

    case 'faq':
      return (
        <BlockSection className="py-20">
          <Container>
            <BlockSectionHeading
              heading={config.heading || 'FAQ'}
              subheading={config.subheading}
              align="center"
            />
            <div className="mt-12 max-w-3xl mx-auto space-y-4">
              {(config.items || []).map((item: any, i: number) => (
                <details key={i} className="group rounded-xl border border-[var(--bb-border)] bg-[var(--bb-surface)] p-4">
                  <summary className="flex items-center justify-between cursor-pointer font-medium text-[var(--bb-text)]">
                    {item.question}
                    <span className="transition-transform group-open:rotate-180">+</span>
                  </summary>
                  <p className="mt-3 text-sm text-[var(--bb-text-soft)] leading-relaxed">{item.answer}</p>
                </details>
              ))}
            </div>
          </Container>
        </BlockSection>
      );

    case 'newsletter':
      return (
        <BlockSection className="py-20 bg-[var(--bb-surface2)]">
          <Container>
            <div className="max-w-xl mx-auto text-center">
              <BlockSectionHeading
                heading={config.heading || 'Subscribe'}
                subheading={config.subheading}
                align="center"
              />
              <form className="mt-8 flex gap-3">
                <input
                  type="email"
                  placeholder={config.placeholder || 'Your email'}
                  className="flex-1 px-4 py-3 rounded-lg bg-[var(--bb-ink)] border border-[var(--bb-border)] text-[var(--bb-text)] placeholder:text-[var(--bb-text-faint)] focus:border-[var(--bb-primary)] focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-[var(--bb-primary,#7C3AED)] to-[var(--bb-secondary,#06B6D4)] text-white text-sm font-medium hover:shadow-[0_0_40px_rgba(124,58,237,0.35)] transition-all"
                >
                  {config.ctaLabel || 'Subscribe'}
                </button>
              </form>
              {config.legalText && (
                <p className="mt-3 text-xs text-[var(--bb-text-faint)]">{config.legalText}</p>
              )}
            </div>
          </Container>
        </BlockSection>
      );

    case 'contact-form':
      return (
        <BlockSection className="py-20">
          <Container>
            <div className="max-w-xl mx-auto">
              <BlockSectionHeading
                heading={config.heading || 'Contact Us'}
                subheading={config.subheading}
                align="center"
              />
              <form className="mt-10 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input type="text" placeholder="Name" className="w-full px-4 py-3 rounded-lg bg-[var(--bb-ink)] border border-[var(--bb-border)] text-[var(--bb-text)] placeholder:text-[var(--bb-text-faint)] focus:border-[var(--bb-primary)] focus:outline-none" />
                  <input type="email" placeholder="Email" className="w-full px-4 py-3 rounded-lg bg-[var(--bb-ink)] border border-[var(--bb-border)] text-[var(--bb-text)] placeholder:text-[var(--bb-text-faint)] focus:border-[var(--bb-primary)] focus:outline-none" />
                </div>
                <textarea placeholder="Message" rows={4} className="w-full px-4 py-3 rounded-lg bg-[var(--bb-ink)] border border-[var(--bb-border)] text-[var(--bb-text)] placeholder:text-[var(--bb-text-faint)] focus:border-[var(--bb-primary)] focus:outline-none resize-y" />
                <button
                  type="submit"
                  className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-[var(--bb-primary,#7C3AED)] to-[var(--bb-secondary,#06B6D4)] text-white text-sm font-medium hover:shadow-[0_0_40px_rgba(124,58,237,0.35)] transition-all"
                >
                  {config.ctaLabel || 'Send Message'}
                </button>
              </form>
            </div>
          </Container>
        </BlockSection>
      );

    case 'team':
      return (
        <BlockSection className="py-20">
          <Container>
            <BlockSectionHeading
              heading={config.heading || 'Our Team'}
              subheading={config.subheading}
              align="center"
            />
            <BlockGrid cols={(config.columns || 4) as 1|2|3|4|5|6} gap={'md'} className="mt-12">
              {(config.members || []).map((member: any, i: number) => (
                <TeamCard
                  key={i}
                  member={{
                    name: member.name,
                    role: member.role,
                    photo: member.avatarUrl,
                    social: (member.socials || []).map((s: any) => ({ platform: s.platform || 'website', url: s.url || s.href })),
                  }}
                />
              ))}
            </BlockGrid>
          </Container>
        </BlockSection>
      );

    case 'pricing':
      return (
        <BlockSection className="py-20">
          <Container>
            <BlockSectionHeading
              heading={config.heading || 'Pricing'}
              subheading={config.subheading}
              align="center"
            />
            <BlockGrid cols={Math.min(config.columns || 3, 3) as 1|2|3|4|5|6} gap={'md'} className="mt-12 max-w-5xl mx-auto">
              {(config.tiers || []).map((tier: any, i: number) => (
                <PricingCard
                  key={i}
                  tier={{
                    name: tier.name,
                    price: tier.price,
                    period: tier.period,
                    features: tier.features,
                    ctaLabel: tier.ctaLabel,
                    ctaHref: tier.ctaHref,
                    highlight: tier.highlighted || false,
                  }}
                />
              ))}
            </BlockGrid>
          </Container>
        </BlockSection>
      );

    case 'blog-grid':
      return (
        <BlockSection className="py-20">
          <Container>
            <BlockSectionHeading
              heading={config.heading || 'Latest Posts'}
              subheading={config.subheading}
              align="left"
            />
            <BlockGrid cols={(config.columns || 3) as 1|2|3|4|5|6} gap={'md'} className="mt-12">
              {(config.items || []).map((item: any, i: number) => (
                <BlogCard
                  key={i}
                  post={{
                    id: String(i),
                    slug: item.href?.replace(/^\/blog\//, '') || `post-${i}`,
                    title: item.title,
                    excerpt: item.excerpt,
                    coverImageUrl: item.imageUrl,
                    category: item.category,
                    publishedAt: item.date,
                    author: item.authorName ? {
                      name: item.authorName,
                      photo: item.authorAvatarUrl,
                    } : undefined,
                  }}
                />
              ))}
            </BlockGrid>
          </Container>
        </BlockSection>
      );

    default:
      return (
        <BlockSection className="py-12">
          <Container>
            <div className="rounded-xl border border-dashed border-[var(--bb-border)] p-8 text-center">
              <span className="text-xs font-medium uppercase tracking-widest text-[var(--bb-primary)]">
                {sectionType}
              </span>
              <h3 className="mt-2 text-lg font-semibold text-[var(--bb-text)]">{section.label}</h3>
              <p className="mt-1 text-sm text-[var(--bb-text-faint)]">
                This section type does not have a renderer yet.
              </p>
            </div>
          </Container>
        </BlockSection>
      );
  }
}

export interface SiteRendererProps {
  data: SiteData;
  pageSlug?: string;
  preview?: boolean;
}

export const SiteRenderer: React.FC<SiteRendererProps> = ({ data, pageSlug, preview }) => {
  const { settings, pages, theme } = data;

  // Find the target page
  const targetPage = pageSlug
    ? pages.find((p) => p.slug === pageSlug && (preview || p.status === 'published'))
    : pages.find((p) => p.isHome && (preview || p.status === 'published'));

  if (!targetPage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bb-ink)] text-[var(--bb-text)]">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Page not found</h1>
          <p className="text-[var(--bb-text-soft)]">The page you are looking for does not exist.</p>
        </div>
      </div>
    );
  }

  const cssVars = buildCssVars(settings.colors);
  const navVariant = targetPage.navbarVariant || settings.navbarVariant || theme?.defaultNavbarVariant || 'classic';
  const footerVariant = targetPage.footerVariant || settings.footerVariant || theme?.defaultFooterVariant || 'mega';

  const sortedSections = targetPage.sections
    .filter((s) => preview || s.enabled)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div style={cssVars} className="min-h-screen bg-[var(--bb-ink)] text-[var(--bb-text)] font-sans">
      {preview && (
        <div className="sticky top-0 z-50 bg-[var(--bb-accent)] text-white text-xs font-semibold text-center py-1.5 uppercase tracking-wider">
          Preview Mode — Draft Content
        </div>
      )}

      <NavbarRenderer
        variant={navVariant}
        navLinks={settings.navLinks}
        logoUrl={settings.logoUrl}
      />

      <main>
        {sortedSections.map((section) => (
          <SectionRenderer key={section.id} section={section} />
        ))}
      </main>

      <FooterRenderer
        variant={footerVariant}
        footerColumns={settings.footerColumns}
        socialLinks={settings.socialLinks}
        navLinks={settings.navLinks}
      />
    </div>
  );
};
