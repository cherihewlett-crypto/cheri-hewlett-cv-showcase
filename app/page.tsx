import Image from 'next/image';
import Arsenal from '@/components/Arsenal';
import Audit from '@/components/Audit';
import Backdrop from '@/components/Backdrop';
import TopBar from '@/components/TopBar';
import Convergence from '@/components/Convergence';
import Enablement from '@/components/Enablement';
import HeroTitle from '@/components/HeroTitle';
import Lifecycle from '@/components/Lifecycle';
import Pipeline from '@/components/Pipeline';
import Rail from '@/components/Rail';
import Reveal from '@/components/Reveal';
import Systems from '@/components/Systems';
import Teams from '@/components/Teams';
import { claims, proof, relativeAge } from '@/lib/proof';
import styles from './page.module.css';

const SECTIONS = [
  { id: 'convergence', label: 'Why me' },
  { id: 'pov', label: 'Point of view' },
  { id: 'systems', label: 'What I built' },
  { id: 'arsenal', label: 'Capabilities' },
  { id: 'pipeline', label: 'How it works' },
  { id: 'teams', label: 'The teams' },
  { id: 'enablement', label: 'Enablement' },
  { id: 'practice', label: 'Engineering' },
  { id: 'lifecycle', label: 'Prototype→scale' },
  { id: 'record', label: 'Background' },
  { id: 'voice', label: 'Writing & talks' },
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

/**
 * The point of view, in four moves. This is the argument the rest of the page
 * is evidence for — the systems are the proof, not the thesis.
 */
const POV = [
  {
    move: 'Innovation is choosing the right problem',
    body: 'Most companies are solving the wrong problems faster. AI didn’t fix that — it accelerated it. The first question is never “can we build this,” it is “is this the problem that deserves the next six months, and is it the one to solve first?”',
  },
  {
    move: 'ROI is the problem solved, not the time saved',
    body: 'Time doesn’t disappear; it gets reallocated. The real question is what caliber of quality the team operates at after the investment. This is not about working less — it is about operating differently, and smarter.',
  },
  {
    move: 'Trust is the real moat',
    body: 'Everyone is asking “can AI do this?” The better question is “can we prove it did it right?” In the office of the CFO that is not a nice-to-have — it is the difference between a system people adopt and one they quietly work around.',
  },
  {
    move: 'How you treat people is the strategy',
    body: 'Organizations don’t outperform because they obsess over customers. They outperform because they invest in the people serving them. As AI absorbs more of the execution, that becomes more of the job, not less.',
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
    org: 'The differentiator',
    title: 'Every seat in the product lifecycle',
    body: 'Customer success, solutions consulting, product and business transformation, platform strategy. I don’t just understand the product — I understand what it feels like to implement it, sell it, support it, and bet a company’s transformation on it. Most innovation leaders talk theory. I’ve lived inside these systems, rebuilt them, and lead from that.',
  },
  {
    org: 'The spine',
    title: 'Air Force. Big Four. Founder. Investor. Operator.',
    body: 'Served in the U.S. Air Force — mission first, people always. PwC and Deloitte. Founded my own CPA firm from scratch. Built a real estate portfolio over a decade of buying, renovating, and managing. Rose from customer success manager to senior executive leadership at a publicly traded fintech transforming the office of the CFO. Every chapter required learning something new from zero.',
  },
  {
    org: 'How I build',
    title: 'Problem-led, from market friction',
    body: 'I quantify friction and build solutions to problems others haven’t identified yet — demand-driven, not theory-driven. Strategy anchors direction, execution is in my DNA, and agility runs through both. The model plans; deterministic code decides; nothing closes on the builder’s own say-so.',
  },
];

/**
 * Written and recorded work. Every item links out — an unlinked title is a
 * claim, and this page does not make claims it cannot hand you the source for.
 */
const WRITING = [
  {
    name: 'People First: The True Responsibility of Leadership',
    note: 'Organizations don’t outperform because they obsess over customers. They outperform because they invest in the people serving them.',
    href: 'https://www.linkedin.com/pulse/people-first-true-responsibility-leadership-cheri-hewlett-cpa-7clce',
  },
  {
    name: 'The Death of Consolidation Systems',
    note: 'Why the platform you rely on for consolidation may be quietly costing you millions — and what the architecture should look like instead.',
    href: 'https://www.linkedin.com/pulse/death-consolidation-systems-why-yours-might-costing-you-hewlett-cpa-ixgce',
  },
  {
    name: 'What’s Next After Generative AI',
    note: 'The shift from generating text to systems that route work, retain context, and operate inside explicit boundaries.',
    href: 'https://www.linkedin.com/pulse/whats-next-after-generative-ai-cheri-hewlett-cpa-jdplf',
  },
  {
    name: 'How Long Can Manual Processes Keep Your Business Afloat?',
    note: 'On the compounding cost of the work everyone agrees should be automated and nobody has scheduled.',
    href: 'https://www.linkedin.com/pulse/how-long-can-manual-processes-keep-your-business-cheri-hewlett-cpa-bhmle',
  },
];

/** Recorded and third-party — authority someone else conferred. */
const FEATURED = [
  {
    name: 'Why AI in Accounting Plays by Different Rules',
    venue: 'Sounds Accurate — podcast guest',
    note: 'Prediction versus precision, and why the difference decides where AI belongs in the close.',
    href: 'https://youtu.be/H9XAoWT6Rd8',
  },
  {
    name: 'AI: Redefining the Future of Finance & Accounting',
    venue: 'BlackLine — quoted expert',
    note: '',
    href: 'https://www.blackline.com/blog/ai-is-redefining-the-future-of-f-and-a/',
  },
  {
    name: 'Investor Day 2024 presentation',
    venue: 'Named presenter · reported by MarketScreener',
    note: '',
    href: 'https://www.marketscreener.com/quote/stock/BLACKLINE-INC-31740369/news/BlackLine-Investor-Day-Presentation-48410395/',
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
      <TopBar />
      <div className="shell">
        <Rail sections={SECTIONS} stillAt={stillAt} />

        <main className="shell__main">
          {/* ------------------------------------------------------- hero */}
          <header className={`band band--flush ${styles.hero}`}>
            <p className={styles.eyebrow}>
              Cheri Hewlett, CPA · Technology executive · Builder · Veteran · People first, always
            </p>

            <Backdrop />
            <HeroTitle />

            <div className={styles.heroBody}>
              <p className="lede">
                The organizations that win won’t be the ones that adopted AI fastest. They’ll be the ones that chose the
                right problems, built systems their people could trust, and had leaders resilient enough to stay the
                course when it got hard.
              </p>
              <p className={styles.heroSub}>
                I don’t build theory — I build from market friction, and I build it myself. The figures below are not
                typed in. They are recomputed from the engineering record every time this page builds, and labelled by
                how much you should trust them.
              </p>
            </div>

            <Audit claims={claims} stillAt={stillAt} />
          </header>

          {/* ------------------------------------------------ convergence */}
          <section className="band" id="convergence">
            <h2 className="band__label">
              <span>The four</span>
              <span>domain · product · engineering · leadership</span>
            </h2>
            <Reveal>
              <p className="prose" style={{ maxWidth: '58ch', marginBlockEnd: '3rem' }}>
                Senior AI and product roles are written asking for four things at once. Most candidates bring two. Here
                is each one, with what backs it.
              </p>
            </Reveal>
            <Convergence />
          </section>

          {/* -------------------------------------------------------- pov */}
          <section className="band" id="pov">
            <h2 className="band__label">
              <span>Point of view</span>
              <span>judgment · resilience · builder</span>
            </h2>
            <div className={styles.pov}>
              {POV.map((item, i) => (
                <Reveal key={item.move} delay={(i % 2) * 0.07}>
                  <article className={styles.povItem}>
                    <h3 className={styles.povMove}>{item.move}</h3>
                    <p className={styles.povBody}>{item.body}</p>
                  </article>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.15}>
              <p className={styles.povQuote}>
                “The leaders who thrive in this next decade won’t simply be fluent in technology. They’ll be deeply
                human.”
              </p>
            </Reveal>
          </section>

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

          {/* ---------------------------------------------------- arsenal */}
          <section className="band" id="arsenal">
            <h2 className="band__label">
              <span>Arsenal</span>
              <span>build once, reference everywhere</span>
            </h2>
            <Arsenal />
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
                    Two decades finding the gaps that matter — and the last two years building the systems that close
                    them.
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
                    <h3 className={styles.pieceName}>
                      <a className={styles.pieceLink} href={piece.href}>
                        {piece.name} <span aria-hidden="true">↗</span>
                      </a>
                    </h3>
                    <p className={styles.pieceNote}>{piece.note}</p>
                  </article>
                </Reveal>
              ))}
            </div>

            <p className={styles.talksHead}>Recorded &amp; featured</p>
            <div className={styles.writing}>
              {FEATURED.map((piece, i) => (
                <Reveal key={piece.name} delay={(i % 2) * 0.06}>
                  <article className={styles.piece}>
                    <h3 className={styles.pieceName}>
                      <a className={styles.pieceLink} href={piece.href}>
                        {piece.name} <span aria-hidden="true">↗</span>
                      </a>
                    </h3>
                    <p className={styles.pieceVenue}>{piece.venue}</p>
                    {piece.note ? <p className={styles.pieceNote}>{piece.note}</p> : null}
                  </article>
                </Reveal>
              ))}
            </div>

            <p className={styles.talksHead}>Speaking</p>
            <ul className={styles.talks}>
              {TALKS.map((talk, i) => (
                <Reveal key={talk.name} delay={i * 0.05} as="li" className={styles.talk}>
                  <span className={styles.talkYear}>{talk.year}</span>
                  <span className={styles.talkName}>{talk.name}</span>
                  <span className={styles.talkVenue}>{talk.venue}</span>
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
