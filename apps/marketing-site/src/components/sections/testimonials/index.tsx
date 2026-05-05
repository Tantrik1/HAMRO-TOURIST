'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, ArrowRight, Twitter, Linkedin, CheckCircle, TrendingUp } from 'lucide-react';

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

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Rajesh Sharma',
      role: 'Owner, Himalayan Adventures',
      image: 'R',
      color: '#F07420',
      rating: 5,
      content: 'Hamro Tourist transformed our business. We went from 2 bookings/month to 50+ bookings/month in just 3 months. The CRM is a game-changer.',
      metrics: { label: '+2400%', value: 'Booking Growth' },
    },
    {
      name: 'Sarah Johnson',
      role: 'Founder, Nepal Treks',
      image: 'S',
      color: '#3A4D8F',
      rating: 5,
      content: 'The AI website builder created a stunning site for us in minutes. Our customers love the new design and bookings have doubled.',
      metrics: { label: '2x', value: 'Revenue Increase' },
    },
    {
      name: 'Mike Chen',
      role: 'Director, Mountain Expeditions',
      image: 'M',
      color: '#10B981',
      rating: 5,
      content: 'Best decision we made. The payment integrations with eSewa and Khalti made accepting local payments seamless.',
      metrics: { label: '100%', value: 'Payment Success' },
    },
    {
      name: 'Emma Wilson',
      role: 'CEO, Cultural Tours Nepal',
      image: 'E',
      color: '#8B5CF6',
      rating: 5,
      content: 'The financial management dashboard gives us complete visibility. We finally know where every rupee goes.',
      metrics: { label: '35%', value: 'Cost Reduction' },
    },
    {
      name: 'David Park',
      role: 'Manager, Everest Base Camp',
      image: 'D',
      color: '#EC4899',
      rating: 5,
      content: 'Customer support is incredible. They helped us migrate from our old system in just 2 days with zero downtime.',
      metrics: { label: '48h', value: 'Migration Time' },
    },
    {
      name: 'Lisa Brown',
      role: 'Founder, Pokhara Adventures',
      image: 'L',
      color: '#F59E0B',
      rating: 5,
      content: 'The templates are beautiful and the customization options are endless. Our website looks better than any competitor.',
      metrics: { label: '#1', value: 'Design Quality' },
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
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 text-xs font-semibold text-emerald-400 mb-6">
            <Star size={12} fill="currentColor" /> Customer Stories
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="font-display text-balance text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4"
            style={{ letterSpacing: '-0.03em' }}
          >
            Loved by <span className="text-gradient">Travel Agencies</span> Worldwide
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-[#8892A8] max-w-2xl mx-auto"
          >
            Join hundreds of successful travel agencies that trust Hamro Tourist
          </motion.p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { label: '500+', desc: 'Travel Agencies' },
            { label: '98%', desc: 'Satisfaction Rate' },
            { label: '10k+', desc: 'Bookings Processed' },
            { label: '24/7', desc: 'Support Available' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="rounded-2xl border border-white/[0.06] bg-[#161C2E] p-4 text-center"
            >
              <div className="text-2xl sm:text-3xl font-bold text-foreground">{stat.label}</div>
              <div className="text-[10px] sm:text-xs text-[#8892A8]">{stat.desc}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="group relative rounded-2xl border border-white/[0.06] bg-[#161C2E] p-5 sm:p-6 hover:border-[#F07420]/20 hover:shadow-lg hover:shadow-[#F07420]/5 transition-all duration-300"
            >
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition">
                <Quote size={40} className="text-[#F07420]" />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, j) => (
                  <Star key={j} size={14} fill="currentColor" className="text-[#F07420]" />
                ))}
              </div>

              {/* Content */}
              <p className="text-xs sm:text-sm text-[#8892A8] leading-relaxed mb-6 line-clamp-3">
                {testimonial.content}
              </p>

              {/* Metrics */}
              <div className="inline-flex items-center gap-2 rounded-full bg-[#F07420]/10 border border-[#F07420]/20 px-3 py-1.5 mb-4">
                <TrendingUp size={12} className="text-[#F07420]" />
                <span className="text-[10px] font-semibold text-[#F07420]">{testimonial.metrics.value} {testimonial.metrics.label}</span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ background: testimonial.color }}>
                  {testimonial.image}
                </div>
                <div className="flex-1">
                  <div className="text-xs sm:text-sm font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-[10px] sm:text-xs text-[#8892A8]">{testimonial.role}</div>
                </div>
              </div>
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
          <button className="flex items-center gap-2 mx-auto rounded-full bg-gradient-to-r from-[#F07420] to-[#3A4D8F] text-white px-8 py-4 text-sm font-semibold hover:brightness-110 transition-all hover:scale-105">
            <Star size={16} fill="currentColor" />
            Start Your Success Story
            <ArrowRight size={14} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
