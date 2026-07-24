'use client';

import { motion, useMotionValueEvent, useScroll } from 'motion/react';
import { useState } from 'react';
import styles from './TopBar.module.css';

/**
 * A recruiter who glances for thirty seconds should never have to scroll to
 * act. This bar appears once the hero is behind them and carries identity plus
 * the three things they actually want: the résumé, LinkedIn, and a way to make
 * contact. It stays out of the way until it is useful.
 */
export default function TopBar() {
  const { scrollY } = useScroll();
  const [shown, setShown] = useState(false);

  useMotionValueEvent(scrollY, 'change', (y) => setShown(y > 520));

  return (
    <motion.div
      className={styles.bar}
      initial={false}
      animate={{ y: shown ? 0 : '-105%' }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden={!shown}
    >
      <a className={styles.name} href="#top">
        Cheri Hewlett, CPA
      </a>
      <span className={styles.role}>Technology executive · Builder · Veteran</span>
      <nav className={styles.actions}>
        <a className={styles.action} href="/resume/cheri-hewlett-cv.md" tabIndex={shown ? 0 : -1}>
          Résumé
        </a>
        <a className={styles.action} href="https://linkedin.com/in/cheri-hewlett" tabIndex={shown ? 0 : -1}>
          LinkedIn
        </a>
        <a className={`${styles.action} ${styles.primary}`} href="#contact" tabIndex={shown ? 0 : -1}>
          Contact
        </a>
      </nav>
    </motion.div>
  );
}
