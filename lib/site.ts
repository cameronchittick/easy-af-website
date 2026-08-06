/**
 * The one file to edit on day one.
 *
 * Everything that identifies this site lives here: metadata, sitemap, robots,
 * header and footer all read from it. Change your domain in one place.
 */

export const site = {
  name: "Easy AF",
  // Used for metadataBase, sitemap and robots. Set NEXT_PUBLIC_SITE_URL in
  // production; the localhost fallback keeps `next build` from erroring on a
  // fresh clone (relative metadata URLs require metadataBase).
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  description:
    "A marketing site template that is easy as fuck to ship. Next.js, Tailwind, Vercel.",
  // Shown in the footer. Delete what you do not use.
  socials: {
    x: "https://x.com/",
    github: "https://github.com/",
  },
  nav: [
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ],
} as const;

/**
 * Metadata merges *shallowly* root -> leaf: a page that sets any `openGraph`
 * key replaces the layout's entire `openGraph` object. Spread this into page
 * metadata instead of redeclaring it.
 * https://nextjs.org/docs/app/api-reference/functions/generate-metadata#overwriting-fields
 */
export const openGraph = {
  siteName: site.name,
  locale: "en_US",
  type: "website",
} as const;
