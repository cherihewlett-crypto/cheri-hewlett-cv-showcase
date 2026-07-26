import type { Metadata } from 'next';
import Script from 'next/script';
import { RESUME_HTML } from '../_generated/resume-body';
import '../_generated/resume.css';

/**
 * Résumé — the "Resume" design imported from Claude Design
 * (design-src/Resume.dc.html). It is a <doc-page> flowing document: the
 * design's own web component (public/doc-page.js) paints the on-screen sheet
 * and owns the print/PDF geometry, so this route is a print-perfect résumé as
 * well as a web page. Content is rendered verbatim from the built mockup.
 */
export const metadata: Metadata = {
  title: 'Cheri Hewlett, CPA — Résumé',
  description:
    'Résumé of Cheri Hewlett, CPA — technology and innovation executive, AI-native builder, P&L operator, and U.S. Air Force veteran.',
  alternates: { canonical: '/resume' },
};

export default function ResumePage() {
  return (
    <>
      {/* Screen-only chrome (hidden in print/PDF via resume.css): a clean way
          back to the profile and a one-click PDF download. */}
      <nav className="resume-nav" aria-label="Résumé navigation">
        <a href="/">← Cheri Hewlett</a>
        <a href="/Cheri_Hewlett_Resume.pdf" download>
          Download PDF ↓
        </a>
      </nav>
      <div dangerouslySetInnerHTML={{ __html: RESUME_HTML }} />
      <Script src="/doc-page.js" strategy="afterInteractive" />
      {/* Fit the fixed letter-width sheet to narrow viewports (numeric zoom —
          the only widely-supported form). Recomputes on resize and after the
          web component upgrades / fonts load. Screen only; print keeps 1:1. */}
      <Script id="resume-fit" strategy="afterInteractive">{`
        (function () {
          function fit() {
            var dp = document.querySelector('doc-page');
            if (!dp) return;
            dp.style.zoom = '';
            var natural = dp.getBoundingClientRect().width;
            var avail = document.documentElement.clientWidth;
            if (natural > avail + 0.5) dp.style.zoom = (avail / natural).toFixed(4);
          }
          window.addEventListener('resize', fit, { passive: true });
          window.addEventListener('load', fit);
          if (window.customElements) {
            customElements.whenDefined('doc-page').then(function () {
              requestAnimationFrame(fit); setTimeout(fit, 200);
            });
          }
          if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
          [0, 300, 800].forEach(function (t) { setTimeout(fit, t); });
        })();
      `}</Script>
    </>
  );
}
