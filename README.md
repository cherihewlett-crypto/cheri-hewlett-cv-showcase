# Cheri Hewlett, CPA

**AI-native operating executive — platform leadership with the engineering record to check it against.**

### → [View the showcase](https://cheri-hewlett-showcase-cherihewlett-cryptos-projects.vercel.app)

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

| System | What it is |
|---|---|
| **Team Echo** | Multi-agent operating system — persistent memory, governed tool use, self-verifying status |
| **Innovation Hub** | Portfolio cockpit for prototype due diligence, roadmap prioritization, and time allocation |
| **Consolidation Platform** | Financial consolidation and close engine built on the doctrine corpus below |
| **Accounting Doctrine KB** | Atomic US GAAP and IFRS rules with SOX-grade citability and auditor re-verifiability |

The site breaks these down further: the standing agent functions that operate them, the
request lifecycle they share, the capabilities that turned out to be portable across
domains, and where deterministic rules end and the model begins.

---

## Running it yourself

```bash
npm install && npm run dev
```

To recompute the engineering record against local checkouts:

```bash
REPO_ROOT=/path/to/your/checkouts node scripts/collect-proof.mjs
```

Built with Next.js and Motion. No analytics, no trackers, no third-party requests.

---

## Also here

- [Résumé, plain text](resume/cheri-hewlett-cv.md)
- [Case studies](case-studies/) — longer-form write-ups of the work behind the site
- [Format benchmark](research/top-10-github-showcase-formats.md) — the survey this design was measured against

## Contact

- LinkedIn: <https://linkedin.com/in/cheri-hewlett>
