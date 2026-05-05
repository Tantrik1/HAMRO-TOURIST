'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  TrendingUp,
  MapPin,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Mountain,
  Globe,
  BarChart3,
  Bell,
  ChevronRight,
  Search,
  Filter,
  Download,
  Eye,
  Mail,
  Phone,
  MousePointerClick,
  Monitor,
  Smartphone,
} from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Overview', icon: LayoutDashboard, badge: null },
  { id: 'bookings', label: 'Bookings', icon: CalendarDays, badge: '12' },
  { id: 'treks', label: 'Treks', icon: Mountain, badge: null },
  { id: 'website', label: 'Website', icon: Globe, badge: 'Live' },
  { id: 'crm', label: 'CRM', icon: Users, badge: '3' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, badge: null },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const contentVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -4, transition: { duration: 0.2 } },
};

export default function Hero() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <section className="relative isolate bg-background min-h-[100dvh] flex flex-col">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[600px] w-[800px] rounded-full opacity-30 blur-[120px]" style={{ background: 'radial-gradient(circle, rgba(240,116,32,0.12) 0%, transparent 70%)' }} />
        <div className="absolute -right-[10%] top-[20%] h-[400px] w-[500px] rounded-full opacity-15 blur-[90px]" style={{ background: 'radial-gradient(circle, rgba(58,77,143,0.10) 0%, transparent 70%)' }} />
      </div>

      <div className="relative flex flex-1 flex-col items-center justify-center px-4 sm:px-8 pt-28 pb-12">
        <motion.div className="mx-auto max-w-5xl text-center w-full" variants={containerVariants} initial="hidden" animate="visible">
          <motion.div variants={itemVariants} className="mb-5 flex justify-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#F07420]/20 bg-[#F07420]/5 px-3 py-1 text-xs font-medium text-[#F07420]">
              <LayoutDashboard size={12} /> Manage Your Travel Agency
            </span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="font-display text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl" style={{ letterSpacing: '-0.03em' }}>
            Everything in one{' '}
            <span className="text-gradient">beautiful dashboard</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="mx-auto mt-4 max-w-2xl text-muted-foreground sm:text-lg">
            Track bookings, monitor revenue, manage leads, and grow your agency — all from a single screen.
          </motion.p>

          {/* Dashboard Mockup */}
          <motion.div variants={itemVariants} className="mt-12 sm:mt-14 mx-auto w-full max-w-5xl">
            <div className="rounded-2xl border border-white/[0.06] bg-[#0F1420] shadow-2xl sm:rounded-3xl overflow-hidden" style={{ boxShadow: '0 25px 80px -20px rgba(0,0,0,0.6), 0 0 40px -10px rgba(240,116,32,0.08)' }}>
              {/* Browser Chrome */}
              <div className="flex items-center gap-3 px-4 py-3 sm:px-5 sm:py-3.5 bg-[#161C2E] border-b border-white/[0.06]">
                <div className="flex gap-1.5 shrink-0">
                  <div className="h-3 w-3 rounded-full bg-[#FF5F56]" />
                  <div className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
                  <div className="h-3 w-3 rounded-full bg-[#27C93F]" />
                </div>
                <div className="flex-1 flex justify-center min-w-0">
                  <div className="flex items-center gap-1.5 rounded-md bg-white/[0.04] px-3 py-1 text-[10px] sm:text-xs text-[#8892A8]">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                    <span className="truncate">admin.yourcompany.com</span>
                  </div>
                </div>
              </div>

              {/* Dashboard Body */}
              <div className="flex flex-col sm:flex-row min-h-[420px] sm:min-h-[480px] lg:min-h-[520px]">
                {/* Desktop Sidebar */}
                <div className="hidden sm:flex w-44 lg:w-52 flex-col gap-1 border-r border-white/[0.06] bg-[#090C14] p-2.5 lg:p-3 shrink-0">
                  <div className="mb-3 px-2 text-[10px] font-semibold uppercase tracking-wider text-[#8892A8]/50">Menu</div>
                  {navItems.map((item) => {
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`group relative flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-xs font-medium transition-all duration-200 text-left ${
                          isActive
                            ? 'bg-[#F07420]/10 text-[#F07420]'
                            : 'text-[#8892A8] hover:bg-white/[0.04] hover:text-foreground'
                        }`}
                      >
                        {isActive && (
                          <motion.div layoutId="sidebar-indicator" className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r-full bg-[#F07420]" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
                        )}
                        <span className={`flex h-7 w-7 items-center justify-center rounded-md transition-colors ${isActive ? 'bg-[#F07420]/15 text-[#F07420]' : 'bg-white/[0.05] text-[#8892A8]'}`}>
                          <item.icon size={14} />
                        </span>
                        <span className="flex-1">{item.label}</span>
                        {item.badge && (
                          <span className={`shrink-0 rounded-md px-1.5 py-0.5 text-[9px] font-bold ${item.badge === 'Live' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-[#F07420]/15 text-[#F07420]'}`}>
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                  <div className="mt-auto pt-3 border-t border-white/[0.06]">
                    <div className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-white/[0.04] transition cursor-pointer">
                      <div className="h-7 w-7 rounded-full bg-gradient-to-br from-[#F07420] to-[#3A4D8F] flex items-center justify-center text-[10px] font-bold text-white">R</div>
                      <div className="min-w-0 text-left">
                        <div className="text-[11px] font-semibold text-foreground truncate">Rajesh Sharma</div>
                        <div className="text-[9px] text-[#8892A8]">Admin</div>
                      </div>
                      <Bell size={12} className="ml-auto text-[#8892A8]" />
                    </div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 bg-[#0F1420] p-3 sm:p-4 lg:p-5 overflow-hidden">
                  {/* Mobile Horizontal Nav */}
                  <div className="flex sm:hidden gap-1 mb-4 overflow-x-auto pb-1 no-scrollbar">
                    {navItems.map((item) => {
                      const isActive = activeTab === item.id;
                      return (
                        <button key={item.id} onClick={() => setActiveTab(item.id)} className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium transition whitespace-nowrap border shrink-0 ${isActive ? 'bg-[#F07420]/10 border-[#F07420]/20 text-[#F07420]' : 'bg-white/[0.03] border-white/[0.06] text-[#8892A8]'}`}>
                          <item.icon size={12} />{item.label}
                          {item.badge && item.badge !== 'Live' && <span className="rounded-full bg-[#F07420]/15 px-1 text-[9px] font-bold text-[#F07420]">{item.badge}</span>}
                        </button>
                      );
                    })}
                  </div>

                  {/* Dynamic Content Area */}
                  <AnimatePresence mode="wait">
                    <motion.div key={activeTab} variants={contentVariants} initial="initial" animate="animate" exit="exit" className="h-full">
                      {activeTab === 'dashboard' && <OverviewContent />}
                      {activeTab === 'bookings' && <BookingsContent />}
                      {activeTab === 'treks' && <TreksContent />}
                      {activeTab === 'website' && <WebsiteContent />}
                      {activeTab === 'crm' && <CrmContent />}
                      {activeTab === 'analytics' && <AnalyticsContent />}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ========== TAB CONTENT COMPONENTS ========== */

function OverviewContent() {
  const stats = [
    { label: 'Total Bookings', value: '1,284', change: '+24%', icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'Revenue', value: '$48.2k', change: '+18%', icon: ArrowUpRight, color: 'text-[#F07420]', bg: 'bg-[#F07420]/10' },
    { label: 'Active Treks', value: '47', change: '+5', icon: MapPin, color: 'text-[#3A4D8F]', bg: 'bg-[#3A4D8F]/15' },
    { label: 'New Inquiries', value: '32', change: '+12%', icon: Users, color: 'text-sky-400', bg: 'bg-sky-500/10' },
  ];
  const bookings = [
    { name: 'Everest Base Camp Trek', pax: '4 pax', date: 'May 12', status: 'confirmed' },
    { name: 'Annapurna Circuit', pax: '2 pax', date: 'May 18', status: 'pending' },
    { name: 'Chitwan Safari', pax: '6 pax', date: 'Jun 02', status: 'confirmed' },
    { name: 'Langtang Valley', pax: '3 pax', date: 'Jun 15', status: 'pending' },
  ];
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between gap-2 mb-4 sm:mb-5">
        <div>
          <div className="text-sm font-bold text-foreground">Welcome back, Rajesh</div>
          <div className="text-xs text-[#8892A8]">Here&apos;s what&apos;s happening today</div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="relative"><Bell size={15} className="text-[#8892A8]" /><span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-[#F07420]" /></div>
          <div className="h-7 w-7 rounded-full bg-gradient-to-br from-[#F07420] to-[#3A4D8F]" />
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-5">
        {stats.map((s, i) => (
          <div key={i} className="rounded-xl border border-white/[0.06] bg-[#161C2E] p-2.5 sm:p-3">
            <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-[#8892A8]">
              <span className={`flex h-6 w-6 items-center justify-center rounded-md ${s.bg}`}><s.icon size={12} className={s.color} /></span>
              {s.label}
            </div>
            <div className="mt-1 text-lg sm:text-xl font-bold text-foreground">{s.value}</div>
            <div className="text-[10px] font-medium text-emerald-400">{s.change} this month</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-2 sm:gap-3 flex-1">
        <div className="lg:col-span-3 rounded-xl border border-white/[0.06] bg-[#161C2E] p-2.5 sm:p-3">
          <div className="flex items-center justify-between mb-2"><div className="text-xs font-medium text-[#8892A8]">Revenue Trend</div><div className="text-[10px] text-emerald-400 font-semibold">+24%</div></div>
          <div className="h-20 sm:h-24 lg:h-28 w-full">
            <svg viewBox="0 0 300 80" className="w-full h-full" preserveAspectRatio="none">
              <defs><linearGradient id="ovGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#F07420" stopOpacity="0.25"/><stop offset="100%" stopColor="#F07420" stopOpacity="0"/></linearGradient></defs>
              <path d="M0 70 C 20 65, 40 55, 60 58 S 100 35, 120 40 S 160 20, 180 25 S 220 10, 240 15 S 280 5, 300 8 L 300 80 L 0 80 Z" fill="url(#ovGrad)" />
              <path d="M0 70 C 20 65, 40 55, 60 58 S 100 35, 120 40 S 160 20, 180 25 S 220 10, 240 15 S 280 5, 300 8" fill="none" stroke="#F07420" strokeWidth="2" />
              <circle cx="300" cy="8" r="3" fill="#F07420" />
            </svg>
          </div>
          <div className="flex justify-between text-[9px] sm:text-[10px] text-[#8892A8] mt-1"><span>Jan</span><span>Apr</span><span>Jul</span><span>Oct</span><span>Dec</span></div>
        </div>
        <div className="lg:col-span-2 rounded-xl border border-white/[0.06] bg-[#161C2E] p-2.5 sm:p-3">
          <div className="flex items-center justify-between mb-2"><div className="text-xs font-medium text-[#8892A8]">Recent Bookings</div><div className="text-[10px] text-[#F07420] font-medium cursor-pointer hover:underline">View all</div></div>
          <div className="space-y-2">
            {bookings.map((b, i) => (
              <div key={i} className="flex items-center justify-between gap-2 py-1.5 border-b border-white/[0.04] last:border-0">
                <div className="min-w-0">
                  <div className="text-[10px] sm:text-xs font-medium text-foreground truncate">{b.name}</div>
                  <div className="text-[9px] sm:text-[10px] text-[#8892A8] flex items-center gap-1"><Clock size={9} /> {b.pax} · {b.date}</div>
                </div>
                <span className={`shrink-0 flex items-center gap-0.5 text-[9px] sm:text-[10px] font-semibold px-1.5 py-0.5 rounded ${b.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                  {b.status === 'confirmed' ? <CheckCircle2 size={10} /> : <Clock size={10} />}{b.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BookingsContent() {
  const allBookings = [
    { name: 'Everest Base Camp Trek', client: 'Sarah Johnson', date: 'May 12, 2026', amount: '$2,400', status: 'confirmed', pax: 4 },
    { name: 'Annapurna Circuit', client: 'Mike Chen', date: 'May 18, 2026', amount: '$1,800', status: 'pending', pax: 2 },
    { name: 'Chitwan Safari', client: 'Emma Wilson', date: 'Jun 02, 2026', amount: '$3,200', status: 'confirmed', pax: 6 },
    { name: 'Langtang Valley', client: 'David Park', date: 'Jun 15, 2026', amount: '$1,200', status: 'pending', pax: 3 },
    { name: 'Manaslu Trek', client: 'Lisa Brown', date: 'Jul 01, 2026', amount: '$2,800', status: 'confirmed', pax: 5 },
  ];
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div><div className="text-sm font-bold text-foreground">All Bookings</div><div className="text-xs text-[#8892A8]">Manage your trip reservations</div></div>
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1 rounded-md bg-[#161C2E] border border-white/[0.06] px-2 py-1.5 text-[10px] text-[#8892A8]"><Search size={10} />Search...</div>
          <div className="flex items-center gap-1 rounded-md bg-[#161C2E] border border-white/[0.06] px-2 py-1.5 text-[10px] text-[#8892A8]"><Filter size={10} />Filter</div>
        </div>
      </div>
      <div className="rounded-xl border border-white/[0.06] bg-[#161C2E] overflow-hidden flex-1">
        <div className="grid grid-cols-12 gap-2 px-3 py-2 text-[10px] font-semibold text-[#8892A8] border-b border-white/[0.04] uppercase tracking-wider">
          <div className="col-span-4">Trip</div><div className="col-span-3 hidden sm:block">Client</div><div className="col-span-3">Date</div><div className="col-span-2 text-right">Status</div>
        </div>
        {allBookings.map((b, i) => (
          <div key={i} className="grid grid-cols-12 gap-2 px-3 py-2.5 text-[10px] sm:text-xs border-b border-white/[0.03] hover:bg-white/[0.02] transition">
            <div className="col-span-4 min-w-0"><div className="font-medium text-foreground truncate">{b.name}</div><div className="text-[#8892A8]">{b.pax} pax · {b.amount}</div></div>
            <div className="col-span-3 hidden sm:block text-[#8892A8] truncate">{b.client}</div>
            <div className="col-span-3 text-[#8892A8]">{b.date}</div>
            <div className="col-span-2 text-right"><span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-semibold ${b.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>{b.status === 'confirmed' ? <CheckCircle2 size={9} /> : <Clock size={9} />}{b.status}</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TreksContent() {
  const treks = [
    { name: 'Everest Base Camp', region: 'Everest Region', price: 'From $1,200', duration: '14 days', pax: 'Max 12', img: 'bg-gradient-to-br from-[#3A4D8F]/30 to-[#2A3B7A]/20' },
    { name: 'Annapurna Circuit', region: 'Annapurna', price: 'From $900', duration: '12 days', pax: 'Max 10', img: 'bg-gradient-to-br from-[#F07420]/20 to-[#3A4D8F]/20' },
    { name: 'Langtang Valley', region: 'Langtang', price: 'From $600', duration: '7 days', pax: 'Max 8', img: 'bg-gradient-to-br from-emerald-500/20 to-[#3A4D8F]/20' },
  ];
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4"><div><div className="text-sm font-bold text-foreground">Manage Treks</div><div className="text-xs text-[#8892A8]">3 active trekking packages</div></div><button className="flex items-center gap-1 rounded-md bg-[#F07420]/10 text-[#F07420] px-3 py-1.5 text-[11px] font-medium"><ArrowUpRight size={12} />Add new trek</button></div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
        {treks.map((t, i) => (
          <div key={i} className="rounded-xl border border-white/[0.06] bg-[#161C2E] overflow-hidden group cursor-pointer hover:border-[#F07420]/20 transition">
            <div className={`h-16 sm:h-20 ${t.img} relative`}><div className="absolute top-2 left-2 rounded-full bg-black/40 backdrop-blur px-2 py-0.5 text-[9px] text-white font-medium">{t.duration}</div></div>
            <div className="p-2.5 sm:p-3">
              <div className="text-xs font-semibold text-foreground">{t.name}</div>
              <div className="text-[10px] text-[#8892A8] mt-0.5">{t.region} · {t.pax}</div>
              <div className="flex items-center justify-between mt-2"><div className="text-[11px] font-bold text-[#F07420]">{t.price}</div><div className="h-5 w-5 rounded-full bg-white/[0.05] flex items-center justify-center text-[#8892A8] group-hover:bg-[#F07420]/10 group-hover:text-[#F07420] transition"><ChevronRight size={12} /></div></div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-xl border border-white/[0.06] bg-[#161C2E] p-3">
        <div className="text-[10px] font-semibold text-[#8892A8] uppercase tracking-wider mb-2">Trek Availability Calendar</div>
        <div className="grid grid-cols-7 gap-1">
          {['M','T','W','T','F','S','S'].map((d, i) => (<div key={i} className="text-center text-[9px] text-[#8892A8] py-1">{d}</div>))}
          {Array.from({ length: 28 }).map((_, i) => {
            const active = [3,5,8,12,15,19,22,26].includes(i);
            return <div key={i} className={`aspect-square rounded-md flex items-center justify-center text-[9px] ${active ? 'bg-[#F07420]/15 text-[#F07420] font-bold' : 'bg-white/[0.03] text-[#8892A8]'}`}>{i+1}</div>;
          })}
        </div>
      </div>
    </div>
  );
}

function WebsiteContent() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <div><div className="text-sm font-bold text-foreground">Website Live</div><div className="text-xs text-emerald-400">yourcompany.com is online</div></div>
        </div>
        <button className="flex items-center gap-1 rounded-md bg-white/[0.05] border border-white/[0.06] text-foreground px-3 py-1.5 text-[11px] font-medium hover:bg-white/[0.08] transition"><Eye size={12} />Preview</button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-3 flex-1">
        <div className="rounded-xl border border-white/[0.06] bg-[#161C2E] p-3">
          <div className="text-[10px] font-semibold text-[#8892A8] uppercase tracking-wider mb-2">Traffic Overview</div>
          <div className="flex items-end gap-3 mb-2">
            <div><div className="text-2xl font-bold text-foreground">4,231</div><div className="text-[10px] text-[#8892A8]">visitors today</div></div>
            <div className="text-[10px] text-emerald-400 font-medium bg-emerald-500/10 px-1.5 py-0.5 rounded">+18%</div>
          </div>
          <div className="flex items-end gap-[2px] h-16">
            {[35,42,28,55,48,62,75,58,68,82,70,90].map((h, i) => (<div key={i} className="flex-1 rounded-t-sm bg-[#F07420]/40" style={{ height: `${h}%` }} />))}
          </div>
        </div>
        <div className="rounded-xl border border-white/[0.06] bg-[#161C2E] p-3">
          <div className="text-[10px] font-semibold text-[#8892A8] uppercase tracking-wider mb-2">Device Breakdown</div>
          <div className="space-y-2">
            {[{label:'Desktop', pct:'58%', icon:Monitor, color:'bg-[#F07420]'},{label:'Mobile', pct:'32%', icon:Smartphone, color:'bg-[#3A4D8F]'},{label:'Tablet', pct:'10%', icon:MousePointerClick, color:'bg-emerald-400'}].map((d,i)=> (
              <div key={i} className="flex items-center gap-2"><d.icon size={14} className="text-[#8892A8]" /><div className="flex-1"><div className="flex justify-between text-[10px] mb-1"><span className="text-foreground">{d.label}</span><span className="text-[#8892A8]">{d.pct}</span></div><div className="h-1.5 rounded-full bg-white/[0.05]"><div className="h-1.5 rounded-full ${d.color}" style={{ width: d.pct, background: d.color === 'bg-[#F07420]' ? '#F07420' : d.color === 'bg-[#3A4D8F]' ? '#3A4D8F' : '#34d399' }} /></div></div></div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-2 rounded-xl border border-white/[0.06] bg-[#161C2E] p-3">
          <div className="text-[10px] font-semibold text-[#8892A8] uppercase tracking-wider mb-2">Top Pages</div>
          <div className="space-y-1.5">
            {['/everest-base-camp-trek','/annapurna-circuit','/chitwan-safari','/langtang-valley','/about'].map((page,i)=> (
              <div key={i} className="flex items-center justify-between py-1.5 border-b border-white/[0.03] last:border-0">
                <div className="text-[10px] sm:text-xs text-foreground">{page}</div>
                <div className="text-[10px] text-[#8892A8]">{[1240,890,650,420,310][i]} views</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CrmContent() {
  const leads = [
    { name: 'Sarah Johnson', email: 'sarah@email.com', status: 'Hot Lead', last: '2 min ago', color: 'bg-[#F07420]/10 text-[#F07420]' },
    { name: 'Mike Chen', email: 'mike@email.com', status: 'New', last: '1 hr ago', color: 'bg-sky-500/10 text-sky-400' },
    { name: 'Emma Wilson', email: 'emma@email.com', status: 'Follow-up', last: '3 hr ago', color: 'bg-[#3A4D8F]/20 text-[#3A4D8F]' },
    { name: 'David Park', email: 'david@email.com', status: 'Converted', last: '1 day ago', color: 'bg-emerald-500/10 text-emerald-400' },
  ];
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4"><div><div className="text-sm font-bold text-foreground">Customer CRM</div><div className="text-xs text-[#8892A8]">4 leads need attention</div></div><div className="flex items-center gap-1.5"><div className="flex items-center gap-1 rounded-md bg-[#161C2E] border border-white/[0.06] px-2 py-1.5 text-[10px] text-[#8892A8]"><Search size={10} />Search leads...</div></div></div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 sm:gap-3 mb-3">
        <div className="rounded-xl border border-white/[0.06] bg-[#161C2E] p-3 text-center"><div className="text-2xl font-bold text-foreground">24</div><div className="text-[10px] text-[#8892A8]">Total Leads</div></div>
        <div className="rounded-xl border border-white/[0.06] bg-[#161C2E] p-3 text-center"><div className="text-2xl font-bold text-[#F07420]">8</div><div className="text-[10px] text-[#8892A8]">Hot Leads</div></div>
        <div className="rounded-xl border border-white/[0.06] bg-[#161C2E] p-3 text-center"><div className="text-2xl font-bold text-emerald-400">12</div><div className="text-[10px] text-[#8892A8]">Converted</div></div>
      </div>
      <div className="rounded-xl border border-white/[0.06] bg-[#161C2E] overflow-hidden flex-1">
        <div className="grid grid-cols-12 gap-2 px-3 py-2 text-[10px] font-semibold text-[#8892A8] border-b border-white/[0.04] uppercase tracking-wider">
          <div className="col-span-5">Contact</div><div className="col-span-3">Status</div><div className="col-span-4 text-right">Activity</div>
        </div>
        {leads.map((l, i) => (
          <div key={i} className="grid grid-cols-12 gap-2 px-3 py-2.5 text-[10px] sm:text-xs border-b border-white/[0.03] hover:bg-white/[0.02] transition">
            <div className="col-span-5 min-w-0"><div className="font-medium text-foreground truncate flex items-center gap-1.5"><div className="h-5 w-5 rounded-full bg-gradient-to-br from-[#F07420] to-[#3A4D8F] flex items-center justify-center text-[8px] text-white font-bold">{l.name[0]}</div>{l.name}</div><div className="text-[#8892A8] truncate pl-6">{l.email}</div></div>
            <div className="col-span-3"><span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-semibold ${l.color}`}>{l.status}</span></div>
            <div className="col-span-4 text-right text-[#8892A8] flex items-center justify-end gap-1"><Clock size={10} />{l.last}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalyticsContent() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4"><div><div className="text-sm font-bold text-foreground">Analytics</div><div className="text-xs text-[#8892A8]">Performance insights for the last 30 days</div></div><button className="flex items-center gap-1 rounded-md bg-white/[0.05] border border-white/[0.06] text-foreground px-3 py-1.5 text-[11px] font-medium hover:bg-white/[0.08] transition"><Download size={12} />Export</button></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-3">
        {[{l:'Page Views',v:'18.4k',c:'+12%'},{l:'Avg Session',v:'3m 24s',c:'+8%'},{l:'Bounce Rate',v:'34%',c:'-5%'},{l:'Conversions',v:'4.2%',c:'+22%'}].map((s,i)=> (
          <div key={i} className="rounded-xl border border-white/[0.06] bg-[#161C2E] p-2.5 sm:p-3"><div className="text-[10px] sm:text-xs text-[#8892A8]">{s.l}</div><div className="text-lg sm:text-xl font-bold text-foreground mt-0.5">{s.v}</div><div className={`text-[10px] font-medium ${s.c.startsWith('+') ? 'text-emerald-400' : 'text-[#F07420]'}`}>{s.c}</div></div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-3 flex-1">
        <div className="rounded-xl border border-white/[0.06] bg-[#161C2E] p-2.5 sm:p-3">
          <div className="text-[10px] font-semibold text-[#8892A8] uppercase tracking-wider mb-2">Traffic Sources</div>
          <div className="space-y-2">
            {[{l:'Organic Search',p:'45%',w:'45%'},{l:'Direct',p:'28%',w:'28%'},{l:'Social Media',p:'18%',w:'18%'},{l:'Referral',p:'9%',w:'9%'}].map((s,i)=> (
              <div key={i}><div className="flex justify-between text-[10px] mb-1"><span className="text-foreground">{s.l}</span><span className="text-[#8892A8]">{s.p}</span></div><div className="h-1.5 rounded-full bg-white/[0.05]"><div className="h-1.5 rounded-full bg-[#F07420]" style={{ width: s.w }} /></div></div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-white/[0.06] bg-[#161C2E] p-2.5 sm:p-3">
          <div className="text-[10px] font-semibold text-[#8892A8] uppercase tracking-wider mb-2">Conversion Funnel</div>
          <div className="flex flex-col items-center gap-1">
            {[{l:'Visitors',v:'18.4k',w:'100%'},{l:'Product Views',v:'8.2k',w:'70%'},{l:'Inquiries',v:'1,284',w:'45%'},{l:'Bookings',v:'347',w:'25%'}].map((f,i)=> (
              <div key={i} className="w-full text-center py-1.5 rounded text-[10px] font-medium text-foreground" style={{ width: f.w, background: i === 0 ? 'rgba(240,116,32,0.20)' : i === 1 ? 'rgba(240,116,32,0.15)' : i === 2 ? 'rgba(58,77,143,0.20)' : 'rgba(58,77,143,0.12)' }}>{f.l}: {f.v}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
