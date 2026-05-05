import type { Metadata, Viewport } from 'next';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import './globals.css';
import LoadingBar from '@/components/loading-bar';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-display',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://hamrotourist.com'),
  title: 'Hamro Tourist — Travel agency website in 10 minutes',
  description: 'Launch your travel agency online in 10 minutes. AI website builder, custom domain, CRM, payments and email automation — all in one.',
  keywords: ['travel agency website', 'Nepal tourism', 'trekking website', 'tour operator software', 'travel CRM', 'Nepal travel SaaS'],
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'Hamro Tourist — Travel agency website in 10 minutes',
    description: 'Launch your travel agency online in 10 minutes. AI website builder, custom domain, CRM, payments and email automation — all in one.',
    url: 'https://hamrotourist.com',
    siteName: 'Hamro Tourist',
    locale: 'en_NP',
    type: 'website',
    images: ['/opengraph-image'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hamro Tourist — Travel agency website in 10 minutes',
    description: 'Launch your travel agency online in 10 minutes.',
    images: ['/opengraph-image'],
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
    <html lang="en" className={`dark ${playfair.variable} ${dmSans.variable}`}>
      <body className="bg-background text-foreground font-sans antialiased selection:bg-primary/30 selection:text-primary">
        <LoadingBar />
        {children}
      </body>
    </html>
  );
}
