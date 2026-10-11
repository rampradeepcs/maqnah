"use client";

import { useEffect, useRef, useState } from "react";
import { contact, site } from "@/lib/content";
import { Icon } from "../ui/Icon";

type State = "idle" | "sending" | "sent" | "error";

const input =
  "w-full rounded-xl border border-line bg-void px-4 py-3 text-base text-fg sm:text-[15px] outline-none transition-[border-color,background-color,box-shadow] duration-300 placeholder:text-faint focus:border-signal focus:bg-white focus:shadow-[0_0_0_4px_rgba(0,108,53,0.1)]";

function Field({
  label,
  required,
  className = "",
  children,
}: {
  label: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`grid gap-2 ${className}`}>
      <span className="text-[13.5px] font-medium text-fg">
        {label}
        {required && <span className="text-signal"> *</span>}
      </span>
      {children}
    </label>
  );
}

export function ContactForm() {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState<string | null>(null);
  const { form } = contact;
  const done = useRef<HTMLParagraphElement>(null);

  // The form is replaced by the confirmation: move focus there so keyboard
  // and screen-reader users land on (and hear) the result.
  useEffect(() => {
    if (state === "sent") done.current?.focus();
  }, [state]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState("sending");
    setError(null);

    const el = e.currentTarget;
    const data = Object.fromEntries(new FormData(el).entries());

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
      el.reset();
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  if (state === "sent") {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center gap-4 text-center">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-signal text-white">
          <Icon name="check" className="h-6 w-6" />
        </span>
        <p ref={done} tabIndex={-1} className="display t-h3 text-fg outline-none">
          Message received.
        </p>
        <p className="max-w-sm text-[15px] leading-relaxed text-muted">
          We read every one of these ourselves. Expect a reply from the team
          within two working days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
      <Field label="First name" required>
        <input name="firstName" type="text" required autoComplete="given-name" className={input} />
      </Field>
      <Field label="Last name" required>
        <input name="lastName" type="text" required autoComplete="family-name" className={input} />
      </Field>
      <Field label="Work email" required>
        <input name="email" type="email" required autoComplete="email" className={input} />
      </Field>
      <Field label="Company name">
        <input name="company" type="text" autoComplete="organization" className={input} />
      </Field>

      {/* Two controls share one visible name, so this is a labelled group
          rather than a <label> (which would only name the first control). */}
      <div role="group" aria-labelledby="phone-label" className="grid gap-2 sm:col-span-2">
        <span id="phone-label" className="text-[13.5px] font-medium text-fg">
          Phone number<span className="text-signal"> *</span>
        </span>
        <span className="grid grid-cols-[118px_1fr] gap-2">
          <select
            name="phoneCode"
            aria-label="Country code"
            defaultValue={form.countryCodes[0]}
            className={`${input} pr-2`}
          >
            {form.countryCodes.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <input
            name="phone"
            type="tel"
            required
            autoComplete="tel-national"
            aria-label="Phone number"
            className={input}
          />
        </span>
      </div>

      <Field label="What would you like to achieve?" required className="sm:col-span-2">
        <textarea name="message" data-lenis-prevent required rows={4} className={`${input} min-h-[118px] resize-y`} />
      </Field>

      <label className="flex items-start gap-3 text-[13.5px] leading-relaxed text-muted sm:col-span-2">
        <input
          name="consent"
          type="checkbox"
          required
          className="mt-0.5 h-[18px] w-[18px] shrink-0 accent-[var(--color-signal)]"
        />
        <span>{form.consent}</span>
      </label>

      {/* Honeypot — real people never fill this in. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="pointer-events-none absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div className="flex flex-col items-center gap-3 pt-2 sm:col-span-2">
        <button
          type="submit"
          disabled={state === "sending"}
          data-cursor="SEND"
          className="btn btn-primary px-8 disabled:opacity-60"
        >
          {state === "sending" ? "Sending…" : form.submit}
        </button>
        <p aria-live="polite" className="text-center text-[13.5px] text-muted">
          {state === "error" && (
            <>
              {error}{" "}
              <a href={`mailto:${site.email}`} className="text-signal underline underline-offset-4">
                Email us directly
              </a>
              .
            </>
          )}
        </p>
      </div>
    </form>
  );
}
