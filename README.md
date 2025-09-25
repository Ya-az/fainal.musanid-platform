# Musanid Platform  ![CI](https://github.com/Ya-az/musanid-platform/actions/workflows/ci.yml/badge.svg)

منصة تعليمية مبنية على Node/Express مع قوالب EJS ديناميكية، نظام تقدم للدروس، وجلسات آمنة عبر MySQL.

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

## Architecture
- Views: `src/views` (Layout + Partials + صفحات ديناميكية)
- Public assets: `public/` للملفات الثابتة (CSS/JS/Images)
- Routes: `src/routes/*.js`
- Models: `src/models/Lesson.js` & `src/models/Progress.js`
- Templates: `layout.ejs` + `partials/navbar`, `partials/footer`, `partials/lesson_card`
- Error pages: `views/errors/404.ejs`, `views/errors/500.ejs`

## Core Routes
- GET / (home)
- GET /faq ، /about (static within EJS)
- Auth: /auth/login , /auth/register , POST /auth/logout
- Dashboard: /dashboard (يتضمن شريط تقدم)
- Courses: /course (قائمة) ، /course/:slug (عرض درس)
- Certificates: /certificate ، /certificate/download
- Support: /support
- Settings: /settings
- API (Progress):
   - GET /api/progress -> { completed, total, percent }
   - GET /api/progress?include=lessons -> يضيف مصفوفة الدروس مع حالة الإنجاز
   - POST /api/progress/:slug -> تعليم درس مكتمل
   - DELETE /api/progress/:slug -> إلغاء تعليم درس
   - POST /support -> إنشاء تذكرة دعم (email, subject, message)

## Progress Model
جدول `lessons_progress` يربط المستخدم بالدروس المكتملة ويُستخدم لحساب النسبة.

## Lessons Metadata
- الحقول: `title`, `slug`, `description`, `category`, `level (beginner|intermediate|advanced)`, `durationMinutes`.
- يمكن لاحقاً إضافة: وسوم (tags)، متطلبات مسبقة (prerequisites)، ترتيب مخصص.

## Password Rules (التسجيل)
يجب أن تحتوي كلمة المرور على:
- 8 أحرف على الأقل
- حرف كبير A-Z
- حرف صغير a-z
- رقم 0-9
- رمز خاص واحد على الأقل

## Tailwind CSS
- ملف الإدخال: `css/tw-input.css`
- البناء:
```bash
npm run build:css
# أو أثناء التطوير
npm run dev:css
```
الناتج: `public/css/styles.css`

## Toast & JS
- سكربت موحد: `public/js/app.js` (توست، إدارة الدروس، تقدم، قائمة الجوال)
- أُزيلت السكربتات inline لدعم CSP مستقبلاً.

## Security Measures
- helmet (أساسي) + معدل طلبات لمسارات auth & progress
- csurf حماية CSRF (double submit cookie)
- جلسات مخزنة في MySQL مع cookie `sameSite=lax`
- لاحقاً يوصى بإضافة Content Security Policy مخصصة
   - (مُفعّلة حالياً: CSP تمنع سكربتات خارجية و inline) 

## Upcoming Enhancements (مقترح)
- CSP صارم مع nonces
- إزالة أي سكربت inline متبقٍ (تم لمعظم الصفحات)
- ESLint + Prettier
- اختبارات وحدات للنماذج
- WebSocket للتحديث الفوري للتقدم

## Deploy
- Set NODE_ENV=production
- Set SESSION_SECRET
- Set DB_* variables
- Optionally set CORS_ORIGIN to allowed origins
- Ensure reverse proxy sets `X-Forwarded-*` headers and enable trust proxy (already handled)
- Start with `npm start`

## Notes
-## Development Tools
- ESLint: `npm run lint` / إصلاح تلقائي: `npm run lint:fix`
- Prettier: `npm run format`
- مراقبة Tailwind أثناء التطوير: `npm run dev:css`

- لا يوجد حالياً استعادة كلمة مرور أو تفعيل بريد.
- يوصى باستخدام HTTPS في بيئة الإنتاج وضبط Cookie Domain.
- حدث ملفات `robots.txt` و `sitemap.xml` حسب نطاقك الحقيقي.

## Legacy Cleanup
تم حذف الملفات الثابتة القديمة واستُبدلت بتحويلات خادمية 301 لضمان عمل الروابط التاريخية بدون إبقاء ملفات HTML مزدوجة.

التحويلات المفعّلة:
| قديم | جديد |
|------|------|
| /hp_index.html , /index.html | / |
| /about.html | /about |
| /faq.html | /faq |
| /profile.html | /profile |
| /settings.html | /settings |
| /support/sp_index.html , /support/index.html | /support |
| /course/cr_index.html | /course |
| /certificate/ct_index.html | /certificate |
| /dashboard/db_index.html | /dashboard |

مستقبلاً (بعد التأكد من عدم وجود زيارات لها) يمكن إزالة بعضها لتقليل الكود، لكن الإبقاء عليها الآن مفيد لـ SEO وللمستخدمين الذين لديهم إشارات مرجعية قديمة.

### فحص التحويلات
تحقق آلياً من صحة التحويلات بعد تشغيل الخادم:
```
npm run check:legacy
```
بيئة/منفذ مختلف:
```
node src/scripts/check_legacy_redirects.js http://localhost:4000
```
يعرض السكربت تقريراً ويُرجع Exit Code = 1 إذا فشل أي مسار.
