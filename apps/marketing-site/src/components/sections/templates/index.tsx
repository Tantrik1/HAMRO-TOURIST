'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout, Palette, Wand2, ArrowRight, Check, Sparkles, Eye, Star } from 'lucide-react';

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

export default function Templates() {
  const [selected, setSelected] = useState(0);
  const [aiMode, setAiMode] = useState(false);

  const templates = [
    {
      name: 'Mountain Explorer',
      tagline: 'Trekking & Adventure',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
      accent: '#3A4D8F',
      features: ['Hero video background', 'Itinerary cards', 'Booking CTA', 'Guide profiles'],
    },
    {
      name: 'Safari Wild',
      tagline: 'Wildlife Tours',
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80',
      accent: '#10B981',
      features: ['Gallery grid', 'Tour packages', 'Photo carousel', 'Reviews section'],
    },
    {
      name: 'Cultural Heritage',
      tagline: 'Cultural Experiences',
      image: 'https://images.unsplash.com/photo-1534008897995-27a23e859048?w=800&q=80',
      accent: '#F07420',
      features: ['Story sections', 'Heritage timeline', 'Local guides', 'Blog layout'],
    },
    {
      name: 'Ocean Breeze',
      tagline: 'Beach & Island',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
      accent: '#0EA5E9',
      features: ['Sunset hero', 'Resort showcase', 'Water sports', 'Seasonal deals'],
    },
  ];

  return (
    <section className="relative bg-[#0F1420] py-16 lg:py-24 overflow-hidden">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-[500px] w-[600px] rounded-full opacity-15 blur-[120px]" style={{ background: 'radial-gradient(circle, rgba(240,116,32,0.1) 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[500px] rounded-full opacity-10 blur-[100px]" style={{ background: 'radial-gradient(circle, rgba(58,77,143,0.08) 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-5 lg:px-8 relative">
        <motion.div
          className="text-center mb-12 lg:mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 rounded-full border border-[#3A4D8F]/20 bg-[#3A4D8F]/5 px-4 py-1.5 text-xs font-semibold text-[#3A4D8F] mb-6">
            <Layout size={12} /> Website Builder
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="font-display text-balance text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4"
            style={{ letterSpacing: '-0.03em' }}
          >
            Premium Templates or <span className="text-gradient">AI Builder</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-[#8892A8] max-w-2xl mx-auto"
          >
            Choose from stunning pre-designed templates or let our AI create a custom website in minutes
          </motion.p>
        </motion.div>

        {/* Mode Toggle */}
        <motion.div
          className="flex justify-center mb-12"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="inline-flex rounded-xl bg-[#161C2E] border border-white/[0.06] p-1">
            <button
              onClick={() => setAiMode(false)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                !aiMode ? 'bg-[#F07420] text-white' : 'text-[#8892A8] hover:text-foreground'
              }`}
            >
              <Palette size={14} /> Templates
            </button>
            <button
              onClick={() => setAiMode(true)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                aiMode ? 'bg-[#F07420] text-white' : 'text-[#8892A8] hover:text-foreground'
              }`}
            >
              <Wand2 size={14} /> AI Builder
            </button>
          </div>
        </motion.div>

        {/* Template Selection Mode */}
        <AnimatePresence mode="wait">
          {!aiMode ? (
            <motion.div
              key="templates"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              exit={{ opacity: 0, y: -20 }}
              className="grid lg:grid-cols-2 gap-8"
            >
              {/* Template Cards */}
              {/* Desktop: Vertical list */}
              <div className="hidden lg:block space-y-3">
                {templates.map((t, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setSelected(i)}
                    className={`w-full flex items-center gap-4 p-3 rounded-xl border transition-all ${
                      selected === i
                        ? 'border-[#F07420] bg-[#F07420]/10'
                        : 'border-white/[0.06] bg-[#161C2E] hover:border-white/[0.12]'
                    }`}
                    variants={itemVariants}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <img
                      src={t.image}
                      alt={t.name}
                      className="h-16 w-16 rounded-lg object-cover shrink-0"
                    />
                    <div className="flex-1 text-left">
                      <div className="text-sm font-semibold text-foreground">{t.name}</div>
                      <div className="text-[10px] text-[#8892A8]">{t.tagline}</div>
                    </div>
                    {selected === i && <Check size={18} className="text-[#F07420] shrink-0" />}
                  </motion.button>
                ))}
              </div>

              {/* Mobile/Tablet: Horizontal swipe cards */}
              <div
                className="lg:hidden flex overflow-x-auto snap-x snap-mandatory gap-4 py-2 -mx-5 px-6"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', scrollPaddingLeft: '24px' }}
              >
                <style>{`
                  .lg\\:hidden::-webkit-scrollbar {
                    display: none !important;
                  }
                `}</style>
                {templates.map((t, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setSelected(i)}
                    className={`snap-start flex-shrink-0 w-[200px] sm:w-[240px] flex flex-col p-3 rounded-2xl border transition-all ${
                      selected === i
                        ? 'border-[#F07420] bg-[#F07420]/10'
                        : 'border-white/[0.06] bg-[#161C2E]'
                    }`}
                    variants={itemVariants}
                    whileTap={{ scale: 0.97 }}
                  >
                    <img
                      src={t.image}
                      alt={t.name}
                      className="h-32 sm:h-36 w-full rounded-xl object-cover mb-3"
                    />
                    <div className="text-left">
                      <div className="text-sm font-semibold text-foreground truncate">{t.name}</div>
                      <div className="text-xs text-[#8892A8] truncate">{t.tagline}</div>
                    </div>
                  </motion.button>
                ))}
                {/* More templates teaser */}
                <div className="snap-start flex-shrink-0 w-[200px] sm:w-[240px] flex flex-col items-center justify-center p-3 rounded-2xl border border-dashed border-white/[0.08] bg-[#161C2E]/50 min-h-[200px]">
                  <div className="text-2xl font-bold text-[#F07420] mb-1">20+</div>
                  <div className="text-xs text-[#8892A8] mb-3">More Templates</div>
                  <div className="flex items-center gap-1 text-[10px] text-[#F07420]">
                    <span>Explore All</span>
                    <ArrowRight size={10} />
                  </div>
                </div>

                {/* Spacer for right padding */}
                <div className="flex-shrink-0 w-1" />
              </div>

              {/* Live Preview */}
              <div className="rounded-2xl border border-white/[0.06] bg-[#161C2E] p-4 overflow-hidden">
                {/* Browser Chrome */}
                <div className="flex items-center gap-2 mb-3 px-1">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-400" />
                    <div className="h-3 w-3 rounded-full bg-yellow-400" />
                    <div className="h-3 w-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 mx-3 h-7 rounded-lg bg-white/[0.05] flex items-center px-3 text-[10px] text-[#8892A8]">
                    yourcompany.com
                  </div>
                  <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] text-[#8892A8]">Live Preview</span>
                </div>

                {/* Preview Content */}
                <div className="relative rounded-xl overflow-hidden">
                  <img
                    src={templates[selected].image}
                    alt={templates[selected].name}
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090C14] via-[#090C14]/40 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 p-6">
                    <div className="text-xs font-medium text-[#F07420] mb-1">{templates[selected].tagline}</div>
                    <div className="text-xl font-bold text-white mb-2">{templates[selected].name}</div>
                    <div className="flex gap-2">
                      {templates[selected].features.slice(0, 2).map((f, j) => (
                        <span key={j} className="text-[10px] bg-white/10 backdrop-blur-sm px-2 py-1 rounded text-white/80">{f}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {templates[selected].features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 rounded-lg bg-white/[0.03] px-3 py-2">
                      <Star size={10} style={{ color: templates[selected].accent }} />
                      <span className="text-[10px] text-[#8892A8]">{feature}</span>
                    </div>
                  ))}
                </div>

                <button className="flex items-center gap-2 w-full rounded-xl bg-[#F07420] text-white px-4 py-3 text-sm font-semibold hover:brightness-110 transition mt-4">
                  <Eye size={16} />
                  Preview & Use
                  <ArrowRight size={14} className="ml-auto" />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="ai"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-3xl mx-auto"
            >
              <div className="rounded-2xl border border-white/[0.06] bg-[#161C2E] p-6 sm:p-8">
                <div className="text-center mb-6">
                  <div className="h-16 w-16 rounded-full bg-[#F07420]/10 flex items-center justify-center mx-auto mb-4">
                    <Wand2 size={28} className="text-[#F07420]" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Let AI Build Your Website</h3>
                  <p className="text-sm text-[#8892A8]">Describe your travel agency and we'll create a custom website</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#8892A8] mb-2 block">Agency Name</label>
                    <input
                      type="text"
                      placeholder="e.g., Himalayan Adventures"
                      className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.06] text-foreground placeholder:text-[#8892A8] focus:outline-none focus:border-[#F07420]/50 transition"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#8892A8] mb-2 block">Describe Your Services</label>
                    <textarea
                      rows={3}
                      placeholder="e.g., We offer trekking expeditions in the Himalayas with experienced guides..."
                      className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.06] text-foreground placeholder:text-[#8892A8] focus:outline-none focus:border-[#F07420]/50 transition resize-none"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="checkbox" id="modern" className="rounded border-white/[0.06]" />
                    <label htmlFor="modern" className="text-xs text-[#8892A8]">Modern minimalist style</label>
                  </div>
                  <button className="flex items-center gap-2 w-full rounded-xl bg-gradient-to-r from-[#F07420] to-[#3A4D8F] text-white px-4 py-3 text-sm font-semibold hover:brightness-110 transition">
                    <Sparkles size={16} />
                    Generate with AI
                    <ArrowRight size={14} className="ml-auto" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
