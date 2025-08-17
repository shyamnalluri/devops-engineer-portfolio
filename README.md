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

## Enable Google Analytics in Production

This project integrates Google Analytics (gtag.js) conditionally in `src/app/layout.tsx`. It only loads when the environment variable `NEXT_PUBLIC_GTAG_ID` is set.

### 1) Create a GA4 property and get your Measurement ID

- In Google Analytics, create a GA4 property and a Web data stream.
- Copy the Measurement ID (format: `G-XXXXXXXXXX`).

### 2) Set the environment variable at build/deploy time

Set `NEXT_PUBLIC_GTAG_ID` in your production environment. Examples:

```bash
# Vercel (Project Settings → Environment Variables)
NEXT_PUBLIC_GTAG_ID=G-XXXXXXXXXX

# GitHub Actions (as a secret or env)
NEXT_PUBLIC_GTAG_ID: G-XXXXXXXXXX

# Local .env for testing (do not commit)
echo "NEXT_PUBLIC_GTAG_ID=G-XXXXXXXXXX" > .env.local
```

The app reads this variable at runtime and injects the GA script with Next.js `next/script` in `layout.tsx`.

### 3) Verify it works

- Deploy with the env var set.
- Open your site and check GA Realtime.
- In DevTools → Network, you should see `https://www.googletagmanager.com/gtag/js?id=G-...` requested.

### 4) Custom events included

We already track key CTA clicks from the Hero section. Events fire only when GA is present:

- `click_hire_me`
- `click_resume`
- `click_learn_more`

You can add more events similarly by calling:

```ts
if (typeof window !== 'undefined' && (window as any).gtag) {
  (window as any).gtag('event', 'event_name', { key: 'value' });
}
```

### 5) Privacy and consent

If you need consent management (GDPR/CCPA), gate the GA initialization behind your consent logic before calling `gtag('config', ...)`.
