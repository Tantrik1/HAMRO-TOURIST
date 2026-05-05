'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Check, ArrowRight, Globe, Lock, Zap, ChevronRight } from 'lucide-react';

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

export default function Payments() {
  const [selected, setSelected] = useState('esewa');
  const [processing, setProcessing] = useState(false);

  const gateways = [
    { id: 'esewa', name: 'eSewa', image: '/payments/esewa.png', desc: 'Nepal\'s favorite' },
    { id: 'khalti', name: 'Khalti', image: '/payments/khalti.webp', desc: 'Digital wallet' },
    { id: 'fonepay', name: 'Fonepay', image: '/payments/fonepay.webp', desc: 'QR payments' },
    { id: 'visa', name: 'Visa', image: '/payments/VISA.webp', desc: 'Global card' },
    { id: 'mastercard', name: 'Mastercard', image: '/payments/mastercard.jpg', desc: 'Worldwide' },
    { id: 'paypal', name: 'PayPal', image: '/payments/paypal.jpg', desc: 'Secure online' },
  ];

  const handlePayment = () => {
    setProcessing(true);
    setTimeout(() => setProcessing(false), 2000);
  };

  return (
    <section className="relative bg-[#090C14] py-16 lg:py-24 overflow-hidden">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/3 h-[500px] w-[600px] rounded-full opacity-15 blur-[120px]" style={{ background: 'radial-gradient(circle, rgba(99,91,255,0.1) 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/4 left-1/3 h-[400px] w-[500px] rounded-full opacity-10 blur-[100px]" style={{ background: 'radial-gradient(circle, rgba(240,116,32,0.08) 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-5 lg:px-8 relative">
        <motion.div
          className="text-center mb-12 lg:mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 rounded-full border border-[#635BFF]/20 bg-[#635BFF]/5 px-4 py-1.5 text-xs font-semibold text-[#635BFF] mb-6">
            <CreditCard size={12} /> Payment Integrations
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="font-display text-balance text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4"
            style={{ letterSpacing: '-0.03em' }}
          >
            Integrate Your Payment or <span className="text-gradient">Stripe/eSewa/Khalti</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-[#8892A8] max-w-2xl mx-auto"
          >
            Accept payments from anywhere — global gateways or local favorites, all seamlessly integrated
          </motion.p>
        </motion.div>

        {/* Payment Gateways */}
        <motion.div
          className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {gateways.map((gw) => (
            <motion.button
              key={gw.id}
              onClick={() => setSelected(gw.id)}
              className={`relative group flex flex-col items-center p-4 sm:p-5 rounded-2xl border transition-all ${
                selected === gw.id
                  ? 'border-[#F07420] bg-[#F07420]/10 shadow-lg shadow-[#F07420]/10'
                  : 'border-white/[0.06] bg-[#161C2E] hover:border-white/[0.12] hover:bg-[#1c2439]'
              }`}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.97 }}
            >
              {selected === gw.id && (
                <motion.div
                  layoutId="selected-check"
                  className="absolute top-2 right-2 h-5 w-5 rounded-full bg-[#F07420] flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  <Check size={10} className="text-white" />
                </motion.div>
              )}
              <div className="relative h-10 w-20 sm:h-12 sm:w-24 mb-3 flex items-center justify-center">
                <img
                  src={gw.image}
                  alt={gw.name}
                  className="h-full w-full object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                  draggable={false}
                />
              </div>
              <div className="text-xs sm:text-sm font-semibold text-foreground mb-0.5">{gw.name}</div>
              <div className="text-[10px] text-[#8892A8]">{gw.desc}</div>
            </motion.button>
          ))}
        </motion.div>

        {/* Interactive Payment Demo */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="rounded-2xl border border-white/[0.06] bg-[#161C2E] p-6 sm:p-8">
            {/* Demo Header */}
            <div className="flex items-center gap-2 mb-6">
              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] text-[#8892A8]">Interactive Payment Demo</span>
            </div>

            {/* Payment Form */}
            <div className="space-y-4">
              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#8892A8] mb-2 block">Booking Amount</label>
                <div className="flex items-center gap-2">
                  <div className="text-4xl font-bold text-foreground">$1,200.00</div>
                  <span className="text-[10px] text-[#8892A8]">USD</span>
                </div>
              </div>

              {/* Selected Gateway */}
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-16 rounded-xl bg-white flex items-center justify-center p-1">
                      <img
                        src={gateways.find(g => g.id === selected)?.image}
                        alt={gateways.find(g => g.id === selected)?.name}
                        className="h-full w-full object-contain"
                        draggable={false}
                      />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">{gateways.find(g => g.id === selected)?.name}</div>
                      <div className="text-[10px] text-[#8892A8]">Secure payment processing</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lock size={14} className="text-[#8892A8]" />
                    <span className="text-[10px] text-[#8892A8]">Encrypted</span>
                  </div>
                </div>

                {/* Progress Bar */}
                {processing && (
                  <motion.div className="mt-4">
                    <div className="h-2 rounded-full bg-white/[0.1] overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-[#F07420]"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 2, ease: 'easeInOut' }}
                      />
                    </div>
                    <div className="text-[10px] text-[#8892A8] mt-2 text-center">Processing payment...</div>
                  </motion.div>
                )}
              </div>

              {/* Payment Button */}
              <button
                onClick={handlePayment}
                disabled={processing}
                className={`flex items-center gap-2 w-full rounded-xl px-4 py-4 text-sm font-semibold transition-all ${
                  processing
                    ? 'bg-[#161C2E] text-[#8892A8] cursor-not-allowed'
                    : 'bg-[#F07420] text-white hover:brightness-110'
                }`}
              >
                {processing ? (
                  <>
                    <Zap size={16} className="animate-pulse" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard size={16} />
                    Pay with {gateways.find(g => g.id === selected)?.name}
                    <ArrowRight size={14} className="ml-auto" />
                  </>
                )}
              </button>

              {/* Security Badges */}
              <div className="flex items-center justify-center gap-4 pt-2">
                <div className="flex items-center gap-1 text-[10px] text-[#8892A8]">
                  <Lock size={12} /> SSL Secured
                </div>
                <div className="flex items-center gap-1 text-[10px] text-[#8892A8]">
                  <Globe size={12} /> PCI Compliant
                </div>
              </div>
            </div>

            {/* Custom Gateway CTA */}
            <div className="mt-6 pt-6 border-t border-white/[0.06]">
              <button className="flex items-center gap-2 w-full rounded-xl bg-white/[0.05] border border-white/[0.06] text-foreground px-4 py-3 text-xs font-semibold hover:bg-white/[0.08] transition">
                <Globe size={14} />
                Add Custom Payment Gateway
                <ChevronRight size={12} className="ml-auto" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
