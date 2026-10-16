#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Regression guard for the rules this project turned on deliberately (S9 in
 * odd/tasks/oxc-toolchain-migration.md) plus the type-aware recovery of
 * react/no-deprecated. Nothing else in the repo would notice one of them
 * disappearing from .oxlintrc.json, so each one is asserted against a fixture
 * that has to produce its finding.
 *
 * Usage: node scripts/lint-rules-regression.mjs [config-path]
 *
 * The config path defaults to .oxlintrc.json at the repo root. Point it at
 * another config to watch the guard fail: that is its RED state.
 * Exit code: 0 when every expected finding shows up, 1 with the missing ones.
 */

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const configPath = resolve(process.argv[2] ?? join(repoRoot, ".oxlintrc.json"));

const expected = [
  "eslint(no-restricted-properties)",
  "typescript(no-deprecated)",
  "typescript(no-floating-promises)",
  "typescript(no-misused-promises)",
  "react(button-has-type)",
  "react(jsx-no-script-url)",
  "react(iframe-missing-sandbox)",
  "jsx-a11y(label-has-associated-control)",
  "jsx-a11y(anchor-is-valid)",
];

const scratch = mkdtempSync(join(tmpdir(), "oxlint-rules-"));

const fixture = (name, source) => {
  const path = join(scratch, name);
  writeFileSync(path, source);
  return path;
};

const files = [
  fixture(
    "promises.ts",
    `async function work(): Promise<void> {}

/** @deprecated use work instead */
function legacy(): void {}

export function dropped(): void {
  work();
}

export function misusedCallback(): void {
  [1].forEach(async (value) => {
    await Promise.resolve(value);
  });
}

export function misusedCondition(): void {
  if (work()) {
    return;
  }
}

export function deprecatedCall(): void {
  legacy();
}

export function fullReload(): void {
  window.location.reload();
}
`,
  ),
  fixture(
    "react.tsx",
    `export function Ui() {
  return (
    <div>
      <button>Click</button>
      <a href="javascript:void(0)">Script URL</a>
      <a>No link</a>
      <iframe title="frame" />
      <label>Name</label>
    </div>
  );
}
`,
  ),
];

let output = "";
try {
  output = execFileSync(
    // The oxlint bin is a Node ESM shim, so it runs through this same
    // interpreter and needs no shell or platform-specific .cmd wrapper.
    process.execPath,
    [
      join(repoRoot, "node_modules", "oxlint", "bin", "oxlint"),
      "--config",
      configPath,
      ...files,
    ],
    { cwd: repoRoot, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] },
  );
} catch (error) {
  // oxlint exits non-zero as soon as it reports a finding, which is the
  // outcome expected here.
  output = `${error.stdout ?? ""}${error.stderr ?? ""}`;
  if (output === "") {
    rmSync(scratch, { recursive: true, force: true });
    console.error(`oxlint could not run with ${configPath}: ${error.message}`);
    process.exit(1);
  }
}

rmSync(scratch, { recursive: true, force: true });

const missing = expected.filter((rule) => !output.includes(rule));

if (missing.length > 0) {
  console.error(
    `lint-rules-regression: ${missing.length} of ${expected.length} expected findings are missing from ${configPath}`,
  );
  for (const rule of missing) {
    console.error(`  - ${rule}`);
  }
  process.exit(1);
}

console.log(
  `lint-rules-regression: all ${expected.length} expected findings reported by ${configPath}`,
);
