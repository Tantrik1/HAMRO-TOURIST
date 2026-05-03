'use client';

import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard, Globe2, Map, MapPin, Compass,
  Boxes, Eye, Settings, LogOut, Mountain, ExternalLink, Users,
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', href: '/dashboard', Icon: LayoutDashboard },
  { label: 'Countries', href: '/dashboard/countries', Icon: Globe2 },
  { label: 'Regions', href: '/dashboard/regions', Icon: Map },
  { label: 'Destinations', href: '/dashboard/destinations', Icon: MapPin },
  { label: 'Activities', href: '/dashboard/activities', Icon: Compass },
  { label: 'Product Builder', href: '/dashboard/products', Icon: Boxes },
  { label: 'Leads & CRM', href: '/dashboard/crm', Icon: Users },
  { label: 'Website Preview', href: '/dashboard/website', Icon: Eye, highlight: true },
  { label: 'Settings', href: '/dashboard/settings', Icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const tenantSlug = user?.tenantSlug;
  const liveUrl = tenantSlug ? `https://${tenantSlug}.hamrotourist.com` : null;

  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-64 -translate-x-full lg:translate-x-0 transition-transform duration-300 bg-ht-surface border-r border-ht-border flex flex-col">
      <div className="h-16 flex items-center gap-2 px-5 border-b border-ht-border shrink-0">
        <div className="w-8 h-8 rounded-lg bg-grad-primary flex items-center justify-center shadow-glow-violet">
          <Mountain className="w-4 h-4 text-white" />
        </div>
        <a href="/dashboard" className="font-display font-bold text-lg bg-grad-primary bg-clip-text text-transparent">
          Hamro Tourist
        </a>
      </div>

      {tenantSlug && liveUrl && (
        <div className="px-4 py-3 border-b border-ht-border bg-ht-surface2/40">
          <div className="text-xs font-mono text-ht-text-faint uppercase">Your site</div>
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 flex items-center gap-1.5 text-xs text-ht-cyan hover:text-ht-text break-all"
          >
            {tenantSlug}.hamrotourist.com
            <ExternalLink className="w-3 h-3 shrink-0" />
          </a>
        </div>
      )}

      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map(({ label, href, Icon, highlight }) => {
          const isActive = pathname === href || (href !== '/dashboard' && pathname.startsWith(href));
          return (
            <a
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl font-body text-sm transition-all duration-200 min-h-[44px]',
                isActive
                  ? 'bg-ht-violet/15 text-ht-violet border border-ht-violet/30'
                  : highlight
                  ? 'text-ht-cyan hover:bg-ht-cyan/10 border border-ht-cyan/20 hover:border-ht-cyan/40'
                  : 'text-ht-soft hover:text-ht-text hover:bg-ht-surface2',
              )}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span className="truncate">{label}</span>
            </a>
          );
        })}
      </nav>

      <div className="p-4 border-t border-ht-border shrink-0">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-full bg-grad-primary flex items-center justify-center text-white font-display font-bold text-sm shrink-0">
            {user?.firstName?.charAt(0)?.toUpperCase() || '?'}
          </div>
          <div className="min-w-0">
            <p className="font-body text-sm text-ht-text truncate">{user?.firstName} {user?.lastName}</p>
            <p className="font-body text-xs text-ht-soft truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl font-body text-sm text-ht-soft hover:text-ht-rose hover:bg-ht-rose/10 transition-all duration-200 min-h-[44px]"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
