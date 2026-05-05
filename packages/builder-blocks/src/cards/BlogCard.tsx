import React from 'react';
import { BlockAvatar } from '../primitives/Avatar';
import { cn, truncate } from '../utils';

export interface BlogCardData {
  id: string;
  slug: string;
  title: string;
  excerpt?: string | null;
  coverImageUrl?: string | null;
  category?: string;
  publishedAt?: string;
  readMinutes?: number;
  author?: {
    name: string;
    photo?: string;
  };
}

export interface BlogCardProps {
  post: BlogCardData;
  variant?: 'standard' | 'horizontal' | 'minimal' | 'featured';
  hrefPrefix?: string;
  className?: string;
}

export const BlogCard: React.FC<BlogCardProps> = ({
  post,
  variant = 'standard',
  hrefPrefix = '/blog',
  className,
}) => {
  const href = `${hrefPrefix}/${post.slug}`;

  if (variant === 'horizontal') {
    return (
      <a
        href={href}
        className={cn(
          'group grid grid-cols-[140px_1fr] sm:grid-cols-[200px_1fr] gap-4 bg-[var(--bb-surface,#111118)] border border-[var(--bb-border,#2A2A3A)] rounded-2xl overflow-hidden transition-all',
          'hover:border-[var(--bb-primary,#7C3AED)]/40',
          className,
        )}
      >
        <div className="relative bg-[var(--bb-surface-2,#1A1A24)]">
          {post.coverImageUrl ? (
            <img
              src={post.coverImageUrl}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[var(--bb-primary,#7C3AED)]/20 to-[var(--bb-secondary,#06B6D4)]/20" />
          )}
        </div>
        <div className="p-4 flex flex-col justify-between">
          <div>
            {post.category && (
              <span className="text-[10px] uppercase tracking-widest text-[var(--bb-primary,#7C3AED)] font-mono">
                {post.category}
              </span>
            )}
            <h3 className="mt-1 font-display font-bold text-base text-[var(--bb-text,#F1F0FF)] line-clamp-2 group-hover:text-[var(--bb-primary,#7C3AED)] transition-colors">
              {post.title}
            </h3>
            {post.excerpt && (
              <p className="mt-1 text-xs text-[var(--bb-text-soft,#9B9BB8)] line-clamp-2">
                {truncate(post.excerpt, 90)}
              </p>
            )}
          </div>
          <BlogMeta post={post} compact />
        </div>
      </a>
    );
  }

  if (variant === 'featured') {
    return (
      <a
        href={href}
        className={cn('group relative block aspect-[16/10] rounded-3xl overflow-hidden', className)}
      >
        {post.coverImageUrl ? (
          <img
            src={post.coverImageUrl}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--bb-primary,#7C3AED)] to-[var(--bb-secondary,#06B6D4)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 text-white">
          {post.category && (
            <span className="text-[10px] uppercase tracking-widest text-white/80 font-mono">
              {post.category}
            </span>
          )}
          <h3 className="mt-2 font-display font-bold text-2xl sm:text-3xl leading-tight">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="mt-2 text-sm text-white/80 line-clamp-2 max-w-xl">{post.excerpt}</p>
          )}
          <div className="mt-3 flex items-center gap-3 text-xs text-white/70">
            {post.author && (
              <span className="flex items-center gap-2">
                <BlockAvatar src={post.author.photo} name={post.author.name} size="xs" />
                {post.author.name}
              </span>
            )}
            {post.readMinutes && <span>· {post.readMinutes} min read</span>}
          </div>
        </div>
      </a>
    );
  }

  if (variant === 'minimal') {
    return (
      <a href={href} className={cn('group block py-4', className)}>
        <h3 className="font-display font-semibold text-lg text-[var(--bb-text,#F1F0FF)] group-hover:text-[var(--bb-primary,#7C3AED)] transition-colors">
          {post.title}
        </h3>
        <BlogMeta post={post} compact />
      </a>
    );
  }

  // standard
  return (
    <a
      href={href}
      className={cn(
        'group block bg-[var(--bb-surface,#111118)] border border-[var(--bb-border,#2A2A3A)] rounded-2xl overflow-hidden transition-all',
        'hover:border-[var(--bb-primary,#7C3AED)]/40',
        className,
      )}
    >
      <div className="relative aspect-[16/10] bg-[var(--bb-surface-2,#1A1A24)] overflow-hidden">
        {post.coverImageUrl ? (
          <img
            src={post.coverImageUrl}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[var(--bb-primary,#7C3AED)]/20 to-[var(--bb-secondary,#06B6D4)]/20" />
        )}
      </div>
      <div className="p-5">
        {post.category && (
          <span className="text-[10px] uppercase tracking-widest text-[var(--bb-primary,#7C3AED)] font-mono">
            {post.category}
          </span>
        )}
        <h3 className="mt-2 font-display font-bold text-lg text-[var(--bb-text,#F1F0FF)] line-clamp-2 group-hover:text-[var(--bb-primary,#7C3AED)] transition-colors">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="mt-2 text-sm text-[var(--bb-text-soft,#9B9BB8)] line-clamp-2">
            {truncate(post.excerpt, 110)}
          </p>
        )}
        <BlogMeta post={post} />
      </div>
    </a>
  );
};

const BlogMeta: React.FC<{ post: BlogCardData; compact?: boolean }> = ({ post, compact }) => (
  <div className={cn('flex items-center gap-2 text-xs text-[var(--bb-text-soft,#9B9BB8)]', compact ? 'mt-2' : 'mt-4')}>
    {post.author && (
      <span className="flex items-center gap-2">
        <BlockAvatar src={post.author.photo} name={post.author.name} size="xs" />
        {post.author.name}
      </span>
    )}
    {post.publishedAt && <span>· {new Date(post.publishedAt).toLocaleDateString()}</span>}
    {post.readMinutes && <span>· {post.readMinutes} min</span>}
  </div>
);
