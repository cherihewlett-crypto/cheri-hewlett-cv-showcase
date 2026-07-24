'use client';

import { motion, useInView, useReducedMotion } from 'motion/react';
import { useRef } from 'react';
import styles from './Convergence.module.css';

/**
 * The uniqueness argument.
 *
 * Senior AI roles are written asking for domain fluency, product ownership,
 * engineering credibility, and people leadership. Candidates almost always
 * bring two. The section's job is to show four, each with its own evidence,
 * and then name the intersection — so the reader does not have to assemble
 * the argument themselves.
 *
 * The `common` line on each column is deliberate: naming what the typical
 * candidate in that lane lacks is what makes the convergence legible.
 */

const DIMENSIONS = [
  {
    key: 'Domain',
    title: 'Office of the CFO',
    credential: 'CPA · MS Accounting · two decades in enterprise finance software',
    proof:
      'A library of accounting rules that each cite their own source, so an auditor can check any answer back to the standard it came from. It drives a close-and-consolidation engine where every number is traceable — because in this work a confident guess is a reportable event.',
    common: 'Most AI leaders learn this domain from a customer call.',
  },
  {
    key: 'Product',
    title: 'Zero to one, then to scale',
    credential: 'Platform line from concept to market with full P&L ownership',
    proof:
      'Product, engineering, sales and customer success under one owner, carried commercially. I have also sat in the other seats — implementing, selling and supporting the product, which is why I know where plans meet reality.',
    common: 'Most engineers have never carried a P&L.',
  },
  {
    key: 'Engineering',
    title: 'Hands-on, in production',
    credential: 'Self-taught in agent architectures, MCP, and Supabase',
    proof:
      'Four systems designed and written personally, start to finish, and running against real financial data rather than sitting in a demo folder. I am not one step removed from how the thing actually works.',
    common: 'Most executives commission the build and summarise it.',
  },
  {
    key: 'Leadership',
    title: 'People first, always',
    credential: 'U.S. Air Force — mission first, people always',
    proof:
      'Rose from customer success manager to senior executive leadership. Organizations don’t outperform because they obsess over customers; they outperform because they invest in the people serving them.',
    common: 'Most builders optimise the system and forget who has to run it.',
  },
];

export default function Convergence() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  const reduce = useReducedMotion();

  return (
    <div ref={ref}>
      <div className={styles.grid}>
        {DIMENSIONS.map((d, i) => (
          <motion.article
            key={d.key}
            className={styles.col}
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className={styles.key}>{d.key}</p>
            <h3 className={styles.title}>{d.title}</h3>
            <p className={styles.credential}>{d.credential}</p>
            <p className={styles.proof}>{d.proof}</p>
            <p className={styles.common}>{d.common}</p>
          </motion.article>
        ))}
      </div>

      {/* Four tracks resolving into one — the argument, drawn. */}
      <div className={styles.merge} aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <motion.span
            key={i}
            className={styles.track}
            initial={reduce ? false : { scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.55 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </div>

      <motion.p
        className={styles.verdict}
        initial={reduce ? false : { opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
      >
        That combination is the whole argument. Everything else on this page is evidence for it.
      </motion.p>
    </div>
  );
}
