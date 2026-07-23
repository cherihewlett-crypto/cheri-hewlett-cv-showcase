import Image from 'next/image';
import Audit from '@/components/Audit';
import Pipeline from '@/components/Pipeline';
import Rail from '@/components/Rail';
import Reveal from '@/components/Reveal';
import Systems from '@/components/Systems';
import { claims, proof, relativeAge } from '@/lib/proof';
import styles from './page.module.css';

const SECTIONS = [
  { id: 'systems', label: 'Systems' },
  { id: 'pipeline', label: 'Runtime' },
  { id: 'practice', label: 'Practice' },
  { id: 'record', label: 'Record' },
  { id: 'voice', label: 'In public' },
  { id: 'contact', label: 'Contact' },
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

const ROLES = [
  {
    org: 'BlackLine',
    title: 'SVP & Global Managing Director, Platform & Product Strategy',
    body: 'Enterprise-wide platform and product strategy — partnering across product, engineering, and go-to-market to set platform vision, differentiation, and roadmap priorities for a public company.',
  },
  {
    org: 'BlackLine',
    title: 'VP & Head of Product, Financial Reporting Analytics',
    body: 'Built and scaled a Financial Analytics platform line from zero to roughly 220 people with full P&L ownership across product, engineering, GTM, and customer success. Found product-market fit across a global enterprise base, expanded into large enterprise inside the first year, drove 100%+ YoY organic growth for three years, and cut midmarket time-to-value from about six months to two.',
  },
  {
    org: 'heyEcho',
    title: 'Founder & Architect',
    body: 'An independent multi-agent platform built on Supabase, Vercel, Mem0, and MCP-based tool orchestration — persistent memory, governed execution, and the verification layer described above.',
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
            <p className={styles.eyebrow}>Cheri Hewlett, CPA — AI-native operating executive</p>

            <h1 className="display display--hero">
              I lead the
              <br />
              platform.
              <br />
              <span className={styles.heroAccent}>And I build it.</span>
            </h1>

            <div className={styles.heroBody}>
              <p className="lede">
                Two decades in enterprise finance software, most recently running platform and product strategy for a
                public company. Four production AI systems, written hands-on.
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

          {/* ----------------------------------------------------- record */}
          <section className="band" id="record">
            <h2 className="band__label">
              <span>Operating record</span>
              <span>P&amp;L scope</span>
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
              <span>talks &amp; writing</span>
            </h2>
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
