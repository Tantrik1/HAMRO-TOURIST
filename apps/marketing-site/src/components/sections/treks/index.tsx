'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const treks = [
  {
    name: 'Everest Base Camp',
    img: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop&q=80',
    region: 'Everest Region',
    price: 'From ₨45,000',
  },
  {
    name: 'Annapurna Circuit',
    img: 'https://images.unsplash.com/photo-1506905920876-44cf4b5f167b?w=800&auto=format&fit=crop&q=80',
    region: 'Annapurna',
    price: 'From ₨38,000',
  },
  {
    name: 'Chitwan Safari',
    img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&auto=format&fit=crop&q=80',
    region: 'Chitwan',
    price: 'From ₨22,000',
  },
];

export default function Treks() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">
              Built for Nepal · loved worldwide
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              Sites your customers will <span className="text-gradient-accent">actually book on.</span>
            </h2>
          </div>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {treks.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="group rounded-3xl overflow-hidden bg-card border border-border shadow-card-soft hover:shadow-elegant transition-all"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={t.img}
                  alt={t.name}
                  width={800}
                  height={600}
                  loading="lazy"
                  className="h-full w-full object-cover group-hover:scale-110 transition duration-700"
                />
                <div className="absolute top-3 left-3 rounded-full bg-background/90 backdrop-blur px-3 py-1 text-xs font-semibold">
                  {t.region}
                </div>
              </div>
              <div className="p-5 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-foreground">{t.name}</h3>
                  <p className="text-sm text-muted-foreground">{t.price}</p>
                </div>
                <ArrowRight className="h-5 w-5 text-accent group-hover:translate-x-1 transition" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
