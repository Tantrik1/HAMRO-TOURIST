'use client';

import { motion } from 'framer-motion';
import { Bot, Globe, CreditCard, Building2, Users, Mail, Palette, ShieldCheck } from 'lucide-react';
import { fadeUp } from '@/components/animations';

const features = [
  { icon: Bot, title: 'AI builds your site', desc: "Don't pick a template. Describe your vibe and our AI designs a fully custom website — instantly publishable." },
  { icon: Globe, title: 'Connect yourdomain.com', desc: 'Bring your own domain in two clicks. SSL, hosting and CDN — all handled for you.' },
  { icon: CreditCard, title: 'Payments, sorted', desc: 'Accept deposits and full payments online. Auto-receipts, refunds and reconciliation built in.' },
  { icon: Building2, title: 'Vendor management', desc: 'Track guides, hotels and transport vendors. Assign trips, share itineraries, settle invoices.' },
  { icon: Users, title: 'Full CRM', desc: 'From the first inquiry to the post-trip review — every customer interaction in one timeline.' },
  { icon: Mail, title: 'Email & newsletter automation', desc: 'Onboarding flows, follow-ups, TripAdvisor review nudges and seasonal newsletters — on autopilot.' },
  { icon: Palette, title: 'Unlimited custom themes', desc: 'Not just 3 themes. Generate infinite designs with AI and tweak any pixel — no code.' },
  { icon: ShieldCheck, title: 'Secure by default', desc: 'Enterprise-grade security. Your customer data is isolated, encrypted and exportable any time.' },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-gradient-soft">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="max-w-3xl"
        >
          <motion.span variants={fadeUp} className="text-sm font-semibold text-accent uppercase tracking-wider">
            Everything in one place
          </motion.span>
          <motion.h2 variants={fadeUp} className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Built for agencies. Powered by <span className="text-gradient-accent">AI.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-lg text-muted-foreground">
            Replace 5 different tools with one simple platform. Save thousands on developers and
            agencies.
          </motion.p>
        </motion.div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              whileHover={{ y: -6 }}
              className="group rounded-2xl bg-card border border-border p-6 shadow-card-soft hover:shadow-elegant transition-all"
            >
              <div className="h-12 w-12 rounded-xl bg-gradient-primary grid place-items-center shadow-elegant group-hover:scale-110 transition">
                <f.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="mt-5 font-bold text-foreground text-lg">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
