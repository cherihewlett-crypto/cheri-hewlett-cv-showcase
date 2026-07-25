[![Cheri Hewlett — from problem to solution through technology](https://cherihewlett.dev/opengraph-image)](https://cherihewlett.dev)

# Cheri Hewlett

**Technology & innovation executive · Builder · CPA · Veteran**

I draw the bridge from problem to solution through technology — the right solution for the
problems that return quantifiable value and deliver real impact. Not the newest thing. The thing
that pays.

### → **[View the full showcase → cherihewlett.dev](https://cherihewlett.dev)**

---

## What this repository is

The site above makes claims about systems I have built. This repository contains the
mechanism that checks them.

Most portfolio sites state their numbers. This one recomputes them. On every build,
[`scripts/collect-proof.mjs`](scripts/collect-proof.mjs) reads the private production
repositories and emits [`public/proof.json`](public/proof.json) — the file the site
renders from. Nothing on the page is hand-maintained.

Two rules make the output worth trusting:

- **Authored commits exclude automated work.** Sync, audit, and merge commits are
  filtered out. The raw commit count is roughly 2.3× higher and is never displayed.
- **Claims are labelled by how they were established.** Figures recomputed from the
  record render as *verified*. Facts no script can check render as *attested*. They are
  visually distinct, and the distinction is deliberate.

If a repository cannot be read, its entry is omitted rather than estimated, and the
[nightly workflow](.github/workflows/refresh-proof.yml) skips the run entirely rather
than publishing partial totals.

Nothing proprietary leaves the private repositories. The collector emits counts and
dates only — never source, paths, commit messages, or schema detail.

---

## What is measured

Four systems, all private, all running:

| System | The capability |
|---|---|
| **Team Echo** | Multi-agent operating system — persistent memory, governed tool use, self-verifying status |
| **Innovation Hub** | Portfolio cockpit for prototype due diligence, roadmap prioritization, and time allocation |
| **Deterministic rules engine** | A computation engine for regulated, high-stakes numbers — the model plans, deterministic code computes, every figure traceable to source |
| **Citable rules corpus** | Atomic domain rules with source-grade citability, re-verifiable by an expert who does not trust the model |

The site breaks these down further: the reusable functions and products behind them, the
302-capability library and the agent team that operate them, the live guardrail demo, and the
experience across industries, use cases, and technology.

---

## Running it yourself

```bash
npm install && npm run dev
```

To recompute the engineering record against local checkouts:

```bash
REPO_ROOT=/path/to/your/checkouts node scripts/collect-proof.mjs
```

Built with Next.js and Motion. Privacy-friendly analytics only — no cookies, no trackers.

---

## Also here

- [Résumé, plain text](resume/cheri-hewlett-cv.md)
- [The GitHub profile README generator](scripts/build-profile-readme.mjs)

## Contact

- LinkedIn: <https://linkedin.com/in/cheri-hewlett>
