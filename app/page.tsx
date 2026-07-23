import Image from 'next/image';
import Audit from '@/components/Audit';
import Backdrop from '@/components/Backdrop';
import Enablement from '@/components/Enablement';
import HeroTitle from '@/components/HeroTitle';
import Lifecycle from '@/components/Lifecycle';
import Market from '@/components/Market';
import Pipeline from '@/components/Pipeline';
import Rail from '@/components/Rail';
import Reveal from '@/components/Reveal';
import Systems from '@/components/Systems';
import Teams from '@/components/Teams';
import { claims, proof, relativeAge } from '@/lib/proof';
import styles from './page.module.css';

const SECTIONS = [
  { id: 'systems', label: 'Systems' },
  { id: 'pipeline', label: 'Runtime' },
  { id: 'teams', label: 'Teams' },
  { id: 'enablement', label: 'Enablement' },
  { id: 'practice', label: 'Practice' },
  { id: 'lifecycle', label: 'Prototype→scale' },
  { id: 'fit', label: 'Fit' },
  { id: 'record', label: 'Record' },
  { id: 'voice', label: 'In public' },
  { id: 'contact', label: 'Contact' },
];

/**
 * Capabilities that were built for one vertical problem and turned out to
 * generalise. Naming them separately is the difference between "I shipped a
 * consolidation tool" and "I know which parts of it are reusable".
 */
const PORTABLE = [
  {
    name: 'AI entity matching and schema mapping',
    from: 'Consolidation Platform',
    body: 'Reconciling messy source structures against a target model. The same machinery applies to any migration, integration, or master-data problem.',
  },
  {
    name: 'Deterministic engine under model orchestration',
    from: 'Consolidation Platform',
    body: 'The model chooses mapping and sequencing; the arithmetic is deterministic code with a traceable path. This is the pattern that makes AI usable where a wrong number is reportable.',
  },
  {
    name: 'Citable, re-verifiable retrieval',
    from: 'Accounting Doctrine KB',
    body: 'Atomic rules carrying their own citations, so an answer can be walked back to source by someone who does not trust the model. Portable to law, clinical, and policy domains.',
  },
  {
    name: 'Enterprise connector and activation layer',
    from: 'Consolidation Platform',
    body: 'Source-system connectors, import recognition, and SSO activation — the unglamorous surface area that decides whether enterprise software actually lands.',
  },
];

/** Implementation work that rarely survives the trip onto an executive résumé. */
const PRACTICE = [
  {
    title: 'Registry-driven agent routing',
    body: 'Replaced a hardcoded specialist map with a routing table sourced from live agent registry records — keyword activation, context mapping, and classifier-domain composition resolved at runtime. Adding an agent is a row, not a deploy.',
  },
  {
    title: 'Fail-closed authority boundaries',
    body: 'Tool and action authority load as effective policy and are enforced at call time. When policy cannot be resolved, the action is refused rather than allowed — the failure mode is a stopped agent, never an ungoverned one.',
  },
  {
    title: 'Guardrails ahead of classification',
    body: 'Request guardrails run before model classification, so destructive and unsafe requests are refused without a model call, and every violation writes telemetry that can be audited later.',
  },
  {
    title: 'Adversarial safety coverage',
    body: 'Deterministic red-team suites across destructive actions, financial actions, impersonation, credential requests, and sensitive data — paired with true-negative checks so the classifier is measured on over-refusal too.',
  },
  {
    title: 'Truthful status verification',
    body: 'A verifier recomputes completion state from live checks instead of trusting recorded status. It detects pass-to-fail regressions, flags claim-versus-check drift, and raises an alert when a status is asserted that the evidence no longer supports.',
  },
  {
    title: 'Authenticated completion gating',
    body: 'HMAC-verified webhook processing with acceptance-proof detection, so work is marked complete only when something outside the agent confirms it happened.',
  },
];

/**
 * Framed by what was built rather than by employer and title. The engineering
 * record above does the arguing; this exists only to say where the domain
 * knowledge inside these systems came from.
 */
const ROLES = [
  {
    org: 'What I build',
    title: 'Governed AI systems for work that gets audited',
    body: 'Multi-agent orchestration with persistent memory, fail-closed tool authority, and a verification layer that recomputes state rather than trusting it. Built on Supabase, Vercel, Mem0, and MCP-based tool orchestration — the four systems above, running in production rather than sitting in a prototype folder.',
  },
  {
    org: 'Where the domain came from',
    title: 'Two decades in enterprise software, most of it in the office of the CFO',
    body: 'Platform and product leadership at public-company scale, including building and running a financial analytics platform line with full P&L ownership across product, engineering, go-to-market, and customer success. That is the source of the close mechanics, accounting doctrine, and audit constraints encoded in this work — it is why the consolidation engine keeps its arithmetic deterministic, and why every rule in the doctrine corpus carries a citation.',
  },
  {
    org: 'How I work',
    title: 'The model plans; deterministic code decides',
    body: 'Domain rules and logic carry the weight; the model is reserved for the ambiguous middle. Capabilities are measured against their recurring cost before approval, coverage is claimed only against an enumerated inventory, and nothing closes on the builder’s own say-so.',
  },
];

/** Written work — the point of view the systems are built out of. */
const WRITING = [
  {
    name: 'Agentic AI System Design: The Full Guide',
    note: 'Architecture, human alignment, operational governance, and deployment — the blueprint these systems were built against.',
  },
  {
    name: 'The Disruption Decade',
    note: 'What a decade of compounding disruption asks of operators, and why the durable advantage is judgement rather than tooling.',
  },
  {
    name: 'Confidence That Can’t Be Shaken',
    note: 'On resilience as an operating capability — building conviction that survives contact with a changing market.',
  },
  {
    name: 'The CFO Intelligence System',
    note: 'The commercial thesis behind applying agentic AI to the office of the CFO.',
  },
];

const TALKS = [
  { name: 'Building with Agentic AI: A Fintech Leader’s Show & Tell', venue: 'Product Advisory Collective', year: '2026' },
  { name: 'BlackLine Investor Day', venue: 'New York', year: '2024' },
  { name: 'SAP Sapphire', venue: 'Barcelona', year: '2024' },
  { name: 'LWT Summit', venue: 'Leading Women in Technology', year: '2024' },
  { name: 'BeyondTheBlack', venue: 'Annual conference', year: '2022 — 2026' },
];

export default function Page() {
  const stillAt = relativeAge(proof.generatedAt);
  const buildDate = new Date(proof.generatedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className={styles.shellWrap} id="top">
      <div className="shell">
        <Rail sections={SECTIONS} stillAt={stillAt} />

        <main className="shell__main">
          {/* ------------------------------------------------------- hero */}
          <header className={`band band--flush ${styles.hero}`}>
            <p className={styles.eyebrow}>Cheri Hewlett, CPA · Agentic AI systems for work that gets audited</p>

            <Backdrop />
            <HeroTitle />

            <div className={styles.heroBody}>
              <p className="lede">
                That gap is the whole job. In the office of the CFO a confident guess is not a bad suggestion — it is a
                reportable event. I design agentic systems that can prove what they did, and I build them myself.
              </p>
              <p className={styles.heroSub}>
                The figures below are not typed in. They are recomputed from the engineering record every time this page
                builds, and labelled by how much you should trust them.
              </p>
            </div>

            <Audit claims={claims} stillAt={stillAt} />
          </header>

          {/* ---------------------------------------------------- systems */}
          <section className="band" id="systems">
            <h2 className="band__label">
              <span>What&apos;s running</span>
              <span>four production systems</span>
            </h2>
            <Reveal>
              <p className="prose" style={{ marginBlockEnd: '2.5rem', maxWidth: '58ch' }}>
                These are private repositories, so the code stays where it is. What is published here are counts —
                recomputed on every build, never hand-maintained, and never estimated when a system cannot be read.
              </p>
            </Reveal>
            <Systems systems={proof.systems} />

            <div className={styles.portable}>
              <h3 className={styles.portableHead}>Built once, reusable elsewhere</h3>
              <div className={styles.portableGrid}>
                {PORTABLE.map((item, i) => (
                  <Reveal key={item.name} delay={(i % 2) * 0.06}>
                    <article className={styles.portableItem}>
                      <p className={styles.portableFrom}>{item.from}</p>
                      <h4 className={styles.portableName}>{item.name}</h4>
                      <p className={styles.portableBody}>{item.body}</p>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ------------------------------------------------------ teams */}
          <section className="band" id="teams">
            <h2 className="band__label">
              <span>Teams</span>
              <span>standing functions</span>
            </h2>
            <Reveal>
              <p className="prose" style={{ maxWidth: '58ch', marginBlockEnd: '3rem' }}>
                Not one assistant with a long prompt. Named functions with duties, schedules, and escalation paths that
                keep running when nobody is watching.
              </p>
            </Reveal>
            <Teams />
          </section>

          {/* --------------------------------------------------- pipeline */}
          <section className="band" id="pipeline">
            <h2 className="band__label">
              <span>How it works</span>
              <span>request lifecycle</span>
            </h2>
            <Reveal>
              <p className="prose" style={{ maxWidth: '58ch' }}>
                The ordering here is the design decision. Most agent stacks classify a request first and check safety
                afterwards — by then the model has already reasoned about it. This one refuses first.
              </p>
            </Reveal>
            <Pipeline />
          </section>

          {/* ------------------------------------------------- enablement */}
          <section className="band" id="enablement">
            <h2 className="band__label">
              <span>Enablement</span>
              <span>signal to implementation</span>
            </h2>
            <Reveal>
              <p className="prose" style={{ maxWidth: '60ch', marginBlockEnd: '2.5rem' }}>
                The same five stages whether the subject is an infrastructure fault, an account drifting toward churn,
                or an implementation running late. Deterministic rules and domain logic do the deciding; the model
                handles the ambiguous middle. Each stage below is marked for whether it is running today or is where the
                existing machinery extends.
              </p>
            </Reveal>
            <Enablement />
          </section>

          {/* --------------------------------------------------- practice */}
          <section className="band" id="practice">
            <h2 className="band__label">
              <span>Practice</span>
              <span>implementation detail</span>
            </h2>
            <Reveal>
              <p className="prose" style={{ maxWidth: '58ch', marginBlockEnd: '3rem' }}>
                The work below is the kind that usually gets compressed into one line of an executive résumé. It is here
                in full because it is the part that is hard to fake.
              </p>
            </Reveal>
            <div className={styles.practice}>
              {PRACTICE.map((item, i) => (
                <Reveal key={item.title} delay={(i % 2) * 0.08}>
                  <article className={styles.practiceItem}>
                    <h3 className={styles.practiceTitle}>{item.title}</h3>
                    <p className={styles.practiceBody}>{item.body}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </section>

          {/* -------------------------------------------------- lifecycle */}
          <section className="band" id="lifecycle">
            <h2 className="band__label">
              <span>Prototype → scale</span>
              <span>the whole arc</span>
            </h2>
            <Reveal>
              <p className="prose" style={{ maxWidth: '60ch', marginBlockEnd: '2.5rem' }}>
                Product and innovation leadership is written as a lifecycle — prototype, prove, harden, scale. The
                common gap is a leader who has lived in one or two of those stages. Here is what sits at each.
              </p>
            </Reveal>
            <Lifecycle />
          </section>

          {/* -------------------------------------------------------- fit */}
          <section className="band" id="fit">
            <h2 className="band__label">
              <span>Fit</span>
              <span>requirement to evidence</span>
            </h2>
            <Reveal>
              <p className="prose" style={{ maxWidth: '58ch', marginBlockEnd: '2.75rem' }}>
                Senior AI roles are scoped in a fairly consistent vocabulary. Rather than leave the match to inference,
                here is that vocabulary against the work that answers it.
              </p>
            </Reveal>
            <Market />
          </section>

          {/* ----------------------------------------------------- record */}
          <section className="band" id="record">
            <h2 className="band__label">
              <span>Background</span>
              <span>where the domain came from</span>
            </h2>
            <div className={styles.record}>
              <div className={styles.roles}>
                {ROLES.map((role, i) => (
                  <Reveal key={role.title} delay={i * 0.06}>
                    <article className={styles.role}>
                      <p className={styles.roleOrg}>{role.org}</p>
                      <h3 className={styles.roleTitle}>{role.title}</h3>
                      <p className={styles.roleBody}>{role.body}</p>
                    </article>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.1}>
                <figure className={styles.portrait}>
                  <Image
                    src="/brand/headshot.jpg"
                    alt="Cheri Hewlett speaking on stage"
                    width={520}
                    height={660}
                    className={styles.portraitImg}
                    priority={false}
                  />
                  <figcaption className={styles.quote}>
                    “AI will empower those who can see the problems that matter — and are resilient enough to solve
                    them.”
                  </figcaption>
                </figure>
              </Reveal>
            </div>
          </section>

          {/* ------------------------------------------------------ voice */}
          <section className="band" id="voice">
            <h2 className="band__label">
              <span>In public</span>
              <span>writing &amp; talks</span>
            </h2>

            <div className={styles.writing}>
              {WRITING.map((piece, i) => (
                <Reveal key={piece.name} delay={(i % 2) * 0.06}>
                  <article className={styles.piece}>
                    <h3 className={styles.pieceName}>{piece.name}</h3>
                    <p className={styles.pieceNote}>{piece.note}</p>
                  </article>
                </Reveal>
              ))}
            </div>

            <p className={styles.talksHead}>Speaking</p>
            <ul className={styles.talks}>
              {TALKS.map((talk, i) => (
                <Reveal key={talk.name} delay={i * 0.05}>
                  <li className={styles.talk}>
                    <span className={styles.talkYear}>{talk.year}</span>
                    <span className={styles.talkName}>{talk.name}</span>
                    <span className={styles.talkVenue}>{talk.venue}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </section>

          {/* ---------------------------------------------------- contact */}
          <section className="band" id="contact">
            <h2 className="band__label">
              <span>Contact</span>
              <span>direct</span>
            </h2>
            <Reveal>
              <p className={styles.contactLede}>
                Open to conversations about platform, product, and AI leadership roles.
              </p>
              <div className={styles.links}>
                <a className={styles.link} href="https://linkedin.com/in/cheri-hewlett">
                  LinkedIn ↗
                </a>
                <a className={styles.link} href="https://github.com/cherihewlett-crypto/cheri-hewlett-cv-showcase">
                  This site&apos;s source ↗
                </a>
                <a className={styles.link} href="/resume/cheri-hewlett-cv.md">
                  Résumé, plain text ↗
                </a>
              </div>
            </Reveal>

            <footer className={styles.footer}>
              <p>
                Engineering record last recomputed {buildDate}. {proof.method}
              </p>
            </footer>
          </section>
        </main>
      </div>
    </div>
  );
}
