'use client';

import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Globe, Palette, Layout, MousePointerClick,
  Globe2, Map, MapPin, Compass, Boxes,
  Users, Contact,
  BarChart3, TrendingUp, PieChart,
  Settings, ChevronRight, ArrowLeft,
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  Icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

interface ModuleNav {
  id: string;
  label: string;
  iconBg: string;
  iconColor: string;
  Icon: React.ComponentType<{ className?: string }>;
  items: NavItem[];
  prefix: string[];
}

const modules: ModuleNav[] = [
  {
    id: 'website',
    label: 'Website Management',
    iconBg: 'bg-ht-cyan/15',
    iconColor: 'text-ht-cyan',
    Icon: Globe,
    prefix: ['/dashboard/website', '/dashboard/domains'],
    items: [
      { label: 'Website Builder', href: '/dashboard/website', Icon: Layout },
      { label: 'Custom Domains', href: '/dashboard/domains', Icon: Globe2 },
      { label: 'Theme Chooser', href: '#', Icon: Palette, badge: 'Soon' },
      { label: 'Drag & Drop', href: '#', Icon: MousePointerClick, badge: 'Soon' },
    ],
  },
  {
    id: 'treks',
    label: 'Treks / Tours Management',
    iconBg: 'bg-ht-violet/15',
    iconColor: 'text-ht-violet',
    Icon: Map,
    prefix: ['/dashboard/countries', '/dashboard/regions', '/dashboard/destinations', '/dashboard/activities', '/dashboard/products', '/dashboard/tours', '/dashboard/packages', '/dashboard/treks'],
    items: [
      { label: 'Countries', href: '/dashboard/countries', Icon: Globe2 },
      { label: 'Regions', href: '/dashboard/regions', Icon: Map },
      { label: 'Destinations', href: '/dashboard/destinations', Icon: MapPin },
      { label: 'Activities', href: '/dashboard/activities', Icon: Compass },
      { label: 'Products', href: '/dashboard/products', Icon: Boxes },
      { label: 'Tours', href: '/dashboard/tours', Icon: MapPin },
      { label: 'Packages', href: '/dashboard/packages', Icon: Boxes },
    ],
  },
  {
    id: 'customers',
    label: 'Customer Management',
    iconBg: 'bg-[#F97316]/15',
    iconColor: 'text-[#F97316]',
    Icon: Users,
    prefix: ['/dashboard/crm'],
    items: [
      { label: 'Leads', href: '/dashboard/crm', Icon: Contact },
      { label: 'Customers', href: '/dashboard/crm', Icon: Users },
    ],
  },
  {
    id: 'analytics',
    label: 'Analytics',
    iconBg: 'bg-[#84CC16]/15',
    iconColor: 'text-[#84CC16]',
    Icon: BarChart3,
    prefix: ['/dashboard/analytics'],
    items: [
      { label: 'Website', href: '/dashboard/analytics', Icon: TrendingUp },
      { label: 'Sales', href: '/dashboard/analytics', Icon: BarChart3 },
      { label: 'Finance', href: '/dashboard/analytics', Icon: PieChart },
    ],
  },
  {
    id: 'settings',
    label: 'Settings',
    iconBg: 'bg-ht-soft/10',
    iconColor: 'text-ht-soft',
    Icon: Settings,
    prefix: ['/dashboard/settings'],
    items: [
      { label: 'General', href: '/dashboard/settings', Icon: Settings },
    ],
  },
];

function findModule(pathname: string): ModuleNav | null {
  for (const m of modules) {
    for (const p of m.prefix) {
      if (pathname === p || pathname.startsWith(p + '/')) return m;
    }
  }
  return null;
}

interface ModuleNavProps {
  collapsed?: boolean;
}

export function ModuleNavContent({ collapsed = false }: ModuleNavProps) {
  const pathname = usePathname();
  const activeModule = findModule(pathname);

  if (!activeModule) return null;

  const ModuleIcon = activeModule.Icon;

  return (
    <div className="flex flex-col h-full">
      {/* Module header */}
      <div className={cn(
        'shrink-0 border-b border-ht-border',
        collapsed ? 'px-2 py-3 flex justify-center' : 'px-4 py-3'
      )}>
        {!collapsed && (
          <div className="space-y-2">
            <a
              href="/dashboard"
              className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-ht-text-faint hover:text-ht-text transition-colors"
            >
              <ArrowLeft className="w-3 h-3" />
              Dashboard
            </a>
            <div className="flex items-center gap-2.5">
              <div className={cn('w-7 h-7 rounded-lg flex items-center justify-center', activeModule.iconBg)}>
                <ModuleIcon className={cn('w-4 h-4', activeModule.iconColor)} />
              </div>
              <span className="font-display font-semibold text-sm text-ht-text truncate">
                {activeModule.label}
              </span>
            </div>
          </div>
        )}
        {collapsed && (
          <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center', activeModule.iconBg)}>
            <ModuleIcon className={cn('w-4 h-4', activeModule.iconColor)} />
          </div>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-3 px-2 overflow-y-auto">
        <div className="space-y-0.5">
          {activeModule.items.map(({ label, href, Icon, badge }) => {
            const isActive = pathname === href || (href !== '/dashboard' && pathname.startsWith(href));
            const isComingSoon = badge === 'Soon';
            return (
              <a
                key={label + href}
                href={isComingSoon ? '#' : href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg font-body text-sm transition-all duration-200 min-h-[40px] group relative',
                  collapsed ? 'justify-center' : '',
                  isComingSoon
                    ? 'opacity-40 cursor-not-allowed text-ht-soft'
                    : isActive
                    ? 'bg-ht-violet/15 text-ht-violet border border-ht-violet/30'
                    : 'text-ht-soft hover:text-ht-text hover:bg-ht-surface2 border border-transparent',
                )}
                title={collapsed ? label : undefined}
                onClick={isComingSoon ? (e) => e.preventDefault() : undefined}
              >
                <Icon className={cn('w-5 h-5 shrink-0', isActive && !isComingSoon && 'text-ht-violet')} />
                {!collapsed && (
                  <>
                    <span className="truncate flex-1">{label}</span>
                    {badge && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-ht-violet/20 text-ht-violet">
                        {badge}
                      </span>
                    )}
                    {isActive && !isComingSoon && (
                      <ChevronRight className="w-4 h-4 text-ht-violet/50 shrink-0" />
                    )}
                  </>
                )}
              </a>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

export function getModuleLabel(pathname: string): string {
  const m = findModule(pathname);
  return m?.label || 'Dashboard';
}

export { findModule };
