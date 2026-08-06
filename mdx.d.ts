/**
 * `@types/mdx` only declares the default export of an .mdx module, so importing
 * a post's `metadata` doesn't type-check without this. Ambient module
 * declarations merge, so this adds to that declaration rather than replacing it.
 *
 * Keep in sync with the `metadata` export every post in app/blog/ must have.
 */
declare module "*.mdx" {
  export const metadata: {
    title: string;
    description: string;
    /** ISO date, e.g. "2026-08-06". Sorts the blog index and feeds sitemap.xml. */
    date: string;
  };
}
