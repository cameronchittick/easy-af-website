# easy-af-website

A Next.js marketing site scaffold whose actual product is the skill collection in
`.agents/skills/`. The app is deliberately empty — no palette, no components, no
design — so the skills decide everything visual.

## Design work goes through a skill. Always.

Any visual or frontend work uses one of the skills in `.agents/skills/`
(symlinked into `.claude/skills/` for Claude Code). Do not hand-roll a design
direction, and do not treat the current stub markup as a style to match — there
is no design here yet to be consistent with.

**These skills contradict each other on purpose.** `minimalist-ui` bans
`rounded-full` on primary buttons; `high-end-visual-design` requires pill CTAs.
`industrial-brutalist-ui` uses Inter Black; `minimalist-ui` and
`high-end-visual-design` ban Inter outright. `minimalist-ui` forbids gradients;
`high-end-visual-design` wants radial mesh gradients.

So: **pick one protocol per project and commit to it.** Read that skill in full
before writing UI. Never blend two, and never average them into something
inoffensive — that produces exactly the generic output every one of them exists
to prevent.

| Skill | Reach for it when |
|---|---|
| `design-taste-frontend` | Default for landing pages, portfolios, redesigns. Start here. |
| `high-end-visual-design` | Agency-tier polish: double-bezel cards, motion choreography |
| `minimalist-ui` | Editorial, document-style, warm monochrome |
| `industrial-brutalist-ui` | Swiss print or tactical CRT; data-dense, rigid grids |
| `gpt-taste` | GSAP-heavy scroll work, AIDA structure, bento grids |
| `imagegen-frontend-web` / `-mobile` | Generate design references before coding |
| `image-to-code` | Build from a generated or supplied design image |
| `brandkit` | Brand boards, logo systems, identity decks |
| `stitch-design-taste` | Producing a `DESIGN.md` for another agent |
| `redesign-existing-projects` | Auditing and upgrading what already exists |
| `full-output-enforcement` | Any task where truncated output would break things |

## Stack

Next.js 16 App Router, root `app/`, Turbopack. Tailwind v4, TypeScript, Biome
(`npm run lint`). Deployed on Vercel.

Installed so skills ship code instead of stopping to ask for installs — check
`package.json` before importing anything, per the skills' own dependency rule:

- `gsap` + `@gsap/react` — required by `gpt-taste`
- `motion` — `import { motion } from "motion/react"`
- `@phosphor-icons/react`

Never mix GSAP and Motion in the same component tree; they fight over frames.
Three.js is not installed — add it deliberately if a scene calls for it, and
lazy-load it.

**No icon library other than Phosphor is installed, and that is intentional:
every skill here bans or discourages `lucide-react`.**

## Facts, not preferences

These are mechanical constraints. They are not design opinions and no skill
overrides them.

- Site name, URL and description live in `lib/site.ts`. Edit there, never inline.
- `app/globals.css` has no tokens on purpose. Add `@theme` once a skill has
  chosen the palette.
- Tailwind v4 reads `text-[--color-muted]` as a literal value and silently emits
  **no CSS**. Use the generated utility (`text-muted`) or `text-(--color-muted)`.
- Keep `@theme` top-level. Nesting it in `@media` hoists it and clobbers the
  base values.
- Page metadata that sets any `openGraph` key must spread `openGraph` from
  `lib/site.ts` — metadata merges shallowly and would otherwise drop the rest.
- Add new routes to `app/sitemap.ts` as you create them.
- `picsum.photos` and `cdn.simpleicons.org` are pre-allowed in `next.config.ts`
  because the skills reach for both. `next/image` returns 400 for unlisted hosts.
- Geist in `app/layout.tsx` is a replaceable default. Never Inter, Roboto, Arial,
  Open Sans or Helvetica — every skill bans those.
- Never commit `.env.local`.

## Updating the skills

```
npx skills add Leonxlnx/taste-skill
```

Writes `.agents/skills/` (read natively by Codex, Copilot, Amp, Kimi, Antigravity
and others) and symlinks `.claude/skills/`. Both are committed; `skills-lock.json`
pins the versions.
