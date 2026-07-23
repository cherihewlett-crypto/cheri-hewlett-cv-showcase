import type { Metadata } from 'next';
import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google';
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

export const metadata: Metadata = {
  title: 'Cheri Hewlett — AI-native operating executive',
  description:
    'Platform executive who builds the systems. Enterprise P&L leadership at BlackLine, and four production AI systems built hands-on — with the engineering record to check it against.',
  openGraph: {
    title: 'Cheri Hewlett — AI-native operating executive',
    description:
      'Enterprise platform leadership, and four production AI systems built hands-on. Every claim on this page is checked against a live engineering record.',
    type: 'profile',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
