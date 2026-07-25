'use client';

import { motion, useReducedMotion } from 'motion/react';
import { type ReactNode, useState } from 'react';
import styles from './Guardrail.module.css';

/**
 * The one proof a description can't give: a live artifact.
 *
 * This runs the same shape of logic the real system uses — a guardrail that
 * sits AHEAD of classification and fails closed. It is deterministic and
 * client-side: no backend, no model call, nothing stored, nothing executed.
 * A visitor types a request (or picks one) and watches it either get refused
 * with a logged reason, or pass the guardrail and route to a domain. The
 * point is to see the architecture behave, not to run anything real.
 */

type Rule = { test: RegExp; category: string; why: string };

// Guardrail rules — destructive / financial / credential / impersonation /
// exfiltration. Ordering mirrors the real design: refuse first, classify after.
const BLOCK_RULES: Rule[] = [
  { test: /\b(delete|drop|wipe|erase|destroy|purge|rm\s+-rf)\b/i, category: 'destructive action', why: 'irreversible data loss' },
  { test: /\b(wire|transfer|send|pay|withdraw|buy|sell)\b.*(\$|\bmoney\b|\bfunds?\b|stock|crypto|account)/i, category: 'financial action', why: 'moves money' },
  { test: /\b(password|api[\s-]?key|secret|token|credential|ssn|social security|routing number)\b/i, category: 'credential request', why: 'exposes a secret' },
  { test: /\b(pretend to be|impersonate|act as (?!an? (assistant|agent))|pose as)\b/i, category: 'impersonation', why: 'assumes another identity' },
  { test: /\b(exfiltrate|leak|scrape all|export all|dump the|email everyone)\b/i, category: 'data exfiltration', why: 'bulk data egress' },
];

// If it passes the guardrail, a lightweight classifier picks a domain.
const DOMAINS: { test: RegExp; domain: string }[] = [
  { test: /\b(close|consolidat|reconcil|journal|ledger|gaap|ifrs|audit|variance)\b/i, domain: 'finance' },
  { test: /\b(meeting|calendar|schedule|invite|availability)\b/i, domain: 'calendar' },
  { test: /\b(email|inbox|reply|draft|follow.?up)\b/i, domain: 'email' },
  { test: /\b(sleep|hrv|readiness|workout|health|oura)\b/i, domain: 'health' },
];

type Result = { blocked: boolean; category: string; why: string; domain?: string };

function evaluate(input: string): Result {
  for (const rule of BLOCK_RULES) {
    if (rule.test.test(input)) return { blocked: true, category: rule.category, why: rule.why };
  }
  const hit = DOMAINS.find((d) => d.test.test(input));
  return { blocked: false, category: 'allowed', why: '', domain: hit?.domain ?? 'general' };
}

const PRESETS = [
  'Delete all production records',
  'Wire $50,000 to this account',
  'Summarize the Q3 close variance',
  'What’s my readiness trend this week?',
];

export default function Guardrail() {
  const reduce = useReducedMotion();
  const [value, setValue] = useState('');
  const [result, setResult] = useState<Result | null>(null);
  const [submitted, setSubmitted] = useState('');
  // Bumped on every run so the cascade replays even for the same input.
  const [runId, setRunId] = useState(0);

  const run = (text: string) => {
    const t = text.trim();
    if (!t) return;
    setSubmitted(t);
    setResult(evaluate(t));
    setRunId((r) => r + 1);
  };

  // The trace, as a list so each step can animate in sequence.
  const steps: { body: ReactNode; dot?: 'blockDot' | 'passDot'; on?: boolean; muted?: boolean }[] = result
    ? result.blocked
      ? [
          { body: 'Request received', on: true },
          {
            body: (
              <>
                Guardrail <b className={styles.blocked}>refused — {result.category}</b>
              </>
            ),
            dot: 'blockDot',
            on: true,
          },
          {
            body: `Blocked before any model call · logged as a ${result.why} · nothing executed`,
            muted: true,
          },
        ]
      : [
          { body: 'Request received', on: true },
          {
            body: (
              <>
                Guardrail <b className={styles.passed}>passed</b>
              </>
            ),
            dot: 'passDot',
            on: true,
          },
          {
            body: (
              <>
                Classified → routed to <b className={styles.passed}>{result.domain}</b>
              </>
            ),
            dot: 'passDot',
            on: true,
          },
          { body: 'Authority checked · tagged to memory · then it runs', muted: true },
        ]
    : [];

  return (
    <div className={styles.wrap}>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          run(value);
        }}
      >
        <label className={styles.label} htmlFor="guardrail-input">
          Ask the system to do something
        </label>
        <div className={styles.row}>
          <input
            id="guardrail-input"
            className={styles.input}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="e.g. delete all production records"
            autoComplete="off"
          />
          <button className={styles.run} type="submit">
            Run
          </button>
        </div>
      </form>

      <div className={styles.presets}>
        {PRESETS.map((p) => (
          <button
            key={p}
            type="button"
            className={styles.chip}
            onClick={() => {
              setValue(p);
              run(p);
            }}
          >
            {p}
          </button>
        ))}
      </div>

      {result && (
        <motion.div
          className={styles.result}
          key={runId}
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className={styles.echo}>“{submitted}”</p>

          {/* The steps arrive one at a time, so clicking Run visibly walks the
              request through the guardrail rather than snapping to an answer. */}
          <ol className={styles.trace}>
            {steps.map((step, i) => (
              <motion.li
                key={i}
                className={styles.step}
                initial={reduce ? false : { opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: reduce ? 0 : 0.25 + i * 0.55, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className={`${styles.stepDot} ${step.dot ? styles[step.dot] : ''}`} data-on={step.on || undefined} />
                <span className={step.muted ? styles.stepMuted : styles.stepName}>{step.body}</span>
              </motion.li>
            ))}
          </ol>
        </motion.div>
      )}

      <p className={styles.note}>
        Runs entirely in your browser — deterministic, no model call, nothing stored or executed. The same shape as the
        real guardrail: it refuses first, and classifies second.
      </p>
    </div>
  );
}
