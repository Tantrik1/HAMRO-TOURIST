'use client';

import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';
import { cn } from '@/lib/utils';
import { LogOut, Mountain, ExternalLink } from 'lucide-react';
import { ModuleNavContent, findModule } from './module-nav';

interface SidebarProps {
  collapsed?: boolean;
  onCollapse?: (v: boolean) => void;
  isMobile?: boolean;
}

export function Sidebar({ collapsed = false }: SidebarProps) {
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const tenantSlug = user?.tenantSlug;
  const liveUrl = tenantSlug ? `https://${tenantSlug}.hamrotourist.com` : null;
  const inModule = !!findModule(pathname);

  return (
    <div className="h-full flex flex-col bg-ht-surface">
      {/* Logo */}
      <div className={cn(
        'h-14 lg:h-16 flex items-center border-b border-ht-border shrink-0',
        collapsed ? 'justify-center px-2' : 'px-5 gap-3'
      )}>
        <div className="w-8 h-8 rounded-lg bg-grad-primary flex items-center justify-center shadow-glow-violet shrink-0">
          <Mountain className="w-4 h-4 text-white" />
        </div>
        {!collapsed && (
          <a href="/dashboard" className="font-display font-bold text-lg bg-grad-primary bg-clip-text text-transparent truncate">
            Hamro Tourist
          </a>
        )}
      </div>

      {/* Tenant info */}
      {tenantSlug && liveUrl && !collapsed && !inModule && (
        <div className="px-4 py-3 border-b border-ht-border bg-ht-surface2/40">
          <div className="text-[10px] font-mono text-ht-text-faint uppercase tracking-wider">Your site</div>
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 flex items-center gap-1.5 text-xs text-ht-cyan hover:text-ht-text transition-colors break-all"
          >
            {tenantSlug}.hamrotourist.com
            <ExternalLink className="w-3 h-3 shrink-0" />
          </a>
        </div>
      )}

      {/* Module Navigation */}
      <div className="flex-1 overflow-hidden">
        <ModuleNavContent collapsed={collapsed} />
      </div>

      {/* Footer */}
      <div className={cn(
        'border-t border-ht-border shrink-0',
        collapsed ? 'p-2' : 'p-4'
      )}>
        {!collapsed && (
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-grad-primary flex items-center justify-center text-white font-display font-bold text-sm shrink-0">
              {user?.firstName?.charAt(0)?.toUpperCase() || '?'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-body text-sm text-ht-text truncate">{user?.firstName} {user?.lastName}</p>
              <p className="font-body text-xs text-ht-soft truncate">{user?.email}</p>
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
