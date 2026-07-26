import { proof } from '@/lib/proof';
import { PROFILE_HTML } from './_generated/profile-body';
import './_generated/profile.css';

/**
 * Homepage — the "Universal Profile" design imported from Claude Design
 * (design-src/Universal Profile.dc.html), transformed into a static fragment
 * by scripts/build-design.py and rendered here verbatim so production is
 * identical to the built mockup.
 *
 * The only dynamic wiring is the Evidence table: three figures the site
 * recomputes from the engineering record on every build are injected from
 * proof.json here, so the page never drifts from the repositories.
 */
const n = (v: number) => v.toLocaleString('en-US');

function profileHtml(): string {
  return PROFILE_HTML.replaceAll('__DC_AUTHORED_COMMITS__', n(proof.totals.authoredCommits))
    .replaceAll('__DC_MERGED_PRS__', n(proof.totals.mergedPullRequests))
    .replaceAll('__DC_EDGE_FUNCTIONS__', n(proof.totals.edgeFunctions));
}

export default function Page() {
  return <div dangerouslySetInnerHTML={{ __html: profileHtml() }} />;
}
