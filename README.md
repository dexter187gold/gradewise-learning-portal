# GradeWise Learning Portal — Cloudflare testing setup

This repository is configured as a Next.js Pages Router app deployed to **Cloudflare Workers** using the OpenNext Cloudflare adapter.

## Cloudflare Workers build settings

- Repository: `dexter187gold/gradewise-learning-portal`
- Production branch: `main`
- Framework preset: **Next.js** (Workers / OpenNext adapter)
- Root directory: `/`
- Build/deploy command: `npm run deploy`
- Wrangler config: `wrangler.jsonc`
- Build output is generated in `.open-next/` by the adapter; do not set a Pages-style static output directory.

The repository includes `package.json`, `next.config.js`, `open-next.config.ts`, `wrangler.jsonc`, and TypeScript configuration for the Cloudflare Workers build.

## Temporary testing mode

The previous AppDeploy-only browser SDK has been replaced by `lib/appdeploy-client.ts` so the UI can be tested independently of AppDeploy:
- Sign-in asks for a test email and stores a local browser session.
- Sage and quiz requests return clearly placeholder responses.
- No real identity verification, AI model call, account security, persistent progress, payments, or production API is provided by this testing adapter.

**Do not use this adapter for real learners or production.** Replace it with a real authentication provider and server-side API implementation before public launch. The original AppDeploy backend source is retained in `backend/index.ts` for reference, but Cloudflare does not run it automatically.

## Deploy and auto-deploy

In Cloudflare, use Workers Builds / Workers & Pages to connect the repository, choose `main` as the production branch, and ensure automatic deployments are enabled. Every successful push to `main` should trigger a build and deployment. Set any environment variables/secrets in Cloudflare project settings, never in Git.

## Local checks

```bash
npm install
npm run build
npm run preview
```

The production deployment command used by Workers Builds is `npm run deploy`.


## Cloudflare Pages build fix

This project is currently deployed as a Cloudflare Pages static-export test build. Next.js uses `output: 'export'` and writes static files to `out/`. The legacy AppDeploy backend source under `backend/` is excluded from frontend TypeScript compilation; its server handlers are not deployed by Pages. Automatic production deploys are enabled for pushes to `main`.
