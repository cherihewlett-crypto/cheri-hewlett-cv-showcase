import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const profileHtml = readFileSync(
  new URL('../app/_generated/profile-body.html', import.meta.url),
  'utf8',
);
const profileCss = readFileSync(new URL('../app/_generated/profile.css', import.meta.url), 'utf8');

const builds = [
  ['build-product-enablement', 'Intelligent Product Enablement'],
  ['build-acquisition-integration', 'Acquisition Integration Engine'],
  ['build-autonomous-implementor', 'Autonomous Implementor'],
  ['build-roadmap-prioritization', 'Roadmap Prioritization Engine'],
  ['build-compliance-knowledge-base', 'Compliance Knowledge Base'],
  ['build-multidimensional-orchestrator', 'Multi-Dimensional Orchestrator'],
];

test('build ribbon links to every walkthrough exactly once', () => {
  assert.match(profileHtml, /<nav data-build-nav aria-label="Selected builds">/);

  for (const [id, name] of builds) {
    assert.equal((profileHtml.match(new RegExp(`href="#${id}"`, 'g')) ?? []).length, 1);
    assert.equal(
      (profileHtml.match(new RegExp(`<article id="${id}" data-build>`, 'g')) ?? []).length,
      1,
    );
    assert.match(profileHtml, new RegExp(`>${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}<`));
  }
});

test('build ribbon is sticky, scrollable on mobile, and has a visible active state', () => {
  assert.match(profileCss, /\[data-build-nav\]\s*\{[^}]*position:sticky/s);
  assert.match(profileCss, /\[data-build-nav-track\]\s*\{[^}]*overflow-x:auto/s);
  assert.match(profileCss, /\[data-build-link\]\[aria-current="location"\]/);
  assert.match(profileCss, /#builds article\s*\{[^}]*scroll-margin-top:\s*108px/s);
});

test('scheduled proof refresh is removed while the last-good artifact remains', () => {
  assert.equal(
    existsSync(new URL('../.github/workflows/refresh-proof.yml', import.meta.url)),
    false,
  );
  assert.equal(existsSync(new URL('../public/proof.json', import.meta.url)), true);
  assert.match(profileHtml, /last known-good numbers stay visible/);
});
