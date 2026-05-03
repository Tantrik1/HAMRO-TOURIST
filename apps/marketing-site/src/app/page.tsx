import Link from 'next/link';
import {
  Globe2, Layers, Mountain, Compass, ImageIcon, Mail, ShieldCheck,
  Zap, Sparkles, ArrowRight, Check, Code2, Smartphone, Palette,
} from 'lucide-react';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://app.hamrotourist.com';

export default function MarketingPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Nav />
      <Hero />
      <SocialProof />
      <Features />
      <ShowcaseStrip />
      <ThemeShowcase />
      <BuilderSection />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}

function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-ht-ink/70 border-b border-ht-border">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-grad-primary flex items-center justify-center shadow-glow-violet">
            <Mountain className="w-5 h-5 text-white" />
          </div>
          <span className="font-display text-xl font-bold">Hamro Tourist</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-ht-soft font-body">
          <a href="#features" className="hover:text-ht-text transition">Features</a>
          <a href="#themes" className="hover:text-ht-text transition">Themes</a>
          <a href="#pricing" className="hover:text-ht-text transition">Pricing</a>
          <a href="#faq" className="hover:text-ht-text transition">FAQ</a>
        </nav>
        <div className="flex items-center gap-3">
          <a href={`${APP_URL}/auth?mode=login`} className="hidden sm:inline-block text-sm text-ht-soft hover:text-ht-text">
            Sign in
          </a>
          <a
            href={`${APP_URL}/auth?mode=signup`}
            className="inline-flex items-center gap-1 bg-grad-primary text-white font-semibold rounded-full px-5 py-2 text-sm hover:shadow-glow-violet hover:scale-[1.02] transition-all"
          >
            Get started <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative pt-36 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-40">
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-ht-violet rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-ht-cyan rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-ht-coral rounded-full blur-3xl opacity-30" />
      </div>
      <div className="mx-auto max-w-screen-xl text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-ht-violet/30 bg-ht-violet/10 text-ht-violet text-xs font-mono mb-6">
          <Sparkles className="w-3 h-3" /> Now in beta · Free for the first 1,000 agencies
        </div>
        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
          Run your travel agency
          <br />
          <span className="bg-grad-primary bg-clip-text text-transparent">on autopilot.</span>
        </h1>
        <p className="text-lg sm:text-xl text-ht-soft max-w-2xl mx-auto mb-10">
          Hamro Tourist is the all-in-one SaaS for adventure travel companies — a stunning website,
          smart product builder, leads CRM, and custom domain — set up in under 10 minutes.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={`${APP_URL}/auth?mode=signup`}
            className="group inline-flex items-center gap-2 bg-grad-primary text-white font-semibold rounded-full px-7 py-3.5 text-base hover:shadow-glow-violet hover:scale-[1.02] transition-all"
          >
            Start your agency website — free
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#features"
            className="inline-flex items-center gap-2 border border-ht-border text-ht-soft hover:text-ht-text hover:border-ht-violet rounded-full px-6 py-3.5 text-base transition-all"
          >
            See how it works
          </a>
        </div>
        <p className="mt-5 text-xs text-ht-text-faint">
          No credit card required · 5 countries free · Custom domain on Pro
        </p>

        <HeroPreview />
      </div>
    </section>
  );
}

function HeroPreview() {
  return (
    <div className="mt-16 mx-auto max-w-5xl">
      <div className="relative rounded-3xl border border-ht-border bg-ht-surface overflow-hidden shadow-card-hover">
        <div className="bg-grad-surface px-4 py-3 border-b border-ht-border flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-ht-rose/50" />
          <span className="w-3 h-3 rounded-full bg-ht-coral/50" />
          <span className="w-3 h-3 rounded-full bg-ht-lime/50" />
          <span className="ml-4 text-xs font-mono text-ht-text-faint">himalayan-adventures.hamrotourist.com</span>
        </div>
        <div className="grid md:grid-cols-2 gap-6 p-8 md:p-12">
          <div className="text-left flex flex-col justify-center">
            <span className="font-mono text-xs uppercase tracking-widest text-ht-cyan mb-3">Featured trek</span>
            <h3 className="font-display text-3xl font-bold mb-3">Everest Base Camp</h3>
            <p className="text-ht-soft text-sm mb-4">14 days · Moderate to challenging · Best Sept–Nov</p>
            <div className="font-mono text-3xl text-ht-text mb-2">
              $1,890<span className="text-sm text-ht-soft font-body ml-1">/person</span>
            </div>
            <div className="flex gap-2 mt-4">
              <span className="px-3 py-1 rounded-full bg-ht-violet/15 text-ht-violet border border-ht-violet/30 text-xs">Trekking</span>
              <span className="px-3 py-1 rounded-full bg-ht-cyan/15 text-ht-cyan border border-ht-cyan/30 text-xs">Nepal</span>
            </div>
          </div>
          <div className="aspect-square rounded-xl bg-grad-cool relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-ht-ink/80 to-transparent" />
            <div className="absolute inset-0 flex items-end p-6">
              <Mountain className="w-32 h-32 text-white/30" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SocialProof() {
  return (
    <section className="py-12 border-y border-ht-border">
      <div className="mx-auto max-w-screen-xl px-4">
        <p className="text-center text-xs font-mono uppercase tracking-widest text-ht-text-faint mb-8">
          Built for trekking companies, tour operators, and adventure outfitters
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {[
            ['🏔️', 'Treks'],
            ['🌍', 'Tours'],
            ['🪂', 'Activities'],
            ['🎒', 'Packages'],
          ].map(([icon, label]) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <span className="text-3xl">{icon}</span>
              <span className="font-display text-lg text-ht-soft">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    {
      icon: Globe2,
      title: 'Beautiful website out of the box',
      desc: 'Pick from 3 hand-crafted themes designed for travel. Your site goes live at agency.hamrotourist.com instantly.',
      color: 'ht-violet',
    },
    {
      icon: Layers,
      title: 'Smart product builder',
      desc: 'Tours, treks, activities and packages — drag-and-drop itineraries, day-by-day plans, multi-tier pricing, group discounts.',
      color: 'ht-cyan',
    },
    {
      icon: Mountain,
      title: 'Geography-first organization',
      desc: 'Structure products by Country → Region → Destination. Your visitors browse the way they actually plan trips.',
      color: 'ht-coral',
    },
    {
      icon: Compass,
      title: 'Itineraries & pricing',
      desc: 'Day-by-day itineraries with seasonal pricing tiers, group discounts, and inclusive/exclusive activities.',
      color: 'ht-lime',
    },
    {
      icon: ImageIcon,
      title: 'Media that loads fast',
      desc: 'Auto-optimized images via Cloudflare R2 and CDN. Hero, card, and thumb variants generated for free.',
      color: 'ht-violet',
    },
    {
      icon: Mail,
      title: 'Leads & CRM built-in',
      desc: 'Contact forms feed directly into your CRM. Track leads from new → won, with notes and assignments.',
      color: 'ht-cyan',
    },
    {
      icon: Globe2,
      title: 'Connect your custom domain',
      desc: 'Bring your own domain like yourcompany.com. We handle DNS, SSL, and verification automatically.',
      color: 'ht-coral',
    },
    {
      icon: Code2,
      title: 'Custom HTML on Pro',
      desc: 'Inject custom HTML/CSS, third-party tracking, embeds. Full control on Pro and Scale plans.',
      color: 'ht-lime',
    },
    {
      icon: ShieldCheck,
      title: 'Multi-tenant by design',
      desc: 'Schema-per-tenant architecture means your data is fully isolated. Enterprise-grade from day one.',
      color: 'ht-violet',
    },
  ];

  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-screen-xl">
        <div className="text-center mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-ht-cyan">Everything you need</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mt-3 mb-4">
            One platform.
            <br />
            <span className="bg-grad-warm bg-clip-text text-transparent">Every superpower.</span>
          </h2>
          <p className="text-ht-soft max-w-2xl mx-auto">
            From your first trek listing to a custom-domain agency website, every tool you need is here.
            No plugins, no integrations, no headaches.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {features.map(({ icon: Icon, title, desc, color }) => (
            <div
              key={title}
              className="group bg-ht-surface border border-ht-border rounded-xl2 p-6 hover:border-ht-violet/40 hover:shadow-card-hover transition-all"
            >
              <div className={`w-12 h-12 rounded-xl bg-${color}/15 border border-${color}/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                <Icon className={`w-6 h-6 text-${color}`} />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">{title}</h3>
              <p className="text-sm text-ht-soft leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ShowcaseStrip() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-grad-surface border-y border-ht-border">
      <div className="mx-auto max-w-screen-xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <Stat n="10 min" label="Average time to first publish" />
          <Stat n="3" label="Beautifully crafted themes" />
          <Stat n="∞" label="Tours, treks, activities" />
          <Stat n="0%" label="Egress fees on media" />
        </div>
      </div>
    </section>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <div className="font-mono text-4xl sm:text-5xl font-medium bg-grad-primary bg-clip-text text-transparent">{n}</div>
      <div className="text-sm text-ht-soft mt-2">{label}</div>
    </div>
  );
}

function ThemeShowcase() {
  const themes = [
    { name: 'Adventure Bold', tagline: 'For trekking & expedition outfits', grad: 'from-ht-violet to-ht-coral', icon: '🏔️' },
    { name: 'Serene Journey', tagline: 'For wellness & yoga retreats', grad: 'from-ht-cyan to-ht-lime', icon: '🧘' },
    { name: 'Heritage Classic', tagline: 'For cultural & historical tours', grad: 'from-ht-coral to-ht-rose', icon: '🏛️' },
  ];
  return (
    <section id="themes" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-screen-xl">
        <div className="text-center mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-ht-coral">Themes</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mt-3 mb-4">
            Pick a vibe.
            <br />
            <span className="bg-grad-cool bg-clip-text text-transparent">Make it yours.</span>
          </h2>
          <p className="text-ht-soft max-w-xl mx-auto">
            Three production-ready themes, each with full control over colors, fonts, sections, and layout.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {themes.map((t) => (
            <div key={t.name} className="bg-ht-surface border border-ht-border rounded-xl2 overflow-hidden hover:border-ht-violet/40 transition-all group">
              <div className={`aspect-video bg-gradient-to-br ${t.grad} relative flex items-center justify-center`}>
                <span className="text-6xl group-hover:scale-110 transition-transform">{t.icon}</span>
                <div className="absolute inset-0 bg-gradient-to-t from-ht-ink/40 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold mb-1">{t.name}</h3>
                <p className="text-sm text-ht-soft">{t.tagline}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BuilderSection() {
  const steps = [
    { n: '01', title: 'Sign up', desc: 'Create your account, verify with a 6-digit OTP, and you\'re in.' },
    { n: '02', title: 'Tell us about your agency', desc: 'Company name, year established, countries you serve.' },
    { n: '03', title: 'Add your products', desc: 'Build tours, treks, activities, packages with drag-and-drop itineraries.' },
    { n: '04', title: 'Pick a theme & publish', desc: 'Your site goes live at agency.hamrotourist.com instantly.' },
    { n: '05', title: 'Connect your domain', desc: 'On Pro, point your own domain and we handle SSL automatically.' },
  ];
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 border-y border-ht-border">
      <div className="mx-auto max-w-screen-xl grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-ht-lime">How it works</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mt-3 mb-4">
            From signup to live website
            <br />
            in <span className="bg-grad-warm bg-clip-text text-transparent">10 minutes.</span>
          </h2>
          <p className="text-ht-soft mb-8">
            No engineering, no agency fees, no waiting. Just a beautiful, fast site
            that converts visitors into bookings.
          </p>
          <a
            href={`${APP_URL}/auth?mode=signup`}
            className="inline-flex items-center gap-2 bg-grad-primary text-white font-semibold rounded-full px-7 py-3 hover:shadow-glow-violet hover:scale-[1.02] transition-all"
          >
            Get started — free <ArrowRight className="w-4 h-4" />
          </a>
        </div>
        <div className="space-y-3">
          {steps.map((s) => (
            <div key={s.n} className="flex gap-5 p-5 rounded-xl2 bg-ht-surface border border-ht-border">
              <div className="font-mono text-3xl bg-grad-primary bg-clip-text text-transparent shrink-0">{s.n}</div>
              <div>
                <h4 className="font-display text-lg font-semibold mb-1">{s.title}</h4>
                <p className="text-sm text-ht-soft">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      blurb: 'Perfect to launch your first agency website',
      features: ['5 countries', '3 regions per country', '1 team member', 'Hamro Tourist subdomain', 'All 3 themes', 'Built-in CRM'],
      cta: 'Start free',
      featured: false,
    },
    {
      name: 'Pro',
      price: '$29',
      suffix: '/month',
      blurb: 'For growing agencies ready to scale',
      features: ['Unlimited countries', 'Unlimited regions', '5 team members', 'Custom domain', 'Custom HTML/CSS', 'API access', 'Priority support'],
      cta: 'Start Pro trial',
      featured: true,
    },
    {
      name: 'Scale',
      price: '$99',
      suffix: '/month',
      blurb: 'For multi-brand operators and chains',
      features: ['Everything in Pro', 'Multi-brand white-label', 'Unlimited team members', 'White-label admin (admin.yourcompany.com)', 'SLA + dedicated support'],
      cta: 'Talk to sales',
      featured: false,
    },
  ];
  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-screen-xl">
        <div className="text-center mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-ht-violet">Pricing</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mt-3 mb-4">
            Pay for growth, not for trying.
          </h2>
          <p className="text-ht-soft max-w-xl mx-auto">Start free. Upgrade when your agency scales. No surprise fees, ever.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`rounded-xl3 p-8 border transition-all ${
                p.featured
                  ? 'bg-grad-surface border-ht-violet shadow-glow-violet relative'
                  : 'bg-ht-surface border-ht-border'
              }`}
            >
              {p.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-grad-warm text-white text-xs font-mono">
                  MOST POPULAR
                </div>
              )}
              <h3 className="font-display text-2xl font-bold mb-1">{p.name}</h3>
              <p className="text-sm text-ht-soft mb-6">{p.blurb}</p>
              <div className="mb-6">
                <span className="font-mono text-5xl font-medium">{p.price}</span>
                {p.suffix && <span className="text-ht-soft">{p.suffix}</span>}
              </div>
              <a
                href={`${APP_URL}/auth?mode=signup`}
                className={`block text-center py-3 rounded-full font-semibold transition-all ${
                  p.featured
                    ? 'bg-grad-primary text-white hover:shadow-glow-violet'
                    : 'border border-ht-border text-ht-soft hover:border-ht-violet hover:text-ht-text'
                }`}
              >
                {p.cta}
              </a>
              <ul className="mt-8 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-ht-soft">
                    <Check className="w-4 h-4 text-ht-lime shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
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
      q: 'What happens if I outgrow the free plan?',
      a: 'Just upgrade — all your data stays put, and your site doesn\'t go down. We never lock you out of data you\'ve already added.',
    },
    {
      q: 'Do I need to know how to code?',
      a: 'Not at all. The product builder, website editor, and CRM are all drag-and-drop. Custom HTML/CSS injection is available on Pro for those who want it.',
    },
    {
      q: 'Can I take payments?',
      a: 'Booking & payments via Stripe and eSewa/Khalti are coming in our Phase 8 release. For now, leads go into the CRM and you handle payments your existing way.',
    },
  ];
  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 border-y border-ht-border">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-ht-cyan">FAQ</span>
          <h2 className="font-display text-4xl font-bold mt-3">Questions, answered.</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="group bg-ht-surface border border-ht-border rounded-xl2 p-6 cursor-pointer hover:border-ht-violet/40 transition-all">
              <summary className="font-display text-lg font-semibold list-none flex items-center justify-between">
                {f.q}
                <span className="ml-4 text-ht-violet group-open:rotate-45 transition-transform text-2xl leading-none">+</span>
              </summary>
              <p className="mt-3 text-ht-soft text-sm leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-ht-violet rounded-full blur-3xl animate-pulse-glow" />
      </div>
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-5xl sm:text-6xl font-bold leading-tight mb-6">
          Your agency website is
          <br />
          <span className="bg-grad-primary bg-clip-text text-transparent">10 minutes away.</span>
        </h2>
        <p className="text-ht-soft text-lg mb-10">Free forever. No credit card. No surprises.</p>
        <a
          href={`${APP_URL}/auth?mode=signup`}
          className="group inline-flex items-center gap-2 bg-grad-primary text-white font-semibold rounded-full px-10 py-4 text-lg hover:shadow-glow-violet hover:scale-[1.02] transition-all"
        >
          Get started — free
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-ht-border py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-screen-xl flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-grad-primary flex items-center justify-center">
            <Mountain className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-semibold">Hamro Tourist</span>
        </div>
        <p className="text-xs text-ht-text-faint font-mono">© 2026 Hamro Tourist · Built with ❤️ for travel agencies</p>
        <div className="flex gap-5 text-xs text-ht-soft">
          <a href={`${APP_URL}/auth?mode=login`} className="hover:text-ht-text">Sign in</a>
          <a href={`${APP_URL}/auth?mode=signup`} className="hover:text-ht-text">Sign up</a>
        </div>
      </div>
    </footer>
  );
}
