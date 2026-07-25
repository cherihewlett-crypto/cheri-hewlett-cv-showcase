'use client';

import { motion, useReducedMotion } from 'motion/react';
import { useCallback, useEffect, useState } from 'react';
import styles from './Clickthrough.module.css';

/**
 * The autonomous problem-to-delivery engine, as an animated play.
 *
 * Grounded in the real pipeline — research intake → orchestrated research →
 * evidence-backed business case → compliance gate → safety red-team →
 * goal-completion audit → delivery — each stage guarded by a high-confidence
 * check. Nothing here reproduces a client artifact; it's the logic, rebuilt clean.
 *
 * Standalone by design: this is the proof that the systems actually run, and it
 * was once silently dropped when the surrounding Selected Work section was
 * refactored into static cards. Keeping it in its own component means a future
 * edit to the card grid can't delete it again.
 *
 * It auto-advances (an animated play, not a slideshow the reader has to drive),
 * and any manual interaction — clicking a stage, Back/Next, pause — hands control
 * to the reader. Autoplay is off entirely under prefers-reduced-motion.
 */

const STAGES = [
  {
    key: 'Intake',
    title: 'Research intake',
    body: 'A problem arrives — “is this worth solving, and is it the one to solve first?” The engine frames the question and scopes the research before any answer is drafted.',
    guard: 'scope locked',
  },
  {
    key: 'Orchestrate',
    title: 'Orchestrated research',
    body: 'Work fans out across business, technical, and independent-review roles in parallel — each blind to the others so nothing is rubber-stamped. P0 gaps are surfaced, not buried.',
    guard: 'roles reconciled',
  },
  {
    key: 'Build',
    title: 'Evidence-backed business case',
    body: 'The case is assembled from collected evidence and graded — HIGH or LOW, investment-grade-ready or not. A claim with no evidence behind it is blocked, not softened.',
    guard: 'investment-grade or reject',
  },
  {
    key: 'Comply',
    title: 'Compliance & regulatory gate',
    body: 'The proposal is intersected against the regulatory control pack and the accounting doctrine it touches — because in this domain a confident guess is a reportable event.',
    guard: 'control pack cleared',
  },
  {
    key: 'Attack',
    title: 'Safety red-team',
    body: 'A deterministic adversary tries to break the recommendation — destructive paths, unsafe actions, over-claims. What survives is what ships.',
    guard: 'adversary survived',
  },
  {
    key: 'Deliver',
    title: 'Goal-completion audit → delivery',
    body: 'Before anything is called done, a verifier recomputes goal completion from the evidence. Only then does the finished business case and delivery plan leave the engine.',
    guard: 'recomputed, not asserted',
  },
];

const DWELL_MS = 2600;

export default function Clickthrough() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  // Autoplay drives the animation on load; the first manual action stops it.
  const [playing, setPlaying] = useState(!reduce);
  const atEnd = step === STAGES.length - 1;

  // Manual control always wins over the autoplay loop.
  const take = useCallback((next: number | ((s: number) => number)) => {
    setPlaying(false);
    setStep(next);
  }, []);

  useEffect(() => {
    if (!playing || reduce) return;
    const id = setTimeout(() => setStep((s) => (s + 1) % STAGES.length), DWELL_MS);
    return () => clearTimeout(id);
  }, [playing, reduce, step]);

  return (
    <div className={styles.through}>
      <div className={styles.railHead}>
        <span className={styles.railLabel}>Autonomous engine — the pipeline, running</span>
        {!reduce && (
          <button
            type="button"
            className={styles.toggle}
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? 'Pause the walkthrough' : 'Play the walkthrough'}
          >
            {playing ? '❙❙ Pause' : '▶ Play'}
          </button>
        )}
      </div>

      <div className={styles.rail}>
        {STAGES.map((s, i) => (
          <button
            key={s.key}
            type="button"
            className={`${styles.node} ${i === step ? styles.nodeOn : ''} ${i < step ? styles.nodeDone : ''}`}
            onClick={() => take(i)}
            aria-current={i === step ? 'step' : undefined}
          >
            <span className={styles.nodeDot} aria-hidden="true" />
            <span className={styles.nodeKey}>{s.key}</span>
            {/* The fill under the active node ticks down the dwell time, so you
                can see the play advancing rather than guessing when it will. */}
            {i === step && playing && !reduce && (
              <motion.span
                className={styles.nodeProgress}
                aria-hidden="true"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: DWELL_MS / 1000, ease: 'linear' }}
                key={`p-${step}`}
              />
            )}
          </button>
        ))}
      </div>

      <motion.div
        key={step}
        className={styles.stage}
        initial={reduce ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className={styles.stageStep}>
          Stage {step + 1} of {STAGES.length}
        </p>
        <h4 className={styles.stageTitle}>{STAGES[step].title}</h4>
        <p className={styles.stageBody}>{STAGES[step].body}</p>
        <p className={styles.stageGuard}>
          <span aria-hidden="true">✓</span> guard: {STAGES[step].guard}
        </p>
      </motion.div>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.ctrl}
          onClick={() => take((s) => Math.max(0, s - 1))}
          disabled={step === 0}
        >
          Back
        </button>
        <button
          type="button"
          className={`${styles.ctrl} ${styles.ctrlPrimary}`}
          onClick={() => take((s) => (atEnd ? 0 : s + 1))}
        >
          {atEnd ? 'Restart' : 'Next stage →'}
        </button>
      </div>
    </div>
  );
}
