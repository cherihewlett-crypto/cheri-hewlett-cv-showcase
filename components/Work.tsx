'use client';

import { motion, useReducedMotion } from 'motion/react';
import { useState } from 'react';
import styles from './Work.module.css';

/**
 * Selected work — anonymized.
 *
 * Real systems, client identifiers removed. The flagship is an interactive
 * clickthrough of the autonomous problem-to-delivery engine, grounded in the
 * actual pipeline (research intake → orchestrated research → evidence-backed
 * business case → compliance, regulatory, and safety gates → goal audit →
 * delivery), each stage guarded by a high-confidence check. Nothing here
 * reproduces a client artifact; it is rebuilt clean from the underlying logic.
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

const PROJECTS = [
  {
    tag: 'For a global fund administrator',
    title: 'Autonomous problem-to-delivery engine',
    body: 'The system above — an agentic pipeline that takes a business question, runs the research, builds the investment-grade case, clears compliance and safety, and delivers, with a guard at every stage. Built as an independent prototype.',
    flagship: true,
  },
  {
    tag: 'For a highly acquisitive software company',
    title: 'Acquisition integration & portfolio unification',
    body: 'A design for absorbing acquisitions fast and turning a fragmented product portfolio into one seamless customer experience — the integration playbook, the common data and identity layer, and the sequencing that decides whether a roll-up compounds or fragments.',
  },
  {
    tag: 'For an enterprise finance platform',
    title: 'AI overlay across the close',
    body: 'An overlay architecture that adds governed, agentic assistance across an existing enterprise finance workflow without rebuilding it — routing, authority boundaries, and audit trail layered over the system of record.',
  },
  {
    tag: 'Independent platform',
    title: 'heyEcho — multi-agent operating system',
    body: 'Persistent cross-session memory, governed tool use, registry-driven routing, and a verification layer — the platform the rest of this site runs on. My own IP, front to back.',
  },
];

function Clickthrough() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const atEnd = step === STAGES.length - 1;

  return (
    <div className={styles.through}>
      <div className={styles.rail}>
        {STAGES.map((s, i) => (
          <button
            key={s.key}
            type="button"
            className={`${styles.node} ${i === step ? styles.nodeOn : ''} ${i < step ? styles.nodeDone : ''}`}
            onClick={() => setStep(i)}
            aria-current={i === step ? 'step' : undefined}
          >
            <span className={styles.nodeDot} aria-hidden="true" />
            <span className={styles.nodeKey}>{s.key}</span>
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
          className={styles.step}
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
        >
          Back
        </button>
        <button
          type="button"
          className={`${styles.step} ${styles.stepPrimary}`}
          onClick={() => setStep((s) => (atEnd ? 0 : s + 1))}
        >
          {atEnd ? 'Restart' : 'Next stage →'}
        </button>
      </div>
    </div>
  );
}

export default function Work() {
  return (
    <div>
      <p className={styles.disclaimer}>
        Anonymized — real systems, client identifiers removed. Rebuilt clean from the underlying logic, never
        reproduced from a client artifact.
      </p>

      <div className={styles.grid}>
        {PROJECTS.map((p) => (
          <article key={p.title} className={`${styles.card} ${p.flagship ? styles.flagship : ''}`}>
            <p className={styles.cardTag}>{p.tag}</p>
            <h3 className={styles.cardTitle}>{p.title}</h3>
            <p className={styles.cardBody}>{p.body}</p>
            {p.flagship ? <Clickthrough /> : null}
          </article>
        ))}
      </div>
    </div>
  );
}
