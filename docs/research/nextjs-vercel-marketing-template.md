# Easy-AF Marketing Site Template — Repository Structure Research

> **Why this file lives here:** the repo at `/Users/cameronchittick/Code/cameronchittick/easy-af-website` was completely empty (not even a git repo) when this research was done. There was **no existing notes or docs convention to follow**, so `docs/research/` was chosen as a conventional, self-explanatory location. Move it if a different convention emerges.

**Research date:** 2026-08-06
**Method:** primary sources only (nextjs.org/docs, vercel.com/docs, code.claude.com/docs, docs.github.com, tailwindcss.com/docs, tool-owned docs), plus first-hand `npm view` version checks. Where a claim could not be verified against a primary source it is labelled **unverified**.

---

## 0. Version and date stamp

Verified first-hand via `npm view <pkg> version` on **2026-08-06**:

| Package | Version | Note |
|---|---|---|
| `next` | **16.3.0** | `dist-tags.latest`. Every nextjs.org doc page fetched self-reports `version: 16.3.0` in frontmatter, so live docs match. |
| `react` / `react-dom` | **19.2.8** | Next 16 upgrade guide pins React 19.2 ([v16 upgrade guide](https://nextjs.org/docs/app/guides/upgrading/version-16#react-192)) |
| `tailwindcss` | **4.3.3** | tailwindcss.com install page self-reports **v4.3** |
| `@tailwindcss/postcss` | **4.3.3** | required PostCSS plugin for v4 |
| `typescript` | **7.0.2** | `latest`. Next.js only requires **TypeScript 5.1+** ([system requirements](https://nextjs.org/docs/app/getting-started/installation#system-requirements)) |
| `motion` | **13.0.0** | the library the design skill mandates |
| `@phosphor-icons/react` | **2.1.10** | the design skill's first-choice icon library |
| `geist` | **1.7.2** | also available via `next/font/google` |
| `@next/mdx` | **16.3.0** | versioned in lockstep with Next |
| `eslint-config-next` | **16.3.0** | versioned in lockstep with Next |
| `@vercel/analytics` | **2.0.1** | |
| `@vercel/speed-insights` | **2.0.0** | recommended **out** of the template — see §5.3 |
| `@vercel/config` | **0.5.6** | real package; recommended **out** — see §5.1 |
| `@biomejs/biome` | **2.5.7** | recommended **in** as the single lint+format tool — see §7.5 |
| `eslint` / `eslint-config-next` | 10.8.0 / 16.3.0 | the alternative to Biome; both are viable |
| `shadcn` (CLI) | **4.16.2** | recommended **out** — see §7.4 |
| `pnpm` | **11.20.0** | recommended **out** — see §7.3 |
| `prettier` / `husky` / `lint-staged` / `@commitlint/cli` | 3.9.6 / 9.1.7 / 17.3.0 / 21.2.1 | all recommended **out** — see §7.6 |
| Node.js | **v24 "Krypton" is Active LTS**; v26 is Current; v20 and v25 are EOL ([previous releases](https://nodejs.org/en/about/previous-releases)) | Next.js requires **Node 20.9+** ([system requirements](https://nextjs.org/docs/app/getting-started/installation#system-requirements)). Target 24. |
| Corepack | **unbundled from Node as of v25.0.0** ([Corepack README](https://github.com/nodejs/corepack#readme)) | `nodejs.org/api/corepack.html` now 308-redirects away. Drives the npm decision (§7.3). |

Anything below that depends on these versions goes stale when they move. The riskiest staleness, in order: **Vercel's pricing pages** (the Speed Insights $10/project/month figure is the single most decision-relevant number here), **Next.js majors** (16 removed `next lint`, renamed `middleware.ts` → `proxy.ts`, and changed `next/image` defaults), and **the Corepack/Node situation**, which moved recently enough that most secondary sources are still wrong about it.

**Where the docs contradicted prior belief, and I went with the docs:** `next lint` is removed rather than deprecated; Corepack is no longer bundled with Node; shadcn's default base is Base UI, not Radix; TypeScript 7 has shipped stable and must be installed locally for `next build` to use it; `next-env.d.ts` is now meant to be gitignored; and `create-next-app` ships a first-class `--biome` flag with a maintained config.

---

## 1. Recommended file tree

Every entry has a one-line reason. Anything I could not justify is in the **cut list** (§9) instead.

```
easy-af-website/
├── .claude/
│   └── skills/                        # No settings.json — a template should not pre-grant permissions for strangers (§3.5)
│       └── design-taste-frontend/
│           ├── SKILL.md               # THE payload. Project skills auto-load for anyone who opens the repo — no install step. (§3)
│           └── reference/
│               ├── motion-skeletons.md   # GSAP sticky-stack + horizontal-pan code, loaded on demand only
│               ├── pattern-vocabulary.md # Hero/nav/grid/scroll pattern names, lookup-only
│               ├── redesign-protocol.md  # Only relevant in redesign mode, which a fresh template never is
│               ├── block-library.md      # Block schema contract, referenced not executed
│               └── design-systems.md     # Appendices A–C: install commands + canonical source links
├── app/
│   ├── layout.tsx                     # Root layout: <html lang>, next/font, metadataBase, title.template
│   ├── page.tsx                       # The landing page. The one file most consumers will actually edit.
│   ├── globals.css                    # `@import "tailwindcss"` + `@theme` tokens. The single styling entry point.
│   ├── not-found.tsx                  # 404. Marketing sites get crawled; a branded 404 is 10 lines.
│   ├── favicon.ico                    # File-based metadata; only valid in app/ root
│   ├── icon.png                       # File-based app icon, auto-wired into <head>
│   ├── apple-icon.png                 # File-based Apple touch icon, auto-wired
│   ├── opengraph-image.png            # Static 1200×630 OG image; docs prefer file API over config export
│   ├── opengraph-image.alt.txt        # Alt text for the OG image; accessibility + the file API reads it
│   ├── sitemap.ts                     # File convention → /sitemap.xml. SEO table stakes for marketing.
│   ├── robots.ts                      # File convention → /robots.txt, and points crawlers at the sitemap
│   ├── contact/
│   │   ├── page.tsx                   # Contact form (Client Component for useActionState)
│   │   └── actions.ts                 # Server Action: validate + forward to CONTACT_WEBHOOK_URL
│   └── blog/
│       ├── layout.tsx                 # Prose wrapper for MDX posts, so posts need zero styling
│       ├── page.tsx                   # Blog index, built from lib/posts.ts
│       └── hello-world/
│           └── page.mdx               # One example post. Adding a post = adding a folder.
├── components/
│   ├── site-header.tsx                # Shared nav; skill caps nav at one line / ≤80px
│   └── site-footer.tsx                # Shared footer
├── lib/
│   ├── site.ts                        # Single source of truth: name, url, description, socials. The one file to edit on day 1.
│   └── posts.ts                       # Blog index array; one line per post, re-exports each post's own metadata
├── public/
│   └── .gitkeep                       # Keeps the folder in git so next/image static assets have a home
├── .github/
│   └── dependabot.yml                 # Self-enabling downstream; the only .github file that earns its place (§6.2)
├── CLAUDE.md                          # Points Claude at the skill and states non-negotiable stack facts (§3.4)
├── README.md                          # Use-this-template → deploy → edit lib/site.ts. Includes Deploy button.
├── LICENSE                            # A template nobody may legally reuse is not a template (§6.5)
├── .gitignore                         # CNA's canonical list + `!.env.example` (§6.4)
├── .env.example                       # Documents CONTACT_WEBHOOK_URL and NEXT_PUBLIC_SITE_URL
├── next.config.ts                     # MDX wiring + image remotePatterns the skill needs + cache TTL
├── mdx-components.tsx                 # REQUIRED at project root by @next/mdx for App Router (§4.7)
├── postcss.config.mjs                 # Tailwind v4's required PostCSS plugin registration
├── biome.json                         # One file for lint + format + import sorting (§7.5)
├── tsconfig.json                      # From create-next-app: strict, bundler resolution, `@/*` alias
├── package.json                       # deps + scripts
└── package-lock.json                  # npm lockfile — Vercel infers the package manager from it (§7.3)
```

**~33 files.** Everything else a Next.js template usually ships is in the cut list (§9).

Dependencies this implies, and nothing more: `next`, `react`, `react-dom`, `tailwindcss`, `@tailwindcss/postcss`, `postcss`, `motion`, `@phosphor-icons/react`, `@next/mdx`, `@mdx-js/loader`, `@mdx-js/react`, `@types/mdx`, `@vercel/analytics`; dev: `typescript`, `@types/node`, `@types/react`, `@types/react-dom`, `@biomejs/biome`.

---

## 2. The design skill: what it actually demands of the project

I read the local skill at `/Users/cameronchittick/.claude/skills/design-taste-frontend/SKILL.md` (87,253 bytes, 1,206 lines, ~12,810 words). This section is grounded in that file, not in docs.

**Frontmatter is already spec-clean:**

```yaml
name: design-taste-frontend
description: Anti-slop frontend skill for landing pages, portfolios, and redesigns. ...
```

The `description` is **269 characters**, comfortably under the documented 1,536-character listing cap (§3.2). Nothing needs changing to ship it.

### What the skill requires the repo to already have

These are direct reads of the skill body. **Each one has to be reflected in the template or the skill and the template will fight.**

| Skill section | Demand | Template consequence |
|---|---|---|
| §3.A Stack | "**Styling:** **Tailwind v4** (default)… For v4: do NOT use `tailwindcss` plugin in `postcss.config.js`. Use `@tailwindcss/postcss` or the Vite plugin." | Template ships Tailwind 4.3.3 + `postcss.config.mjs` with `@tailwindcss/postcss`. Exactly matches Tailwind's own Next.js guide. |
| §3.A Stack | "**Animation:** **Motion**… Import from `motion/react`." | `motion` must be in `package.json` (see next row). |
| §3.F | "Before importing ANY 3rd-party library, check `package.json`. If the package is missing, output the install command first." | **This is the key one.** If `motion` and an icon library are absent, the skill will stop and emit install commands instead of shipping code. Pre-installing them removes a round-trip on the consumer's very first prompt. |
| §3.A Stack | "**Fonts:** Always use `next/font`… Never link Google Fonts via `<link>`." | Root layout must already use `next/font`. |
| §3.C Icons | Allowed: `@phosphor-icons/react`, `hugeicons-react`, `@radix-ui/react-icons`, `@tabler/icons-react`. "**Discouraged:** `lucide-react`." "One family per project." | Ship **Phosphor**. This is the direct reason shadcn/ui is cut (§5.4) — shadcn's components import lucide. |
| §4.1 Typography | "`Inter`… **Discouraged as default**. Pick `Geist`, `Outfit`, …" | Ship **Geist** via `next/font/google`. Conveniently also `create-next-app`'s own default. |
| §6.C / §8 | "Dark Mode (**mandatory** for any consumer-facing page)… Never ship light-only or dark-only." "Respect `prefers-color-scheme`." | Template must be dual-mode from file one, and needs a no-flash theme script. |
| §3.E | `min-h-[100dvh]` never `h-screen`; standard breakpoints; `max-w-7xl` containers. | Tailwind defaults already satisfy this; nothing to configure. |
| §6.D | "Hero image must be `next/image priority`". | Landing page hero must use `next/image`, not `<img>`. `eslint-config-next` enforces this anyway via `@next/next/no-img-element`. |
| §6.F | "Document the z-index scale in a project constants file." | Small; folded into `lib/site.ts` or `globals.css` `@theme`. Does not need its own file. |
| §4.8 Images | Mandates real images: `https://picsum.photos/seed/{seed}/{w}/{h}` for placeholder photography, and `https://cdn.simpleicons.org/{slug}/{color}` for logo walls. | **Conflict — see below.** |

### The one hard conflict: remote images

The skill instructs the agent to reach for `picsum.photos` and `cdn.simpleicons.org`. Next.js blocks unlisted remote hosts:

> "Use `remotePatterns` in your `next.config.js` file to allow images from specific external paths and block all others… Any other protocol, hostname, port, or unmatched path will respond with `400` Bad Request." — [next/image `remotePatterns`](https://nextjs.org/docs/app/api-reference/components/image#remotepatterns)

So out of the box, a skill-driven agent writes `<Image src="https://picsum.photos/...">` and the consumer gets a **400**. The template must pre-allow both hosts in `next.config.ts`:

```ts
images: {
  remotePatterns: [
    new URL('https://picsum.photos/**'),
    new URL('https://cdn.simpleicons.org/**'),
  ],
},
```

The array-of-`URL` form is documented and was added in v15.3.0 ([same page](https://nextjs.org/docs/app/api-reference/components/image#remotepatterns)). Note the docs also warn "Be as specific as possible to prevent malicious usage" ([images guide](https://nextjs.org/docs/app/getting-started/images)) — these two hosts are deliberately narrow, and the README should tell consumers to delete them once real assets exist.

### What the skill does **not** require

- **Not shadcn.** shadcn is one row in the skill's design-system table ("Modern SaaS where you own the components"). For the indie/Tailwind case the skill's own default row is "**Tailwind v4 utilities + `dark:` variant** — Default for indie + small team builds." Pre-installing shadcn pre-decides a choice the skill wants to make per brief.
- **Not GSAP.** §10 "Animation Library Choice" makes Motion the default and GSAP only "for full-page scrolltelling and scroll hijacks", with "**NEVER mix GSAP / Three.js with Motion in the same component tree.**" Ship Motion only.
- **No design-token system of its own.** §8.B: "Do Not Prescribe Specific Colors Here… The brief and brand decide." It requires *a* strategy (Tailwind `dark:` **or** CSS variables), consistently applied — not specific tokens. So `globals.css` should establish the *mechanism* (`@theme` + `dark:`) and leave the values as obvious placeholders.

---

## 3. Baking in `design-taste-frontend`

### 3.1 The exact path, and why the symlink is the whole problem

The local skill is a symlink to `~/.agents/skills/design-taste-frontend/`. That path does not exist on a consumer's machine, so "baked in" must mean **the file physically ships inside the repo**. It must live at:

```
.claude/skills/design-taste-frontend/SKILL.md
```

Confirmed verbatim by the skills doc's own table ([Claude Code — skills](https://code.claude.com/docs/en/skills)):

| Level | Location | Available in |
|---|---|---|
| Personal | `~/.claude/skills/<skill-name>/SKILL.md` | All your projects |
| Project | `.claude/skills/<skill-name>/SKILL.md` | This project only |

**Practical note for the author (you):** because you have this skill personally at `~/.claude/skills/`, and the docs state "enterprise overrides personal, and personal overrides project" ([skills](https://code.claude.com/docs/en/skills)), *your* machine will keep using your personal copy. You will not be testing what consumers get. Verify the shipped copy in a clean checkout, or temporarily rename the personal one.

### 3.2 Does it auto-activate for a consumer? Yes.

- **No install step, no plugin, no marketplace.** The doc's distribution guidance is one line: "**Project skills**: Commit `.claude/skills/` to version control" ([skills](https://code.claude.com/docs/en/skills)).
- **Discovery:** "Project skills load from `.claude/skills/` in the directory where you start Claude Code and in every parent directory up to the repository root." ([skills](https://code.claude.com/docs/en/skills))
- **Activation is by `description`:** "What the skill does and when to use it. Claude uses this to decide when to apply the skill." Skills are model-invoked by default — "By default, both you and Claude can invoke any skill." ([skills](https://code.claude.com/docs/en/skills))
- **Live reload:** "Claude Code watches skill directories for file changes… picks up the change within the current session, without a restart." ([skills](https://code.claude.com/docs/en/skills))

Frontmatter fields are all optional; only `description` is "Recommended". Character caps that matter: the combined `description` + `when_to_use` "is truncated at **1,536 characters** in the skill listing"; `compatibility` accepts "up to 500 characters" ([skills](https://code.claude.com/docs/en/skills)). The existing 269-char description is fine as-is.

One caveat to put in the README: `allowed-tools` in a project skill "takes effect after you accept the workspace trust dialog for that folder" and the docs warn "Review project skills before trusting a repository, since a skill can grant itself broad tool access" ([skills](https://code.claude.com/docs/en/skills)). Our skill declares no `allowed-tools`, so there is nothing to grant — but a consumer being told *why* a `.claude/` directory is in their new repo is good manners.

### 3.3 Is 87KB a problem? Partly — and less than it looks.

**The documented guidance is explicit:**

> "Keep `SKILL.md` under 500 lines. Move detailed reference material to separate files." — [skills](https://code.claude.com/docs/en/skills)

At **1,206 lines** the skill is ~2.4× over that tip.

**But the cost model matters more than the tip.** The docs are equally explicit that a skill body is not a per-session cost:

> "a skill's body loads only when it's used, so long reference material costs almost nothing until you need it." — [skills](https://code.claude.com/docs/en/skills)

What loads *every* session is only the skill listing entry — name plus description — and that listing is capped: descriptions are truncated at 1,536 chars, and the whole listing gets a budget of "1% of the model's context window" ([skills](https://code.claude.com/docs/en/skills)). At 269 chars, this skill's always-on footprint is negligible.

So the 87KB is a **per-activation** cost (~22–25k tokens when it fires), not a per-session tax. Shipping it whole genuinely works.

**Recommendation: split it anyway, but only once, along the obvious seam.** Not to satisfy the 500-line tip for its own sake, but because ~45% of the file is material the model does not need in order to *make design decisions* — it is lookup material it needs only when a specific pattern comes up. Supporting files are loaded on demand ([skills](https://code.claude.com/docs/en/skills)), so moving them is a pure win on every activation that doesn't need them.

Concrete split (line ranges from the current file):

| Move to | Skill sections | ~Lines |
|---|---|---|
| `reference/motion-skeletons.md` | §5.A Sticky-Stack, §5.B Horizontal-Pan, §5.C Scroll-Reveal, §5.D Forbidden patterns | 167 |
| `reference/pattern-vocabulary.md` | §10 Reference Vocabulary | 78 |
| `reference/redesign-protocol.md` | §11 Redesign Protocol | 52 |
| `reference/block-library.md` | §12 The Block Library | 61 |
| `reference/design-systems.md` | Appendices A, B, C | 224 |
| **stays in SKILL.md** | §0 Brief inference, §1 Dials, §2 System map, §3 Architecture, §4 Directives, §6 Guardrails, §7 Dial definitions, §8 Dark mode, §9 AI Tells, §13 Out of scope, §14 Pre-flight | **~620** |

That leaves SKILL.md at roughly **620 lines** — still above 500, and I am not going to pretend otherwise. Cutting further would mean cutting §4 (bias correction) or §9/§14 (the AI-tell bans and pre-flight checklist), which are the parts that actually do the anti-slop work on every single generation. **Recommendation: accept ~620 lines and stop.** The 500 figure is published as a `Tip`, not a limit, and nothing in the docs describes a failure mode for exceeding it.

Per the docs, the moved files must be linked from SKILL.md so Claude knows they exist:

```markdown
## Additional resources

- Canonical GSAP/Motion skeletons: [reference/motion-skeletons.md](reference/motion-skeletons.md)
- Pattern name vocabulary: [reference/pattern-vocabulary.md](reference/pattern-vocabulary.md)
- Redesign audit protocol (only for redesigns): [reference/redesign-protocol.md](reference/redesign-protocol.md)
- Block library schema: [reference/block-library.md](reference/block-library.md)
- Official design-system packages and sources: [reference/design-systems.md](reference/design-systems.md)
```

**If you would rather not maintain a fork of your own skill, ship the 87KB file verbatim.** It works, it auto-activates, and the only cost is tokens on activation. The split is an optimization, not a correctness fix. Say so honestly in the README so consumers know the file is large by design.

### 3.4 What `CLAUDE.md` should say to make the skill fire reliably

CLAUDE.md and skills have different loading models, and the docs are clear about the division of labour:

> "CLAUDE.md files are loaded into the context window at the start of every session, consuming tokens alongside your conversation." … "**Size**: target under 200 lines per CLAUDE.md file. Longer files consume more context and reduce adherence." — [memory](https://code.claude.com/docs/en/memory)

> "If an entry is a multi-step procedure or only matters for one part of the codebase, move it to a skill… instead." — [memory](https://code.claude.com/docs/en/memory)

So: **do not duplicate the skill in CLAUDE.md.** CLAUDE.md's job is (a) the handful of stack facts that apply to *every* session regardless of the skill, and (b) a nudge that makes the skill's `description` match more reliably. Something like 30 lines:

```markdown
# easy-af-website

A marketing site: landing pages, a blog, a contact form. No auth, no database.

## Design work

Any visual or frontend work on this repo goes through the `design-taste-frontend`
skill in `.claude/skills/`. Landing page, hero, sections, blog styling, redesigns:
use it. Do not hand-roll a design direction.

## Stack (already installed — do not re-install or swap)

- Next.js 16 App Router, root `app/` (no `src/`)
- Tailwind CSS v4, CSS-first config in `app/globals.css` (`@theme`), no `tailwind.config.js`
- Motion (`import { motion } from "motion/react"`) for animation
- `@phosphor-icons/react` for icons — one icon family, do not add lucide
- Geist via `next/font/google`
- Dark mode is mandatory and dual-mode; `prefers-color-scheme` by default

## Conventions

- Site name, URL, description and socials live in `lib/site.ts`. Edit there, not inline.
- A new blog post is a new folder: `app/blog/<slug>/page.mdx` with `export const metadata`,
  then one line added to `lib/posts.ts`.
- `picsum.photos` and `cdn.simpleicons.org` are pre-allowed in `next.config.ts`.
  Remove them once real assets exist.
- Never commit `.env.local`.
```

Two things to be honest about:

1. **CLAUDE.md is not enforcement.** "Claude treats them as context, not enforced configuration… To block an action regardless of what Claude decides, use a `PreToolUse` hook instead." ([memory](https://code.claude.com/docs/en/memory)) A line saying "use the skill" raises the odds; it does not guarantee.
2. **`.claude/rules/` with `paths:` frontmatter is the sharper tool if the nudge proves unreliable.** Rules support path-scoping — "These conditional rules only apply when Claude is working with files matching the specified patterns" ([memory](https://code.claude.com/docs/en/memory)) — so a `.claude/rules/frontend.md` with `paths: ["app/**/*.tsx", "components/**/*.tsx"]` would fire exactly when someone touches UI. **I am not recommending it for v1** (it's a second mechanism saying the same thing as CLAUDE.md), but it is the documented escalation if the skill doesn't reliably fire.

### 3.5 `.claude/settings.json` vs `settings.local.json`

The split is documented and unambiguous: `settings.json` is the **committed**, shared, project-level file; `settings.local.json` is **gitignored** personal overrides, and "When Claude Code saves a setting to this file, it automatically adds `**/.claude/settings.local.json` to your global git excludes" ([claude-directory](https://code.claude.com/docs/en/claude-directory)).

**What belongs in a distributed template's `settings.json`: nothing. Omit the file.** A template ships to strangers; pre-granting tool permissions or enabling hooks on their behalf is presumptuous, and in the case of `permissions.allow` it is a security smell — the consumer accepted a *website template*, not a permission grant. An empty `{}` is equally pointless. Ship no `settings.json` and let each consumer's own `settings.local.json` accumulate naturally. **Do not** ship `settings.local.json` — by definition it is not yours to ship.

Because Claude Code writes `settings.local.json` into the *global* git excludes rather than the repo's `.gitignore`, a consumer cloning fresh is protected automatically. Adding `.claude/settings.local.json` to the template's `.gitignore` anyway costs one line and removes the dependency on that behaviour. Do it.

---

## 4. Next.js findings

### 4.1 Version and what's live in 16.3.0

Turbopack is the default: "Turbopack is now the **default bundler** in Next.js. No configuration is needed" ([Turbopack](https://nextjs.org/docs/app/api-reference/turbopack#getting-started)); `v16.0.0 | Turbopack becomes the default bundler`. Opt out with `next build --webpack`. No `--turbopack` flag in `package.json` scripts anymore.

**Cache Components / `use cache` / PPR are opt-in and should stay off.** In v16 the separate `ppr` flag and `experimental_ppr` segment config were removed and folded into one `cacheComponents: true` flag ([cacheComponents](https://nextjs.org/docs/app/api-reference/config/next-config-js/cacheComponents)). The upgrade guide is direct about the cost: "Enabling `cacheComponents` is not a rename-only change: it can surface build errors for uncached data outside of `<Suspense>` and requires adopting the Cache Components model" ([v16 upgrade guide](https://nextjs.org/docs/app/guides/upgrading/version-16#experimentaldynamicio-and-experimentalusecache)). A marketing site is static content that already fully prerenders — this buys a new mental model and new build failures for zero gain. **Leave it off.**

Other v16 changes worth knowing when writing template code: `params`/`searchParams`/`cookies()`/`headers()` are async-only; **`middleware.ts` is renamed `proxy.ts`**; AMP removed; `serverRuntimeConfig`/`publicRuntimeConfig` removed ([v16 upgrade guide](https://nextjs.org/docs/app/guides/upgrading/version-16)).

### 4.2 `app/` vs `src/app/` — what the docs actually say

The docs take no side. Verbatim:

> "Next.js is **unopinionated** about how you organize and colocate your project files." — [project structure](https://nextjs.org/docs/app/getting-started/project-structure)

> "Next.js supports storing application code (including `app`) inside an optional `src` folder. This separates application code from project configuration files which mostly live in the root of a project." — [same page](https://nextjs.org/docs/app/getting-started/project-structure#src-folder)

The dedicated [`src` folder page](https://nextjs.org/docs/app/api-reference/file-conventions/src-folder) frames it as a pattern "preferred by some individuals and teams", and notes `/public`, `package.json`, `next.config.js`, `tsconfig.json` and `.env.*` all stay at the root regardless — and that "`src/app` or `src/pages` will be ignored if `app` or `pages` are present in the root directory."

The docs close the section with: "The simplest takeaway is to choose a strategy that works for you and your team and be consistent across the project."

**Recommendation: root `app/`.** See §5.

### 4.3 Colocation, route groups, private folders

The colocation rule is the important one, because it kills a lot of imagined structure:

> "a route is **not publicly accessible** until a `page.js` or `route.js` file is added to a route segment. And, even when a route is made publicly accessible, only the **content returned** by `page.js` or `route.js` is sent to the client. This means that **project files** can be **safely colocated** inside route segments in the `app` directory without accidentally being routable." — [colocation](https://nextjs.org/docs/app/getting-started/project-structure#colocation)

So **only `page` and `route` create URLs.** Components, helpers, styles, tests can sit anywhere inside `app/`.

Consequently: "Since files in the `app` directory can be safely colocated by default, **private folders are not required for colocation**" ([private folders](https://nextjs.org/docs/app/getting-started/project-structure#private-folders)). `_folder` opts a folder and all subfolders out of routing; its remaining real use is "Avoiding potential naming conflicts with future Next.js file conventions." A marketing template with ~4 routes has no such conflict. **Cut `_folder`.**

Route groups `(folder)` are "for organizational purposes and should **not be included** in the route's URL path" ([route groups](https://nextjs.org/docs/app/getting-started/project-structure#route-groups)). Their documented payoff is multiple root layouts or opting a subset of routes into a layout. With one root layout plus a `app/blog/layout.tsx`, there is nothing left for a group to do. Caveats from the [route groups reference](https://nextjs.org/docs/app/api-reference/file-conventions/route-groups#caveats) also bite: `(marketing)/about/page.js` and `(shop)/about/page.js` both resolve to `/about` and **error**, and navigating between different root layouts triggers a full page load. **Cut route groups.**

### 4.4 Metadata API for SEO

**Static object over `generateMetadata`.** Verbatim: "If metadata doesn't depend on request information, it should be defined using the static `metadata` object rather than `generateMetadata`" ([generateMetadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)). Both are Server-Component-only, and "You cannot export both the `metadata` object and `generateMetadata` function from the same route segment."

**`metadataBase` is effectively mandatory**, not optional: it is "a convenience option to set a base URL prefix for `metadata` fields that require a fully qualified URL", and "Using a relative path in a URL-based `metadata` field without configuring a `metadataBase` will cause a **build error**" ([metadataBase](https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase)). Set it once in `app/layout.tsx` from `lib/site.ts`.

**Merging gotcha to design around:** metadata merges *shallowly* root→leaf, so a page that sets any `openGraph` key **replaces the whole `openGraph` object** from the layout. The docs' own fix is hoisting shared values into a variable and spreading them ([overwriting fields](https://nextjs.org/docs/app/api-reference/functions/generate-metadata#overwriting-fields)). `lib/site.ts` is exactly the right home for that shared object.

**Prefer the file-based conventions.** The docs say so twice: "It may be more convenient to use the file-based Metadata API for Open Graph images. Rather than having to sync the config export with actual files, the file-based API will automatically generate the correct metadata for you" ([opengraph-image](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image)). Supported files ([project structure](https://nextjs.org/docs/app/getting-started/project-structure#metadata-file-conventions)): `favicon.ico` (app root only), `icon.*`, `apple-icon.*`, `opengraph-image.*`, `twitter-image.*`, plus `.alt.txt` companions. Build-time size limits are enforced: **twitter-image ≤ 5MB, opengraph-image ≤ 8MB — "If the image file size exceeds these limits, the build will fail."**

**Template recommendation:** static `opengraph-image.png` at 1200×630 plus `opengraph-image.alt.txt`. **Skip `twitter-image`** — Twitter falls back to the OG image, so a second file is a second thing to keep in sync for no gain. **Skip dynamic `next/og` in v1.** `ImageResponse` from `next/og` works and is statically optimized at build time, but it comes with real constraints — "Only flexbox and a subset of CSS properties are supported. Advanced layouts (e.g. `display: grid`) will not work" ([opengraph-image](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image)) — and per-post OG images are a nice-to-have a consumer can add to `app/blog/[slug]/` when they care. Note `next/og` is bundled in the App Router; no `@vercel/og` install needed.

### 4.5 `sitemap.ts` and `robots.ts`

Both live in the **root of `app/`** and are "special Route Handler[s]… cached by default unless [they use] a Request-time API or dynamic config option."

Sitemap shape ([sitemap](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)): default-export a (possibly async) function returning `MetadataRoute.Sitemap`, an array of `{ url, lastModified?, changeFrequency?, priority?, alternates? }`. `generateSitemaps` exists for splitting past Google's 50,000-URL limit — irrelevant here.

Robots shape ([robots](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots)) — the canonical minimal version is genuinely this small:

```ts
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: '*', allow: '/' }, sitemap: 'https://acme.com/sitemap.xml' }
}
```

New in 16.3.0: an `other` field for non-standard per-agent directives. Static `app/sitemap.xml` and `app/robots.txt` also work if you'd rather not write code — but the `.ts` versions read the site URL from `lib/site.ts`, which means the consumer changes their domain in exactly one place. Worth the four lines.

### 4.6 `next/font` and `next/image`

**`next/font`** is one of the highest value-per-line features for a marketing site, and the reason is privacy and CLS, not convenience:

> "The `next/font` module automatically optimizes your fonts and removes external network requests for improved privacy and performance. It includes **built-in self-hosting** for any font file. This means you can optimally load web fonts with **no layout shift**." — [fonts](https://nextjs.org/docs/app/getting-started/fonts)

And specifically for Google fonts: "Fonts are included as static assets and served from the same domain as your deployment, meaning **no requests are sent to Google** by the browser when the user visits your site." That is a GDPR-relevant fact for a marketing site, not just a perf one.

Import paths: `next/font/google` (named export per family) and `next/font/local` (default export `localFont`). "We recommend using variable fonts for the best performance and flexibility"; non-variable fonts need an explicit `weight`. "Fonts are scoped to the component they're used in. To apply a font to your entire application, add it to the Root Layout." Geist is a variable font available via `next/font/google` — it satisfies both the docs' recommendation and the design skill's anti-Inter rule.

**`next/image`** gives a marketing site four documented things: size optimization (right-sizing + WebP), visual stability (no layout shift), faster loads (lazy loading + blur placeholders), and asset flexibility ([images](https://nextjs.org/docs/app/getting-started/images)).

Caveats that matter for template code:
- A **static `import`** gets automatic `width`/`height`/`blurDataURL`. A string path like `/hero.png` from `public/` does **not** — you must supply `width`/`height` or `fill`.
- Remote hosts need `remotePatterns` (§2). `images.domains` is deprecated as of v16.
- v16 changed defaults: `minimumCacheTTL` went 60s → **4 hours**; `qualities` is now **only `[75]`**; `16` was dropped from `imageSizes` ([v16 next/image changes](https://nextjs.org/docs/app/guides/upgrading/version-16#nextimage-changes)).

### 4.7 MDX for the blog — the honest version

Official guide: [MDX](https://nextjs.org/docs/app/guides/mdx). What `@next/mdx` gives you and nothing more: it "sources data from **local** files", letting `.md`/`.mdx` be pages or imports.

Setup cost, precisely: **four packages** (`@next/mdx @mdx-js/loader @mdx-js/react @types/mdx`), `pageExtensions: ['js','jsx','md','mdx','ts','tsx']` in a config wrapped by `createMDX()`, and a root `mdx-components.tsx` which is not optional — "`mdx-components.tsx` is **required** to use `@next/mdx` with App Router and will not work without it."

**The sticking point is frontmatter.** Verbatim: "`@next/mdx` does **not** support frontmatter by default, though there are many solutions for adding frontmatter to your MDX content, such as: remark-frontmatter, remark-mdx-frontmatter, gray-matter." The documented native alternative is a plain export — `export const metadata = { ... }` inside the `.mdx` file, imported as `import Post, { metadata } from './page.mdx'`.

**There is no official content layer.** The docs never recommend Contentlayer, Velite, Fumadocs or `next-mdx-remote`. For a blog index they tell you to do it by hand: "You can use packages like Node's `fs` module or globby to read a directory of posts and extract the metadata", with the caveat that this is server-side only. Remote MDX is described as supported but has no worked example.

One Turbopack wrinkle since it's now the default bundler: remark/rehype plugins must be given **as strings**, not imported functions — "JavaScript functions can't be passed to Rust." So `remarkPlugins: ['remark-gfm']`.

**Recommendation: ship `@next/mdx` with file-routed posts and skip every content layer.** A post is `app/blog/<slug>/page.mdx` with `export const metadata` — zero frontmatter machinery, and the metadata export feeds the Metadata API directly. For the index, skip `fs`/globby too: a `lib/posts.ts` that re-exports each post's own metadata is one line per post, fully typed, no filesystem access, and no duplication:

```ts
import { metadata as helloWorld } from '@/app/blog/hello-world/page.mdx'
export const posts = [{ slug: 'hello-world', ...helloWorld }]
```

The `fs` + glob version is the documented upgrade path once posts pass ~20 and the manual line becomes annoying. Say so in a comment; don't build it now.

### 4.8 Contact form: Server Action, and the security caveats

**The docs recommend Server Actions for forms unambiguously** — the page is titled "[How to create forms with Server Actions](https://nextjs.org/docs/app/guides/forms)". Route Handlers are positioned for "**non-mutation** requests" ([server actions](https://nextjs.org/docs/app/guides/server-actions#sequential-dispatch-on-the-client)).

The documented shape: `<form action={serverFn}>` gets `FormData` automatically; `useActionState(action, initialState)` in a Client Component gives you `[state, formAction, pending]` for error display and a disabled submit button.

**The security section is the part that matters for a public marketing site** ([Server Actions — Security](https://nextjs.org/docs/app/guides/server-actions#security)). The framing sentence:

> "A Server Action runs as a POST request against the page that invokes it… The implementation stays on the server, but **the route is reachable to anyone who can send the same POST. Treat every action as an untrusted entry point.**"

Framework-level protections, verbatim:
- **CSRF:** "The request's `Origin` is compared to the `Host` (or `X-Forwarded-Host`). Mismatches are rejected. Configure `serverActions.allowedOrigins` for proxy or CDN domains."
- **Body size:** "Action requests are capped at 1MB by default."
- **Encrypted action IDs / dead code elimination:** "Action references are encrypted at build time, and unused Server Functions are stripped from client bundles so they have no public endpoint."
- **Closure encryption:** "Variables captured by an inline action are encrypted before being sent to the client. For multi-instance and self-hosted deployments, set `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY`."

And the line the docs bold: "**Framework protections are not a substitute for application-level checks.**"

**What this means for a no-auth, no-DB contact form.** Most of the section is moot — there is no auth to check and no data to protect. Two things are live:

1. `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` is handled for you on Vercel; it only matters when self-hosting across instances. Not a template concern.
2. **The action is a publicly POST-able spam surface.** Origin-checking stops cross-site submission but not a script hitting your own origin directly. Validation is not optional here even though there's no database — this is a trust boundary.

Recommendation for the template's `actions.ts`: server-side length caps and required-field checks, a **honeypot** field (zero dependencies, catches the large majority of bots), and forwarding to a `CONTACT_WEBHOOK_URL`. **Skip `zod` in v1** — three fields do not justify a dependency, and the docs' point is that you must validate, not that you must use zod (they also warn "Schema validation (zod or similar) only checks the **shape** of the input"). Add zod when the form grows past a handful of fields. Rate limiting is the documented next step ([data security](https://nextjs.org/docs/app/guides/data-security)) and should be a README note, not template code — it needs a store the template deliberately doesn't have.

One operational gotcha worth a README line: action IDs rotate "at most every 14 days", so a stale open tab can hit a missing action and surface "Failed to find Server Action."

**Why a webhook and not Resend/email:** any email provider means a dependency plus an API key, which breaks one-click deploy — the consumer's first experience becomes "get an API key." A `CONTACT_WEBHOOK_URL` works with Slack, Discord, Zapier, Make, or a form service, needs zero dependencies (`fetch` is built in), and is one optional env var. If it's unset, the action returns a clear "contact form not configured" message rather than silently failing.

### 4.9 What `create-next-app` generates today

Verified via `npx create-next-app@latest --help` (CNA **16.3.0**) without scaffolding.

Defaults with `--yes`, quoted: "The default setup enables TypeScript, Tailwind CSS, ESLint, App Router, and Turbopack, with import alias `@/*`, and includes `AGENTS.md` (with a `CLAUDE.md` that references it)." ([installation](https://nextjs.org/docs/app/getting-started/installation#quick-start))

Two things to note:
- **`src/` is not a default.** You get root `app/`. This corroborates §5's recommendation.
- **React Compiler is not a default** — `reactCompiler: true` is stable but off: "It is not enabled by default as we continue gathering build performance data."
- CNA now generates an `AGENTS.md` plus a `CLAUDE.md` that references it. For this template, **write `CLAUDE.md` directly** (§3.4) rather than keeping the indirection — but note the docs' own guidance if you want both: "Claude Code reads `CLAUDE.md`, not `AGENTS.md`. If your repository already uses `AGENTS.md`… create a `CLAUDE.md` that imports it" via `@AGENTS.md` ([memory](https://code.claude.com/docs/en/memory)).

Generated scripts: `"dev": "next dev"`, `"build": "next build"`, `"start": "next start"`, `"lint": "eslint"`, `"lint:fix": "eslint --fix"`. No `--turbopack` flag needed anymore.

**Practical upshot: `npx create-next-app@latest --yes --empty` is ~90% of this template's scaffolding.** The remaining work is the `.claude/` skill, `lib/site.ts`, the metadata files, the MDX wiring, and the contact action.

**Documentation drift found (flagging as partially unverified):** the CNA 16.3.0 `--help` output lists `--rspack` ("Enable Rspack as the bundler"), which appears on **no** documentation page. Conversely the [create-next-app docs page](https://nextjs.org/docs/app/api-reference/cli/create-next-app) lists `--turbopack`, `--webpack` and `--no-linter`, which `--help` does not print. Treat `--rspack` as **undocumented/unverified**; treat the docs page as lagging the CLI.

### 4.10 Linting: `next lint` is gone

> "Starting with Next.js 16, `next lint` is **removed**. As part of the removal, the `eslint` option in your Next config file is no longer needed and can be safely removed." — [ESLint config](https://nextjs.org/docs/app/api-reference/config/eslint)

Also: "`next build` no longer runs linting." Codemod available: `npx @next/codemod@canary next-lint-to-eslint-cli .`

The official config is `eslint-config-next`, bundling `@next/eslint-plugin-next` plus recommended rules from `eslint-plugin-react` and `eslint-plugin-react-hooks`. Three entry points: base, `/core-web-vitals` ("Recommended for most projects", upgrades CWV rules from warn to error, "automatically included for new applications built with Create Next App"), and `/typescript`. Flat config is the default format in v16.

Biome **is** officially mentioned, but only as a `create-next-app` linter choice — "A fast, modern linter and formatter that combines the functionality of ESLint and Prettier. Includes built-in Next.js and React domain support" ([CNA linter options](https://nextjs.org/docs/app/api-reference/cli/create-next-app#linter-options)) — not in the ESLint reference. There is no `eslint-config-next` equivalent maintained by Vercel for Biome; Biome's Next.js rules come from its own domain support. **Whether Biome's Next.js rules cover the same ground as `@next/eslint-plugin-next` is not stated anywhere official — unverified.**

---

## 5. Vercel findings

### 5.1 `vercel.ts` / `@vercel/config` — real, but not the recommendation

The package is real (`@vercel/config` **0.5.6**, "A TypeScript SDK for programmatically configuring Vercel projects") and documented at [vercel.ts](https://vercel.com/docs/project-configuration/vercel-ts).

It does **not** export `defineConfig`. You export a named `const config`, with types and route helpers from the `@vercel/config/v1` subpath. Real example from the docs:

```typescript
// vercel.ts
import { routes, deploymentEnv, type VercelConfig } from '@vercel/config/v1';

export const config: VercelConfig = {
  buildCommand: 'npm run build',
  framework: 'nextjs',
  rewrites: [
    routes.rewrite('/api/(.*)', 'https://backend.api.example.com/$1'),
  ],
  redirects: [routes.redirect('/old-docs', '/docs', { permanent: true })],
  headers: [
    routes.cacheControl('/static/(.*)', { public: true, maxAge: '1 week', immutable: true }),
  ],
  crons: [{ path: '/api/cleanup', schedule: '0 0 * * *' }],
};
```

**The docs are neutral between it and `vercel.json`**, not preferential: "Both support the same properties, but `vercel.ts` lets you generate configuration dynamically using environment variables, API calls, or other build-time logic. You can only use one configuration file per project." ([project configuration](https://vercel.com/docs/project-configuration))

The stated reason to choose `vercel.ts` is build-time dynamism. A marketing template has none. **Recommendation: ship neither file.** `vercel.ts` would add a dependency and a build-time code-execution surface for zero benefit.

### 5.2 What config a marketing site actually needs: none

Vercel auto-detects everything ([configure a build](https://vercel.com/docs/builds/configure-a-build)): the Framework Preset is detected automatically; for the build command "Vercel checks for the `build` command in `scripts` and uses this to build the project. If not, the `next build` will be triggered as the default Build Command"; "If Vercel detects a framework, the output directory will automatically be configured"; the install command is inferred from the lockfile. And plainly: "deploying to Vercel is **zero-configuration**" ([Next.js on Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs)).

On the specific fields:

- **`headers` / `redirects` / `rewrites`** — real fields, but the wrong file. "If you're building your app with Next.js, you should use `next.config.js` rather than `vercel.json`." ([CDN cache](https://vercel.com/docs/caching/cdn-cache)) Put redirects and security headers in `next.config.ts`.
- **`crons`** — noise. A marketing site has no scheduled work.
- **`regions`** — noise. Defaults to `iad1`, Hobby gets one region, and critically "Selecting a Vercel Function region does not impact static files, which are deployed to every region by default" ([vercel.json regions](https://vercel.com/docs/project-configuration/vercel-json#regions)).
- **`framework` / `buildCommand`** — noise, both auto-detected.

**Free with zero config** ([CDN cache](https://vercel.com/docs/caching/cdn-cache)): "Static file caching is automatic for all deployments, requiring no manual configuration"; "Static files are automatically cached on Vercel's global network for the lifetime of the deployment after the first request"; "CDN caching is available for all deployments and domains on your account, **regardless of the pricing plan**." A statically prerendered Next.js marketing site gets all of this for nothing.

### 5.3 Analytics and Speed Insights — split the decision

**Web Analytics (`@vercel/analytics`): include.** Setup from [the quickstart](https://vercel.com/docs/analytics/quickstart) is one import and one component in `app/layout.tsx`, import path `@vercel/analytics/next`. It must also be enabled in the dashboard — the package alone does nothing, which is exactly the property you want in a template: inert until the consumer opts in.

Pricing ([limits and pricing](https://vercel.com/docs/analytics/limits-and-pricing)): Hobby includes **50,000 events/month** and cannot buy more; on exceeding, a three-day grace period, then collection stops for 7 days. Pro includes **zero** events at **$0.03 per 1K** (against the monthly usage credit). No per-project base fee.

Privacy ([privacy policy](https://vercel.com/docs/analytics/privacy-policy)): "allows you to track your website traffic and gather valuable insights **without using any third-party cookies**, instead end users are identified by a hash created from the incoming request"; sessions "automatically discarded after 24 hours"; "no personal identifiers that track and cross-check end users' data across different applications or websites, are collected." Note: the docs do **not** say you don't need a cookie banner. Repeat the factual claims, not a legal conclusion.

**Speed Insights (`@vercel/speed-insights`): leave out.** This is a cost trap in a *distributed* template. Per [Speed Insights limits and pricing](https://vercel.com/docs/speed-insights/limits-and-pricing), Hobby allows it on one project at 10,000 events/month, but **on Pro the base fee is $10.00 per project, per month**, plus $0.65 per 10,000 events, charged immediately on enable. A consumer who upgrades to Pro and forgets it is on pays $10/month forever for a brochure site. Document it in the README as a two-line opt-in instead of shipping it enabled.

(Caveat: the App Router snippet on the Speed Insights quickstart is framework-tabbed and drops out of that page's markdown export; the import path `@vercel/speed-insights/next` was verified via the [package reference](https://vercel.com/docs/speed-insights/package) and a [KB guide](https://vercel.com/kb/guide/sending-sample-to-speed-insights) instead.)

### 5.4 The Deploy with Vercel button

Base URL: `https://vercel.com/new/clone?repository-url=...`. **Documentation is internally inconsistent here** — [deploy-button/source](https://vercel.com/docs/deploy-button/source) uses `/new/clone`, while [deploy-button/environment-variables](https://vercel.com/docs/deploy-button/environment-variables) uses `/clone`. Use `/new/clone`; it's the form used in Vercel's own framework links.

Documented parameters:

| Param | Source |
|---|---|
| `repository-url` (required) | [source](https://vercel.com/docs/deploy-button/source) |
| `project-name`, `repository-name` | [source](https://vercel.com/docs/deploy-button/source) |
| `env` — **comma-separated list of required env var keys** (values cannot be passed: "the URL is saved in the browser history, making it insecure") | [environment-variables](https://vercel.com/docs/deploy-button/environment-variables) |
| `envDefaults` (URI-encoded JSON, non-sensitive only), `envDescription`, `envLink` — the latter two only render if `env` is set | [environment-variables](https://vercel.com/docs/deploy-button/environment-variables) |
| `demo-title`, `demo-description`, `demo-url`, `demo-image` — "The Demo card is displayed only when **all** `demo-*` parameters are provided" | [demo](https://vercel.com/docs/deploy-button/demo) |
| `stores` | [source](https://vercel.com/docs/deploy-button/source) |
| `redirect-url`, `developer-id`, `external-id`, `production-deploy-hook` | [callback](https://vercel.com/docs/deploy-button/callback) |
| `integration-ids`, `skippable-integrations` | [integrations](https://vercel.com/docs/deploy-button/integrations) |

**Unverified:** `teamSlug`, `products`, `root-directory`, `build-command`, `install-command`, `output-directory`, `framework` as deploy-button params — not documented on any deploy-button page.

The current deploy-button doc page defers to a client-side generator and its markdown export contains no snippet; the only documented snippet lives in the [announcement post](https://vercel.com/blog/deploy-button), which predates the current flow and has a stale link target. The `https://vercel.com/button` image URL is still live (verified: 200, `image/svg+xml`). For the README:

```markdown
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FYOU%2Feasy-af-website&project-name=my-site&repository-name=my-site&env=CONTACT_WEBHOOK_URL,NEXT_PUBLIC_SITE_URL&envDescription=Optional.%20Webhook%20for%20contact%20form%20and%20your%20public%20site%20URL.)
```

### 5.5 Git integration — what the README must tell the consumer

From [Vercel Git](https://vercel.com/docs/git): "automatic deployments on every branch push and merges onto the production branch." Production branch resolution order: `main`, else `master`, else the repo default. "Every preview branch automatically receives its own domain… whenever a commit is pushed to it." PRs from forks of public repos need one-time authorization.

**The one gotcha worth a README line:** per the same page, you **cannot deploy to a Hobby team from a private repository owned by a GitHub organization** — "Consider making the repository public or upgrading to Pro." A consumer who uses the template into their personal account is fine; one who does it into a company org on Hobby will hit a wall.

### 5.6 Image optimization cost

Current model since ~Feb 2025 ([limits and pricing](https://vercel.com/docs/image-optimization/limits-and-pricing)) bills three units, not source images (the old model is [legacy](https://vercel.com/docs/image-optimization/legacy-pricing)):

| Unit | Hobby included |
|---|---|
| Image transformations | 5K/month |
| Image cache reads | 300K/month |
| Image cache writes | 100K/month |

Transformations and cache writes bill on every cache MISS/STALE. On Hobby overage, new images "fail to optimize and instead return a runtime error response with 402 status code" and show the `alt` text; cached images keep working.

Documented cost reductions ([managing costs](https://vercel.com/docs/image-optimization/managing-image-optimization-costs)): raise `images.minimumCacheTTL` to `2678400` (31 days); use **one** format (`['image/webp']`, not avif+webp); restrict `remotePatterns`, `qualities`, `imageSizes`/`deviceSizes`; use `unoptimized` for small/SVG/animated-GIF sources.

**For the template:** set `minimumCacheTTL: 2678400` and `formats: ['image/webp']` in `next.config.ts`. Two lines, high value, no downside for a marketing site whose images are known at build time.

(Vercel's limits page claims you can disable optimization "per image **or per project**", but the page it links to documents only the per-image prop; the project-level `images.unoptimized` switch is Next.js documentation, not Vercel's — **treat the project-level path as unverified on Vercel's side**.)

### 5.7 Deploying from a GitHub template repo

**Nothing specific exists.** No Vercel doc addresses GitHub's "Use this template" flow. The closest — [Vercel Git](https://vercel.com/docs/git) — refers to Vercel's own template gallery, not GitHub template repos. From Vercel's side, a template-derived repo is an ordinary repo you import at `https://vercel.com/new`. Template submission to Vercel's gallery exists at `https://vercel.com/templates/submit` but **no documentation page describing repository requirements was found — unverified.**

---

## 6. GitHub findings

### 6.1 What makes a repo a template, and what "Use this template" really copies

Making one is a single checkbox: Settings → General → "Select **Template repository**", and "Anyone with admin permissions to a repository can make the repository a template" ([creating a template repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-template-repository)).

**What is affirmatively documented as copied:**

> "Anyone with access to the template repository can create a new repository based on the template with the same **directory structure, branches, and files**." — [creating a template repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-template-repository)

> "anyone with access to the repository can generate a new repository with the same directory structure and files as **your default branch**. They can also choose to include all the other branches… Branches created from a template have **unrelated histories**, so you cannot create pull requests or merge between the branches."

The "Include all branches" checkbox is real and off by default; the REST equivalent is `include_all_branches` on `POST /repos/{owner}/{repo}/generate`, documented as `Default: false` ([REST: create a repository using a template](https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#create-a-repository-using-a-template)).

**Template vs. fork**, verbatim ([creating a repository from a template](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template)):
- "A new fork includes the entire commit history of the parent repository, while a repository created from a template **starts with a single commit**."
- "Commits to a fork don't appear in your contributions graph, while commits to a repository created from a template **do** appear in your contribution graph."

**One documented hard limitation:** "Your template repository **cannot include files stored using Git Large File Storage**." So no LFS assets — relevant if you were tempted to ship large hero imagery.

**Being honest about what is NOT copied.** GitHub does **not** publish an enumerated "not copied" list. Verified absence, not merely not-found. So:

| Thing | Status |
|---|---|
| Git history / commits | **Not copied — documented** ("starts with a single commit") |
| Branches | Default branch only, or all via "Include all branches" — **documented** |
| LFS objects | Cannot be in a template at all — **documented** |
| Files, directory structure, `.github/` files | **Copied — documented** (no special handling; they're ordinary files) |
| Issues, PRs, wikis, releases, tags, Actions secrets, repo secrets/variables, environments, deploy keys, collaborators, stars, branch protection / rulesets | **Unverified.** The docs never state either way. The strong inference is that none travel — a single fresh commit cannot carry tags or releases — but do **not** write "secrets are not copied" in the README as though GitHub says so. |

**One real trap:** files in an *organization's* `.github` repo "won't appear in the file browser or Git history of the individual repositories, and are not included in their clones, packages, or downloads" ([default community health files](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/creating-a-default-community-health-file)). Anything you rely on from an org-level default will **not** ship. Everything that must reach a consumer has to be physically committed in the template repo.

### 6.2 Which `.github/` files to ship

**`dependabot.yml` — ship it. It is the only one that works correctly downstream and delivers value the consumer didn't have to ask for.**

Location is fixed at `.github/dependabot.yml` on the default branch ([about the dependabot.yml file](https://docs.github.com/en/code-security/concepts/supply-chain-security/about-the-dependabot-yml-file)). The crucial distinction:

- **Version updates self-enable.** "You enable Dependabot version updates by committing a `dependabot.yml` configuration file to your repository… When this file is checked in, Dependabot checks the manifest files on the default branch for outdated dependencies." ([configure version updates](https://docs.github.com/en/code-security/how-tos/secure-your-supply-chain/secure-your-dependencies/configure-version-updates)) The copied file turns them on with no consumer action.
- **Alerts and security updates do not.** "Dependabot alerts are configured in the repository or organization 'Settings' tab and **not** in the `dependabot.yml` file." ([configure Dependabot alerts](https://docs.github.com/en/code-security/how-tos/secure-your-supply-chain/secure-your-dependencies/configure-dependabot-alerts)) Dependency graph is a separate admin toggle. **This belongs in the README** — it's the one "you still have to click something" item.

Use `package-ecosystem: "npm"` weekly. Skip `github-actions` since we ship no workflows (§6.3). Honest counterargument: unattended PRs on a brochure site are noise, and "when maintainers stop interacting with Dependabot pull requests, Dependabot temporarily pauses its updates" anyway. I still ship it — a public marketing site with a stale Next.js is a worse default than a few ignorable PRs.

**`CODEOWNERS` — do NOT ship.** It fails silently in someone else's account: "The people you choose as code owners must have write permissions," and "**If you specify a user or team that doesn't exist or has insufficient access, a code owner will not be assigned**" ([about code owners](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners)). Your `@your-org/your-team` resolves to nothing downstream, plus a visible error state on the CODEOWNERS file page. Worse than absent.

**`FUNDING.yml` — do NOT ship.** It "displays a sponsor button in your repository" ([displaying a sponsor button](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/displaying-a-sponsor-button-in-your-repository)). Since everything copies, **every consumer's repo sprouts a sponsor button funding you.** That is not a template feature, it is a leak.

**`ISSUE_TEMPLATE/` and `PULL_REQUEST_TEMPLATE.md` — do NOT ship (a judgement call, not a doc rule).** They work fine mechanically: issue templates live in `.github/ISSUE_TEMPLATE`, must be on the default branch, and forms need a `.yml` extension ([about issue and PR templates](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/about-issue-and-pull-request-templates)). But they describe contributing to *your* template, and land in a consumer's brochure-site repo as pure ceremony. Two documented downstream failures reinforce this: template `labels:` "must be created in your `.github` repository **and any repositories where the template will be used**" — labels don't travel — and any `contact_links` you hardcode point at your community, not theirs.

### 6.3 CI workflow: no. And there's a documented reason beyond "Vercel already builds it."

The usual argument is enough on its own: Vercel builds every push and gives "automatic deployments on every branch push and merges onto the production branch," with every preview branch getting its own domain ([Vercel Git](https://vercel.com/docs/git)). A GitHub Actions job running `next build` on the same commit is the same build, twice, for no extra signal. That is duplicated work whose only output is a second red X.

**The steelman for CI** is real and worth stating: Actions can run things Vercel's build does not — type-checks and lint on a commit that would still deploy fine, unit tests, `pnpm audit`. Vercel builds; it does not test. And a required status check can block a merge, which a Vercel preview cannot.

**Two documented facts break the tie against CI in a *distributed template*:**

1. **Workflows fire on repo creation.** From [events that trigger workflows](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#push), verbatim: `push` "Runs your workflow when you push a commit or tag, **or when you create a repository from a template**." So your CI runs in a stranger's account before they have written a line. Actions is on by default ("By default, GitHub Actions is enabled on all repositories and organizations" — [managing Actions settings](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/managing-github-actions-settings-for-a-repository)), so nothing stops it.
2. **You are spending someone else's money.** "GitHub Actions usage is **free** for… **public repositories**", but private repos draw on a monthly quota (Free 2,000 min, Pro 3,000, Team 3,000), and "Minutes usage is charged to the **repository owner**, not the person who triggered the workflow runs" ([Actions billing](https://docs.github.com/en/billing/concepts/product-billing/github-actions)). A consumer who makes their copy private pays for CI you chose for them.

**Verdict: ship no workflow.** For a marketing template the correctness bar is "does it build and deploy", which Vercel answers on every push for free. Note the escalation honestly in the README: a consumer who later wants type-check-on-PR adds a 15-line workflow themselves, on their own terms and their own bill.

*(Unverified: whether the fork-specific rule that "when a public repository is forked, scheduled workflows are disabled by default" also applies to template-created repos. The docs say "forked," not "created from a template." Moot here since we ship no workflows.)*

### 6.4 `.gitignore`

Two candidate sources, and they differ in ways that matter.

**GitHub's [`Node.gitignore`](https://github.com/github/gitignore/blob/main/Node.gitignore)** has `.env`, `.env.*`, **`!.env.example`**, `.next`, `out`, `node_modules/`, `*.tsbuildinfo` — but **no `.vercel`** and **no `next-env.d.ts`**.

**`create-next-app`'s** ([vercel/next.js app-tw/ts/gitignore](https://github.com/vercel/next.js/blob/canary/packages/create-next-app/templates/app-tw/ts/gitignore), fetched verbatim) covers both of those:

```
# dependencies
/node_modules
/.pnp
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/versions

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# env files (can opt-in for committing if needed)
.env*

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
```

**Start from CNA's** (it is the one Next.js maintains, and `next-env.d.ts` is now explicitly meant to be ignored — "Add it to `.gitignore`. If your project already tracks the file, remove it from Git", [TypeScript config](https://nextjs.org/docs/app/api-reference/config/typescript)), **then make two additions:**

```
!.env.example
.claude/settings.local.json
```

**The `.env.example` bug is not theoretical — I tested it.** CNA's `.env*` is a wildcard that swallows `.env.example`. In a scratch repo, `git status --porcelain --ignored` reports `!! .env.example` (ignored) with `.env*` alone, and `?? .env.example` (untracked, committable) once `!.env.example` is added. Without the negation the file never enters the template repo, so it never reaches a single consumer — a silent failure that looks like nothing at all.

The `.claude/settings.local.json` line is belt-and-braces: Claude Code adds that path to your *global* git excludes when it writes the file ([claude-directory](https://code.claude.com/docs/en/claude-directory)), but a repo-local line costs nothing and removes the dependency on that behaviour.

### 6.5 Repo-level files

- **`README.md` — essential, and it is a different document than you think.** GitHub surfaces it automatically, with precedence `.github` → root → `docs` ([about READMEs](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes)); content beyond 500 KiB is truncated. The key insight for a template: **the README's main audience reads it inside their own copy.** Write it as their setup instructions ("edit `lib/site.ts`, deploy, done"), not as marketing for you.
- **`LICENSE` — mandatory, and uniquely so.** "**You cannot create a default license file. License files must be added to individual repositories so the file will be included when a project is cloned, packaged, or downloaded**" ([default community health files](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/creating-a-default-community-health-file)). And "without a license, the default copyright laws apply, meaning that you retain all rights to your source code and **no one may reproduce, distribute, or create derivative works**" ([licensing a repository](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository)). A template's entire purpose is derivative works. Ship MIT.
- **`CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md` — cut.** All three work mechanically and all three describe *your* project: your contribution process, your community, your security contact. Every consumer inherits a stale document with your email in it. If you want the community-profile checkmark on the template repo itself, that is a reason to add them *later* and accept the staleness knowingly — not a reason for v1.

**Discoverability:** topics are the mechanism — "lowercase letters, numbers, and hyphens", "50 characters or less", "no more than 20 topics" ([classifying with topics](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/classifying-your-repository-with-topics)). Sensible set: `nextjs`, `template`, `typescript`, `tailwindcss`, `vercel`, `marketing-site`. Search supports `template:true` / `template:false` ([searching for repositories](https://docs.github.com/en/search-github/searching-on-github/searching-for-repositories)). *A distinct visual "template" badge on the repo header is **unverified** — the docs describe the "Use this template" button, not a badge.*

---

## 7. Tooling and DX findings

### 7.1 Tailwind CSS 4.3.3 — two files, no config

Verified `npm view tailwindcss version` → **4.3.3**; the docs page self-reports v4.3. Complete setup from the [official Next.js guide](https://tailwindcss.com/docs/installation/framework-guides/nextjs):

```
npm install tailwindcss @tailwindcss/postcss postcss
```

`postcss.config.mjs`:
```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

`app/globals.css`:
```css
@import "tailwindcss";
```

That is the whole thing — no `tailwind.config.js`, no `content` array, no `autoprefixer`, no `postcss-import`. The [upgrade guide](https://tailwindcss.com/docs/upgrade-guide) states "in v4 the PostCSS plugin lives in a dedicated `@tailwindcss/postcss` package" and "imports and vendor prefixing is now handled for you automatically." This matches the design skill's §3.A requirement verbatim ("do NOT use `tailwindcss` plugin in `postcss.config.js`. Use `@tailwindcss/postcss`").

**JS config is supported but no longer auto-detected** — you must opt in with `@config "../../tailwind.config.js"`, and [functions and directives](https://tailwindcss.com/docs/functions-and-directives) says `@config` exists "solely for compatibility with Tailwind CSS v3.x", with `corePlugins`, `safelist` and `separator` unsupported from it. **Do not ship one.**

**Design tokens go in `@theme`** ([theme](https://tailwindcss.com/docs/theme)): "Theme variables are special CSS variables defined using the `@theme` directive that influence which utility classes exist in your project."

```css
@import "tailwindcss";

@theme {
  --color-mint-500: oklch(0.72 0.11 178);
  --font-display: "Geist", sans-serif;
}
```

The docs draw the line clearly: "Use `@theme` when you want a design token to map directly to a utility class, and use `:root` for defining regular CSS variables that shouldn't have corresponding utility classes." This is exactly the mechanism the design skill's §8.A asks for, without prescribing values.

**Dark mode costs zero lines.** "By default, the `dark:` variant uses the `prefers-color-scheme` CSS media feature" ([dark mode](https://tailwindcss.com/docs/dark-mode)). The skill's requirement is "Respect `prefers-color-scheme`" — which is the default. A manual toggle would need one line, `@custom-variant dark (&:where(.dark, .dark *));`, and a script to avoid a flash. **Ship neither.** This is why `theme-script.tsx` is not in the tree: with the media-query default there is no flash to prevent. The v3 `darkMode: 'class'` option is gone; `@custom-variant` replaces it.

### 7.2 TypeScript 7.0.2, and the config CNA generates

`npm view typescript version` → **7.0.2** — the native port has shipped stable. Next.js addresses it directly: "TypeScript 7 does not currently provide the JavaScript compiler API. To use TypeScript 7 during `next build`, **install it in your project**" (`npm install -D typescript@^7`), and "Next.js uses the project-local `tsc` CLI by default, so no additional configuration is required" ([TypeScript config](https://nextjs.org/docs/app/api-reference/config/typescript)). Fall back with `experimental.useTypeScriptCli: false`. Next.js's floor remains **TypeScript 5.1+**.

CNA's `tsconfig.json`, fetched verbatim from [vercel/next.js app-tw/ts/tsconfig.json](https://github.com/vercel/next.js/blob/canary/packages/create-next-app/templates/app-tw/ts/tsconfig.json):

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": [
    "next-env.d.ts", "**/*.ts", "**/*.tsx",
    ".next/types/**/*.ts", ".next/dev/types/**/*.ts", "**/*.mts"
  ],
  "exclude": ["node_modules"]
}
```

Take it unmodified. `moduleResolution: "bundler"` matches Turbopack's resolution rather than emulating Node; `plugins: [{name: "next"}]` gives the IDE plugin that flags invalid route segment config and `'use client'` misplacement; `paths: {"@/*": ["./*"]}` is the alias everything downstream expects.

Two changes worth flagging if you carry an older template forward: **`next-env.d.ts` is now gitignored** (line 41 of CNA's gitignore), and `include` gained `.next/dev/types/**/*.ts`.

One opt-in worth taking for a marketing site: **`typedRoutes: true`** in `next.config.ts` type-checks every `href`. A site with a fixed nav and a handful of routes gets real value; the cost is one config line.

### 7.3 Package manager: ship npm, no `packageManager` field

**The headline finding invalidates the usual advice: Corepack has been unbundled from Node.** `https://nodejs.org/api/corepack.html` now returns a **308 permanent redirect** to the [Corepack README](https://github.com/nodejs/corepack#readme), which states Corepack "is distributed with Node.js from version 14.19.0 up to (but **not including**) 25.0.0." Anyone on Node 25+ must `npm i -g corepack` explicitly.

Relatedly, `packageManager` is **not** a Node-documented field. [nodejs.org/api/packages.html](https://nodejs.org/api/packages.html) covers `name`, `main`, `type`, `exports`, `imports` and scopes itself explicitly: "This section describes the fields used by the Node.js runtime. Other tools… use additional fields which are ignored by Node.js and not documented here." It is a Corepack convention owned outside Node core.

**Node LTS:** v24 "Krypton" is Active LTS; v26 is Current; v20 and v25 are EOL ([previous releases](https://nodejs.org/en/about/previous-releases)). Next.js requires Node 20.9+.

**Vercel infers the package manager from the lockfile** with zero config: "Vercel will automatically detect the package manager used in your project… by looking at the lock file in your project and inferring the correct package manager to use" ([package managers](https://vercel.com/docs/package-managers)). Precedence note: "If you are using Corepack, Vercel will use the package manager specified in the `package.json` file's `packageManager` field instead."

**Two gotchas that kill a pnpm pin in a distributed template:**

1. **Corepack is opt-in on Vercel and gated behind an env var** — you must add `ENABLE_EXPERIMENTAL_COREPACK=1` as a project environment variable ([configure a build](https://vercel.com/docs/deployments/configure-a-build)). A stranger who clicks Deploy will not have set it, so your `packageManager` field is **silently ignored**. Vercel calls Corepack "experimental" and warns "breaking changes or removal may occur."
2. **Vercel's supported pnpm versions are `6, 7, 8, 9, 10`** ([package managers](https://vercel.com/docs/package-managers)). pnpm is at **11.20.0** — a pin is ahead of the documented table. (pnpm's own [installation docs](https://pnpm.io/installation) still recommend `corepack use pnpm@latest-11` and do not mention Corepack's removal from Node — that gap is unaddressed on their side.)

**Verdict: `package-lock.json`, no `packageManager` field.** The pnpm benefits — faster installs, strict resolution — accrue to *you*, the author, not to the stranger cloning the repo. npm costs a few seconds and works on every Node from 20 to 26, on Vercel with zero config, in every CI image, with no global install step in the README. Anyone who prefers pnpm runs `rm package-lock.json && pnpm install` without needing permission.

### 7.4 shadcn/ui: not in the template

Current CLI is **4.16.2** — substantially further along than the 2.x era, and the defaults have moved. `init` is `npx shadcn@latest init -t next`, with a new `-b, --base` flag taking `base | radix | aria`; **the default base is Base UI (`@base-ui/react`), not Radix**. Every current style additionally pulls `class-variance-authority` and **`lucide-react`**, plus devDeps `tw-animate-css` and `shadcn` itself (styles now `@import "shadcn/tailwind.css"`; `shadcn eject` inlines it).

`components.json` fields (authoritative list from [ui.shadcn.com/schema.json](https://ui.shadcn.com/schema.json), which is more complete than the prose page): required `style`, `tailwind`, `rsc`, `aliases`; optional `tsx`, `iconLibrary`, `menuColor`, `menuAccent`, `rtl`, `registries`. Several are **locked after init** — `style`, `tailwind.baseColor`, `tailwind.cssVariables`. For Tailwind v4 you leave `tailwind.config` blank ([components.json](https://ui.shadcn.com/docs/components-json)).

Tailwind v4 and React 19 are officially supported — "It's here! Tailwind v4 and React 19. Ready for you to try out" ([Tailwind v4](https://ui.shadcn.com/docs/tailwind-v4)) — so compatibility is not the objection.

**The objection is fit, and shadcn's own registry proves it.** Enumerating every block in the registry: **97 blocks, categorized Featured / Sidebar / Login / Signup** — roughly 1 dashboard, 16 sidebar, 5 login, 5 signup, ~70 charts. **There is not a single hero, pricing table, feature grid, testimonial, CTA, or footer block.** shadcn is app-UI shaped. Its own framing agrees: "This is not a component library. It is how you build your component library" ([docs](https://ui.shadcn.com/docs)).

**And it fights the design skill on icons.** Every current shadcn style depends on `lucide-react`; the skill's §3.C lists lucide as "**Discouraged**. Acceptable only when the user explicitly asks for it or the project already depends on it" and demands "One family per project." Pre-installing shadcn makes lucide "already a dependency" and quietly wins that argument by default. (`shadcn migrate icons` does support `lucide, tabler, hugeicons, phosphor, remixicon` and rewrites `iconLibrary` — so it is fixable, but that is a migration step in a template that promised no ceremony. The schema types `iconLibrary` as a bare string with **no declared default — unverified** — but lucide is unambiguously what ships.)

The skill also names shadcn only for "Modern SaaS where you own the components," with the hard rule "**never ship default state**" (§2.A) and "shadcn/ui customization: Allowed, but NEVER in default state" (§9.E). For the indie case the skill's own default row is "Tailwind v4 utilities + `dark:` variant."

**Verdict: leave shadcn out; document `npx shadcn@latest init -t next` as a one-command opt-in.** A landing page realistically wants `button`, `accordion` (FAQ), maybe `card`/`sheet` — four primitives that are hand-writable in Tailwind. Installing them drags in five dependencies and a `components.json` with three permanently-locked fields, in exchange for components the skill will then tell you to restyle anyway.

### 7.5 Linting and formatting: Biome, one file

`next lint` is **removed**, not deprecated: "Starting with Next.js 16, `next lint` is removed… the `eslint` option in your Next config file is no longer needed" and "`next build` no longer runs linting" ([ESLint config](https://nextjs.org/docs/app/api-reference/config/eslint)). Whatever you choose, you now wire it up yourself.

**The ESLint path** is `eslint-config-next` (16.3.0), bundling `@next/eslint-plugin-next` plus recommended `eslint-plugin-react` / `eslint-plugin-react-hooks` rules, with `/core-web-vitals` ("Recommended for most projects") and `/typescript` entry points. Two deps, one flat-config file — but **lint only**. Add Prettier for formatting and it becomes three deps plus `.prettierrc` plus `.prettierignore` plus a fourth dep, `eslint-config-prettier`, to stop the two fighting.

**The Biome path** is now a first-class `create-next-app` flag (`--biome`), and CNA ships a real Vercel-authored config ([app-tw/ts/biome.json](https://github.com/vercel/next.js/blob/canary/packages/create-next-app/templates/app-tw/ts/biome.json)):

```json
{
  "$schema": "https://biomejs.dev/schemas/2.4.2/schema.json",
  "vcs": { "enabled": true, "clientKind": "git", "useIgnoreFile": true },
  "files": { "ignoreUnknown": true, "includes": ["**", "!node_modules", "!.next", "!dist", "!build"] },
  "formatter": { "enabled": true, "indentStyle": "space", "indentWidth": 2 },
  "css": { "parser": { "tailwindDirectives": true } },
  "linter": { "enabled": true, "rules": { "recommended": true },
    "domains": { "next": "recommended", "react": "recommended" } },
  "assist": { "actions": { "source": { "organizeImports": "on" } } }
}
```

Biome "provides a command-line interface to format, lint, and check your code" ([getting started](https://biomejs.dev/guides/getting-started/)) — it replaces ESLint *and* Prettier *and* import sorting in one binary. It documents a **`next` linter domain** that "auto-activates when `next: >=14.0.0` is a dependency" with 12 Next-specific rules, plus 26 in the `react` domain ([linter domains](https://biomejs.dev/linter/domains/)). Note `css.parser.tailwindDirectives: true` in that config — it is what stops Biome choking on Tailwind v4's `@theme` and `@custom-variant`.

**Verdict: Biome.** Four config files collapse to one, one dependency instead of four, and both candidate configs are Vercel-authored so "official" is not a differentiator. Next.js also officially describes it as "A fast, modern linter and formatter that combines the functionality of ESLint and Prettier. Includes built-in Next.js and React domain support" ([CNA linter options](https://nextjs.org/docs/app/api-reference/cli/create-next-app#linter-options)).

**The honest cost:** Biome's `next` domain has 12 rules against `@next/eslint-plugin-next`'s ~21. **Whether Biome's Next.js rules cover the same ground is stated by neither project — unverified.** Rule counts suggest near-parity, not identity. If that gap matters more to you than file count, take `--eslint` and add `eslint-config-prettier`; the rest of this document is unaffected either way. Biome also defaults to tabs — the CNA config already overrides that to spaces.

### 7.6 Prettier, Husky, lint-staged, commitlint: all cut

Setup cost from each tool's own docs:

| Tool | Deps | Config files | Commands the consumer must run |
|---|---|---|---|
| Prettier | 1 (+1 `eslint-config-prettier` if using ESLint) | `.prettierrc`, `.prettierignore` | — |
| Husky | 1 | `.husky/pre-commit` | `npx husky init` (also mutates `package.json`) |
| lint-staged | 1 | `.lintstagedrc.js` | needs Husky first — it installs no hook itself |
| commitlint | 2 | `commitlint.config.mjs` | `npx husky init` + write `.husky/commit-msg` |

Cumulative: **4–6 dependencies, 5 config files, 2 mandatory commands, and a mutated `package.json`.**

Sources: [Prettier install](https://prettier.io/docs/install) ("It's important to have a locked down version of Prettier in your `package.json`" — output differs between releases, hence `--save-exact`); [Husky get started](https://typicode.github.io/husky/get-started.html) ("The `init` command… creates a `pre-commit` script in `.husky/` and updates the `prepare` script in `package.json`"); [lint-staged README](https://github.com/lint-staged/lint-staged#readme), whose own step 2 is "Set up the `pre-commit` git hook to run lint-staged"; [commitlint local setup](https://commitlint.js.org/guides/local-setup.html), which requires Husky outright.

**Verdict: cut all four.** Prettier is subsumed by Biome (§7.5). Husky and lint-staged are enforcement machinery that pays off when you don't trust contributors; a template consumer *is* the only contributor. commitlint pays off when you generate changelogs from commit messages; a landing page doesn't. There is also a documented failure mode that makes Husky actively bad in a template: `prepare` only fires on `npm install` **inside a git repo**, so anyone who downloads a tarball gets a silent no-op — the worst kind of tooling, the kind that looks installed and isn't.

If a consumer later grows a team, `npx husky init` is one command on their own schedule.

---

## 8. Decisions and tradeoffs

Every real fork in the road, with a position.

### `src/` or root `app/` → **root `app/`**

The docs decline to pick: "Next.js is **unopinionated** about how you organize" and "The simplest takeaway is to choose a strategy that works for you and your team" ([project structure](https://nextjs.org/docs/app/getting-started/project-structure)). So this is decided on ergonomics, not authority.

Root `app/` wins because **`create-next-app --yes` does not enable `src/`**, which makes root `app/` the path every doc snippet and every tutorial is written against — a consumer pasting from nextjs.org never has to translate a path. It is also one fewer segment in every import.

**Cost of the alternative:** `src/` genuinely does what it claims — "separates application code from project configuration files" ([src folder](https://nextjs.org/docs/app/api-reference/file-conventions/src-folder)) — and with `public/`, `package.json`, `next.config.ts`, `tsconfig.json` and `.env.*` all forced to stay at root anyway, the separation it buys is partial. On a ~33-file repo there is no clutter to solve. Also worth knowing: "`src/app` or `src/pages` will be ignored if `app` or `pages` are present in the root directory" — a half-migration fails silently.

### MDX or not → **`@next/mdx`, file-routed, no content layer**

**Cost paid:** four packages (`@next/mdx @mdx-js/loader @mdx-js/react @types/mdx`), a `pageExtensions` config, and a root `mdx-components.tsx` that is "**required** to use `@next/mdx` with App Router and will not work without it" ([MDX](https://nextjs.org/docs/app/guides/mdx)).

**Why pay it:** the brief asks for a blog/changelog, and file-routed MDX is the laziest thing that delivers one. A post is a folder with a `page.mdx`. No frontmatter parser, no build step, no CMS. Each post's `export const metadata` feeds the Metadata API directly, so per-post SEO is free.

**Cost of the alternatives.** *Plain TSX posts* save four dependencies but make writing prose a React exercise — a bad trade for the one file type a marketing site's owner edits most. *A content layer* (Contentlayer, Velite, Fumadocs) buys typed frontmatter and a generated index, but **the official docs recommend none of them** — no content layer appears anywhere in the Next.js MDX guide — and each is a build-step dependency with its own upgrade treadmill. *Doing nothing and telling consumers to add a blog* is defensible, but "maybe a blog" was in the brief and this is the cheapest honest way to satisfy it.

**Where I deviate from the docs:** for the blog index the docs say "You can use packages like Node's `fs` module or globby to read a directory of posts and extract the metadata." That works, but re-exporting each post's own `metadata` in `lib/posts.ts` is one line per post, fully typed, no filesystem access, and no duplication — strictly less code until you have ~20 posts. Ship that; leave the `fs` version as a comment.

### CI workflow or not → **no workflow**

Argued from both sides in §6.3. The tiebreakers are documented, not aesthetic: `push` workflows run "**when you create a repository from a template**" ([events that trigger workflows](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#push)), and "Minutes usage is charged to the **repository owner**" ([Actions billing](https://docs.github.com/en/billing/concepts/product-billing/github-actions)). Shipping CI means running a job in a stranger's account, on their quota, before they have done anything.

**Cost of the alternative:** you genuinely lose type-check-and-lint-on-PR, because Vercel builds but does not test, and a Vercel preview cannot be a required status check. For a marketing site whose correctness bar is "does it build and deploy," that loss is small — and a consumer who needs it adds 15 lines on their own bill.

### shadcn/ui or not → **not in the template**

Argued in §7.4. The decisive facts are that shadcn's registry contains **zero marketing blocks** across 97 entries, and that every current style depends on `lucide-react`, which the design skill explicitly discourages.

**Cost of the alternative:** including it would give consumers accessible, well-tested primitives for the handful of interactive bits a landing page has — dialog, sheet for mobile nav, accordion for FAQ. That is real. But it costs five dependencies and a `components.json` with permanently-locked fields, pre-commits the icon family, and hands the skill a "you already depend on lucide" argument. One documented command (`npx shadcn@latest init -t next`) recovers all of it whenever a consumer wants it.

### Analytics or not → **`@vercel/analytics` yes, Speed Insights no**

Split, because their economics differ. Analytics has **no per-project base fee** and 50,000 free Hobby events ([analytics pricing](https://vercel.com/docs/analytics/limits-and-pricing)), and the package is inert until enabled in the dashboard — so shipping it costs a consumer nothing until they opt in. Speed Insights has a **$10.00 per project, per month base fee on Pro, charged immediately on enable** ([Speed Insights pricing](https://vercel.com/docs/speed-insights/limits-and-pricing)). Shipping a component that can silently start a recurring charge in someone else's account is not a default; it is a liability.

**Cost of the alternative:** shipping neither is defensible and strictly more neutral. Shipping both hands consumers CWV data the design skill actually asks them to hit ("LCP < 2.5s, INP < 200ms, CLS < 0.1… Run Lighthouse before declaring a page done", §6.D) — but Lighthouse is free and local, so the $10/month is buying convenience, not capability.

### `vercel.json` / `vercel.ts` or nothing → **nothing**

Both files exist; the docs are neutral between them ("Both support the same properties, but `vercel.ts` lets you generate configuration dynamically" — [project configuration](https://vercel.com/docs/project-configuration)). The reason to ship neither is that Vercel auto-detects framework, build command, output directory and install command, and "deploying to Vercel is zero-configuration" ([Next.js on Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs)). Redirects and headers, the two things a marketing site might actually want, belong in `next.config.ts` anyway: "If you're building your app with Next.js, you should use `next.config.js` rather than `vercel.json`" ([CDN cache](https://vercel.com/docs/caching/cdn-cache)).

**Cost of the alternative:** `vercel.ts` would give type-checked config and helpers like `routes.cacheControl()`. Real, but it is a dependency plus a build-time code-execution surface bought for a file whose correct contents are empty.

### Contact form: Server Action vs Route Handler → **Server Action, webhook delivery, no email SDK**

The docs recommend Server Actions for forms unambiguously — the guide is titled "[How to create forms with Server Actions](https://nextjs.org/docs/app/guides/forms)" and Route Handlers are positioned for "**non-mutation** requests."

The delivery choice is where I deviate from the obvious. Resend or any email SDK means a dependency plus an API key, which makes the consumer's first experience "go get an API key" — that breaks one-click deploy. `fetch(process.env.CONTACT_WEBHOOK_URL)` is zero dependencies, works with Slack, Discord, Zapier or a form service, and is one optional env var.

**Where I deviate from the docs a second time:** they use zod for validation. For three fields, hand-rolled length caps plus a honeypot is fewer dependencies and just as correct — and the docs' own caveat is that "Schema validation (zod or similar) only checks the **shape** of the input." Validation itself is *not* optional here: "**the route is reachable to anyone who can send the same POST. Treat every action as an untrusted entry point**" ([Server Actions security](https://nextjs.org/docs/app/guides/server-actions#security)). Add zod when the form grows past a handful of fields.

**Cost of the alternative:** a webhook means no delivery receipts, no reply-to threading, no HTML email. A consumer who wants real transactional email swaps one `fetch` call for an SDK — a five-line change, deferred to the person who actually needs it.

### Linter → **Biome**

Argued in §7.5. One dependency and one config file instead of four and four, covering lint + format + import sorting, with a Vercel-authored Next.js-tuned config shipped in `create-next-app`. **Cost of the alternative, stated plainly:** ESLint's `@next/eslint-plugin-next` has ~21 Next-specific rules against Biome's 12, and **parity is unverified by either project.** If rule coverage matters more than file count, `--eslint` plus `eslint-config-prettier` is a legitimate choice and changes nothing else here.

### Package manager → **npm**

Argued in §7.3. Decided by two documented facts rather than preference: Corepack is no longer bundled with Node as of v25, and Vercel ignores `packageManager` unless the consumer sets `ENABLE_EXPERIMENTAL_COREPACK=1`, which they will not know to do. **Cost of the alternative:** pnpm's faster installs and stricter resolution are real — they just accrue to the author, not the stranger, and `rm package-lock.json && pnpm install` recovers them in one command.

### Ship the skill whole or split it → **split once, accept ~620 lines**

Argued in §3.3. The documented tip is "Keep `SKILL.md` under 500 lines," but the documented cost model is "a skill's body loads only when it's used" — so this is an optimization, not a fix. Moving the five lookup-only sections out cuts ~45% off every activation that doesn't need them. Cutting past ~620 would mean cutting the AI-tell bans and the pre-flight checklist, which are the parts doing the actual work.

**Cost of the alternative:** shipping the 87KB file verbatim means zero maintenance divergence from your personal copy, at ~22–25k tokens per activation. That is a perfectly reasonable choice — say so in the README rather than pretending the file is small.

---

## 9. Cut list

Things Next.js templates commonly ship that this one should not. Guiding principle: **minimum viable ceremony** — every file is something a consumer has to read, understand, or delete.

| Cut | Why |
|---|---|
| `src/` directory | Not a `create-next-app` default; buys partial separation on a 33-file repo while making every doc snippet need translation. |
| Route groups `(marketing)`, `(shop)` | Their documented payoff is multiple root layouts or layout opt-in. With one root layout plus `app/blog/layout.tsx` there is nothing left to do, and duplicate paths across groups **error** ([caveats](https://nextjs.org/docs/app/api-reference/file-conventions/route-groups#caveats)). |
| Private folders `_components`, `_lib` | "Since files in the `app` directory can be safely colocated by default, **private folders are not required for colocation**" ([private folders](https://nextjs.org/docs/app/getting-started/project-structure#private-folders)). |
| `vercel.json` / `vercel.ts` / `@vercel/config` | Everything is auto-detected; "deploying to Vercel is zero-configuration." Redirects and headers belong in `next.config.ts`. |
| GitHub Actions CI workflow | Duplicates Vercel's build, fires on repo creation from a template, and bills the consumer's Actions quota (§6.3). |
| `.github/CODEOWNERS` | "If you specify a user or team that doesn't exist or has insufficient access, a code owner will not be assigned" — fails silently and visibly in someone else's account. |
| `.github/FUNDING.yml` | Copies with your usernames, so every consumer's repo grows a sponsor button funding **you**. |
| `.github/ISSUE_TEMPLATE/`, `PULL_REQUEST_TEMPLATE.md` | Describe contributing to *your* template. Labels referenced by templates don't travel; `contact_links` point at your community. |
| `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md` | All three ship stale in every copy, with your contact details. |
| shadcn/ui + `components.json` | Zero marketing blocks in 97 registry entries; drags in `lucide-react`, which the design skill discourages (§7.4). |
| Prettier, `.prettierrc`, `.prettierignore` | Subsumed by Biome's formatter. |
| Husky, lint-staged, commitlint | 4–6 deps, 5 config files, 2 mandatory commands, a mutated `package.json` — enforcement machinery for a team the consumer doesn't have. Husky's `prepare` also silently no-ops for tarball downloads. |
| `tailwind.config.js` | v4 is CSS-first; the JS config is "solely for compatibility with Tailwind CSS v3.x" and isn't even auto-detected anymore. |
| `@custom-variant dark` + no-flash theme script | The `dark:` variant already uses `prefers-color-scheme` by default, which is exactly what the design skill requires. A toggle is a feature, not a default. |
| `cacheComponents` / `use cache` / PPR | Opt-in in v16 and "not a rename-only change: it can surface build errors for uncached data outside of `<Suspense>`" — a new mental model and new build failures for a site that already fully prerenders. |
| `zod` (for the contact form) | Three fields. Length caps plus a honeypot is fewer deps and equally correct. Add it when the form grows. |
| An email SDK (Resend etc.) | Forces "get an API key" into the consumer's first five minutes and breaks one-click deploy. A webhook URL is zero deps. |
| `twitter-image.*` | Twitter falls back to the OG image; a second file is a second thing to keep in sync for no gain. |
| Dynamic `next/og` `opengraph-image.tsx` | Works, but "Only flexbox and a subset of CSS properties are supported… `display: grid` will not work." A static 1200×630 PNG is correct until per-post OG images matter. |
| Contentlayer / Velite / `next-mdx-remote` | Not recommended anywhere in the official Next.js MDX docs. A build-step dependency with its own treadmill. |
| `@vercel/speed-insights` | **$10.00 per project, per month on Pro, charged immediately on enable** — a recurring charge you'd be starting in someone else's account. |
| `packageManager` field / pnpm pin | Corepack left Node in v25, and Vercel ignores the field without `ENABLE_EXPERIMENTAL_COREPACK=1`. A pin that silently does nothing is worse than no pin. |
| `.claude/settings.json` | A template should not pre-grant tool permissions or hooks to strangers who accepted a *website*. |
| `AGENTS.md` indirection | CNA generates `AGENTS.md` plus a `CLAUDE.md` that references it. Write `CLAUDE.md` directly; add the `@AGENTS.md` import only if a second agent tool is actually in play. |
| `instrumentation.ts`, `proxy.ts` | Real Next.js top-level conventions, but a no-auth, no-DB brochure site has nothing to instrument and nothing to intercept. |
| `loading.tsx`, `error.tsx` at the root | Statically prerendered marketing pages have no loading state worth a skeleton. `global-error` matters once there's real runtime work; there isn't any. |
| `public/` demo SVGs from CNA | `next/svg`, `vercel.svg` and friends are scaffold noise a consumer deletes on day one. Use `create-next-app --empty`. |

**Two things deliberately kept that look like ceremony but are not:**

- **`.env.example`** — it is the only discovery mechanism for `CONTACT_WEBHOOK_URL` and `NEXT_PUBLIC_SITE_URL`, and it needs the `!.env.example` gitignore negation or it never reaches a consumer at all (§6.4).
- **`.github/dependabot.yml`** — the one `.github` file that self-enables downstream and does something the consumer benefits from without asking. The counterargument (unattended PRs are noise) is real; I'd still rather a consumer ignore three PRs than run a public site on a year-old Next.js.
