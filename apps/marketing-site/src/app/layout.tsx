import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Hamro Tourist — Get Your Travel Agency Online in 10 Minutes',
  description: 'The all-in-one SaaS for Nepal travel agencies. Beautiful website, product builder, CRM, and custom domain — set up in under 10 minutes. Free for first 1,000 agencies.',
  keywords: ['travel agency website', 'Nepal tourism', 'trekking website', 'tour operator software', 'travel CRM', 'Nepal travel SaaS'],
  openGraph: {
    title: 'Hamro Tourist — Get Your Travel Agency Online in 10 Minutes',
    description: 'The all-in-one SaaS for Nepal travel agencies. Beautiful website, product builder, CRM, and custom domain.',
    url: 'https://hamrotourist.com',
    siteName: 'Hamro Tourist',
    locale: 'en_NP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hamro Tourist — Get Your Travel Agency Online in 10 Minutes',
    description: 'The all-in-one SaaS for Nepal travel agencies.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-ht-ink text-ht-text font-body antialiased">{children}</body>
    </html>
  );
}
