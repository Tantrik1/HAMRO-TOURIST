'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  X,
  ArrowRight,
  Zap,
  Shield,
  Clock,
  TrendingUp,
  Rocket,
  DollarSign,
  Puzzle,
  Users,
  Monitor,
  Building2,
  Wrench,
  Scale,
  ChevronDown,
  Crown,
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const competitors = [
  { key: 'saas', label: 'Other SaaS', short: 'Other SaaS', sub: 'Generic tools' },
  { key: 'dev', label: 'Hiring a Developer', short: 'Developer', sub: 'Custom build' },
  { key: 'agency', label: 'Hiring an Agency', short: 'Agency', sub: 'Full service' },
];

const features = [
  {
    icon: Rocket,
    name: 'Setup Time',
    hamro: { label: 'Instant', desc: 'Ready in minutes with no technical skills needed.' },
    saas: { label: 'Medium', desc: 'You must configure multiple plugins and templates.' },
    dev: { label: 'Months', desc: 'Long development, testing, and debugging phases.' },
    agency: { label: 'Slow', desc: 'Requires kickoff meetings, design approvals, and drafts.' },
  },
  {
    icon: DollarSign,
    name: 'Initial Cost',
    hamro: { label: 'Low', desc: 'Fixed and highly affordable monthly/yearly subscription.' },
    saas: { label: 'Medium', desc: 'Moderate base fee, but adds up with add-ons.' },
    dev: { label: 'Very High', desc: 'High upfront cost for coding and creation.' },
    agency: { label: 'Extravagant', desc: 'Significant retainer and setup costs.' },
  },
  {
    icon: Puzzle,
    name: 'Integration Effort',
    hamro: { label: 'Zero', desc: 'Payments, CRM, and website are already connected.' },
    saas: { label: 'Moderate-High', desc: 'You have to link third-party tools via keys.' },
    dev: { label: 'High', desc: 'Requires building custom APIs and webhooks.' },
    agency: { label: 'High', desc: 'Requires project management and maintenance retainers.' },
  },
  {
    icon: Users,
    name: 'CRM & Leads',
    hamro: { label: 'Built-in', desc: 'Visual Kanban board and lead pipeline tailored for travel.' },
    saas: { label: 'Generic', desc: 'You have to adapt an external CRM for tours.' },
    dev: { label: 'Custom', desc: 'Needs to be designed from the ground up.' },
    agency: { label: 'External', desc: 'Often involves managing third-party tools like HubSpot.' },
  },
  {
    icon: Monitor,
    name: 'Website & Themes',
    hamro: { label: 'Travel-specific', desc: 'Conversion-optimized, fast, and needs no coding.' },
    saas: { label: 'Varies', desc: 'Generic templates require heavy tweaking.' },
    dev: { label: 'Built from scratch', desc: 'Every element must be manually created.' },
    agency: { label: 'Custom design', desc: 'Great but comes with a hefty price tag.' },
  },
  {
    icon: TrendingUp,
    name: 'Financial Tracking',
    hamro: { label: 'Live P&L', desc: 'Calculates costs and profit margin per booking.' },
    saas: { label: 'Basic', desc: 'Lacks specific, tourism-related margin trackers.' },
    dev: { label: 'Custom build', desc: 'Must be integrated into your accounting software.' },
    agency: { label: 'Manual', desc: 'Requires regular spreadsheets and external reports.' },
  },
  {
    icon: Building2,
    name: 'Vendor Management',
    hamro: { label: 'Integrated', desc: 'Track porters, guides, and hotels in one system.' },
    saas: { label: 'None', desc: 'Requires external software like a separate vendor portal.' },
    dev: { label: 'Custom build', desc: 'Requires specific module development.' },
    agency: { label: 'None', desc: 'Not typically included in standard marketing sites.' },
  },
  {
    icon: Users,
    name: 'Team Collaboration',
    hamro: { label: 'Role-Based', desc: 'Specific portals for sales, operations, and finance.' },
    saas: { label: 'Varies', desc: 'May require higher-tier pricing for team seats.' },
    dev: { label: 'Custom build', desc: 'Needs user-authentication and access control.' },
    agency: { label: 'Basic', desc: 'You might just get an email login or simple access.' },
  },
  {
    icon: Wrench,
    name: 'Maintenance & Support',
    hamro: { label: 'All-in-One', desc: 'Dedicated updates and reliable customer support.' },
    saas: { label: 'Varies', desc: "Depends on the vendor's SLA and pricing tier." },
    dev: { label: 'Hourly rate', desc: 'You pay for every bug fix or change.' },
    agency: { label: 'Expensive', desc: 'Billed per hour or through a monthly retainer.' },
  },
  {
    icon: Scale,
    name: 'Scalability',
    hamro: { label: 'Seamless', desc: 'Grows with your agency without complex upgrades.' },
    saas: { label: 'Moderate', desc: 'You may need to upgrade plans to add features.' },
    dev: { label: 'High', desc: 'But requires additional development hours.' },
    agency: { label: 'High', desc: 'But changes take time to implement.' },
  },
];

function ScoreBadge({ score, total }: { score: number; total: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-lg font-bold text-emerald-400">{score}</span>
      <span className="text-xs text-[#8892A8]">/ {total}</span>
    </div>
  );
}

export default function Comparison() {
  const [mobileCompetitor, setMobileCompetitor] = useState<'saas' | 'dev' | 'agency'>('saas');
  const [openMobileCard, setOpenMobileCard] = useState<number | null>(0);

  const competitor = competitors.find((c) => c.key === mobileCompetitor)!;

  return (
    <section className="relative bg-[#0F1420] py-16 lg:py-24 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute bottom-1/4 left-1/4 h-[500px] w-[600px] rounded-full opacity-15 blur-[120px]" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)' }} />
        <div className="absolute top-1/4 right-1/4 h-[400px] w-[500px] rounded-full opacity-10 blur-[100px]" style={{ background: 'radial-gradient(circle, rgba(240,116,32,0.08) 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-5 lg:px-8 relative">
        {/* Header */}
        <motion.div
          className="text-center mb-12 lg:mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 text-xs font-semibold text-emerald-400 mb-6">
            <TrendingUp size={12} /> The Ultimate Value Comparison
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="font-display text-balance text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4"
            style={{ letterSpacing: '-0.03em' }}
          >
            Why <span className="text-gradient">Hamro Tourist</span> Wins
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-[#8892A8] max-w-2xl mx-auto"
          >
            Side-by-side on 10 key elements that matter most to your travel agency.
          </motion.p>
        </motion.div>

        {/* Mobile Competitor Selector */}
        <div className="lg:hidden mb-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {competitors.map((c) => (
              <button
                key={c.key}
                onClick={() => setMobileCompetitor(c.key as any)}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-all border ${
                  mobileCompetitor === c.key
                    ? 'bg-[#F07420]/10 border-[#F07420]/30 text-[#F07420]'
                    : 'bg-white/[0.03] border-white/[0.06] text-[#8892A8]'
                }`}
              >
                vs {c.short}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-[#8892A8] mt-1">Compare Hamro Tourist against: <span className="text-foreground font-medium">{competitor.label}</span></p>
        </div>

        {/* Desktop Table */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="hidden lg:block rounded-2xl border border-white/[0.06] bg-[#161C2E]/60 backdrop-blur-sm overflow-hidden"
        >
          {/* Table Header */}
          <div className="grid grid-cols-[1.2fr_1fr_1fr_1fr_1fr] border-b border-white/[0.06]">
            <div className="p-5 border-r border-white/[0.06] flex items-center">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8892A8]">Feature / Aspect</span>
            </div>
            <div className="p-5 border-r border-white/[0.06] bg-[#F07420]/[0.04]">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#F07420] to-[#e05a00] flex items-center justify-center shadow-lg shadow-[#F07420]/20">
                  <Crown size={16} className="text-white" />
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">Hamro Tourist</div>
                  <div className="text-[10px] text-[#F07420] font-medium">All-in-one platform</div>
                </div>
              </div>
            </div>
            {competitors.map((c) => (
              <div key={c.key} className="p-5 border-r border-white/[0.06] last:border-r-0">
                <div className="flex items-center gap-2.5">
                  <div className="h-9 w-9 rounded-xl bg-white/[0.06] flex items-center justify-center border border-white/[0.06]">
                    <X size={16} className="text-[#8892A8]" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground">{c.short}</div>
                    <div className="text-[10px] text-[#8892A8]">{c.sub}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Feature Rows */}
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="grid grid-cols-[1.2fr_1fr_1fr_1fr_1fr] border-b border-white/[0.06] last:border-0 group hover:bg-white/[0.02] transition-colors"
            >
              <div className="p-5 border-r border-white/[0.06] flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-white/[0.05] border border-white/[0.06] flex items-center justify-center shrink-0">
                  <feature.icon size={16} className="text-[#F07420]" />
                </div>
                <span className="text-sm font-semibold text-foreground">{feature.name}</span>
              </div>
              <div className="p-5 border-r border-white/[0.06] bg-[#F07420]/[0.03] relative">
                <div className="absolute left-0 top-4 bottom-4 w-[3px] rounded-r-full bg-gradient-to-b from-[#F07420] to-[#F07420]/40" />
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-5 w-5 rounded-full bg-emerald-500/15 flex items-center justify-center">
                    <Check size={10} className="text-emerald-400" />
                  </div>
                  <span className="text-xs font-bold text-emerald-400">{feature.hamro.label}</span>
                </div>
                <p className="text-[11px] text-[#8892A8] leading-relaxed pl-7">{feature.hamro.desc}</p>
              </div>
              <div className="p-5 border-r border-white/[0.06]">
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-5 w-5 rounded-full bg-white/[0.05] flex items-center justify-center">
                    <X size={10} className="text-[#8892A8]/60" />
                  </div>
                  <span className="text-xs font-semibold text-[#8892A8]">{(feature as any).saas.label}</span>
                </div>
                <p className="text-[11px] text-[#8892A8]/70 leading-relaxed pl-7">{(feature as any).saas.desc}</p>
              </div>
              <div className="p-5 border-r border-white/[0.06]">
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-5 w-5 rounded-full bg-white/[0.05] flex items-center justify-center">
                    <X size={10} className="text-[#8892A8]/60" />
                  </div>
                  <span className="text-xs font-semibold text-[#8892A8]">{(feature as any).dev.label}</span>
                </div>
                <p className="text-[11px] text-[#8892A8]/70 leading-relaxed pl-7">{(feature as any).dev.desc}</p>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-5 w-5 rounded-full bg-white/[0.05] flex items-center justify-center">
                    <X size={10} className="text-[#8892A8]/60" />
                  </div>
                  <span className="text-xs font-semibold text-[#8892A8]">{(feature as any).agency.label}</span>
                </div>
                <p className="text-[11px] text-[#8892A8]/70 leading-relaxed pl-7">{(feature as any).agency.desc}</p>
              </div>
            </motion.div>
          ))}

          {/* Score Row */}
          <div className="grid grid-cols-[1.2fr_1fr_1fr_1fr_1fr] border-t border-white/[0.06] bg-white/[0.02]">
            <div className="p-5 border-r border-white/[0.06] flex items-center">
              <span className="text-xs font-bold text-foreground uppercase tracking-wider">Total Score</span>
            </div>
            <div className="p-5 border-r border-white/[0.06] bg-[#F07420]/[0.04]">
              <ScoreBadge score={10} total={10} />
            </div>
            {competitors.map((c) => (
              <div key={c.key} className="p-5 border-r border-white/[0.06] last:border-r-0">
                <ScoreBadge score={0} total={10} />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Mobile / Tablet Card View */}
        <div className="lg:hidden space-y-4">
          {features.map((feature, i) => {
            const isOpen = openMobileCard === i;
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                className="rounded-2xl border border-white/[0.06] bg-[#161C2E]/60 backdrop-blur-sm overflow-hidden"
              >
                <button
                  onClick={() => setOpenMobileCard(isOpen ? null : i)}
                  className="w-full p-5 flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-white/[0.05] border border-white/[0.06] flex items-center justify-center shrink-0">
                      <feature.icon size={16} className="text-[#F07420]" />
                    </div>
                    <span className="text-sm font-semibold text-foreground">{feature.name}</span>
                  </div>
                  <ChevronDown size={16} className={`text-[#8892A8] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 space-y-3">
                        {/* Hamro */}
                        <div className="rounded-xl bg-gradient-to-r from-[#F07420]/10 to-transparent border border-[#F07420]/15 p-4 relative">
                          <div className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full bg-gradient-to-b from-[#F07420] to-[#F07420]/30" />
                          <div className="flex items-center gap-2 mb-1">
                            <div className="h-5 w-5 rounded-full bg-emerald-500/15 flex items-center justify-center">
                              <Check size={10} className="text-emerald-400" />
                            </div>
                            <span className="text-xs font-bold text-emerald-400">Hamro Tourist</span>
                            <span className="ml-auto text-[10px] font-bold text-[#F07420] bg-[#F07420]/10 px-2 py-0.5 rounded-full">WINNER</span>
                          </div>
                          <p className="text-xs text-[#8892A8] leading-relaxed pl-7">{feature.hamro.desc}</p>
                        </div>
                        {/* Competitor */}
                        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="h-5 w-5 rounded-full bg-white/[0.06] flex items-center justify-center border border-white/[0.06]">
                              <X size={10} className="text-[#8892A8]/60" />
                            </div>
                            <span className="text-xs font-semibold text-[#8892A8]">{competitor.label}</span>
                          </div>
                          <p className="text-xs text-[#8892A8]/70 leading-relaxed pl-7">{(feature as any)[mobileCompetitor].desc}</p>
                        </div>
                        {/* Other two */}
                        {competitors
                          .filter((c) => c.key !== mobileCompetitor)
                          .map((c) => (
                            <div key={c.key} className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-4 opacity-70">
                              <div className="flex items-center gap-2 mb-1">
                                <div className="h-5 w-5 rounded-full bg-white/[0.04] flex items-center justify-center border border-white/[0.04]">
                                  <X size={10} className="text-[#8892A8]/40" />
                                </div>
                                <span className="text-xs font-semibold text-[#8892A8]/70">{c.label}</span>
                              </div>
                              <p className="text-xs text-[#8892A8]/50 leading-relaxed pl-7">{(feature as any)[c.key].desc}</p>
                            </div>
                          ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Score Summary Bar */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-10 lg:mt-12"
        >
          <motion.div variants={itemVariants} className="rounded-2xl border border-white/[0.06] bg-[#161C2E]/60 backdrop-blur-sm p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h3 className="text-lg font-bold text-foreground mb-1">The Clear Winner</h3>
                <p className="text-sm text-[#8892A8]">Hamro Tourist scores a perfect 10/10 across every metric that matters.</p>
              </div>
              <div className="flex items-center gap-4 lg:gap-8">
                <div className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-emerald-400">10<span className="text-sm text-[#8892A8]">/10</span></div>
                  <div className="text-[10px] text-[#8892A8] mt-0.5">Hamro Tourist</div>
                </div>
                <div className="h-8 w-px bg-white/[0.06]" />
                <div className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-[#8892A8]">0<span className="text-sm text-[#8892A8]/50">/10</span></div>
                  <div className="text-[10px] text-[#8892A8] mt-0.5">Others</div>
                </div>
              </div>
            </div>
            {/* Progress Bars */}
            <div className="mt-6 space-y-3">
              {[
                { label: 'Hamro Tourist', score: 10, color: 'from-[#F07420] to-[#e05a00]' },
                { label: 'Other SaaS', score: 2, color: 'from-[#3A4D8F] to-[#2a3a6f]' },
                { label: 'Hiring a Developer', score: 1, color: 'from-[#3A4D8F]/60 to-[#2a3a6f]/60' },
                { label: 'Hiring an Agency', score: 1, color: 'from-[#3A4D8F]/40 to-[#2a3a6f]/40' },
              ].map((bar) => (
                <div key={bar.label} className="flex items-center gap-3">
                  <span className="text-xs text-[#8892A8] w-32 lg:w-40 shrink-0 truncate">{bar.label}</span>
                  <div className="flex-1 h-2 rounded-full bg-white/[0.04] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(bar.score / 10) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                      className={`h-full rounded-full bg-gradient-to-r ${bar.color}`}
                    />
                  </div>
                  <span className="text-xs font-semibold text-foreground w-8 text-right">{bar.score}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Key Benefits */}
        <motion.div
          className="grid sm:grid-cols-3 gap-4 mt-10 lg:mt-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { icon: Zap, title: '10x Faster Setup', desc: 'Launch in minutes, not months. Zero technical skills required.' },
            { icon: Shield, title: 'Bank-level Security', desc: 'Encrypted data, secure payments, and reliable cloud infrastructure.' },
            { icon: Clock, title: 'Save 20+ Hours/Week', desc: 'Automate bookings, CRM, and finances so you can focus on growth.' },
          ].map((benefit, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="rounded-2xl border border-white/[0.06] bg-[#161C2E]/60 backdrop-blur-sm p-5 text-center hover:bg-white/[0.03] transition-colors"
            >
              <div className="h-12 w-12 rounded-xl bg-[#F07420]/10 flex items-center justify-center mx-auto mb-4 border border-[#F07420]/10">
                <benefit.icon size={20} className="text-[#F07420]" />
              </div>
              <div className="text-base font-bold text-foreground mb-1">{benefit.title}</div>
              <div className="text-xs text-[#8892A8] leading-relaxed">{benefit.desc}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <button className="group flex items-center gap-2 mx-auto rounded-full bg-gradient-to-r from-[#F07420] to-[#3A4D8F] text-white px-8 py-4 text-sm font-semibold hover:brightness-110 transition-all hover:scale-105 shadow-lg shadow-[#F07420]/20">
            <Zap size={16} />
            Get Started Free
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
