import Link from "next/link";
import { site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-bg/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="font-semibold tracking-tight">
          {site.name}
        </Link>
        <ul className="flex items-center gap-6 text-sm">
          {site.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-muted transition-colors hover:text-fg"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
