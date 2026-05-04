'use client';

import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, BookOpen } from 'lucide-react';

export default function CTA() {
  return (
    <section id="cta" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 30%, white 0%, transparent 40%), radial-gradient(circle at 80% 70%, white 0%, transparent 40%)',
        }}
      />
      <div className="relative max-w-4xl mx-auto px-5 lg:px-8 text-center text-primary-foreground">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-background/15 backdrop-blur px-4 py-1.5 text-xs font-semibold border border-primary-foreground/20">
            <Sparkles className="h-3.5 w-3.5" /> Limited: 10% off · 8 spots remaining
          </span>
          <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05]">
            Your agency. Online. Today.
          </h2>
          <p className="mt-5 text-lg text-primary-foreground/90 max-w-2xl mx-auto">
            10 minutes from now, you could be taking your first online booking. Free forever — no
            credit card needed. धन्यवाद!
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full bg-background text-foreground px-7 py-4 font-semibold shadow-glow hover:scale-105 transition"
            >
              Get started free <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#resources"
              className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/40 px-7 py-4 font-semibold hover:bg-background/10 transition"
            >
              <BookOpen className="h-4 w-4" /> Watch the demo
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
