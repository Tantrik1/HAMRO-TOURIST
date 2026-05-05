import React from 'react';
import Nav from '@/components/sections/nav';
import Footer from '@/components/sections/footer';
import { Globe, Users, Target, Heart, Rocket, Award } from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      icon: Globe,
      title: 'Empowering Travel',
      description: 'We believe every travel agency deserves modern tools to compete and thrive in the digital age.',
    },
    {
      icon: Users,
      title: 'Built for Agencies',
      description: 'Designed specifically for travel agencies, tour operators, and hospitality businesses.',
    },
    {
      icon: Target,
      title: 'Mission-Driven',
      description: 'Our mission is to simplify technology so agencies can focus on creating unforgettable experiences.',
    },
    {
      icon: Heart,
      title: 'Passionate Support',
      description: '24/7 support from real humans who understand the travel industry inside and out.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#090C14] text-foreground">
      <Nav />

      <main className="pt-20">
        {/* Hero */}
        <section className="py-16 lg:py-24 text-center">
          <div className="max-w-4xl mx-auto px-5 lg:px-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#F07420]/20 bg-[#F07420]/5 px-4 py-1.5 text-xs font-semibold text-[#F07420] mb-6">
              <Rocket size={12} /> About Us
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6" style={{ letterSpacing: '-0.03em' }}>
              Building the Future of <span className="text-gradient">Travel Technology</span>
            </h1>
            <p className="text-lg text-[#8892A8] max-w-2xl mx-auto">
              Hamro Tourist was born from a simple idea: travel agencies deserve better tools. No more piecing together dozens of apps, no more manual work, no more missed opportunities.
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="py-16 border-t border-white/[0.06]">
          <div className="max-w-4xl mx-auto px-5 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4">Our Story</h2>
                <div className="space-y-4 text-[#8892A8]">
                  <p>
                    In 2024, a group of travel industry veterans and software engineers came together with a shared frustration: running a travel agency was unnecessarily complicated.
                  </p>
                  <p>
                    Agencies were using separate tools for websites, bookings, payments, customer management, and marketing. Data was scattered, processes were manual, and growth was limited.
                  </p>
                  <p>
                    Hamro Tourist was built to solve this. One platform. Everything you need. Built specifically for travel agencies.
                  </p>
                </div>
              </div>
              <div className="rounded-2xl border border-white/[0.06] bg-[#161C2E] p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#F07420]">500+</div>
                    <div className="text-xs text-[#8892A8]">Agencies</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#3A4D8F]">10k+</div>
                    <div className="text-xs text-[#8892A8]">Bookings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-400">98%</div>
                    <div className="text-xs text-[#8892A8]">Satisfaction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#8B5CF6]">24/7</div>
                    <div className="text-xs text-[#8892A8]">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 border-t border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-5 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4">Our Values</h2>
              <p className="text-[#8892A8]">The principles that guide everything we do</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {values.map((value, i) => (
                <div key={i} className="rounded-2xl border border-white/[0.06] bg-[#161C2E] p-6 flex gap-4">
                  <div className="h-12 w-12 rounded-xl bg-[#F07420]/10 flex items-center justify-center shrink-0">
                    <value.icon size={20} className="text-[#F07420]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{value.title}</h3>
                    <p className="text-sm text-[#8892A8]">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 border-t border-white/[0.06]">
          <div className="max-w-4xl mx-auto px-5 lg:px-8 text-center">
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4">Join Our Journey</h2>
            <p className="text-[#8892A8] mb-8">
              We're a remote-first team spread across Nepal, India, and beyond. We're always looking for passionate people who love travel and technology.
            </p>
            <a
              href="mailto:careers@hamrotourist.com"
              className="inline-flex items-center gap-2 rounded-full bg-[#F07420] text-white px-6 py-3 text-sm font-semibold hover:brightness-110 transition"
            >
              <Award size={16} />
              View Open Positions
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
