#!/usr/bin/env node
/**
 * Generates the GitHub profile README from the same engineering record the
 * showcase site renders from.
 *
 * Written for the recruiter's first five seconds: identity, the bridge thesis,
 * the proof numbers, and a link to the live site — all before any scrolling.
 * The work is private because it is real, so the numbers come from this
 * repository's own collector rather than a badge service that can only count
 * public commits.
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
const t = proof.totals;
const n = (v) => v.toLocaleString('en-US');

const SITE = 'https://cheri-hewlett-showcase-cherihewlett-cryptos-projects.vercel.app';
const LINKEDIN = 'https://linkedin.com/in/cheri-hewlett';
const COLLECTOR =
  'https://github.com/cherihewlett-crypto/cheri-hewlett-cv-showcase/blob/main/scripts/collect-proof.mjs';

const readme = `# Cheri Hewlett

### Technology & innovation executive · Builder · CPA · Veteran

**I draw the bridge from problem to solution through technology — the right solution for the
problems that return quantifiable value and deliver real impact. Not the newest thing. The thing
that pays.**

### → **[See the work, with the receipts →](${SITE})**

---

## The record

| ${n(t.authoredCommits)} | ${n(t.mergedPullRequests)} | 302 | ${n(t.edgeFunctions)} | ${n(t.migrations)} | ${n(t.systems)} |
|:--:|:--:|:--:|:--:|:--:|:--:|
| commits **written** | PRs **shipped** | reusable **capabilities** | live **services** | governed **migrations** | **production** systems |

Every number is recomputed from private production repositories on each build — never typed in.
Authored commits exclude ${n(t.automatedCommits)} automated sync and merge commits; counting those
would inflate the figure ~2.3×. The [collector that produces these numbers](${COLLECTOR}) is public
even though its inputs are not.

## Why me — four things at once

Turning a problem into a solution that returns value takes four capabilities most people split
across a team, and most candidates bring two:

- **Domain** — to see the real problem. Finance, accounting, system migrations, and the operating-model change around them, where a wrong number is a reportable event.
- **Judgment** — to choose the one problem worth solving. Innovation is picking the right problem, not building the newest thing.
- **Engineering** — to build the answer. Four production systems, designed and written personally.
- **Leadership** — to carry it to impact. Every seat of the product lifecycle, and full P&L ownership at public-company scale.

## What I'm building

- **Team Echo** — a multi-agent operating system: registry-driven routing, persistent memory, fail-closed authority, and a verifier that recomputes status from live evidence rather than trusting it.
- **Innovation Hub** — a portfolio cockpit for prototype due diligence and roadmap prioritization: evidence-based go/kill decisions, not whoever is loudest in the room.
- **Consolidation Platform** — a financial close-and-consolidation engine: the model plans, deterministic code computes, every number traceable.
- **Accounting Doctrine KB** — atomic US GAAP and IFRS rules with SOX-grade citability, re-verifiable by an auditor who does not trust the model.

## Point of view

**Innovation is choosing the right problem.** Most companies solve the wrong problems faster.
**ROI is the problem solved, not the time saved.** **Trust is the real moat** — the question isn't
"can AI do this," it's "can we prove it did it right." And **how you treat people is the strategy.**

## Background

U.S. Air Force — mission first, people always. PwC and Deloitte. Founded a CPA firm from scratch.
Built and managed a real estate portfolio over a decade. Rose from customer success to senior
executive leadership at a publicly traded fintech. I've seen the product lifecycle from every seat —
implementing, selling, supporting, and betting a company's transformation on the product.

CPA · MS Accounting · BS Accounting & Computer Science · U.S. Air Force Veteran · Board Member, G.R.O.W. Foundation

## In public

Speaker — BlackLine Investor Day · SAP Sapphire, Barcelona · BeyondTheBlack · LWT Summit ·
Product Advisory Collective. Podcast guest — *Sounds Accurate*. Writing on LinkedIn.

## Elsewhere

**[The full showcase →](${SITE})** · [LinkedIn](${LINKEDIN})

---

<sub>Generated from the engineering record, not maintained by hand. Recomputed
${new Date(proof.generatedAt).toLocaleDateString('en-US', { dateStyle: 'long' })}.</sub>
`;

mkdirSync(join(ROOT, 'dist'), { recursive: true });
writeFileSync(join(ROOT, 'dist', 'profile-README.md'), readme);
console.log('Wrote dist/profile-README.md');
console.log(`  ${readme.split('\n').length} lines, ${readme.length} chars`);
