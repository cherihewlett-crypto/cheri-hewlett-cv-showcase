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
  title: 'Cheri Hewlett, CPA — Technology executive, builder, veteran',
  description:
    'As AI takes on more of the what and the how, leadership becomes about the why and the who. Technology executive, builder, CPA and veteran — with four production AI systems and the engineering record to check the claims against.',
  openGraph: {
    title: 'Cheri Hewlett, CPA — Technology executive, builder, veteran',
    description:
      'The organizations that win won’t be the ones that adopted AI fastest — they’ll be the ones that chose the right problems. Four production AI systems, built hands-on.',
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
