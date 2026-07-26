import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { assertValidProof, proofValidationErrors } from '../lib/proof-integrity.js';
import { writeProofFile } from '../scripts/proof-file.mjs';

const proofPath = fileURLToPath(new URL('../public/proof.json', import.meta.url));
const validProof = JSON.parse(readFileSync(proofPath, 'utf8'));

function cloneProof() {
  return structuredClone(validProof);
}

test('accepts the current complete non-zero proof artifact', () => {
  assert.doesNotThrow(() => assertValidProof(cloneProof()));
});

for (const field of ['authoredCommits', 'mergedPullRequests', 'edgeFunctions']) {
  test(`rejects zero ${field}`, () => {
    const proof = cloneProof();
    proof.totals[field] = 0;
    assert.throws(
      () => assertValidProof(proof),
      new RegExp(`totals\\.${field} must be a positive integer`),
    );
  });

  test(`rejects blank ${field}`, () => {
    const proof = cloneProof();
    proof.totals[field] = '';
    assert.throws(
      () => assertValidProof(proof),
      new RegExp(`totals\\.${field} must be a positive integer`),
    );
  });
}

test('rejects partial repository results', () => {
  const proof = cloneProof();
  proof.systems.pop();
  proof.totals.systems = proof.systems.length;

  assert.ok(proofValidationErrors(proof).some((error) => error.includes('accounting-knowledge-base')));
});

test('rejects a missing per-system pull request result', () => {
  const proof = cloneProof();
  delete proof.systems[1].counts['merged PRs'];

  assert.ok(proofValidationErrors(proof).some((error) => error.includes('innovation-hub.counts.merged PRs')));
});

test('rejects a missing edge-function source', () => {
  const proof = cloneProof();
  delete proof.systems[0].counts['edge functions'];

  assert.ok(proofValidationErrors(proof).some((error) => error.includes('team-echo.counts.edge functions')));
});

test('rejects totals that do not match their system sources', () => {
  const proof = cloneProof();
  proof.totals.authoredCommits += 1;

  assert.ok(proofValidationErrors(proof).some((error) => error.includes('system sum')));
});

test('rejects regressions in monotonic totals', () => {
  const proof = cloneProof();
  proof.totals.mergedPullRequests -= 1;
  proof.systems[0].counts['merged PRs'] -= 1;

  assert.throws(() => assertValidProof(proof, { previousProof: validProof }), /cannot regress/);
});

test('an invalid replacement leaves the last-known-good file byte-for-byte intact', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'proof-integrity-'));
  const target = join(directory, 'proof.json');
  const original = `${JSON.stringify(validProof, null, 2)}\n`;
  await writeFile(target, original);

  try {
    const invalidProof = cloneProof();
    invalidProof.totals.mergedPullRequests = 0;

    assert.throws(() => writeProofFile(target, invalidProof), /Proof integrity check failed/);
    assert.equal(await readFile(target, 'utf8'), original);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test('a valid replacement atomically updates the proof file', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'proof-integrity-'));
  const target = join(directory, 'proof.json');
  const original = `${JSON.stringify(validProof, null, 2)}\n`;
  await writeFile(target, original);

  try {
    const nextProof = cloneProof();
    nextProof.generatedAt = new Date(Date.parse(validProof.generatedAt) + 1000).toISOString();
    nextProof.totals.authoredCommits += 1;
    nextProof.systems[0].authoredCommits += 1;

    writeProofFile(target, nextProof);
    assert.deepEqual(JSON.parse(await readFile(target, 'utf8')), nextProof);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
