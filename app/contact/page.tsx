import type { Metadata } from "next";
import { openGraph } from "@/lib/site";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch.",
  openGraph: { ...openGraph, title: "Contact" },
};

// The form itself is a Client Component (useActionState); this page stays a
// Server Component so it can export metadata. Colocating contact-form.tsx here
// is safe — only page.tsx and route.ts create URLs.
export default function ContactPage() {
  return (
    <main className="mx-auto max-w-xl px-6 py-20">
      <h1 className="font-semibold text-4xl tracking-tight">Contact</h1>
      <p className="mt-4 text-muted">
        Tell us what you need. We read everything.
      </p>
      <ContactForm />
    </main>
  );
}
