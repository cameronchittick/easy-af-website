"use client";

import { useActionState } from "react";
import { type ContactState, submitContact } from "./actions";

const field =
  "w-full rounded-lg border border-line bg-transparent px-4 py-3 outline-none focus-visible:border-accent";

export function ContactForm() {
  const [state, formAction, pending] = useActionState<ContactState, FormData>(
    submitContact,
    null,
  );

  return (
    <form action={formAction} className="mt-10 flex flex-col gap-4">
      <label className="flex flex-col gap-2">
        <span className="text-muted text-sm">Name</span>
        <input name="name" required maxLength={100} className={field} />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-muted text-sm">Email</span>
        <input
          name="email"
          type="email"
          required
          maxLength={200}
          className={field}
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-muted text-sm">Message</span>
        <textarea
          name="message"
          required
          rows={6}
          maxLength={5000}
          className={field}
        />
      </label>

      {/* Honeypot. Hidden from people and assistive tech, irresistible to bots. */}
      <input
        name="company"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="sr-only"
      />

      <button
        type="submit"
        disabled={pending}
        className="mt-2 w-fit rounded-full bg-accent px-6 py-3 font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {pending ? "Sending…" : "Send message"}
      </button>

      {/* <output> carries an implicit role=status, so screen readers announce
          the result without needing aria-live wired up by hand. */}
      {state && (
        <output className={state.ok ? "text-accent" : "text-red-500"}>
          {state.message}
        </output>
      )}
    </form>
  );
}
