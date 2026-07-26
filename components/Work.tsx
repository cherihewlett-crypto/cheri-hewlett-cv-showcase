'use client';

import { motion, useReducedMotion } from 'motion/react';
import Clickthrough from './Clickthrough';
import { ACQUISITION_PLAY, BUSINESS_CASE_PLAY, ENABLEMENT_PLAY, HEYECHO_PLAY, type Play } from './work-plays';
import styles from './Work.module.css';

/**
 * Selected work — a curated mix of products and functions.
 *
 * Framing decided per item: show it as a PRODUCT when the whole thing is the
 * deliverable ("give it X, get Y"), and as a FUNCTION when the atomic
 * capability is independently reusable and recognizable on its own. Each card
 * is self-contained and lands in a glance; the kind tag makes the altitude
 * clear. Grounded in real systems, client identifiers removed, rebuilt clean.
 *
 * The three products each carry an animated play (an anonymized walkthrough of
 * how the system runs); those span the full row and stack first. The overlay
 * pattern and the two reusable functions follow as glanceable cards.
 */

type Kind = 'product' | 'function';

const WORK: {
  kind: Kind;
  context: string;
  industries: string[];
  title: string;
  body: string;
  value: string;
  play?: Play;
}[] = [
  {
    kind: 'product',
    context: 'For a global fund administrator',
    industries: ['Private Equity', 'Financial Services', 'Compliance', 'Due Diligence'],
    title: 'Autonomous business-case engine',
    body: 'Give it a business question; it returns an investment-grade case — researched across independent roles, cleared against compliance and regulation, survived a safety red-team, and audited for goal completion before it ships. A guard at every stage.',
    value: 'A defensible go / no-go, not a confident guess',
    play: BUSINESS_CASE_PLAY,
  },
  {
    kind: 'product',
    context: 'For a highly acquisitive software company',
    industries: ['Private Equity', 'M&A Integration', 'Enterprise SaaS'],
    title: 'Acquisition integration & portfolio unification',
    body: 'Absorb acquisitions fast and turn a fragmented product portfolio into one seamless customer experience — the integration playbook, the common data and identity layer, and the sequencing that makes a roll-up compound instead of fragment.',
    value: 'Acquisitions that add capacity without adding chaos',
    play: ACQUISITION_PLAY,
  },
  {
    kind: 'product',
    context: 'For an enterprise SaaS product organization',
    industries: ['Enterprise SaaS', 'Product Operations', 'Customer Enablement', 'Technical Documentation'],
    title: 'Autonomous product-enablement engine',
    body: 'Turns every product change into the documentation, release notes, and enablement content it needs — signals from support, sales, and the field normalized and scored, joined into living knowledge pods, then drafted into content proportional to impact behind a governed, human-approved publishing path.',
    value: 'Product knowledge that lands the moment it ships',
    play: ENABLEMENT_PLAY,
  },
  {
    kind: 'product',
    context: 'Independent platform',
    industries: ['AI Platform', 'Agentic Systems'],
    title: 'heyEcho — multi-agent operating system',
    body: 'Persistent cross-session memory, governed tool use, registry-driven routing, and a verification layer — the platform the rest of this site runs on. My own IP, front to back.',
    value: 'An operating system for a team of agents',
    play: HEYECHO_PLAY,
  },
  {
    kind: 'function',
    context: 'Enterprise architecture pattern',
    industries: ['Legacy Modernization', 'Enterprise Architecture', 'AI Governance'],
    title: 'Governed agentic overlay',
    body: 'Put governed, auditable AI assistance on top of software that already runs — request routing, fail-closed authority, and an audit trail layered over any existing system of record, without a rebuild. The pattern for adding agents to legacy enterprise systems.',
    value: 'AI leverage on the systems you already own',
  },
  {
    kind: 'function',
    context: 'Reusable capability',
    industries: ['Compliance', 'Audit', 'AI Governance'],
    title: 'Truthful verification',
    body: 'Recompute whether something is actually done from live evidence instead of trusting a status field — and flag the gap between what was claimed and what the checks support.',
    value: 'Any workflow where “done” has to be true',
  },
  {
    kind: 'function',
    context: 'Reusable capability',
    industries: ['Accounting', 'Regulatory', 'Compliance Checks'],
    title: 'Domain-doctrine routing',
    body: 'Route any question to the exact rule or standard that governs it — citable and re-verifiable back to source by someone who does not trust the model.',
    value: 'Law · clinical · policy · accounting',
  },
];

const KIND_LABEL: Record<Kind, string> = { product: 'Product', function: 'Function' };

export default function Work() {
  const reduce = useReducedMotion();
  return (
    <div>
      <p className={styles.disclaimer}>
        Each piece is a self-contained deliverable — shown as a product where the whole thing is the value, and as a
        reusable function where the capability stands on its own. Grounded in real systems, client identifiers removed,
        rebuilt clean rather than reproduced from any client artifact.
      </p>

      <div className={styles.grid}>
        {WORK.map((w, i) => (
          <motion.article
            key={w.title}
            className={`${styles.card} ${w.play ? styles.flagship : ''}`}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.head}>
              <span className={`${styles.kind} ${w.kind === 'function' ? styles.kindFn : styles.kindProd}`}>
                {KIND_LABEL[w.kind]}
              </span>
              <span className={styles.context}>{w.context}</span>
            </div>
            <h3 className={styles.title}>{w.title}</h3>
            <ul className={styles.industries} aria-label="Relevant industries">
              {w.industries.map((ind) => (
                <li className={styles.industry} key={ind}>
                  {ind}
                </li>
              ))}
            </ul>
            <p className={styles.body}>{w.body}</p>
            <p className={styles.value}>
              <span aria-hidden="true">→</span> {w.value}
            </p>
            {w.play ? <Clickthrough label={w.play.label} stages={w.play.stages} /> : null}
          </motion.article>
        ))}
      </div>
    </div>
  );
}
