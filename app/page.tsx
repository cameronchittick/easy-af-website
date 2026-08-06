import Link from "next/link";

/**
 * The one file most people will actually edit.
 *
 * This is a deliberately plain starting point, not a design. Ask Claude for a
 * landing page and the design-taste-frontend skill in .claude/skills/ will
 * replace it with something built from your brief.
 */
export default function Home() {
  return (
    <main className="mx-auto flex min-h-[70dvh] max-w-7xl flex-col justify-center px-6 py-24">
      <h1 className="max-w-3xl text-balance font-semibold text-5xl tracking-tight sm:text-7xl">
        Ship the marketing site today.
      </h1>
      <p className="mt-6 max-w-xl text-lg text-muted text-pretty">
        Next.js, Tailwind and Vercel, wired together and nothing else. Edit{" "}
        <code className="rounded bg-line px-1.5 py-0.5 text-sm">
          lib/site.ts
        </code>{" "}
        first.
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href="/contact"
          className="rounded-full bg-accent px-6 py-3 font-medium text-white transition-opacity hover:opacity-90"
        >
          Get in touch
        </Link>
        <Link
          href="/blog"
          className="rounded-full border border-line px-6 py-3 font-medium transition-colors hover:border-fg"
        >
          Read the blog
        </Link>
      </div>
    </main>
  );
}
