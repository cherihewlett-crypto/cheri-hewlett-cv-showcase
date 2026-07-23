'use client';

import { motion, useInView, useReducedMotion } from 'motion/react';
import { useRef } from 'react';
import styles from './Pipeline.module.css';

/**
 * How a request actually moves through the agent runtime.
 *
 * The ordering is the argument. Most agent stacks classify first and check
 * safety afterwards, which means an unsafe request has already been reasoned
 * about before anything refuses it. Here the guardrail sits ahead of the
 * classifier and fails closed: if policy cannot be loaded, nothing runs.
 */

const STAGES = [
  { id: 'request', label: 'Request', note: 'any surface' },
  { id: 'guardrail', label: 'Guardrail', note: 'fails closed' },
  { id: 'classifier', label: 'Classifier', note: 'intent + domain' },
  { id: 'router', label: 'Registry router', note: 'no hardcoded map' },
  { id: 'authority', label: 'Tool authority', note: 'effective policy' },
  { id: 'memory', label: 'Memory write', note: 'tagged, filterable' },
];

const W = 1160;
const H = 216;
const TRACK_Y = 104;
const FIRST_X = 96;
const GAP = (W - FIRST_X * 2) / (STAGES.length - 1);

export default function Pipeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-18% 0px' });
  const reduce = useReducedMotion();
  const play = inView && !reduce;

  const guardrailX = FIRST_X + GAP;

  return (
    <div className={styles.wrap} ref={ref}>
      <svg
        className={styles.svg}
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="Request pipeline: a request passes through a fail-closed guardrail before classification, then a registry-driven router, a tool authority check, and finally a tagged memory write. Requests the guardrail rejects are blocked and logged rather than classified."
      >
        <defs>
          {/*
            User-space coordinates are required here: the track is a
            zero-height line, so an objectBoundingBox gradient has no box to
            resolve against and the stroke renders as nothing.
          */}
          <linearGradient
            id="track"
            gradientUnits="userSpaceOnUse"
            x1={FIRST_X}
            y1={TRACK_Y}
            x2={W - FIRST_X}
            y2={TRACK_Y}
          >
            <stop offset="0%" stopColor="#17b3c7" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#17b3c7" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#45e0b8" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* The main track. */}
        <line
          x1={FIRST_X}
          y1={TRACK_Y}
          x2={W - FIRST_X}
          y2={TRACK_Y}
          stroke="url(#track)"
          strokeWidth="1.5"
        />

        {/* The refusal branch: severed, going nowhere, which is the point. */}
        <path
          d={`M ${guardrailX} ${TRACK_Y} V ${TRACK_Y + 56} H ${guardrailX + 104}`}
          fill="none"
          stroke="#1d5064"
          strokeWidth="1.5"
          strokeDasharray="3 5"
        />
        <text
          className={styles.blocked}
          x={guardrailX + 114}
          y={TRACK_Y + 60}
          dominantBaseline="middle"
        >
          blocked · logged · no model call
        </text>

        {/* Requests keep arriving, so the pulse keeps walking. Two of them,
            offset, so the track never reads as idle. */}
        {play &&
          [0, 1].map((i) => (
            <motion.g key={i}>
              <motion.circle
                r="9"
                cy={TRACK_Y}
                fill="#45e0b8"
                initial={{ cx: FIRST_X, opacity: 0 }}
                animate={{ cx: W - FIRST_X, opacity: [0, 0.18, 0.18, 0.18, 0] }}
                transition={{
                  duration: 4.2,
                  delay: 0.45 + i * 2.1,
                  repeat: Infinity,
                  repeatDelay: 2.1,
                  ease: 'linear',
                }}
              />
              <motion.circle
                r="4"
                cy={TRACK_Y}
                fill="#45e0b8"
                initial={{ cx: FIRST_X, opacity: 0 }}
                animate={{ cx: W - FIRST_X, opacity: [0, 1, 1, 1, 0] }}
                transition={{
                  duration: 4.2,
                  delay: 0.45 + i * 2.1,
                  repeat: Infinity,
                  repeatDelay: 2.1,
                  ease: 'linear',
                }}
              />
            </motion.g>
          ))}

        {STAGES.map((stage, i) => {
          const x = FIRST_X + i * GAP;
          const isGuard = stage.id === 'guardrail';
          return (
            <motion.g
              key={stage.id}
              initial={reduce ? false : { opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 + i * 0.11, duration: 0.5 }}
            >
              <circle
                cx={x}
                cy={TRACK_Y}
                r="7"
                fill="#04141e"
                stroke={isGuard ? '#45e0b8' : '#17b3c7'}
                strokeWidth="1.5"
              />
              <text className={styles.label} x={x} y={TRACK_Y - 34} textAnchor="middle">
                {stage.label}
              </text>
              <text className={styles.note} x={x} y={TRACK_Y - 17} textAnchor="middle">
                {stage.note}
              </text>
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
