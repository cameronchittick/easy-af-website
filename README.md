# easy-af-website

A marketing site scaffold that is easy as fuck to ship. Next.js 16, Tailwind v4,
deployed on Vercel, with the `design-taste-frontend` Claude Code skill baked in.

It is deliberately empty. You get the wiring — metadata, SEO, fonts, tokens,
lint, deploy — and no design, because the design is the part you should be
generating from your own brief rather than deleting from someone else's template.

**[Use this template](https://github.com/cameronchittick/easy-af-website/generate)** →
edit `lib/site.ts` → ask Claude for a landing page.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fcameronchittick%2Feasy-af-website&project-name=my-site&repository-name=my-site&env=NEXT_PUBLIC_SITE_URL&envDescription=Optional.%20Your%20public%20site%20URL%2C%20no%20trailing%20slash.)

## Quick start

```bash
npm install && npm run dev
```

Then edit `lib/site.ts` — name, URL, description. Metadata, `sitemap.xml` and
`robots.txt` all read from it, so your domain lives in exactly one place.

## The design skill is baked in

`.claude/skills/design-taste-frontend/` ships inside this repo, so anyone who
clones it and opens Claude Code gets it automatically — no plugin, no install
step. Ask for a landing page and it builds one from your brief.

It is a large file (~87KB), deliberately. Skill bodies load only when the skill
actually fires, so it costs nothing on a session where you never do design work.

Two things worth knowing:

- The skill wants Motion, Phosphor icons, Geist and Tailwind v4. All four are
  already installed, so it ships code instead of stopping to ask you to install
  things.
- It reaches for `picsum.photos` and `cdn.simpleicons.org` for placeholder
  images and logo walls. Both are pre-allowed in `next.config.ts`, because
  `next/image` returns a 400 for any host that isn't. Delete them once you have
  real assets.

Standard advice applies in both directions: review any `.claude/` directory in a
repo before you trust it. This one declares no `allowed-tools`, so it grants
itself nothing.

## What's wired up

| | |
|---|---|
| `app/layout.tsx` | `metadataBase`, title template, Geist via `next/font`, Analytics |
| `app/globals.css` | Tailwind v4 `@theme` tokens, dual light/dark via `prefers-color-scheme` |
| `app/sitemap.ts`, `app/robots.ts` | Generated from `lib/site.ts`. Add routes as you build them. |
| `app/icon.svg`, `app/opengraph-image.png` | Placeholder favicon and OG card — replace both |
| `biome.json` | Lint, format and import sorting in one dependency |
| `.github/dependabot.yml` | Monthly grouped updates, self-enabling downstream |

### One Tailwind v4 trap

Colours are `@theme` tokens used as **generated utilities** — `text-muted`,
`border-line`, `bg-accent`. The v3 habit of writing `text-[--color-muted]` is
dead: v4 reads brackets as a literal value and silently emits no CSS at all.
Use `text-(--color-muted)` if you need the raw-variable form.

Likewise, keep `@theme` at the top level. Nesting it inside a media query hoists
it and clobbers the light palette, leaving you dark-only.

## Deploying

Push to GitHub, import at [vercel.com/new](https://vercel.com/new). Everything
is auto-detected; there is no `vercel.json` and you don't need one. Every branch
gets its own preview URL, and merges to `main` go to production.

Set `NEXT_PUBLIC_SITE_URL` to your real domain once you have one, or your
sitemap and Open Graph tags will point at localhost.

One gotcha: **you cannot deploy a private repo owned by a GitHub organisation to
a Hobby team.** Make it public, or use Pro. A repo in your personal account is fine.

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

## What this scaffold does not have, on purpose

No blog or MDX, no contact form, no `src/`, no route groups, no CI workflow, no
Husky or lint-staged, no Prettier, no shadcn, no zod, no `vercel.json`, no theme
toggle, no `tailwind.config.js`.

Each is a decision you make later, on your own schedule, in a repo you already
understand. The reasoning for every one of them — with citations — is in
[`docs/research/nextjs-vercel-marketing-template.md`](docs/research/nextjs-vercel-marketing-template.md),
including the worked approach for adding an MDX blog when you want one.

Delete that file if you're using this to build an actual site; it's a design
record, not documentation.

## License

MIT.
