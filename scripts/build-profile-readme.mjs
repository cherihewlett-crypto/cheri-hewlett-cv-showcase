#!/usr/bin/env node
/**
 * Generates the GitHub profile README from the same engineering record the
 * showcase site renders from.
 *
 * Standard profile-README advice assumes a portfolio of public tutorial
 * projects, and leans on third-party badge services for stats. Neither fits
 * here: the work is private because it is real, and the numbers below come
 * from this repository's own collector rather than a service that counts
 * public commits it can see.
 *
 * Output goes to dist/profile-README.md, to be published to the special
 * repository named after the GitHub account.
 *
 * Usage: node scripts/build-profile-readme.mjs
 */

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..');

const proof = JSON.parse(readFileSync(join(ROOT, 'public', 'proof.json'), 'utf8'));
const t = proof.totals;
const n = (v) => v.toLocaleString('en-US');

const SITE = 'https://cheri-hewlett-showcase-cherihewlett-cryptos-projects.vercel.app';
const LINKEDIN = 'https://linkedin.com/in/cheri-hewlett';

const since = new Date(`${t.since}T00:00:00Z`).toLocaleDateString('en-US', {
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

const readme = `# Cheri Hewlett, CPA

**Technology executive · Builder · Veteran · People first, always**

> As AI takes on more of the *what* and the *how*, leadership becomes even more
> about the *why* and the *who*. The leaders who thrive in this next decade won't
> simply be fluent in technology. They'll be deeply human.

The organizations that win won't be the ones that adopted AI fastest. They'll be the
ones that **chose the right problems**, built systems their people could trust, and had
leaders resilient enough to stay the course when it got hard.

### → **[See the work, with the receipts](${SITE})**

---

## The engineering record

Most of what I build is private, because it runs against real financial data. So
instead of publishing the code, I publish the count — recomputed from the repositories
themselves every time this file is generated.

| | Since ${since} |
|---|---|
| Authored commits | **${n(t.authoredCommits)}** |
| Pull requests merged | **${n(t.mergedPullRequests)}** |
| Edge functions in production | **${n(t.edgeFunctions)}** |
| Database migrations under governance | **${n(t.migrations)}** |
| CI gates | **${n(t.ciGates)}** |
| Production systems | **${n(t.systems)}** |

Authored commits exclude automated sync and merge commits — there are ${n(t.automatedCommits)}
of those, and counting them would inflate the figure by roughly 2.3×. The
[collector that produces these numbers](https://github.com/cherihewlett-crypto/cheri-hewlett-cv-showcase/blob/main/scripts/collect-proof.mjs)
is public even though its inputs are not.

## What I'm building

**Team Echo** — a multi-agent operating system. Registry-driven routing across eight
domains, persistent tagged memory, fail-closed tool authority, guardrails ahead of
classification, and a verifier that recomputes completion state from live evidence
rather than trusting what was recorded.

**Innovation Hub** — a portfolio cockpit for prototype due diligence, roadmap
prioritization, and team time allocation. Evidence-based go/kill decisions instead of
whoever is loudest in the room.

**Consolidation Platform** — a financial consolidation and close engine. The model
handles mapping and sequencing; the arithmetic is deterministic code with a traceable
path, because in this domain a confident guess is a reportable event.

**Accounting Doctrine KB** — atomic US GAAP and IFRS rules with SOX-grade citability,
re-verifiable by an auditor who does not trust the model.

## Point of view

**Innovation is choosing the right problem.** Most companies are solving the wrong
problems faster. AI didn't fix that — it accelerated it.

**ROI is the problem solved, not the time saved.** Time doesn't disappear; it gets
reallocated. The real question is what caliber of quality the team operates at
afterwards.

**Trust is the real moat.** Everyone is asking "can AI do this?" The better question is
"can we prove it did it right?"

**How you treat people is the strategy.** Organizations don't outperform because they
obsess over customers. They outperform because they invest in the people serving them.

## Background

U.S. Air Force — mission first, people always. PwC and Deloitte. Founded my own CPA
firm from scratch. Built a real estate portfolio over a decade of buying, renovating,
and managing. Rose from customer success manager to senior executive leadership at a
publicly traded fintech transforming the office of the CFO.

I've seen the product lifecycle from every seat — customer success, solutions
consulting, product and business transformation, platform strategy. I don't just
understand the product. I understand what it feels like to implement it, sell it,
support it, and bet a company's transformation on it.

CPA · MS Accounting, Liberty University · BS Accounting & Computer Science, University
of Maryland · U.S. Air Force Veteran · Board Member, G.R.O.W. Foundation

## Speaking and writing

BlackLine Investor Day · SAP Sapphire, Barcelona · BeyondTheBlack · LWT Summit ·
Product Advisory Collective — *Building with Agentic AI: A Fintech Leader's Show & Tell* ·
*Sounds Accurate* podcast — AI in Accounting

## Elsewhere

[LinkedIn](${LINKEDIN}) · [The full showcase](${SITE})

---

<sub>This file is generated from the engineering record, not maintained by hand. Last
recomputed ${new Date(proof.generatedAt).toLocaleDateString('en-US', { dateStyle: 'long' })}.</sub>
`;

mkdirSync(join(ROOT, 'dist'), { recursive: true });
writeFileSync(join(ROOT, 'dist', 'profile-README.md'), readme);
console.log('Wrote dist/profile-README.md');
console.log(`  ${readme.split('\n').length} lines, ${readme.length} chars`);
