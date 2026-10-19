# Implementation Prompt: Vertex Design System

## Goal

Implement the Vertex design system from `design/vertex-designsystem.png` (Version 1.0, May 2025) as Tailwind CSS v4 design tokens plus a reusable component library, so every future page (catalog, course, lesson, search) builds on one consistent language. This is foundation work only: tokens, primitives, and a showcase page to verify them. No product pages yet.

## Skills read

- `tailwind-design-system` — Tailwind v4 CSS-first `@theme` tokens, component variant patterns, base styles.

## Code inspected

- `package.json` — Next.js 16.4.2, React 19.3, Tailwind v4 (`@tailwindcss/turbopack`), oxlint + oxfmt. No component or test libraries installed.
- `app/globals.css` — starter `@import "tailwindcss"` plus default Geist `@theme inline` block and a `prefers-color-scheme: dark` override.
- `app/layout.tsx` — Geist Sans/Mono via `next/font/google`, default "Create Next App" metadata.
- `app/page.tsx` — untouched starter page.
- Repo has no `components/`, `lib/`, or `prompts/` directories yet.

## Decisions and assumptions

1. **Tokens live in `app/globals.css` via `@theme`** (Tailwind v4 CSS-first; no `tailwind.config.ts`). Every hex, size, weight, and shadow comes from the reference sheet verbatim.
2. **Fonts**: `Playfair Display` (700) for Display 1/2 and `Inter` (400/500/600) for everything else, loaded via `next/font/google`. Geist is removed.
3. **Light theme only.** The reference defines one palette; the starter's `prefers-color-scheme: dark` block is removed rather than maintained. Dark mode is out of scope until a reference exists.
4. **Icons**: `lucide-react` for outline icons — its defaults match the sheet's spec (24x24 grid, 2px stroke, rounded caps). The filled style is the same icons with `fill-current`. The Vertex logo mark is hand-drawn inline SVG (no library draws it).
5. **Small utility dependency**: `clsx` for variant composition. No other new runtime deps.
6. **Component location**: `components/ui/`, one file per primitive. Shared helpers in `lib/utils.ts` (`cn`).
7. **Showcase page at `/design-system`**: reproduces the sheet section by section (colors, type scale, spacing, radius, shadows, buttons, inputs, badges, status, progress, cards, navigation). It exists to verify the system visually and to give future work a living reference. It is the only route added.
8. **Semantic color additions**: the palette has no success/locked color but section 10 shows a green "Completed" indicator. Add `--color-success` (#16A34A) and use `neutral-500` for locked. Badge tones: `video` = primary, `lesson` = blue (#2563EB on #EFF6FF), `popular` = primary-tinted. These are the only inferred values; they are flagged here so they can be changed in one place.
9. **Strict TDD does not apply**: no test runner is installed in this repo, and the deliverable is visual primitives. Verification is type check, lint, production build, and visual comparison against the sheet. Adding a test framework is separate scope.

## Files to touch

- `app/globals.css` — rewrite: full token set (colors, fonts, type scale, spacing, radius, shadows) + base layer.
- `app/layout.tsx` — swap fonts to Playfair Display + Inter, set metadata to Vertex.
- `app/page.tsx` — replace starter content with a redirect to `/design-system` (temporary until real pages exist).
- `lib/utils.ts` — new: `cn` helper.
- `components/ui/button.tsx` — new: 4 variants (primary, secondary, tertiary, text) x sizes (lg, md) x states (default, hover, disabled).
- `components/ui/input.tsx` — new: search/text input with leading icon, optional `⌘K` hint, focus border `#FB923C`.
- `components/ui/select.tsx` — new: native select styled to the spec.
- `components/ui/badge.tsx` — new: video / lesson / popular.
- `components/ui/progress.tsx` — new: percentage bar with "N% complete" label.
- `components/ui/status.tsx` — new: in-progress / completed / now-playing / locked indicators.
- `components/ui/breadcrumbs.tsx` — new.
- `components/ui/pagination.tsx` — new.
- `components/ui/logo.tsx` — new: inline SVG Vertex mark + wordmark.
- `components/cards/course-card.tsx` — new.
- `components/cards/lesson-card.tsx` — new: `variant="video" | "lesson"`.
- `components/cards/resource-card.tsx` — new.
- `app/design-system/page.tsx` — new: showcase page, sections 01-14 of the sheet.

## Requirements (from the reference sheet, verbatim values)

### Colors

- Primary: 500 `#F97316`, 400 `#FB923C`, 300 `#FDA374`, 200 `#FED7AA`, 100 `#FEE9DE`
- Neutral: 900 `#0F172A`, 700 `#334155`, 500 `#64748B`, 300 `#CBD5E1`, 200 `#E2E8F0`, 100 `#F1F5F9`, 50 `#FAFAFC`, White `#FFFFFF`

### Type scale

| Style      | Font             | Size / Line | Weight    | Use             |
| ---------- | ---------------- | ----------- | --------- | --------------- |
| Display 1  | Playfair Display | 48 / 56     | Bold      | Page titles     |
| Display 2  | Playfair Display | 36 / 44     | Bold      | Section titles  |
| Heading 1  | Inter            | 28 / 36     | Semi Bold | Card titles     |
| Heading 2  | Inter            | 22 / 30     | Semi Bold | Sub section     |
| Heading 3  | Inter            | 18 / 26     | Medium    | Small titles    |
| Body Large | Inter            | 16 / 24     | Regular   | Body copy       |
| Body       | Inter            | 14 / 20     | Regular   | Supporting text |
| Small      | Inter            | 12 / 16     | Regular   | Captions, meta  |

### Spacing (base 4px)

4, 8, 12, 16, 24, 32, 40, 48, 64 (0.25rem - 4rem).

### Radius

xs 4, sm 8, md 12, lg 16, xl 24, full.

### Shadows

- Sm `0 1px 2px 0 rgba(15,23,42,0.05)`
- Md `0 4px 12px -2px rgba(15,23,42,0.08)`
- Lg `0 12px 24px -4px rgba(15,23,42,0.10)`
- Xl `0 20px 40px -8px rgba(15,23,42,0.12)`

### Icons

24x24 grid, 2px stroke, rounded caps, outline and filled styles.

### Buttons

Height 44px (default), padding 0 16px (lg) / 0 12px (md), radius 12px, font Inter Medium 14-16px. Variants: primary (solid `#F97316`, white text), secondary (orange outline, orange text), tertiary (neutral outline, neutral text, external-link icon), text (no border, orange text, play icon). Disabled state visible in the sheet.

### Inputs

Height 44px, radius 12px, border `1px solid #E2E8F0`, padding `0 16px`, focus border `#FB923C`. Search variant with leading icon and `⌘K` hint.

### Cards

- Course card: icon, title, description, meta row (level, duration, modules).
- Lesson card (video): VIDEO badge, title, description, `Lesson 5.1 · 12:45`, "Watch from 12:45" action.
- Lesson card (lesson): LESSON badge, title, description, `Module 5`, "View lesson" action.
- Resource card: file icon, title, description, `PDF · 1.2 MB`, external-link action.

### Navigation

Logo + Courses (active) + My Learning. Breadcrumbs `All Courses > Next.js for Production > Data Fetching & Caching`. Pagination `< 1 2 ... 8 >`.

## Security considerations

No auth, no tokens, no user data, no network calls. Fonts load from Google Fonts via `next/font` (server-side, self-hosted at build). All values are static literals. Nothing here touches the private dataset or server boundaries defined in AGENTS.md.

## Acceptance criteria

1. Every color, size, and shadow above is a named token in `globals.css` and reachable as a Tailwind utility (e.g. `bg-primary-500`, `text-neutral-900`, `shadow-md`, `rounded-md`).
2. Type scale renders at the exact size/line-height/weight pairs listed, with Playfair Display only on Display 1/2.
3. All four button variants render in default, hover, and disabled states at 44px height, 12px radius.
4. Input shows focus border `#FB923C`; search variant shows icon and `⌘K` hint.
5. Both lesson card variants, course card, and resource card render with real example content matching the sheet.
6. `/design-system` shows every section of the sheet: colors, typography, type scale, spacing, radius, shadows, icons, buttons, inputs, badges, status, progress, cards, navigation.
7. No page other than `/design-system` is added or modified beyond `app/page.tsx` redirect and the layout font swap.
8. TypeScript compiles clean, oxlint passes, production build succeeds.

## Checks to run

From the repo root:

1. `npx tsc --noEmit` — type check.
2. `npm run lint` — oxlint.
3. `npm run format:check` — oxfmt.
4. `npm run build` — production build (routes and layout changed).
5. `npm run dev` — dev server, then load `/design-system`.

## Manual test steps

1. Open http://localhost:3000 — it lands on `/design-system`.
2. Compare section 01 colors against the sheet: swatches match the hex labels.
3. Section 02/03: Display headings use Playfair, body uses Inter; sizes match the table.
4. Section 07: hover each button variant; confirm hover styling and that disabled buttons do not respond.
5. Section 08: click the search input, confirm the orange focus border; confirm the `⌘K` hint renders.
6. Section 09-11: badges, four status indicators, and the progress bar render as shown.
7. Section 12: cards render with example content and actions.
8. Section 13: breadcrumbs and pagination render; pagination active page is page 1.
