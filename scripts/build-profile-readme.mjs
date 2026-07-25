#!/usr/bin/env node
/**
 * Generates the GitHub profile README from the same engineering record the
 * showcase site renders from.
 *
 * Visual + enriched: a branded banner (the deployed OG card), identity badges,
 * the recomputed proof table, native Mermaid diagrams (GitHub renders these) of
 * the four-capability moat and the idea-to-scale arc, the products/functions
 * with industry framing, point of view, background, and speaking. Written for
 * the recruiter's first five seconds and for machine scanners alike.
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

const SITE = 'https://cherihewlett.dev';
const LINKEDIN = 'https://linkedin.com/in/cheri-hewlett';
const COLLECTOR =
  'https://github.com/cherihewlett-crypto/cheri-hewlett-cv-showcase/blob/main/scripts/collect-proof.mjs';
const badge = (label, value, color = '17b3c7') =>
  `![${label}](https://img.shields.io/badge/${encodeURIComponent(label)}-${encodeURIComponent(value)}-${color}?style=flat-square)`;

const readme = `[![Cheri Hewlett — from problem to solution through technology](${SITE}/opengraph-image)](${SITE})

# Cheri Hewlett

### Technology & innovation executive · Builder · CPA · Veteran

${badge('Role', 'Technology & Innovation Exec')} ${badge('CPA', 'Certified', '0e6d7c')} ${badge('U.S. Air Force', 'Veteran', '45e0b8')} ${badge('Based', 'Los Angeles', '143a4b')}

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

## My moat — four capabilities, rarely in one person

Turning a problem into a solution that returns value takes four things most teams split across four
people. Most candidates bring two.

\`\`\`mermaid
flowchart LR
    P([Problem worth solving])
    P --> D[Domain<br/>see the real problem]
    P --> J[Judgment<br/>choose the one worth solving]
    P --> E[Engineering<br/>build the answer]
    P --> L[Leadership<br/>carry it to impact]
    D --> V([Quantifiable value])
    J --> V
    E --> V
    L --> V
\`\`\`

## Idea to scale — I've operated at every stage

The rare part of a 0-to-1 leader is having actually done every stage, not one or two.

\`\`\`mermaid
flowchart LR
    A[Idea<br/>frame the problem] --> B[Prototype<br/>build in hours]
    B --> C[Fund<br/>investment-grade case]
    C --> D[Build<br/>ship the system]
    D --> E[Launch<br/>enterprise go-live]
    E --> F[Scale<br/>0 to global, full P&L]
\`\`\`

## What I'm building

- **Team Echo** — a multi-agent operating system: registry-driven routing, persistent memory, fail-closed authority, and a verifier that recomputes status from live evidence rather than trusting it.
- **Innovation Hub** — a portfolio cockpit for prototype due diligence and roadmap prioritization: evidence-based go/kill decisions, not whoever is loudest in the room.
- **Deterministic rules engine** — a computation engine for regulated, high-stakes numbers: the model plans, deterministic code computes, every figure traceable to source.
- **Citable rules corpus** — atomic domain rules with source-grade citability, re-verifiable by an expert who does not trust the model.

## Selected work — products and functions

Shown as a product where the whole thing is the deliverable, and as a reusable function where the
capability stands on its own. Anonymized — real systems, client identifiers removed.

| Kind | Deliverable | Where it lands |
|---|---|---|
| **Product** | Autonomous business-case engine — idea to a funded, compliance-cleared, safety-tested case | Private Equity · Financial Services · Due Diligence |
| **Product** | Acquisition integration & portfolio unification — absorb M&A fast, one seamless experience | Private Equity · M&A · Enterprise SaaS |
| **Function** | Governed agentic overlay — put audited AI over any legacy system of record, no rebuild | Legacy Modernization · AI Governance |
| **Product** | heyEcho — a multi-agent operating system (this site runs on it) | AI Platform · Agentic Systems |
| **Function** | Truthful verification — recompute "done" from evidence, not self-report | Compliance · Audit · AI Governance |
| **Function** | Domain-doctrine routing — route any question to the exact citable rule | Accounting · Regulatory · Compliance |

## Experience — industries, use cases, technology

**Industries** · Private Equity · Financial Services · Office of the CFO · Enterprise SaaS · Fund Administration · Accounting & Audit · RegTech · Real Estate

**Use cases** · Agentic AI & multi-agent orchestration · Autonomous operations · Business-case & due diligence · Acquisition integration · Portfolio unification · Financial reporting & close · Compliance & regulatory checks · System migration & go-lives · Knowledge & doctrine retrieval · AI governance & safety · Zero-to-one delivery & scaling

**Technology** · Claude / Anthropic API · Gemini · Vertex AI · Google ADK · RAG & vector memory · Mem0 · MCP tool orchestration · Supabase · PostgreSQL · Next.js · React · TypeScript · Node.js · Deno · Vercel · GitHub Actions · LLM evaluation & governance

## Point of view

**Innovation is choosing the right problem.** Most companies solve the wrong problems faster.
**ROI is the problem solved, not the time saved.** **Trust is the real moat** — the question isn't
"can AI do this," it's "can we prove it did it right." And **how you treat people is the strategy.**

## Background

U.S. Air Force — mission first, people always. PwC and Deloitte. Founded a CPA firm from scratch.
Built and managed a rental portfolio over a decade. Strategic advisor to Crux (London) on
product-acquisition integration, and a board member of the G.R.O.W. Foundation. Rose from customer
success to senior executive leadership at a publicly traded fintech. I've seen the product lifecycle
from every seat — implementing, selling, supporting, and betting a company's transformation on the product.

CPA (VA) · M.S. Accounting, Liberty University · B.S. Accounting & Computer Science, University of Maryland · U.S. Air Force Veteran · Los Angeles, CA

## In public

Speaker — BeyondTheBlack (main stage, five consecutive years) · BlackLine Investor Day · SAP Sapphire,
Barcelona · LWT Summit · Product Advisory Collective. Podcast guest — *Sounds Accurate*, *The Go-Live Gap*. Writing on LinkedIn.

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
