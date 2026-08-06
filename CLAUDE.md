# easy-af-website

A marketing site: landing pages, a blog, a contact form. No auth, no database.

## Design work

Any visual or frontend work on this repo goes through the `design-taste-frontend`
skill in `.claude/skills/`. Landing page, hero, sections, blog styling, redesigns:
use it. Do not hand-roll a design direction.

## Stack (already installed — do not re-install or swap)

- Next.js 16 App Router, root `app/` (no `src/`), Turbopack by default
- Tailwind CSS v4, CSS-first config in `app/globals.css` (`@theme`). There is no
  `tailwind.config.js` and there should not be one.
- Motion for animation: `import { motion } from "motion/react"`
- `@phosphor-icons/react` for icons — one family per project, do not add lucide
- Geist via `next/font/google`
- Biome for lint + format + import sorting (`npm run lint`), not ESLint/Prettier
- MDX via `@next/mdx`, file-routed. No content layer.

## Conventions

- Site name, URL, description, socials and nav live in `lib/site.ts`. Edit there,
  never inline.
- A new blog post is a new folder: `app/blog/<slug>/page.mdx` with
  `export const metadata` (needs `title`, `description`, `date`), then one line
  added to `lib/posts.ts`.
- Page metadata that sets any `openGraph` key must spread `openGraph` from
  `lib/site.ts` — metadata merges shallowly and would otherwise drop the rest.
- `picsum.photos` and `cdn.simpleicons.org` are pre-allowed in `next.config.ts`
  because the design skill reaches for them. Remove once real assets exist.
- Dark mode is mandatory and dual-mode, driven by `prefers-color-scheme`. There
  is no theme toggle and no theme script; don't add one unless asked.
- Never commit `.env.local`.
