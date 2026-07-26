#!/usr/bin/env node

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { assertValidProof, DISPLAYED_PROOF_TOTALS } from '../lib/proof-integrity.js';

const DEFAULT_PROOF_PATH = fileURLToPath(new URL('../public/proof.json', import.meta.url));
const proofPath = process.argv[2] ? resolve(process.argv[2]) : DEFAULT_PROOF_PATH;

let proof;
try {
  proof = JSON.parse(readFileSync(proofPath, 'utf8'));
} catch (error) {
  console.error(`Proof integrity check failed: could not read valid JSON from ${proofPath}`);
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}

try {
  assertValidProof(proof);
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}

console.log(
  `Proof integrity check passed: ${DISPLAYED_PROOF_TOTALS.map((field) => `${field}=${proof.totals[field]}`).join(', ')}`,
);
