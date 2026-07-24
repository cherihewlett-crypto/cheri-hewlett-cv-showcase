'use client';

import { motion, useInView, useReducedMotion } from 'motion/react';
import { useRef } from 'react';
import styles from './Backdrop.module.css';

/**
 * Ambient telemetry behind the hero.
 *
 * A sparse grid with a scan sweeping across it and a few nodes breathing out
 * of phase — the visual language of something running, rather than decoration
 * applied to something static. Deliberately low contrast: it must never
 * compete with the headline sitting on top of it.
 */

const COLS = 26;
const ROWS = 9;
const CELL = 46;

// Nodes that pulse. Chosen by hand so the rhythm is irregular rather than a
// visible mathematical pattern, and kept away from the left where type sits.
const LIVE = [
  [14, 2],
  [19, 1],
  [22, 4],
  [17, 6],
  [24, 7],
  [11, 5],
  [21, 2],
];

export default function Backdrop() {
  const ref = useRef<HTMLDivElement>(null);
  // Ambient means ambient while you can see it — not a loop that keeps running
  // for the whole session once the hero has scrolled away.
  const visible = useInView(ref, { margin: '0px' });
  const reduce = useReducedMotion();
  const animate = visible && !reduce;
  const w = COLS * CELL;
  const h = ROWS * CELL;

  return (
    <div className={styles.wrap} aria-hidden="true" ref={ref}>
      <svg className={styles.svg} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="scan" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={CELL * 5} y2="0">
            <stop offset="0%" stopColor="#17b3c7" stopOpacity="0" />
            <stop offset="50%" stopColor="#17b3c7" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#17b3c7" stopOpacity="0" />
          </linearGradient>
          <mask id="fade">
            <rect width={w} height={h} fill="url(#fadeGrad)" />
          </mask>
          <linearGradient id="fadeGrad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={w} y2={h}>
            <stop offset="0%" stopColor="#000" />
            <stop offset="45%" stopColor="#555" />
            <stop offset="100%" stopColor="#fff" />
          </linearGradient>
        </defs>

        <g mask="url(#fade)">
          {Array.from({ length: ROWS + 1 }, (_, r) => (
            <line key={`r${r}`} x1="0" y1={r * CELL} x2={w} y2={r * CELL} stroke="#12384a" strokeWidth="1" />
          ))}
          {Array.from({ length: COLS + 1 }, (_, c) => (
            <line key={`c${c}`} x1={c * CELL} y1="0" x2={c * CELL} y2={h} stroke="#12384a" strokeWidth="1" />
          ))}

          {LIVE.map(([c, r], i) => (
            <motion.circle
              key={`${c}-${r}`}
              cx={c * CELL}
              cy={r * CELL}
              r="3"
              fill="#17b3c7"
              initial={{ opacity: 0.15 }}
              animate={animate ? { opacity: [0.12, 0.85, 0.12] } : { opacity: 0.3 }}
              transition={{ duration: 3.4 + i * 0.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.45 }}
            />
          ))}

          {animate && (
            <motion.rect
              y="0"
              width={CELL * 5}
              height={h}
              fill="url(#scan)"
              initial={{ x: -CELL * 5 }}
              animate={{ x: w }}
              transition={{ duration: 9, repeat: Infinity, ease: 'linear', repeatDelay: 3 }}
            />
          )}
        </g>
      </svg>
    </div>
  );
}
