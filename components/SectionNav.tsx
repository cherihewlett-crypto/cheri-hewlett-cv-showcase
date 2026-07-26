'use client';

import { useEffect, useState } from 'react';
import styles from './SectionNav.module.css';

export type NavSection = { id: string; label: string };

/**
 * Persistent section navigation with scroll-spy. Always visible — a vertical
 * rail on desktop (in the right gutter) and a compact dot bar on mobile — so
 * the reader can jump between sections and always sees which one they're in.
 * The active section is detected via an IntersectionObserver band across the
 * middle of the viewport.
 */
export default function SectionNav({ sections }: { sections: NavSection[] }) {
  const [active, setActive] = useState(sections[0]?.id ?? '');

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const inBand = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (inBand[0]) setActive((inBand[0].target as HTMLElement).id);
      },
      // a thin band across the vertical middle: whichever section crosses it wins
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (typeof history !== 'undefined') history.replaceState(null, '', `#${id}`);
  };

  return (
    <nav className={styles.nav} aria-label="Page sections">
      <ul className={styles.list}>
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              onClick={go(s.id)}
              className={`${styles.item} ${active === s.id ? styles.active : ''}`}
              aria-current={active === s.id ? 'true' : undefined}
            >
              <span className={styles.dot} aria-hidden="true" />
              <span className={styles.label}>{s.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
