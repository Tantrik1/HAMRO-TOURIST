'use client';

import { motion } from 'framer-motion';
import { Rocket, Bot, Palette, Globe, Zap } from 'lucide-react';

const steps = [
  { n: '01', title: 'Sign up', desc: '30 seconds. No card.', icon: Rocket },
  { n: '02', title: 'Tell our AI', desc: 'Describe your agency, regions and vibe.', icon: Bot },
  { n: '03', title: 'Pick or generate a design', desc: 'Infinite themes — fully customizable.', icon: Palette },
  { n: '04', title: 'Connect your domain', desc: 'yourdomain.com — live in 2 clicks.', icon: Globe },
  { n: '05', title: 'Go live', desc: "Start taking bookings before tea is cold.", icon: Zap },
];

export default function HowItWorks() {
  return (
    <section id="how" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="max-w-3xl">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">How it works</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            From idea to live website — <span className="text-gradient">in 5 simple steps.</span>
          </h2>
        </div>
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-5 gap-5">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative rounded-2xl bg-card border border-border p-6 shadow-card-soft"
            >
              <div className="text-xs font-mono font-bold text-accent">{s.n}</div>
              <s.icon className="mt-3 h-7 w-7 text-primary" />
              <h3 className="mt-3 font-bold text-foreground">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
