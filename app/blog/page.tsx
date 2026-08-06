import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/lib/posts";
import { openGraph } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing, updates and release notes.",
  // Spread the shared object: setting any openGraph key here would otherwise
  // replace the root layout's entire openGraph object.
  openGraph: { ...openGraph, title: "Blog" },
};

export default function BlogIndex() {
  return (
    <div>
      <h1 className="font-semibold text-4xl tracking-tight">Blog</h1>
      <ul className="mt-10 divide-y divide-line border-line border-t">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group flex flex-col gap-1 py-6"
            >
              <time
                dateTime={post.date}
                className="font-mono text-muted text-xs"
              >
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span className="font-medium text-xl tracking-tight group-hover:text-accent">
                {post.title}
              </span>
              <span className="text-muted">{post.description}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
