export const EXPECTED_SYSTEM_IDS = Object.freeze([
  'team-echo',
  'innovation-hub',
  'tiger-consolidate',
  'accounting-knowledge-base',
]);

export const DISPLAYED_PROOF_TOTALS = Object.freeze([
  'authoredCommits',
  'mergedPullRequests',
  'edgeFunctions',
]);

const MONOTONIC_TOTALS = Object.freeze(['authoredCommits', 'mergedPullRequests']);

function isRecord(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isPositiveInteger(value) {
  return Number.isSafeInteger(value) && value > 0;
}

function requirePositiveInteger(errors, value, path) {
  if (!isPositiveInteger(value)) {
    errors.push(`${path} must be a positive integer; received ${JSON.stringify(value)}`);
  }
}

function sumSystemField(systems, pick) {
  return systems.reduce((total, system) => total + pick(system), 0);
}

/**
 * Validate every source needed to render the public Evidence figures.
 * Returning all errors at once makes CI failures actionable.
 */
export function proofValidationErrors(value, options = {}) {
  const errors = [];

  if (!isRecord(value)) {
    return ['proof must be an object'];
  }

  const generatedAt = Date.parse(value.generatedAt);
  if (typeof value.generatedAt !== 'string' || !Number.isFinite(generatedAt)) {
    errors.push(`generatedAt must be an ISO date; received ${JSON.stringify(value.generatedAt)}`);
  }

  if (!isRecord(value.totals)) {
    errors.push('totals must be an object');
    return errors;
  }

  for (const field of DISPLAYED_PROOF_TOTALS) {
    requirePositiveInteger(errors, value.totals[field], `totals.${field}`);
  }

  if (!Array.isArray(value.systems)) {
    errors.push('systems must be an array');
    return errors;
  }

  requirePositiveInteger(errors, value.totals.systems, 'totals.systems');
  if (value.totals.systems !== value.systems.length) {
    errors.push(`totals.systems must equal systems.length (${value.systems.length})`);
  }

  const systemById = new Map();
  for (const [index, system] of value.systems.entries()) {
    if (!isRecord(system)) {
      errors.push(`systems[${index}] must be an object`);
      continue;
    }

    if (typeof system.id !== 'string' || system.id.length === 0) {
      errors.push(`systems[${index}].id must be a non-empty string`);
      continue;
    }

    if (systemById.has(system.id)) {
      errors.push(`systems contains duplicate id ${JSON.stringify(system.id)}`);
      continue;
    }
    systemById.set(system.id, system);

    requirePositiveInteger(errors, system.authoredCommits, `systems.${system.id}.authoredCommits`);
    requirePositiveInteger(errors, system.totalCommits, `systems.${system.id}.totalCommits`);

    if (!isRecord(system.counts)) {
      errors.push(`systems.${system.id}.counts must be an object`);
      continue;
    }
    requirePositiveInteger(errors, system.counts['merged PRs'], `systems.${system.id}.counts.merged PRs`);
  }

  for (const id of EXPECTED_SYSTEM_IDS) {
    if (!systemById.has(id)) errors.push(`systems must contain ${JSON.stringify(id)}`);
  }
  for (const id of systemById.keys()) {
    if (!EXPECTED_SYSTEM_IDS.includes(id)) errors.push(`systems contains unexpected id ${JSON.stringify(id)}`);
  }

  const teamEcho = systemById.get('team-echo');
  if (teamEcho && isRecord(teamEcho.counts)) {
    requirePositiveInteger(errors, teamEcho.counts['edge functions'], 'systems.team-echo.counts.edge functions');
  }

  const validSystems = value.systems.filter(isRecord);
  const authoredTotal = sumSystemField(validSystems, (system) =>
    isPositiveInteger(system.authoredCommits) ? system.authoredCommits : 0,
  );
  const pullRequestTotal = sumSystemField(validSystems, (system) =>
    isRecord(system.counts) && isPositiveInteger(system.counts['merged PRs']) ? system.counts['merged PRs'] : 0,
  );
  const edgeFunctionTotal = sumSystemField(validSystems, (system) =>
    isRecord(system.counts) && isPositiveInteger(system.counts['edge functions'])
      ? system.counts['edge functions']
      : 0,
  );

  if (value.totals.authoredCommits !== authoredTotal) {
    errors.push(`totals.authoredCommits must equal the system sum (${authoredTotal})`);
  }
  if (value.totals.mergedPullRequests !== pullRequestTotal) {
    errors.push(`totals.mergedPullRequests must equal the system sum (${pullRequestTotal})`);
  }
  if (value.totals.edgeFunctions !== edgeFunctionTotal) {
    errors.push(`totals.edgeFunctions must equal the system sum (${edgeFunctionTotal})`);
  }

  if (isRecord(options.previousProof) && isRecord(options.previousProof.totals)) {
    for (const field of MONOTONIC_TOTALS) {
      const previous = options.previousProof.totals[field];
      const next = value.totals[field];
      if (isPositiveInteger(previous) && isPositiveInteger(next) && next < previous) {
        errors.push(`totals.${field} cannot regress from ${previous} to ${next}`);
      }
    }
  }

  return errors;
}

export function assertValidProof(value, options = {}) {
  const errors = proofValidationErrors(value, options);
  if (errors.length > 0) {
    throw new Error(`Proof integrity check failed:\n- ${errors.join('\n- ')}`);
  }
  return value;
}
