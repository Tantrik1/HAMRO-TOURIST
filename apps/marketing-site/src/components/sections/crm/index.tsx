'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Zap, CheckCircle2, Clock, TrendingUp, ArrowRight, Database, Phone, Mail, Calendar } from 'lucide-react';

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

export default function Crm() {
  const [leads, setLeads] = useState([
    { id: 1, name: 'Sarah Johnson', email: 'sarah@email.com', status: 'Hot', pax: 4, source: 'Website' },
    { id: 2, name: 'Mike Chen', email: 'mike@email.com', status: 'New', pax: 2, source: 'Instagram' },
    { id: 3, name: 'Emma Wilson', email: 'emma@email.com', status: 'Contacted', pax: 6, source: 'Referral' },
    { id: 4, name: 'David Park', email: 'david@email.com', status: 'Follow-up', pax: 3, source: 'Google' },
  ]);

  const addLead = () => {
    const newId = leads.length + 1;
    setLeads([...leads, { id: newId, name: 'New Lead', email: 'new@email.com', status: 'New', pax: 1, source: 'Direct' }]);
  };

  const updateStatus = (id: number) => {
    setLeads(leads.map(l => l.id === id ? { ...l, status: l.status === 'New' ? 'Hot' : 'Converted' } : l));
  };

  return (
    <section className="relative bg-[#090C14] py-16 lg:py-24 overflow-hidden">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-1/4 h-[500px] w-[600px] rounded-full opacity-15 blur-[120px]" style={{ background: 'radial-gradient(circle, rgba(58,77,143,0.1) 0%, transparent 70%)' }} />
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
            <Users size={12} /> Built-in CRM
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="font-display text-balance text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4"
            style={{ letterSpacing: '-0.03em' }}
          >
            Handle All Your Clients & <span className="text-gradient">Bookings Easily</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-[#8892A8] max-w-2xl mx-auto"
          >
            Unified dashboard for all your customers, bookings, and leads — never miss a potential booking
          </motion.p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { label: 'Total Leads', value: '24', icon: Users, color: '#F07420' },
            { label: 'Hot Leads', value: '8', icon: TrendingUp, color: '#EF4444' },
            { label: 'Converted', value: '12', icon: CheckCircle2, color: '#10B981' },
            { label: 'Response Time', value: '2m', icon: Clock, color: '#3A4D8F' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="rounded-xl border border-white/[0.06] bg-[#161C2E] p-4 text-center"
            >
              <stat.icon size={20} className="mx-auto mb-2" style={{ color: stat.color }} />
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-[10px] text-[#8892A8]">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* CRM Dashboard Demo */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-3 gap-6"
        >
          {/* Lead List */}
          <div className="lg:col-span-2 rounded-2xl border border-white/[0.06] bg-[#161C2E] p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground">Recent Leads</h3>
              <button onClick={addLead} className="flex items-center gap-1 text-[10px] font-semibold text-[#F07420] hover:underline">
                <Zap size={12} /> Add New
              </button>
            </div>
            <div className="space-y-2">
              {leads.map((lead, i) => (
                <motion.div
                  key={lead.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-[#F07420]/20 transition cursor-pointer"
                  onClick={() => updateStatus(lead.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#F07420] to-[#3A4D8F] flex items-center justify-center text-[10px] text-white font-bold">
                      {lead.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-xs font-medium text-foreground">{lead.name}</div>
                      <div className="text-[10px] text-[#8892A8]">{lead.pax} pax · {lead.source}</div>
                    </div>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                    lead.status === 'Hot' ? 'bg-[#F07420]/15 text-[#F07420]' :
                    lead.status === 'Converted' ? 'bg-emerald-500/10 text-emerald-400' :
                    lead.status === 'Contacted' ? 'bg-[#3A4D8F]/15 text-[#3A4D8F]' :
                    'bg-white/[0.05] text-[#8892A8]'
                  }`}>
                    {lead.status}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-white/[0.06] bg-[#161C2E] p-5">
              <h3 className="text-sm font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] transition text-left">
                  <div className="h-8 w-8 rounded-lg bg-[#F07420]/10 flex items-center justify-center">
                    <Mail size={14} className="text-[#F07420]" />
                  </div>
                  <span className="text-xs text-foreground">Send Follow-up Email</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] transition text-left">
                  <div className="h-8 w-8 rounded-lg bg-[#3A4D8F]/10 flex items-center justify-center">
                    <Phone size={14} className="text-[#3A4D8F]" />
                  </div>
                  <span className="text-xs text-foreground">Call Lead</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] transition text-left">
                  <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                    <Calendar size={14} className="text-emerald-400" />
                  </div>
                  <span className="text-xs text-foreground">Schedule Meeting</span>
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-[#F07420]/20 bg-[#F07420]/5 p-5">
              <div className="flex items-center gap-2 mb-2">
                <Database size={16} className="text-[#F07420]" />
                <span className="text-xs font-semibold text-[#F07420]">Pro Tip</span>
              </div>
              <p className="text-[10px] text-[#8892A8]">Respond to new leads within 5 minutes to increase conversion by 400%</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
