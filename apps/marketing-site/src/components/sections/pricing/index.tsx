'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, ArrowRight, Zap, Star, Crown, Sparkles, TrendingUp } from 'lucide-react';

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

export default function Pricing() {
  const [annual, setAnnual] = useState(true);

  const plans = [
    {
      name: 'Starter',
      price: annual ? 49 : 59,
      description: 'Perfect for small agencies getting started',
      icon: Star,
      color: '#3A4D8F',
      features: [
        '1 Website',
        'Up to 100 bookings/month',
        'Basic CRM',
        'Email support',
        'Standard templates',
        'Stripe integration',
      ],
      notIncluded: ['AI website builder', 'Custom domain', 'Priority support', 'Advanced analytics'],
      popular: false,
    },
    {
      name: 'Professional',
      price: annual ? 99 : 119,
      description: 'For growing travel agencies',
      icon: Zap,
      color: '#F07420',
      features: [
        '5 Websites',
        'Unlimited bookings',
        'Advanced CRM',
        'Priority support',
        'All premium templates',
        'AI website builder',
        'Custom domain',
        'Advanced analytics',
        'eSewa & Khalti integration',
      ],
      notIncluded: ['White-label solution', 'API access', 'Dedicated account manager'],
      popular: true,
    },
    {
      name: 'Enterprise',
      price: annual ? 249 : 299,
      description: 'For large agencies and chains',
      icon: Crown,
      color: '#8B5CF6',
      features: [
        'Unlimited websites',
        'Unlimited bookings',
        'White-label solution',
        'Dedicated account manager',
        'API access',
        'Custom integrations',
        '24/7 phone support',
        'Advanced analytics & reporting',
        'Training & onboarding',
        'Custom payment gateways',
      ],
      notIncluded: [],
      popular: false,
    },
  ];

  return (
    <section className="relative bg-[#090C14] py-16 lg:py-24 overflow-hidden">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/3 h-[500px] w-[600px] rounded-full opacity-15 blur-[120px]" style={{ background: 'radial-gradient(circle, rgba(240,116,32,0.1) 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/3 right-1/3 h-[400px] w-[500px] rounded-full opacity-10 blur-[100px]" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-5 lg:px-8 relative">
        <motion.div
          className="text-center mb-12 lg:mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 rounded-full border border-[#F07420]/20 bg-[#F07420]/5 px-4 py-1.5 text-xs font-semibold text-[#F07420] mb-6">
            <Sparkles size={12} /> Pricing
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="font-display text-balance text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4"
            style={{ letterSpacing: '-0.03em' }}
          >
            Simple, Transparent <span className="text-gradient">Pricing</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-[#8892A8] max-w-2xl mx-auto"
          >
            Choose the plan that fits your agency. No hidden fees, cancel anytime.
          </motion.p>

          {/* Billing Toggle */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-3 mt-8"
          >
            <span className={`text-sm ${!annual ? 'text-foreground' : 'text-[#8892A8]'}`}>Monthly</span>
            <button
              onClick={() => setAnnual(!annual)}
              className={`relative h-7 w-14 rounded-full transition-colors ${annual ? 'bg-[#F07420]' : 'bg-white/[0.1]'}`}
            >
              <motion.div
                className="absolute top-1 h-5 w-5 rounded-full bg-white"
                animate={{ x: annual ? 28 : 4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              />
            </button>
            <span className={`text-sm ${annual ? 'text-foreground' : 'text-[#8892A8]'}`}>Annual <span className="text-[#F07420] font-semibold">-20%</span></span>
          </motion.div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className={`relative rounded-2xl border p-6 transition-all ${
                plan.popular
                  ? 'border-[#F07420] bg-[#F07420]/5 shadow-lg shadow-[#F07420]/10'
                  : 'border-white/[0.06] bg-[#161C2E] hover:border-white/[0.12]'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="rounded-full bg-[#F07420] px-4 py-1 text-[10px] font-semibold text-white">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Icon */}
              <div className={`h-14 w-14 rounded-xl flex items-center justify-center mb-4`} style={{ background: `${plan.color}15` }}>
                <plan.icon size={24} style={{ color: plan.color }} />
              </div>

              {/* Name & Price */}
              <div className="mb-4">
                <h3 className="text-lg font-bold text-foreground mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-foreground">${plan.price}</span>
                  <span className="text-sm text-[#8892A8]">/month</span>
                </div>
                <p className="text-xs text-[#8892A8] mt-1">{plan.description}</p>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-6">
                {plan.features.map((feature, j) => (
                  <div key={j} className="flex items-start gap-2">
                    <Check size={14} className="text-emerald-400 mt-0.5 shrink-0" />
                    <span className="text-xs text-[#8892A8]">{feature}</span>
                  </div>
                ))}
                {plan.notIncluded.map((feature, j) => (
                  <div key={j} className="flex items-start gap-2">
                    <X size={14} className="text-[#8892A8]/50 mt-0.5 shrink-0" />
                    <span className="text-xs text-[#8892A8]/50">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button
                className={`w-full rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                  plan.popular
                    ? 'bg-[#F07420] text-white hover:brightness-110'
                    : 'bg-white/[0.05] border border-white/[0.06] text-foreground hover:bg-white/[0.08]'
                }`}
              >
                Get Started
                <ArrowRight size={14} className="ml-auto inline" />
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-[#8892A8]"
        >
          <div className="flex items-center gap-2">
            <Check size={14} className="text-emerald-400" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <Check size={14} className="text-emerald-400" />
            <span>14-day free trial</span>
          </div>
          <div className="flex items-center gap-2">
            <Check size={14} className="text-emerald-400" />
            <span>Cancel anytime</span>
          </div>
          <div className="flex items-center gap-2">
            <Check size={14} className="text-emerald-400" />
            <span>24/7 support</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
