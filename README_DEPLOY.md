Deployment and environment setup

I cannot access your Vercel account or Paystack dashboard to rotate keys or set environment variables myself. For security and access reasons you must perform the following steps in your accounts. I created helpful repo files (vercel.json and .env examples) and a protected admin UI; follow the steps below to finish deploying.

1) Immediately rotate/revoke exposed Paystack keys
- Log in to your Paystack dashboard: https://dashboard.paystack.com
- Go to Settings → API keys & Webhooks
- Revoke the keys you pasted in chat (they are compromised). Create a new *secret* key and a new *public* key. Use test keys first for staging.

2) Add environment variables in Vercel (recommended via the Dashboard)
- Open Vercel → select your Project → Settings → Environment Variables
- Add these variables (set values to the keys/URLs you created):
  - DATABASE_URL  (production Postgres connection string)
  - PAYSTACK_SECRET  (new Paystack secret key)
  - PAYSTACK_PUBLIC  (new Paystack public key)
  - ADMIN_KEY  (a secret string, e.g., use a long random value)
  - (optional) S3_BUCKET, S3_KEY, S3_SECRET, S3_REGION  (if you want S3 image storage)

3) Vercel project settings
- Root Directory: set to "client"
- Framework Preset: Next.js
- Build Command: npm run build
- Output Directory: LEAVE EMPTY (do NOT set to "public")

4) Configure Paystack webhook (after deploying)
- In Paystack dashboard → Settings → API keys & Webhooks → Add a webhook
- URL: https://<your-domain>/api/payments/webhook
- Use event types: transaction.success (and others you need)
- We verify webhook signature using PAYSTACK_SECRET on the server.

5) Deploy using Vercel CLI (optional) — example commands
- Install Vercel CLI: npm i -g vercel
- Login: vercel login
- Add env vars with the CLI (will prompt for value):
  vercel env add PAYSTACK_SECRET production
  vercel env add PAYSTACK_PUBLIC production
  vercel env add ADMIN_KEY production
  vercel env add DATABASE_URL production

- Deploy manually (from repo root):
  vercel --prod --confirm

6) Local testing (recommended before production)
- Copy example env files to local env files
  cp server/.env.example server/.env
  cp client/.env.example client/.env.local
- Start server (use test keys):
  cd server
  npm ci
  npx prisma generate
  npx prisma migrate dev --name init   # only if DATABASE_URL set
  npm run dev
- Start client:
  cd client
  npm ci
  npm run dev
- Use ngrok to expose server for webhook testing:
  ngrok http 5000
  Then set Paystack webhook to https://<ngrok-id>.ngrok.io/api/payments/webhook

7) Quick curl examples
- Create a listing (multipart):
  curl -X POST "http://localhost:5000/api/listings?key=YOUR_ADMIN_KEY" \
    -F "title=Prime Level 8" \
    -F "description=Nice account" \
    -F "price=150000" \
    -F "level=8" \
    -F "rank=Gold" \
    -F "region=NG" \
    -F "diamonds=0" \
    -F "images=@/path/to/image.jpg"

- Initialize payment (from client the UI does this):
  POST /api/payments/initialize { accountId, email }

8) Notes
- I added vercel.json to help Vercel detect the client app and server functions.
- I cannot set environment variables or rotate API keys for you — I do not have access to external accounts.
- Once you set the environment variables in Vercel, tell me "envs set" and I will run a final deployment test and open a PR with screenshots and instructions.

If you want I can also generate a single command you can paste (Vercel CLI) to add all env vars, but you must run it from your machine after logging in with vercel login.
