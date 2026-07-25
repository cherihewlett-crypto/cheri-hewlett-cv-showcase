import Image from 'next/image';
import Arsenal from '@/components/Arsenal';
import Audit from '@/components/Audit';
import Backdrop from '@/components/Backdrop';
import Bridge from '@/components/Bridge';
import TopBar from '@/components/TopBar';
import Convergence from '@/components/Convergence';
import Guardrail from '@/components/Guardrail';
import HeroTitle from '@/components/HeroTitle';
import MobileNav from '@/components/MobileNav';
import Operating from '@/components/Operating';
import Rail from '@/components/Rail';
import Reveal from '@/components/Reveal';
import Stages from '@/components/Stages';
import Systems from '@/components/Systems';
import Work from '@/components/Work';
import { claims, proof, relativeAge } from '@/lib/proof';
import styles from './page.module.css';

const SECTIONS = [
  { id: 'convergence', label: 'My moat' },
  { id: 'pov', label: 'How I think' },
  { id: 'systems', label: 'What I built' },
  { id: 'demo', label: 'See it work' },
  { id: 'work', label: 'Selected work' },
  { id: 'scale', label: 'At scale' },
  { id: 'record', label: 'Background' },
  { id: 'voice', label: 'Speaking & writing' },
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
    from: 'Deterministic rules engine',
    body: 'Reconciling messy source structures against a target model. The same machinery applies to any migration, integration, or master-data problem.',
  },
  {
    name: 'Deterministic engine under model orchestration',
    from: 'Deterministic rules engine',
    body: 'The model chooses mapping and sequencing; the arithmetic is deterministic code with a traceable path. This is the pattern that makes AI usable where a wrong number is reportable.',
  },
  {
    name: 'Citable, re-verifiable retrieval',
    from: 'Citable rules corpus',
    body: 'Atomic rules carrying their own citations, so an answer can be walked back to source by someone who does not trust the model. Portable to law, clinical, and policy domains.',
  },
  {
    name: 'Enterprise connector and activation layer',
    from: 'Deterministic rules engine',
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
    body: 'Served in the U.S. Air Force — mission first, people always. PwC and Deloitte. Founded my own CPA firm serving real estate investors and small businesses. Built and managed a rental portfolio over a decade. Strategic advisor to Crux (London) on product-acquisition integration, and a board member of the G.R.O.W. Foundation. Rose from customer success manager to senior executive leadership at a publicly traded fintech. Every chapter required learning something new from zero.',
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

/** Signature speaking topics, verbatim from the speaker one-sheet. */
const TOPICS = [
  {
    title: 'In a World Where Technology Is Changing Everything Else',
    hook: 'AI is taking on more of the what and the how. So what’s left for leaders? Everything that actually matters.',
  },
  {
    title: 'Innovation Is Choosing the Right Problem',
    hook: 'Most companies are solving the wrong problems faster. AI didn’t fix that — it accelerated it.',
  },
  {
    title: 'Trust Is the Real Moat in AI',
    hook: 'Everyone’s asking “can AI do this?” The better question: “can we prove it did it right?”',
  },
  {
    title: 'People First: The True Responsibility of Leadership',
    hook: 'Organizations don’t outperform because they obsess over customers. They outperform because they invest in the people serving them.',
  },
  {
    title: 'Built, Not Born: What Resilience Actually Requires',
    hook: 'Resilience isn’t a personality trait. It’s a practice — built by surviving, rebuilding, and choosing to show up again.',
  },
  {
    title: 'The Chapters You Don’t Put on Your Résumé',
    hook: 'Your most important career chapter is probably the one you’re embarrassed to talk about.',
  },
];

const TALKS = [
  { name: 'Building with Agentic AI: A Fintech Leader’s Show & Tell', venue: 'Product Advisory Collective', year: '2026' },
  { name: 'BlackLine Investor Day', venue: 'New York', year: '2024' },
  { name: 'SAP Sapphire', venue: 'Barcelona', year: '2024' },
  { name: 'LWT Summit', venue: 'Leading Women in Technology', year: '2024' },
  { name: 'BeyondTheBlack', venue: 'Main stage, five consecutive years', year: '2022 — 2026' },
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
      <MobileNav sections={SECTIONS} />
      <div className="shell">
        <Rail sections={SECTIONS} stillAt={stillAt} />

        <main className="shell__main">
          {/* ------------------------------------------------------- hero */}
          <header className={`band band--flush ${styles.hero}`}>
            <p className={styles.eyebrow}>
              Cheri Hewlett · Technology & innovation executive · Builder · CPA · Veteran
            </p>

            <Backdrop />
            <HeroTitle />

            <div className={styles.heroBody}>
              <p className="lede">
                I draw the bridge from problem to solution through technology — starting with the problems worth
                solving: the ones that return quantifiable value, and deliver real impact. Then the right solution for
                each. Not the newest thing — the thing that pays.
              </p>
              <p className={styles.heroSub}>
                I don’t build theory — I build from market friction, and I build it myself. The figures below are not
                typed in. They are recomputed from the engineering record every time this page builds, and labelled by
                how much you should trust them.
              </p>
            </div>

            {/*
              A compressed proof strip inside the first viewport. The full
              audit below is the argument; this is the part a reader who gives
              the page thirty seconds actually reaches, so the evidence has to
              be visible before any scrolling happens.
            */}
            <ul className={styles.glance}>
              {[
                {
                  v: proof.totals.authoredCommits.toLocaleString('en-US'),
                  l: 'changes written personally',
                  g: 'the output of a small engineering team',
                },
                {
                  v: proof.totals.mergedPullRequests.toLocaleString('en-US'),
                  l: 'pieces of work shipped',
                  g: 'each one reviewed before it went live',
                },
                { v: '302', l: 'reusable building blocks', g: 'so the next project starts ahead' },
                { v: String(proof.totals.systems), l: 'systems running in production', g: 'not prototypes' },
              ].map((s) => (
                <li className={styles.glanceItem} key={s.l}>
                  <span className={styles.glanceNum}>{s.v}</span>
                  <span className={styles.glanceLabel}>{s.l}</span>
                  <span className={styles.glanceGloss}>{s.g}</span>
                </li>
              ))}
            </ul>

            <p className={styles.verdictLead}>
              Any one of these is common. Two together makes a strong hire. All four in one person is the profile these
              roles are written for — and rarely find.
            </p>

            <Audit claims={claims} stillAt={stillAt} />
          </header>















          {/* ------------------------------------------------ convergence */}
          <section className="band" id="convergence">
            <h2 className="band__label">
              <span>The four</span>
              <span>innovation · engineering · domain depth · leadership</span>
            </h2>
            <Reveal>
              <p className="prose" style={{ maxWidth: '60ch', marginBlockEnd: '3rem' }}>
                Turning a problem into a solution that returns value takes four things at once: the domain to see the
                real problem, the judgment to choose the one worth solving, the engineering to build the answer, and the
                leadership to carry it to impact. Most candidates bring two. Here is each, with what backs it.
              </p>
            </Reveal>
            <Bridge />
            <Convergence />
            <Stages />
          </section>
          {/* -------------------------------------------------------- pov */}
          <section className="band" id="pov">
            <h2 className="band__label">
              <span>How I think</span>
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
          </section>
          {/* ------------------------------------------------------- demo */}
          <section className="band" id="demo">
            <h2 className="band__label">
              <span>See it work</span>
              <span>not a description — a live artifact</span>
            </h2>
            <Reveal>
              <p className="prose" style={{ maxWidth: '58ch', marginBlockEnd: '0.5rem' }}>
                Most of the work proves itself in numbers. This part proves itself by running. Type a request — or pick
                one — and watch the guardrail decide. It refuses first and classifies second, which is the whole design
                decision.
              </p>
            </Reveal>
            <Guardrail />
          </section>
          {/* --------------------------------------------------------- work */}
          <section className="band" id="work">
            <h2 className="band__label">
              <span>Selected work</span>
              <span>the functions I build — reusable, system-agnostic</span>
            </h2>
            <Work />
          </section>
          {/* -------------------------------------------------------- scale */}
          <section className="band" id="scale">
            <h2 className="band__label">
              <span>At scale</span>
              <span>302 reusable capabilities · a 35-agent operating team</span>
            </h2>
            <Reveal>
              <p className="prose" style={{ maxWidth: '60ch', marginBlockEnd: '3rem' }}>
                The systems above are not one-off builds. They stand on a catalogued library of reusable capabilities,
                and they are run by a registry of agents with tiers, duties, and escalation paths — every figure read
                from the live registry, never typed in.
              </p>
            </Reveal>
            <Arsenal />
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
            <div style={{ marginBlockStart: 'clamp(3.5rem, 7vw, 5.5rem)' }}>
              <Operating />
            </div>
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

            <Reveal delay={0.15}>
              <p className={styles.credentials}>
                CPA (VA) · M.S. Accounting, Liberty University · B.S. Accounting &amp; Computer Science, University of
                Maryland · U.S. Air Force Veteran · Strategic Advisor, Crux (London) · Board Member, G.R.O.W. Foundation
                · Los Angeles, CA
              </p>
            </Reveal>
          </section>
          {/* ------------------------------------------------------ voice */}
          <section className="band" id="voice">
            <h2 className="band__label">
              <span>Speaking &amp; writing</span>
              <span>on stage, in print, on the record</span>
            </h2>

            <p className={styles.talksHead}>Signature talks</p>
            <div className={styles.topics}>
              {TOPICS.map((t, i) => (
                <Reveal key={t.title} delay={(i % 3) * 0.06}>
                  <article className={styles.topic}>
                    <span className={styles.topicNo} aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className={styles.topicTitle}>{t.title}</h3>
                    <p className={styles.topicHook}>{t.hook}</p>
                  </article>
                </Reveal>
              ))}
            </div>

            <p className={styles.talksHead}>Recent stages</p>
            <ul className={styles.talks}>
              {TALKS.map((talk, i) => (
                <Reveal key={talk.name} delay={i * 0.05} as="li" className={styles.talk}>
                  <span className={styles.talkYear}>{talk.year}</span>
                  <span className={styles.talkName}>{talk.name}</span>
                  <span className={styles.talkVenue}>{talk.venue}</span>
                </Reveal>
              ))}
            </ul>

            <p className={styles.talksHead}>Writing</p>
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
                {/* Public professional handle from the speaker card. Email is
                    deliberately not published — LinkedIn is the contact route. */}
                <a className={styles.link} href="https://x.com/cheripromo">
                  X · @cheripromo ↗
                </a>
                <a className={styles.link} href="https://github.com/cherihewlett-crypto/cheri-hewlett-cv-showcase/blob/main/resume/cheri-hewlett-cv.md">
                  Résumé, plain text ↗
                </a>
                <a className={styles.link} href="https://github.com/cherihewlett-crypto/cheri-hewlett-cv-showcase">
                  This site&apos;s source ↗
                </a>
              </div>
            </Reveal>

          </section>
            <footer className={styles.footer}>
              <p>
                Engineering record last recomputed {buildDate}. {proof.method}
              </p>
            </footer>
        </main>
      </div>
    </div>
  );
}
