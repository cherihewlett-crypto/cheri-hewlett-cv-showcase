'use client';

import { useEffect, useState } from 'react';
import type { RailSection } from './Rail';
import styles from './MobileNav.module.css';

/**
 * Navigation below the rail's breakpoint.
 *
 * The desktop rail is hidden under 60rem, which left phone readers scrolling
 * blind through thirteen sections with no way to jump. This is a plain
 * disclosure — a button that opens a list of the same sections — rather than
 * an off-canvas drawer, because the whole job is "show me the contents and
 * let me pick one".
 */
export default function MobileNav({ sections }: { sections: RailSection[] }) {
  const [open, setOpen] = useState(false);

  // A jump should close the sheet, and Escape should always get you out.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div className={styles.wrap}>
      <button
        type="button"
        className={styles.toggle}
        aria-expanded={open}
        aria-controls="mobile-sections"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? 'Close' : 'Sections'}
      </button>

      <ul id="mobile-sections" className={styles.sheet} hidden={!open}>
        {sections.map((s) => (
          <li key={s.id}>
            <a className={styles.item} href={`#${s.id}`} onClick={() => setOpen(false)}>
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
