# oxc toolchain migration (oxfmt + oxlint)

Objective: replace ESLint with oxlint and install oxfmt as the project formatter, migrating the `eslint-config-next` rule set instead of discarding it.
Branch: `chore/oxc-toolchain-migration`
Runner: `npx oxlint` / `npx oxfmt` (the project has no test runner yet)

## Specs

S1. Install the oxc toolchain. Verbatim user request:
"agregaremos del entorno de oxc , agregaremos oxfmt como remplazo de prettier para este proyecto , y agregaremos oxlint como remplazo de eslint por lo que migraremos las reglas de eslint , a oxlint"

S2. oxfmt replaces Prettier. Verbatim: "agregaremos oxfmt como remplazo de prettier para este proyecto".

- Acceptance: `oxfmt` is a devDependency with a config file, `npm run format` runs it, and it respects the repo's declared 2-space standard (`.editorconfig`).
- Note: the repo had no Prettier, so this is additive, not a migration.
- Known risk: installed `oxfmt` is `0.73.0`, still pre-1.0. Its config surface may move.

S3. oxlint replaces ESLint with FULL removal. Verbatim: "agregaremos oxlint como remplazo de eslint por lo que migraremos las reglas de eslint , a oxlint".
User decision, verbatim: "Reemplazo total de ESLint".

- Acceptance: `eslint`, `eslint-config-next` and `eslint.config.mjs` are gone; `oxlint` is the only linter; `npm run lint` runs oxlint.

S4. Rule migration preserves name and severity. Source of truth is the installed `eslint-config-next/core-web-vitals` + `eslint-config-next/typescript`: 113 active rules (60 error, 26 warn, 27 explicitly off).

- Acceptance: every migratable active rule is reproduced in `.oxlintrc.json` at the same severity, using oxlint namespaces: `@next/next/*` -> `nextjs/*`, `@typescript-eslint/*` -> `typescript/*`, `react-hooks/*` -> `react/*`.

S5. Accepted coverage loss, explicitly decided by the user after being shown the evidence. Six active rules have no oxlint implementation and are dropped:

- `nextjs/no-location-assign-relative-destination` (warn) - flags `location.href = '/route'` / `location.assign('/route')` in Client Components and pushes `router.push()` instead.
- `react/no-deprecated` (error)
- `react/jsx-uses-react` (error)
- `react/jsx-uses-vars` (error)
- `react/config` (error) - React Compiler
- `react/gating` (error) - React Compiler
- Acceptance: the loss is recorded in the repo (config comment + README), never silent.

S6. React Compiler coverage is preserved. 14 of the 16 `react-hooks/*` rules exist in oxlint and must be enabled explicitly at their original severity, because oxlint ships them experimental and off by default.

S7. `npm run lint` exits 0 on the current codebase.

## Tasks

| ID  | Specs      | Route  | Deliverable                                                                                           | Status  | Evidence |
| --- | ---------- | ------ | ----------------------------------------------------------------------------------------------------- | ------- | -------- |
| T1  | S2         | inline | `oxfmt` installed, config, `format` / `format:check` scripts, README                                  | pending | -        |
| T2  | S3, S4, S6 | inline | ESLint removed, `oxlint` installed, `.oxlintrc.json` with migrated rules, `lint` / `lint:fix` scripts | pending | -        |
| T3  | S5         | inline | Accepted-loss record in config comments and README                                                    | pending | -        |

## Log

L1 (user, verbatim): "agregaremos del entorno de oxc , agregaremos oxfmt como remplazo de prettier para este proyecto , y agregaremos oxlint como remplazo de eslint por lo que migraremos las reglas de eslint , a oxlint"

L2 (user decision, verbatim, after being shown the coverage evidence): "Reemplazo total de ESLint"

L3 (evidence, verified against the real artifacts, not from memory):

- `oxlint` latest is `1.88.0`; `oxfmt` latest is `0.73.0` (pre-1.0).
- oxlint ships built-in plugins covering every plugin `eslint-config-next` uses: `react` (from eslint-plugin-react + react-hooks + react-refresh + React Compiler), `nextjs` (from `@next/eslint-plugin-next`), `typescript`, `jsx-a11y`, `import`, `unicorn`.
- `react` and `nextjs` are OFF by default in oxlint and must be enabled per project.

L4 (evidence, coverage measured by feeding the generated config to `oxlint --print-config` and reading oxlint's own rejection list):

- oxlint accepts the mapping for `nextjs/*`, `typescript/*`, `react/*` (including the React Compiler rules `set-state-in-effect`, `purity`, `refs`, `immutability`, `use-memo`, `static-components`, `set-state-in-render`, `error-boundaries`, `globals`, `preserve-manual-memoization`, `unsupported-syntax`, `incompatible-library`), `jsx-a11y/*`, `import/*` and the core rules.
- oxlint rejects exactly nine names: the six active losses in S5 plus three rules that `eslint-config-next` already had turned off (`react/prop-types`, `no-dupe-args`, `no-new-symbol`), so those three cost nothing.
- Functional check: a fixture with `<img src="/a.png" />` produces `jsx-a11y(alt-text): Missing 'alt' attribute.` and `next(no-img-element): ... Consider using <Image /> from next/image`, proving the `jsx-a11y` and `nextjs` plugins fire in oxlint.

L5 (decision, tooling): kept the `.oxlintrc.json` JSON config rather than `oxlint.config.ts`, because the oxc docs mark JavaScript/TypeScript config files as experimental. JSON plus comments is supported in all runtimes.
