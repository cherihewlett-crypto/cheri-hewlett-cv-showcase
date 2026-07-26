'use client';

import { useEffect, type MouseEvent } from 'react';
import { scrollToSection } from '@/lib/section-navigation';

export default function ProfileContent({ html }: { html: string }) {
  useEffect(() => {
    const builds = Array.from(document.querySelectorAll<HTMLElement>('#builds [data-build]'));
    const track = document.querySelector<HTMLElement>('[data-build-nav-track]');
    const links = Array.from(
      document.querySelectorAll<HTMLAnchorElement>('[data-build-link][href^="#"]'),
    );
    if (!builds.length || !track || !links.length) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let activeId = '';
    let frame = 0;

    const setActive = (id: string) => {
      if (id === activeId) return;
      activeId = id;

      links.forEach((link) => {
        const isActive = link.getAttribute('href') === `#${id}`;
        if (isActive) {
          link.setAttribute('aria-current', 'location');
          const left = link.offsetLeft - (track.clientWidth - link.clientWidth) / 2;
          track.scrollTo({
            left: Math.max(0, left),
            behavior: prefersReducedMotion.matches ? 'auto' : 'smooth',
          });
        } else {
          link.removeAttribute('aria-current');
        }
      });

      builds.forEach((build) => {
        build.toggleAttribute('data-build-active', build.id === id);
      });
    };

    const update = () => {
      frame = 0;
      const readingLine = Math.min(240, window.innerHeight * 0.28);
      let current = builds[0];
      for (const build of builds) {
        if (build.getBoundingClientRect().top <= readingLine) current = build;
      }
      setActive(current.id);
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate, { passive: true });
    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [html]);

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
