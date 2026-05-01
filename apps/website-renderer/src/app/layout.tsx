import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Travel Agency Website',
  description: 'Powered by Hamro Tourist',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
