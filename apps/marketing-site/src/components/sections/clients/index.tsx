'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const logos = [
  { name: 'Nepal Adventures', color: '#F07420' },
  { name: 'Himalayan Treks', color: '#3A4D8F' },
  { name: 'Kathmandu Tours', color: '#10B981' },
  { name: 'Everest Expeditions', color: '#8B5CF6' },
  { name: 'Pokhara Travels', color: '#EC4899' },
  { name: 'Chitwan Safari', color: '#F59E0B' },
  { name: 'Langtang Valley', color: '#06B6D4' },
  { name: 'Annapurna Peaks', color: '#EF4444' },
  { name: 'Manaslu Trails', color: '#84CC16' },
  { name: 'Mustang Rides', color: '#6366F1' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
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

export default function Clients() {
  return (
    <section className="relative bg-[#090C14] py-16 lg:py-24 overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[600px] rounded-full opacity-10 blur-[120px]" style={{ background: 'radial-gradient(circle, rgba(240,116,32,0.08) 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-5 lg:px-8 relative">
        <motion.div
          className="text-center mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.h2
            variants={itemVariants}
            className="font-display text-balance text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4"
            style={{ letterSpacing: '-0.03em' }}
          >
            Trusted by <span className="text-gradient">Leading Travel Agencies</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-[#8892A8] max-w-2xl mx-auto"
          >
            Join hundreds of travel companies that have transformed their business with Hamro Tourist
          </motion.p>
        </motion.div>

        {/* Logo Slider */}
        <div className="relative">
          {/* Fade gradients on sides */}
          <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-32 bg-gradient-to-r from-[#090C14] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-32 bg-gradient-to-l from-[#090C14] to-transparent z-10" />

          {/* Scrolling container */}
          <div className="flex overflow-hidden">
            <motion.div
              className="flex gap-8 sm:gap-12 lg:gap-16"
              animate={{
                x: [0, -2000],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: 'loop',
                  duration: 40,
                  ease: 'linear',
                },
              }}
            >
              {/* First set */}
              {logos.map((logo, i) => (
                <motion.div
                  key={`${logo.name}-1`}
                  variants={itemVariants}
                  className="flex-shrink-0 group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div
                      className="h-10 sm:h-12 w-10 sm:w-12 rounded-lg flex items-center justify-center text-white font-bold text-lg sm:text-xl"
                      style={{ background: logo.color }}
                    >
                      {logo.name.charAt(0)}
                    </div>
                    <span className="text-sm sm:text-base font-semibold text-[#8892A8] group-hover:text-foreground transition-colors">
                      {logo.name}
                    </span>
                  </div>
                </motion.div>
              ))}

              {/* Duplicate for seamless loop */}
              {logos.map((logo, i) => (
                <motion.div
                  key={`${logo.name}-2`}
                  variants={itemVariants}
                  className="flex-shrink-0 group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div
                      className="h-10 sm:h-12 w-10 sm:w-12 rounded-lg flex items-center justify-center text-white font-bold text-lg sm:text-xl"
                      style={{ background: logo.color }}
                    >
                      {logo.name.charAt(0)}
                    </div>
                    <span className="text-sm sm:text-base font-semibold text-[#8892A8] group-hover:text-foreground transition-colors">
                      {logo.name}
                    </span>
                  </div>
                </motion.div>
              ))}

              {/* Third set for very wide screens */}
              {logos.map((logo, i) => (
                <motion.div
                  key={`${logo.name}-3`}
                  variants={itemVariants}
                  className="flex-shrink-0 group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div
                      className="h-10 sm:h-12 w-10 sm:w-12 rounded-lg flex items-center justify-center text-white font-bold text-lg sm:text-xl"
                      style={{ background: logo.color }}
                    >
                      {logo.name.charAt(0)}
                    </div>
                    <span className="text-sm sm:text-base font-semibold text-[#8892A8] group-hover:text-foreground transition-colors">
                      {logo.name}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Stats row */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {[
            { value: '500+', label: 'Travel Agencies' },
            { value: '10k+', label: 'Bookings Managed' },
            { value: '98%', label: 'Customer Satisfaction' },
            { value: '24/7', label: 'Support Available' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground italic">{stat.value}</div>
              <div className="text-xs sm:text-sm text-[#8892A8] mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
