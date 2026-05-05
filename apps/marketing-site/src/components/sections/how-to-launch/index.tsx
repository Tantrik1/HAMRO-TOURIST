'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, CheckCircle, ArrowRight, User, Layout, Globe, CreditCard, Zap, Sparkles, Clock, ArrowDown, Lock as LockIcon } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
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

const contentVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -4, transition: { duration: 0.2 } },
};

export default function HowToLaunch() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const steps = [
    {
      id: 1,
      icon: User,
      title: 'Create Your Account',
      description: 'Sign up in 30 seconds with just your email and business name',
      component: <Step1Demo />,
      duration: '30 seconds',
    },
    {
      id: 2,
      icon: Layout,
      title: 'Choose Your Template',
      description: 'Select from premium templates or let AI build one for you',
      component: <Step2Demo />,
      duration: '2 minutes',
    },
    {
      id: 3,
      icon: Globe,
      title: 'Customize Your Website',
      description: 'Add your content, images, and branding with our drag-and-drop editor',
      component: <Step3Demo />,
      duration: '5 minutes',
    },
    {
      id: 4,
      icon: CreditCard,
      title: 'Set Up Payments',
      description: 'Connect Stripe, eSewa, Khalti or your custom gateway',
      component: <Step4Demo />,
      duration: '2 minutes',
    },
    {
      id: 5,
      icon: Rocket,
      title: 'Launch & Go Live',
      description: 'One click to publish your website and start accepting bookings',
      component: <Step5Demo />,
      duration: 'Instant',
    },
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
      }
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <section className="relative bg-[#0F1420] py-16 lg:py-24 overflow-hidden">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-full opacity-15 blur-[150px]" style={{ background: 'radial-gradient(circle, rgba(240,116,32,0.1) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-0 h-[400px] w-[500px] rounded-full opacity-10 blur-[100px]" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)' }} />
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
            <Rocket size={12} /> Quick Start
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="font-display text-balance text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4"
            style={{ letterSpacing: '-0.03em' }}
          >
            5 Steps to Launch Your <span className="text-gradient">Travel Agency Website</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-[#8892A8] max-w-2xl mx-auto"
          >
            From sign-up to live website in under 10 minutes — no technical skills required
          </motion.p>
        </motion.div>

        {/* Step Progress */}
        <motion.div
          className="mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            {steps.map((step, i) => (
              <div key={step.id} className="flex-1 flex items-center">
                <div className="flex flex-col items-center">
                  <motion.button
                    onClick={() => setCurrentStep(i)}
                    className={`h-12 w-12 rounded-full flex items-center justify-center transition-all ${
                      currentStep === i
                        ? 'bg-[#F07420] text-white shadow-lg shadow-[#F07420]/30'
                        : completedSteps.includes(i)
                        ? 'bg-emerald-500 text-white'
                        : 'bg-[#161C2E] text-[#8892A8] border border-white/[0.06]'
                    }`}
                    whileHover={{ scale: currentStep !== i ? 1.05 : 1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {completedSteps.includes(i) ? <CheckCircle size={18} /> : <step.icon size={18} />}
                  </motion.button>
                  <div className={`text-[10px] mt-2 font-medium ${currentStep === i ? 'text-[#F07420]' : completedSteps.includes(i) ? 'text-emerald-400' : 'text-[#8892A8]'}`}>
                    {step.duration}
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <div className="flex-1 h-[2px] mx-2">
                    <motion.div
                      className="h-full bg-[#F07420]"
                      initial={{ width: completedSteps.includes(i) ? '100%' : '0%' }}
                      animate={{ width: completedSteps.includes(i) ? '100%' : currentStep === i ? '50%' : '0%' }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="max-w-5xl mx-auto"
          >
            <div className="rounded-2xl border border-white/[0.06] bg-[#161C2E] overflow-hidden">
              {/* Step Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
                <div className="flex items-center gap-4">
                  <div className={`h-14 w-14 rounded-xl flex items-center justify-center ${currentStep === steps.length - 1 ? 'bg-[#F07420]' : 'bg-[#3A4D8F]'}`}>
                    {React.createElement(steps[currentStep].icon, { size: 24, className: 'text-white' })}
                  </div>
                  <div>
                    <div className="text-lg font-bold text-foreground">Step {currentStep + 1}: {steps[currentStep].title}</div>
                    <div className="text-sm text-[#8892A8]">{steps[currentStep].description}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-[#8892A8]" />
                  <span className="text-xs text-[#8892A8]">{steps[currentStep].duration}</span>
                </div>
              </div>

              {/* Demo Component */}
              <div className="p-6">
                {steps[currentStep].component}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between p-6 border-t border-white/[0.06]">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
                    currentStep === 0
                      ? 'text-[#8892A8] cursor-not-allowed'
                      : 'text-foreground hover:bg-white/[0.05]'
                  }`}
                >
                  <ArrowDown size={14} className="rotate-90" />
                  Previous
                </button>
                <button
                  onClick={nextStep}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition ${
                    currentStep === steps.length - 1
                      ? 'bg-emerald-500 text-white hover:brightness-110'
                      : 'bg-[#F07420] text-white hover:brightness-110'
                  }`}
                >
                  {currentStep === steps.length - 1 ? (
                    <>
                      <Rocket size={14} />
                      Launch Now
                    </>
                  ) : (
                    <>
                      Next Step
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Total Time */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-6 py-3">
            <Zap size={16} className="text-emerald-400" />
            <span className="text-sm font-semibold text-emerald-400">Total Time: Under 10 Minutes</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ========== STEP DEMO COMPONENTS ========== */

function Step1Demo() {
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <label className="text-[10px] uppercase tracking-wider text-[#8892A8] mb-2 block">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.06] text-foreground placeholder:text-[#8892A8] focus:outline-none focus:border-[#F07420]/50 transition"
          />
        </div>
        <div>
          <label className="text-[10px] uppercase tracking-wider text-[#8892A8] mb-2 block">Business Name</label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Himalayan Adventures"
            className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.06] text-foreground placeholder:text-[#8892A8] focus:outline-none focus:border-[#F07420]/50 transition"
          />
        </div>
        <button className="flex items-center gap-2 w-full rounded-xl bg-[#F07420] text-white px-4 py-3 text-sm font-semibold hover:brightness-110 transition">
          <User size={16} />
          Create Account
          <ArrowRight size={14} className="ml-auto" />
        </button>
      </div>
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={14} className="text-[#F07420]" />
          <span className="text-xs font-semibold text-[#F07420]">Why Hamro Tourist?</span>
        </div>
        <ul className="space-y-2">
          {['No credit card required', 'Free 14-day trial', 'Cancel anytime', '24/7 support'].map((item, i) => (
            <li key={i} className="flex items-center gap-2 text-[10px] text-[#8892A8]">
              <CheckCircle size={12} className="text-emerald-400" />
              {item}
            </li>
        ))}
        </ul>
      </div>
    </div>
  );
}

function Step2Demo() {
  const [selected, setSelected] = useState(0);
  const templates = [
    { name: 'Adventure', color: '#3A4D8F', preview: 'bg-gradient-to-br from-[#3A4D8F] to-[#2A3B7A]' },
    { name: 'Safari', color: '#10B981', preview: 'bg-gradient-to-br from-[#10B981] to-[#059669]' },
    { name: 'Cultural', color: '#F07420', preview: 'bg-gradient-to-br from-[#F07420] to-[#D65A0F]' },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-3">
        {templates.map((t, i) => (
          <motion.button
            key={i}
            onClick={() => setSelected(i)}
            className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all ${
              selected === i ? 'border-[#F07420] bg-[#F07420]/10' : 'border-white/[0.06] bg-white/[0.03] hover:border-white/[0.12]'
            }`}
            whileHover={{ scale: 1.01 }}
          >
            <div className={`h-12 w-12 rounded-lg ${t.preview}`} />
            <span className="text-sm font-medium text-foreground">{t.name}</span>
            {selected === i && <CheckCircle size={16} className="text-[#F07420]" />}
          </motion.button>
        ))}
        <button className="flex items-center gap-2 w-full rounded-xl bg-[#3A4D8F] text-white px-4 py-3 text-sm font-semibold hover:brightness-110 transition">
          <Sparkles size={16} />
          Generate with AI
        </button>
      </div>
      <div className="rounded-xl border border-white/[0.06] bg-[#161C2E] p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-2 w-2 rounded-full bg-emerald-400" />
          <span className="text-[10px] text-[#8892A8]">Live Preview</span>
        </div>
        <div className={`h-48 rounded-lg ${templates[selected].preview} flex items-center justify-center`}>
          <Globe size={32} className="text-white/80" />
        </div>
      </div>
    </div>
  );
}

function Step3Demo() {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-foreground">Hero Section</span>
          <span className="text-[10px] text-[#8892A8]">Drag to reorder</span>
        </div>
        <div className="space-y-2">
          {['Main Title', 'Description', 'CTA Button', 'Background Image'].map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.08] transition cursor-move">
              <ArrowDown size={12} className="text-[#8892A8]" />
              <span className="text-xs text-[#8892A8]">{item}</span>
              <div className="ml-auto h-6 w-6 rounded bg-[#F07420]/10 flex items-center justify-center">
                <Zap size={10} className="text-[#F07420]" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {['Add Section', 'Upload Image', 'Edit Content'].map((action, i) => (
          <button key={i} className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs text-[#8892A8] hover:bg-white/[0.06] transition">
            <Layout size={14} />
            {action}
          </button>
        ))}
      </div>
    </div>
  );
}

function Step4Demo() {
  const [selected, setSelected] = useState('stripe');
  const gateways = [
    { id: 'stripe', name: 'Stripe', color: '#635BFF' },
    { id: 'esewa', name: 'eSewa', color: '#00A651' },
    { id: 'khalti', name: 'Khalti', color: '#5C2D91' },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-3">
        {gateways.map((gw) => (
          <motion.button
            key={gw.id}
            onClick={() => setSelected(gw.id)}
            className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all ${
              selected === gw.id ? 'border-[#F07420] bg-[#F07420]/10' : 'border-white/[0.06] bg-white/[0.03] hover:border-white/[0.12]'
            }`}
            whileHover={{ scale: 1.01 }}
          >
            <div className="h-10 w-10 rounded-lg flex items-center justify-center" style={{ background: `${gw.color}15` }}>
              <CreditCard size={16} style={{ color: gw.color }} />
            </div>
            <span className="text-sm font-medium text-foreground">{gw.name}</span>
            {selected === gw.id && <CheckCircle size={16} className="text-[#F07420]" />}
          </motion.button>
        ))}
        <button className="flex items-center gap-2 w-full rounded-xl bg-white/[0.05] border border-white/[0.06] text-foreground px-4 py-3 text-xs font-semibold hover:bg-white/[0.08] transition">
          <Globe size={14} />
          Add Custom Gateway
        </button>
      </div>
      <div className="rounded-xl border border-white/[0.06] bg-[#161C2E] p-4">
        <div className="flex items-center gap-2 mb-3">
          <LockIcon size={14} className="text-[#8892A8]" />
          <span className="text-[10px] text-[#8892A8]">Secure Connection</span>
        </div>
        <div className="h-32 rounded-lg bg-white/[0.03] flex items-center justify-center">
          <div className="text-center">
            <CheckCircle size={32} className="text-emerald-400 mb-2 mx-auto" />
            <div className="text-xs text-[#8892A8]">{gateways.find(g => g.id === selected)?.name} Connected</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Step5Demo() {
  const [launched, setLaunched] = useState(false);

  return (
    <div className="text-center space-y-6">
      {!launched ? (
        <>
          <div className="h-32 rounded-xl border border-white/[0.06] bg-white/[0.03] flex items-center justify-center">
            <Rocket size={40} className="text-[#F07420]" />
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground mb-2">Ready to Launch?</div>
            <div className="text-sm text-[#8892A8]">Your website is configured and ready to go live</div>
          </div>
          <button
            onClick={() => setLaunched(true)}
            className="flex items-center gap-2 mx-auto rounded-xl bg-gradient-to-r from-[#F07420] to-emerald-500 text-white px-8 py-4 text-sm font-semibold hover:brightness-110 transition"
          >
            <Rocket size={18} />
            Launch Website
            <ArrowRight size={14} />
          </button>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-4"
        >
          <div className="h-32 rounded-xl border border-emerald-500/20 bg-emerald-500/5 flex items-center justify-center">
            <CheckCircle size={40} className="text-emerald-400" />
          </div>
          <div>
            <div className="text-2xl font-bold text-emerald-400 mb-2">🎉 Website Live!</div>
            <div className="text-sm text-[#8892A8]">Your website is now live and accepting bookings</div>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#F07420]/20 bg-[#F07420]/5 px-4 py-2 text-xs font-semibold text-[#F07420]">
            <Globe size={12} />
            Visit yourcompany.com
          </div>
        </motion.div>
      )}
    </div>
  );
}
