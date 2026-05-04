'use client';

import { motion } from 'framer-motion';

const rows = [
  ['Cost', 'Free → ₨999/mo', '₨50,000+', '₨100,000+'],
  ['Setup time', '10 minutes', '2–6 months', '3–6 months'],
  ['AI custom design', 'Unlimited', '—', '—'],
  ['Custom domain', 'Included', 'Extra', 'Extra'],
  ['CRM + payments', 'Built in', '—', '—'],
  ['Vendor management', 'Built in', '—', '—'],
  ['Email automation', 'Built in', '—', '—'],
];

export default function Comparison() {
  return (
    <section className="py-24 bg-gradient-soft">
      <div className="max-w-6xl mx-auto px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl"
        >
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">The honest comparison</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Why pay more for <span className="text-gradient">less?</span>
          </h2>
        </motion.div>
        <div className="mt-12 overflow-hidden rounded-3xl border border-border shadow-elegant bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[600px]">
              <thead>
                <tr className="bg-gradient-primary text-primary-foreground">
                  <th className="text-left p-5 font-semibold">Feature</th>
                  <th className="text-left p-5 font-semibold">Hamro Tourist</th>
                  <th className="text-left p-5 font-semibold opacity-90">Hire a developer</th>
                  <th className="text-left p-5 font-semibold opacity-90">Hire an agency</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} className={i % 2 ? 'bg-secondary/40' : ''}>
                    <td className="p-5 font-medium text-foreground">{r[0]}</td>
                    <td className="p-5 font-semibold text-accent">{r[1]}</td>
                    <td className="p-5 text-muted-foreground">{r[2]}</td>
                    <td className="p-5 text-muted-foreground">{r[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
