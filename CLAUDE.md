# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
docker compose up -d db      # Postgres for local dev — start this first
npm run dev                  # dev server on http://localhost:3000
npm run build                # production build
npm run start                # serve the production build
npm run lint                 # eslint (flat config, no path arg needed)
npx tsc --noEmit             # typecheck; the build does not emit JS
npm run generate:types       # regenerate src/payload-types.ts after a collection change
npm run generate:importmap   # regenerate the admin import map
```

No test runner is configured.

`.env.local` is required (copy `.env.example`). `docker compose` currently fails on this
machine with an API-version error from Docker Desktop; `docker run` works — see the compose
file for the equivalent flags.

## Architecture

Next.js 16 App Router + React 19 + Tailwind CSS v4, TypeScript strict. ALMEK is a Romanian
timber-construction company. Routes:

| Route | Notes |
|---|---|
| `/` | homepage, assembled in `(frontend)/page.tsx` from section components — static |
| `/proiecte`, `/proiecte/[slug]` | project catalogue and detail — **from CMS, dynamic** |
| `/portofoliu-almek` | finished works — **from CMS, dynamic** |
| `/magazin`, `/cos` | shop and cart — **from CMS, dynamic** |
| `/blog`, `/blog/[slug]` | articles — **from CMS, dynamic** |
| `/filmari-pe-teren` | six YouTube clips — static, still from `portfolio.ts` |
| `/despre-noi`, `/de-ce-casa-din-lemn`, `/etapele-necesare`, `/procesul-tehnologic`, `/variante-si-costuri`, `/intrebari-frecvente` | the six *Informații* pages — static, from `info.ts` |
| `/admin`, `/api/*` | Payload admin and REST/GraphQL |

Paths deliberately mirror almekwoodarch.ro so the migration keeps its URLs.

**Two route groups, no root layout.** `src/app/(frontend)/` holds the site and its shell —
grain overlay, backdrop, header, `<main>`, footer. `src/app/(payload)/` holds the admin, which
must **not** inherit that shell, so each group carries its own layout and there is no layout at
`src/app/`. `globals.css` stays at `src/app/`, imported as `../globals.css`.

Server Components throughout, except: [SiteHeader](src/components/layout/SiteHeader.tsx)
(nav drawer + the two submenus), the catalogue/grid/video components under
[src/components/portfolio/](src/components/portfolio/), and the vendored Skiper UI pieces.

- `@/*` maps to `src/*`. Sections live in [src/components/sections/](src/components/sections/),
  shell in [src/components/layout/](src/components/layout/), primitives in
  [src/components/ui/](src/components/ui/).
- **Projects, works, products and articles live in the CMS**, not in files. `portfolio.ts`
  keeps only what stays pure and is safe for client components: the filter option lists and
  `levelsOf()`, which derives *Parter* / *Parter + supantă* from whether a project has a loft
  area — storing both would let them contradict each other. `shop.ts` likewise keeps only
  `formatPrice`, the price ranges and the availability options. The six field videos are the
  one collection still held in `portfolio.ts`.
- Catalogue filter state lives in the **URL** (`?tip=…&nivel=…`, comma-separated for
  multi-select) and is applied client-side over the list handed down as a prop. The catalogue
  components take their data from the server page — they must never import from `cms.ts`,
  which is `server-only`. `useSearchParams` needs a `<Suspense>` boundary or the build fails —
  that is what the wrappers in the `page.tsx` files are for. Navigation uses `router.replace`,
  not `push`, so ticking filters does not fill the history stack.
- `/proiecte` and `/portofoliu-almek` share one layout on purpose: a filter bar at the very
  top, then the result count, then the grid. They differ only in how the bar is filled.
  `/proiecte` has three facets, so each is a `FilterDropdown` (multi-select, count beside the
  label) plus removable chips underneath. `/portofoliu-almek` has one facet with five short
  values, so the categories sit **open in the bar as toggle cells** — a dropdown there hid
  everything on offer — with `Toate` meaning simply "nothing ticked"; chips would then just
  repeat the bar, so it only keeps "Șterge selecțiile". A left-hand category sidebar was tried
  on the works page and rejected.
- The bar has two submenu groups, `Portofoliu` and `Informații`, both driven by the same
  [NavDropdown](src/components/layout/NavDropdown.tsx) over `navGroups` in `content.ts` — the
  second group was extracted into that component rather than copied, so hover timing, Escape
  and outside-click stay in one place. The mobile drawer expands every group flat (no nesting)
  and scrolls (`max-h-[80vh]`); with eleven destinations it overflows a phone otherwise.
- The submenu links are **also rendered in the footer**, one column per `navGroup`. The header
  panel only exists in the DOM once open, so without the footer none of the nine links appear
  in the initial HTML and crawlers never reach the pages. Adding a group to `navGroups` fills
  both places; do not hard-code footer links.
- The Portofoliu submenu and the filter dropdowns **open on hover as well as on click**.
  `onPointerEnter` is gated on `pointerType === "mouse"` — on touch there is no hover and an
  unfiltered handler would fight the click. Closing runs through a ~120ms timer so the trip
  from trigger to panel does not dismiss it, and the header submenu puts that gap inside the
  panel wrapper (`pt-4`, not `mt-4`) so there is no dead zone to cross at all. Click, Escape
  and outside-pointerdown all still work; do not drop them for a hover-only menu.
- `TextRoll` is applied **only to top-level labels** — the nav links and the filter facet
  buttons (`Tip construcție`, `Preț`, …). Individual values never get it: dropdown options,
  active-filter chips, the works page's category cells, the Portofoliu submenu rows and
  "Șterge selecțiile" are all plain text. It runs at `lineHeight` 1.4 (the
  `text-technical-data` line height) so Romanian diacritics are not clipped, and it takes a
  plain string — which is why the selected-count `( 2 )` sits in its own span beside the label
  rather than inside it.
- The catalogue components deliberately have **no `useMemo`**: `readList` builds a fresh array
  each render, so React Compiler could not preserve the manual memoization and bailed out of
  optimising the whole component (the lint config turns that into an error). Once the lists
  became props there was a second reason — a hand-written dependency array silently went stale.
  The lists are small; let the compiler memoize.
- **All homepage copy and data live in [src/lib/content.ts](src/lib/content.ts)** — services, projects,
  testimonials, nav links, and the `company` record (address, phones, CUI, coordinates).
  Contact details render in two places, so edit them there, not in the JSX.
- Static images are imported from `../../public/images/*.png` for `placeholder="blur"`.
  The current PNGs are generated placeholders meant to be swapped for real photography;
  filenames are the contract, so replacing the files needs no code change. They are dark by
  construction, so they look out of place in the light theme until real photos land.
- **Partners is a continuous marquee**, not a grid. The list in `content.ts` is rendered
  twice and the track translates exactly `-50%`, so the loop has no seam; the second copy is
  `aria-hidden` and carries `marquee-copy-duplicate`. Speed stays constant as partners are
  added because the section passes `--marquee-duration` computed from the item count. It sits
  **inside `shell`**, so it keeps the same 1200px width as the rest of the page. Logos only —
  no captions. It does **not** pause on hover — that was tried and rejected, because stopping
  broke the sense of continuous flow; the per-logo hover colouring stays, so marks light up in
  turn as they pass under the cursor. Under `prefers-reduced-motion` it never starts — the
  track wraps into centred rows and the duplicate copy is hidden, otherwise every partner
  would appear twice. That reduced-motion branch is now the only concession to WCAG 2.2.2,
  which asks for a stop mechanism for motion lasting over 5s.
- The band is **deliberately not a straight line**: `partner-item` reads a `--partner-offset`
  set inline from the `OFFSETS` array. That array's length need not divide the partner count —
  both copies map the same indices, so they get the same offsets and the loop seam stays
  invisible whatever the list size. The offset goes through a custom property rather than
  straight into `margin-top` so the reduced-motion rule can zero it; an inline `style` would
  beat any class.
- `Partner.logo` is a **static import**, so `next/image` knows the intrinsic size at build.
  The files in `public/images/parteneri/` are transparent PNGs derived from the JPEGs on
  almekwoodarch.ro: the white background was keyed out by sampling the corner colour, with a
  12→38 ramp on the edge distance so no halo remains. Do not key on luminance instead — Renner
  is white type on a grey plate and luminance keying erases it. `logo` stays optional and the
  band falls back to a monogram, so a new partner can land before its artwork does.
- Logos render through `--c-logo-filter`: desaturated on light, **inverted** on dark (the
  marks are dark on transparent, so without the invert they vanish into the near-black
  ground). Hovering an item drops the filter and restores full colour.
- Copy and structure mirror the live site at almekwoodarch.ro; `src/lib/content.ts` was
  verified line-by-line against it, and the partner logos were taken from it too.

- Testimonials are a **scroll-snap carousel**
  ([TestimonialCarousel](src/components/ui/TestimonialCarousel.tsx)), not a grid — the seven
  reviews range from three words to 400 characters and a grid made them visibly ragged. In a
  flex row every slide inherits the tallest one's height, which is what fixes that. It is built
  on the native scrolling container rather than Swiper: touch, trackpad and keyboard scrolling
  come from the browser, and it degrades to a plain scrollable strip without JS. The active dot
  is derived from an `IntersectionObserver` on the real scroll position, not a counter — a
  counter desyncs the moment someone swipes. `scrollTo` is not covered by the global
  `prefers-reduced-motion` block, so the smooth behaviour is checked in JS.

### Informații pages

Six static content pages, all copy in [src/lib/info.ts](src/lib/info.ts) — nothing here goes
through the CMS. The text is technical and stable, and the layouts are purpose-built (numbered
steps, price cards, wall build-ups, an accordion); moved into a rich-text editor it would
degrade into running prose and lose exactly the structure that makes it readable.

- Prices are **strings** (`"De la 420 Euro/mp"`), not numbers: nothing sorts, filters or sums
  them, and the "De la" is part of the message. That is the deliberate opposite of the shop's
  `priceMinor`, where the amount really is arithmetic.
- The figures were **copied verbatim from almekwoodarch.ro and are not independently verified**
  — the live page may be out of date. Confirm them with the client before this goes public.
  One figure is **self-contradictory on the live site**: the 40 mm lambrisat wall is 420 Euro/mp
  on `/procesul-tehnologic` and 520 Euro/mp on `/variante-si-costuri`. Both were copied as
  found, and a comment in `info.ts` marks the spot; resolving it needs the client, not a guess.
- `/intrebari-frecvente` is a native `<details name="faq">` accordion: single-open behaviour,
  keyboard support and Ctrl+F-opens-the-match all come from the browser, with no JavaScript and
  no client component. The `name` attribute is what makes it exclusive — do not swap it for a
  hand-rolled `role`/`aria-expanded` widget. The marker is hidden with
  `[&::-webkit-details-marker]:hidden` plus `list-none`, and the Plus icon rotates via
  `group-open:rotate-45`.
- On `/variante-si-costuri` the "not included in the price" note sits **immediately under the
  prices it qualifies** (`PriceDisclaimer` in
  [InfoBlocks](src/components/info/InfoBlocks.tsx)), not collected at the foot of the page
  where nobody reads it.
- Two errors on the live site were corrected, not reproduced: *"Cât durează construcția casei?"*
  appeared twice with an identical answer, and the last step of the process carried the wrong
  label. As elsewhere in the migration, the live pages contain injected casino spam — none of
  it was copied.

### CMS (Payload)

Payload 3.88 runs **inside this app**, not as a separate service. `@payloadcms/next` requires
`next >= 16.2.6`, which is why the Next version cannot be rolled back.

- **The project is ESM** (`"type": "module"` in package.json). Payload's CLI cannot `require()`
  its own ESM entrypoints and dies with `ERR_REQUIRE_ASYNC_MODULE` otherwise. That is also why
  `next.config.ts` uses `import.meta.dirname` instead of `__dirname`.
- Collections live in [src/collections/](src/collections/): `articles`, `products`, `projects`,
  `works`, plus `media` and `users`. `slugField` and `statusField` are shared in `fields.ts`.
- **Local API bypasses access control.** `getPayload()` defaults to `overrideAccess: true`, so
  the collections' "visitors only see published" rule does **not** apply to reads from
  [cms.ts](src/lib/cms.ts). Every query there filters on `status` explicitly — drop that filter
  and drafts go live.
- [cms.ts](src/lib/cms.ts) imports `server-only` and calls **`connection()`** before every
  query. `connection()` stops prerendering, which is what keeps the database out of the build:
  CI needs no credentials and no network path to Postgres. The cost is that CMS-backed pages
  render per request; there is no cache layer over them yet, though the `revalidateFor` hooks
  are already wired for when one lands.
- `revalidateFor` also purges the **old** path when a slug changes or a document is deleted —
  otherwise a stale page keeps being served from a URL that no longer exists.
- **Media storage is conditional.** The S3 plugin is only registered when all four `S3_*`
  variables are present; without them Payload writes to `public/media` (gitignored). So local
  work needs no AWS credentials and cannot pollute the production bucket.
- Schema changes are pushed automatically in development (`push: NODE_ENV !== "production"`).
  For production, generate migrations and commit them — otherwise the first boot alters RDS
  with no trace in history.
- After changing a collection, run `npm run generate:types`; `payload-types.ts` is generated,
  never hand-edited.

### Shop

- Products are entered in the CMS. `shop.ts` no longer holds any — only `formatPrice`, the
  price ranges and the availability options.
- Money is stored as `priceMinor`, an **integer in bani** (RON × 100). Never floats: Stripe
  bills in the smallest unit anyway, and float arithmetic loses accuracy exactly where totals
  are summed. `formatPrice()` is the only place that renders money.
- `inStock` splits the two flows: in-stock products go to the cart, the rest open
  [OrderModal](src/components/shop/OrderModal.tsx). It is a **plain checkbox**, not a counter —
  two buyers can still take the last unit at once. Real stock needs reservation at checkout.
- The cart is [cart-store.ts](src/lib/cart-store.ts), an external store read through
  `useSyncExternalStore` — same pattern as `ThemeToggle`, because the lint config rejects
  `useState` in an effect. It stores **only slug + quantity, never price**: price is looked up
  on the server — `/cos` loads the catalogue and passes it down — so nothing price-shaped can
  be tampered with in `localStorage`. `getServerSnapshot` returns an empty cart, and `EMPTY` is a
  shared constant because `useSyncExternalStore` compares snapshots with `Object.is` — a fresh
  `[]` each call would loop forever. Storage reads happen on first `subscribe`, not at module
  load, so the server never touches `localStorage`; every access is wrapped in `try/catch` for
  private mode. A `storage` listener keeps tabs in sync.
- Quantity is chosen **on the card, before adding** — [ProductCard](src/components/shop/ProductCard.tsx)
  keeps its own `quantity` state, so the catalogue does not have to hold a slug→number map, and
  resets to 1 after adding (otherwise the next click would silently add the same batch again).
  The number input clamps on change: a half-typed field gives `NaN` from `valueAsNumber`, which
  must not reach state.
- Money never uses the display type scale. `text-display-lg` reaches 72px and overflowed the
  cart's total box at four figures; totals use `text-headline-md` plus `tabular-nums` so digits
  do not jitter as quantities change.
- `OrderModal` uses the native `<dialog>` with `showModal()`: focus trapping, `Escape` and
  inertness come from the browser. Its `onClose` unmounts the component — without it the dialog
  would sit closed in the DOM and never reopen. Backdrop clicks are detected by comparing
  `event.target` to the dialog element, which works because the content lives in a wrapper.

### Stripe — not implemented, plan only

No Stripe package, no keys, nothing wired; the checkout button is deliberately inert. When it
is time:

1. **`STRIPE_SECRET_KEY` stays server-side.** Never prefix it `NEXT_PUBLIC_` — that ships it in
   the browser bundle and burns the key. `.env.local`, untracked.
2. **Never accept a price from the client.** The Server Action takes `{ slug, quantity }[]`,
   looks the price up server-side, and builds `line_items` itself. A client-supplied amount can
   be rewritten to 1 leu by anyone with devtools.
3. `stripe.checkout.sessions.create({ mode: "payment", line_items, success_url, cancel_url })`,
   then redirect to `session.url`.
4. **Webhook** at `src/app/api/stripe/webhook/route.ts`, `export async function POST(request)`.
   `stripe.webhooks.constructEvent` needs the **raw body** — `await request.text()`, not
   `request.json()`. Without signature verification anyone can POST a "paid" event.
5. Fulfil **only** on `checkout.session.completed` from the webhook, never on the success
   redirect: the tab can be closed before redirect, and the success URL can be visited
   directly. Handling must be idempotent — Stripe retries.

### Design system ("Lignum Tech-Modern")

- **Two themes, three states.** No `data-theme` on `<html>` follows `prefers-color-scheme`;
  `data-theme="light"` / `"dark"` forces one. [src/app/globals.css](src/app/globals.css) holds
  raw values as `--c-*` variables per theme, and the `@theme` block maps every
  `--color-*` token to `var(--c-*)`. There is no `tailwind.config.*`, and the Tailwind `dark:`
  variant is deliberately unused — tokens flip, utilities do not.
- The dark block is **written twice** (once under `@media (prefers-color-scheme: dark)`,
  once under `:root[data-theme="dark"]`) because CSS cannot combine a media query and an
  attribute selector. Change both, and keep the attribute rules last so an explicit choice
  beats the system preference.
- **The dark palette is the source of truth**; the light one is derived. Dark comes verbatim
  from a supplied Material 3 scheme (near-black `#121412` ground, `#e3e2e0` text). Its own
  `primary` was a pale green that the reference design never actually used, so `primary` is
  mapped to **warm cedar `#c19a6b`** — every visible accent in the reference is cedar — and
  `secondary-container` to **deep forest `#1a2f23`**, the panel green. The light scheme has no
  upstream source: it was built from the same two hues (cedar `#7c5a2e`, forest `#3d5546`) on
  a `#fbf9f6` parchment ground, so treat its values as provisional. Every text/background pair
  the code actually uses was checked against WCAG AA in both themes; the only sub-4.5 result is
  `outline` on light (4.28), which is border-only and clears the 3:1 bar for UI components.
  Re-run that check after touching any token — the compact way is to parse the `--c-*` blocks
  out of `globals.css` and compute relative luminance, rather than eyeballing hexes.
- Texture layers read theme variables too (`--c-grain-opacity`). Never hard-code a colour
  in them.
- The toggle is [ThemeToggle](src/components/ui/ThemeToggle.tsx) — it uses
  `useSyncExternalStore` reading `data-theme` off the DOM, not `useState` in an effect
  (which the lint config rejects). An inline script in
  [layout.tsx](src/app/layout.tsx) applies the stored theme before first paint;
  `<html>` therefore needs `suppressHydrationWarning`.
- `themeColor` lives in the `viewport` export, not `metadata` — Next 16 warns otherwise.
- **No border-radius tokens are defined on purpose.** The shape language is strictly
  orthogonal (0px); `rounded-full` (circular icon buttons) is the only exception and relies on
  the Tailwind default.
- `--spacing-margin-safe` resolves to `var(--margin-safe)`, which plain `:root` media queries
  step 20px → 40px → 64px. The override rules must stay **unlayered** so they beat
  `@layer theme`.
- `grain-overlay` (z-9999, inline SVG feTurbulence) is the only `@utility` texture rule
  left. `main` and the footer sit at z-10, the header at z-100.
- **The page background is lines and nothing else.** Two pieces, both in
  [TextureOverlays.tsx](src/components/ui/TextureOverlays.tsx): `BlueprintBackdrop` (rendered
  from [page.tsx](src/app/page.tsx), `fixed` at z-0) is the vertical axis at 50%, and
  `SectionRule` is the single horizontal line each section renders on its own bottom edge —
  `absolute`, so it scrolls with the section instead of sitting across its content. Sections
  are transparent and separated by that rule plus spacing: **no delimiting borders, no grid,
  no radial glows, no blurred photo backdrops, no wood texture** — every one of those was
  deliberately removed after review, so do not reintroduce them. A 64px drafting grid was
  tried and rejected (it read as "little squares"), as was a pair of fixed horizontal lines
  at 40%/75% (they floated over the text). The footer has no `border-t`; its top line is the
  Partners rule. Anything opaque on a section hides the lines, so keep any section-level fill
  alpha-blended. Internal borders — cards, list rows, form fields, the header's `border-b` —
  are unaffected, as are card fills like `bg-surface-container-low/80`. The Hero's own
  full-bleed photo still covers the axis in the first viewport; that is the section's
  content, not a background layer.
- **The lines are lit by CSS scroll-driven animations** (`animation-timeline`), not by any JS
  scroll listener — see the block above the view-transition rules in `globals.css`. The axis
  carries two extra layers: `axis-progress` (fills top-down with page scroll) and `axis-head`
  (a glowing 5rem segment riding the fill's leading edge, kept rectangular for the orthogonal
  shape rule). `SectionRule` is painted `bg-tertiary/40` at `opacity-50` — identical to the
  old `/20` at rest — and `section-rule-glow` doubles that while its section crosses the
  screen. It reads the section's own `view()` progress, which is why every `<section>` carries
  the `section-timeline` utility (`view-timeline-name: --section-view`); drop that class and
  the rule silently stops reacting. **Both guards are load-bearing:** the animated layers
  start at `opacity: 0` and are only lit inside `@supports (animation-timeline: scroll())`
  (Firefox stable still lacks the feature, and without the guard its users would see a
  segment frozen at the top), and the rules sit under `prefers-reduced-motion: no-preference`
  because the `animation-duration: 0.01ms` override at the end of the file does nothing to a
  scroll-driven animation.
- **Buttons carry a light sweep**, `shine` (surface, so it passes over the text) plus
  `shine-edge` (a 1px ring isolated with `mask-composite: exclude`), both driven by one
  `shine-sweep` keyframe on a 3s cycle — the sweep takes 50% of it (so 1.5s) and the rest is
  dead time,
  because a permanent shimmer on every button is exhausting. The sweep's real duration is
  `cycle × that percentage`, so the two move together — shortening the cycle alone speeds
  the sweep up, which is not the same request as making it recur more often. The peak colour is `--c-shine`.
  **Do not reimplement this with `background-clip: text`**: it was tried and reverted, because
  filled buttons carry text of the opposite polarity to the page (dark on cedar), so clipping
  the highlight into the letterforms dropped contrast to roughly 2:1 at the peak — in dark for
  the filled buttons, in light for the outlined ones. A `soft-light` layer lifts text and
  background together and keeps the ratio. The reduce-motion branch sets `display: none`
  rather than relying on the global `animation-duration: 0.01ms`, which would fire the sweep
  as a flash. CTAs deliberately do **not** also use `TextRoll` — two animations on one element
  fought each other; `TextRoll` is for nav links only.
- Switching theme runs through the View Transitions API: `ThemeToggle` calls
  `document.startViewTransition`, and the `::view-transition-*` rules at the bottom of
  `globals.css` wipe the new theme in from the right with a blur (Skiper UI skiper26's
  "rectangle / right-left / blur", transcribed as static CSS — the package itself was not
  installed, it depends on `next-themes`). The toggle skips the transition when the browser
  lacks the API or the user prefers reduced motion; those pseudo-elements are not reachable
  by the `*` rules in the `prefers-reduced-motion` block, so the JS guard is what matters.
- Fonts are wired in `(frontend)/layout.tsx` as CSS variables: **Hanken Grotesk** for both
  display and body, JetBrains Mono for technical labels. Both need
  `subsets: ["latin", "latin-ext"]` — Romanian `ă/â/î/ș/ț` are not in `latin`.
  Headings run at weight 700 and body copy at 600, on request. Hanken Grotesk is variable
  (100–900), so those are **real weights**: the previous pairing (Bodoni Moda serif +
  Metrophobic, which ships 400 only) had to be replaced rather than just bolded, because
  `font-bold` on a single-weight face is browser-synthesised and looks wrong.

### Layout

All content is capped at **1200px** by the `shell` utility (defined in `globals.css`).
Put `shell` on a wrapper *inside* the `<section>`, never on the section itself — sections stay
full-bleed so their backgrounds and horizontal borders still span the viewport. The Services
carousel is the one deliberate exception: it sits outside `shell` because the coverflow effect
needs the extra width.

### Vendored Skiper UI components

`src/components/ui/skiper-ui/` holds components pulled in with
`npx shadcn add @skiper-ui/<name>` (the docs say `pnpm dlx`; this project is on npm).
`components.json` exists only so the CLI places files correctly and does **not** re-run init —
never run `shadcn init`, it would overwrite `globals.css` and destroy the theme tokens.
Verified: all three registry items carry `cssVars: null` / `css: null`, so they touch no CSS.

`skiper58` (`TextRoll`) supplies the per-letter roll-up on hover used for **every** text in
[SiteHeader](src/components/layout/SiteHeader.tsx) — wordmark, nav links, and both CTAs.
Its four patches all exist because the upstream demo is English display type: spaces are
rendered as ` ` (an `inline-block` span holding only a space collapses to zero width),
`lineHeight` became a prop (the upstream 0.75 clips Ț's cedilla and Ă's breve under
`overflow-hidden` — the header passes 1.4/1.2), and the doubled per-letter markup is
`aria-hidden` behind an `sr-only` copy so screen readers do not spell the label out twice.
The per-letter spans also carry `align-top`: as `inline-block`s on the baseline the row
reserves extra descender space, so the container ends up taller than one letter, while the
second copy translates by 100% of *its own* height — the leftover strip stayed visible and the
text read as doubled. The bigger the `lineHeight`, the worse it got, so it only became obvious
once callers moved off the upstream 0.75. It also bails out to plain text under
`useReducedMotion`, since framer-motion animates transforms in JS and the CSS
`prefers-reduced-motion` block cannot reach it.

All three files carry `PATCH ALMEK` comments marking local edits. For `skiper4` and
`skiper49` the pattern is the same: the upstream components keep toggle/carousel state
internal and expose no callback, so they were made **controlled** (falling back to the
original behaviour when the new props are absent), and hard-coded `#000`/`bg-black`/
`bg-white` were swapped for theme tokens. Re-running `shadcn add --overwrite` discards all of
these patches.

`skiper49`'s carousel had a **half-applied loop on first paint** — slides appeared only to
the left of the active one until the first arrow click ran `loopFix()`. Three separate causes,
all fixed in `Carousel_003`, all marked `PATCH ALMEK`; keep every one of them:

1. **Too few real slides.** Swiper only loops when fewer than half the slides are visible;
   ~5 of the 300px slides show at once and `content.ts` has 5 services. The image list is now
   repeated to clear that threshold *with margin* (5 services → 3 cycles → 15 slides, keys
   `cycle-index`). Note the factor is 3, not 2: two cycles gives 10 slides and `5 < 5` is
   false — right on the edge, i.e. still broken. Adding services shrinks the repetition.
2. **Swiper initialised inside a moving box.** The upstream file wrapped it in two
   `<motion.div>`s, the outer holding a `translateY` for 0.5s after mount, which also made
   `observeParents` fire every frame. Both wrappers are plain `<div>`s now — do not restore
   the entry animation.
3. **React Strict Mode double-mounts in dev**, leaving the reused instance with the first
   mount's measurements. `onSwiper` forces `update()` + `loopFix()` on the next frame, guarded
   by `swiper.destroyed`.

If the duplicated DOM ever becomes a problem, the alternative is `loop={false}` + `rewind`
plus an `initialSlide` in the middle of the strip: guaranteed symmetric first paint, at the
cost of empty space beside the first and last slide.

`cn` in [src/lib/utils.ts](src/lib/utils.ts) is **not** the stock shadcn one. Our type scale
uses `text-*` for size (`text-technical-data`) while Tailwind uses it for colour
(`text-primary`); plain `tailwind-merge` treats both as one group and would silently drop the
size. The custom `font-size`/`font-family` class groups fix that — keep them in sync when
adding a token to the `@theme` type scale.

### Known TODO

The contact form in [Contact.tsx](src/components/sections/Contact.tsx) is UI-only. Its submit
button is deliberately `type="button"` — a real submit on a `<form>` with no action would
trigger a GET and reload the page. Wiring it up means a Server Action plus `useActionState`.

## Next.js 16 caveats

This Next version predates the model's training data, so verify APIs against
`node_modules/next/dist/docs/` (App Router material is under `01-app/`) before writing code
rather than relying on remembered Next.js conventions.

The `nextjs-agent-rules` block in [AGENTS.md](AGENTS.md) is generated and re-added by
`next dev`; commit it with your changes instead of reverting it.
