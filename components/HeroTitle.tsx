import styles from './HeroTitle.module.css';

/**
 * The author's Core Thesis, verbatim from her canonical brand record, broken
 * for the display face. Everything else on the page is downstream of it.
 *
 * Deliberately a server component with a pure CSS reveal, and no JavaScript in
 * the path. An earlier version used a JS-driven transform that started the
 * lines translated fully out of their clipping box — which meant that until
 * hydration ran, the most important sentence on the page rendered as blank
 * space. A headline must never depend on a script having executed.
 *
 * `animation-fill-mode: both` guarantees the end state even if the animation
 * is interrupted, and the reduced-motion query drops the movement while
 * leaving the text exactly where it belongs.
 */

const LINES = [
  { text: 'AI takes the', accent: false },
  { text: 'what and the how.', accent: false },
  { text: 'Leadership is', accent: true },
  { text: 'the why and the who.', accent: true },
];

export default function HeroTitle() {
  return (
    <h1 className={`display display--hero ${styles.title}`}>
      {LINES.map((line, i) => (
        <span key={line.text} className={styles.lineMask}>
          <span
            className={`${styles.line} ${line.accent ? styles.accent : ''}`}
            style={{ animationDelay: `${0.1 + i * 0.11}s` }}
          >
            {line.text}
          </span>
        </span>
      ))}
    </h1>
  );
}
