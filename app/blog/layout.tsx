/**
 * Prose styling for MDX posts, so a post file stays plain markdown with no
 * classes in it. Styled with child selectors rather than adding the typography
 * plugin — one less dependency for a handful of elements.
 */
export default function BlogLayout({ children }: LayoutProps<"/blog">) {
  return (
    <main className="mx-auto max-w-2xl px-6 py-20 [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-4 [&_code]:rounded [&_code]:bg-line [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[0.9em] [&_h1]:mb-8 [&_h1]:font-semibold [&_h1]:text-4xl [&_h1]:tracking-tight [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:font-semibold [&_h2]:text-2xl [&_h2]:tracking-tight [&_li]:my-1 [&_ol]:my-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:my-6 [&_p]:leading-7 [&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:border [&_pre]:border-line [&_pre]:p-4 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_ul]:my-6 [&_ul]:list-disc [&_ul]:pl-6">
      {children}
    </main>
  );
}
