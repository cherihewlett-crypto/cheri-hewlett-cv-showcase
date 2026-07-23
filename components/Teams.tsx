import Reveal from './Reveal';
import styles from './Teams.module.css';

/**
 * The standing functions.
 *
 * The point of this section is that the system is an organisation, not a
 * chatbot: named functions with duties, schedules, and escalation paths that
 * keep running when nobody is watching.
 */

const TEAMS = [
  {
    tag: 'Routing',
    name: 'Multi-dimensional orchestrator',
    lead: 'One door in. Eight domains out.',
    body: 'A single router classifies intent and domain, then composes the right specialist — audit, briefing, calendar, mail, relationships, tasks, brand, core. The routing table is sourced from live registry records, so adding an agent is a row rather than a deploy.',
    edge: 'Every surface enters through the same door — chat, scheduled run, webhook. Authority and memory rules cannot be sidestepped by arriving a different way.',
  },
  {
    tag: 'Operations',
    name: 'Autonomous triage team',
    lead: 'Signals become owned work, unattended.',
    body: 'Signals arrive from monitors and connectors, get classified and deduplicated against what is already open, and are routed to an owner with acceptance criteria attached. Ageing items escalate on a three, seven, and fourteen day ladder.',
    edge: 'Escalation is machinery, not a reminder. An item nobody picks up raises itself rather than going quiet.',
  },
  {
    tag: 'Stewardship',
    name: 'Systems team',
    lead: 'Health is recomputed, never remembered.',
    body: 'Standing checks recompute live state instead of reading a stored status — schema drift, write-path liveness, retrieval quality, token budgets, connector auth. Each runs on its own schedule against an enumerated inventory.',
    edge: 'When a check fails it opens its own work item. A notification nobody reads is treated as an outage that was missed, not an alert that fired.',
  },
  {
    tag: 'Reasoning',
    name: 'Verification layer',
    lead: 'The model plans. Deterministic code decides.',
    body: 'Plans are not accepted as written. A verifier recomputes each item from live evidence, detects pass-to-fail regressions, and flags the gap when a recorded claim outruns what the checks actually support.',
    edge: 'In the consolidation engine the model handles mapping and sequencing, but every figure is produced by deterministic code with a traceable path. That separation is what makes the output auditable.',
  },
];

export default function Teams() {
  return (
    <div className={styles.grid}>
      {TEAMS.map((team, i) => (
        <Reveal key={team.name} delay={(i % 2) * 0.07}>
          <article className={styles.card}>
            <p className={styles.tag}>{team.tag}</p>
            <h3 className={styles.name}>{team.name}</h3>
            <p className={styles.lead}>{team.lead}</p>
            <p className={styles.body}>{team.body}</p>
            <p className={styles.edge}>{team.edge}</p>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
