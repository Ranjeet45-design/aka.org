/** Shared (client + server) form schema and validation. The server re-runs this; never trust the client. */

export type Variant = "contact" | "volunteer";

export type Fields = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export type FieldErrors = Partial<Record<keyof Fields, string>>;

export const LIMITS = { name: 100, email: 254, phone: 30, subject: 150, message: 3000 } as const;

const EMAIL_RE = /^[^\s@<>"',;:()[\]\\]+@[^\s@<>"',;:()[\]\\]+\.[^\s@<>"',;:()[\]\\]{2,}$/;
const PHONE_RE = /^[+\d][\d\s().-]{5,}$/;
// Control chars (except \n, \t in message) are stripped; this also kills header-injection newlines in single-line fields.
const CTRL_ALL = /[\u0000-\u001f\u007f]/g;
const CTRL_KEEP_NL = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g;

export function clean(input: unknown, max: number, multiline = false): string {
  if (typeof input !== "string") return "";
  const s = input.normalize("NFC").replace(multiline ? CTRL_KEEP_NL : CTRL_ALL, " ");
  return s.replace(/\r\n?/g, "\n").trim().slice(0, max);
}

export function validate(raw: Record<string, unknown>, variant: Variant) {
  const values: Fields = {
    name: clean(raw.name, LIMITS.name),
    email: clean(raw.email, LIMITS.email),
    phone: clean(raw.phone, LIMITS.phone),
    subject: clean(raw.subject, LIMITS.subject),
    message: clean(raw.message, LIMITS.message, true),
  };
  const errors: FieldErrors = {};
  if (values.name.length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(values.email)) errors.email = "Please enter a valid email address.";
  if (variant === "volunteer") {
    if (!PHONE_RE.test(values.phone)) errors.phone = "Please enter a valid phone number.";
  } else {
    if (values.phone && !PHONE_RE.test(values.phone)) errors.phone = "Please enter a valid phone number.";
    if (values.subject.length < 3) errors.subject = "Please enter a subject.";
  }
  if (values.message.length < 10) errors.message = "Please tell us a little more (at least 10 characters).";
  return { values, errors, ok: Object.keys(errors).length === 0 };
}
