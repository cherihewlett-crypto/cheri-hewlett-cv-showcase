import type { SystemProof } from '@/lib/proof';
import Reveal from './Reveal';
import styles from './Systems.module.css';

/** Metrics worth surfacing on a card, in the order they tell the best story. */
const CHIP_ORDER = ['edge functions', 'migrations', 'merged PRs', 'tests', 'CI gates'];

/** Plain-English chip labels — this section sits in the executive read. */
const CHIP_LABEL: Record<string, string> = {
  'edge functions': 'live services',
  migrations: 'database changes',
  'merged PRs': 'shipped changes',
  tests: 'automated tests',
  'CI gates': 'safety checks',
};

function span(from: string, to: string) {
  const fmt = (d: string) =>
    new Date(`${d}T00:00:00Z`).toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });
  return `${fmt(from)} — ${fmt(to)}`;
}

export default function Systems({ systems }: { systems: SystemProof[] }) {
  return (
    <div className={styles.grid}>
      {systems.map((system, i) => (
        <Reveal key={system.id} delay={i * 0.08} className={styles.card}>
          <h3 className={styles.name}>{system.label}</h3>
          <p className={styles.blurb}>{system.blurb}</p>

          <div className={styles.meta}>
            <span className={styles.chip}>
              <b>{system.authoredCommits.toLocaleString('en-US')}</b> changes
            </span>
            {CHIP_ORDER.filter((k) => system.counts[k]).map((k) => (
              <span key={k} className={styles.chip}>
                <b>{system.counts[k].toLocaleString('en-US')}</b> {CHIP_LABEL[k] ?? k}
              </span>
            ))}
          </div>
          <span className={styles.span}>{span(system.firstCommit, system.lastCommit)}</span>
        </Reveal>
      ))}
    </div>
  );
}
