import { NextResponse } from "next/server";

/**
 * Careers-form delivery via Resend. Accepts multipart/form-data with an
 * optional resume attachment. Env overrides: CAREERS_TO, CAREERS_BCC,
 * CAREERS_FROM; requires RESEND_API_KEY.
 */
const TO = process.env.CAREERS_TO ?? "info@nachitekneka.com";
const BCC = process.env.CAREERS_BCC ?? "rampradeepux@gmail.com";
const FROM = process.env.CAREERS_FROM ?? "Nachi Tekneka Careers <careers@nachitekneka.com>";

/** Vercel serverless request bodies cap at ~4.5 MB — leave headroom. */
const MAX_RESUME_BYTES = 4 * 1024 * 1024;
const RESUME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export async function POST(req: Request) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return NextResponse.json({ ok: false, error: "Email delivery is not configured" }, { status: 503 });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const field = (k: string, max = 500) => {
    const v = form.get(k);
    return typeof v === "string" ? v.trim().slice(0, max) : "";
  };

  const name = field("name", 120);
  const email = field("email", 200);
  const phone = field("phone", 50);
  const location = field("location", 200);
  const role = field("role", 150);
  const experience = field("experience", 50);
  const cover = field("cover", 5000);

  if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Name and a valid email are required" }, { status: 400 });
  }

  const attachments: { filename: string; content: string }[] = [];
  const resume = form.get("resume");
  if (resume instanceof File && resume.size > 0) {
    if (resume.size > MAX_RESUME_BYTES) {
      return NextResponse.json({ ok: false, error: "Resume must be under 4 MB" }, { status: 400 });
    }
    if (!RESUME_TYPES.includes(resume.type)) {
      return NextResponse.json({ ok: false, error: "Resume must be a PDF or Word document" }, { status: 400 });
    }
    const buf = Buffer.from(await resume.arrayBuffer());
    attachments.push({
      filename: resume.name.slice(0, 120) || "resume.pdf",
      content: buf.toString("base64"),
    });
  }

  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone],
    ["Location", location],
    ["Position", role],
    ["Experience", experience],
    ["Why Nachi Tekneka", cover],
  ];
  const html = `
    <h2 style="font-family:sans-serif">New job application — nachitekneka.com</h2>
    <table style="font-family:sans-serif;border-collapse:collapse">${rows
      .filter(([, v]) => v)
      .map(
        ([k, v]) =>
          `<tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:bold">${k}</td><td style="padding:6px 12px;border:1px solid #ddd;white-space:pre-wrap">${esc(v)}</td></tr>`,
      )
      .join("")}</table>
    ${attachments.length ? "<p style='font-family:sans-serif'>Resume attached.</p>" : "<p style='font-family:sans-serif'>No resume attached.</p>"}`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      bcc: [BCC],
      reply_to: email,
      subject: `Job application: ${role || "General"} — ${name}`,
      html,
      attachments,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error("Resend careers delivery failed:", res.status, detail);
    return NextResponse.json({ ok: false, error: "Delivery failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
