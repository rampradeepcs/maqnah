import { NextResponse } from "next/server";
import { dictionaryFor, type Dictionary } from "@/lib/i18n";
import { site } from "@/lib/site";

/** Generous ceilings — anything longer is not a real enquiry. */
const LIMITS = {
  firstName: 100,
  lastName: 100,
  email: 254,
  company: 150,
  phoneCode: 16,
  phone: 30,
  message: 5000,
} as const;

const escape = (s: string) =>
  s.replace(/[<>&"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" })[c]!);

/**
 * The result page for a browser that posted the form itself (no
 * JavaScript): same messages as the in-page states, plus the mailbox.
 */
function resultPage(dict: Dictionary, status: number, error?: string) {
  const { api, form } = dict.ui;
  const home = dict.meta.path;
  const body = error
    ? `<h1>${escape(api.failTitle)}</h1>
       <p>${escape(error)}</p>
       <p>${escape(api.emailDirect)} <a href="mailto:${site.email}" dir="ltr">${site.email}</a></p>
       <p><a href="${home}#contact">${escape(api.backToForm)}</a></p>`
    : `<h1>${escape(form.successTitle)}</h1>
       <p>${escape(form.successBody)}</p>
       <p><a href="${home}">${escape(api.backToSite)}</a></p>`;
  const html = `<!doctype html><html lang="${dict.lang}" dir="${dict.dir}"><head><meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex"><title>${escape(error ? api.failTitle : form.successTitle)} · ${site.name}</title>
    <style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#f3f4f1;color:#101512;font:17px/1.6 system-ui,sans-serif}
    main{max-width:34rem;padding:2rem}h1{font-weight:500;font-size:2rem;margin:0 0 .75rem}a{color:#006c35}</style>
    </head><body><main>${body}</main></body></html>`;
  return new Response(html, {
    status: error ? status : 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

/**
 * Contact form endpoint.
 *
 * The page posts JSON. Without JavaScript the browser posts the form itself
 * (urlencoded), and gets a small result page instead of JSON. Either way the
 * form's hidden `locale` field picks the language of the reply.
 *
 * Sends through Resend's REST API when RESEND_API_KEY is configured. Without
 * it the route fails loudly rather than silently swallowing an enquiry — the
 * visitor is pointed at the mailbox directly.
 */
export async function POST(req: Request) {
  const asPage = !(req.headers.get("content-type") ?? "").includes("application/json");
  let dict = dictionaryFor("en");
  const reply = (status: number, error?: string) =>
    asPage
      ? resultPage(dict, status, error)
      : NextResponse.json(error ? { error } : { ok: true }, { status });

  let parsed: unknown;
  try {
    parsed = asPage ? Object.fromEntries(await req.formData()) : await req.json();
  } catch {
    return reply(400, dict.ui.api.invalid);
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    return reply(400, dict.ui.api.invalid);
  }
  const body = parsed as Record<string, unknown>;
  dict = dictionaryFor(body.locale);
  const msg = dict.ui.api;

  // Honeypot
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return reply(200);
  }

  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const firstName = str(body.firstName);
  const lastName = str(body.lastName);
  const email = str(body.email);
  const company = str(body.company);
  const phoneCode = str(body.phoneCode);
  const phone = str(body.phone);
  const message = str(body.message);
  const consent = body.consent === "on" || body.consent === true;

  const fields = { firstName, lastName, email, company, phoneCode, phone, message };
  for (const [key, max] of Object.entries(LIMITS)) {
    if (fields[key as keyof typeof fields].length > max) {
      return reply(400, msg.tooLong);
    }
  }

  if (!firstName || !lastName || !email || !phone || !message) {
    return reply(400, msg.required);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return reply(400, msg.badEmail);
  }
  if (!consent) {
    return reply(400, msg.consent);
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO ?? "mohsin@maqnah.com";
  const from = process.env.CONTACT_FROM ?? "Maqnah Website <onboarding@resend.dev>";

  if (!key) {
    return reply(503, msg.notConnected);
  }

  const name = `${firstName} ${lastName}`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Discovery session request — ${company || name}${dict.locale === "ar" ? " (AR)" : ""}`,
        html: `
          <h2>New discovery session request from maqnah.com</h2>
          <p><strong>Name:</strong> ${escape(name)}</p>
          <p><strong>Work email:</strong> ${escape(email)}</p>
          <p><strong>Company:</strong> ${escape(company || "—")}</p>
          <p><strong>Phone:</strong> ${escape(`${phoneCode} ${phone}`.trim())}</p>
          <p><strong>What they want to achieve:</strong><br>${escape(message).replace(/\n/g, "<br>")}</p>
          <p><strong>Consent to contact:</strong> yes</p>
        `,
      }),
    });
    if (!res.ok) return reply(502, msg.sendFailed);
  } catch {
    return reply(502, msg.sendFailed);
  }

  return reply(200);
}
