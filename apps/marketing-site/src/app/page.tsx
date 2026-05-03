'use client';

import Link from 'next/link';
import {
  Globe2, Layers, Mountain, Compass, ImageIcon, Mail, ShieldCheck,
  Zap, Sparkles, ArrowRight, Check, Code2, Smartphone, Palette,
  Clock, TrendingUp, TrendingDown, Users, Award, MapPin, Star, AlertCircle,
  ChevronRight, Menu, X, Globe, CreditCard, Lock, MessageSquare,
  Calendar, BarChart3, Zap as Fast, Shield, Phone, Mail as Email,
  Facebook, Twitter, Instagram, Linkedin, ChevronDown, Play,
} from 'lucide-react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://app.hamrotourist.com';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

// Reveal on scroll component
function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

export default function MarketingPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-ht-ink">
      <Nav />
      <Hero />
      <ProblemStatement />
      <CostOfWaiting />
      <TheShift />
      <SocialProofBanner />
      <ProductWalkthrough />
      <FeatureGrid />
      <Testimonials />
      <FOMOLive />
      <TenMinutePromise />
      <GeographyDemo />
      <TheNumbers />
      <CompetitorComparison />
      <Pricing />
      <RiskReversal />
      <FAQ />
      <FoundersNote />
      <UrgencyBanner />
      <FinalCTA />
      <Footer />
    </main>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-ht-ink/95 backdrop-blur-xl border-b border-ht-border shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-grad-primary flex items-center justify-center shadow-glow-violet">
            <Mountain className="w-5 h-5 text-white" />
          </div>
          <span className="font-display text-xl font-bold text-ht-text">
            Hamro <span className="text-ht-coral">Tourist</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-ht-soft font-body">
          <a href="#features" className="hover:text-ht-text transition-colors">Features</a>
          <a href="#pricing" className="hover:text-ht-text transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-ht-text transition-colors">FAQ</a>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href={`${APP_URL}/auth?mode=login`}
            className="text-sm text-ht-soft hover:text-ht-text transition-colors"
          >
            Sign in
          </a>
          <a
            href={`${APP_URL}/auth?mode=signup`}
            className="inline-flex items-center gap-1 bg-grad-primary text-white font-semibold rounded-full px-5 py-2 text-sm hover:shadow-glow-violet hover:scale-[1.02] transition-all"
          >
            Get Started Free <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-ht-soft hover:text-ht-text"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          className="md:hidden fixed inset-0 top-16 bg-ht-ink border-t border-ht-border p-6"
        >
          <nav className="flex flex-col gap-6 text-lg">
            <a href="#features" className="text-ht-soft hover:text-ht-text" onClick={() => setMobileMenuOpen(false)}>
              Features
            </a>
            <a href="#pricing" className="text-ht-soft hover:text-ht-text" onClick={() => setMobileMenuOpen(false)}>
              Pricing
            </a>
            <a href="#faq" className="text-ht-soft hover:text-ht-text" onClick={() => setMobileMenuOpen(false)}>
              FAQ
            </a>
            <div className="h-px bg-ht-border" />
            <a
              href={`${APP_URL}/auth?mode=login`}
              className="text-ht-soft hover:text-ht-text"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign in
            </a>
            <a
              href={`${APP_URL}/auth?mode=signup`}
              className="inline-flex items-center justify-center gap-2 bg-grad-primary text-white font-semibold rounded-full px-5 py-3"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Started Free <ArrowRight className="w-4 h-4" />
            </a>
          </nav>
        </motion.div>
      )}
    </header>
  );
}

function Hero() {
  const words = "Your competitors are already online. Are you?".split(" ");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-ht-ink via-ht-surface to-ht-ink">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-ht-coral rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-ht-violet rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-ht-cyan rounded-full blur-3xl opacity-30" />
      </div>

      {/* Mountain Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-ht-ink to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-ht-coral/30 bg-ht-coral/10 text-ht-coral text-sm font-mono mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-ht-coral animate-pulse" />
            Free for the first 1,000 agencies · 388 spots left
          </motion.div>

          {/* Main Headline with staggered word animation */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-ht-text">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + (i * 0.05) }}
                className="inline-block mr-2"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg sm:text-xl text-ht-soft max-w-2xl mx-auto mb-10"
          >
            Hamro Tourist gets your travel agency online in 10 minutes. Website, products, CRM, domain — everything included.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          >
            <a
              href={`${APP_URL}/auth?mode=signup`}
              className="group inline-flex items-center gap-2 bg-grad-primary text-white font-semibold rounded-full px-8 py-4 text-lg hover:shadow-glow-violet hover:scale-[1.02] transition-all"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#features"
              className="inline-flex items-center gap-2 border border-ht-border text-ht-soft hover:text-ht-text hover:border-ht-violet rounded-full px-7 py-4 text-lg transition-all"
            >
              See how it works
            </a>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-wrap justify-center gap-6 text-sm text-ht-text-faint"
          >
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-ht-lime" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-ht-lime" />
              <span>Setup in 10 minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-ht-lime" />
              <span>Cancel anytime</span>
            </div>
          </motion.div>
        </div>

        {/* Hero Preview Card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 mx-auto max-w-4xl"
        >
          <HeroPreview />
        </motion.div>
      </div>
    </section>
  );
}

function HeroPreview() {
  return (
    <div className="relative rounded-3xl border border-ht-border bg-ht-surface overflow-hidden shadow-card-hover">
      <div className="bg-grad-surface px-4 py-3 border-b border-ht-border flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-ht-rose/50" />
        <span className="w-3 h-3 rounded-full bg-ht-coral/50" />
        <span className="w-3 h-3 rounded-full bg-ht-lime/50" />
        <span className="ml-4 text-xs font-mono text-ht-text-faint">himalayan-adventures.hamrotourist.com</span>
      </div>
      <div className="grid md:grid-cols-2 gap-6 p-6 md:p-8">
        <div className="text-left flex flex-col justify-center">
          <span className="font-mono text-xs uppercase tracking-widest text-ht-cyan mb-3">Featured trek</span>
          <h3 className="font-display text-2xl md:text-3xl font-bold mb-3 text-ht-text">Everest Base Camp</h3>
          <p className="text-ht-soft text-sm mb-4">14 days · Moderate to challenging · Best Sept–Nov</p>
          <div className="font-mono text-2xl md:text-3xl text-ht-text mb-2">
            $1,890<span className="text-sm text-ht-soft font-body ml-1">/person</span>
          </div>
          <div className="flex gap-2 mt-4 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-ht-violet/15 text-ht-violet border border-ht-violet/30 text-xs">Trekking</span>
            <span className="px-3 py-1 rounded-full bg-ht-cyan/15 text-ht-cyan border border-ht-cyan/30 text-xs">Nepal</span>
          </div>
        </div>
        <div className="aspect-square rounded-xl bg-grad-cool relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-t from-ht-ink/80 to-transparent" />
          <Mountain className="w-24 h-24 md:w-32 md:h-32 text-white/30" />
        </div>
      </div>
    </div>
  );
}

// Section 2: Problem Statement
function ProblemStatement() {
  const problems = [
    { icon: AlertCircle, title: "No website", desc: "Customers can't find you online. You're invisible to the 80% of travelers who start with Google." },
    { icon: TrendingDown, title: "Losing leads", desc: "Every day without a website, you lose bookings to competitors who are already online." },
    { icon: MessageSquare, title: "WhatsApp chaos", desc: "Still managing bookings through messy WhatsApp threads? No CRM, no tracking, no follow-up." },
  ];

  return (
    <section className="py-20 md:py-28 px-4 bg-ht-surface relative overflow-hidden">
      <div className="mx-auto max-w-screen-xl">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-ht-text mb-4">
              Right now, your agency is <span className="text-ht-coral">invisible</span>.
            </h2>
            <p className="text-ht-soft text-lg max-w-2xl mx-auto">
              Every day you wait, you lose potential bookings to competitors who are already online.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8 items-center mt-12">
          <div className="space-y-4">
            {problems.map((problem, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="bg-ht-ink border-l-4 border-ht-coral rounded-r-xl p-6 hover:bg-ht-surface-2 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-ht-coral/20 flex items-center justify-center flex-shrink-0">
                      <problem.icon className="w-5 h-5 text-ht-coral" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-ht-text mb-2">{problem.title}</h3>
                      <p className="text-ht-soft text-sm">{problem.desc}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3}>
            <div className="bg-ht-ink rounded-2xl p-6 border border-ht-border">
              <div className="text-xs font-mono text-ht-text-faint uppercase mb-4">WhatsApp Booking Chaos</div>
              <div className="space-y-3">
                {[
                  { from: 'them', text: "Hi, is EBC trek available in October?" },
                  { from: 'me', text: "Yes, we have dates Oct 5-18" },
                  { from: 'them', text: "Price for 2 people?" },
                  { from: 'me', text: "$1890 per person including everything" },
                  { from: 'them', text: "Ok let me think about it" },
                ].map((msg, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-lg max-w-[80%] ${
                      msg.from === 'me'
                        ? 'bg-ht-violet/20 ml-auto text-ht-text'
                        : 'bg-ht-surface-2 text-ht-soft'
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-ht-border">
                <div className="flex gap-2 flex-wrap">
                  <span className="px-2 py-1 rounded bg-ht-rose/20 text-ht-rose text-xs">No tracking</span>
                  <span className="px-2 py-1 rounded bg-ht-rose/20 text-ht-rose text-xs">No follow-up</span>
                  <span className="px-2 py-1 rounded bg-ht-rose/20 text-ht-rose text-xs">Lost lead</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

// Section 3: Cost of Waiting
function CostOfWaiting() {
  const [timeframe, setTimeframe] = useState<'day' | 'week' | 'month'>('day');
  const costs = { day: '₨ 15,000', week: '₨ 105,000', month: '₨ 450,000' };

  return (
    <section className="py-20 md:py-28 px-4 bg-ht-ink">
      <div className="mx-auto max-w-screen-xl text-center">
        <ScrollReveal>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-ht-text mb-4">
            Every day without a website, you lose <span className="text-ht-coral">money</span>.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="flex justify-center gap-2 mt-8 mb-8">
            {(['day', 'week', 'month'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                className={`px-6 py-2 rounded-full text-sm font-semibold capitalize transition-all ${
                  timeframe === t
                    ? 'bg-ht-coral text-white'
                    : 'bg-ht-surface text-ht-soft hover:text-ht-text'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="bg-ht-surface rounded-3xl p-8 md:p-12 border border-ht-border max-w-2xl mx-auto">
            <div className="text-ht-soft mb-2">Lost revenue per {timeframe}</div>
            <motion.div
              key={timeframe}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="font-display text-5xl md:text-7xl font-bold text-ht-coral mb-4"
            >
              {costs[timeframe]}
            </motion.div>
            <p className="text-ht-text-faint text-sm">
              Based on average agency revenue of 3 bookings per {timeframe} at ₨5,000 per booking
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// Section 4: The Shift
function TheShift() {
  return (
    <section className="py-20 md:py-28 px-4 bg-grad-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0id2hpdGUiLz48L3N2Zz4=')]"></div>
      </div>

      <div className="mx-auto max-w-screen-xl relative z-10">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">
              What if setting up took <span className="italic">10 minutes</span>, not 10 months?
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <ScrollReveal delay={0.2}>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-ht-coral" />
                <h3 className="font-display font-semibold text-white">Before: WhatsApp Chaos</h3>
              </div>
              <ul className="space-y-3 text-white/80 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-ht-coral">✗</span>
                  Messy message threads
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-ht-coral">✗</span>
                  No lead tracking
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-ht-coral">✗</span>
                  Manual follow-ups
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-ht-coral">✗</span>
                  Lost bookings
                </li>
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="bg-white/20 backdrop-blur rounded-2xl p-6 border-2 border-ht-coral">
              <div className="flex items-center gap-3 mb-4">
                <Check className="w-6 h-6 text-ht-lime" />
                <h3 className="font-display font-semibold text-white">After: Hamro Tourist</h3>
              </div>
              <ul className="space-y-3 text-white/90 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-ht-lime">✓</span>
                  Clean CRM dashboard
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-ht-lime">✓</span>
                  Automatic lead tracking
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-ht-lime">✓</span>
                  One-click follow-ups
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-ht-lime">✓</span>
                  More bookings
                </li>
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

// Section 5: Social Proof Banner
function SocialProofBanner() {
  return (
    <section className="py-6 bg-ht-coral overflow-hidden">
      <div className="flex animate-ticker whitespace-nowrap">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-8 px-4">
            <span className="text-white font-semibold text-sm">47 agencies launched this month</span>
            <span className="w-2 h-2 rounded-full bg-white/50" />
            <span className="text-white font-semibold text-sm">Everest Trekkers saw 3× more leads</span>
            <span className="w-2 h-2 rounded-full bg-white/50" />
            <span className="text-white font-semibold text-sm">Free for the first 1,000 agencies</span>
            <span className="w-2 h-2 rounded-full bg-white/50" />
            <span className="text-white font-semibold text-sm">612 spots left</span>
            <span className="w-2 h-2 rounded-full bg-white/50" />
          </div>
        ))}
      </div>
    </section>
  );
}

// Section 6: Product Walkthrough
function ProductWalkthrough() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { name: 'Website', icon: Globe2, desc: 'Beautiful, mobile-optimized website that goes live instantly' },
    { name: 'Products', icon: Layers, desc: 'Drag-and-drop trek builder with day-by-day itineraries' },
    { name: 'CRM', icon: Users, desc: 'Track leads from inquiry to booking with full history' },
    { name: 'Domain', icon: Globe, desc: 'Connect your custom domain with automatic SSL' },
  ];
  const activeTabData = tabs[activeTab];
  const ActiveIcon = activeTabData.icon;

  return (
    <section id="features" className="py-20 md:py-28 px-4 bg-ht-ink">
      <div className="mx-auto max-w-screen-xl">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-ht-text mb-4">
              Everything in one place. <span className="text-ht-cyan">Finally.</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                activeTab === i
                  ? 'bg-ht-violet text-white'
                  : 'bg-ht-surface text-ht-soft hover:text-ht-text'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.name}
            </button>
          ))}
        </div>

        <ScrollReveal delay={0.2}>
          <div className="bg-ht-surface rounded-2xl p-8 md:p-12 border border-ht-border">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-ht-violet/20 flex items-center justify-center">
                    <ActiveIcon className="w-6 h-6 text-ht-violet" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-ht-text">{activeTabData.name}</h3>
                </div>
                <p className="text-ht-soft text-lg">{activeTabData.desc}</p>
              </div>
              <div className="aspect-video bg-ht-ink rounded-xl flex items-center justify-center">
                <Mountain className="w-16 h-16 text-ht-text-faint" />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// Section 7: Feature Grid
function FeatureGrid() {
  const features = [
    { icon: Fast, title: '10-minute setup', desc: 'From sign-up to live website before your morning tea gets cold' },
    { icon: Smartphone, title: 'Mobile-first', desc: 'Perfect on every device. 60% of your customers book on mobile' },
    { icon: Code2, title: 'Zero coding', desc: 'Drag-and-drop everything. No developers needed, ever' },
    { icon: Globe, title: 'Custom domain', desc: 'Connect yourcompany.com. We handle SSL automatically' },
    { icon: Shield, title: 'Secure by default', desc: 'Enterprise-grade security. Your data is fully isolated' },
    { icon: BarChart3, title: 'Built-in analytics', desc: 'Track visitors, leads, and conversions in real-time' },
    { icon: MessageSquare, title: 'CRM included', desc: 'Track every lead from inquiry to booking' },
    { icon: Palette, title: '3 beautiful themes', desc: 'Adventure Bold, Serene Journey, Heritage Classic' },
    { icon: Zap, title: 'Lightning fast', desc: 'Optimized for speed. Google loves us, and so will you' },
  ];

  return (
    <section className="py-20 md:py-28 px-4 bg-ht-surface">
      <div className="mx-auto max-w-screen-xl">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-ht-text mb-4">
              Everything you need. <span className="text-ht-cyan">Nothing you don't.</span>
            </h2>
          </div>
        </ScrollReveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="bg-ht-ink rounded-2xl p-6 border border-ht-border hover:border-ht-violet/40 hover:shadow-card-hover transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-ht-violet/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-ht-violet" />
              </div>
              <h3 className="font-display font-semibold text-ht-text mb-2">{feature.title}</h3>
              <p className="text-ht-soft text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Section 8: Testimonials
function Testimonials() {
  const testimonials = [
    {
      name: 'Rajesh K.',
      agency: 'Himalayan Adventures',
      location: 'Pokhara',
      quote: 'Got my first online booking in 3 days. Before Hamro Tourist, I was losing customers to agencies with websites.',
      result: '3× more leads in first month',
    },
    {
      name: 'Sita M.',
      agency: 'Nepal Cultural Tours',
      location: 'Kathmandu',
      quote: 'Setup took exactly 8 minutes. My WhatsApp chaos is now a clean CRM. I can finally track my leads.',
      result: '15 bookings in week 1',
    },
    {
      name: 'Bikash T.',
      agency: 'Chitwan Wildlife',
      location: 'Chitwan',
      quote: 'Custom domain was the game-changer. Clients trust mybrand.com more than a Facebook page.',
      result: '40% higher conversion rate',
    },
  ];

  return (
    <section className="py-20 md:py-28 px-4 bg-ht-ink">
      <div className="mx-auto max-w-screen-xl">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-ht-text mb-4">
              Real agencies. <span className="text-ht-coral">Real results.</span>
            </h2>
          </div>
        </ScrollReveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="bg-ht-surface rounded-2xl p-6 border border-ht-border hover:border-ht-coral/40 transition-all"
            >
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 text-ht-coral fill-ht-coral" />
                ))}
              </div>
              <p className="text-ht-soft text-sm mb-6 italic">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-ht-violet flex items-center justify-center font-display font-bold text-white text-sm">
                  {t.name[0]}
                </div>
                <div>
                  <div className="font-semibold text-ht-text text-sm">{t.name}</div>
                  <div className="text-ht-text-faint text-xs">{t.agency} · {t.location}</div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-ht-border">
                <div className="text-ht-lime text-xs font-semibold">{t.result}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Section 9: FOMO Live
function FOMOLive() {
  const [launchedAgencies, setLaunchedAgencies] = useState([
    { name: 'Mountain Magic Treks', time: '2 min ago' },
    { name: 'Kathmandu Adventures', time: '5 min ago' },
    { name: 'Pokhara Paradise', time: '12 min ago' },
  ]);

  useEffect(() => {
    const agencies = [
      'Annapurna Expeditions', 'Everest Base Camp Tours', 'Nepal Discovery',
      'Himalayan Heights', 'Kathmandu Cultural Tours', 'Chitwan Wildlife',
      'Langtang Valley Treks', 'Mustang Adventures', 'Dolpo Expeditions',
    ];
    let index = 0;
    const interval = setInterval(() => {
      setLaunchedAgencies(prev => [
        { name: agencies[index % agencies.length], time: 'Just now' },
        ...prev.slice(0, 2),
      ]);
      index++;
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 md:py-28 px-4 bg-ht-surface">
      <div className="mx-auto max-w-screen-xl">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <ScrollReveal>
            <div>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-ht-text mb-4">
                Agencies launching <span className="text-ht-coral">right now</span>.
              </h2>
              <div className="space-y-3 mt-8">
                {launchedAgencies.map((agency, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 bg-ht-ink rounded-xl p-4 border border-ht-border"
                  >
                    <div className="w-2 h-2 rounded-full bg-ht-coral animate-pulse" />
                    <span className="text-ht-text font-medium">{agency.name}</span>
                    <span className="text-ht-text-faint text-xs ml-auto">{agency.time}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="bg-grad-primary rounded-3xl p-8 text-center">
              <div className="font-display text-6xl md:text-7xl font-bold text-white mb-2">
                612
              </div>
              <div className="text-white/80 text-lg mb-6">Free spots remaining</div>
              <div className="bg-white/20 rounded-full h-3 overflow-hidden">
                <div className="bg-white h-full rounded-full" style={{ width: '38%' }} />
              </div>
              <div className="flex justify-between text-white/60 text-sm mt-2">
                <span>388 claimed</span>
                <span>1000 total</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

// Section 10: 10-Minute Promise
function TenMinutePromise() {
  const steps = [
    { num: '01', title: 'Sign up', desc: 'Create your account in 30 seconds' },
    { num: '02', title: 'Add agency info', desc: 'Name, location, countries you serve' },
    { num: '03', title: 'Add products', desc: 'Build your first trek or tour' },
    { num: '04', title: 'Pick theme', desc: 'Choose from 3 beautiful themes' },
    { num: '05', title: 'Go live', desc: 'Your website is instantly live' },
  ];

  return (
    <section className="py-20 md:py-28 px-4 bg-ht-ink">
      <div className="mx-auto max-w-screen-xl">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-ht-text mb-4">
              From zero to live website — <span className="text-ht-cyan">before your morning tea gets cold</span>.
            </h2>
          </div>
        </ScrollReveal>

        <div className="relative">
          <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-ht-coral via-ht-violet to-ht-cyan" />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-5 gap-6"
          >
            {steps.map((step, i) => (
              <motion.div key={i} variants={fadeInUp} className="text-center relative">
                <div className="w-16 h-16 rounded-full bg-ht-surface border-2 border-ht-coral flex items-center justify-center mx-auto mb-4 relative z-10">
                  <span className="font-display font-bold text-ht-coral">{step.num}</span>
                </div>
                <h3 className="font-display font-semibold text-ht-text mb-2">{step.title}</h3>
                <p className="text-ht-soft text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Section 11: Geography Demo
function GeographyDemo() {
  const [activeRegion, setActiveRegion] = useState(0);
  const regions = [
    { name: 'Everest Region', count: 45, treks: ['Everest Base Camp', 'Gokyo Lakes', 'Three Passes'] },
    { name: 'Annapurna', count: 38, treks: ['Annapurna Circuit', 'ABC Trek', 'Poon Hill'] },
    { name: 'Langtang', count: 22, treks: ['Langtang Valley', 'Gosaikunda', 'Helambu'] },
  ];

  return (
    <section className="py-20 md:py-28 px-4 bg-ht-surface">
      <div className="mx-auto max-w-screen-xl">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-ht-text mb-4">
              Built for Nepal's terrain — <span className="text-ht-cyan">and beyond</span>.
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-3">
            {regions.map((region, i) => (
              <button
                key={i}
                onClick={() => setActiveRegion(i)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  activeRegion === i
                    ? 'bg-ht-violet/20 border-ht-violet'
                    : 'bg-ht-ink border-ht-border hover:border-ht-violet/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-display font-semibold text-ht-text">{region.name}</div>
                    <div className="text-ht-text-faint text-xs">{region.count} trekking routes</div>
                  </div>
                  <ChevronRight className={`w-5 h-5 text-ht-soft transition-transform ${activeRegion === i ? 'rotate-90' : ''}`} />
                </div>
              </button>
            ))}
          </div>

          <ScrollReveal delay={0.2}>
            <div className="bg-ht-ink rounded-2xl p-6 border border-ht-border">
              <div className="text-xs font-mono text-ht-text-faint uppercase mb-4">Popular treks in {regions[activeRegion].name}</div>
              <div className="space-y-3">
                {regions[activeRegion].treks.map((trek, i) => (
                  <div key={i} className="bg-ht-surface rounded-xl p-4">
                    <div className="font-display font-semibold text-ht-text mb-1">{trek}</div>
                    <div className="text-ht-coral font-mono text-sm">From ₨45,000</div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

// Section 12: The Numbers
function TheNumbers() {
  const stats = [
    { value: '10 min', label: 'Average setup time' },
    { value: '3', label: 'Beautiful themes' },
    { value: '0%', label: 'Egress fees' },
    { value: '∞', label: 'Products you can add' },
  ];

  return (
    <section className="py-16 md:py-20 px-4 bg-ht-coral">
      <div className="mx-auto max-w-screen-xl">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {stats.map((stat, i) => (
            <motion.div key={i} variants={fadeInUp}>
              <div className="font-display text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-white/80 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Section 13: Competitor Comparison
function CompetitorComparison() {
  return (
    <section className="py-20 md:py-28 px-4 bg-ht-ink overflow-x-auto">
      <div className="mx-auto max-w-screen-xl">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-ht-text mb-4">
              Why Hamro Tourist <span className="text-ht-cyan">wins</span>.
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="bg-ht-surface rounded-2xl overflow-hidden border border-ht-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-ht-surface-2">
                  <th className="p-4 text-left text-ht-soft">Feature</th>
                  <th className="p-4 text-center bg-ht-violet text-white">Hamro Tourist</th>
                  <th className="p-4 text-center text-ht-soft">Custom Website</th>
                  <th className="p-4 text-center text-ht-soft">Hiring a Dev</th>
                  <th className="p-4 text-center text-ht-soft">Other SaaS</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Cost', us: 'Free to ₨999/mo', custom: '₨50,000+', dev: '₨100,000+', other: '$20-50/mo' },
                  { feature: 'Setup time', us: '10 minutes', custom: '2-6 months', dev: '3-6 months', other: '1-2 weeks' },
                  { feature: 'Nepal-first', us: '✓', custom: '✓', dev: '✓', other: '✗' },
                  { feature: 'CRM included', us: '✓', custom: '✗', dev: '✗', other: '✗' },
                  { feature: 'Domain included', us: '✓ (Pro)', custom: '✓', dev: '✓', other: '✗' },
                  { feature: 'Payment collection', us: 'Coming soon', custom: '✓', dev: '✓', other: '✓' },
                ].map((row, i) => (
                  <tr key={i} className="border-t border-ht-border">
                    <td className="p-4 text-ht-text font-medium">{row.feature}</td>
                    <td className="p-4 text-center bg-ht-violet/10 text-ht-violet font-semibold">{row.us}</td>
                    <td className="p-4 text-center text-ht-soft">{row.custom}</td>
                    <td className="p-4 text-center text-ht-soft">{row.dev}</td>
                    <td className="p-4 text-center text-ht-soft">{row.other}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// Section 14: Pricing (Updated)
function Pricing() {
  const [annual, setAnnual] = useState(false);
  const plans = [
    {
      name: 'Free',
      price: '०',
      period: 'forever',
      blurb: 'Perfect to launch your first agency website',
      features: ['5 countries', '15 regions', '1 team member', 'Hamro Tourist subdomain', 'All 3 themes', 'Built-in CRM'],
      cta: 'Start free',
      featured: false,
    },
    {
      name: 'Pro',
      price: '९९९',
      period: '/महिना',
      blurb: 'For growing agencies ready to scale',
      features: ['Unlimited countries', 'Unlimited regions', '5 team members', 'Custom domain', 'Custom HTML/CSS', 'Priority support', 'Analytics dashboard'],
      cta: 'Start Pro',
      featured: true,
    },
    {
      name: 'Scale',
      price: '१,९९९',
      period: '/महिना',
      blurb: 'For multi-brand operators and chains',
      features: ['Everything in Pro', 'Multi-brand white-label', 'Unlimited team members', 'API access', 'Dedicated support'],
      cta: 'Talk to sales',
      featured: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 md:py-28 px-4 bg-ht-surface">
      <div className="mx-auto max-w-screen-xl">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-ht-text mb-4">
              Simple pricing. <span className="text-ht-cyan">No surprises.</span>
            </h2>
            <p className="text-ht-soft max-w-xl mx-auto">Start free. Upgrade when you're ready.</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="flex justify-center items-center gap-4 mb-8">
            <span className={`text-sm ${!annual ? 'text-ht-text' : 'text-ht-soft'}`}>Monthly</span>
            <button
              onClick={() => setAnnual(!annual)}
              className={`w-12 h-6 rounded-full transition-all ${annual ? 'bg-ht-coral' : 'bg-ht-surface-2'}`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${annual ? 'translate-x-6' : 'translate-x-0.5'}`}
              />
            </button>
            <span className={`text-sm ${annual ? 'text-ht-text' : 'text-ht-soft'}`}>Annual <span className="text-ht-coral text-xs">(Save 20%)</span></span>
          </div>
        </ScrollReveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className={`bg-ht-ink rounded-2xl p-6 border transition-all relative ${
                plan.featured
                  ? 'border-ht-violet scale-105 shadow-glow-violet'
                  : 'border-ht-border hover:border-ht-violet/40'
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-ht-coral text-white px-3 py-1 rounded-full text-xs font-semibold">
                  MOST POPULAR
                </div>
              )}
              <h3 className="font-display text-xl font-bold text-ht-text mb-2">{plan.name}</h3>
              <p className="text-ht-soft text-sm mb-4">{plan.blurb}</p>
              <div className="mb-4">
                <span className="font-display text-4xl font-bold text-ht-text">रू {plan.price}</span>
                <span className="text-ht-soft text-sm">{plan.period}</span>
              </div>
              <a
                href={`${APP_URL}/auth?mode=signup`}
                className={`block text-center py-3 rounded-xl font-semibold transition-all ${
                  plan.featured
                    ? 'bg-grad-primary text-white hover:shadow-glow-violet'
                    : 'border border-ht-border text-ht-soft hover:border-ht-violet hover:text-ht-text'
                }`}
              >
                {plan.cta}
              </a>
              <ul className="mt-6 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-ht-soft">
                    <Check className="w-4 h-4 text-ht-lime shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Section 15: Risk Reversal
function RiskReversal() {
  return (
    <section className="py-16 md:py-20 px-4 bg-grad-primary">
      <div className="mx-auto max-w-screen-xl text-center">
        <ScrollReveal>
          <h2 className="font-display text-2xl md:text-4xl font-bold text-white mb-8">
            Start free. No card. No commitment.
          </h2>
        </ScrollReveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-6"
        >
          {[
            { icon: Shield, title: '30-day money back', sub: 'Not satisfied? Get a full refund.' },
            { icon: X, title: 'Cancel anytime', sub: 'No contracts, no lock-in.' },
            { icon: Lock, title: 'Your data is yours', sub: 'Export anytime, guaranteed.' },
          ].map((badge, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20 flex items-center gap-4"
            >
              <badge.icon className="w-8 h-8 text-white" />
              <div className="text-left">
                <div className="font-semibold text-white">{badge.title}</div>
                <div className="text-white/70 text-sm">{badge.sub}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Section 16: FAQ (Updated)
function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = [
    {
      q: 'How long does it take to set up?',
      a: 'Most agencies are live within 10 minutes. Sign up, verify email, complete the 4-step onboarding wizard, add a product, pick a theme, and publish.',
    },
    {
      q: 'Can I use my own domain?',
      a: 'Yes — on Pro and Scale plans, you can connect any domain you own (yourcompany.com). We handle DNS verification, SSL provisioning, and routing automatically via Cloudflare.',
    },
    {
      q: 'Do I need to know how to code?',
      a: 'Not at all. The product builder, website editor, and CRM are all drag-and-drop. Custom HTML/CSS injection is available on Pro for those who want it.',
    },
    {
      q: 'Can I take payments?',
      a: 'Booking & payments via Stripe and eSewa/Khalti are coming in our Phase 8 release. For now, leads go into the CRM and you handle payments your existing way.',
    },
    {
      q: 'What happens if I outgrow the free plan?',
      a: 'Just upgrade — all your data stays put, and your site doesn\'t go down. We never lock you out of data you\'ve already added.',
    },
    {
      q: 'Is my data secure?',
      a: 'Absolutely. We use schema-per-tenant architecture, meaning your data is fully isolated. Enterprise-grade security from day one.',
    },
  ];

  return (
    <section id="faq" className="py-20 md:py-28 px-4 bg-ht-ink">
      <div className="mx-auto max-w-3xl">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-ht-text mb-4">
              Questions? <span className="text-ht-cyan">Answered.</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-ht-surface rounded-xl border border-ht-border overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-6 text-left flex items-center justify-between"
              >
                <span className="font-display font-semibold text-ht-text">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-ht-soft transition-transform ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <motion.div
                initial={false}
                animate={{ height: openIndex === i ? 'auto' : 0 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6 text-ht-soft text-sm">{faq.a}</div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Section 17: Founder's Note
function FoundersNote() {
  return (
    <section className="py-20 md:py-28 px-4 bg-ht-surface">
      <div className="mx-auto max-w-3xl text-center">
        <ScrollReveal>
          <div className="w-20 h-20 rounded-full bg-ht-violet flex items-center justify-center mx-auto mb-6 border-4 border-ht-coral">
            <span className="font-display text-3xl font-bold text-white">HT</span>
          </div>
          <blockquote className="font-display text-2xl md:text-3xl font-bold text-ht-text mb-6 italic">
            "We built this because our own family's trekking company was invisible online. Now every Nepal agency can be seen."
          </blockquote>
          <div className="text-ht-soft">
            <div className="font-semibold text-ht-text">The Hamro Tourist Team</div>
            <div className="text-sm">Kathmandu, Nepal</div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// Section 18: Urgency Banner
function UrgencyBanner() {
  return (
    <section className="py-8 px-4 bg-ht-surface-2 border-y border-ht-border">
      <div className="mx-auto max-w-screen-xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-xs font-mono text-ht-text-faint uppercase mb-1">Limited time offer</div>
            <div className="font-display text-xl font-bold text-ht-text">
              Free plan is open to the first 1,000 agencies. <span className="text-ht-coral">388 spots remaining.</span>
            </div>
          </div>
          <div className="flex-shrink-0">
            <a
              href={`${APP_URL}/auth?mode=signup`}
              className="inline-flex items-center gap-2 bg-ht-coral text-white font-semibold rounded-full px-6 py-3 hover:bg-ht-coral-light transition-all"
            >
              Claim your spot <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
        <div className="mt-4 bg-ht-ink rounded-full h-2 overflow-hidden">
          <div className="bg-gradient-to-r from-ht-coral to-ht-violet h-full rounded-full" style={{ width: '61%' }} />
        </div>
      </div>
    </section>
  );
}

// Section 19: Final CTA (Updated)
function FinalCTA() {
  return (
    <section className="py-32 px-4 bg-gradient-to-br from-ht-ink via-ht-surface to-ht-ink relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-ht-violet rounded-full blur-3xl animate-pulse-glow" />
      </div>

      <div className="mx-auto max-w-3xl text-center relative z-10">
        <ScrollReveal>
          <div className="text-ht-coral font-mono text-sm uppercase tracking-widest mb-6">Your agency. Online. Today.</div>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-ht-text mb-6">
            Your agency website is <span className="text-ht-coral">10 minutes</span> away.
          </h2>
          <p className="text-ht-soft text-lg mb-10">Free forever. No credit card. No surprises. धन्यवाद!</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`${APP_URL}/auth?mode=signup`}
              className="group inline-flex items-center gap-2 bg-grad-primary text-white font-semibold rounded-full px-10 py-4 text-lg hover:shadow-glow-violet hover:scale-[1.02] transition-all"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#faq"
              className="inline-flex items-center gap-2 border border-ht-border text-ht-soft hover:text-ht-text hover:border-ht-violet rounded-full px-8 py-4 text-lg transition-all"
            >
              Learn more
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// Section 20: Footer (Updated)
function Footer() {
  return (
    <footer className="bg-ht-surface-2 py-16 px-4 border-t border-ht-border">
      <div className="mx-auto max-w-screen-xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-grad-primary flex items-center justify-center">
                <Mountain className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-ht-text">Hamro Tourist</span>
            </div>
            <p className="text-ht-text-faint text-sm">
              The all-in-one platform for Nepal's travel agencies. Get online in 10 minutes.
            </p>
          </div>
          <div>
            <h4 className="font-display font-semibold text-ht-text mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-ht-soft">
              <li><a href="#features" className="hover:text-ht-text transition">Features</a></li>
              <li><a href="#pricing" className="hover:text-ht-text transition">Pricing</a></li>
              <li><a href="#faq" className="hover:text-ht-text transition">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold text-ht-text mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-ht-soft">
              <li><a href="#" className="hover:text-ht-text transition">About</a></li>
              <li><a href="#" className="hover:text-ht-text transition">Blog</a></li>
              <li><a href="#" className="hover:text-ht-text transition">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold text-ht-text mb-4">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-ht-ink flex items-center justify-center text-ht-soft hover:text-ht-text hover:bg-ht-violet/20 transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-ht-ink flex items-center justify-center text-ht-soft hover:text-ht-text hover:bg-ht-violet/20 transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-ht-ink flex items-center justify-center text-ht-soft hover:text-ht-text hover:bg-ht-violet/20 transition">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-ht-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-ht-text-faint text-sm">© 2026 Hamro Tourist · Built with ❤️ in Kathmandu</p>
          <div className="flex items-center gap-4 text-sm text-ht-soft">
            <a href={`${APP_URL}/auth?mode=login`} className="hover:text-ht-text transition">Sign in</a>
            <span>·</span>
            <a href={`${APP_URL}/auth?mode=signup`} className="hover:text-ht-text transition">Sign up</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

