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
  alternates: { canonical: '/' },
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

// Structured data for machine readers. AI resume screeners and crawlers parse
// schema, not animation — this lets an agent extract identity, skills, work,
// and links cleanly, without scraping the rendered layout. Kept in sync with
// the visible page; no employer named, consistent with the positioning.
const PERSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Cheri Hewlett',
  honorificSuffix: 'CPA',
  jobTitle: 'Technology & Innovation Executive',
  description:
    'Technology and innovation executive who builds. Draws the bridge from problem to solution through technology — choosing the problems that return quantifiable value, then building the right solution for each.',
  url: 'https://cherihewlett.dev',
  sameAs: [
    'https://linkedin.com/in/cheri-hewlett',
    'https://github.com/cherihewlett-crypto',
  ],
  knowsAbout: [
    'Agentic AI',
    'Multi-agent orchestration',
    'AI governance and safety',
    'Product and platform strategy',
    'Enterprise software',
    'Financial reporting and the office of the CFO',
    'System migration and change management',
    'Private equity and due diligence',
    'Zero-to-one product delivery and scaling',
  ],
  hasCredential: [
    { '@type': 'EducationalOccupationalCredential', credentialCategory: 'Certified Public Accountant (CPA)' },
  ],
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'University of Maryland' },
    { '@type': 'CollegeOrUniversity', name: 'Liberty University' },
  ],
  veteranStatus: 'U.S. Air Force Veteran',
  address: { '@type': 'PostalAddress', addressLocality: 'Los Angeles', addressRegion: 'CA', addressCountry: 'US' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        {/*
          The imported design mockups (homepage + résumé) reference fonts by
          literal family name in inline styles, so the named families must be
          available — next/font above only exposes them as CSS variables.
          React 19 hoists these <link> tags into <head> and dedupes them.
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..100,400..700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_LD) }} />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
