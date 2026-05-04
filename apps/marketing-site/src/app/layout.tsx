import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Hamro Tourist — Travel agency website in 10 minutes',
  description: 'Launch your travel agency online in 10 minutes. AI website builder, custom domain, CRM, payments and email automation — all in one.',
  keywords: ['travel agency website', 'Nepal tourism', 'trekking website', 'tour operator software', 'travel CRM', 'Nepal travel SaaS'],
  openGraph: {
    title: 'Hamro Tourist — Travel agency website in 10 minutes',
    description: 'Launch your travel agency online in 10 minutes. AI website builder, custom domain, CRM, payments and email automation — all in one.',
    url: 'https://hamrotourist.com',
    siteName: 'Hamro Tourist',
    locale: 'en_NP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hamro Tourist — Travel agency website in 10 minutes',
    description: 'Launch your travel agency online in 10 minutes.',
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
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground font-sans antialiased">{children}</body>
    </html>
  );
}
