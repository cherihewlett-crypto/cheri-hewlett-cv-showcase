export function scrollToSection(id: string): boolean {
  const section = document.getElementById(id);
  if (!section) return false;

  const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ? 'auto'
    : 'smooth';

  section.scrollIntoView({ behavior, block: 'start' });
  window.history.replaceState(null, '', `#${encodeURIComponent(id)}`);
  return true;
}
