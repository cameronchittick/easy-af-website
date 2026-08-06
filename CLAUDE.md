# easy-af-website

A marketing site: landing pages, no auth, no database. This is a scaffold — the
pages are deliberately empty stubs waiting to be designed.

## Design work

Any visual or frontend work on this repo goes through the `design-taste-frontend`
skill in `.claude/skills/`. Landing page, hero, sections, nav, redesigns: use it.
Do not hand-roll a design direction, and do not treat the current stub markup as
a style to match — there is no design here yet.

## Stack (already installed — do not re-install or swap)

- Next.js 16 App Router, root `app/` (no `src/`), Turbopack by default
- Tailwind CSS v4, CSS-first config in `app/globals.css` (`@theme`). There is no
  `tailwind.config.js` and there should not be one.
- Motion for animation: `import { motion } from "motion/react"`
- `@phosphor-icons/react` for icons — one family per project, do not add lucide
- Geist via `next/font/google`
- Biome for lint + format + import sorting (`npm run lint`), not ESLint/Prettier

## Conventions

- Site name, URL and description live in `lib/site.ts`. Edit there, never inline.
- Colours are `@theme` tokens in `app/globals.css`, used as generated utilities
  (`text-muted`, `border-line`, `bg-accent`). **Never** write
  `text-[--color-muted]` — Tailwind v4 reads brackets as a literal value and
  silently emits no CSS. Use `text-(--color-muted)` if you need the raw variable.
- Keep `@theme` at the top level. Nesting it inside `@media` hoists it and
  clobbers the light palette, leaving the site dark-only.
- Page metadata that sets any `openGraph` key must spread `openGraph` from
  `lib/site.ts` — metadata merges shallowly and would otherwise drop the rest.
- Add new routes to `app/sitemap.ts` as you create them.
- `picsum.photos` and `cdn.simpleicons.org` are pre-allowed in `next.config.ts`
  because the design skill reaches for them. Remove once real assets exist.
- Dark mode is mandatory and dual-mode, driven by `prefers-color-scheme`. There
  is no theme toggle and no theme script; don't add one unless asked.
- Never commit `.env.local`.

## Not installed, on purpose

No MDX or blog, no contact form, no shadcn, no zod, no `vercel.json`, no CI.
Add them when the site actually needs them — the reasoning for each omission,
with citations, is in `docs/research/nextjs-vercel-marketing-template.md`.
