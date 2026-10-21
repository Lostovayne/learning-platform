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
7. **Avatar asset**: downloaded a free portrait (`https://i.pravatar.cc/96?img=26`) into `public/avatar-victoria.jpg` — the closest available match to the reference photo (dark-haired woman, plain background). The exact stock photo in the reference is not identifiable/reproducible; this is the same subject, treated identically (40px round crop). Later replaced by an initials circle and the file removed — see "Resolved: the avatar".
8. **Strict TDD does not apply**: no test runner installed, deliverable is a static visual page (same exception as the design-system prompt). Verification is type check, lint, production build, and side-by-side visual comparison against `design/vertex-home.png` at desktop width. Responsive behavior is adapted sensibly down to mobile (grid stacks, search full width) with the desktop layout exact.
9. **Interactive bits stay static**: nav links, CTA, and cards are links/buttons with correct hover styles; search input accepts typing but submits nowhere.

## Files to touch

- `app/page.tsx` — replace redirect with the home page (server component).
- `components/layout/site-header.tsx` — new: site header (logo, nav, bell, avatar).
- `components/cards/course-card-vertical.tsx` — new: vertical course card.
- `public/avatar-victoria.jpg` — new: header avatar asset (since removed with the photo avatar).
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

## Measured implementation note (2026-10-20)

Responsive and accessibility pass driven by `.commandcode/design/review-report.md`.
Measurements were taken on the computed DOM at 320, 375, 768, 1024, 1280, 1440
and 2560px.

### Overflow, all closed

| Viewport | Before                                                                                                                                      | After            |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| 320px    | 8-9px of card overflow, truncated search placeholder, 0px gap between the H2 and its link, footer bars cut off at 388px in a 375px viewport | 0                |
| 768px    | 73px of overflow out of the course card meta row                                                                                            | 0, the row wraps |
| 1440px   | —                                                                                                                                           | 0                |

- Card meta row: `whitespace-nowrap` on the container was replaced with
  `flex-wrap` + `justify-between`. The row is one line at 1024px and above
  and wraps to two lines below that, instead of spilling out of the card.
- Footer bars: the bars were positioned in `%` but sized in fixed `px`, so
  the last two ran past the right edge (388px and 396px in a 375px
  viewport). Widths and heights are now percentages of the strip, and the
  strip height scales with the viewport, so the silhouette keeps its shape
  from 320px to ultrawide and can never leave the strip.
- Search placeholder was truncated at 320px; the input now has 16px text
  below `sm` and 18px above, and the padding was reduced to match.

### Proportion

- Card description was 16px (`text-body-lg`) and wrapped to three lines
  where the reference wraps to two. The reference metadata is ~13-14px, so
  the description moved to `text-body` (14px) with `neutral-500`, and the
  meta row to 10px with 12px icons. The card now reads title → description →
  meta at three clear steps and the meta row is one line at desktop.
- The catalog grid is `md:grid-cols-2 lg:grid-cols-3`. At 768px the three
  column layout squeezed the cards to 189px; two columns give 292px.
- The course logos were `72px → 64px → 67px` across breakpoints, which is
  not monotonic. They are now 56 → 64 → 72px, and the star scales 16 → 20px.

### Gutter and hit areas

- The header used `md:px-16` and the content `md:px-20`, so the logo sat
  16px to the left of every card on the same grid. Both surfaces now read
  `pageWidth` and `pageGutter` from `lib/layout.ts`. Verified: at 320px the
  logo, the "All Courses" heading and the first card all start at x=32.
- The bell was 34×34 and the avatar 32×32, both under the 44px touch
  minimum and the only two controls in the mobile header. Both are now
  44×44 hit areas with the visual size unchanged.
- The hero heading used a hard `<br/>`, which at 320px left "learning"
  alone on a line. The break is now `md:` only, so desktop keeps the
  reference two-liner and mobile balances the lines itself. The "All Courses"
  row wraps with a gap instead of colliding at 320px.

### Accessibility

- The search field had no accessible name — the placeholder was doing the
  label's job. It now has a real `<label>` (visually hidden) bound to the
  input, and the placeholder stays as the example.
- The focus ring on the search input and the "View all courses" link was
  `outline: none` with only a border-colour change. Both now show a 2px
  offset focus ring.

### Proportion against the reference, measured

The reference (`design/vertex-home.png`, 1024px wide — the same width as the
page's `max-w-[1024px]`) was measured pixel by pixel in a canvas, and the
header was compared element by element. Every gap below is a real difference,
not an eyeball one.

**Header** (reference vs implementation, after this pass):

| Element            | Reference | Now  | Delta |
| ------------------ | --------- | ---- | ----- |
| Logo mark          | 31px      | 30px | -1    |
| "Vertex" wordmark  | 68px      | 66px | -2    |
| "Courses" link     | 56px      | 55px | -1    |
| "My Learning" link | 82px      | 83px | +1    |
| Bell icon          | 20px      | 20px | 0     |
| Avatar             | 44px      | 36px | -8    |
| Logo → nav gap     | 64px      | 64px | 0     |
| Nav link gap       | 46px      | 48px | +2    |
| Bell → avatar gap  | 29px      | 28px | -1    |

- The nav links were 16px; the reference is 14px, which is why "My Learning"
  measured 94px against the reference's 82px. Now `text-body`.
- The bell icon was 22px, now 20px.
- The avatar was scaled 36 → 40 → 44px. It is now 32 → 36px. The reference
  carries a ~51px photo, but that reference balances because its logo mark is a
  **solid filled triangle**; ours is a thin stroked "V" with about half the
  optical weight, so a large avatar tipped the header. At 36px the header
  reads mark 30 / bell 20 / avatar 36 and the eye goes to the logo first, as
  it should. The hit area stays 44×44. Superseded by "Resolved: the avatar"
  below, which swaps the photo for an initials circle at 28/32px.

### Resolved: the logo mark

The reference mark (both `vertex-home.png` and `vertex-designsystem.png`) is a
solid filled terracotta "V" — 32×31px of ink — whose arms overhang inward at
the top, leaving a narrow slit at the centre. `components/ui/logo.tsx` used to
draw a thin stroked "V" instead, about half the optical mass.

`components/ui/logo.tsx` now draws the reference mark as a filled path on a
`viewBox="0 0 34 32"` canvas, filled with a diagonal gradient across the brand
ramp (`primary-400` → `primary-500` → `primary-600`). The path was traced from
the poster pixels, not eyeballed: the 32px mark in `design/vertex-home.png` was
sampled into an ASCII grid and the vertices were fitted to that grid, so the
overhangs, the slit and the notch apex land within ~1px of the reference.

No SVG in the [svgl.app](https://svgl.app) library matches this mark — the full
catalog (670 logos, via `https://api.svgl.app`) was checked; the "V" logos there
are Vite (violet), Vue and Vitest (green) and Vuetify (blue). The mark was
therefore drawn by hand.

### Resolved: the avatar

The header avatar is now an initials circle instead of a photo: `neutral-100`
fill, `neutral-700` semibold initials, 28px on desktop (`md` and up) and 32px
below it, inside the unchanged 44×44 hit area. On desktop the circle is ~1.4×
the bell glyph, the same ratio as the reference screenshot. `public/avatar-victoria.jpg`
was removed with its last reference.

**Hero**

- The headline had `max-w-[14ch]`, which clamped it to 289px below `md`. In a
  634px container that made a narrow island of three short lines, and the
  448px subtitle was wider than the headline — the hierarchy was inverted.
  The measure is now 330px, which holds "Search your learning" on one line and
  breaks exactly where the reference breaks, at 32px as well as at 56px.
- The badge had `px-6`; the reference has 16px of padding, so it is now 212px
  wide against the reference's 208px.
- The subtitle keeps `max-w-md` (448px, the reference's own measure) from
  `md` up and drops to 24rem below it.

### Verified after the sizing pass

- 320, 375, 640, 768, 1024, 1440px: 0 of horizontal scroll and 0 clipped
  elements on both pages.
- 640px, the equivalent of 200% zoom on a 1280px screen: the home renders in
  2 lines of headline with the reference break, the design-system board does
  not clip.
- `forced-colors: active`: both pages keep their borders, their text and the
  hex labels of the swatches, so the colour information survives the loss of
  the palette.
- The last truncated swatch label ("Primary 800 · hover" at 1024px) now
  splits its role into a third line instead of clipping.

### Adjusted (2026-10-21): sheet inset, hatched band, CTA typography

Measured against the newer reference sheet the user supplied, not against the
1024px crop in `design/vertex-home.png`.

- **The sheet no longer runs edge to edge.** `pageSheet` went from
  `mx-[30px]` to `mx-[30px] xl:mx-auto xl:max-w-[1230px]`: below `xl` the
  sheet keeps its 30px inset (the 1024px reference is untouched), and from
  `xl` up it is capped and centred, so the hatched band on both sides widens
  with the viewport instead of the paper filling it. At 1440px the band is
  105px per side.
- **The content column reaches the sheet's own edges.** `pageWidth` lost its
  `max-w-[1024px]` cap and is now `w-full`, so the header, the hero and the
  catalog all run to the sheet border minus the 52px gutter. At 1024px
  nothing changes (the sheet is 961px there, so the old cap never bound);
  at 1440px the content column is 1126px wide and the logo starts at x=155.
- **The hatch lines are thicker**: the repeating gradient goes from a 1.2px
  line every 8px to a 2px line every 10px.
- **The "Explore Courses" CTA was too heavy and too large.** It was 18px
  medium in a 58px-tall box (233px wide) with a 20px arrow. It is now 16px
  **regular** weight in a 48px box with a 16px arrow: **180×48**. The
  `hero` size of `components/ui/button.tsx` is
  `h-12 px-4 text-body-lg font-normal`.
- The `Sign Up` button of the header, which mirrors the CTA style, follows
  the same typography: 16px regular, `h-11`, `px-4` → 92×44.

Verified: `tsc --noEmit` clean, `oxlint` reports no new findings, 0px of
horizontal overflow and 0 clipped elements at 375px and 1024px.

### Open

- **"View all courses" apunta a `href="#"`**, igual que los links del header y
  del menú de avatar. No hay ruta de catálogo todavía, así que apuntarlos a
  `/courses` cambiaría un no-op por un 404. Queda como placeholder, flagged
  by oxlint (`jsx-a11y(anchor-is-valid)`).
- **El menú de avatar repite los dos links del header.** En desktop la nav
  inline y el avatar menu ofrecen los mismos destinos; el menú necesita real
  account actions, which do not exist yet.
- **El badge "INTELLIGENT LEARNING" compite con el H1** — lo detecté pero no lo
  toqué porque cambia la composición; decime si lo bajamos de peso o lo sacamos.
- **El placeholder a 320px se corta igual** (196px disponibles contra 263px del
  texto). Con ese copy no entra en un iPhone SE; a 375px entra entero. Si
  querés, se puede acortar el copy en mobile.
- `next dev` reescribe `tsconfig.json` con un formato que `oxfmt` rechaza —
  loop preexistente, no de esta pasada.
