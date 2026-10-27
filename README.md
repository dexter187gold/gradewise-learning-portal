# GradeWise Learning Portal — Cloudflare Pages test deployment

This repository deploys as a **static Next.js export on Cloudflare Pages**.

## Cloudflare Pages project settings

- Git repository: `dexter187gold/gradewise-learning-portal`
- Production branch: `main`
- Framework preset: **Next.js (Static HTML Export)**
- Build command: `npm run build`
- Build output directory: `out`
- Root directory: `/`
- Automatic production deployments on pushes to `main`: enabled

Next.js is configured with `output: "export"`, so `next build` writes the static pages to `out/`.

## Testing mode only

The old AppDeploy-specific browser SDK has been replaced with `lib/appdeploy-client.ts` for Cloudflare testing:
- Sign-in asks for a test email and stores a local browser session.
- Sage tutor and quiz requests return placeholder responses.
- This adapter does not provide real identity verification, secure sessions, AI generation, server APIs, persistent progress, purchases, or production account security.

The original AppDeploy backend implementation is not deployed to Cloudflare. Replace the test adapter with a real authentication provider and backend before public launch.

## Local build

```bash
npm install
npm run build
```

The output should be generated in `out/`.
