import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hamro Tourist - Build Your Travel Agency Website',
  description: 'Create a professional travel agency website in minutes. Manage tours, treks, activities, and packages with our SaaS platform.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
