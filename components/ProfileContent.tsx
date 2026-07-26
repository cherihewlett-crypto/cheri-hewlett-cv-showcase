'use client';

import type { MouseEvent } from 'react';
import { scrollToSection } from '@/lib/section-navigation';

export default function ProfileContent({ html }: { html: string }) {
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      !(event.target instanceof Element)
    ) {
      return;
    }

    const anchor = event.target.closest<HTMLAnchorElement>('a[href^="#"]');
    const hash = anchor?.getAttribute('href');
    if (!anchor || !hash || hash === '#' || !event.currentTarget.contains(anchor)) return;

    let id: string;
    try {
      id = decodeURIComponent(hash.slice(1));
    } catch {
      return;
    }

    if (!document.getElementById(id)) return;

    event.preventDefault();
    scrollToSection(id);
  };

  return <div onClick={handleClick} dangerouslySetInnerHTML={{ __html: html }} />;
}
