'use client';

import { motion, useReducedMotion } from 'motion/react';
import styles from './HeroTitle.module.css';

/**
 * The headline resolves a line at a time, with the turn — "almost none" —
 * arriving last and in the signal colour. The claim is the argument of the
 * page, so it earns a staged delivery rather than appearing all at once.
 */

const LINES = [
  { text: 'Most AI', accent: false },
  { text: 'supplements work.', accent: false },
  { text: 'I build the kind', accent: true },
  { text: 'that elevates people.', accent: true },
];

export default function HeroTitle() {
  const reduce = useReducedMotion();

  return (
    <h1 className={`display display--hero ${styles.title}`}>
      {LINES.map((line, i) => (
        <span key={line.text} className={styles.lineMask}>
          <motion.span
            className={`${styles.line} ${line.accent ? styles.accent : ''}`}
            initial={reduce ? false : { y: '108%' }}
            animate={{ y: '0%' }}
            transition={{
              delay: 0.12 + i * 0.11,
              duration: 0.78,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {line.text}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}
