"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary, Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { Icon } from "../ui/Icon";

type State = "idle" | "sending" | "sent" | "error";

const input =
  "w-full rounded-xl border border-line bg-void px-4 py-3 text-base text-fg outline-none transition-[border-color,background-color,box-shadow] duration-300 placeholder:text-faint focus:border-signal focus:bg-white focus:shadow-[0_0_0_4px_rgba(0,108,53,0.1)]";

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

export function ContactForm({
  form,
  ui,
  locale,
}: {
  form: Dictionary["contact"]["form"];
  ui: Dictionary["ui"];
  locale: Locale;
}) {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState<string | null>(null);
  const t = ui.form;
  const done = useRef<HTMLParagraphElement>(null);

  // The form is replaced by the confirmation: move focus there so keyboard
  // and screen-reader users land on (and hear) the result.
  useEffect(() => {
    if (state === "sent") done.current?.focus();
  }, [state]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state === "sending") return;
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
        throw new Error(body.error ?? t.genericError);
      }
      setState("sent");
      el.reset();
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : t.genericError);
    }
  };

  if (state === "sent") {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center gap-4 text-center">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-signal text-white">
          <Icon name="check" className="h-6 w-6" />
        </span>
        <p ref={done} tabIndex={-1} className="display t-h3 text-fg outline-none">
          {t.successTitle}
        </p>
        <p className="max-w-sm text-[15px] leading-relaxed text-muted">{t.successBody}</p>
      </div>
    );
  }

  return (
    <form
      method="post"
      action="/api/contact"
      onSubmit={onSubmit}
      className="grid gap-4 sm:grid-cols-2"
    >
      {/* Tells the API which language to answer in */}
      <input type="hidden" name="locale" value={locale} />
      <Field label={t.firstName} required>
        <input name="firstName" type="text" required autoComplete="given-name" className={input} />
      </Field>
      <Field label={t.lastName} required>
        <input name="lastName" type="text" required autoComplete="family-name" className={input} />
      </Field>
      <Field label={t.email} required>
        <input name="email" type="email" dir="ltr" required autoComplete="email" className={input} />
      </Field>
      <Field label={t.company}>
        <input name="company" type="text" autoComplete="organization" className={input} />
      </Field>

      {/* Two controls share one visible name, so this is a labelled group
          rather than a <label> (which would only name the first control). */}
      <div role="group" aria-labelledby="phone-label" className="grid gap-2 sm:col-span-2">
        <span id="phone-label" className="text-[13.5px] font-medium text-fg">
          {t.phone}
          <span className="text-signal"> *</span>
        </span>
        {/* Code then number, left to right, in either language */}
        <span dir="ltr" className="grid grid-cols-[118px_1fr] gap-2">
          <select
            name="phoneCode"
            aria-label={t.countryCode}
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
            aria-label={t.phone}
            className={input}
          />
        </span>
      </div>

      <Field label={t.message} required className="sm:col-span-2">
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
          aria-disabled={state === "sending"}
          data-cursor={ui.cursor.send}
          className="btn btn-primary px-8 aria-disabled:cursor-wait aria-disabled:opacity-60"
        >
          {state === "sending" ? t.sending : form.submit}
        </button>
        <p aria-live="polite" className="text-center text-[13.5px] text-muted">
          {state === "error" && (
            <>
              {error}{" "}
              <a href={`mailto:${site.email}`} className="text-signal underline underline-offset-4">
                {t.emailUs}
              </a>
              .
            </>
          )}
        </p>
      </div>
    </form>
  );
}
