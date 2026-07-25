import type { Stage } from './Clickthrough';

/**
 * Stage sequences for the animated product plays in Selected Work.
 *
 * Every sequence is rebuilt clean from the underlying logic and anonymized — no
 * client is named, no client artifact reproduced. Each stage names the guard or
 * check that has to pass before the next one runs, because the point of these
 * systems is not that they move fast but that they refuse to advance on a
 * confident guess.
 */

export type Play = { label: string; stages: Stage[] };

// Autonomous business-case engine — problem in, investment-grade case out.
export const BUSINESS_CASE_PLAY: Play = {
  label: 'Autonomous engine — the pipeline, running',
  stages: [
    {
      key: 'Intake',
      title: 'Research intake',
      body: 'A problem arrives — “is this worth solving, and is it the one to solve first?” The engine frames the question and scopes the research before any answer is drafted.',
      guard: 'scope locked',
    },
    {
      key: 'Orchestrate',
      title: 'Orchestrated research',
      body: 'Work fans out across business, technical, and independent-review roles in parallel — each blind to the others so nothing is rubber-stamped. P0 gaps are surfaced, not buried.',
      guard: 'roles reconciled',
    },
    {
      key: 'Build',
      title: 'Evidence-backed business case',
      body: 'The case is assembled from collected evidence and graded — HIGH or LOW, investment-grade-ready or not. A claim with no evidence behind it is blocked, not softened.',
      guard: 'investment-grade or reject',
    },
    {
      key: 'Comply',
      title: 'Compliance & regulatory gate',
      body: 'The proposal is intersected against the regulatory control pack and the accounting doctrine it touches — because in this domain a confident guess is a reportable event.',
      guard: 'control pack cleared',
    },
    {
      key: 'Attack',
      title: 'Safety red-team',
      body: 'A deterministic adversary tries to break the recommendation — destructive paths, unsafe actions, over-claims. What survives is what ships.',
      guard: 'adversary survived',
    },
    {
      key: 'Deliver',
      title: 'Goal-completion audit → delivery',
      body: 'Before anything is called done, a verifier recomputes goal completion from the evidence. Only then does the finished business case and delivery plan leave the engine.',
      guard: 'recomputed, not asserted',
    },
  ],
};

// Acquisition integration & portfolio unification — absorb a roll-up without
// fragmenting it. Anonymized from the highly-acquisitive-software-company work.
export const ACQUISITION_PLAY: Play = {
  label: 'Acquisition integration — absorbing a roll-up',
  stages: [
    {
      key: 'Assess',
      title: 'Acquired-product assessment',
      body: 'A newly acquired product arrives with its own data model, identity system, and overlapping features. First the shape is mapped — what it does, what it duplicates, where it collides with the platform it is joining.',
      guard: 'overlap surfaced',
    },
    {
      key: 'Unify',
      title: 'Common data & identity layer',
      body: 'Customers, entities, and records are reconciled to one canonical model with one identity — so the same customer is not three different accounts across three acquired systems.',
      guard: 'one record per entity',
    },
    {
      key: 'Integrate',
      title: 'The integration playbook',
      body: 'A repeatable playbook absorbs the product into the platform — not a bespoke rescue each time, but the same sequenced path every acquisition runs, so the tenth is faster than the first.',
      guard: 'playbook, not heroics',
    },
    {
      key: 'Sequence',
      title: 'Sequencing that compounds',
      body: 'The order of the merges is chosen so capability builds on capability instead of colliding. The wrong sequence turns a roll-up into a pile of parts; the right one makes it worth more than the sum.',
      guard: 'compounds, not fragments',
    },
    {
      key: 'Experience',
      title: 'One seamless experience',
      body: 'The customer never sees the seams. Many acquired products resolve into a single coherent experience — one login, one language, one product — while the back end is quietly unified underneath.',
      guard: 'seams invisible to the customer',
    },
  ],
};

// heyEcho — the multi-agent operating system this site runs on. Her own IP.
export const HEYECHO_PLAY: Play = {
  label: 'heyEcho — a request moving through the platform',
  stages: [
    {
      key: 'Route',
      title: 'Registry-driven routing',
      body: 'A request enters and is routed to the right agent from a live registry — not hard-wired, so a new specialist is a config entry, not a rewrite. One router in front of every surface.',
      guard: 'routed, not hard-coded',
    },
    {
      key: 'Authority',
      title: 'Fail-closed authority',
      body: 'Before any tool runs, the action is checked against what this agent is allowed to do. The default is no. A capability that was never granted cannot be exercised by accident.',
      guard: 'default deny',
    },
    {
      key: 'Memory',
      title: 'Persistent, tagged memory',
      body: 'Context is pulled from and written back to cross-session memory, tagged by project and kind — so the system compounds what it learns instead of starting cold every session.',
      guard: 'tagged or rejected',
    },
    {
      key: 'Act',
      title: 'Governed tool use',
      body: 'The approved action runs through a governed tool layer with a full audit trail — every call attributable, nothing executed off the record.',
      guard: 'every call on the record',
    },
    {
      key: 'Verify',
      title: 'Status recomputed from evidence',
      body: '“Done” is not taken on trust. A verification layer recomputes the real state from live evidence and flags any gap between what was claimed and what the checks support.',
      guard: 'recomputed, not asserted',
    },
  ],
};
