"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { LIMITS, validate, type FieldErrors, type Variant } from "@/lib/contact";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, opts: { action: string }) => Promise<string>;
    };
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
const ACTION = { contact: "contact_form", volunteer: "volunteer_form" } as const;

type Status = "idle" | "sending" | "success" | "error";

const input =
  "w-full rounded-none border border-line bg-white px-4 py-3.5 text-base text-ink placeholder:text-muted/70 focus:border-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-primary aria-[invalid=true]:border-red-700";

function Field({ id, label, error, required, children }: { id: string; label: string; error?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow mb-2 block text-primary-deep">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm({ variant }: { variant: Variant }) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const startedAt = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);
  const isVolunteer = variant === "volunteer";

  useEffect(() => {
    startedAt.current = Date.now();
    if (!SITE_KEY || window.grecaptcha || document.getElementById("recaptcha-script")) return;
    const s = document.createElement("script");
    s.id = "recaptcha-script";
    s.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(SITE_KEY)}`;
    s.async = true;
    document.head.appendChild(s);
  }, []);

  const getToken = () =>
    new Promise<string>((resolve, reject) => {
      if (!SITE_KEY || !window.grecaptcha) return reject(new Error("captcha-unavailable"));
      const g = window.grecaptcha;
      g.ready(() => g.execute(SITE_KEY, { action: ACTION[variant] }).then(resolve, reject));
    });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return; // blocks double submits
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const check = validate(data, variant);
    setErrors(check.errors);
    if (!check.ok) {
      setStatus("error");
      setMessage("Please correct the highlighted fields.");
      return;
    }
    setStatus("sending");
    setMessage("");
    try {
      const captchaToken = await getToken();
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...check.values, variant, website: data.website, startedAt: startedAt.current, captchaToken }),
      });
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; fieldErrors?: FieldErrors };
      if (res.ok && body.ok) {
        formRef.current?.reset();
        setErrors({});
        setStatus("success");
        setMessage(
          isVolunteer
            ? "Thank you! Your volunteer enquiry has been sent. We will be in touch soon."
            : "Thank you! Your message has been sent. We will reply as soon as we can.",
        );
        return;
      }
      if (body.fieldErrors) setErrors(body.fieldErrors);
      setStatus("error");
      setMessage(body.error ?? "Something went wrong. Please try again.");
    } catch {
      setStatus("error");
      setMessage("We could not complete the spam check or reach the server. Please reload and try again, or email us directly.");
    }
  }

  const err = (k: keyof FieldErrors) => ({
    "aria-invalid": errors[k] ? (true as const) : undefined,
    "aria-describedby": errors[k] ? `${variant}-${k}-error` : undefined,
  });
  const sending = status === "sending";

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="mt-10 grid gap-5 border-t border-line pt-8 sm:grid-cols-2">
      <Field id={`${variant}-name`} label="Name" required error={errors.name}>
        <input id={`${variant}-name`} name="name" type="text" autoComplete="name" required maxLength={LIMITS.name} className={input} {...err("name")} />
      </Field>
      <Field id={`${variant}-email`} label="Email" required error={errors.email}>
        <input id={`${variant}-email`} name="email" type="email" autoComplete="email" required maxLength={LIMITS.email} className={input} {...err("email")} />
      </Field>
      <Field id={`${variant}-phone`} label="Phone" required={isVolunteer} error={errors.phone}>
        <input id={`${variant}-phone`} name="phone" type="tel" autoComplete="tel" required={isVolunteer} maxLength={LIMITS.phone} className={input} {...err("phone")} />
      </Field>
      {!isVolunteer && (
        <Field id={`${variant}-subject`} label="Subject" required error={errors.subject}>
          <input id={`${variant}-subject`} name="subject" type="text" required maxLength={LIMITS.subject} className={input} {...err("subject")} />
        </Field>
      )}
      <div className="sm:col-span-2">
        <Field id={`${variant}-message`} label={isVolunteer ? "How would you like to help?" : "Message"} required error={errors.message}>
          <textarea id={`${variant}-message`} name="message" rows={5} required maxLength={LIMITS.message} className={input} {...err("message")} />
        </Field>
      </div>

      {/* Honeypot: hidden from people and assistive tech, bots fill it in. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex flex-col gap-4 sm:col-span-2">
        <button type="submit" disabled={sending} className="btn btn-solid w-fit disabled:cursor-not-allowed disabled:opacity-60">
          <span>{sending ? "Sending…" : isVolunteer ? "Send Volunteer Enquiry" : "Send Message"}</span>
        </button>
        <p role="status" aria-live="polite" className={`text-base ${status === "success" ? "text-green-800" : "text-red-700"}`}>
          {message}
        </p>
        <p className="text-xs text-muted">
          Protected by reCAPTCHA. Google’s{" "}
          <a className="u-link" href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a className="u-link" href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">
            Terms of Service
          </a>{" "}
          apply.
        </p>
      </div>
    </form>
  );
}
