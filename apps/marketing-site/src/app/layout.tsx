import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Hamro Tourist — Build a stunning travel agency website in minutes',
  description:
    'The all-in-one SaaS for travel agencies. Build a beautiful website, manage tours, treks, activities and packages, and grow your business — all in one place.',
  openGraph: {
    title: 'Hamro Tourist',
    description: 'Build your travel agency website in minutes',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-ht-ink text-ht-text font-body antialiased">{children}</body>
    </html>
  );
}
