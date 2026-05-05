'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight,
  Menu,
  X,
  Sparkles,
  Zap,
  BookOpen,
  CreditCard,
  HelpCircle,
  LogIn,
  Compass,
  ChevronRight,
  Users,
  Mail,
} from 'lucide-react';
import Logo from '@/components/logo';

const links = [
  { href: '#features', label: 'Features', icon: Sparkles, page: false },
  { href: '#how-it-works', label: 'How It Works', icon: Zap, page: false },
  { href: '#pricing', label: 'Pricing', icon: CreditCard, page: false },
  { href: '#resources', label: 'Resources', icon: BookOpen, page: false },
  { href: '/about', label: 'About Us', icon: Users, page: true },
  { href: '/contact', label: 'Contact Us', icon: Mail, page: true },
];

function NavLink({ href, label, onClick, className, isPage }: { href: string; label: React.ReactNode; onClick?: () => void; className?: string; isPage?: boolean }) {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const fullHref = isPage ? href : (isHome ? href : `/${href}`);

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) onClick();
    if (!isPage && !isHome && href.startsWith('#')) {
      // Cross-page anchor navigation: scroll after page load
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    }
  };

  return (
    <Link
      href={fullHref}
      onClick={handleClick}
      className={className || "px-4 py-2.5 rounded-xl text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"}
    >
      {label}
    </Link>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      {/* Full-width Navbar — dark glass */}
      <header
        className="fixed top-0 inset-x-0 z-50 transition-all duration-300 bg-background border-b border-white/[0.06]"
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-8 h-16 sm:h-[72px] flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Logo className="h-12 w-auto" />
          </Link>

          {/* Desktop nav links — centered */}
          <nav className="hidden lg:flex items-center gap-2">
            {links.map((l) => (
              <NavLink key={l.href} href={l.href} label={l.label} isPage={l.page} />
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-5 shrink-0">
            <a
              href="https://app.hamrotourist.com/auth?mode=login"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign in
            </a>
            <a
              href="https://app.hamrotourist.com/auth?mode=signup"
              className="group inline-flex items-center gap-1.5 rounded-full bg-gradient-primary text-primary-foreground px-6 py-2.5 text-sm font-semibold shadow-elegant hover:shadow-glow transition-all hover:brightness-105"
            >
              Start free
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          {/* Tablet + Mobile: Start free + hamburger */}
          <div className="flex lg:hidden items-center gap-4 shrink-0">
            <a
              href="https://app.hamrotourist.com/auth?mode=signup"
              className="text-sm font-semibold text-foreground hover:text-primary transition-colors"
            >
              Start free
            </a>
            <button
              onClick={() => setOpen(true)}
              className="h-9 w-9 flex items-center justify-center transition active:scale-95"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5 text-foreground" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide Drawer */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm lg:hidden"
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-[min(360px,90vw)] bg-background border-l border-border shadow-2xl lg:hidden flex flex-col"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                <Link href="/" onClick={() => setOpen(false)}>
                  <Logo className="h-14 w-auto" />
                </Link>
                <button
                  onClick={() => setOpen(false)}
                  className="h-9 w-9 rounded-lg bg-muted/50 flex items-center justify-center transition hover:bg-muted active:scale-95"
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4 text-foreground" />
                </button>
              </div>

              {/* Nav Links */}
              <nav className="flex-1 px-4 py-5 flex flex-col gap-1 overflow-y-auto">
                {links.map((l, i) => (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04 }}
                  >
                    <NavLink
                      href={l.href}
                      isPage={l.page}
                      label={
                        <>
                          <span className="flex items-center gap-3">
                            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted/60">
                              <l.icon className="h-4 w-4 text-accent" />
                            </span>
                            <span>{l.label}</span>
                          </span>
                          <ChevronRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-muted-foreground/60 group-hover:translate-x-0.5 transition" />
                        </>
                      }
                      onClick={() => setOpen(false)}
                      className="group flex items-center justify-between rounded-2xl px-4 py-3.5 text-sm font-medium text-muted-foreground transition hover:bg-muted/40 hover:text-foreground"
                    />
                  </motion.div>
                ))}

                {/* Divider */}
                <div className="my-3 border-t border-border" />

                {/* Sign In */}
                <motion.a
                  href="https://app.hamrotourist.com/auth?mode=login"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="group flex items-center justify-between rounded-2xl px-4 py-3.5 text-sm font-medium text-muted-foreground transition hover:bg-muted/40 hover:text-foreground"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted/60">
                      <LogIn className="h-4 w-4 text-primary" />
                    </span>
                    <span>Sign in</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-muted-foreground/60 group-hover:translate-x-0.5 transition" />
                </motion.a>
              </nav>

              {/* Drawer Footer — CTA */}
              <div className="p-5 border-t border-border">
                <motion.a
                  href="https://app.hamrotourist.com/auth?mode=signup"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-primary text-primary-foreground px-5 py-3.5 text-sm font-semibold shadow-elegant hover:shadow-glow transition-all hover:brightness-105"
                >
                  <Compass className="h-4 w-4" />
                  Start free
                </motion.a>
                <p className="mt-3 text-center text-[10px] text-muted-foreground">
                  No credit card · Setup in 10 minutes
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
