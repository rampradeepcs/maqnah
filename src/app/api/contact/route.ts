import { NextResponse } from "next/server";

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

/**
 * Contact form endpoint.
 *
 * Sends through Resend's REST API when RESEND_API_KEY is configured. Without
 * it the route fails loudly rather than silently swallowing an enquiry — the
 * form then points the visitor at the mailbox directly.
 */
export async function POST(req: Request) {
  let parsed: unknown;
  try {
    parsed = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const body = parsed as Record<string, unknown>;

  // Honeypot
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
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
      return NextResponse.json(
        { error: "One of the fields is too long." },
        { status: 400 },
      );
    }
  }

  if (!firstName || !lastName || !email || !phone || !message) {
    return NextResponse.json(
      { error: "Name, work email, phone number and your goal are required." },
      { status: 400 },
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json(
      { error: "That email address doesn't look right." },
      { status: 400 },
    );
  }
  if (!consent) {
    return NextResponse.json(
      { error: "Please agree to be contacted about your enquiry." },
      { status: 400 },
    );
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO ?? "mohsin@maqnah.com";
  const from = process.env.CONTACT_FROM ?? "Maqnah Website <onboarding@resend.dev>";

  if (!key) {
    return NextResponse.json(
      { error: "The contact form isn't connected yet." },
      { status: 503 },
    );
  }

  const escape = (s: string) =>
    s.replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" })[c]!);
  const name = `${firstName} ${lastName}`;

  const failed = () =>
    NextResponse.json({ error: "We couldn't send that just now." }, { status: 502 });

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
        subject: `Discovery session request — ${company || name}`,
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
    if (!res.ok) return failed();
  } catch {
    return failed();
  }

  return NextResponse.json({ ok: true });
}
