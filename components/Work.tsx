'use client';

import styles from './Work.module.css';

/**
 * Selected work — the functions, not the product.
 *
 * Charlie's framing: showcase the reusable functions, not one client-specific
 * product. Each tile below is a capability built once and reused across
 * domains — grounded in the real eval suite, with client identifiers removed.
 * They compose into the systems elsewhere on the page; shown here as the
 * agnostic building blocks they actually are.
 */

const FUNCTIONS = [
  {
    fn: 'Research orchestration',
    does: 'Fans one question across business, technical, and independent-review roles in parallel — each blind to the others, so nothing gets rubber-stamped. Surfaces the P0 gaps instead of burying them.',
    reuse: 'Any due-diligence or multi-perspective analysis',
  },
  {
    fn: 'Evidence-backed business case',
    does: 'Assembles a case from collected evidence and grades it — HIGH or LOW, investment-grade-ready or reject. A claim with no evidence behind it is blocked, not softened.',
    reuse: 'Any go / no-go or funding decision',
  },
  {
    fn: 'Compliance & regulatory intersection',
    does: 'Maps a proposal against the regulatory control pack and the doctrine it touches, so a recommendation arrives already checked against the rules it has to live under.',
    reuse: 'Any regulated domain',
  },
  {
    fn: 'Domain-doctrine routing',
    does: 'Routes a question to the exact rule or standard that governs it — citable and re-verifiable back to source by someone who does not trust the model.',
    reuse: 'Law, clinical, policy, accounting',
  },
  {
    fn: 'Safety red-team',
    does: 'A deterministic adversary attacks the recommendation — destructive paths, unsafe actions, over-claims — and measures over-refusal too. What survives is what ships.',
    reuse: 'Any AI output that has to be trusted',
  },
  {
    fn: 'Goal-completion audit',
    does: 'Recomputes whether the goal is actually met from live evidence rather than trusting a status field. Catches the gap between what was claimed and what the checks support.',
    reuse: 'Any autonomous workflow',
  },
  {
    fn: 'Cross-case pattern',
    does: 'Finds the pattern across many cases that no single case reveals — the signal that only shows up in aggregate.',
    reuse: 'Portfolio, market, and cohort analysis',
  },
  {
    fn: 'Autonomous operating loop',
    does: 'The scheduled, unattended machinery that runs the duties on a cadence, escalates on an SLA, and keeps working when nobody is watching.',
    reuse: 'Any standing operational capability',
  },
];

export default function Work() {
  return (
    <div>
      <p className={styles.disclaimer}>
        The functions, not the product. Each was built once and reused — grounded in real systems, client identifiers
        removed, rebuilt clean rather than reproduced from any client artifact. Together they compose into the systems
        shown elsewhere on this page.
      </p>

      <div className={styles.grid}>
        {FUNCTIONS.map((f, i) => (
          <article key={f.fn} className={styles.tile}>
            <span className={styles.tileNo} aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className={styles.tileFn}>{f.fn}</h3>
            <p className={styles.tileDoes}>{f.does}</p>
            <p className={styles.tileReuse}>
              <span aria-hidden="true">↻</span> {f.reuse}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
