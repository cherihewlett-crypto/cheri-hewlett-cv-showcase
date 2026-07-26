[![Cheri Hewlett operating model — from a meaningful problem to governed, verifiable impact](https://cherihewlett.dev/opengraph-image?visual=operating-model)](https://cherihewlett.dev)

# Cheri Hewlett

**Technology & innovation executive · People builder · Operator · CPA · Veteran**

> **Progress belongs to the people willing to challenge what no longer works.**

## About me

I built my career by questioning accepted answers, looking beyond the boundaries of my role, and
refusing to let hierarchy, politics, or bureaucracy stand between a meaningful problem and a better
solution.

Technology is moving faster than traditional organizations can respond. I help close that gap —
modernizing systems, aligning people, and creating the conditions for ideas to move, decisions to
be made, and impact to scale.

[Full profile](https://cherihewlett.dev) ·
[Résumé](https://cherihewlett.dev/resume) ·
[Speaking](https://cherihewlett.dev/#speaking) ·
[LinkedIn](https://linkedin.com/in/cheri-hewlett)

## What this repository is

This is the diligence layer behind the profile: a public, privacy-safe view of selected systems,
technical case studies, reusable engineering mechanisms, and the controls used to keep published
claims trustworthy.

The most likely first readers are hiring and executive leaders validating the résumé, followed by
product and technical leaders evaluating how I think and build. The repository is organized so each
can get to useful evidence quickly:

| If you are looking for… | Start here |
|---|---|
| Executive scope and career context | [Résumé](https://cherihewlett.dev/resume) and [full profile](https://cherihewlett.dev) |
| Products and zero-to-one systems | [Selected builds](#selected-builds) and the [deeper project brief](case-studies/selected-builds.md) |
| Technical depth | [Case studies](#technical-case-studies) and the [public arsenal](#public-arsenal) |
| Governance and operating discipline | [Repository controls](#governance-you-can-inspect) and [proof-integrity tests](test/proof-integrity.test.mjs) |
| Speaking and thought leadership | [Speaking profile](https://cherihewlett.dev/#speaking) and [speaker one-sheet](https://cherihewlett.dev/speaker-one-sheet.pdf) |

## Selected builds

The production repositories remain private. The live portfolio rebuilds the real product screens
with illustrative data and client identifiers removed; the project brief goes one level deeper into
the problem, system design, governance, and skills demonstrated.

| Build | Capability demonstrated | Explore |
|---|---|---|
| **Intelligent Product Enablement** | Developer-to-customer release pipeline with human approval before publication | [Demo](https://cherihewlett.dev/#build-product-enablement) · [Brief](case-studies/selected-builds.md#1-intelligent-product-enablement) |
| **Acquisition Integration Engine** | Evidence-based capability comparison, survivor decisions, and dependency-sequenced migration | [Demo](https://cherihewlett.dev/#build-acquisition-integration) · [Brief](case-studies/selected-builds.md#2-acquisition-integration-engine) |
| **Autonomous Implementor** | Customer problem to process analysis, configuration, approval, and measured ROI | [Demo](https://cherihewlett.dev/#build-autonomous-implementor) · [Brief](case-studies/selected-builds.md#3-autonomous-implementor) |
| **Roadmap Prioritization Engine** | Confidence-weighted investment scoring that re-ranks as evidence changes | [Demo](https://cherihewlett.dev/#build-roadmap-prioritization) · [Brief](case-studies/selected-builds.md#4-roadmap-prioritization-engine) |
| **Compliance Knowledge Base** | Atomic, citable rules with policy overlays and refusal when provenance is missing | [Demo](https://cherihewlett.dev/#build-compliance-knowledge-base) · [Brief](case-studies/selected-builds.md#5-compliance-knowledge-base) |
| **Multi-Dimensional Orchestrator** | Registry routing, durable memory, fail-closed authority, escalation, and evidence-based verification | [Demo](https://cherihewlett.dev/#build-multidimensional-orchestrator) · [Brief](case-studies/selected-builds.md#6-multi-dimensional-orchestrator) |

## Skills and expertise

| Area | What the work demonstrates |
|---|---|
| **Executive and product leadership** | Platform strategy, zero-to-one product creation, full P&L ownership, roadmap investment, board communication, and global scaling |
| **AI and systems architecture** | Multi-agent orchestration, registry-driven routing, durable memory, workflow automation, retrieval, and deterministic verification |
| **Governance and safety** | Authority boundaries, human approval, fail-closed behavior, provenance, auditability, red-team testing, and separation of duties |
| **Domain depth** | Enterprise SaaS, the Office of the CFO, accounting and compliance, acquisition integration, implementation, and customer adoption |
| **Hands-on engineering** | Next.js, React, TypeScript, Node.js, data validation, test automation, build gates, and production deployment |
| **Leadership and communication** | People-first operating models, cross-functional alignment, executive storytelling, speaking, and translating technical systems into business value |

## Technical case studies

These public-safe briefs focus on architecture and operating patterns rather than repeating the
profile:

- [Selected builds — system design and governance](case-studies/selected-builds.md)
- [AI operating system](case-studies/ai-operating-system.md)
- [AI safety and governance engineering](case-studies/ai-safety-and-governance-engineering.md)
- [Truthful verification systems](case-studies/truthful-verification-systems.md)
- [Verification-first operations](case-studies/verification-first-operations.md)
- [Workflow automation](case-studies/workflow-automation.md)

## Public arsenal

The private 302-capability library is not published. These reusable mechanisms are visible here and
can be inspected directly:

| Mechanism | Purpose | Source |
|---|---|---|
| **Proof integrity contract** | Rejects missing, blank, zero, inconsistent, partial, or regressed engineering totals | [`lib/proof-integrity.js`](lib/proof-integrity.js) |
| **Atomic proof replacement** | Validates a candidate snapshot before replacing the last known-good artifact | [`scripts/proof-file.mjs`](scripts/proof-file.mjs) |
| **Evidence collector** | Aggregates public-safe counts from authorized local repositories without emitting proprietary content | [`scripts/collect-proof.mjs`](scripts/collect-proof.mjs) |
| **Independent build guard** | Revalidates the checked-in evidence snapshot before every production build | [`scripts/validate-proof.mjs`](scripts/validate-proof.mjs) |
| **Design compiler** | Converts the approved source designs into versioned application artifacts | [`scripts/build-design.py`](scripts/build-design.py) |
| **Accessible portfolio navigation** | Adds section navigation, scroll-spy behavior, reduced-motion handling, and the persistent build carousel | [`components/ProfileContent.tsx`](components/ProfileContent.tsx) · [`lib/section-navigation.ts`](lib/section-navigation.ts) |
| **Negative-path test harness** | Proves invalid evidence is rejected and cannot overwrite the known-good snapshot | [`test/proof-integrity.test.mjs`](test/proof-integrity.test.mjs) |

## Governance you can inspect

This repository intentionally demonstrates a few lightweight but meaningful controls:

- **Canonical source and generated output are separated.** Approved files in
  [`design-src/`](design-src) generate the application artifacts in `app/_generated/`; generated
  files are not treated as the authoring source.
- **Evidence fails closed.** `npm run build` runs the proof validator first. Invalid data stops the
  build instead of rendering blank or zero values.
- **The last known-good snapshot is preserved.** Collection validates a temporary candidate before
  atomic replacement; a failed refresh leaves [`public/proof.json`](public/proof.json) untouched.
- **No unattended publication path exists.** Evidence refreshes are intentional and reviewed like
  source changes; there is no scheduled updater pushing measurements directly to production.
- **Private work stays private.** Public demos preserve workflows and decisions while using
  illustrative data. The collector emits counts and dates—not source code, paths, commit messages,
  customer information, or schemas.
- **Claims carry a state.** Machine-checkable figures are labelled *verified*; career facts that
  cannot be checked by code are labelled *attested*.
- **Behavior is tested at the failure boundary.** The suite covers zero, blank, partial,
  inconsistent, missing-source, and regression cases—not just the happy path.

## Evidence snapshot

| Claim | Meaning | State |
|---:|---|:---:|
| **16,983** | Contributions in the last year | Verified |
| **6,916** | Authored commits, excluding bots and merge commits | Verified |
| **1,725** | Pull requests written, reviewed, and merged | Verified |
| **131** | Live production services | Verified |
| **302** | Reusable capabilities catalogued and maintained | Verified |
| **3 years** | Consecutive triple-digit YoY growth on a platform line built from zero | Attested |
| **20 years** | Leading enterprise software, primarily in the Office of the CFO | Attested |

The first five figures are a checked, versioned snapshot. If collection or validation fails, the
published values remain on the last known-good non-zero totals.

## Repository map

```text
app/             Next.js routes, metadata, and generated page artifacts
case-studies/    Public-safe technical and operating-system briefs
components/      Client behavior for navigation and portfolio interaction
design-src/      Canonical profile and résumé designs
lib/             Reusable navigation and proof-integrity contracts
public/          Versioned evidence snapshot, images, and public PDFs
resume/          Public-safe source résumé
scripts/         Design compilation, evidence collection, validation, and README generation
test/            Positive and negative-path verification
```

## Run and verify

```bash
npm install
npm test
npm run build
npm run dev
```

To recompute the engineering snapshot against authorized local checkouts:

```bash
REPO_ROOT=/path/to/your/checkouts node scripts/collect-proof.mjs
```

## Links

- [Full profile](https://cherihewlett.dev)
- [Résumé — web](https://cherihewlett.dev/resume) · [PDF](https://cherihewlett.dev/Cheri_Hewlett_Resume.pdf) · [plain text](resume/cheri-hewlett-cv.md)
- [Speaking and one-sheet](https://cherihewlett.dev/#speaking)
- [LinkedIn](https://linkedin.com/in/cheri-hewlett)
- [GitHub](https://github.com/cherihewlett-crypto)
