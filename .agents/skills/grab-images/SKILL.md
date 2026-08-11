---
name: grab-images
description: Pull an existing site's images into this repo, so a rebuild keeps the real logo and photography.
argument-hint: "<url>"
disable-model-invocation: true
---

# grab-images

f(url) to files on disk. One regex over the served HTML, resolved against the
page URL. Node's own fetch, so there is nothing to install.

## Step 1. List before writing

```
node .agents/skills/grab-images/grab-images.mjs https://theirsite.com --list
```

Prints every image URL and writes nothing. A real marketing site returns the
logo alongside avatars, sprites, and tracking pixels, so read the list and name
which files you came for.

*Done when:* you can say which URLs are the brand and which are noise.

## Step 2. Write, and mind the reserved names

Drop `--list` to write into `public/`, the Next static root, where
`public/logo.svg` serves at `/logo.svg` with no import and no config.

Three filenames are Next's own, read from `app/` and already sitting there in
this repo: `icon.svg`, `apple-icon.png`, `opengraph-image.png`. A favicon or OG
image off the old site replaces those files in place, under those names. A copy
in `public/` is ignored.

*Done when:* the brand files are in `public/`, and any favicon or OG image has
landed in `app/` under its reserved name.

## Step 3. Triage what landed

`public/` is served. Everything Step 1 flagged as noise deploys with the site
until you clear it, and it is cheapest to clear now, while you still remember
which file is which.

*Done when:* every file the script wrote is either one you will use or gone.

## When the logo comes back missing

The regex reads `src`, `href`, and `content`. It is blind to CSS
`background-image`, inline `<svg>`, `srcset` candidates the `src` does not name,
and anything the client renders after load. A missing logo is one of those four:
open devtools and save that one file by hand.

Images from someone else's site stay theirs. Good for rebuilding that brand,
not as stock for an unrelated one.
