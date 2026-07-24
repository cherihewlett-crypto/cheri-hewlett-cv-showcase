'use client';

import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';

/**
 * Scroll-triggered reveal. Motion is skipped entirely when the reader has
 * asked for less of it.
 *
 * `as` exists because the default <div> silently breaks list semantics when
 * this wraps an <li> — a <div> between <ol> and <li> makes the list
 * unreadable to assistive technology. Inside a list, pass as="li".
 */
export default function Reveal({
  children,
  delay = 0,
  className,
  as = 'div',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'li';
}) {
  const reduce = useReducedMotion();
  const Tag = as === 'li' ? motion.li : motion.div;

  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
