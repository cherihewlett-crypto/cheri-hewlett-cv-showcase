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
    'Platform executive who builds the systems. Four production AI systems — multi-agent orchestration, governed autonomy, and a verification layer — with the engineering record to check the claims against.',
  openGraph: {
    title: 'Cheri Hewlett — AI-native operating executive',
    description:
      'Four production AI systems, built hands-on. Every headline figure on this page is recomputed from the engineering record rather than typed in.',
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
