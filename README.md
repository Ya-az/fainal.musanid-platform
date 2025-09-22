# Musanid Platform

Production-ready Node/Express server with static frontend and basic session auth (MySQL).

## Prerequisites
- Node.js 18+
- MySQL 8+

## Setup
1. Copy env file:
   ```bash
   cp .env.example .env
   ```
2. Update `.env` with your DB credentials and a strong SESSION_SECRET.
3. Install deps:
   ```bash
   npm install
   ```
4. Start dev server:
   ```bash
   npm run dev
   ```

Server serves static files from `public/` and provides routes:
- GET / → `public/hp_index.html`
- GET /auth/login → login page
- POST /auth/login → authenticate
- GET /auth/register → register page
- POST /auth/register → create account
- POST /auth/logout → destroy session
- GET /dashboard → protected (requires login)
- GET /course → protected
- GET /certificate → protected

## Deploy
- Set NODE_ENV=production
- Set SESSION_SECRET
- Set DB_* variables
- Ensure reverse proxy sets `X-Forwarded-*` headers and enable trust proxy (already handled)
- Start with `npm start`

## Notes
- Minimal auth; add email verification & password reset for full production.
- Add HTTPS and proper cookie domain on real host.
