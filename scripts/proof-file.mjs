import { randomUUID } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, renameSync, unlinkSync, writeFileSync } from 'node:fs';
import { basename, dirname, join } from 'node:path';
import { assertValidProof } from '../lib/proof-integrity.js';

function readExistingProof(filePath) {
  if (!existsSync(filePath)) return null;

  try {
    return JSON.parse(readFileSync(filePath, 'utf8'));
  } catch {
    return null;
  }
}

/**
 * Preserve the existing proof artifact unless the replacement is complete,
 * coherent, non-zero, and non-regressing. Rename is atomic on the same volume.
 */
export function writeProofFile(filePath, proof) {
  const previousProof = readExistingProof(filePath);
  assertValidProof(proof, { previousProof });

  const directory = dirname(filePath);
  mkdirSync(directory, { recursive: true });
  const temporaryPath = join(directory, `.${basename(filePath)}.${randomUUID()}.tmp`);

  try {
    writeFileSync(temporaryPath, `${JSON.stringify(proof, null, 2)}\n`, { flag: 'wx' });
    renameSync(temporaryPath, filePath);
  } finally {
    if (existsSync(temporaryPath)) unlinkSync(temporaryPath);
  }
}
