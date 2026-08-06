import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { openGraph, site } from "@/lib/site";
import "./globals.css";

// A starting default, not a decision — Geist is one of the faces the skills
// accept (never Inter, Roboto, Arial, Open Sans or Helvetica, which all of them
// ban). Swap it for whatever your chosen skill calls for.
//
// Self-hosted at build time either way: no request reaches Google from a
// visitor's browser, and no layout shift.
const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  // Required — relative URLs in metadata throw a build error without it.
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: { ...openGraph, title: site.name, description: site.description },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={geist.variable}>
      <body className="min-h-[100dvh] font-sans antialiased">
        {children}
        {/* Inert until you turn Web Analytics on in the Vercel dashboard. */}
        <Analytics />
      </body>
    </html>
  );
}
