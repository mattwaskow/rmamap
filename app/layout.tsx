import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PrivateLink BOV Platform',
  description: 'Premium interactive BOV presentation platform for multifamily brokerage.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
