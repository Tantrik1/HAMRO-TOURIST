'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, TrendingUp, DollarSign, ArrowDown, ArrowUp, Building2, CreditCard, ArrowRight, Receipt } from 'lucide-react';

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

export default function Finance() {
  const [showDetails, setShowDetails] = useState(false);

  const transactions = [
    { id: 1, type: 'income', name: 'Everest Booking', amount: '$2,400', date: 'May 12', status: 'Completed' },
    { id: 2, type: 'expense', name: 'Guide Payment', amount: '$800', date: 'May 11', status: 'Completed' },
    { id: 3, type: 'income', name: 'Annapurna Trek', amount: '$1,800', date: 'May 10', status: 'Pending' },
    { id: 4, type: 'expense', name: 'Hotel Booking', amount: '$1,200', date: 'May 9', status: 'Completed' },
  ];

  return (
    <section className="relative bg-[#0F1420] py-16 lg:py-24 overflow-hidden">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute bottom-1/4 left-1/3 h-[500px] w-[600px] rounded-full opacity-15 blur-[120px]" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-5 lg:px-8 relative">
        <motion.div
          className="text-center mb-12 lg:mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 text-xs font-semibold text-emerald-400 mb-6">
            <Wallet size={12} /> Financial Management
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="font-display text-balance text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4"
            style={{ letterSpacing: '-0.03em' }}
          >
            Manage Finances, Payments & <span className="text-gradient">Vendors Easily</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-[#8892A8] max-w-2xl mx-auto"
          >
            Complete financial visibility — track revenue, expenses, and vendor payments in one dashboard
          </motion.p>
        </motion.div>

        {/* Financial Overview Cards */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants} className="rounded-2xl border border-white/[0.06] bg-[#161C2E] p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <TrendingUp size={18} className="text-emerald-400" />
              </div>
              <span className="text-[10px] text-emerald-400 font-medium">+24%</span>
            </div>
            <div className="text-2xl font-bold text-foreground">$48.2k</div>
            <div className="text-[10px] text-[#8892A8]">Total Revenue</div>
          </motion.div>

          <motion.div variants={itemVariants} className="rounded-2xl border border-white/[0.06] bg-[#161C2E] p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="h-10 w-10 rounded-xl bg-[#F07420]/10 flex items-center justify-center">
                <DollarSign size={18} className="text-[#F07420]" />
              </div>
              <span className="text-[10px] text-[#8892A8] font-medium">This month</span>
            </div>
            <div className="text-2xl font-bold text-foreground">$12.4k</div>
            <div className="text-[10px] text-[#8892A8]">Total Expenses</div>
          </motion.div>

          <motion.div variants={itemVariants} className="rounded-2xl border border-white/[0.06] bg-[#161C2E] p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="h-10 w-10 rounded-xl bg-[#3A4D8F]/10 flex items-center justify-center">
                <ArrowUp size={18} className="text-[#3A4D8F]" />
              </div>
              <span className="text-[10px] text-[#8892A8] font-medium">Net</span>
            </div>
            <div className="text-2xl font-bold text-foreground">$35.8k</div>
            <div className="text-[10px] text-[#8892A8]">Net Profit</div>
          </motion.div>

          <motion.div variants={itemVariants} className="rounded-2xl border border-white/[0.06] bg-[#161C2E] p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="h-10 w-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <Building2 size={18} className="text-purple-400" />
              </div>
              <span className="text-[10px] text-[#8892A8] font-medium">Active</span>
            </div>
            <div className="text-2xl font-bold text-foreground">8</div>
            <div className="text-[10px] text-[#8892A8]">Vendors</div>
          </motion.div>
        </motion.div>

        {/* Transactions & Vendors */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-6"
        >
          {/* Recent Transactions */}
          <div className="rounded-2xl border border-white/[0.06] bg-[#161C2E] p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground">Recent Transactions</h3>
              <button onClick={() => setShowDetails(!showDetails)} className="text-[10px] text-[#F07420] font-medium hover:underline">
                View All
              </button>
            </div>
            <div className="space-y-2">
              {transactions.slice(0, showDetails ? transactions.length : 3).map((t) => (
                <div key={t.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <div className="flex items-center gap-3">
                    <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${t.type === 'income' ? 'bg-emerald-500/10' : 'bg-[#F07420]/10'}`}>
                      {t.type === 'income' ? <ArrowUp size={14} className="text-emerald-400" /> : <ArrowDown size={14} className="text-[#F07420]" />}
                    </div>
                    <div>
                      <div className="text-xs font-medium text-foreground">{t.name}</div>
                      <div className="text-[10px] text-[#8892A8]">{t.date}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-xs font-semibold ${t.type === 'income' ? 'text-emerald-400' : 'text-[#F07420]'}`}>{t.amount}</div>
                    <div className="text-[10px] text-[#8892A8]">{t.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vendor Payments */}
          <div className="rounded-2xl border border-white/[0.06] bg-[#161C2E] p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground">Vendor Payments</h3>
              <span className="text-[10px] text-[#8892A8]">3 pending</span>
            </div>
            <div className="space-y-2">
              {[
                { name: 'Mountain Guides', amount: '$2,400', due: 'May 15', status: 'Pending' },
                { name: 'Hotel Partners', amount: '$1,800', due: 'May 18', status: 'Pending' },
                { name: 'Transport Co.', amount: '$600', due: 'May 20', status: 'Pending' },
              ].map((vendor, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-[#F07420]/20 transition cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-white/[0.05] flex items-center justify-center">
                      <Building2 size={14} className="text-[#8892A8]" />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-foreground">{vendor.name}</div>
                      <div className="text-[10px] text-[#8892A8]">Due: {vendor.due}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-xs font-semibold text-foreground">{vendor.amount}</div>
                    <button className="h-6 w-6 rounded bg-[#F07420] flex items-center justify-center">
                      <CreditCard size={10} className="text-white" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button className="flex items-center gap-2 w-full rounded-xl bg-white/[0.05] border border-white/[0.06] text-foreground px-4 py-3 text-xs font-semibold hover:bg-white/[0.08] transition mt-4">
              <Receipt size={14} />
              Generate Invoice
              <ArrowRight size={12} className="ml-auto" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
