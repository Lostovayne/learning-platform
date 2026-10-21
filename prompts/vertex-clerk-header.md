# Implementation Prompt: Vertex Clerk auth in the header (modal + design fidelity)

## Goal

The Clerk integration landed with the default Clerk chrome, so the header no longer
respects the Vertex composition. Three concrete defects, quoted from the request:

> "primero, clerk deberia abrirse en modal y no en vista"
>
> "segundo el boton Sign Up deberia usar el estilo que usa el boton explore courses"
>
> "y no deberia verse el icono de notificaciones si aun no esta logeado el usuario"
>
> "todo eso es logica"

Fix the header so that (1) sign-in and sign-up open in a **modal**, never as a full
page view, (2) the **Sign Up** button uses the same style as the home hero
"Explore Courses" CTA, and (3) the **notifications bell is not rendered at all while
the user is signed out**. Nothing else changes: no new pages, no new routes, no
design-system additions.

## Skills read

- `clerk` (`.agents/skills/clerk/SKILL.md`) — version routing. This project runs
  `@clerk/nextjs` **v7.9.18**, so the "Current SDK" rules apply (not Core 2).
- `clerk-nextjs-patterns` (`.agents/skills/clerk-nextjs-patterns/SKILL.md`) —
  `<Show when="signed-in" | "signed-out">` for conditional rendering, bare
  `clerkMiddleware()` in `proxy.ts` (Next.js 16 renames `middleware.ts` to
  `proxy.ts`), `createRouteMatcher` deprecated in v7 and not to be added.
- `clerk-custom-ui` (`.agents/skills/clerk-custom-ui/SKILL.md` +
  `core-3/show-component.md`) — `<Show>` semantics (`treatPendingAsSignedOut`
  defaults to `true`) and the appearance/theming surface for Clerk's own UI.

## Code inspected

- `components/layout/site-header.tsx` — the header. Today it renders
  `<SignInButton />` and `<SignUpButton />` **without `mode`**, so Clerk takes the
  `redirect` branch (`clerk.redirectToSignUp(...)`) and navigates to the full page
  routes. The `<Bell>` button is rendered unconditionally.
- `app/sign-in/[[...sign-in]]/page.tsx`, `app/sign-up/[[...sign-up]]/page.tsx` —
  the two page-view routes added by the Clerk init.
- `app/layout.tsx` — `<ClerkProvider>` without `appearance`.
- `proxy.ts` — `clerkMiddleware()` with the default matcher. Correct for v7 + Next 16.
- `components/ui/button.tsx` — the design-system button: variants `primary`,
  `brand`, `secondary`, `tertiary`, `text`; sizes `lg` (`h-11 px-4 text-body-lg
  font-medium`), `md`, `hero`. `brand` = `bg-primary-500 text-white hover:bg-primary-600`.
- `app/page.tsx:192` — the hero CTA: `<Button variant="brand" size="hero">Explore
  Courses</Button>` → `bg-primary-500` (#E46C46), white text.
- `app/design-system/page.tsx:169` — the button matrix labels the **Secondary**
  variant "Explore Courses" (outlined). Different button, same label; the request is
  about the home hero CTA, which is what the user sees next to the header.
- `node_modules/@clerk/shared/dist/types/clerk.d.ts:2493-2506` —
  `SignInButtonPropsModal` / `SignUpButtonPropsModal` expose `mode: 'modal'` and an
  `appearance` override.
- `node_modules/@clerk/react/dist/index.mjs:190-226` — `SignUpButton` does **not**
  wrap the child in its own element: it `React.cloneElement`s the single child and
  merges `onClick`. So we keep rendering our own `<button>` and keep full control of
  its classes, focus ring and hit area.
- `design/vertex-home.png` — measured pixel by pixel: the hero CTA is a solid
  #E46C46 rectangle, `x=[398..621] y=[501..559]` (224×59). The header reference
  shows the signed-in state (bell + 36px avatar circle), so the signed-out buttons
  have no reference of their own and must be composed from the design system.

## Decisions and assumptions

1. **Sign Up = solid terracotta**, `bg-primary-500` (#E46C46) with white text,
   `h-11`, `rounded-md`, `hover:bg-primary-600`, focus ring `outline-primary-600`.
   Exactly the tokens of the hero "Explore Courses" CTA, sized for the header.
   Its label is **14px regular** weight — the same weight family as the hero
   "Explore Courses" CTA (16px regular), scaled down for the header. An 18px
   medium label made the control read heavier and larger than the 14px nav
   links beside it, and it copied a CTA that had the same problem.
   The control is **70×44**, the exact box of the "Sign In" link next to it:
   both carry `h-11 w-[70px]`, so the pair reads as one unit.
   _User decision, confirmed in the questionnaire._
2. **Sign In = text link**, design-system `text` variant: `text-primary-700`,
   `hover:bg-primary-100`, no border, no fill, `h-11` hit area. Sign Up is the only
   filled control, so the pair keeps the same hierarchy as the design system
   (Primary/Text). _Assumption, stated for review._
3. **Both auth buttons open in modal**: `mode="modal"` on `SignInButton` and
   `SignUpButton`. No navigation, no page view.
4. **The bell only exists when signed in**: it moves inside
   `<Show when="signed-in">`. Signed out, the header right side is exactly
   `Sign In` + `Sign Up`.
5. **`/sign-in` and `/sign-up` routes are deleted.** _User decision, confirmed in
   the questionnaire._ Consequence: `NEXT_PUBLIC_CLERK_SIGN_IN_URL` and
   `NEXT_PUBLIC_CLERK_SIGN_UP_URL` currently point at those routes, so they are
   repointed to `/` in `.env.local` (local file, git-ignored). Out-of-band Clerk
   links (email verification / invitation) then land on the home page instead of a
   404 — they cannot complete the verification, which is the accepted residual risk
   of deleting the routes. Flagged in "Needs your attention".
6. **Clerk's own UI is themed** through `ClerkProvider appearance.variables` so the
   modal does not look like an external product. Clerk v7 names the variables
   `colorPrimary` / `colorPrimaryForeground` / `colorBackground` / `colorForeground` /
   `colorMutedForeground` / `colorInput` / `colorInputForeground` / `colorBorder` /
   `colorRing` (there is no `colorText`): `colorPrimary: '#c2522a'` (`primary-600`,
   the design system's action fill with white text at 4.63:1), `colorBackground:
   '#ffffff'`, `colorForeground: '#0f172a'`, `colorMutedForeground: '#334155'`,
   `colorInput: '#ffffff'`, `colorInputForeground: '#0f172a'`, `colorBorder:
   '#e6d8cd'`, `colorRing: '#c2522a'`, `fontFamily: 'Inter, ui-sans-serif,
   system-ui, sans-serif'`, `borderRadius: '0.5rem'`.
7. **`UserButton` avatar box = 36px** (`elements.avatarBox: 'h-9 w-9'`) to match the
   36px initials circle of the reference header. Without it Clerk renders its own
   default size and the header stops matching the design.
8. **Accessibility note (not blocking):** white on `#E46C46` is 3.21:1, below the
   4.5:1 AA threshold for the 18px button label. The hero CTA has the same ratio —
   it comes from the reference. The header button follows the requested style
   exactly; the fix, if wanted, is a design decision (use `primary-600` fill) and
   is not taken unilaterally here.
9. `proxy.ts`, the Clerk keys and the middleware matcher are untouched.

## Files to touch

- `components/layout/site-header.tsx` — rewrite the right-hand slot of the header.
- `app/layout.tsx` — add `appearance` to `<ClerkProvider>`; fix the missing final
  newline.
- `app/sign-in/[[...sign-in]]/page.tsx` — **delete** (and its folder).
- `app/sign-up/[[...sign-up]]/page.tsx` — **delete** (and its folder).
- `.env.local` — `NEXT_PUBLIC_CLERK_SIGN_IN_URL=/` and
  `NEXT_PUBLIC_CLERK_SIGN_UP_URL=/`. Local, git-ignored, never committed.

Not touched: `proxy.ts`, `package.json`, the design system, `app/page.tsx`,
`components/ui/*`.

## Requirements

- **R1 — Modal, not view.** Clicking "Sign In" or "Sign Up" in the header opens the
  Clerk modal in place. The browser URL must not change to `/sign-in` or `/sign-up`,
  and neither route may exist in the app.
- **R2 — Sign Up style.** The Sign Up control is a filled terracotta button
  (`bg-primary-500` / white text / `rounded-md` / `h-11`), the same visual language
  as the home hero "Explore Courses" CTA, with the same hover and focus treatment.
- **R3 — Sign In style.** The Sign In control is a plain text link in
  `primary-700` with a `primary-100` hover, no border and no fill.
- **R4 — Bell gated by auth.** With no session, the header contains no
  notifications icon at all (not a disabled one, not a hidden one). With a session,
  the bell appears exactly as before (44×44 hit area, 20px glyph) next to the
  `UserButton`.
- **R5 — Signed-out header composition.** Signed out, the right side of the header
  reads `Sign In` (text link) then `Sign Up` (filled button). Signed in, it reads
  bell then avatar. No other element changes position or size.
- **R6 — Modal theming.** The Clerk modal uses the Vertex palette and Inter, with
  the terracotta action fill `primary-600`.
- **R7 — Server/client boundaries.** The browser keeps no token, no secret and no
  Clerk API key. The modal is opened by Clerk's client runtime; nothing in the
  browser writes content.
- **R8 — No dead routes.** `app/sign-in` and `app/sign-up` are gone and the env
  vars that pointed at them no longer point at a 404.

## Security considerations

- `CLERK_SECRET_KEY` and `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` stay in `.env.local`,
  which is git-ignored (`.gitignore:34`). Nothing is added to the client bundle
  beyond the publishable key Clerk already uses.
- `clerkMiddleware()` in `proxy.ts` stays bare: no matcher changes, no new public
  paths, no auth bypass introduced by the route deletion (the deleted routes were
  never protected resources — they rendered Clerk's own components).
- Deleting `/sign-in` and `/sign-up` removes surfaces, it does not widen access:
  the only routes that remain are public, exactly as before.
- The appearance override is pure CSS variables; no user input is interpolated into
  styles.

## Acceptance criteria

1. Signed out, `http://localhost:3000/` header shows: logo, nav, `Sign In` (terracotta
   text), `Sign Up` (filled #E46C46 button), **no bell**.
2. Clicking `Sign Up` opens the Clerk modal over the page; the URL stays `/`.
3. Clicking `Sign In` opens the Clerk modal over the page; the URL stays `/`.
4. `http://localhost:3000/sign-in` and `http://localhost:3000/sign-up` return 404.
5. The Sign Up button's computed background is `rgb(228, 108, 70)` (#E46C46) and its
   label is white, 14px, regular. Its box is 70×44, the same as the "Sign In" link.
6. Signed in (a test user exists in the Clerk instance), the header shows the bell
   (44×44 hit area) and the avatar (36px), and no `Sign In` / `Sign Up`.
7. The modal's primary button is terracotta `#C2522A` and the modal font is Inter.
8. `next build` succeeds; `oxlint` reports no new findings; `tsc --noEmit` clean.
9. The home hero, the cards and `/design-system` are visually untouched (the diff
   outside the header slot is empty).

## Checks to run

From the repo root (`web` and `studio` are not separate workspaces in this repo
yet — the whole app lives at the root):

1. `npx tsc --noEmit` — type check.
2. `npm run lint` — oxlint.
3. `npm run build` — production build (routes, layout and a client component change).
4. `npm run dev` — dev server, then the manual steps below.
5. Visual check of the header against `design/vertex-home.png` at 1024px: mark,
   wordmark, nav links, bell, avatar, and the gaps between them must not move.

## Manual test steps

1. `npm run dev`, open `http://localhost:3000`.
2. Signed out: confirm there is **no bell** in the header, and that `Sign In` is a
   terracotta text link followed by a filled terracotta `Sign Up` button.
3. Hover `Sign Up`: the fill must go to the hover tone (#C2522A), and hovering
   `Sign In` must give it the `primary-100` background.
4. Tab through the header: logo → nav → `Sign In` → `Sign Up`, each with a visible
   focus ring.
5. Click `Sign Up`: the Clerk modal opens over the home page. The URL in the address
   bar stays `http://localhost:3000/`. Close it with Escape.
6. Click `Sign In`: same, modal opens in place, URL unchanged.
7. Complete the sign-up in the modal: the modal closes, the header swaps to bell +
   avatar, and the avatar circle is 36px.
8. Sign out from the avatar menu: the bell disappears again and `Sign In` / `Sign Up`
   come back.
9. Visit `http://localhost:3000/sign-in` and `http://localhost:3000/sign-up`: both
   must be 404.
10. Compare the header against `design/vertex-home.png` at 1024px width: nothing
    shifted.

## Needs your attention

- **Verification by email link.** With `/sign-in` and `/sign-up` deleted, a Clerk
  email that links to a verification page lands on `/` instead of completing the
  verification. If the instance sends that kind of link, either the Clerk dashboard
  "Account Portal" has to serve it or we have to add a minimal route later. Tell me
  if you want that route added now.
- **Contrast.** White on #E46C46 is 3.21:1. It is the requested style and matches the
  reference CTA, but if AA matters for the header, the fill should be `primary-600`.
