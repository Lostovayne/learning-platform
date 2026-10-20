# Implementation Prompt: Vertex Home Page

## Goal

Implement the Vertex home page (`app/page.tsx`) as a pixel-faithful replica of the reference `design/vertex-home.png`. Replace the current temporary redirect to `/design-system` with the real home. Reuse the existing design tokens (`app/globals.css`) and the component library already built (`components/ui/*`, `components/cards/*`) before adding anything new. Replicate the reference exactly: layout, spacing, typography, colors, and states. Do not restyle or improve beyond the reference.

## Skills read

- `tailwind-design-system` (project tokens and component patterns already in place).
- `node_modules/next/dist/docs/` — App Router server components, `next/image` for static assets.

## Code inspected

- `app/page.tsx` — currently `redirect("/design-system")`; replaced by this work.
- `app/layout.tsx` — Playfair Display (700) + Inter loaded; html/body shell exists.
- `app/globals.css` — tokens: `--color-canvas #f9f5f2`, `--color-header-panel #fbf6f2`, `--color-panel-border #f0e9e4`, primary scale (600 `#ea580c` … 100 `#fee9de`), neutral scale, type scale (`display-1` 48/56, `display-2` 36/44, … `text-small` 12/16), radius `xs…xl`, shadows `sm…xl`.
- `components/ui/logo.tsx` — Vertex mark + wordmark, reused verbatim in the header.
- `components/ui/button.tsx` — primary variant `bg-primary-500` with `h-11` sizes; the hero CTA needs a larger size so it is used with size/className overrides rather than a new component.
- `components/ui/input.tsx` — compact `h-11` search input with leading icon and `⌘K` hint; the hero search is a large variant, so a large hero search is built in the page using the same token classes, not by restyling the compact primitive.
- `components/cards/course-card.tsx` — horizontal layout (icon left, meta bottom); the reference home shows a vertical layout, so a new vertical card is required.
- `public/` — no avatar asset yet.
- No test runner installed (see Tests below).

## Decisions and assumptions

1. **Header**: white bar, `border-b` in `--color-panel-border`; left logo, nav links "Courses" / "My Learning", right bell icon + 40px round avatar. New reusable `components/layout/site-header.tsx` (future pages reuse it). Links point to `#` placeholders until catalog/My Learning pages exist.
2. **Hero section**: background `--color-canvas`; centered column; "INTELLIGENT LEARNING" pill badge (white bg, `panel-border` border, primary-600 text, wide letter-spacing); Playfair Display bold display heading "Search your learning in plain English." on two lines; Inter neutral-500 subtitle (two lines); primary "Explore Courses" button with arrow-right icon; large search bar (white, rounded-lg, leading search icon, placeholder "Ask anything about your learning...", `⌘ K` kbd hint). The search is decorative for now — no route exists.
3. **All Courses section**: white background, top border in `--color-panel-border`; Playfair Display "All Courses" heading with "View all courses →" primary link; 3-column responsive grid of vertical course cards; below, a divider row: short line — orange outline star icon — "New courses and lessons added every week." — short line.
4. **Course cards (new `components/cards/course-card-vertical.tsx`)**: vertical layout — 64px rounded-xl icon tile, Playfair Display bold title, Inter neutral-500 description, thin divider pinned above a bottom meta row (level / duration / modules with lucide icons). Content matches the reference verbatim:
   - Next.js for Production — "Build scalable, high-performance web applications with Next.js." — Intermediate, 18h 24m, 12 modules
   - Docker Essentials — "Containerize applications and streamline your development workflow." — Beginner, 10h 12m, 8 modules
   - TypeScript Deep Dive — "Go beyond the basics and write safer, more expressive code." — Intermediate, 14h 36m, 10 modules
5. **Card icons**: inline SVGs — Next.js mark (white on black tile), Docker whale (official brand colors on transparent tile), TypeScript square (white "TS" on blue tile). Sourced from simple-icons paths, colored per brand.
6. **Footer decoration**: the reference ends with a blurred bar-chart strip of orange gradient columns. Implemented as a decorative inline component in the page (flex row of gradient bars, heights varying, blurred), matching the reference's silhouette. Purely visual, no content.
7. **Avatar asset**: downloaded a free portrait (`https://i.pravatar.cc/96?img=26`) into `public/avatar-victoria.jpg` — the closest available match to the reference photo (dark-haired woman, plain background). The exact stock photo in the reference is not identifiable/reproducible; this is the same subject, treated identically (40px round crop).
8. **Strict TDD does not apply**: no test runner installed, deliverable is a static visual page (same exception as the design-system prompt). Verification is type check, lint, production build, and side-by-side visual comparison against `design/vertex-home.png` at desktop width. Responsive behavior is adapted sensibly down to mobile (grid stacks, search full width) with the desktop layout exact.
9. **Interactive bits stay static**: nav links, CTA, and cards are links/buttons with correct hover styles; search input accepts typing but submits nowhere.

## Files to touch

- `app/page.tsx` — replace redirect with the home page (server component).
- `components/layout/site-header.tsx` — new: site header (logo, nav, bell, avatar).
- `components/cards/course-card-vertical.tsx` — new: vertical course card.
- `public/avatar-victoria.jpg` — new: header avatar asset.
- `prompts/vertex-home.md` — this file.

## Security considerations

Static server-rendered page. No tokens, no auth, no network calls at runtime. The only external asset (avatar JPEG) is downloaded into `public/` at build authoring time, not fetched by the browser. Nothing touches the private dataset or server boundaries.

## Acceptance criteria

1. At desktop width the page matches `design/vertex-home.png` section by section: header, hero (badge, heading, subtitle, CTA, search), All Courses grid (three cards, verbatim copy), star divider line, footer bars.
2. Only tokens from `app/globals.css` are used for colors/typography/radii/shadows; no new hex values outside the brand icon SVGs and the footer gradient.
3. Card meta rows, nav labels, headings, and copy are verbatim from the reference.
4. The page is usable at mobile width (single-column cards, no overflow) while desktop stays exact.
5. `npx tsc --noEmit`, `npm run lint`, `npm run format:check`, and `npm run build` all pass.
6. `/design-system` keeps working; `app/page.tsx` no longer redirects.

## Measured implementation note (2026-10-19)

Pixel measurement of the reference (ink positions verified by rendering and re-measuring) adjusted the plan:

- Hero heading is **56px** (`text-[3.5rem] leading-[74px]`), not 64px; gaps: badge→heading ~22px, heading→subtitle ~21px, subtitle→button ~40px (`mt-10`), button→search 44px (`mt-11`); hero `pt-[68px] pb-[53px]`.
- CTA button color is `#E46C46` (measured), not the token primary; headings/nav/card titles are pure `text-black`.
- Card titles are single-line Playfair with `tracking-tight`; card padding `p-6`; title `mt-7`, desc `mt-6` (16px/24px, neutral-700); divider block `pt-[52px]`; meta row is a `justify-between` single line (`text-[11px] tracking-tight`, 14px icons) pinned `mt-5` under the divider.
- Card logos: Next.js hand-drawn N (white bars + gradient diagonal on black tile), TypeScript `#3178C6` tile, Docker = the official flat pre-2017 whale path from Wikimedia Commons `Docker Logo.svg` (`#1d63ed` family) enriched with outlines, container windows, belly, eye and mouth — not the modern multi-color mark.
- The star divider uses an **outline** star (20px, `#E46C46`).
- Responsive (mobile): header nav collapses into the avatar dropdown menu (`components/layout/user-menu.tsx`, links hidden below `md`); search input shrinks to 56px/rounded-16 with the kbd hidden; hero paddings and CTA shrink; display texts scale down below `md` (h1 32px, h2 "All Courses" 22px, card titles 19px, star line 14px) while `md:` keeps the measured desktop values byte-for-byte.
- Footer bars: strip ~166px tall, gradient saturating ≈30% down (salmon `#FDAE92` → light `#FBD8CB`), matching the reference silhouette.

## Checks to run

1. `npx tsc --noEmit`
2. `npm run lint`
3. `npm run format:check`
4. `npm run build`

## Manual test steps

1. `npm run dev` and open http://localhost:3000 — the home renders (not the redirect).
2. Compare against `design/vertex-home.png` at desktop width: header, hero, cards, star divider, footer bars.
3. Narrow the window: cards stack to one column and the search bar stays full-width without overflow.
4. Hover "Explore Courses", "View all courses", and the cards: hover states match the design system.
