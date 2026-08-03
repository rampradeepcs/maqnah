"use client";

import { useRef, useState } from "react";
import { openRoles, company } from "@/lib/data";
import { Eyebrow } from "./Section";
import { Reveal } from "./Reveal";
import { Icons } from "./Icons";

const perks = [
  {
    icon: "bolt",
    title: "Hands-on engineering",
    body: "Real machines, real mills — your work ships to production floors, not slide decks.",
  },
  {
    icon: "globe",
    title: "Global exposure",
    body: "Serve customers across India, the USA and Mexico from our Coimbatore headquarters.",
  },
  {
    icon: "shield",
    title: "ISO-certified craft",
    body: "Work inside an ISO 9001:2015 quality system that takes precision seriously.",
  },
  {
    icon: "clock",
    title: "Learn fast, grow fast",
    body: "Small teams and deep mentorship across electronics, mechanics and textiles.",
  },
] as const;

const experienceBands = ["0–2 years", "2–5 years", "5–10 years", "10+ years"];

/** Must stay under Vercel's ~4.5 MB serverless request-body limit. */
const MAX_RESUME_BYTES = 4 * 1024 * 1024;
const RESUME_SIZE_ERROR = "Resume must be under 4 MB — please compress it and try again.";

export function Careers() {
  const [role, setRole] = useState<string>(openRoles[0].title);
  const [experience, setExperience] = useState(experienceBands[1]);
  const [fileName, setFileName] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const apply = (title: string) => {
    setRole(title);
    setSent(false);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  /** Applications are delivered server-side via /api/careers (Resend). */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    fd.set("experience", experience); // chip state, not a native input

    // guard again at submit time — the platform hard-rejects large bodies
    const resume = fd.get("resume");
    if (resume instanceof File && resume.size > MAX_RESUME_BYTES) {
      setError(RESUME_SIZE_ERROR);
      return;
    }

    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/careers", { method: "POST", body: fd });
      if (res.status === 413) throw new Error(RESUME_SIZE_ERROR);
      const body = await res.json().catch(() => ({}));
      if (!res.ok || body.ok !== true) {
        throw new Error(typeof body.error === "string" ? body.error : "delivery failed");
      }
      form.reset();
      setFileName(null);
      setSent(true);
    } catch (err) {
      const specific = err instanceof Error && err.message !== "delivery failed" ? err.message : null;
      setError(specific ?? "generic");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* Why join */}
      <section className="relative py-20 md:py-24">
        <div className="container-x">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {perks.map((p, i) => {
              const Icon = Icons[p.icon];
              return (
                <Reveal key={p.title} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
                  <div className="h-full rounded-2xl border border-line bg-surface3 p-6 shadow-card surface-tint">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand/10 text-brand">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 font-display text-lg font-semibold text-fg">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open roles */}
      <section id="open-roles" className="relative border-y border-line bg-surface py-20 md:py-28">
        <div className="container-x">
          <div className="flex flex-col gap-5">
            <Reveal>
              <Eyebrow>Open positions</Eyebrow>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="h-display text-4xl text-gradient sm:text-5xl">
                Current <span className="text-brand-gradient">openings</span>
              </h2>
            </Reveal>
          </div>

          <ul className="mt-10 flex flex-col">
            {openRoles.map((r, i) => (
              <li key={r.id} className="group relative border-b border-line py-6">
                <div className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-brand/[0.07] to-transparent transition-transform duration-500 group-hover:scale-x-100" style={{ borderRadius: 12 }} />
                <div className="relative flex flex-col gap-4 px-1 md:flex-row md:items-center">
                  <span className="font-display text-sm text-brand/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-semibold text-fg transition-transform duration-500 group-hover:translate-x-1.5 md:text-2xl">
                      {r.title}
                    </h3>
                    <p className="mt-1.5 max-w-2xl text-sm text-muted">{r.blurb}</p>
                    <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium uppercase tracking-[0.14em] text-faint">
                      <span>{r.dept}</span>
                      <span>{r.location}</span>
                      <span>{r.type}</span>
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => apply(r.title)}
                    className="inline-flex h-11 w-fit shrink-0 items-center gap-2 rounded-full border border-line px-6 text-sm font-semibold text-fg transition-colors hover:border-transparent hover:bg-brand hover:text-white"
                  >
                    Apply
                    <Icons.arrow className="h-4 w-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-sm text-muted">
            Don&apos;t see your role? Apply below anyway — we&apos;re always looking for
            exceptional people.
          </p>
        </div>
      </section>

      {/* Application form */}
      <section ref={formRef} id="apply" className="relative scroll-mt-24 overflow-hidden py-20 md:py-28">
        <div className="pointer-events-none absolute -bottom-40 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-radial-brand opacity-40" />
        <div className="container-x">
          <div className="grid overflow-hidden rounded-[1.75rem] border border-line lg:grid-cols-[0.85fr_1.15fr]">
            {/* Left — pitch */}
            <div className="relative flex flex-col justify-between gap-10 bg-gradient-to-b from-surface2 to-surface p-8 md:p-12">
              <div>
                <Eyebrow>Apply now</Eyebrow>
                <h2 className="h-display mt-5 text-4xl text-gradient md:text-5xl">
                  Start your
                  <br />
                  application
                </h2>
                <p className="mt-5 max-w-sm text-muted">
                  Tell us who you are and what you&apos;ve built. Our team reviews every
                  application personally — no bots, no black holes.
                </p>
              </div>
              <ul className="space-y-3 text-sm text-muted">
                <li className="flex items-center gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-surface2 text-brand">
                    <Icons.tested className="h-4 w-4" />
                  </span>
                  Response within one week
                </li>
                <li className="flex items-center gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-surface2 text-brand">
                    <Icons.function className="h-4 w-4" />
                  </span>
                  Technical interview with the engineering team
                </li>
                <li className="flex items-center gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-surface2 text-brand">
                    <Icons.globe className="h-4 w-4" />
                  </span>
                  Or email your resume to{" "}
                  <a href={`mailto:${company.email}`} className="font-semibold text-brand">
                    {company.email}
                  </a>
                </li>
              </ul>
            </div>

            {/* Right — form */}
            <div className="bg-surface/40 p-8 backdrop-blur md:p-12">
              {sent ? (
                <div className="flex h-full min-h-[24rem] flex-col items-center justify-center text-center">
                  <div className="grid h-16 w-16 place-items-center rounded-full bg-brand/15 text-brand ring-1 ring-brand/30">
                    <Icons.tested className="h-8 w-8" />
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-semibold text-fg">
                    Application received
                  </h3>
                  <p className="mt-2 max-w-sm text-muted">
                    Thank you for applying for <span className="font-semibold text-fg">{role}</span>.
                    Our team will review your profile and get back to you within a week.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-6 text-sm font-semibold text-brand hover:text-brand-glow"
                  >
                    Submit another application
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Full name" name="name" required placeholder="Your name" />
                    <Field label="Email" name="email" type="email" required placeholder="you@example.com" />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Phone" name="phone" placeholder="+91 …" />
                    <Field label="Current location" name="location" placeholder="City, Country" />
                  </div>

                  <div>
                    <label htmlFor="role" className="mb-2.5 block text-sm font-medium text-muted">
                      Position <span className="text-brand">*</span>
                    </label>
                    <select
                      id="role"
                      name="role"
                      required
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full appearance-none rounded-xl border border-line bg-surface2 px-4 py-3 text-sm text-fg transition-colors focus:border-brand/50 focus:outline-none"
                    >
                      {openRoles.map((r) => (
                        <option key={r.id} value={r.title}>
                          {r.title}
                        </option>
                      ))}
                      <option value="Other / General application">
                        Other / General application
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2.5 block text-sm font-medium text-muted">
                      Experience
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {experienceBands.map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setExperience(b)}
                          className={`rounded-full border px-4 py-2 text-sm transition-all ${
                            experience === b
                              ? "border-transparent bg-brand text-white"
                              : "border-line text-muted hover:border-fg/25"
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="resume" className="mb-2.5 block text-sm font-medium text-muted">
                      Resume / CV <span className="text-brand">*</span>
                    </label>
                    <label
                      htmlFor="resume"
                      className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-dashed border-line bg-surface2 px-4 py-3 text-sm transition-colors hover:border-brand/50"
                    >
                      <span className={fileName ? "truncate font-medium text-fg" : "text-faint"}>
                        {fileName ?? "Upload PDF or DOC (max 4 MB)"}
                      </span>
                      <span className="inline-flex shrink-0 items-center gap-1.5 font-semibold text-brand">
                        <Icons.download className="h-4 w-4 rotate-180" />
                        Browse
                      </span>
                    </label>
                    <input
                      id="resume"
                      name="resume"
                      type="file"
                      required
                      accept=".pdf,.doc,.docx"
                      className="sr-only"
                      onChange={(e) => {
                        const f = e.target.files?.[0] ?? null;
                        if (f && f.size > MAX_RESUME_BYTES) {
                          e.target.value = ""; // reject oversized file immediately
                          setFileName(null);
                          setError(RESUME_SIZE_ERROR);
                          return;
                        }
                        setError(null);
                        setFileName(f?.name ?? null);
                      }}
                    />
                  </div>

                  <div>
                    <label htmlFor="cover" className="mb-2.5 block text-sm font-medium text-muted">
                      Why Nachi Tekneka?
                    </label>
                    <textarea
                      id="cover"
                      name="cover"
                      rows={4}
                      placeholder="A few lines about your experience and what excites you about this role…"
                      className="w-full resize-none rounded-xl border border-line bg-surface2 px-4 py-3 text-sm text-fg placeholder:text-faint transition-colors focus:border-brand/50 focus:bg-surface2 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="shine inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {sending ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                        Submitting…
                      </>
                    ) : (
                      <>
                        Submit application
                        <Icons.arrow className="h-4 w-4" />
                      </>
                    )}
                  </button>
                  {error && (
                    <p className="text-center text-sm text-brand" role="alert">
                      {error !== "generic"
                        ? error
                        : "Something went wrong sending your application. Please try again, or email your resume to "}
                      {error === "generic" && (
                        <a href={`mailto:${company.email}`} className="font-semibold underline">
                          {company.email}
                        </a>
                      )}
                    </p>
                  )}
                  <p className="text-center text-xs text-faint">
                    By applying you agree to be contacted about this and future openings.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2.5 block text-sm font-medium text-muted">
        {label} {required && <span className="text-brand">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-line bg-surface2 px-4 py-3 text-sm text-fg placeholder:text-faint transition-colors focus:border-brand/50 focus:bg-surface2 focus:outline-none"
      />
    </div>
  );
}
