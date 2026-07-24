'use client';

import { motion, useInView, useReducedMotion } from 'motion/react';
import { useRef } from 'react';
import styles from './Arsenal.module.css';

/**
 * The capability inventory.
 *
 * The job here is magnitude and density — 302 catalogued capabilities is a
 * number nobody guesses, and the point is felt better by seeing 302 marks than
 * by reading the figure.
 *
 * Deliberately ONE hue. Type is carried by grouping and label, not by colour,
 * so this never becomes an eight-hue categorical palette that would need CVD
 * validation and would read as a rainbow. Length and count encode magnitude;
 * colour encodes nothing, which is why it can stay constant.
 */

const GROUPS = [
  { code: 'PAT', label: 'Architecture patterns', n: 122, note: 'Reusable engines and scaffolds — routing, consolidation, audit trail, memory lifecycle' },
  { code: 'CMP', label: 'Components', n: 40, note: 'Code modules built once and pulled across projects' },
  { code: 'LSN', label: 'Lessons', n: 32, note: 'Durable failure patterns, recorded so they are not repeated' },
  { code: 'FRM', label: 'Frameworks', n: 32, note: 'Process and decision methodologies — gates, protocols, review models' },
  { code: 'SKL', label: 'Agent skills', n: 26, note: 'Defined capabilities an agent can invoke by name' },
  { code: 'RES', label: 'Research', n: 22, note: 'Architecture, design, and market findings kept as evidence' },
  { code: 'TPL', label: 'Templates', n: 20, note: 'Reusable documents, prompts, and executive communications' },
  { code: 'DSN', label: 'Design systems', n: 8, note: 'UI systems, dashboard standards, visual templates' },
];

const TOTAL = GROUPS.reduce((a, g) => a + g.n, 0);
const AVAILABLE = 252;

export default function Arsenal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-12% 0px' });
  const reduce = useReducedMotion();

  let markIndex = 0;

  return (
    <div ref={ref}>
      <div className={styles.headline}>
        <p className={styles.hero}>
          <span className={styles.heroNum}>{TOTAL}</span>
          <span className={styles.heroLabel}>
            reusable capabilities
            <br />
            catalogued and maintained
          </span>
        </p>
        <p className={styles.heroNote}>
          Built once, referenced everywhere. Every capability carries an ID, an owner, and the list of projects
          consuming it — so the next build pulls instead of rebuilding. {AVAILABLE} are production-ready today; the
          rest are registered the moment work starts on them, so nobody duplicates one by accident.
        </p>
      </div>

      <div className={styles.groups}>
        {GROUPS.map((g, gi) => (
          <div className={styles.group} key={g.code}>
            <div className={styles.groupHead}>
              <span className={styles.code}>{g.code}</span>
              <h3 className={styles.label}>{g.label}</h3>
              <span className={styles.count}>{g.n}</span>
            </div>

            {/* One mark per capability. Density is the message. */}
            <div className={styles.marks} role="img" aria-label={`${g.n} ${g.label.toLowerCase()}`}>
              {Array.from({ length: g.n }, (_, i) => {
                const delay = 0.15 + markIndex * 0.0016;
                markIndex += 1;
                return (
                  <motion.span
                    key={i}
                    className={styles.mark}
                    initial={reduce ? false : { opacity: 0, scale: 0.4 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.32, delay, ease: 'easeOut' }}
                  />
                );
              })}
            </div>

            <p className={styles.note}>{g.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
