import { metadata as helloWorld } from "@/app/blog/hello-world/page.mdx";

/**
 * The blog index. Adding a post is two steps:
 *   1. app/blog/<slug>/page.mdx  with  `export const metadata`
 *   2. one line here
 *
 * No frontmatter parser, no content layer, no filesystem access — each post's
 * own metadata export is the single source of truth, and it feeds the Next.js
 * Metadata API directly.
 *
 * Past roughly twenty posts, swap this for `fs` + a glob. Not before.
 */
export const posts = [{ slug: "hello-world", ...helloWorld }].sort(
  (a, b) => Date.parse(b.date) - Date.parse(a.date),
);
