'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'How long does it take to set up?',
    a: 'Most agencies are live in under 10 minutes. Sign up, describe your agency, our AI builds the site, you publish — done.',
  },
  {
    q: 'Can I use my own domain like myagency.com?',
    a: 'Yes. On the Pro plan you can connect any domain in 2 clicks. We handle SSL, hosting and CDN automatically.',
  },
  {
    q: 'Do I need to know how to code?',
    a: 'Never. Everything is drag-and-drop, with an AI that designs, writes and tweaks for you.',
  },
  {
    q: 'Can I take payments?',
    a: 'Yes. Accept deposits or full payments online. Auto-receipts, refunds and reconciliation included.',
  },
  {
    q: 'What about vendors and CRM?',
    a: 'Manage guides, hotels and transport, and track every customer from first inquiry to TripAdvisor review — all from one dashboard.',
  },
  {
    q: 'Is my data safe?',
    a: 'Bank-grade encryption, isolated tenant data, daily backups. Export anything, any time.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-24 bg-background">
      <div className="max-w-3xl mx-auto px-5 lg:px-8">
        <div className="text-center">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">FAQ</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Questions, <span className="text-gradient">answered.</span>
          </h2>
        </div>
        <div className="mt-10 space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left"
              >
                <span className="font-semibold text-foreground">{f.q}</span>
                <ChevronDown
                  className={`h-5 w-5 text-muted-foreground transition shrink-0 ${open === i ? 'rotate-180' : ''}`}
                />
              </button>
              <motion.div
                initial={false}
                animate={{ height: open === i ? 'auto' : 0, opacity: open === i ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="px-5 pb-5 text-muted-foreground">{f.a}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
