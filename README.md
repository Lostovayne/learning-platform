This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Tooling

Linting and formatting run on the [oxc](https://oxc.rs) toolchain, so both come
from the same family of tools and neither needs a plugin stack to install.

```bash
npm run lint          # oxlint -- the linter
npm run lint:fix      # oxlint --fix
npm run format        # oxfmt -- the formatter
npm run format:check  # verify formatting without writing
```

- **oxlint replaced ESLint.** `.oxlintrc.json` was produced with oxc's own
  migration tool, run against the flat config before ESLint was removed
  (`npx @oxlint/migrate eslint.config.mjs --with-nursery`). `eslint.config.mjs`
  and the `eslint` / `eslint-config-next` dependencies are gone.
- **The rule set stays at 1:1 parity with ESLint.** The old setup resolved 113
  rules, 86 of them active (60 errors, 26 warnings); oxlint enforces 80 of those
  86, and 6 could not be migrated. `"categories": { "correctness": "off" }` stops
  oxlint from adding its own defaults, so `npm run lint` reports exactly what
  ESLint used to report. Remove that line to also enable oxlint's built-in
  `correctness` baseline.
- **Six ESLint rules had no oxlint equivalent** and are no longer enforced:
  `nextjs/no-location-assign-relative-destination` (not implemented),
  `react/no-deprecated` (covered by `typescript/no-deprecated` under
  `--type-aware`), `react/jsx-uses-react` and `react/jsx-uses-vars` (obsolete
  with the React 17+ JSX transform, the latter covered by `no-unused-vars`), and
  the React Compiler rules `react-hooks/config` and `react-hooks/gating`. They
  are recorded in a comment at the top of `.oxlintrc.json`.
- **oxfmt replaced Prettier**, which this project never actually used.
  `.oxfmtrc.json` pins `printWidth` to 80 to match the existing style, and
  `.editorconfig` holds the 2-space indentation standard that both tools read.
- Vendored skill content and generated artifacts (`.agents/**`, `agent/**`,
  `.atl/**`) are excluded from both tools, so upstream third-party code is never
  linted or reformatted. The lint config also keeps the ignores the ESLint setup
  declared (`.next/**`, `out/**`, `build/**`, `next-env.d.ts`). Without the
  vendored excludes oxlint would scan 120 files instead of the 3 that belong to
  this project.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
