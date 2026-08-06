---
name: build-site
description: Build the site from a filled brand/, using the protocol recorded there, then audit the result.
disable-model-invocation: true
---

# build-site

f(`brand/`) to a built page. Reads the decisions `/new-site` recorded rather
than making them again.

Write without em-dashes or en-dashes throughout, prose and page copy alike.

## Step 1. Load the brand, or stop

Read `brand/design.md`. It ships as a template whose sections describe what
belongs in them, so check before trusting it: if a section still reads as an
instruction, it is empty.

**An unfilled `brand/` stops this skill.** Say which sections are empty and send
the user to `/new-site`. Designing against a template means designing against
instructions, which produces a site about the questionnaire instead of the
brand.

Then read `positioning.md`, `icp.md`, `offer.md` and `voice.md`. Positioning and
ICP decide what the sections argue, offer decides what the CTAs say, and voice
decides how every line reads.

*Done when:* `brand/design.md` is confirmed filled and the other four are read.

## Step 2. Load the protocol named in design.md

Read that skill from `.agents/skills/` in full before writing UI, and use its
vocabulary verbatim.

**One protocol only.** These skills contradict each other on purpose and none of
them knows the others exist. Blending them produces the templated output they
all exist to prevent. If `brand/design.md` names one, that decision is already
made; do not revisit it mid-build.

Where the protocol and `brand/` disagree, `brand/` wins on brand tokens and hard
constraints, and the protocol wins on everything else.

*Done when:* the protocol is loaded and its dial values are set from
`brand/design.md`.

## Step 3. Build

- **At least 8 sections**, each chosen because it fits this product
- **At least 4 different layout families** across them, per tasteskill §4, the
  Section-Layout-Repetition Ban
- **Real images:** generation tool first, then Picsum-seed. `picsum.photos` and
  `cdn.simpleicons.org` are the allowed hosts in `next.config.ts`.
- **One theme**, locked for the whole page
- **CTAs from `offer.md`**, never invented

*Done when:* every section is fully built. Placeholder comments standing in for
markup mean the step is unfinished.

## Step 4. Audit in writing

Run all four, written out in the response, each line carrying a verdict and a
one-line justification.

1. **Em-dash audit.** Zero U+2014 and zero U+2013 in the page copy. Mechanical:
   search the rendered strings for both codepoints and report counts.
2. **Pre-Flight Check.** Every box in tasteskill §14, each marked Pass or Fail.
3. **Section-Layout-Repetition audit.** Each section with its layout family,
   then the distinct-family count.
4. **Hero discipline audit.** Headline line count, subtext word count, CTA
   visibility against its background.

*Done when:* every box across all four reads Pass. A single Fail means the work
is unfinished. Fix the cause, then re-run the audit that caught it. Reporting a
Fail and stopping is an unfinished run, not a completed one.
