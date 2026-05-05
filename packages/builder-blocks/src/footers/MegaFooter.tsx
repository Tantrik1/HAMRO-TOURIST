import React from 'react';
import { cn } from '../utils';
import type { BlockNavItem, BlockAgency } from '../types';

export interface MegaFooterProps {
  agency: BlockAgency;
  columns: { title: string; items: BlockNavItem[] }[];
  showNewsletter?: boolean;
  newsletterAction?: string;
  copyright?: string;
  className?: string;
}

const SOCIAL_ICONS: Record<string, string> = {
  facebook: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
  twitter: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  instagram: 'M12 2.2c3.2 0 3.584.012 4.85.07 1.366.062 2.633.336 3.608 1.311.975.975 1.249 2.242 1.311 3.608.058 1.266.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.336 2.633-1.311 3.608-.975.975-2.242 1.249-3.608 1.311-1.266.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.336-3.608-1.311-.975-.975-1.249-2.242-1.311-3.608C2.212 15.584 2.2 15.2 2.2 12s.012-3.584.07-4.85c.062-1.366.336-2.633 1.311-3.608C4.556 2.567 5.823 2.293 7.189 2.231 8.416 2.172 8.8 2.2 12 2.2zm0 1.8c-3.141 0-3.505.012-4.724.068-.937.043-1.813.183-2.404.774-.591.591-.731 1.467-.774 2.404-.056 1.219-.068 1.583-.068 4.724s.012 3.505.068 4.724c.043.937.183 1.813.774 2.404.591.591 1.467.731 2.404.774 1.219.056 1.583.068 4.724.068s3.505-.012 4.724-.068c.937-.043 1.813-.183 2.404-.774.591-.591.731-1.467.774-2.404.056-1.219.068-1.583.068-4.724s-.012-3.505-.068-4.724c-.043-.937-.183-1.813-.774-2.404-.591-.591-1.467-.731-2.404-.774C15.505 4.012 15.141 4 12 4zm0 3.053A4.947 4.947 0 1012 16.947 4.947 4.947 0 0012 7.053zm0 1.8a3.147 3.147 0 110 6.294 3.147 3.147 0 010-6.294zm5.338-2.587a1.154 1.154 0 100 2.308 1.154 1.154 0 000-2.308z',
  linkedin: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z',
  youtube: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
};

export const MegaFooter: React.FC<MegaFooterProps> = ({
  agency,
  columns,
  showNewsletter,
  newsletterAction = '#',
  copyright,
  className,
}) => {
  const year = new Date().getFullYear();
  const finalCopyright = copyright || `© ${year} ${agency.name}. All rights reserved.`;

  return (
    <footer className={cn('bg-[var(--bb-ink,#0A0A0F)] border-t border-[var(--bb-border,#2A2A3A)]', className)}>
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-12 gap-10">
          <div className="col-span-2 sm:col-span-3 lg:col-span-4">
            <a href="/" className="flex items-center gap-3">
              {agency.logo ? (
                <img src={agency.logo} alt={agency.name} className="h-9 object-contain" />
              ) : (
                <span className="font-display font-bold text-2xl text-[var(--bb-text,#F1F0FF)]">
                  {agency.name}
                </span>
              )}
            </a>
            {agency.tagline && (
              <p className="mt-4 text-sm text-[var(--bb-text-soft,#9B9BB8)] leading-relaxed max-w-sm">
                {agency.tagline}
              </p>
            )}

            {showNewsletter && (
              <form action={newsletterAction} method="post" className="mt-6">
                <label className="block text-xs uppercase tracking-widest text-[var(--bb-text-soft,#9B9BB8)] mb-2 font-mono">
                  Subscribe
                </label>
                <div className="flex gap-2">
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    className="flex-1 min-h-[44px] rounded-xl bg-[var(--bb-surface,#111118)] border border-[var(--bb-border,#2A2A3A)] px-4 text-sm text-[var(--bb-text,#F1F0FF)] focus:outline-none focus:border-[var(--bb-primary,#7C3AED)]"
                    required
                  />
                  <button
                    type="submit"
                    className="px-4 rounded-xl bg-[var(--bb-primary,#7C3AED)] text-white text-sm font-semibold hover:bg-[var(--bb-primary,#7C3AED)]/90 transition-all"
                  >
                    Join
                  </button>
                </div>
              </form>
            )}

            {agency.social && Object.keys(agency.social).length > 0 && (
              <div className="mt-6 flex items-center gap-2">
                {Object.entries(agency.social).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={platform}
                    className="w-9 h-9 rounded-full bg-[var(--bb-surface,#111118)] border border-[var(--bb-border,#2A2A3A)] flex items-center justify-center text-[var(--bb-text-soft,#9B9BB8)] hover:text-[var(--bb-primary,#7C3AED)] hover:border-[var(--bb-primary,#7C3AED)] transition-all"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d={SOCIAL_ICONS[platform.toLowerCase()] || SOCIAL_ICONS.facebook} />
                    </svg>
                  </a>
                ))}
              </div>
            )}
          </div>

          {columns.map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <h3 className="font-display font-semibold text-sm text-[var(--bb-text,#F1F0FF)] uppercase tracking-widest mb-4">
                {col.title}
              </h3>
              <ul className="space-y-2.5">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target={item.target}
                      className="text-sm text-[var(--bb-text-soft,#9B9BB8)] hover:text-[var(--bb-text,#F1F0FF)] transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {(agency.contactEmail || agency.contactPhone || agency.contactAddress) && (
            <div className="lg:col-span-2">
              <h3 className="font-display font-semibold text-sm text-[var(--bb-text,#F1F0FF)] uppercase tracking-widest mb-4">
                Contact
              </h3>
              <ul className="space-y-2.5 text-sm text-[var(--bb-text-soft,#9B9BB8)]">
                {agency.contactEmail && (
                  <li>
                    <a href={`mailto:${agency.contactEmail}`} className="hover:text-[var(--bb-text,#F1F0FF)] transition-colors">
                      {agency.contactEmail}
                    </a>
                  </li>
                )}
                {agency.contactPhone && (
                  <li>
                    <a href={`tel:${agency.contactPhone}`} className="hover:text-[var(--bb-text,#F1F0FF)] transition-colors">
                      {agency.contactPhone}
                    </a>
                  </li>
                )}
                {agency.contactAddress && <li className="leading-relaxed">{agency.contactAddress}</li>}
              </ul>
            </div>
          )}
        </div>

        <div className="mt-12 pt-8 border-t border-[var(--bb-border,#2A2A3A)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--bb-text-soft,#9B9BB8)]">
          <span>{finalCopyright}</span>
          <span className="font-mono">Powered by HAMRO-TOURIST</span>
        </div>
      </div>
    </footer>
  );
};
