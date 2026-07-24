'use client';

import { motion, useInView, useReducedMotion } from 'motion/react';
import { useRef } from 'react';
import styles from './Operating.module.css';

/**
 * The operating layer.
 *
 * The distinction this section has to land: this is an organisation with
 * tiers, duties, and escalation paths — not a pile of scripts on timers. The
 * escalation chain is drawn because a reader who sees L1 → L2 → specialist →
 * CTO understands immediately that the routing is real.
 *
 * Every figure comes from the live registry and scheduler, not from a doc.
 */

const STATS = [
  { n: '35', l: 'agents registered' },
  { n: '16', l: 'teams' },
  { n: '46', l: 'scheduled jobs' },
  { n: '21', l: 'active in production' },
];

/** The support escalation path — the clearest evidence that routing is real. */
const CHAIN = [
  { step: 'Signal', note: 'webhook · heartbeat · mailbox · self-test' },
  { step: 'Router', note: 'classify, dedupe, assign' },
  { step: 'Triage L1', note: 'resolve or escalate' },
  { step: 'Analyst L2', note: 'diagnose, scope, own' },
  { step: 'Systems', note: 'SRE · integrations · governance' },
  { step: 'CTO', note: 'build, review, merge' },
];

const TEAMS = [
  { name: 'Orchestrator', note: 'One router in front of thirteen specialists' },
  { name: 'Systems', note: 'Reliability, integrations, and platform governance' },
  { name: 'Helpdesk', note: 'Tiered triage with SLA escalation at 3, 7, and 14 days' },
  { name: 'Core Operations', note: 'Briefing, email, execution, relationships, analysis' },
  { name: 'Memory & Learning', note: 'Write pipeline, recall scoring, weekly consolidation' },
  { name: 'Branding & Presence', note: 'Publication pipeline and opportunity synthesis' },
  { name: 'Career & Employment', note: 'Role pipeline and professional network' },
  { name: 'Infrastructure', note: 'Universal contract, memory writer, workspace integrity' },
];

/** Recurring duties that run whether or not anyone is watching. */
const LOOPS = [
  { cadence: 'every 15 min', what: 'System health, credential probes, SLA escalation' },
  { cadence: 'every 30 min', what: 'Operations grooming and run-failure scanning' },
  { cadence: 'hourly', what: 'Brand pipeline sweep, systems-team runtimes, approval dispatch' },
  { cadence: 'daily', what: 'Briefing, signal sync, issue routing, triage sweep, plan verification, session distillation' },
  { cadence: 'weekly', what: 'Governance deep scan, memory evaluation, growth and performance rollups, reflection, domain deepening' },
];

export default function Operating() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-12% 0px' });
  const reduce = useReducedMotion();

  return (
    <div ref={ref}>
      <ul className={styles.stats}>
        {STATS.map((s, i) => (
          <motion.li
            key={s.l}
            className={styles.stat}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className={styles.statNum}>{s.n}</span>
            <span className={styles.statLabel}>{s.l}</span>
          </motion.li>
        ))}
      </ul>

      <h3 className={styles.subhead}>How work escalates</h3>
      <ol className={styles.chain}>
        {CHAIN.map((c, i) => (
          <motion.li
            key={c.step}
            className={styles.link}
            initial={reduce ? false : { opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.25 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className={styles.linkStep}>{c.step}</span>
            <span className={styles.linkNote}>{c.note}</span>
          </motion.li>
        ))}
      </ol>
      <p className={styles.chainNote}>
        Nothing in that path waits on someone noticing. An item that ages past its threshold raises its own severity and
        escalates itself.
      </p>

      <div className={styles.split}>
        <div>
          <h3 className={styles.subhead}>The teams</h3>
          <dl className={styles.teams}>
            {TEAMS.map((t) => (
              <div className={styles.team} key={t.name}>
                <dt className={styles.teamName}>{t.name}</dt>
                <dd className={styles.teamNote}>{t.note}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <h3 className={styles.subhead}>What runs unattended</h3>
          <dl className={styles.teams}>
            {LOOPS.map((l) => (
              <div className={styles.team} key={l.cadence}>
                <dt className={styles.cadence}>{l.cadence}</dt>
                <dd className={styles.teamNote}>{l.what}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
