import React from 'react';
import type { BlockAgency, BlockNavItem } from '@hamrotourist/builder-blocks';
import {
  MegaFooter,
  MinimalFooter,
  CenteredFooter,
  NewsletterFooter,
  SocialFooter,
} from '@hamrotourist/builder-blocks';

interface FooterRendererProps {
  variant: string;
  footerColumns?: Array<{ title: string; items: Array<{ label: string; href: string; target?: string }> }>;
  socialLinks?: Record<string, string>;
  navLinks?: Array<{ label: string; href: string; target?: string }>;
}

function mapNavItems(items: Array<{ label: string; href: string; target?: string }>): BlockNavItem[] {
  return items.map((i) => ({
    label: i.label,
    href: i.href,
    target: i.target === '_blank' ? '_blank' : '_self',
  }));
}

export const FooterRenderer: React.FC<FooterRendererProps> = ({ variant, footerColumns, socialLinks }) => {
  const agency: BlockAgency = {
    name: 'Hamro Tourist',
    social: socialLinks || {},
  };

  const columns = (footerColumns || []).map((c) => ({
    title: c.title,
    items: mapNavItems(c.items),
  }));

  const allItems = columns.flatMap((c) => c.items);

  switch (variant) {
    case 'mega':
      return <MegaFooter agency={agency} columns={columns} />;
    case 'minimal':
      return <MinimalFooter agency={agency} items={allItems} />;
    case 'centered':
      return <CenteredFooter agency={agency} items={allItems} />;
    case 'newsletter':
      return <NewsletterFooter agency={agency} items={allItems} />;
    case 'social':
      return <SocialFooter agency={agency} items={allItems} />;
    default:
      return <MegaFooter agency={agency} columns={columns} />;
  }
};
