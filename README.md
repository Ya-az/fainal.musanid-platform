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

If on Windows PowerShell, use these equivalents:
```
Copy-Item .env.example .env
npm install
npm run dev
```

Before first run, create the database and seed an initial user:
```
-- in MySQL
CREATE DATABASE IF NOT EXISTS musanid_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# in terminal
npm run seed:user
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
 - GET /certificate/download → generate and download certificate PDF (protected)
 - GET /settings → settings page (protected)
 - POST /settings/profile → update profile
 - POST /settings/password → change password

## Deploy
- Set NODE_ENV=production
- Set SESSION_SECRET
- Set DB_* variables
- Optionally set CORS_ORIGIN to allowed origins
- Ensure reverse proxy sets `X-Forwarded-*` headers and enable trust proxy (already handled)
- Start with `npm start`

## Notes
- Minimal auth; add email verification & password reset for full production.
- Add HTTPS and proper cookie domain on real host.
- Update `public/robots.txt` and `public/sitemap.xml` with your real domain.
