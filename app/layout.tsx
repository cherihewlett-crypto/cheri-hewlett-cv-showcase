import type { Metadata } from 'next';
import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

const display = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-display',
  display: 'swap',
});

const body = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

// metadataBase makes the generated OG/Twitter card resolve to an absolute URL,
// which social platforms require. Update this when a custom domain is attached.
export const metadata: Metadata = {
  metadataBase: new URL('https://cherihewlett.dev'),
  title: 'Cheri Hewlett — Technology & innovation executive, builder',
  description:
    'I draw the bridge from problem to solution through technology — choosing the problems that return quantifiable value and deliver impact, then building the right solution for each. Technology and innovation executive with four production AI systems and the engineering record to check every claim against.',
  openGraph: {
    title: 'Cheri Hewlett — Technology & innovation executive, builder',
    description:
      'From problem to solution through technology — the right solution for the problems that return quantifiable value. Four production AI systems, built hands-on, with the receipts.',
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cheri Hewlett — Technology & innovation executive, builder',
    description:
      'From problem to solution through technology — the right solution for the problems that return quantifiable value.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
