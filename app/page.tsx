import { proof } from '@/lib/proof';
import ProfileContent from '@/components/ProfileContent';
import SectionNav, { type NavSection } from '@/components/SectionNav';
import { PROFILE_HTML } from './_generated/profile-body';
import './_generated/profile.css';

/** Sections in document order — drives the persistent scroll-spy nav. */
const SECTIONS: NavSection[] = [
  { id: 'intro', label: 'Intro' },
  { id: 'pov', label: 'Point of view' },
  { id: 'experience', label: 'Experience' },
  { id: 'builds', label: 'Selected builds' },
  { id: 'evidence', label: 'Evidence' },
  { id: 'speaking', label: 'Speaking' },
  { id: 'contact', label: 'Contact' },
];

/**
 * Homepage — the "Universal Profile" design imported from Claude Design
 * (design-src/Universal Profile.dc.html), transformed into a static fragment
 * by scripts/build-design.py and rendered here verbatim so production is
 * identical to the built mockup.
 *
 * The only data wiring is the Evidence table: three figures from the
 * checked-in engineering snapshot are injected from proof.json. The build
 * validates that snapshot before rendering, preserving the last known-good
 * non-zero values when a future measurement cannot be completed safely.
 */
const n = (v: number) => v.toLocaleString('en-US');

function profileHtml(): string {
  return PROFILE_HTML.replaceAll('__DC_AUTHORED_COMMITS__', n(proof.totals.authoredCommits))
    .replaceAll('__DC_MERGED_PRS__', n(proof.totals.mergedPullRequests))
    .replaceAll('__DC_EDGE_FUNCTIONS__', n(proof.totals.edgeFunctions));
}

export default function Page() {
  return (
    <>
      <ProfileContent html={profileHtml()} />
      <SectionNav sections={SECTIONS} />
    </>
  );
}
