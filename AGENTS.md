# easy-af-website

An empty Next.js marketing site. The product is the skill collection in
`.agents/skills/`.

## Design work goes through a skill

Read the skill in full before writing UI. There is no design here yet, so the
current markup is not a style to match.

**Pick one protocol and commit to it.** These skills contradict each other on
purpose and none of them knows the others exist: `minimalist-ui` bans
`rounded-full` buttons, `high-end-visual-design` requires pill CTAs; one forbids
gradients, another wants radial mesh. Blending them produces the templated output
they all exist to prevent.

Start with `design-taste-frontend` unless the brief points elsewhere.

Read `brand/design.md` first. A filled one outranks whatever the protocol would
have chosen.

`brand/` ships as **stubs**. A stub section describes what belongs in it instead
of answering, so it reads as an instruction, an example, or an angle-bracket
token. Classify every section as stub or answered before trusting a file. A stub
is not a brief: design against one and the site comes out about the
questionnaire. Stop and ask instead.

## Three things that fail silently

Everything else in this repo announces itself through a build error, a type
error, or the file you are already reading. These do not.

1. **Tailwind v4 drops `text-[--color-x]`.** Brackets are read as a literal
   value and emit no CSS at all. Use the utility `@theme` generates (`text-muted`)
   or `text-(--color-muted)`.
2. **`@theme` inside `@media` gets hoisted** and clobbers your base values,
   leaving one mode broken. Keep it top-level.
3. **Metadata merges shallowly.** A page setting any `openGraph` key replaces the
   whole object from the layout. Spread `openGraph` from `lib/site.ts`.

## Fonts

`Satoshi`, `Cabinet Grotesk`, `Switzer` and `Clash Display` are named by the
skills but are not on Google Fonts and have no npm package. Download the `.woff2`
from [Fontshare](https://www.fontshare.com) into `app/fonts/` and use
`next/font/local`. Everything else the skills name resolves through
`next/font/google`.
