'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: 'रू 0',
    per: 'forever',
    desc: 'Launch your first agency website.',
    cta: 'Start free',
    features: ['Subdomain on hamrotourist.com', 'AI-generated themes', 'Built-in CRM', '1 team member'],
    highlight: false,
  },
  {
    name: 'Pro',
    price: 'रू 999',
    per: '/month',
    desc: 'For growing agencies ready to scale.',
    cta: 'Start Pro',
    features: [
      'Custom domain (yourdomain.com)',
      'Unlimited AI custom designs',
      'Payments + vendor management',
      'Email & newsletter automation',
      '5 team members',
      'Priority support',
    ],
    highlight: true,
  },
  {
    name: 'Scale',
    price: 'रू 1,999',
    per: '/month',
    desc: 'For multi-brand & chain operators.',
    cta: 'Talk to sales',
    features: ['Everything in Pro', 'Multi-brand white-label', 'Unlimited team members', 'API access', 'Dedicated success manager'],
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-gradient-soft">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">Pricing</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Simple pricing. <span className="text-gradient">No surprises.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Start free. Upgrade when you&apos;re ready. Get{' '}
            <span className="font-semibold text-accent">10% off your first year</span> — only 8
            spots left.
          </p>
        </div>
        <div className="mt-14 grid lg:grid-cols-3 gap-6">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`relative rounded-3xl p-8 border transition-all ${
                p.highlight
                  ? 'bg-gradient-primary text-primary-foreground border-transparent shadow-elegant scale-[1.02]'
                  : 'bg-card border-border shadow-card-soft'
              }`}
            >
              {p.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-accent text-accent-foreground px-4 py-1 text-xs font-bold shadow-glow">
                  MOST POPULAR
                </span>
              )}
              <h3 className={`text-xl font-bold ${p.highlight ? 'text-primary-foreground' : 'text-foreground'}`}>
                {p.name}
              </h3>
              <p className={`mt-1 text-sm ${p.highlight ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                {p.desc}
              </p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-bold">{p.price}</span>
                <span className={`text-sm ${p.highlight ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                  {p.per}
                </span>
              </div>
              <a
                href="#cta"
                className={`mt-6 inline-flex w-full items-center justify-center rounded-full px-5 py-3 font-semibold transition ${
                  p.highlight
                    ? 'bg-background text-foreground hover:bg-accent hover:text-accent-foreground'
                    : 'bg-gradient-primary text-primary-foreground hover:shadow-glow'
                }`}
              >
                {p.cta}
              </a>
              <ul className="mt-7 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className={`h-4 w-4 mt-0.5 ${p.highlight ? 'text-accent-glow' : 'text-accent'}`} />
                    <span className={p.highlight ? 'text-primary-foreground/90' : 'text-foreground'}>{f}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
