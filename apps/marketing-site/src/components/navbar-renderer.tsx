import React from 'react';
import type { BlockAgency, BlockNavItem } from '@hamrotourist/builder-blocks';
import {
  ClassicNavbar,
  MegaNavbar,
  TransparentNavbar,
  MinimalNavbar,
  CenteredNavbar,
} from '@hamrotourist/builder-blocks';

interface NavbarRendererProps {
  variant: string;
  navLinks?: Array<{
    label: string;
    href: string;
    target?: string;
    children?: Array<{ label: string; href: string; target?: string; description?: string }>;
  }>;
  logoUrl?: string | null;
}

function mapNavItems(links: NavbarRendererProps['navLinks']): BlockNavItem[] {
  return (links || []).map((l) => ({
    label: l.label,
    href: l.href,
    target: l.target === '_blank' ? '_blank' : '_self',
    children: l.children?.map((c) => ({
      label: c.label,
      href: c.href,
      target: c.target === '_blank' ? '_blank' : '_self',
      description: c.description,
    })),
  }));
}

export const NavbarRenderer: React.FC<NavbarRendererProps> = ({ variant, navLinks, logoUrl }) => {
  const agency: BlockAgency = {
    name: 'Hamro Tourist',
    logo: logoUrl || undefined,
  };
  const items = mapNavItems(navLinks);

  switch (variant) {
    case 'classic':
      return <ClassicNavbar agency={agency} items={items} />;
    case 'mega':
      return <MegaNavbar agency={agency} items={items} />;
    case 'transparent':
      return <TransparentNavbar agency={agency} items={items} />;
    case 'minimal':
      return <MinimalNavbar agency={agency} items={items} />;
    case 'centered':
      return <CenteredNavbar agency={agency} items={items} />;
    default:
      return <ClassicNavbar agency={agency} items={items} />;
  }
};
