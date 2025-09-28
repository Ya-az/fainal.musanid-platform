# منصة مساند التعليمية

موقع منصة مساند التعليمية هو منصة تعليمية متكاملة للدورات التعليمية باللغة العربية. هذا المستودع يحتوي على جميع الملفات والأصول والكود اللازمة لتشغيل الموقع بشكل كامل.

## هيكل المشروع

```
all-website-files/
│
├── frontend/                # الواجهة الأمامية
│   ├── public/              # الملفات العامة
│   │   ├── assets/          # الأصول (صور، أيقونات، الخ)
│   │   ├── css/             # ملفات CSS
│   │   ├── js/              # ملفات JavaScript
│   │   ├── index.html       # صفحة البداية الرئيسية
│   │   ├── about-musanid.html # صفحة عن المنصة
│   │   ├── faq.html         # صفحة الأسئلة الشائعة
│   │   └── ...              # صفحات HTML الأخرى
│   ├── src/                 # الكود المصدري (React)
│   │   ├── assets/          # الصور والخطوط
│   │   ├── components/      # المكونات القابلة لإعادة الاستخدام
│   │   ├── pages/           # مكونات الصفحات
│   │   ├── utils/           # وظائف مساعدة
│   │   ├── App.js           # المكون الرئيسي
│   │   └── index.js         # نقطة الدخول
│   └── package.json         # تبعيات الواجهة الأمامية
│
└── backend/                 # الخادم الخلفي (Express)
    ├── src/                 # الكود المصدري
    │   ├── config/          # ملفات التكوين
    │   ├── controllers/     # متحكمات API
    │   ├── middleware/      # وسيطات Express
    │   ├── models/          # نماذج البيانات
    │   ├── routes/          # مسارات API
    │   └── index.js         # نقطة الدخول
    ├── tests/               # اختبارات الوحدة
    └── package.json         # تبعيات الخادم الخلفي
```

## المميزات

- تصميم متجاوب يعمل على جميع الأجهزة
- واجهة أمامية حديثة مبنية على React مع المكونات الوظيفية والـ hooks
- خادم خلفي باستخدام Express مع هيكل API مناسب
- معالجة النماذج مع التحقق من الصحة
- دعم كامل للغة العربية
- هيكل صديق لمحركات البحث (SEO)
- سهولة النشر على خدمات مثل Vercel وNetlify وHeroku وغيرها

## المتطلبات

- Node.js (الإصدار 14.x أو أحدث)
- npm أو yarn
- متصفح ويب حديث

## التثبيت

1. استنساخ المستودع:
```bash
git clone https://github.com/yourusername/musanid-platform.git
cd musanid-platform/all-website-files
```

2. تثبيت تبعيات الخادم الخلفي:
```bash
cd backend
npm install
```

3. تثبيت تبعيات الواجهة الأمامية:
```bash
cd ../frontend
npm install
```

## التشغيل محليًا

### الطريقة السريعة

استخدم سكريبت التشغيل المرفق:

```bash
# في نظام Windows
.\start.ps1

# في نظام Linux/Mac
chmod +x start.sh
./start.sh
```

### الطريقة اليدوية

1. بدء تشغيل الخادم الخلفي:
```bash
cd backend
npm run dev
```

2. في نافذة طرفية منفصلة، بدء تشغيل خادم تطوير الواجهة الأمامية:
```bash
cd frontend
npm start
```

3. افتح متصفحك وانتقل إلى `http://localhost:3000`

## تشغيل الاختبارات

### اختبارات الخادم الخلفي
```bash
cd backend
npm test
```

### اختبارات الواجهة الأمامية
```bash
cd frontend
npm test
```

## البناء للإنتاج

### الواجهة الأمامية
```bash
cd frontend
npm run build
```

### الخادم الخلفي
```bash
cd backend
npm run build
npm start
```

## النشر

### نشر الواجهة الأمامية على Vercel

1. تثبيت واجهة سطر أوامر Vercel:
```bash
npm install -g vercel
```

2. الانتقال إلى دليل الواجهة الأمامية:
```bash
cd frontend
```

3. النشر باستخدام Vercel:
```bash
vercel
```

### نشر الخادم الخلفي على Heroku

1. تثبيت واجهة سطر أوامر Heroku وتسجيل الدخول:
```bash
npm install -g heroku
heroku login
```

2. الانتقال إلى دليل الخادم الخلفي:
```bash
cd backend
```

3. إنشاء تطبيق Heroku والنشر:
```bash
heroku create musanid-platform
git init
git add .
git commit -m "النشر الأولي"
git push heroku master
```

## استكشاف الأخطاء وإصلاحها

إذا واجهت مشكلة الشاشة البيضاء، يمكنك استخدام:

```bash
# في ويندوز
.\fix-white-screen.ps1

# في لينكس/ماك
./fix-white-screen.sh
```

## الترخيص

MIT

## المطور

فريق منصة مساند