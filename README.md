This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Contact & volunteer forms

Both forms (`/contact-us/`, `/become-volunteer/`) post to `app/api/contact/route.ts`, which validates input,
verifies Google reCAPTCHA v3 server-side, rate-limits, and emails the submission over SMTP.

### Environment variables
See `.env.example`. Set them locally in `.env.local` and in Vercel (Project → Settings → Environment Variables), then redeploy.

| Variable | Public? | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | yes | reCAPTCHA v3 site key |
| `RECAPTCHA_SECRET_KEY` | **no** | reCAPTCHA v3 secret (server only) |
| `RECAPTCHA_MIN_SCORE` | no | Minimum score, default `0.5` |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_SECURE` / `SMTP_USER` / `SMTP_PASS` | no | SMTP account used to send |
| `MAIL_FROM` | no | Sender, e.g. `AKA Website <info@aka.org.au>` |
| `CONTACT_TO` | no | Recipient (defaults to `info@aka.org.au`) |

### reCAPTCHA setup
1. https://www.google.com/recaptcha/admin → create a site, type **reCAPTCHA v3**.
2. Add domains: `aka.org.au`, `www.aka.org.au`, your `*.vercel.app` domain and `localhost`.
3. Put the site key and secret in the variables above. The form fails closed: with no secret configured the API returns 503.

### Rate limiting
`lib/rate-limit.ts` is in-memory (per serverless instance): 5 requests / 10 min per IP and 3 / hour per email address.
For a hard global limit add Vercel WAF rate limiting on `/api/contact` or back `hit()` with Upstash Redis / Vercel KV.
