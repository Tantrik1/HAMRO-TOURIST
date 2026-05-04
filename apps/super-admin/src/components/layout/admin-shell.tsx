'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Sidebar } from './sidebar';
import { useAuthStore } from '@/store/auth-store';
import { cn } from '@/lib/utils';
import {
  Menu, X, Bell, Search, ChevronDown, Shield,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMobileOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (mobileOpen) { document.body.style.overflow = 'hidden'; }
    else { document.body.style.overflow = ''; }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <div className="min-h-screen bg-ht-ink text-ht-text font-body antialiased">
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-30 hidden lg:flex flex-col bg-ht-surface border-r border-ht-border transition-all duration-300',
          sidebarCollapsed ? 'w-[72px]' : 'w-64'
        )}
      >
        <Sidebar collapsed={sidebarCollapsed} />
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 left-0 z-50 w-[280px] flex flex-col bg-ht-surface border-r border-ht-border lg:hidden"
          >
            <div className="h-14 flex items-center justify-between px-4 border-b border-ht-border shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-grad-warm flex items-center justify-center shadow-glow-coral">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <span className="font-display font-bold text-lg bg-grad-warm bg-clip-text text-transparent">
                  Super Admin
                </span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-lg text-ht-soft hover:text-ht-text hover:bg-ht-surface2 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <Sidebar collapsed={false} isMobile />
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <header
        className={cn(
          'fixed top-0 right-0 z-20 bg-ht-ink/80 backdrop-blur-xl border-b border-ht-border transition-all duration-200',
          sidebarCollapsed ? 'lg:left-[72px]' : 'lg:left-64',
          scrolled && 'shadow-lg shadow-black/20'
        )}
      >
        <div className="h-14 lg:h-16 flex items-center justify-between px-3 sm:px-4 lg:px-6">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-lg text-ht-soft hover:text-ht-text hover:bg-ht-surface2 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <button
              onClick={() => setSidebarCollapsed((v) => !v)}
              className="hidden lg:flex p-2 rounded-lg text-ht-soft hover:text-ht-text hover:bg-ht-surface2 transition-colors"
              aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="min-w-0">
              <h1 className="font-display font-semibold text-sm sm:text-base lg:text-lg text-ht-text truncate">
                {getPageTitle(pathname)}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <div className="hidden sm:flex items-center bg-ht-surface border border-ht-border rounded-lg px-3 py-1.5 w-48 lg:w-64 focus-within:border-ht-coral/50 transition-colors">
              <Search className="w-4 h-4 text-ht-text-faint shrink-0" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none outline-none text-sm text-ht-text placeholder-ht-text-faint ml-2 w-full"
                readOnly
                onClick={() => alert('Global search coming soon!')}
              />
            </div>
            <button
              className="relative p-2 rounded-lg text-ht-soft hover:text-ht-text hover:bg-ht-surface2 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-ht-rose border-2 border-ht-ink" />
            </button>
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen((v) => !v)}
                className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-ht-surface2 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-grad-warm flex items-center justify-center text-white font-display font-bold text-sm shrink-0">
                  {user?.firstName?.charAt(0)?.toUpperCase() || 'A'}
                </div>
                <div className="hidden sm:block text-left min-w-0">
                  <p className="text-sm text-ht-text truncate max-w-[120px]">{user?.firstName} {user?.lastName}</p>
                  <p className="text-xs text-ht-text-faint truncate max-w-[120px]">platform_admin</p>
                </div>
                <ChevronDown className={cn('w-4 h-4 text-ht-soft transition-transform', userMenuOpen && 'rotate-180')} />
              </button>
              <AnimatePresence>
                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-1 w-56 bg-ht-surface border border-ht-border rounded-xl shadow-card z-20 overflow-hidden"
                    >
                      <div className="p-3 border-b border-ht-border">
                        <p className="text-sm font-semibold text-ht-text truncate">{user?.firstName} {user?.lastName}</p>
                        <p className="text-xs text-ht-text-faint truncate">platform_admin</p>
                      </div>
                      <div className="p-1">
                        <a
                          href="/dashboard/settings"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-ht-soft hover:text-ht-text hover:bg-ht-surface2 transition-colors"
                        >
                          Settings
                        </a>
                        <button
                          onClick={() => { setUserMenuOpen(false); logout(); }}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-ht-rose hover:bg-ht-rose/10 transition-colors text-left"
                        >
                          Sign out
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      <main
        className={cn(
          'pt-14 lg:pt-16 min-h-screen transition-all duration-300',
          sidebarCollapsed ? 'lg:ml-[72px]' : 'lg:ml-64'
        )}
      >
        <div className="mx-auto w-full max-w-screen-2xl px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
          {children}
        </div>
      </main>
    </div>
  );
}

function getPageTitle(pathname: string): string {
  if (pathname === '/dashboard') return 'Platform Overview';
  if (pathname.startsWith('/dashboard/tenants')) return 'Tenants';
  if (pathname.startsWith('/dashboard/users')) return 'Users';
  if (pathname.startsWith('/dashboard/subscriptions')) return 'Subscriptions';
  if (pathname.startsWith('/dashboard/bookings')) return 'Bookings';
  if (pathname.startsWith('/dashboard/newsletter')) return 'Newsletter';
  if (pathname.startsWith('/dashboard/audit-logs')) return 'Audit Logs';
  if (pathname.startsWith('/dashboard/settings')) return 'Settings';
  return 'Dashboard';
}
