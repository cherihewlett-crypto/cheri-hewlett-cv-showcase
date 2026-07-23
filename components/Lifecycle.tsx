'use client';

import { motion, useInView, useReducedMotion } from 'motion/react';
import { useRef } from 'react';
import styles from './Lifecycle.module.css';

/**
 * Prototype through to global launch.
 *
 * CPO and chief-innovation scopes are written as a lifecycle — ideation,
 * rapid prototyping, evidence-based go/kill gates, commercialisation, scaled
 * launch and post-launch performance. This section walks that arc and says
 * what sits at each stage, because the common gap in an innovation leader is
 * not having carried an idea across all four.
 */

const STAGES = [
  {
    stage: 'Prototype',
    role: 'Rapid prototyping, design thinking, minimum viable tests.',
    mine: 'Working prototypes stood up in hours, not sprints — the reason four systems exist at all rather than four decks describing them.',
    weight: 1,
  },
  {
    stage: 'Prove',
    role: 'Stage-gate progression with evidence-based go and kill decisions.',
    mine: 'Phase gates that refuse to advance on assertion: every item states what was verified and how, and nothing advances at medium confidence. Innovation Hub exists to run exactly this triage across a portfolio of prototypes.',
    weight: 1.6,
  },
  {
    stage: 'Harden',
    role: 'Production readiness, quality, and operational ownership.',
    mine: 'Migrations under governance, adversarial safety suites, CI gates that block on drift, and completion gated on authenticated proof rather than self-report.',
    weight: 2.3,
  },
  {
    stage: 'Scale',
    role: 'Commercial launch, platform consolidation, global enterprise rollout.',
    mine: 'Enterprise connectors, SSO activation, and multi-system rollout — carried commercially, including finding product-market fit across a global enterprise base and consolidating fragmented lines into one platform.',
    weight: 3.2,
  },
];

export default function Lifecycle() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  const reduce = useReducedMotion();

  return (
    <div className={styles.wrap} ref={ref}>
      {/* The bar widens stage by stage — the arc is about increasing scale,
          so the visual carries that rather than repeating equal blocks. */}
      <div className={styles.bar} aria-hidden="true">
        {STAGES.map((s, i) => (
          <motion.span
            key={s.stage}
            className={styles.segment}
            style={{ flex: s.weight }}
            initial={reduce ? false : { scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.75, delay: 0.15 + i * 0.18, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </div>

      <ol className={styles.list}>
        {STAGES.map((s, i) => (
          <motion.li
            key={s.stage}
            className={styles.item}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 + i * 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className={styles.stage}>{s.stage}</h3>
            <p className={styles.role}>{s.role}</p>
            <p className={styles.mine}>{s.mine}</p>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
