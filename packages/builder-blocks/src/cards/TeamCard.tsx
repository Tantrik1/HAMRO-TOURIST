import React from 'react';
import { BlockAvatar } from '../primitives/Avatar';
import { cn } from '../utils';
import type { BlockTeamMember } from '../types';

export interface TeamCardProps {
  member: BlockTeamMember;
  variant?: 'standard' | 'overlay' | 'minimal';
  className?: string;
}

export const TeamCard: React.FC<TeamCardProps> = ({
  member,
  variant = 'standard',
  className,
}) => {
  if (variant === 'overlay') {
    return (
      <figure className={cn('group relative aspect-[3/4] rounded-3xl overflow-hidden', className)}>
        {member.photo ? (
          <img
            src={member.photo}
            alt={member.name}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--bb-primary,#7C3AED)]/30 to-[var(--bb-secondary,#06B6D4)]/30" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
        <figcaption className="absolute inset-x-0 bottom-0 p-5 text-white">
          <h3 className="font-display font-bold text-xl">{member.name}</h3>
          {member.role && <p className="text-sm text-white/80">{member.role}</p>}
          {member.social && member.social.length > 0 && (
            <div className="mt-3 flex items-center gap-2">
              {member.social.map((s, i) => (
                <a
                  key={i}
                  href={s.url}
                  className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SocialIcon platform={s.platform} />
                </a>
              ))}
            </div>
          )}
        </figcaption>
      </figure>
    );
  }

  if (variant === 'minimal') {
    return (
      <div className={cn('text-center', className)}>
        <BlockAvatar src={member.photo} name={member.name} size="xl" className="mx-auto" />
        <h3 className="mt-4 font-display font-semibold text-base text-[var(--bb-text,#F1F0FF)]">
          {member.name}
        </h3>
        {member.role && (
          <p className="text-sm text-[var(--bb-text-soft,#9B9BB8)]">{member.role}</p>
        )}
      </div>
    );
  }

  // standard
  return (
    <div
      className={cn(
        'p-6 rounded-2xl bg-[var(--bb-surface,#111118)] border border-[var(--bb-border,#2A2A3A)] text-center transition-all hover:border-[var(--bb-primary,#7C3AED)]/40',
        className,
      )}
    >
      <BlockAvatar src={member.photo} name={member.name} size="xl" ring className="mx-auto" />
      <h3 className="mt-4 font-display font-bold text-lg text-[var(--bb-text,#F1F0FF)]">
        {member.name}
      </h3>
      {member.role && (
        <p className="text-sm text-[var(--bb-primary,#7C3AED)] font-medium">{member.role}</p>
      )}
      {member.bio && (
        <p className="mt-3 text-sm text-[var(--bb-text-soft,#9B9BB8)] leading-relaxed">
          {member.bio}
        </p>
      )}
      {member.social && member.social.length > 0 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          {member.social.map((s, i) => (
            <a
              key={i}
              href={s.url}
              className="w-8 h-8 rounded-full bg-[var(--bb-ink,#0A0A0F)] border border-[var(--bb-border,#2A2A3A)] flex items-center justify-center text-[var(--bb-text-soft,#9B9BB8)] hover:text-[var(--bb-primary,#7C3AED)] hover:border-[var(--bb-primary,#7C3AED)] transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SocialIcon platform={s.platform} />
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

const SocialIcon: React.FC<{ platform: string }> = ({ platform }) => {
  const iconMap: Record<string, React.ReactNode> = {
    twitter: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    facebook: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9.19 8.688h3.138V7.226c0-.646.016-1.643.485-2.26.496-.655 1.176-1.102 2.345-1.102 1.905 0 2.707.272 2.707.272l-.377 2.17s-.63-.182-1.218-.182c-.588 0-1.114.21-1.114.799v1.765h3.272l-.228 2.12H15.61V20h-3.308v-9.193H9.19z" />
      </svg>
    ),
    instagram: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.2c3.2 0 3.584.012 4.85.07 1.366.062 2.633.336 3.608 1.311.975.975 1.249 2.242 1.311 3.608.058 1.266.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.336 2.633-1.311 3.608-.975.975-2.242 1.249-3.608 1.311-1.266.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.336-3.608-1.311-.975-.975-1.249-2.242-1.311-3.608C2.212 15.584 2.2 15.2 2.2 12s.012-3.584.07-4.85c.062-1.366.336-2.633 1.311-3.608C4.556 2.567 5.823 2.293 7.189 2.231 8.416 2.172 8.8 2.2 12 2.2zm0 1.8c-3.141 0-3.505.012-4.724.068-.937.043-1.813.183-2.404.774-.591.591-.731 1.467-.774 2.404-.056 1.219-.068 1.583-.068 4.724s.012 3.505.068 4.724c.043.937.183 1.813.774 2.404.591.591 1.467.731 2.404.774 1.219.056 1.583.068 4.724.068s3.505-.012 4.724-.068c.937-.043 1.813-.183 2.404-.774.591-.591.731-1.467.774-2.404.056-1.219.068-1.583.068-4.724s-.012-3.505-.068-4.724c-.043-.937-.183-1.813-.774-2.404-.591-.591-1.467-.731-2.404-.774C15.505 4.012 15.141 4 12 4zm0 3.053A4.947 4.947 0 1012 16.947 4.947 4.947 0 0012 7.053zm0 1.8a3.147 3.147 0 110 6.294 3.147 3.147 0 010-6.294zm5.338-2.587a1.154 1.154 0 100 2.308 1.154 1.154 0 000-2.308z" />
      </svg>
    ),
    linkedin: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
      </svg>
    ),
  };
  return (iconMap[platform.toLowerCase()] as React.ReactElement) || (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
    </svg>
  );
};
