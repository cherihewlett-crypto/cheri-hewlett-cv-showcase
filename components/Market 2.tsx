import Reveal from './Reveal';
import styles from './Market.module.css';

/**
 * The translation layer.
 *
 * Senior AI roles are scoped in a fairly consistent vocabulary. This maps that
 * vocabulary onto work that already exists, so a reader does not have to infer
 * the match from a list of technologies. Left column is how the requirement is
 * usually written; right column is the thing that answers it.
 */

const MAP = [
  {
    ask: 'Multi-agent orchestration',
    detail: 'Route work across specialised agents without a brittle hand-maintained map.',
    answer:
      'A registry-driven router composing eight domains behind one entry point, with agents added as records rather than deploys.',
  },
  {
    ask: 'AI governance and safety',
    detail: 'Prove the system refuses what it should, and can show its working afterwards.',
    answer:
      'Guardrails ahead of classification, fail-closed tool authority, and adversarial suites that measure over-refusal as well as under-refusal.',
  },
  {
    ask: 'Memory and retrieval architecture',
    detail: 'Context that compounds across sessions instead of resetting every time.',
    answer:
      'A tagged two-store memory with a controlled write vocabulary, enforced at write time, plus retrieval logging and a scored evaluation harness.',
  },
  {
    ask: 'Evaluation and truthfulness',
    detail: 'Know whether the system is actually working, not whether it says it is.',
    answer:
      'A verifier that recomputes completion from live checks, catches pass-to-fail regressions, and raises claim-versus-check drift as a defect.',
  },
  {
    ask: 'Autonomous operations',
    detail: 'Detection, triage and escalation that survive nobody watching for a fortnight.',
    answer:
      'Scheduled operators for every recurring duty, coverage stated against an enumerated inventory, and SLA escalation implemented as jobs rather than prose.',
  },
  {
    ask: 'Vertical AI in a regulated domain',
    detail: 'Apply models where a wrong number is a reportable event, not a bad suggestion.',
    answer:
      'An atomic GAAP and IFRS corpus with citable, auditor-re-verifiable rules, driving a consolidation engine where the model plans and deterministic code computes.',
  },
  {
    ask: 'Cost and model discipline',
    detail: 'Match spend to the value of the decision instead of defaulting everything upward.',
    answer:
      'Model and effort tiering per task class, pinned per agent, with recurring cost stated alongside benefit before a capability is approved.',
  },
  {
    ask: 'Hands-on credibility with engineers',
    detail: 'Lead the work without being one abstraction removed from how it is actually built.',
    answer:
      'The systems on this page were designed and written personally — schema, routing, guardrails, evaluation and deploy pipeline — not commissioned and summarised.',
  },
];

export default function Market() {
  return (
    <div className={styles.wrap}>
      <div className={styles.head}>
        <span>What the role asks for</span>
        <span>What already exists</span>
      </div>
      {MAP.map((row, i) => (
        <Reveal key={row.ask} delay={Math.min(i, 4) * 0.04}>
          <div className={styles.row}>
            <div className={styles.ask}>
              <h3 className={styles.askTitle}>{row.ask}</h3>
              <p className={styles.askDetail}>{row.detail}</p>
            </div>
            <p className={styles.answer}>{row.answer}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
