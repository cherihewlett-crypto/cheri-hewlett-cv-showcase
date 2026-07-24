import Reveal from './Reveal';
import styles from './Enablement.module.css';

/**
 * Autonomous enablement, broken into its stages.
 *
 * This section is a genuine sequence — each stage consumes the previous one —
 * so the numbering carries information rather than decorating the layout.
 *
 * HONESTY RULE: `status` separates what is running today from where the same
 * machinery extends. Blurring those two would make the strongest section on
 * the page the least trustworthy one.
 */

const STAGES = [
  {
    status: 'running' as const,
    name: 'Source the signals',
    body: 'One intake for everything the business emits — vendor webhooks, heartbeats, self-tests, mailbox alerts, quality gates, user reports. Signals normalise into a single shape and deduplicate against what is already open, so a repeating fault increments a count instead of spawning forty tickets.',
    proof: 'Eight source classes, five signal types, one open signal per source-system-type.',
  },
  {
    status: 'running' as const,
    name: 'Let severity find itself',
    body: 'A signal that keeps recurring, or stays open across a long first-to-last span, re-triages itself one severity level up without anyone re-reading it. Ageing work escalates on a fixed ladder rather than waiting to be noticed.',
    proof: 'Auto re-escalation at five repeats or a twenty-four hour span; three, seven and fourteen day SLA ladder.',
  },
  {
    status: 'extends' as const,
    name: 'Anticipate the gap',
    body: 'The same intake reads leading indicators rather than faults: usage decay against an account baseline, milestone slippage against a plan, engagement thinning ahead of renewal, attainment drifting from target. The judgement is deterministic rules and domain logic first, with the model reserved for the ambiguous middle.',
    proof: 'The pattern the intake and severity machinery already implement, pointed at commercial and delivery signals.',
  },
  {
    status: 'running' as const,
    name: 'Turn it into owned work',
    body: 'Detection that ends in a dashboard is detection that gets ignored. Every raised signal becomes a routed item with an owner and acceptance criteria attached, and completion is gated on authenticated proof from outside the agent rather than the agent reporting itself done.',
    proof: 'HMAC-verified webhook completion with acceptance-proof detection before anything is marked closed.',
  },
  {
    status: 'extends' as const,
    name: 'Implement, system-agnostic',
    body: 'Enterprise implementation is mostly deterministic work wearing a bespoke costume: recognise the source data, map it to a target model, apply the domain rules, validate, activate access. Built once for financial consolidation, the stack is not specific to it — the model proposes mappings and sequencing, deterministic rules decide, and domain knowledge supplies the constraints.',
    proof: 'Import recognition, AI mapping and matching, connector layer, and SSO activation, already running against a live target system.',
  },
];

const STATUS_LABEL = {
  running: 'running today',
  extends: 'where it extends',
};

export default function Enablement() {
  return (
    <ol className={styles.list}>
      {STAGES.map((stage, i) => (
        <Reveal key={stage.name} delay={Math.min(i, 4) * 0.05} as="li" className={styles.item}>
          <>
            <span className={styles.index} aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className={styles.content}>
              <div className={styles.heading}>
                <h3 className={styles.name}>{stage.name}</h3>
                <span className={`${styles.status} ${styles[stage.status]}`}>{STATUS_LABEL[stage.status]}</span>
              </div>
              <p className={styles.body}>{stage.body}</p>
              <p className={styles.proof}>{stage.proof}</p>
            </div>
          </>
        </Reveal>
      ))}
    </ol>
  );
}
