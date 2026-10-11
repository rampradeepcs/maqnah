import { NextResponse } from "next/server";

/**
 * Contact form endpoint.
 *
 * Sends through Resend's REST API when RESEND_API_KEY is configured. Without
 * it the route fails loudly rather than silently swallowing an enquiry — the
 * form then points the visitor at the mailbox directly.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

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

  if (!res.ok) {
    return NextResponse.json(
      { error: "We couldn't send that just now." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
