"use client";

import { useState } from "react";
import { site } from "@/lib/content";

type State = "idle" | "sending" | "sent" | "error";

const FIELDS = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "email", label: "Work email", type: "email", required: true },
  { name: "company", label: "Company name", type: "text", required: true },
] as const;

export function ContactForm() {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState("sending");
    setError(null);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Something went wrong.");
      }
      setState("sent");
      form.reset();
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  if (state === "sent") {
    return (
      <div className="panel flex min-h-[380px] flex-col items-start justify-center p-8 md:p-12">
        <span className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-signal text-void">
          ✓
        </span>
        <p className="display text-[clamp(1.4rem,2.4vw,2rem)] leading-tight">
          Message received.
        </p>
        <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-muted">
          We read every one of these ourselves. Expect a reply from the team
          within two working days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="panel p-7 md:p-10">
      <div className="grid gap-6 sm:grid-cols-2">
        {FIELDS.map((f) => (
          <label
            key={f.name}
            className={f.name === "company" ? "sm:col-span-2" : undefined}
          >
            <span className="tag mb-2 block">
              {f.label}
              {f.required && <span className="text-signal"> *</span>}
            </span>
            <input
              name={f.name}
              type={f.type}
              required={f.required}
              autoComplete={
                f.name === "email"
                  ? "email"
                  : f.name === "name"
                    ? "name"
                    : "organization"
              }
              className="w-full border-b border-line bg-transparent pb-2.5 text-[15px] text-fg outline-none transition-colors duration-300 placeholder:text-faint focus:border-signal"
            />
          </label>
        ))}

        <label className="sm:col-span-2">
          <span className="tag mb-2 block">Message</span>
          <textarea
            name="message"
            rows={4}
            placeholder="What are you trying to move?"
            className="w-full resize-none border-b border-line bg-transparent pb-2.5 text-[15px] text-fg outline-none transition-colors duration-300 placeholder:text-faint focus:border-signal"
          />
        </label>
      </div>

      {/* Honeypot — real people never fill this in. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="pointer-events-none absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div className="mt-9 flex flex-wrap items-center gap-5">
        <button
          type="submit"
          disabled={state === "sending"}
          data-cursor="SEND →"
          className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-signal px-7 py-3.5 text-sm font-semibold text-void disabled:opacity-60"
        >
          <span className="relative z-10">
            {state === "sending" ? "Sending…" : "Submit"}
          </span>
          <span className="relative z-10 transition-transform duration-500 group-hover:translate-x-1">
            →
          </span>
        </button>

        {state === "error" && (
          <p className="text-[13px] text-muted">
            {error}{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-signal underline underline-offset-4"
            >
              Email us directly
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
