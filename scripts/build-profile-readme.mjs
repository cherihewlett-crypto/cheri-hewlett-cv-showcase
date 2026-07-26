#!/usr/bin/env node
/**
 * Generates the public GitHub profile README from the same positioning and
 * checked engineering snapshot used by cherihewlett.dev.
 *
 * Output: dist/profile-README.md, published to the account-named repo.
 * Usage: node scripts/build-profile-readme.mjs
 */

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..');

const proof = JSON.parse(readFileSync(join(ROOT, 'public', 'proof.json'), 'utf8'));
const totals = proof.totals;
const number = (value) => value.toLocaleString('en-US');

const SITE = 'https://cherihewlett.dev';
const LINKEDIN = 'https://linkedin.com/in/cheri-hewlett';
const RESUME = `${SITE}/resume`;
const SPEAKING = `${SITE}/#speaking`;
const ONE_SHEET = `${SITE}/speaker-one-sheet.pdf`;
const COLLECTOR =
  'https://github.com/cherihewlett-crypto/cheri-hewlett-cv-showcase/blob/main/scripts/collect-proof.mjs';
const CONTRIBUTIONS = 16_983;
const CAPABILITIES = 302;
const badge = (label, value, color = '17b3c7') =>
  `![${label}](https://img.shields.io/badge/${encodeURIComponent(label)}-${encodeURIComponent(value)}-${color}?style=flat-square)`;

const readme = `[![Cheri Hewlett operating model — from a meaningful problem to governed, verifiable impact](${SITE}/opengraph-image?visual=operating-model)](${SITE})

# Cheri Hewlett

### Technology & innovation executive · People builder · Operator · CPA · Veteran

${badge('Role', 'Technology & Innovation Exec')} ${badge('CPA', 'Certified', '0e6d7c')} ${badge('U.S. Air Force', 'Veteran', '45e0b8')} ${badge('Based', 'Los Angeles', '143a4b')}

> **Progress belongs to the people willing to challenge what no longer works.**

### [Full profile](${SITE}) · [Résumé](${RESUME}) · [Speaking](${SPEAKING}) · [LinkedIn](${LINKEDIN})

## About me

I built my career by questioning accepted answers, looking beyond the boundaries of my role, and
refusing to let hierarchy, politics, or bureaucracy stand between a meaningful problem and a better
solution.

Technology is moving faster than traditional organizations can respond. I help close that gap —
modernizing systems, aligning people, and creating the conditions for ideas to move, decisions to
be made, and impact to scale.

## How I work

- **People first.** I build people, create opportunity, and empower others to do more.
- **Challenge the status quo.** I question what no longer works and push past politics, process,
  and limits.
- **Diverse perspectives.** Different experiences lead to stronger decisions and better outcomes.
- **Human always.** Technology only matters when it expands human potential.

## Point of view

For thirty years the person who saw the problem and the person who could build the fix were two
different people, and everything got lost in translation. That gap is closing. The new innovator is
the domain expert who can build — and the constraint is no longer capability. It's judgment.

- **Innovation is choosing the right problem.** Most companies are solving the wrong problems
  faster. AI didn't fix that — it accelerated it.
- **ROI is the problem solved, not the time saved.** The question is the caliber of quality the team
  operates at afterward.
- **Trust is the real moat.** The better question is whether we can prove AI did the work right.
- **How you treat people is the strategy.** As AI absorbs execution, that becomes more of the job,
  not less.

## Experience

- **SVP & Global Managing Director, Platform & Product Strategy.** Enterprise platform and product
  strategy, AI governance, agentic-workforce integration, and board- and investor-level
  communication. Previously built a financial-analytics platform line from concept to global
  market with full P&L accountability.
- **Every seat in the lifecycle.** Customer success, solutions consulting, product and business
  transformation, and platform strategy — implementing, selling, supporting, and rebuilding
  enterprise software.
- **Air Force. Big Four. Founder. Operator.** U.S. Air Force veteran; PwC and Deloitte; founder of an
  independent CPA firm; and owner-operator of a rental portfolio for a decade.
- **Advisor and board member.** Strategic advisor to Crux on product-acquisition integration and
  board member of the G.R.O.W. Foundation.

## Selected builds

The production repositories remain private. The [public portfolio](${SITE}/#builds) recreates the
real product screens with illustrative data and client identifiers removed.

| Build | What it does |
|---|---|
| **Intelligent Product Enablement** | Turns shipped code into the documentation, release notes, training, and field briefing it needs behind a governed approval path |
| **Acquisition Integration Engine** | Compares acquired capabilities, identifies the surviving implementation on evidence, and sequences migration into one platform |
| **Autonomous Implementor** | Carries an implementation from the customer's problem through process analysis, generated configuration, and baseline verification |
| **Roadmap Prioritization Engine** | Scores investments on impact, fit, feasibility, and signal, weighted by confidence and re-ranked as evidence arrives |
| **Compliance Knowledge Base** | Stores atomic rules with citations so every answer can be traced to the governing standard and policy |
| **Multi-Dimensional Orchestrator** | Routes work through one governed path with fail-closed authority and evidence-based verification |

## Evidence

| Claim | What it represents | State |
|---:|---|:---:|
| **${number(CONTRIBUTIONS)}** | Contributions in the last year | Verified |
| **${number(totals.authoredCommits)}** | Authored commits, excluding bots and merge commits | Verified |
| **${number(totals.mergedPullRequests)}** | Pull requests written, reviewed, and merged | Verified |
| **${number(totals.edgeFunctions)}** | Live production services | Verified |
| **${number(CAPABILITIES)}** | Reusable capabilities catalogued and maintained | Verified |
| **3 years** | Consecutive triple-digit YoY growth on a platform line built from zero | Attested |
| **20 years** | Leading enterprise software, primarily in the Office of the CFO | Attested |

Verified figures come from a checked, versioned snapshot of the engineering record. Refreshes are
intentional and reviewed; the build rejects blank, zero, partial, inconsistent, or regressed data,
so a failed measurement leaves the last known-good numbers intact. Authored commits exclude
${number(totals.automatedCommits)} automated sync and merge commits. The
[collector that produces the snapshot](${COLLECTOR}) is public, while its private inputs are not.

## Speaking and writing

Innovation, trustworthy AI, people-first leadership, resilience, and the career chapters that
rarely make a résumé. Recent appearances include five consecutive years on the BeyondTheBlack main
stage, BlackLine Investor Day, SAP Sapphire Barcelona, LWT Summit, and the Product Advisory
Collective.

[Speaking profile](${SPEAKING}) · [Speaker one-sheet](${ONE_SHEET}) · [LinkedIn](${LINKEDIN})

---

<sub>Generated from the versioned engineering snapshot checked
${new Date(proof.generatedAt).toLocaleDateString('en-US', { dateStyle: 'long' })}.</sub>
`;

mkdirSync(join(ROOT, 'dist'), { recursive: true });
writeFileSync(join(ROOT, 'dist', 'profile-README.md'), readme);
console.log('Wrote dist/profile-README.md');
console.log(`  ${readme.split('\n').length} lines, ${readme.length} chars`);
