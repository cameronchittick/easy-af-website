---
name: new-site
description: Build a new page from a design brief, gated on a design read the user approves first.
disable-model-invocation: true
---

# new-site

`design-taste-frontend` (tasteskill v2, experimental) is the **only** source of
design rules for this run. Read it in full before Step 1, and use its vocabulary
verbatim: dial names, layout families, section numbers. Every other protocol in
`.agents/skills/` is out of scope for the duration. They contradict tasteskill by
design, and blending them produces the templated output it exists to prevent.

This file is written without em-dashes or en-dashes on purpose. Match that in
everything you write for this run, prose and page copy alike.

## The brief

Collect these with the user. Infer anything missing and say so out loud. An
inferred field is a stated assumption, never a silent default.

- **Page kind:** landing / portfolio / marketing
- **Product:** name and one-line description
- **Audience:** who reads this, in concrete adjectives
- **Vibe words:** 2 to 4 concrete adjectives, e.g. "minimalist, editorial, restrained"
- **References:** real URLs or product names that anchor the aesthetic
- **Avoid:** the slop patterns this brief should not default to

## Step 1. Design read, then gate

Output the design read as one sentence, then the three dials with one line of
reasoning each. Derive them from tasteskill §1.A (signal table) and §1.B
(use-case presets), and name them exactly:

- `DESIGN_VARIANCE`
- `MOTION_INTENSITY`
- `VISUAL_DENSITY`

**Then stop and end the turn.** This is the gate. No page code, no scaffolding
and no file writes exist on the other side of it until the user answers. A design
read the user has not seen is a design read they cannot correct, which is the
whole reason the gate is here.

*Done when:* one design-read sentence, three dials named and valued, one line of
reasoning each, and the turn has ended awaiting approval.

## Step 2. Ship the page

Once the user opens the gate, build a single Next.js page:

- **At least 8 sections**, each chosen because it fits this product
- **At least 4 different layout families** across them, per tasteskill §4, the
  Section-Layout-Repetition Ban
- **Real images:** generation tool first, then Picsum-seed
- **One theme**, locked for the whole page

*Done when:* every section is fully built. Placeholder comments standing in for
markup mean the step is unfinished.

## Step 3. Audit in writing

Run all four, written out in the response. Each line carries a verdict and a
one-line justification.

1. **Em-dash audit.** The page copy contains zero U+2014 and zero U+2013.
   Mechanical: search the rendered strings for both codepoints, report counts.
2. **Pre-Flight Check.** Every box in tasteskill §14, each marked Pass or Fail.
3. **Section-Layout-Repetition audit.** List each section with its layout
   family, then the distinct-family count.
4. **Hero discipline audit.** Headline line count, subtext word count, CTA
   visibility against its background.

*Done when:* every box across all four audits reads Pass. A single Fail means the
work is unfinished. Fix the cause, then re-run the audit that caught it.
Reporting a Fail and stopping is an unfinished run, not a completed one.
