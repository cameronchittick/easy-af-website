# easy-af-website

A marketing site template that is easy as fuck to ship. Next.js 16, Tailwind v4,
deployed on Vercel. No auth, no database, no content layer, no ceremony —
about 30 files, and one of them is the design system.

**[Use this template](https://github.com/cameronchittick/easy-af-website/generate)** →
edit `lib/site.ts` → deploy.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fcameronchittick%2Feasy-af-website&project-name=my-site&repository-name=my-site&env=NEXT_PUBLIC_SITE_URL,CONTACT_WEBHOOK_URL&envDescription=Both%20optional.%20Your%20public%20URL%2C%20and%20a%20webhook%20for%20the%20contact%20form.)

## Quick start

```bash
npm install && npm run dev
```

Then, in order:

1. **`lib/site.ts`** — name, URL, description, socials, nav. Everything else
   reads from it, including `sitemap.xml` and `robots.txt`.
2. **`app/page.tsx`** — the landing page.
3. **`app/globals.css`** — colour tokens. They are plain placeholders on purpose.
4. Replace `app/icon.svg`, `app/apple-icon.png` and `app/opengraph-image.png`.

## The design skill is baked in

`.claude/skills/design-taste-frontend/` ships inside this repo, so anyone who
clones it and opens Claude Code gets it automatically — no plugin, no install
step. Ask for a landing page and it builds one from your brief instead of
another templated hero.

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

## Writing posts

A post is one file:

```
app/blog/your-slug/page.mdx
```

with a `metadata` export (`title`, `description`, `date`), plus one line added to
`lib/posts.ts`. That export feeds both the blog index and the page's `<title>`
and Open Graph tags. No frontmatter parser, no Contentlayer, no `fs`.

Past ~20 posts, swap `lib/posts.ts` for `fs` + a glob. Not before.

## The contact form

A Server Action that validates server-side, drops bots with a honeypot, and
POSTs JSON to `CONTACT_WEBHOOK_URL` — Slack, Discord, Zapier, Make, or a form
service. No email SDK and no API key, so one-click deploy still works. If the
variable is unset the form says so instead of failing silently.

The body includes a `text` field (what Slack and Discord render) plus `name`,
`email` and `message`.

**If you get spam**, add rate limiting. It needs a store this template
deliberately doesn't have — Upstash Redis via the Vercel Marketplace is the
short path.

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

**Speed Insights is deliberately not included.** It's $10 per project per month
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

## What this template does not have, on purpose

No `src/`, no route groups, no CI workflow, no Husky or lint-staged, no
Prettier, no shadcn, no zod, no `vercel.json`, no theme toggle, no
`tailwind.config.js`. Each of those is a decision you can make later, on your own
schedule, in a repo you already understand.

The reasoning for every one of them — with citations — is in
[`docs/research/nextjs-vercel-marketing-template.md`](docs/research/nextjs-vercel-marketing-template.md).
Delete that file if you're using this to build an actual site; it's a design
record, not documentation.

## License

MIT.
