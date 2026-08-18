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

Next.js 16 App Router + React 19 + Tailwind CSS v4, TypeScript strict. Currently the
create-next-app scaffold: only a root layout and one page exist.

- Routes live in [src/app/](src/app/); `@/*` maps to `src/*`.
- [src/app/layout.tsx](src/app/layout.tsx) is the root layout — loads Geist/Geist Mono via
  `next/font/google` as CSS variables and imports the single global stylesheet.
- Tailwind v4 is configured entirely in CSS: [src/app/globals.css](src/app/globals.css) uses
  `@import "tailwindcss"` plus an `@theme inline` block that maps the CSS custom properties
  (`--background`, `--foreground`, the font variables) to Tailwind tokens. There is no
  `tailwind.config.*`; add design tokens in that `@theme` block. PostCSS wiring is
  [postcss.config.mjs](postcss.config.mjs).
- Route component props are typed by generated globals (`LayoutProps<"/">`, `PageProps<...>`)
  rather than hand-written interfaces — these come from `.next/types`, so run `next dev` or
  `next build` after adding a route for the types to resolve.

## Next.js 16 caveats

This Next version predates the model's training data, so verify APIs against
`node_modules/next/dist/docs/` (App Router material is under `01-app/`) before writing code
rather than relying on remembered Next.js conventions.

The `nextjs-agent-rules` block in [AGENTS.md](AGENTS.md) is generated and re-added by
`next dev`; commit it with your changes instead of reverting it.
