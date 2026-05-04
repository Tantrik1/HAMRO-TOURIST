'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    q: 'Got my first online booking in 3 days. I was losing customers to agencies with websites — not anymore.',
    a: 'Rajesh K.',
    r: 'Himalayan Adventures · Pokhara',
  },
  {
    q: 'Setup took 8 minutes. WhatsApp chaos turned into a clean CRM and the AI even wrote my homepage.',
    a: 'Sita M.',
    r: 'Nepal Cultural Tours · Kathmandu',
  },
  {
    q: 'Custom domain was the game-changer. Clients trust mybrand.com way more than a Facebook page.',
    a: 'Bikash T.',
    r: 'Chitwan Wildlife · Chitwan',
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-gradient-soft">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="max-w-3xl">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">
            Real agencies. Real results.
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Loved by <span className="text-gradient">growing agencies.</span>
          </h2>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {testimonials.map((x, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-3xl bg-card border border-border p-7 shadow-card-soft"
            >
              <div className="flex gap-0.5 text-accent">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-4 text-foreground leading-relaxed">&ldquo;{x.q}&rdquo;</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-primary grid place-items-center text-primary-foreground font-bold">
                  {x.a[0]}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{x.a}</p>
                  <p className="text-xs text-muted-foreground">{x.r}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
