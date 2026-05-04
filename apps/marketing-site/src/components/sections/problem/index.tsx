'use client';

import { motion } from 'framer-motion';
import { fadeUp } from '@/components/animations';

export default function Problem() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="rounded-3xl overflow-hidden shadow-elegant border border-border bg-gradient-to-br from-muted to-background">
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&auto=format&fit=crop&q=80"
              alt="Travel agency owner working on laptop"
              width={1200}
              height={900}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.span variants={fadeUp} className="text-sm font-semibold text-accent uppercase tracking-wider">
            The problem
          </motion.span>
          <motion.h2 variants={fadeUp} className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Most travel agency owners <span className="text-gradient">hit the same wall.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-5 text-muted-foreground text-lg">
            You want a website. But developers cost ₨100,000+. Agencies want even more. Templates
            feel cheap. WhatsApp gets messy. And by the time it&apos;s live, your competitors
            already booked your customers.
          </motion.p>
          <motion.ul variants={fadeUp} className="mt-6 space-y-3">
            {[
              'Developer quotes that scare you',
              'Months of back and forth',
              'No way to manage payments or vendors',
              'Customers slipping into messy WhatsApp threads',
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 text-foreground">
                <span className="mt-1 h-5 w-5 rounded-full bg-destructive/10 text-destructive grid place-items-center text-xs font-bold shrink-0">
                  ✕
                </span>
                {t}
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}
