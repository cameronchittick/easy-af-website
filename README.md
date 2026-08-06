# easy-af-website

A Next.js marketing site scaffold whose actual product is the **design skill
collection baked into it**. Clone it, open any coding agent, ask for a landing
page, and you get design instead of another purple-gradient AI template.

The app ships deliberately empty — no palette, no components, no design — because
the skills decide all of that from your brief.

**[Use this template](https://github.com/cameronchittick/easy-af-website/generate)** →
edit `lib/site.ts` → ask your agent for a landing page.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fcameronchittick%2Feasy-af-website&project-name=my-site&repository-name=my-site&env=NEXT_PUBLIC_SITE_URL&envDescription=Optional.%20Your%20public%20site%20URL%2C%20no%20trailing%20slash.)

## Baked in for every agent, not just Claude

The 13 skills live in **`.agents/skills/`** — the universal location read natively
by Codex, GitHub Copilot, Kimi Code CLI, Amp, Antigravity and a dozen others.
`.claude/skills/` symlinks to it for Claude Code. Both are committed, so they
travel with the repo. No install step, no plugin, no marketplace.

| Skill | Reach for it when |
|---|---|
| **`/new-site`** | **Starting a page from scratch. Type it by hand. Runs the brief, gates on a design read you approve, then ships and audits.** |
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
| `design-taste-frontend-v1` | The previous revision, kept for reference |

`/new-site` is the one you type; the rest fire on their own when the work matches.
It is written into `.agents/skills/` alongside the others, so every agent gets it,
and it survives `npx skills add` re-syncs (verified, not assumed).

### Pick one. Do not blend them.

These protocols **contradict each other on purpose**. `minimalist-ui` bans
`rounded-full` on primary buttons; `high-end-visual-design` requires pill CTAs.
`industrial-brutalist-ui` uses Inter Black; two others ban Inter outright. One
forbids gradients, another wants radial mesh.

That is the point. Averaging them produces exactly the inoffensive generic
output every one of them exists to prevent. Choose a protocol per project, read
it in full, and commit to it.

Updating or re-syncing:

```bash
npx skills add Leonxlnx/taste-skill
```

Standard advice applies: review any `.agents/` or `.claude/` directory before you
trust a repo. These skills run with full agent permissions.

## Quick start

```bash
npm install && npm run dev
```

Then edit `lib/site.ts` — name, URL, description. Metadata, `sitemap.xml` and
`robots.txt` all read from it, so your domain lives in exactly one place.

## What's wired up

| | |
|---|---|
| `.agents/skills/` | The 13 skills. The reason this template exists. |
| `app/layout.tsx` | `metadataBase`, title template, Geist via `next/font`, Analytics |
| `app/globals.css` | Empty of design on purpose — add `@theme` once a skill picks a direction |
| `app/sitemap.ts`, `app/robots.ts` | Generated from `lib/site.ts`. Add routes as you build them. |
| `next.config.ts` | `picsum.photos` and `cdn.simpleicons.org` pre-allowed for `next/image` |
| `biome.json` | Lint, format and import sorting in one dependency |
| `.github/dependabot.yml` | Monthly grouped updates, self-enabling downstream |

Pre-installed so the skills ship code instead of stopping to ask for installs —
they all check `package.json` before importing: `gsap` + `@gsap/react` (required
by `gpt-taste`), `motion`, `@phosphor-icons/react`.

No other icon library is installed, deliberately: every skill here bans or
discourages `lucide-react`. Three.js is not installed either — add it when a
scene actually calls for it, and lazy-load it. Never mix GSAP and Motion in one
component tree; they fight over frames.

### One Tailwind v4 trap

Tailwind v4 reads `text-[--color-muted]` as a literal value and silently emits
**no CSS at all** — the v3 habit is dead. Use the utility `@theme` generates
(`text-muted`), or `text-(--color-muted)` for the raw-variable form. And keep
`@theme` top-level: nesting it inside a media query hoists it and clobbers the
base values.

## Deploying

Push to GitHub, import at [vercel.com/new](https://vercel.com/new). Everything
is auto-detected; there is no `vercel.json` and you don't need one. Every branch
gets its own preview URL, and merges to `main` go to production.

Set `NEXT_PUBLIC_SITE_URL` to your real domain once you have one, or your sitemap
and Open Graph tags will point at localhost.

One gotcha: **you cannot deploy a private repo owned by a GitHub organisation to
a Hobby team.** Make it public, or use Pro. A personal-account repo is fine.

**Windows note:** `.claude/skills/` are symlinks. Git checks those out as plain
text files unless `core.symlinks` is enabled. `.agents/skills/` holds the real
files and works everywhere, so every other agent is unaffected; Claude Code users
on Windows should enable symlinks or re-run `npx skills add Leonxlnx/taste-skill`.

### Analytics

`@vercel/analytics` is wired into the layout but does nothing until you turn Web
Analytics on in the Vercel dashboard. Hobby includes 50,000 events/month.

**Speed Insights is deliberately not included** — it's $10 per project per month
on Pro, billed as soon as you enable it. If you want it:

```bash
npm i @vercel/speed-insights
```

then add `<SpeedInsights />` from `@vercel/speed-insights/next` next to
`<Analytics />` in `app/layout.tsx`.

## Scripts

| | |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run lint` | Biome — lint, format check, import order |
| `npm run format` | Biome, writing fixes |

## Not included, on purpose

No blog or MDX, no contact form, no `src/`, no route groups, no CI workflow, no
Husky or lint-staged, no Prettier, no `vercel.json`.

Each is a decision you make later, in a repo you already understand. Platform
reasoning — Vercel pricing, GitHub template mechanics, Next.js metadata — is in
[`docs/research/nextjs-vercel-marketing-template.md`](docs/research/nextjs-vercel-marketing-template.md),
including a worked approach for adding an MDX blog. Its design conclusions
predate this skill collection; **where that document and a skill disagree, the
skill wins.** Delete it if you're building an actual site — it's a design record,
not documentation.

## License

MIT for the scaffold. The skills in `.agents/skills/` come from
[Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) and carry their
own terms — check that repo before redistributing.
