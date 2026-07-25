'use client';

import { motion, useInView, useReducedMotion } from 'motion/react';
import { useRef } from 'react';
import { proof } from '@/lib/proof';
import styles from './Stages.module.css';

/**
 * Idea to scale — the experience proof.
 *
 * The rare part of a 0→1 leader is having actually operated at every stage,
 * not one or two. Each stage below carries a concrete proof drawn from real
 * work: framing the problem, building the prototype, funding the case, shipping
 * the system, landing it in the enterprise, and carrying it to scale. Kept
 * directional on internal figures per public-company constraints.
 */

const STAGES = [
  { stage: 'Idea', proof: 'Quantify the friction and frame the problem others haven’t named yet — problem-led, not brief-led.' },
  { stage: 'Prototype', proof: 'A working prototype in hours, not sprints. Real systems exist because I build them, not because I commission them.' },
  { stage: 'Fund', proof: 'Idea to a funded, investment-grade business case — evidence-backed and compliance-cleared before a dollar is committed.' },
  {
    stage: 'Build',
    proof: `Ship the real thing — ${proof.totals.authoredCommits.toLocaleString('en-US')} authored commits across ${proof.totals.systems} production systems, running on real data.`,
  },
  { stage: 'Launch', proof: 'Into the enterprise — connectors, activation, and go-lives: the unglamorous surface that decides whether software actually lands.' },
  { stage: 'Scale', proof: 'Carry it commercially — a platform line from zero to a global enterprise footprint, with full P&L ownership.' },
];

export default function Stages() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-12% 0px' });
  const reduce = useReducedMotion();

  return (
    <div className={styles.wrap} ref={ref}>
      <h3 className={styles.head}>
        Idea to scale — <span className={styles.headAccent}>I’ve operated at every stage</span>
      </h3>

      {/* A widening track: zero on the left, scale on the right. */}
      <div className={styles.track} aria-hidden="true">
        {STAGES.map((_, i) => (
          <motion.span
            key={i}
            className={styles.seg}
            style={{ flex: i + 1 }}
            initial={reduce ? false : { scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </div>

      <ol className={styles.list}>
        {STAGES.map((s, i) => (
          <motion.li
            key={s.stage}
            className={styles.item}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className={styles.no} aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className={styles.stage}>{s.stage}</span>
            <span className={styles.proof}>{s.proof}</span>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
