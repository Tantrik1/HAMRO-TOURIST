'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import Logo from '@/components/logo';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-xl bg-background/70 border-b border-border/60 shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <Logo className="h-9 w-auto text-foreground" />
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition">Features</a>
          <a href="#how" className="hover:text-foreground transition">How it works</a>
          <a href="#resources" className="hover:text-foreground transition">Resources</a>
          <a href="#pricing" className="hover:text-foreground transition">Pricing</a>
          <a href="#faq" className="hover:text-foreground transition">FAQ</a>
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <a href="#" className="text-sm font-medium text-foreground/80 hover:text-foreground">Sign in</a>
          <a href="#cta" className="inline-flex items-center gap-1.5 rounded-full bg-gradient-primary text-primary-foreground px-4 py-2 text-sm font-semibold shadow-elegant hover:shadow-glow transition-all">
            Start free <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden p-2">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-background px-5 py-4 flex flex-col gap-3 text-sm">
          <a href="#features" onClick={() => setOpen(false)}>Features</a>
          <a href="#how" onClick={() => setOpen(false)}>How it works</a>
          <a href="#resources" onClick={() => setOpen(false)}>Resources</a>
          <a href="#pricing" onClick={() => setOpen(false)}>Pricing</a>
          <a href="#faq" onClick={() => setOpen(false)}>FAQ</a>
          <a href="#cta" className="rounded-full bg-gradient-primary text-primary-foreground px-4 py-2 font-semibold text-center">Start free</a>
        </div>
      )}
    </header>
  );
}
