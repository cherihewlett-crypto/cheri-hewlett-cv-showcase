'use client';

import { motion, useInView, useReducedMotion } from 'motion/react';
import { useRef } from 'react';
import styles from './Bridge.module.css';

/**
 * The throughline, drawn.
 *
 * Charlie's big-picture message is a bridge: from a problem worth solving,
 * across technology, to quantifiable value. This renders that literally — a
 * span carried by four towers that are also the four dimensions of the profile
 * (see the problem, choose the one worth solving, build the answer, carry it to
 * impact). A token crosses the span and arrives as value, so the eye watches
 * the argument happen rather than reading it.
 *
 * Minimal text by design (Charlie's standing rule: visuals first). The towers
 * carry one word each; the detail lives in the cards below.
 */

const W = 1200;
const H = 300;
const DECK_Y = 150;
const LEFT = 70;
const RIGHT = W - 70;

const TOWERS = [
  { label: 'See', sub: 'the real problem', dim: 'Domain' },
  { label: 'Choose', sub: 'the one worth solving', dim: 'Judgment' },
  { label: 'Build', sub: 'the answer', dim: 'Engineering' },
  { label: 'Lead', sub: 'it to impact', dim: 'Leadership' },
];

// Tower x-positions, evenly spaced across the deck between the two anchors.
const span = RIGHT - LEFT;
const towerX = TOWERS.map((_, i) => LEFT + (span * (i + 1)) / (TOWERS.length + 1));

// A catenary-ish sag between two deck points, for the suspension cables.
function cable(x1: number, x2: number, sag: number) {
  const mid = (x1 + x2) / 2;
  return `M ${x1} ${DECK_Y} Q ${mid} ${DECK_Y - sag} ${x2} ${DECK_Y}`;
}

export default function Bridge() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  const reduce = useReducedMotion();
  const anchors = [LEFT, ...towerX, RIGHT];

  return (
    <div className={styles.wrap} ref={ref}>
      <svg
        className={styles.svg}
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="A bridge from a problem worth solving, across four supports — see the real problem, choose the one worth solving, build the answer, and lead it to impact — arriving as quantifiable value returned."
      >
        <defs>
          <linearGradient id="deck" gradientUnits="userSpaceOnUse" x1={LEFT} y1="0" x2={RIGHT} y2="0">
            <stop offset="0%" stopColor="#49646f" />
            <stop offset="55%" stopColor="#17b3c7" />
            <stop offset="100%" stopColor="#45e0b8" />
          </linearGradient>
        </defs>

        {/* Suspension cables between anchors — the visual richness. */}
        {anchors.slice(0, -1).map((x, i) => (
          <motion.path
            key={i}
            d={cable(x, anchors[i + 1], 34 + (i % 2) * 8)}
            fill="none"
            stroke="#17b3c7"
            strokeWidth="1"
            strokeOpacity="0.35"
            initial={reduce ? false : { pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.15 + i * 0.12, ease: 'easeInOut' }}
          />
        ))}

        {/* The deck. */}
        <motion.line
          x1={LEFT}
          y1={DECK_Y}
          x2={RIGHT}
          y2={DECK_Y}
          stroke="url(#deck)"
          strokeWidth="2"
          initial={reduce ? false : { pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1, delay: 0.1, ease: 'easeInOut' }}
        />

        {/* Left anchor — the problem. */}
        <g>
          <line x1={LEFT} y1={DECK_Y} x2={LEFT} y2={DECK_Y + 46} stroke="#49646f" strokeWidth="2" />
          <text className={styles.anchor} x={LEFT} y={DECK_Y + 68} textAnchor="middle">
            Problem
          </text>
          <text className={styles.anchorSub} x={LEFT} y={DECK_Y + 86} textAnchor="middle">
            worth solving
          </text>
        </g>

        {/* Right anchor — the value returned. */}
        <g>
          <line x1={RIGHT} y1={DECK_Y} x2={RIGHT} y2={DECK_Y + 46} stroke="#45e0b8" strokeWidth="2" />
          <text className={`${styles.anchor} ${styles.anchorEnd}`} x={RIGHT} y={DECK_Y + 68} textAnchor="middle">
            Impact
          </text>
          <text className={styles.anchorSub} x={RIGHT} y={DECK_Y + 86} textAnchor="middle">
            value returned
          </text>
        </g>

        {/* Towers = the four dimensions. */}
        {TOWERS.map((t, i) => {
          const x = towerX[i];
          return (
            <motion.g
              key={t.label}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.45 + i * 0.14, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <line x1={x} y1={DECK_Y} x2={x} y2={DECK_Y - 58} stroke="#143a4b" strokeWidth="1.5" />
              <circle cx={x} cy={DECK_Y} r="6" fill="#04141e" stroke="#17b3c7" strokeWidth="1.5" />
              <text className={styles.towerDim} x={x} y={DECK_Y - 66} textAnchor="middle">
                {t.dim}
              </text>
              <text className={styles.towerLabel} x={x} y={DECK_Y + 26} textAnchor="middle">
                {t.label}
              </text>
              <text className={styles.towerSub} x={x} y={DECK_Y + 42} textAnchor="middle">
                {t.sub}
              </text>
            </motion.g>
          );
        })}

        {/* The token crossing: dim problem → bright value. Loops so the span
            never reads as static. */}
        {inView && !reduce && (
          <>
            <motion.circle
              r="10"
              cy={DECK_Y}
              fill="#45e0b8"
              initial={{ cx: LEFT, opacity: 0 }}
              animate={{ cx: RIGHT, opacity: [0, 0.2, 0.2, 0.2, 0] }}
              transition={{ duration: 3.4, delay: 1.2, repeat: Infinity, repeatDelay: 1.4, ease: 'easeInOut' }}
            />
            <motion.circle
              r="4.5"
              cy={DECK_Y}
              initial={{ cx: LEFT, fill: '#49646f' }}
              animate={{ cx: RIGHT, fill: ['#49646f', '#17b3c7', '#45e0b8'] }}
              transition={{ duration: 3.4, delay: 1.2, repeat: Infinity, repeatDelay: 1.4, ease: 'easeInOut' }}
            />
          </>
        )}
      </svg>
    </div>
  );
}
