import type { NextRequest } from "next/server";
import nodemailer from "nodemailer";
import { validate, type Variant } from "@/lib/contact";
import { hit, isDuplicate } from "@/lib/rate-limit";
import { SITE } from "@/lib/site";

const MAX_BODY = 16 * 1024;
const MIN_FILL_MS = 2500;

const json = (body: Record<string, unknown>, status = 200, headers: Record<string, string> = {}) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

function clientIp(req: NextRequest) {
  // On Vercel x-forwarded-for is set by the platform; the left-most entry is the client.
  return (req.headers.get("x-forwarded-for")?.split(",")[0] ?? req.headers.get("x-real-ip") ?? "unknown").trim();
}

/** CSRF defence: browsers always send Origin on cross-site POSTs; require it to match our host. */
function sameOrigin(req: NextRequest) {
  const origin = req.headers.get("origin");
  if (!origin) return false;
  try {
    const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

type Captcha = { ok: true } | { ok: false; reason: "config" | "unavailable" | "invalid" };

async function verifyCaptcha(token: string, ip: string): Promise<Captcha> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return { ok: false, reason: "config" };
  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token, ...(ip !== "unknown" ? { remoteip: ip } : {}) }),
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });
    if (!res.ok) return { ok: false, reason: "unavailable" };
    const data = (await res.json()) as { success?: boolean };
    if (!data.success) return { ok: false, reason: "invalid" };
    return { ok: true };
  } catch {
    return { ok: false, reason: "unavailable" };
  }
}

export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) return json({ ok: false, error: "Request blocked." }, 403);
  if (!(req.headers.get("content-type") ?? "").includes("application/json"))
    return json({ ok: false, error: "Unsupported request." }, 415);

  const ip = clientIp(req);
  const rl = hit(`ip:${ip}`, 5, 10 * 60_000);
  if (!rl.allowed)
    return json({ ok: false, error: "Too many submissions. Please try again later." }, 429, {
      "Retry-After": String(rl.retryAfter),
    });

  let raw: Record<string, unknown>;
  try {
    const text = await req.text();
    if (text.length > MAX_BODY) return json({ ok: false, error: "Message too large." }, 413);
    const parsed: unknown = JSON.parse(text);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("shape");
    raw = parsed as Record<string, unknown>;
  } catch {
    return json({ ok: false, error: "Invalid request." }, 400);
  }

  const variant: Variant | null = raw.variant === "contact" || raw.variant === "volunteer" ? raw.variant : null;
  if (!variant) return json({ ok: false, error: "Invalid request." }, 400);

  // Honeypot: bots fill hidden fields. Pretend success so they learn nothing.
  if (typeof raw.website === "string" && raw.website.length > 0) return json({ ok: true });

  // Humans take more than a couple of seconds to fill in a form.
  const startedAt = Number(raw.startedAt);
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_MS)
    return json({ ok: false, error: "Please take a moment to complete the form, then try again." }, 400);

  const { values, errors, ok } = validate(raw, variant);
  if (!ok) return json({ ok: false, error: "Please correct the highlighted fields.", fieldErrors: errors }, 422);

  const token = typeof raw.captchaToken === "string" ? raw.captchaToken : "";
  if (!token || token.length > 4096)
    return json({ ok: false, error: "Spam check failed. Please reload the page and try again." }, 400);
  const captcha = await verifyCaptcha(token, ip);
  if (!captcha.ok) {
    console.warn(`[contact] captcha rejected: ${captcha.reason}`);
    if (captcha.reason === "config" || captcha.reason === "unavailable")
      return json({ ok: false, error: "We could not verify your submission right now. Please try again shortly or email us directly." }, 503);
    return json({ ok: false, error: "Spam check failed. Please reload the page and try again." }, 400);
  }

  const email = values.email.toLowerCase();
  if (!hit(`em:${email}`, 3, 60 * 60_000).allowed)
    return json({ ok: false, error: "Too many submissions. Please try again later." }, 429);
  if (isDuplicate(`${variant}|${email}|${values.message}`, 10 * 60_000))
    return json({ ok: false, error: "This message has already been received. Thank you!" }, 409);

  const { SMTP_HOST, SMTP_USER, SMTP_PASS, MAIL_FROM } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !MAIL_FROM) {
    console.error("[contact] SMTP is not configured");
    return json({ ok: false, error: "Our contact form is temporarily unavailable. Please email us directly." }, 503);
  }

  const label = variant === "volunteer" ? "Volunteer enquiry" : "Contact enquiry";
  const subject = `[AKA website] ${label}: ${variant === "volunteer" ? values.name : values.subject}`.slice(0, 200);
  const rows: [string, string][] = [
    ["Name", values.name],
    ["Email", values.email],
    ["Phone", values.phone || "-"],
    ...(variant === "contact" ? ([["Subject", values.subject]] as [string, string][]) : []),
  ];
  const text = `${label}\n\n${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nMessage:\n${values.message}\n`;
  const html =
    `<h2>${esc(label)}</h2><table cellpadding="6">` +
    rows.map(([k, v]) => `<tr><td><strong>${esc(k)}</strong></td><td>${esc(v)}</td></tr>`).join("") +
    `</table><p><strong>Message</strong></p><p style="white-space:pre-wrap">${esc(values.message)}</p>`;

  try {
    const port = Number(process.env.SMTP_PORT ?? 587);
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
      connectionTimeout: 10_000,
      socketTimeout: 15_000,
    });
    await transporter.sendMail({
      from: MAIL_FROM,
      to: process.env.CONTACT_TO || SITE.email,
      replyTo: { name: values.name.replace(/[<>"]/g, ""), address: values.email },
      subject,
      text,
      html,
    });
  } catch (err) {
    console.error("[contact] send failed:", err instanceof Error ? err.message : "unknown");
    return json({ ok: false, error: "We could not send your message. Please try again or email us directly." }, 502);
  }

  return json({ ok: true });
}

export function GET() {
  return json({ ok: false, error: "Method not allowed." }, 405, { Allow: "POST" });
}
