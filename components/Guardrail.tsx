'use client';

import { motion, useReducedMotion } from 'motion/react';
import { useState } from 'react';
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

  const run = (text: string) => {
    const t = text.trim();
    if (!t) return;
    setSubmitted(t);
    setResult(evaluate(t));
  };

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
          key={submitted}
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className={styles.echo}>“{submitted}”</p>

          <ol className={styles.trace}>
            <li className={styles.step}>
              <span className={styles.stepDot} data-on />
              <span className={styles.stepName}>Request received</span>
            </li>

            <li className={styles.step}>
              <span className={`${styles.stepDot} ${result.blocked ? styles.blockDot : styles.passDot}`} data-on />
              <span className={styles.stepName}>
                Guardrail{' '}
                {result.blocked ? (
                  <b className={styles.blocked}>refused — {result.category}</b>
                ) : (
                  <b className={styles.passed}>passed</b>
                )}
              </span>
            </li>

            {result.blocked ? (
              <li className={styles.step}>
                <span className={styles.stepDot} />
                <span className={styles.stepMuted}>
                  Blocked before any model call · logged as a {result.why} · nothing executed
                </span>
              </li>
            ) : (
              <>
                <li className={styles.step}>
                  <span className={`${styles.stepDot} ${styles.passDot}`} data-on />
                  <span className={styles.stepName}>
                    Classified → routed to <b className={styles.passed}>{result.domain}</b>
                  </span>
                </li>
                <li className={styles.step}>
                  <span className={styles.stepDot} />
                  <span className={styles.stepMuted}>Authority checked · tagged to memory · then it runs</span>
                </li>
              </>
            )}
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
