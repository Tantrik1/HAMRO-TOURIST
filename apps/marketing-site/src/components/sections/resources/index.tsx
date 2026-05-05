'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowRight, BookOpen, Video, FileText, TrendingUp } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Resources() {
  const resources = [
    {
      id: 1,
      type: 'Guide',
      icon: BookOpen,
      color: '#F07420',
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80',
      title: 'Why Your Travel Agency Needs Hamro Tourist',
      description: 'Discover the 5 critical reasons why modern travel agencies are switching to Hamro Tourist. From automated bookings to 24/7 customer capture.',
      readTime: '8 min read',
      category: 'Getting Started',
    },
    {
      id: 2,
      type: 'Video',
      icon: Video,
      color: '#3A4D8F',
      image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&q=80',
      title: 'Build Your Website in 5 Minutes',
      description: 'Watch our step-by-step tutorial on creating a stunning travel website using Hamro Tourist\'s AI builder. No coding required.',
      readTime: '5 min watch',
      category: 'Tutorial',
    },
    {
      id: 3,
      type: 'Case Study',
      icon: TrendingUp,
      color: '#10B981',
      image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80',
      title: 'How to Triple Your Bookings in 90 Days',
      description: 'Real case study: How Himalayan Adventures used Hamro Tourist CRM to increase bookings by 300% in just 3 months.',
      readTime: '12 min read',
      category: 'Success Story',
    },
    {
      id: 4,
      type: 'Guide',
      icon: FileText,
      color: '#8B5CF6',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      title: 'Complete CRM Setup Guide',
      description: 'Master the Hamro Tourist CRM. Learn to manage leads, automate follow-ups, and close more bookings with our comprehensive guide.',
      readTime: '15 min read',
      category: 'Advanced',
    },
    {
      id: 5,
      type: 'Video',
      icon: Video,
      color: '#EC4899',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
      title: 'Payment Integrations Made Easy',
      description: 'Connect Stripe, eSewa, Khalti, and custom payment gateways in minutes. Accept payments from anywhere in the world.',
      readTime: '7 min watch',
      category: 'Tutorial',
    },
  ];

  return (
    <section className="relative bg-[#090C14] py-16 lg:py-24 overflow-hidden">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-1/3 h-[500px] w-[600px] rounded-full opacity-15 blur-[120px]" style={{ background: 'radial-gradient(circle, rgba(240,116,32,0.1) 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/3 left-1/3 h-[400px] w-[500px] rounded-full opacity-10 blur-[100px]" style={{ background: 'radial-gradient(circle, rgba(58,77,143,0.08) 0%, transparent 70%)' }} />
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
            <BookOpen size={12} /> Resources
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="font-display text-balance text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4"
            style={{ letterSpacing: '-0.03em' }}
          >
            Master <span className="text-gradient">Hamro Tourist</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-[#8892A8] max-w-2xl mx-auto"
          >
            Guides, tutorials, and case studies to help you get the most out of our platform
          </motion.p>
        </motion.div>

        {/* Desktop: 3 cards grid | Mobile: Swipe carousel */}
        {/* Desktop / Tablet */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="hidden lg:grid grid-cols-3 gap-6"
        >
          {resources.slice(0, 3).map((resource, i) => (
            <motion.div key={resource.id} variants={itemVariants}>
              <a href={`/resources/${resource.id}`} className="group block h-full">
                <div className="relative h-48 rounded-2xl overflow-hidden mb-4 border border-white/[0.06]">
                  <img
                    src={resource.image}
                    alt={resource.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090C14] via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-3 py-1.5 text-[10px] font-semibold text-white">
                      {React.createElement(resource.icon, { size: 12 })}
                      {resource.type}
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: resource.color }}>
                    {resource.category}
                  </span>
                  <h3 className="text-base font-bold text-foreground line-clamp-2 group-hover:text-[#F07420] transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-xs text-[#8892A8] line-clamp-2">
                    {resource.description}
                  </p>
                  <div className="flex items-center gap-2 pt-2">
                    <Clock size={10} className="text-[#8892A8]" />
                    <span className="text-[10px] text-[#8892A8]">{resource.readTime}</span>
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile / Tablet: Swipeable carousel */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="lg:hidden"
        >
          <div
            className="flex overflow-x-auto snap-x snap-mandatory gap-4 py-2 -mx-5 px-6"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <style>{`
              .lg\\:hidden::-webkit-scrollbar {
                display: none !important;
              }
            `}</style>
            {resources.map((resource, i) => (
              <div
                key={resource.id}
                className="snap-start flex-shrink-0 w-[66vw] sm:w-[280px]"
              >
                <a href={`/resources/${resource.id}`} className="group block h-full">
                  <div className="relative h-44 rounded-2xl overflow-hidden mb-3 border border-white/[0.06]">
                    <img
                      src={resource.image}
                      alt={resource.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090C14] via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-2.5 py-1 text-[10px] font-semibold text-white">
                        {React.createElement(resource.icon, { size: 10 })}
                        {resource.type}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: resource.color }}>
                      {resource.category}
                    </span>
                    <h3 className="text-sm font-bold text-foreground line-clamp-2 group-hover:text-[#F07420] transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-xs text-[#8892A8] line-clamp-2">
                      {resource.description}
                    </p>
                    <div className="flex items-center gap-2 pt-1">
                      <Clock size={10} className="text-[#8892A8]" />
                      <span className="text-[10px] text-[#8892A8]">{resource.readTime}</span>
                    </div>
                  </div>
                </a>
              </div>
            ))}
            {/* Spacer for right padding */}
            <div className="flex-shrink-0 w-1" />
          </div>
        </motion.div>

        {/* View All CTA */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <a
            href="/resources"
            className="inline-flex items-center gap-2 text-sm text-[#8892A8] hover:text-[#F07420] transition"
          >
            View All Resources
            <ArrowRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
