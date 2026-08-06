# easy-af-website

An empty Next.js marketing site with 14 anti-slop design skills baked in. Ask any
coding agent for a landing page and you get design, not another purple gradient.

The app ships with no palette, no components and no design on purpose. The skills
decide all of that from your brief.

**[Use this template](https://github.com/cameronchittick/easy-af-website/generate)**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fcameronchittick%2Feasy-af-website&project-name=my-site&repository-name=my-site&env=NEXT_PUBLIC_SITE_URL&envDescription=Optional.%20Your%20public%20site%20URL%2C%20no%20trailing%20slash.)

```bash
npm install && npm run dev
```

Edit `lib/site.ts` (name, URL, description), then type `/new-site`.

## The skills

They live in `.agents/skills/`, read natively by Codex, Copilot, Amp, Kimi,
Antigravity and others, and symlinked into `.claude/skills/` for Claude Code.
Committed, so they travel with the repo. No install step.

| | |
|---|---|
| `/new-site` | **Type this to start.** Brief, then a design read you approve, then build, then audit. |
| `design-taste-frontend` | The default protocol. Landing pages, portfolios, redesigns. |
| `high-end-visual-design` | Agency-tier polish, motion choreography |
| `minimalist-ui` | Editorial, warm monochrome |
| `industrial-brutalist-ui` | Swiss print or tactical CRT |
| `gpt-taste` | GSAP scroll work, bento grids |
| `imagegen-frontend-web` / `-mobile` | Design references before code |
| `image-to-code` | Build from a design image |
| `brandkit` | Brand boards, logo systems |
| `redesign-existing-projects` | Audit and upgrade what exists |
| `stitch-design-taste` | Emit a `DESIGN.md` for another agent |
| `full-output-enforcement` | Kill truncated output |

### Pick one. Do not blend them.

These protocols contradict each other deliberately. `minimalist-ui` bans
`rounded-full` buttons; `high-end-visual-design` requires pill CTAs. One forbids
gradients, another wants radial mesh. Averaging them produces exactly the generic
output they all exist to prevent.

Update or re-sync: `npx skills add Leonxlnx/taste-skill`

## Deploying

Push to GitHub, import at [vercel.com/new](https://vercel.com/new). Zero config.
Set `NEXT_PUBLIC_SITE_URL` to your domain or the sitemap points at localhost.

`AGENTS.md` holds the handful of things that fail silently rather than erroring.
Every agent reads it; `CLAUDE.md` is a one-line import of it.

On Windows, git checks out `.claude/skills/` as text files unless `core.symlinks`
is on. `.agents/skills/` has the real files, so only Claude Code is affected;
re-run `npx skills add Leonxlnx/taste-skill` to repair it.

## License

MIT. The skills come from
[Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) by
[@Leonxlnx](https://github.com/Leonxlnx), also MIT, redistributed under those
terms. `new-site` is original to this repo.
