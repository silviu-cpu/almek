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
- Copy and structure mirror the live site at almekwoodarch.ro; `src/lib/content.ts` was
  verified line-by-line against it. Partner logos are still text-only placeholders.

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
- Both palettes come from one tonal scale — the `*-fixed` tokens in the dark scheme expose
  T10/T30/T80/T90, so light uses T40 for the main roles and swaps `outline`/`outline-variant`.
  All text pairs were checked against WCAG AA in both themes.
- Texture layers read theme variables too (`--c-blueprint-line`, `--c-blueprint-accent`,
  `--c-glow`, `--c-grain-opacity`, `--c-wood-opacity`). Never hard-code a colour in them.
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
- Texture layers are `@utility` rules: `grain-overlay` (z-9999, inline SVG feTurbulence),
  `wood-overlay` (z-1, `/textures/wood.png`), plus `blueprint-bg`, `blueprint-detail`, and
  `section-gradient`. `main` sits at z-10, the header at z-100.
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
Verified: these two registry items carry `cssVars: null` / `css: null`, so they touch no CSS.

Both files carry `PATCH ALMEK` comments marking local edits. The pattern in both cases: the
upstream components keep toggle/carousel state internal and expose no callback, so they were
made **controlled** (falling back to the original behaviour when the new props are absent),
and hard-coded `#000`/`bg-black`/`bg-white` were swapped for theme tokens. Re-running
`shadcn add --overwrite` discards these patches.

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
