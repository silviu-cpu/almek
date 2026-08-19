# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # dev server on http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint (flat config, no path arg needed)
npx tsc --noEmit # typecheck; the build does not emit JS
```

No test runner is configured.

## Architecture

Next.js 16 App Router + React 19 + Tailwind CSS v4, TypeScript strict. Single route: the
ALMEK homepage (a Romanian timber-construction company), assembled in
[src/app/page.tsx](src/app/page.tsx) from section components. Everything is a Server
Component except [SiteHeader](src/components/layout/SiteHeader.tsx), which is client-side
only for the mobile nav drawer.

- `@/*` maps to `src/*`. Sections live in [src/components/sections/](src/components/sections/),
  shell in [src/components/layout/](src/components/layout/), primitives in
  [src/components/ui/](src/components/ui/).
- **All copy and data live in [src/lib/content.ts](src/lib/content.ts)** — services, projects,
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
  outside `shell` so the band runs edge to edge. WCAG 2.2.2 wants a stop mechanism for motion
  lasting over 5s, so it pauses on hover and on keyboard focus, and under
  `prefers-reduced-motion` it never starts — the track wraps into centred rows and the
  duplicate copy is hidden, otherwise every partner would appear twice.
- `Partner` in `content.ts` has an optional `logo` path; while it is absent the band draws a
  monogram from the name instead, so logo files can be dropped into
  `public/images/parteneri/` one at a time without touching the component. The monogram is
  `aria-hidden` because the caption underneath already names the partner.
- Copy and structure mirror the live site at almekwoodarch.ro; `src/lib/content.ts` was
  verified line-by-line against it. Partner logo files do not exist yet — see the marquee note
  above for how they slot in.

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
- Fonts are wired in [src/app/layout.tsx](src/app/layout.tsx) as CSS variables:
  Bodoni Moda (display/headings), Metrophobic (body/UI), JetBrains Mono (technical labels).
  **All three need `subsets: ["latin", "latin-ext"]`** — Romanian `ă/â/î/ș/ț` are not in
  `latin`. **Metrophobic ships weight 400 only**, so never put `font-bold` on it; emphasis
  comes from JetBrains Mono uppercase with wide tracking.

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
Its three patches all exist because the upstream demo is English display type: spaces are
rendered as ` ` (an `inline-block` span holding only a space collapses to zero width),
`lineHeight` became a prop (the upstream 0.75 clips Ț's cedilla and Ă's breve under
`overflow-hidden` — the header passes 1.4/1.2), and the doubled per-letter markup is
`aria-hidden` behind an `sr-only` copy so screen readers do not spell the label out twice.
It also bails out to plain text under `useReducedMotion`, since framer-motion animates
transforms in JS and the CSS `prefers-reduced-motion` block cannot reach it.

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
