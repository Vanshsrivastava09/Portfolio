import type { Metadata } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import './globals.css';

const displayFont = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800'],
});

const sansFont = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vansh-portfolio.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Vansh Srivastava | Portfolio',
  description:
    'Portfolio of Vansh Srivastava — CSCE student skilled in Python, SQL, Machine Learning, and Data Analytics.',
  openGraph: {
    title: 'Vansh Srivastava | Portfolio',
    description: 'CSCE student building AI-powered applications, dashboards, and backend systems.',
    images: ['/og-image.svg'],
    type: 'website',
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${displayFont.variable} ${sansFont.variable}`}>
      <body>{children}</body>
    </html>
  );
}
