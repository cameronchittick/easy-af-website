import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60dvh] max-w-7xl flex-col justify-center px-6 py-24">
      <p className="font-mono text-muted text-sm">404</p>
      <h1 className="mt-3 font-semibold text-4xl tracking-tight">
        This page does not exist.
      </h1>
      <Link
        href="/"
        className="mt-8 w-fit text-accent underline underline-offset-4"
      >
        Back home
      </Link>
    </main>
  );
}
