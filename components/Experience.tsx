'use client';

import { motion, useReducedMotion } from 'motion/react';
import styles from './Experience.module.css';

/**
 * Experience across three axes — industries, use cases, technology.
 *
 * A scannable, keyword-rich reference: a recruiter or a hiring manager sees
 * their vertical and their stack instantly, and an ATS or agent parses the
 * terms cleanly. Grounded in real work — technologies verified against the
 * repositories and the résumé, not padded.
 */

const GROUPS: { axis: string; tags: string[] }[] = [
  {
    axis: 'Industries',
    tags: [
      'Private Equity',
      'Financial Services',
      'Office of the CFO',
      'Enterprise SaaS',
      'Fund Administration',
      'Accounting & Audit',
      'RegTech',
      'Real Estate',
    ],
  },
  {
    axis: 'Use cases',
    tags: [
      'Agentic AI & multi-agent orchestration',
      'Autonomous operations',
      'Business-case & due diligence',
      'Acquisition integration',
      'Portfolio unification',
      'Financial reporting & close',
      'Compliance & regulatory checks',
      'System migration & go-lives',
      'Knowledge & doctrine retrieval',
      'AI governance & safety',
      'Zero-to-one delivery & scaling',
    ],
  },
  {
    axis: 'Technology',
    tags: [
      'Claude / Anthropic API',
      'Gemini · Vertex AI · Google ADK',
      'RAG & vector memory',
      'Mem0',
      'MCP tool orchestration',
      'Supabase · PostgreSQL',
      'Next.js · React · TypeScript',
      'Node.js · Deno',
      'Vercel',
      'GitHub Actions / CI',
      'LLM evaluation & governance',
    ],
  },
];

export default function Experience() {
  const reduce = useReducedMotion();
  return (
    <div className={styles.wrap}>
      {GROUPS.map((g, gi) => (
        <div className={styles.group} key={g.axis}>
          <h3 className={styles.axis}>{g.axis}</h3>
          <ul className={styles.tags}>
            {g.tags.map((tag, i) => (
              <motion.li
                key={tag}
                className={`${styles.tag} ${styles['axis' + gi]}`}
                initial={reduce ? false : { opacity: 0, y: 14, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-8% 0px' }}
                transition={{ duration: 0.4, delay: Math.min(i, 10) * 0.05, ease: [0.22, 1, 0.36, 1] }}
              >
                {tag}
              </motion.li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
