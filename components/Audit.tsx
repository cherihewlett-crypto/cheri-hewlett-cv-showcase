'use client';

import { motion, useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';
import type { Claim } from '@/lib/proof';
import styles from './Audit.module.css';

/**
 * The signature element.
 *
 * Every headline claim on this page resolves in front of the reader: the row
 * runs a check, then settles into either "verified" (recomputed from the
 * engineering record at build time) or "attested" (a career fact no script can
 * confirm). Keeping those two states visibly different is the whole argument —
 * it is the same discipline the underlying systems enforce on themselves.
 */

const CHECK_FRAMES = ['reading git log', 'counting refs', 'excluding bots', 'reconciling'];

function Row({ claim, index, stillAt }: { claim: Claim; index: number; stillAt: string }) {
  const reduce = useReducedMotion();
  const [settled, setSettled] = useState(Boolean(reduce));
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const startDelay = 420 + index * 260;
    const ticker = setInterval(() => setFrame((f) => f + 1), 130);
    const done = setTimeout(() => {
      clearInterval(ticker);
      setSettled(true);
    }, startDelay + 620);
    return () => {
      clearInterval(ticker);
      clearTimeout(done);
    };
  }, [index, reduce]);

  const verified = claim.state === 'verified';

  return (
    <motion.li
      className={styles.row}
      initial={reduce ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.32 + index * 0.075, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className={styles.value}>{claim.value}</span>
      <span className={styles.statement}>{claim.statement}</span>
      <span className={styles.source}>{claim.source}</span>
      <span
        className={`${styles.state} ${settled ? (verified ? styles.isVerified : styles.isAttested) : styles.isChecking}`}
        aria-live="polite"
      >
        {settled ? (
          <>
            <span aria-hidden="true" className={styles.glyph}>
              {verified ? '✓' : '—'}
            </span>
            {verified ? `verified ${stillAt}` : 'attested'}
          </>
        ) : (
          <>
            <span aria-hidden="true" className={styles.glyph}>
              ▸
            </span>
            {CHECK_FRAMES[frame % CHECK_FRAMES.length]}
          </>
        )}
      </span>
    </motion.li>
  );
}

export default function Audit({ claims, stillAt }: { claims: Claim[]; stillAt: string }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.head}>
        <span>claim</span>
        <span>source</span>
        <span>state</span>
      </div>
      <ul className={styles.list}>
        {claims.map((claim, i) => (
          <Row key={claim.statement} claim={claim} index={i} stillAt={stillAt} />
        ))}
      </ul>
      <p className={styles.note}>
        Verified figures are recomputed from the engineering record each time this page builds. Attested figures are
        career facts no script can check, and are labelled rather than dressed up as measurements.
      </p>
    </div>
  );
}
