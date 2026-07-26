import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const readme = readFileSync(new URL('../README.md', import.meta.url), 'utf8');
const projectBrief = readFileSync(
  new URL('../case-studies/selected-builds.md', import.meta.url),
  'utf8',
);
const profileReadmeGenerator = readFileSync(
  new URL('../scripts/build-profile-readme.mjs', import.meta.url),
  'utf8',
);

const builds = [
  ['build-product-enablement', '1. Intelligent Product Enablement'],
  ['build-acquisition-integration', '2. Acquisition Integration Engine'],
  ['build-autonomous-implementor', '3. Autonomous Implementor'],
  ['build-roadmap-prioritization', '4. Roadmap Prioritization Engine'],
  ['build-compliance-knowledge-base', '5. Compliance Knowledge Base'],
  ['build-multidimensional-orchestrator', '6. Multi-Dimensional Orchestrator'],
];

const arsenalFiles = [
  'lib/proof-integrity.js',
  'scripts/proof-file.mjs',
  'scripts/collect-proof.mjs',
  'scripts/validate-proof.mjs',
  'scripts/build-design.py',
  'components/ProfileContent.tsx',
  'lib/section-navigation.ts',
  'test/proof-integrity.test.mjs',
];

test('repository README retains the production About positioning', () => {
  assert.match(
    readme,
    /I built my career by questioning accepted answers, looking beyond the boundaries of my role/,
  );
  assert.match(
    readme,
    /Technology is moving faster than traditional organizations can respond/,
  );
  assert.match(readme, /People builder · Operator · CPA · Veteran/);
});

test('repository README routes readers to all six builds and their deeper briefs', () => {
  for (const [id, heading] of builds) {
    assert.match(readme, new RegExp(`https://cherihewlett\\.dev/#${id}`));
    assert.match(projectBrief, new RegExp(`## ${heading.replaceAll('.', '\\.')}`));
  }

  assert.equal(
    [...projectBrief.matchAll(/\*\*Governance boundary\.\*\*/g)].length,
    builds.length,
  );
});

test('public arsenal links point to files that exist', () => {
  for (const file of arsenalFiles) {
    assert.match(readme, new RegExp(file.replaceAll('.', '\\.')));
    assert.equal(existsSync(new URL(`../${file}`, import.meta.url)), true, file);
  }
});

test('README surfaces describe a checked snapshot, never a live build-time refresh', () => {
  for (const surface of [readme, profileReadmeGenerator]) {
    assert.doesNotMatch(surface, /Every number is recomputed .* on each build/i);
    assert.doesNotMatch(surface, /live evidence feed/i);
    assert.match(surface, /versioned (?:evidence |engineering )?snapshot/i);
  }
});
