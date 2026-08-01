# Netlify deployment guide for ZenXStore

This document explains how to deploy the Next.js client to Netlify from the `main` branch.

Two supported options are provided below — pick the one that matches your needs.

Team & repository
- Team: "divine div’s Team" (select this when creating a new site on Netlify)
- GitHub repository: sgaeric6/ZenXstore
- Branch to deploy: `main`
- Base directory (Netlify build settings): `client`

Option A — Static export (fast, no SSR or API routes)
- Use this if your site is a static marketing/storefront and does not require Next.js server-side features.

Steps:
1. Ensure the `client/package.json` contains the `build:export` (or `export`) script. This repo includes:
   - "build:export": "next build && next export"
   - "export": "next build && next export"

2. Netlify build settings (UI)
   - Branch to deploy: `main`
   - Base directory: `client`
   - Build command: `npm ci && npm run build:export`
   - Publish directory: `client/out`

3. Alternatively, use the CLI to build locally and preview:
   - cd client
   - npm ci
   - npm run build:export
   - npx serve out

Option B — Full Next.js support (SSR, API routes, Image optimization via Netlify plugin)
- Use this if you rely on Next.js server-side rendering, API routes, or advanced features.

What this repo includes to support the Netlify plugin:
- `netlify.toml` at repo root with the plugin declaration and build base set to `client`.

Netlify build settings (UI)
- Branch to deploy: `main`
- Base directory: `client`
- Build command: `npm ci && npm run build`
- Publish directory: leave blank (the plugin manages build outputs)

Notes and environment variables
- If your build requires any environment variables, add them in Netlify: Site → Site settings → Build & deploy → Environment → Environment variables.
- Use `NEXT_PUBLIC_` prefix for variables that must be available in the browser.

Quick Netlify site creation steps
1. Go to https://app.netlify.com and switch to "divine div’s Team".
2. Click "New site from Git" → GitHub → choose `sgaeric6/ZenXstore`.
3. Under "Build settings" set:
   - Branch to deploy: `main`
   - Base directory: `client`
   - Build command: (Option A) `npm ci && npm run build:export` or (Option B) `npm ci && npm run build`
   - Publish directory: (Option A) `client/out` or (Option B) leave blank
4. Click "Deploy site".

Useful commands for PR / CI
- Create a PR with the Netlify changes branch and merge into `main` to trigger a new build on Netlify.

If you want, I can also:
- Open a PR that includes `netlify.toml` and the updated `client/package.json` (I already pushed these to the branch). Merge them into `main` to trigger Netlify.
- Add any required environment variables to Netlify if you provide the values (or I can include placeholders and document them).

