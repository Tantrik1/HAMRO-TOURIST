'use client';

import React, { useState } from 'react';
import Nav from '@/components/sections/nav';
import Footer from '@/components/sections/footer';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#090C14] text-foreground">
      <Nav />

      <main className="pt-20">
        {/* Hero */}
        <section className="py-16 text-center">
          <div className="max-w-4xl mx-auto px-5 lg:px-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#3A4D8F]/20 bg-[#3A4D8F]/5 px-4 py-1.5 text-xs font-semibold text-[#3A4D8F] mb-6">
              <MessageCircle size={12} /> Contact Us
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6" style={{ letterSpacing: '-0.03em' }}>
              We'd Love to <span className="text-gradient">Hear From You</span>
            </h1>
            <p className="text-lg text-[#8892A8] max-w-2xl mx-auto">
              Have questions about Hamro Tourist? Our team is here to help you get started and grow your travel business.
            </p>
          </div>
        </section>

        {/* Contact Grid */}
        <section className="py-16 border-t border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-5 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-6 mb-12">
              {[
                { icon: Mail, title: 'Email', info: 'hello@hamrotourist.com', color: '#F07420' },
                { icon: Phone, title: 'Phone', info: '+977 1 400 0000', color: '#3A4D8F' },
                { icon: MapPin, title: 'Address', info: 'Kathmandu, Nepal', color: '#10B981' },
              ].map((item, i) => (
                <div key={i} className="rounded-2xl border border-white/[0.06] bg-[#161C2E] p-6 text-center">
                  <div className="h-12 w-12 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: `${item.color}15` }}>
                    <item.icon size={20} style={{ color: item.color }} />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-[#8892A8]">{item.info}</p>
                </div>
              ))}
            </div>

            {/* Hours */}
            <div className="rounded-2xl border border-white/[0.06] bg-[#161C2E] p-6 mb-12">
              <div className="flex items-center gap-3 mb-4">
                <Clock size={20} className="text-[#F07420]" />
                <h3 className="font-semibold text-foreground">Support Hours</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-3 text-sm text-[#8892A8]">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="text-foreground">9:00 AM - 6:00 PM NPT</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="text-foreground">10:00 AM - 4:00 PM NPT</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="text-foreground">Emergency Only</span>
                </div>
                <div className="flex justify-between">
                  <span>24/7 Chat</span>
                  <span className="text-emerald-400">Available</span>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="font-display text-2xl font-bold mb-4">Send a Message</h2>
                <p className="text-[#8892A8] mb-6">
                  Fill out the form and we'll get back to you within 24 hours.
                </p>
                {submitted ? (
                  <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8 text-center">
                    <CheckCircle size={40} className="text-emerald-400 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-emerald-400 mb-2">Message Sent!</h3>
                    <p className="text-sm text-[#8892A8]">We'll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-xs font-medium text-[#8892A8] mb-2 block">Name</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Your name"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-foreground placeholder:text-[#8892A8] focus:outline-none focus:border-[#F07420]/50 transition"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-[#8892A8] mb-2 block">Email</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="you@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-foreground placeholder:text-[#8892A8] focus:outline-none focus:border-[#F07420]/50 transition"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-[#8892A8] mb-2 block">Message</label>
                      <textarea
                        required
                        rows={4}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="How can we help?"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-foreground placeholder:text-[#8892A8] focus:outline-none focus:border-[#F07420]/50 transition resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="flex items-center gap-2 w-full rounded-xl bg-[#F07420] text-white px-4 py-3 text-sm font-semibold hover:brightness-110 transition"
                    >
                      <Send size={16} />
                      Send Message
                    </button>
                  </form>
                )}
              </div>

              <div className="rounded-2xl border border-white/[0.06] bg-[#161C2E] p-6">
                <h3 className="font-semibold text-foreground mb-4">Frequently Asked</h3>
                <div className="space-y-4">
                  {[
                    { q: 'How do I get started?', a: 'Sign up for a free trial, no credit card required.' },
                    { q: 'Can I migrate from another platform?', a: 'Yes, we offer free migration assistance.' },
                    { q: 'Is there a free trial?', a: 'Yes, 14-day free trial with all features.' },
                    { q: 'Do you offer custom solutions?', a: 'Enterprise plans include custom integrations.' },
                  ].map((faq, i) => (
                    <div key={i} className="border-b border-white/[0.06] pb-4 last:border-0">
                      <h4 className="text-sm font-medium text-foreground mb-1">{faq.q}</h4>
                      <p className="text-xs text-[#8892A8]">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
