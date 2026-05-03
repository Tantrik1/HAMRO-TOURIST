import React from 'react';
import { HeroBanner } from './components/HeroBanner';
import { FeaturedTours } from './components/FeaturedTours';
import { RegionShowcase } from './components/RegionShowcase';
import { ActivityCards } from './components/ActivityCards';
import { PackageShowcase } from './components/PackageShowcase';
import { Testimonials } from './components/Testimonials';
import { AboutUs } from './components/AboutUs';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ContactForm } from './components/ContactForm';
import { NewsletterSignup } from './components/NewsletterSignup';

export const THEME_ID = 'serene-journey' as const;
export const THEME_NAME = 'Serene Journey';
export const THEME_DESCRIPTION = 'Light, minimal, photography-first design with clean whitespace';

export const themeComponents: Record<string, React.FC<any>> = {
  'hero-banner': HeroBanner,
  'featured-tours': FeaturedTours,
  'region-showcase': RegionShowcase,
  'activity-cards': ActivityCards,
  'package-showcase': PackageShowcase,
  'testimonials': Testimonials,
  'about-us': AboutUs,
  'why-choose-us': WhyChooseUs,
  'contact-form': ContactForm,
  'newsletter-signup': NewsletterSignup,
} as const;

export {
  HeroBanner,
  FeaturedTours,
  RegionShowcase,
  ActivityCards,
  PackageShowcase,
  Testimonials,
  AboutUs,
  WhyChooseUs,
  ContactForm,
  NewsletterSignup,
};
