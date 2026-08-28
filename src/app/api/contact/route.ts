import { NextResponse } from "next/server";

/**
 * Contact-form delivery via Resend (https://resend.com).
 * Configure in Vercel env: RESEND_API_KEY (required); CONTACT_TO,
 * CONTACT_CC, CONTACT_FROM optional overrides.
 */
const TO = process.env.CONTACT_TO ?? "sales03@nachitekneka.com";
const CC = process.env.CONTACT_CC ?? "raaj@nachitekneka.com";
const FROM = process.env.CONTACT_FROM ?? "Nachi Tekneka Website <enquiry@nachitekneka.com>";

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export async function POST(req: Request) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return NextResponse.json({ ok: false, error: "Email delivery is not configured" }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const field = (k: string, max = 500) =>
    typeof body[k] === "string" ? (body[k] as string).trim().slice(0, max) : "";

  const name = field("name", 120);
  const email = field("email", 200);
  const company = field("company", 200);
  const phone = field("phone", 50);
  const interest = field("interest", 100);
  const message = field("message", 5000);

  if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Name and a valid email are required" }, { status: 400 });
  }

  const rows: [string, string][] = [
    ["Name", name],
    ["Company", company],
    ["Email", email],
    ["Phone", phone],
    ["Interested in", interest],
    ["Message", message],
  ];
  const html = `
    <h2 style="font-family:sans-serif">New enquiry — nachitekneka.com</h2>
    <table style="font-family:sans-serif;border-collapse:collapse">${rows
      .filter(([, v]) => v)
      .map(
        ([k, v]) =>
          `<tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:bold">${k}</td><td style="padding:6px 12px;border:1px solid #ddd;white-space:pre-wrap">${esc(v)}</td></tr>`,
      )
      .join("")}</table>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      cc: [CC],
      reply_to: email,
      subject: `New enquiry from nachitekneka.com — ${name}`,
      html,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error("Resend delivery failed:", res.status, detail);
    return NextResponse.json({ ok: false, error: "Delivery failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
