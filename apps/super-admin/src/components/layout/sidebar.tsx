'use client';

import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard, Building2, Users, CreditCard, CalendarDays, Mail, FileText, Settings, LogOut, Shield, ChevronRight,
} from 'lucide-react';

interface SidebarProps {
  collapsed?: boolean;
  isMobile?: boolean;
}

interface NavSection {
  title?: string;
  items: NavItem[];
}

interface NavItem {
  label: string;
  href: string;
  Icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const navSections: NavSection[] = [
  {
    items: [
      { label: 'Overview', href: '/dashboard', Icon: LayoutDashboard },
    ],
  },
  {
    title: 'Platform',
    items: [
      { label: 'Tenants', href: '/dashboard/tenants', Icon: Building2 },
      { label: 'Users', href: '/dashboard/users', Icon: Users },
      { label: 'Subscriptions', href: '/dashboard/subscriptions', Icon: CreditCard, badge: 'Billing' },
      { label: 'Bookings', href: '/dashboard/bookings', Icon: CalendarDays },
    ],
  },
  {
    title: 'Communications',
    items: [
      { label: 'Newsletter', href: '/dashboard/newsletter', Icon: Mail },
      { label: 'Audit Logs', href: '/dashboard/audit-logs', Icon: FileText },
    ],
  },
  {
    title: 'System',
    items: [
      { label: 'Settings', href: '/dashboard/settings', Icon: Settings },
    ],
  },
];

export function Sidebar({ collapsed = false }: SidebarProps) {
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  return (
    <div className="h-full flex flex-col bg-ht-surface">
      <div className={cn(
        'h-14 lg:h-16 flex items-center border-b border-ht-border shrink-0',
        collapsed ? 'justify-center px-2' : 'px-5 gap-3'
      )}>
        <div className="w-8 h-8 rounded-lg bg-grad-warm flex items-center justify-center shadow-glow-coral shrink-0">
          <Shield className="w-4 h-4 text-white" />
        </div>
        {!collapsed && (
          <a href="/dashboard" className="font-display font-bold text-lg bg-grad-warm bg-clip-text text-transparent truncate">
            Super Admin
          </a>
        )}
      </div>

      <nav className="flex-1 py-3 px-2 space-y-5 overflow-y-auto">
        {navSections.map((section, si) => (
          <div key={si}>
            {section.title && !collapsed && (
              <div className="px-3 mb-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-ht-text-faint">
                  {section.title}
                </span>
              </div>
            )}
            <div className="space-y-0.5">
              {section.items.map(({ label, href, Icon, badge }) => {
                const isActive = pathname === href || (href !== '/dashboard' && pathname.startsWith(href));
                return (
                  <a
                    key={href}
                    href={href}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2 rounded-lg font-body text-sm transition-all duration-200 min-h-[40px] group relative',
                      collapsed ? 'justify-center' : '',
                      isActive
                        ? 'bg-ht-coral/15 text-ht-coral border border-ht-coral/30'
                        : 'text-ht-soft hover:text-ht-text hover:bg-ht-surface2 border border-transparent',
                    )}
                    title={collapsed ? label : undefined}
                  >
                    <Icon className={cn('w-5 h-5 shrink-0', isActive && 'text-ht-coral')} />
                    {!collapsed && (
                      <>
                        <span className="truncate flex-1">{label}</span>
                        {badge && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-ht-coral/20 text-ht-coral">
                            {badge}
                          </span>
                        )}
                        {isActive && (
                          <ChevronRight className="w-4 h-4 text-ht-coral/50 shrink-0" />
                        )}
                      </>
                    )}
                    {collapsed && isActive && (
                      <span className="absolute left-full ml-2 px-2 py-1 rounded-md bg-ht-coral text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                        {label}
                      </span>
                    )}
                  </a>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className={cn('border-t border-ht-border shrink-0', collapsed ? 'p-2' : 'p-4')}>
        {!collapsed && (
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-grad-warm flex items-center justify-center text-white font-display font-bold text-sm shrink-0">
              {user?.firstName?.charAt(0)?.toUpperCase() || 'A'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-body text-sm text-ht-text truncate">{user?.firstName} {user?.lastName}</p>
              <p className="font-mono text-xs text-ht-coral truncate">platform_admin</p>
            </div>
          </div>
        )}
        <button
          onClick={logout}
          className={cn(
            'flex items-center gap-2 rounded-xl font-body text-sm text-ht-soft hover:text-ht-rose hover:bg-ht-rose/10 transition-all duration-200 min-h-[40px]',
            collapsed ? 'w-full justify-center px-2' : 'w-full px-3'
          )}
          title={collapsed ? 'Sign out' : undefined}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!collapsed && 'Sign out'}
        </button>
      </div>
    </div>
  );
}
