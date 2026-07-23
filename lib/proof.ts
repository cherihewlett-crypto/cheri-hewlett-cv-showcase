import raw from '../public/proof.json';

export type SystemProof = {
  id: string;
  label: string;
  blurb: string;
  authoredCommits: number;
  totalCommits: number;
  automatedCommits: number;
  firstCommit: string;
  lastCommit: string;
  counts: Record<string, number>;
};

export type Proof = {
  generatedAt: string;
  method: string;
  totals: {
    systems: number;
    authoredCommits: number;
    automatedCommits: number;
    edgeFunctions: number;
    migrations: number;
    tests: number;
    ciGates: number;
    mergedPullRequests: number;
    since: string;
  };
  systems: SystemProof[];
};

export const proof = raw as Proof;

/**
 * Two kinds of claim appear on this page, and the difference is the point.
 *
 * `verified` claims are recomputed from the engineering record every time the
 * site builds — if the number changes, the page changes. `attested` claims are
 * career facts that no script can check; they are labelled as such rather than
 * dressed up to look measured.
 */
export type ClaimState = 'verified' | 'attested';

export type Claim = {
  value: string;
  statement: string;
  source: string;
  state: ClaimState;
};

const n = (v: number) => v.toLocaleString('en-US');

export const claims: Claim[] = [
  {
    value: '~220',
    statement: 'person platform line, built from zero',
    source: 'BlackLine · P&L ownership',
    state: 'attested',
  },
  {
    value: '100%+',
    statement: 'YoY organic growth, three consecutive years',
    source: 'BlackLine · reported',
    state: 'attested',
  },
  {
    value: n(proof.totals.authoredCommits),
    statement: 'authored commits across four production systems',
    source: 'git · excludes bot and merge commits',
    state: 'verified',
  },
  {
    value: n(proof.totals.mergedPullRequests),
    statement: 'pull requests written, reviewed and merged',
    source: 'GitHub API',
    state: 'verified',
  },
  {
    value: n(proof.totals.edgeFunctions),
    statement: 'edge functions running in production',
    source: 'git · supabase/functions',
    state: 'verified',
  },
  {
    value: n(proof.totals.migrations),
    statement: 'database migrations under governance',
    source: 'git · supabase/migrations',
    state: 'verified',
  },
];

export function relativeAge(iso: string): string {
  const then = new Date(iso).getTime();
  const mins = Math.max(1, Math.round((Date.now() - then) / 60000));
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.round(hours / 24)}d ago`;
}
