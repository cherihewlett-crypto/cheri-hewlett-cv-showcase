# Selected Builds — System Design and Governance

The live portfolio presents six product walkthroughs. This brief explains what sits beneath each
interface: the problem framed, the system pattern, the governance boundary, and the expertise the
work demonstrates.

The implementations remain private. Product names, workflows, and interface states are presented
publicly with illustrative data and without customer identifiers, proprietary source, schemas, or
internal configuration.

## 1. Intelligent Product Enablement

**Problem.** Product delivery can move faster than customers and field teams can absorb it.
Documentation, release notes, training, and sales guidance arrive late or inconsistently, shifting
the adoption gap into support.

**System pattern.** A merged code change is interpreted for user-facing impact and translated into
the content set required for release readiness: help articles, release notes, training, and field
briefing. Each artifact retains its relationship to the originating change.

**Governance boundary.** Generation is not publication. A person reviews and approves every
artifact; nothing auto-publishes.

**Expertise demonstrated.** Developer tooling, content operations, product adoption, release
management, workflow orchestration, and human-in-the-loop AI.

[Open the live walkthrough](https://cherihewlett.dev/#build-product-enablement)

## 2. Acquisition Integration Engine

**Problem.** An acquisition creates value only when its technology becomes part of a coherent
platform. Without a deliberate capability model, duplicate implementations survive, integration
slows, and the portfolio fragments.

**System pattern.** Capabilities are normalized across the existing platform and acquired products,
compared on common evidence, assigned a surviving implementation, and translated into a
dependency-sequenced migration plan.

**Governance boundary.** Survivor and retirement decisions remain explainable. The system exposes
the capability evidence and sequencing dependencies instead of hiding the decision inside a score.

**Expertise demonstrated.** M&A integration, platform strategy, capability modeling, portfolio
rationalization, migration planning, and board-level decision support.

[Open the live walkthrough](https://cherihewlett.dev/#build-acquisition-integration)

## 3. Autonomous Implementor

**Problem.** Customer requirements are often translated manually into configuration. That extends
implementation time, disconnects the build from the original business problem, and makes promised
ROI difficult to measure.

**System pattern.** The workflow begins with the customer's stated problem, analyzes the current
process, maps the needed capabilities, produces implementation data and configuration, and tracks
outcomes against the customer's starting baseline.

**Governance boundary.** Approval routing sits between generated configuration and execution.
Traceability back to intake and baseline keeps automation accountable to the problem it was asked
to solve.

**Expertise demonstrated.** Enterprise implementation, process analysis, configuration generation,
customer value realization, approval workflows, and outcome measurement.

[Open the live walkthrough](https://cherihewlett.dev/#build-autonomous-implementor)

## 4. Roadmap Prioritization Engine

**Problem.** Roadmap investment is easily driven by volume, hierarchy, or incomplete business cases
rather than by the problems most likely to create value.

**System pattern.** Candidate investments are scored across impact, strategic fit, feasibility, and
signal. Confidence is explicit, evidence remains attached, and ranking changes as the quality of
the underlying evidence changes.

**Governance boundary.** The decision model is inspectable: dimensions, confidence, evidence, and
ranking movement remain visible so an executive or board can challenge the judgment.

**Expertise demonstrated.** Product strategy, portfolio allocation, due diligence, quantitative
prioritization, evidence modeling, and executive communication.

[Open the live walkthrough](https://cherihewlett.dev/#build-roadmap-prioritization)

## 5. Compliance Knowledge Base

**Problem.** An AI answer that cannot be traced to an authoritative rule is unusable when an error
can become an audit or reporting event. Company policy also needs to be applied alongside external
standards, not held separately in people's heads.

**System pattern.** Knowledge is decomposed into atomic rules that retain source citations. Retrieval
returns the governing standard and any applicable company-policy overlay so an expert can
independently verify the result.

**Governance boundary.** Answers without adequate provenance are refused. The model cannot replace
the citation, and a company-policy overlay remains visibly distinct from the external standard.

**Expertise demonstrated.** Knowledge architecture, retrieval, accounting and compliance,
provenance, policy overlays, and expert-review workflows.

[Open the live walkthrough](https://cherihewlett.dev/#build-compliance-knowledge-base)

## 6. Multi-Dimensional Orchestrator

**Problem.** Work enters through different channels, agent authority varies by task, and adding each
new specialist can create another one-off integration. Ungoverned agents that can act beyond their
authority are an operational liability.

**System pattern.** Support cases, use cases, code changes, and product-area signals are normalized
into one request envelope. A live registry routes by intent, domain, authority, urgency, and memory
depth; prior decisions are recalled; tools operate under a governed contract; and status is
recomputed from evidence after execution.

**Governance boundary.** Authority is evaluated before action and fails closed. Denials,
escalations, tool use, memory retrieval, and verification are retained in the request trace.

**Expertise demonstrated.** Multi-agent architecture, registries, durable memory, authorization,
workflow normalization, escalation design, observability, and evidence-based verification.

[Open the live walkthrough](https://cherihewlett.dev/#build-multidimensional-orchestrator)

## Cross-cutting design principles

Across the six systems, the recurring design choices are:

- start with the business problem and intended value, not the model or tool
- make judgment and evidence visible enough to challenge
- place human approval at consequential publication or execution boundaries
- keep authority explicit and fail closed when it cannot be established
- preserve provenance so an independent expert can re-verify the result
- measure the outcome against the baseline that justified the work
- design reusable capabilities and registry entries instead of one-off agent logic
