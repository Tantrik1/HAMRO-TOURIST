'use client';

import React, { useState, useRef, useEffect } from 'react';
import type { Country, Region, NavItem } from '../types';

interface MegaMenuProps {
  agencyName: string;
  logo?: string;
  countries: Country[];
  regions: Region[];
  primaryNav?: NavItem[];
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ agencyName, logo, countries, regions, primaryNav }) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getRegionsByCountry = (countryId: string) => regions.filter(r => r.countryId === countryId);

  const navItems: NavItem[] = primaryNav || [
    { label: 'Home', href: '/' },
    {
      label: 'Destinations',
      href: '#',
      children: countries.map(c => ({
        label: c.name,
        href: `/countries/${c.slug}`,
        children: getRegionsByCountry(c.id).map(r => ({
          label: r.name,
          href: `/regions/${r.slug}`,
        })),
      })),
    },
    { label: 'Tours', href: '/tours' },
    { label: 'Treks', href: '/treks' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0A0A0F]/95 backdrop-blur-md border-b border-[#2A2A3A]">
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3">
            {logo ? (
              <img src={logo} alt={agencyName} className="h-8 lg:h-10 object-contain" />
            ) : (
              <span className="font-display font-bold text-xl lg:text-2xl text-[#F1F0FF]">{agencyName}</span>
            )}
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" ref={dropdownRef}>
            {navItems.map((item) => (
              <div key={item.label} className="relative">
                {item.children ? (
                  <>
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                      className={`flex items-center gap-1 px-4 py-2 text-sm font-body font-medium transition-colors ${
                        activeDropdown === item.label ? 'text-[#7C3AED]' : 'text-[#9B9BB8] hover:text-[#F1F0FF]'
                      }`}
                    >
                      {item.label}
                      <svg className={`w-4 h-4 transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {activeDropdown === item.label && item.children && (
                      <div className="absolute top-full left-0 w-[600px] bg-[#111118] border border-[#2A2A3A] rounded-xl shadow-2xl p-6">
                        <div className="grid grid-cols-3 gap-6">
                          {item.children.map((child) => (
                            <div key={child.label}>
                              <a href={child.href} className="block font-body font-semibold text-[#F1F0FF] mb-3 hover:text-[#7C3AED] transition-colors">
                                {child.label}
                              </a>
                              {child.children && (
                                <ul className="space-y-2">
                                  {child.children.slice(0, 5).map((subChild) => (
                                    <li key={subChild.label}>
                                      <a href={subChild.href} className="text-sm text-[#9B9BB8] hover:text-[#06B6D4] transition-colors">
                                        {subChild.label}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <a href={item.href} className="px-4 py-2 text-sm font-body font-medium text-[#9B9BB8] hover:text-[#F1F0FF] transition-colors">
                    {item.label}
                  </a>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <a href="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-body font-semibold text-white bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] hover:shadow-lg hover:shadow-[#7C3AED]/25 transition-all">
              Book Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 text-[#F1F0FF]">
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-[#2A2A3A] py-4">
            <nav className="space-y-2">
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.children ? (
                    <>
                      <button
                        onClick={() => setExpandedMobileItem(expandedMobileItem === item.label ? null : item.label)}
                        className="flex items-center justify-between w-full px-4 py-3 text-[#F1F0FF] font-body font-medium"
                      >
                        {item.label}
                        <svg className={`w-4 h-4 transition-transform ${expandedMobileItem === item.label ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {expandedMobileItem === item.label && (
                        <div className="pl-4 space-y-2">
                          {item.children.map((child) => (
                            <div key={child.label}>
                              <a href={child.href} className="block px-4 py-2 text-[#9B9BB8] hover:text-[#F1F0FF]">{child.label}</a>
                              {child.children && (
                                <div className="pl-4 space-y-1">
                                  {child.children.map((subChild) => (
                                    <a key={subChild.label} href={subChild.href} className="block px-4 py-1 text-sm text-[#5C5C78] hover:text-[#9B9BB8]">
                                      {subChild.label}
                                    </a>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <a href={item.href} className="block px-4 py-3 text-[#F1F0FF] font-body font-medium hover:bg-[#1A1A24] rounded-lg">
                      {item.label}
                    </a>
                  )}
                </div>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
