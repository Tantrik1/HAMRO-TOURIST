'use client';

import { useAuthStore } from '@/store/auth-store';
import { cn } from '@/lib/utils';
import {
  Globe, Palette, Layout, MousePointerClick,
  Map, Mountain, Compass, Package,
  Users, Contact,
  BarChart3, TrendingUp, PieChart,
  Wallet, Building2, Settings, Activity,
  ArrowRight,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface ModuleCard {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  iconColor: string;
  href: string;
  items: string[];
  comingSoon?: boolean;
}

const modules: ModuleCard[] = [
  {
    id: 'website',
    title: 'Website Management',
    description: 'Themes, domains, builder, and drag-and-drop tools',
    icon: Globe,
    iconBg: 'bg-ht-cyan/15',
    iconColor: 'text-ht-cyan',
    href: '/dashboard/website',
    items: ['Theme chooser', 'Domain management', 'Custom builder', 'Drag & drop'],
  },
  {
    id: 'treks',
    title: 'Treks / Tours Management',
    description: 'Countries, regions, destinations, activities, and packages',
    icon: Mountain,
    iconBg: 'bg-ht-violet/15',
    iconColor: 'text-ht-violet',
    href: '/dashboard/products',
    items: ['Countries', 'Regions', 'Destinations', 'Activities', 'Treks', 'Tours', 'Packages'],
  },
  {
    id: 'customers',
    title: 'Customer Management',
    description: 'Leads pipeline and customer records',
    icon: Users,
    iconBg: 'bg-[#F97316]/15',
    iconColor: 'text-[#F97316]',
    href: '/dashboard/crm',
    items: ['Leads', 'Customers'],
  },
  {
    id: 'analytics',
    title: 'Analytics',
    description: 'Website, sales, and finance insights',
    icon: BarChart3,
    iconBg: 'bg-[#84CC16]/15',
    iconColor: 'text-[#84CC16]',
    href: '/dashboard/analytics',
    items: ['Website', 'Sales', 'Finance'],
  },
  {
    id: 'finance',
    title: 'Finance Management',
    description: 'Invoices, payouts, and financial reports',
    icon: Wallet,
    iconBg: 'bg-ht-rose/10',
    iconColor: 'text-ht-rose/60',
    href: '#',
    items: ['Invoices', 'Payouts', 'Reports'],
    comingSoon: true,
  },
  {
    id: 'vendors',
    title: 'Vendor Management',
    description: 'Vendor onboarding and contract management',
    icon: Building2,
    iconBg: 'bg-ht-rose/10',
    iconColor: 'text-ht-rose/60',
    href: '#',
    items: ['Vendors', 'Contracts'],
    comingSoon: true,
  },
  {
    id: 'settings',
    title: 'Settings',
    description: 'Account, team, and platform preferences',
    icon: Settings,
    iconBg: 'bg-ht-soft/10',
    iconColor: 'text-ht-soft',
    href: '/dashboard/settings',
    items: ['General', 'Team', 'Billing'],
  },
  {
    id: 'recent',
    title: 'Recent Activities',
    description: 'Audit trail and recent actions log',
    icon: Activity,
    iconBg: 'bg-ht-rose/10',
    iconColor: 'text-ht-rose/60',
    href: '#',
    items: ['Audit logs', 'Actions'],
    comingSoon: true,
  },
];

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8 sm:mb-10">
        <h1 className="font-display font-bold text-2xl sm:text-3xl text-ht-text">
          Welcome back, {user?.firstName}
        </h1>
        <p className="font-body text-ht-soft mt-1 text-sm sm:text-base">
          Choose a module to manage your agency.
        </p>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
        {modules.map((mod, i) => (
          <motion.div
            key={mod.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
          >
            {mod.comingSoon ? (
              <div className={cn(
                'relative h-full bg-ht-surface border border-ht-border rounded-xl2 p-5 sm:p-6',
                'opacity-50 cursor-not-allowed select-none'
              )}>
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-ht-rose/10 text-ht-rose/70 border border-ht-rose/20">
                    Coming Soon
                  </span>
                </div>
                <ModuleCardContent mod={mod} />
              </div>
            ) : (
              <a
                href={mod.href}
                className={cn(
                  'group relative flex flex-col h-full bg-ht-surface border border-ht-border rounded-xl2 p-5 sm:p-6',
                  'hover:border-ht-violet/40 hover:shadow-lg hover:shadow-ht-violet/5',
                  'transition-all duration-300'
                )}
              >
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-4 h-4 text-ht-violet" />
                </div>
                <ModuleCardContent mod={mod} />
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ModuleCardContent({ mod }: { mod: ModuleCard }) {
  const Icon = mod.icon;
  return (
    <>
      <div className={cn('w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center mb-4', mod.iconBg)}>
        <Icon className={cn('w-5 h-5 sm:w-6 sm:h-6', mod.iconColor)} />
      </div>
      <h3 className="font-display font-bold text-base sm:text-lg text-ht-text mb-1.5 pr-6">
        {mod.title}
      </h3>
      <p className="font-body text-xs sm:text-sm text-ht-soft mb-3 sm:mb-4 leading-relaxed">
        {mod.description}
      </p>
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {mod.items.slice(0, 4).map((item) => (
          <span
            key={item}
            className="px-1.5 py-0.5 rounded-md text-[10px] sm:text-xs font-mono bg-ht-surface2 text-ht-text-faint border border-ht-border"
          >
            {item}
          </span>
        ))}
        {mod.items.length > 4 && (
          <span className="px-1.5 py-0.5 rounded-md text-[10px] sm:text-xs font-mono bg-ht-surface2 text-ht-text-faint border border-ht-border">
            +{mod.items.length - 4}
          </span>
        )}
      </div>
    </>
  );
}
