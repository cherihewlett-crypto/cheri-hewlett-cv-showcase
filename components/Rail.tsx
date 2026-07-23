'use client';

import { useEffect, useState } from 'react';
import styles from './Rail.module.css';

/**
 * A persistent instrument rail. It tracks reading position the way a monitor
 * tracks a running process, and marks each section as the reader reaches it.
 * On narrow screens it is removed entirely rather than reflowed — a squeezed
 * instrument is worse than no instrument.
 */

export type RailSection = { id: string; label: string };

export default function Rail({ sections, stillAt }: { sections: RailSection[]; stillAt: string }) {
  const [active, setActive] = useState(sections[0]?.id ?? '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-20% 0px -70% 0px' },
    );

    for (const section of sections) {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [sections]);

  return (
    <aside className={styles.rail} aria-label="Page sections">
      <div className={styles.sticky}>
        <a className={styles.mark} href="#top">
          CH
        </a>

        <nav className={styles.nav}>
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`${styles.item} ${active === section.id ? styles.isActive : ''}`}
              aria-current={active === section.id ? 'true' : undefined}
            >
              <span className={styles.tick} aria-hidden="true" />
              {section.label}
            </a>
          ))}
        </nav>

        <p className={styles.stamp}>
          <span className={styles.pulse} aria-hidden="true" />
          record checked
          <br />
          {stillAt}
        </p>
      </div>
    </aside>
  );
}
