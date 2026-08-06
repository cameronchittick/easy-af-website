import type { MDXComponents } from "mdx/types";

/**
 * Required at the project root by @next/mdx — the App Router integration does
 * not work without this file.
 *
 * Styling for post bodies lives in app/blog/layout.tsx so posts stay plain
 * markdown. Override individual elements here when you need to.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...components };
}
