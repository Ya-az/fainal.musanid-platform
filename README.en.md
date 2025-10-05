# Musanid Platform

An Arabic-first learning platform powered by **Node.js/Express** with **EJS** templates, secure MySQL-backed sessions, progress tracking, and an offline-ready **PWA** experience.

## At a Glance
- ⚙️ **Backend**: Express + EJS, MySQL storage, hardened middleware (Helmet, CSRF, rate limiting).
- 🎨 **Frontend**: Tailwind CSS compiled from `src/assets/css` into `public/css`, unified JavaScript in `public/js`.
- 📦 **Content**: Dynamic pages under `src/views`, alongside a static marketing snapshot under `docs/`.
- 📄 **Certificates**: Local generation with PDF export and a personal archive persisted in the browser.
- 📱 **PWA**: Smart service worker, offline landing page, updated manifest and maskable icons.

## Requirements
- Node.js 18+
- MySQL 8 (with a pre-created database)

## Quick Start
```powershell
# PowerShell
Copy-Item .env.example .env
npm install
npm run dev
```

```bash
# Bash/Zsh
cp .env.example .env
npm install
npm run dev
```

Initialize the database once:
```sql
CREATE DATABASE IF NOT EXISTS musanid_db
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;
```

Seed a demo account:
```bash
npm run seed:user
```

## Project Layout
```
├── public/              # Built assets served by Express
├── src/
│   ├── app.js           # Application entry point
│   ├── assets/          # Tailwind source & shared JS snippets
│   ├── config/          # Database and app configuration
│   ├── middleware/      # Security/session helpers
│   ├── models/          # MySQL models (lessons, progress, favorites)
│   ├── routes/          # Web routes + lightweight APIs
│   ├── scripts/         # Maintenance & legacy utilities
│   └── views/           # EJS layouts, pages, and error templates
├── docs/                # Static marketing/exported HTML bundle
├── tests/               # Jest unit & integration tests
├── tailwind.config.js
└── package.json
```

## Useful npm Scripts
| Script | Description |
|--------|-------------|
| `npm run dev` | Start the dev server with Nodemon |
| `npm run dev:css` | Watch Tailwind sources |
| `npm run build:css` | Produce minified CSS for release |
| `npm run seed:user` | Insert a demo learner into MySQL |
| `npm run lint` / `lint:fix` | Lint (and optionally fix) the codebase |
| `npm test` | Run the Jest suite |
| `npm run check:legacy` | Validate 301 redirects for legacy routes |

## Security & Offline Notes
- **Helmet + CSP** enforce strict script/style origins.
- **CSRF protection** via `csurf` with double-submit cookies.
- **Rate limiting** applied to auth and progress endpoints.
- **Service worker** prioritizes network-first pages with precached essentials.
- `public/offline.html` guides learners when connectivity drops.

## Tests & QA
- Jest configuration lives in `jest.config.js`.
- Tests cover models, frontend helpers, service worker, and legacy redirects.
- Run `npm test` (or `npm test --watch`) to keep the suite green.

## Documentation Hub
- `CONTRIBUTING.md`: coding standards & contribution flow.
- `IMPROVEMENTS.md`: summary of major structural upgrades.
- `GUIDE.md`, `HERO_TEMPLATE.md`: marketing/content guidelines.
- The `docs/` directory ships a static snapshot for demo hosting.

## Deploy Checklist
1. Set `SESSION_SECRET`, MySQL credentials, and optional `CORS_ORIGIN`.
2. Build production CSS with `npm run build:css`.
3. Launch with `NODE_ENV=production` and `npm start` behind an HTTPS-aware reverse proxy.
4. Review `robots.txt` and `sitemap.xml` for your domain before go-live.

## Extra Notes
- Password reset flows are planned but not yet implemented.
- Configure cookie domain + HTTPS in production environments.
- Legacy HTML links are preserved via redirects—run `npm run check:legacy` if you adjust routes.

> Legacy README copies were removed; the Arabic edition lives in [`README.md`](README.md).