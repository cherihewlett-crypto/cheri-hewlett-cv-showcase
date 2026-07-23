#!/usr/bin/env node
/**
 * Proof collector.
 *
 * Reads the private production repositories, computes defensible engineering
 * metrics, and writes a sanitized public artifact to public/proof.json.
 *
 * DESIGN RULE: nothing proprietary leaves the private repos. This script emits
 * counts and dates only — never file contents, paths, commit messages, branch
 * names, customer names, or schema details. Every field below is a number, a
 * date, or a hand-written label.
 *
 * Metric honesty rules, applied deliberately:
 *   - "authored" commits EXCLUDE automated sync/audit commits and merge commits.
 *     The raw commit count is roughly 2.3x higher; the inflated number is not
 *     used anywhere on the site.
 *   - Counts are recomputed on every run. Nothing is hand-maintained.
 *   - If a repo is unavailable, its entry is omitted rather than estimated.
 *
 * Usage:
 *   node scripts/collect-proof.mjs            # reads sibling checkouts
 *   REPO_ROOT=/path node scripts/collect-proof.mjs
 */

import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const SITE_ROOT = resolve(HERE, '..');
const REPO_ROOT = process.env.REPO_ROOT ?? resolve(SITE_ROOT, '..');

const OWNER = process.env.REPO_OWNER ?? 'cherihewlett-crypto';

/** Commit subjects matching these are machine-generated, not authored work. */
const BOT_SUBJECT = /^(auto-sync|sync|audit|chore\(deps\)|dependabot)\b/i;

/**
 * The systems to measure. `label` and `blurb` are public-safe descriptions
 * written by hand; everything else is computed.
 */
const SYSTEMS = [
  {
    id: 'team-echo',
    dir: 'team-echo',
    label: 'Team Echo',
    blurb: 'Multi-agent operating system with persistent memory, governed tool use, and self-verifying status.',
    counts: {
      'edge functions': 'supabase/functions',
      'migrations': 'supabase/migrations',
      'CI gates': '.github/workflows',
    },
  },
  {
    id: 'innovation-hub',
    dir: 'innovation-hub',
    label: 'Innovation Hub',
    blurb: 'Portfolio cockpit for prototype due diligence, roadmap prioritization, and team time allocation.',
  },
  {
    id: 'tiger-consolidate',
    dir: 'tiger-consolidate',
    label: 'Consolidation Platform',
    blurb: 'Financial consolidation and close engine built on the accounting doctrine corpus.',
  },
  {
    id: 'accounting-knowledge-base',
    dir: 'accounting-knowledge-base',
    label: 'Accounting Doctrine KB',
    blurb: 'Atomic US GAAP and IFRS rules with SOX-grade citability and auditor re-verifiability.',
  },
];

function git(cwd, args) {
  return execFileSync('git', args, { cwd, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
}

function countDir(root, rel) {
  const full = join(root, rel);
  if (!existsSync(full)) return 0;
  return readdirSync(full, { withFileTypes: true }).filter((e) => !e.name.startsWith('.')).length;
}

/** Recursively count files matching a predicate, skipping vendored trees. */
function countFiles(root, predicate) {
  const SKIP = new Set(['node_modules', '.git', 'dist', 'build', '.next', 'vendor', 'coverage']);
  let n = 0;
  const walk = (dir) => {
    let entries;
    try {
      entries = readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      if (entry.name.startsWith('.') && entry.name !== '.github') continue;
      if (SKIP.has(entry.name)) continue;
      const full = join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (predicate(entry.name)) n += 1;
    }
  };
  walk(root);
  return n;
}

/**
 * Merged pull requests, via the GitHub CLI. Fail-soft: a missing or
 * unauthenticated `gh` omits the metric rather than guessing at it.
 */
function mergedPullRequests(repo) {
  try {
    const out = execFileSync(
      'gh',
      ['pr', 'list', '--repo', `${OWNER}/${repo}`, '--state', 'merged', '--limit', '2000', '--json', 'number'],
      { encoding: 'utf8', maxBuffer: 16 * 1024 * 1024, stdio: ['ignore', 'pipe', 'ignore'] },
    );
    return JSON.parse(out).length;
  } catch {
    return null;
  }
}

function measure(system) {
  const root = join(REPO_ROOT, system.dir);
  if (!existsSync(join(root, '.git'))) {
    console.warn(`  skip ${system.id} — no checkout at ${root}`);
    return null;
  }

  const subjects = git(root, ['log', '--format=%s']).split('\n').filter(Boolean);
  const total = subjects.length;
  const bot = subjects.filter((s) => BOT_SUBJECT.test(s)).length;
  const merges = subjects.filter((s) => s.startsWith('Merge ')).length;
  const authored = total - bot - merges;

  const firstCommit = git(root, ['log', '--reverse', '--format=%ad', '--date=short'])
    .split('\n')[0]
    .trim();
  const lastCommit = git(root, ['log', '-1', '--format=%ad', '--date=short']).trim();

  const counts = {};
  for (const [label, rel] of Object.entries(system.counts ?? {})) {
    const n = countDir(root, rel);
    if (n > 0) counts[label] = n;
  }

  const tests = countFiles(root, (name) => /(\.|_|-)(test|spec)\.[jt]sx?$/.test(name) || /^test_.*\.py$/.test(name));
  if (tests > 0) counts.tests = tests;

  const prs = mergedPullRequests(system.dir);
  if (prs !== null) counts['merged PRs'] = prs;

  return {
    id: system.id,
    label: system.label,
    blurb: system.blurb,
    authoredCommits: authored,
    totalCommits: total,
    automatedCommits: bot,
    firstCommit,
    lastCommit,
    counts,
  };
}

console.log(`Collecting proof from ${REPO_ROOT}`);

const systems = SYSTEMS.map((s) => {
  console.log(`  reading ${s.id}`);
  return measure(s);
}).filter(Boolean);

if (systems.length === 0) {
  console.error('No repositories found. Set REPO_ROOT to the directory containing the checkouts.');
  process.exit(1);
}

const sum = (pick) => systems.reduce((acc, s) => acc + pick(s), 0);
const firstEver = systems.map((s) => s.firstCommit).sort()[0];

const proof = {
  generatedAt: new Date().toISOString(),
  method:
    'Recomputed from git history across private production repositories. Authored commits exclude automated sync and merge commits. No source, paths, or proprietary detail are published.',
  totals: {
    systems: systems.length,
    authoredCommits: sum((s) => s.authoredCommits),
    automatedCommits: sum((s) => s.automatedCommits),
    edgeFunctions: sum((s) => s.counts['edge functions'] ?? 0),
    migrations: sum((s) => s.counts.migrations ?? 0),
    tests: sum((s) => s.counts.tests ?? 0),
    ciGates: sum((s) => s.counts['CI gates'] ?? 0),
    mergedPullRequests: sum((s) => s.counts['merged PRs'] ?? 0),
    since: firstEver,
  },
  systems,
};

mkdirSync(join(SITE_ROOT, 'public'), { recursive: true });
writeFileSync(join(SITE_ROOT, 'public', 'proof.json'), `${JSON.stringify(proof, null, 2)}\n`);

console.log('\nWrote public/proof.json');
console.table(
  systems.map((s) => ({
    system: s.label,
    authored: s.authoredCommits,
    automated: s.automatedCommits,
    since: s.firstCommit,
  })),
);
console.log('Totals:', proof.totals);
