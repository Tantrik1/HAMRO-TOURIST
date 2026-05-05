'use client';

import { motion } from 'framer-motion';
import { Gift, CheckCircle2, ArrowRight, Zap, Shield, Star, Clock } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function FinalOffer() {
  return (
    <section className="relative bg-[#090C14] py-16 lg:py-24 overflow-hidden">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[900px] rounded-full opacity-20 blur-[150px]" style={{ background: 'radial-gradient(circle, rgba(240,116,32,0.15) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 h-[500px] w-[600px] rounded-full opacity-10 blur-[120px]" style={{ background: 'radial-gradient(circle, rgba(58,77,143,0.1) 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-5 lg:px-8 relative">
        <motion.div
          className="rounded-3xl border border-[#F07420]/30 bg-gradient-to-br from-[#F07420]/10 via-[#161C2E] to-[#0F1420] p-8 sm:p-12 lg:p-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 rounded-full border border-[#F07420]/30 bg-[#F07420]/20 px-4 py-2 text-xs font-semibold text-[#F07420] mb-6">
            <Gift size={12} /> Limited Time Offer
          </motion.div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div variants={itemVariants}>
              <h2 className="font-display text-balance text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4" style={{ letterSpacing: '-0.03em' }}>
                Start Your Journey <span className="text-gradient">Today</span>
              </h2>
              <p className="text-base sm:text-lg text-[#8892A8] mb-6">
                Get everything you need to run a successful travel agency. No technical skills required.
              </p>

              {/* Benefits */}
              <div className="space-y-3 mb-8">
                {[
                  '3 months free on annual plans',
                  'Free website setup assistance',
                  '14-day money-back guarantee',
                  '24/7 priority support',
                  'Access to all premium templates',
                  'Unlimited bookings & features',
                ].map((benefit, i) => (
                  <motion.div key={i} variants={itemVariants} className="flex items-center gap-3">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                    <span className="text-sm text-[#8892A8]">{benefit}</span>
                  </motion.div>
                ))}
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-4 text-xs text-[#8892A8]">
                <div className="flex items-center gap-1.5">
                  <Shield size={12} className="text-[#8892A8]" />
                  <span>Bank-level security</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Star size={12} className="text-[#8892A8]" fill="currentColor" />
                  <span>4.9/5 rating</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={12} className="text-[#8892A8]" />
                  <span>Setup in 10 min</span>
                </div>
              </div>
            </motion.div>

            {/* CTA Card */}
            <motion.div variants={itemVariants} className="rounded-2xl border border-white/[0.06] bg-[#161C2E] p-6 sm:p-8">
              <div className="text-center mb-6">
                <div className="text-4xl sm:text-5xl font-bold text-foreground mb-2">
                  <span className="text-[#8892A8] line-through text-2xl sm:text-3xl">$119</span>
                  <span className="text-[#F07420]">$99</span>
                  <span className="text-sm text-[#8892A8]">/month</span>
                </div>
                <div className="text-xs text-[#8892A8]">Professional plan · Billed annually</div>
              </div>

              <button className="flex items-center justify-center gap-2 w-full rounded-xl bg-gradient-to-r from-[#F07420] to-[#3A4D8F] text-white px-6 py-4 text-sm font-semibold hover:brightness-110 transition-all hover:scale-105 mb-4">
                <Zap size={18} />
                Start Free Trial
                <ArrowRight size={14} />
              </button>

              <div className="space-y-2 text-center text-xs text-[#8892A8]">
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle2 size={10} className="text-emerald-400" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle2 size={10} className="text-emerald-400" />
                  <span>Cancel anytime</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Clock size={10} className="text-[#8892A8]" />
                  <span>Offer expires in 48 hours</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Social Proof */}
          <motion.div
            variants={itemVariants}
            className="mt-12 pt-8 border-t border-white/[0.06] text-center"
          >
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-[#8892A8] mb-3">
              <span>Join</span>
              <span className="font-semibold text-foreground">500+</span>
              <span>travel agencies already growing with Hamro Tourist</span>
            </div>
            <div className="flex items-center justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill="currentColor" className="text-[#F07420]" />
              ))}
              <span className="text-xs text-[#8892A8] ml-2">Based on 200+ reviews</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
