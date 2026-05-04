'use client';

import { motion } from 'framer-motion';
import { Rocket, Palette, Sparkles, Globe, MessageCircle, Repeat, Clock, ArrowRight } from 'lucide-react';

const items = [
  { title: 'Set up your agency in 10 minutes', desc: 'A walk-through from sign up to live website.', time: '10 min', icon: Rocket },
  { title: 'How to choose the perfect theme', desc: 'Match your design to the trips you sell.', time: '6 min', icon: Palette },
  { title: 'Get the most out of Hamro Tourist', desc: 'AI tricks, automations and workflows.', time: '8 min', icon: Sparkles },
  { title: 'Selling internationally from Nepal', desc: 'Pricing, payments and trust signals.', time: '12 min', icon: Globe },
  { title: 'Automate reviews & TripAdvisor', desc: 'Turn happy customers into 5-star reviews.', time: '5 min', icon: MessageCircle },
  { title: 'Vendor & payment workflows', desc: 'Pay guides on time, every time.', time: '7 min', icon: Repeat },
];

export default function Resources() {
  return (
    <section id="resources" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="max-w-3xl">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">Resources</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Free guides & videos to <span className="text-gradient-accent">grow faster.</span>
          </h2>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((r, i) => (
            <motion.a
              key={r.title}
              href="#"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="group rounded-2xl bg-card border border-border p-6 shadow-card-soft hover:shadow-elegant transition-all flex flex-col"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-accent grid place-items-center">
                  <r.icon className="h-4 w-4 text-accent-foreground" />
                </div>
                <span className="text-xs font-semibold text-muted-foreground inline-flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {r.time}
                </span>
              </div>
              <h3 className="mt-4 font-bold text-foreground">{r.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{r.desc}</p>
              <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                Watch now <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
