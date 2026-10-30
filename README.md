# Vertex

Vertex is an AI-powered learning platform: authors publish courses in Sanity, and a Next.js site serves them to learners. Its differentiator is search — a plain-language query returns ranked, clickable cards that link straight to the exact second in a lesson video where the topic is taught, with playback on the site.

This repository is the **web workspace** (Next.js). The Sanity Studio is a separate workspace.

## Stack

- **Framework:** Next.js 16 (App Router), React 19, TypeScript (strict)
- **Auth:** Clerk (`@clerk/nextjs`)
- **Content:** Sanity (private dataset, server-side reads)
- **Styling:** Tailwind CSS v4, `oxfmt`/`oxlint` (oxc toolchain)
- **Analytics:** PostHog (planned)
- **Runtime/package manager:** Bun

## Prerequisites

- [Bun](https://bun.sh) 1.4+
- Node.js 20+ (for tooling compatibility)
- A Clerk application (publishable + secret keys)

## Getting started

```bash
bun install
cp .env.local.example .env.local   # create if not present; see "Environment"
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

> Note: there is no `.env.example` committed yet. Create `.env.local` with the variables listed below.

## Environment

Variables are read server-side unless prefixed with `NEXT_PUBLIC_`. Never commit real secrets.

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
```

Sanity, PostHog and the search (Context MCP) variables will be added as those features land. Keep `.env.local` out of version control (it is gitignored).

## Scripts

| Command           | Description                                      |
| ----------------- | ------------------------------------------------ |
| `bun dev`         | Start the dev server (Turbopack)                  |
| `bun run build`   | Production build                                 |
| `bun start`       | Serve the production build                       |
| `bun run lint`    | Lint with oxlint                                 |
| `bun run lint:fix`| Apply oxlint fixes                               |
| `bun run format`  | Format with oxfmt                                |
| `bun run format:check` | Verify formatting without writing            |
| `bun run test:lint`| Guard the deliberate lint rules against a fixture |

Type-check: `bunx tsc --noEmit`.

## Project structure

```
app/                  # App Router routes, layouts, global styles
  design-system/      # Design-token reference page
  globals.css         # Global styles + Clerk overrides
  layout.tsx          # Root layout, fonts, ClerkProvider
  page.tsx            # Home
components/
  cards/              # Course/lesson/resource cards
  layout/             # Site header, etc.
  ui/                 # Reusable UI primitives
lib/                  # Shared helpers
scripts/              # Repo tooling (lint rule regression)
design/               # Design artboards (gentle-design), not production code
odd/                  # ODD task tracking for large features
prompts/              # Approved implementation prompts
```

## Conventions

- **Server/client boundary:** pages are read-only and render stored data. Any write (e.g. progress) goes through a server route. The browser holds no tokens and never calls the MCP or the LLM.
- **Tokens stay server-side:** Sanity read token, Clerk secret key, and any write token are server-only. Only client-safe values reach the browser.
- **Path alias:** `@/*` maps to the repo root.
- **Styling:** reuse existing Tailwind patterns and `components/ui` before adding new ones. Do not restyle beyond the provided references.
- **Linting/formatting:** oxc toolchain (`oxlint` + `oxfmt`). Vendored skill content and generated artifacts (`.agents/**`, `agent/**`, `.atl/**`) are excluded.

## Tooling notes

- `oxlint` replaced ESLint with 1:1 rule parity (81 of 86 active rules). Five rules had no oxlint equivalent and are documented in `.oxlintrc.json`.
- `oxfmt` replaced Prettier; `.oxfmtrc.json` pins `printWidth` to 80.
- `bun run test:lint` lints a fixture that must fail every deliberate rule, so a rule disappearing silently fails the check.
- The project has no application test runner yet; `test:lint` is the only committed test.

## Deployment

Built for [Vercel](https://vercel.com). Run `bun run build` locally before pushing; the production build must pass. Keep environment variables configured in the Vercel project settings (never in the repo).

## License

Private — all rights reserved.